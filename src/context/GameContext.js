/**
 * Game Context - Global game state management
 * Handles zones, quests, and game progression
 * Persistence via SQLite (expo-sqlite)
 * Multi-user aware: scoped to the current authenticated user
 */

import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { ZONES } from '../data/zones';
import { QUESTS, isQuestUnlocked } from '../data/quests';
import {
  openDatabase,
  loadGameState as dbLoadGameState,
  saveGameStarted,
  loadCompletedQuests,
  insertCompletedQuest,
  loadUnlockedZones,
  insertUnlockedZone,
  resetGameData,
} from '../database/db';
import { useAuth } from './AuthContext';

const GameContext = createContext();

// Initial state
const initialState = {
  zones: ZONES,
  currentZone: null,
  currentQuest: null,
  completedQuests: [],
  unlockedZones: ['village'],
  gameStarted: false,
  isLoading: true,
};

// Action types
const ACTIONS = {
  LOAD_STATE: 'LOAD_STATE',
  SET_CURRENT_ZONE: 'SET_CURRENT_ZONE',
  SET_CURRENT_QUEST: 'SET_CURRENT_QUEST',
  COMPLETE_QUEST: 'COMPLETE_QUEST',
  UNLOCK_ZONE: 'UNLOCK_ZONE',
  START_GAME: 'START_GAME',
  RESET_GAME: 'RESET_GAME',
};

// Reducer
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_STATE:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    case ACTIONS.SET_CURRENT_ZONE:
      return {
        ...state,
        currentZone: action.payload,
      };

    case ACTIONS.SET_CURRENT_QUEST:
      return {
        ...state,
        currentQuest: action.payload,
      };

    case ACTIONS.COMPLETE_QUEST:
      if (state.completedQuests.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        completedQuests: [...state.completedQuests, action.payload],
      };

    case ACTIONS.UNLOCK_ZONE:
      if (state.unlockedZones.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        unlockedZones: [...state.unlockedZones, action.payload],
      };

    case ACTIONS.START_GAME:
      return {
        ...state,
        gameStarted: true,
      };

    case ACTIONS.RESET_GAME:
      return {
        ...initialState,
        isLoading: false,
      };

    default:
      return state;
  }
}

// Provider component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const dbRef = useRef(null);
  const { currentUser } = useAuth();
  const userId = currentUser?.id;

  // Reload game state whenever the authenticated user changes
  useEffect(() => {
    if (!userId) {
      dispatch({ type: ACTIONS.RESET_GAME });
      return;
    }
    (async () => {
      try {
        const db = await openDatabase();
        dbRef.current = db;
        await loadStateFromDB(db, userId);
      } catch (error) {
        console.error('Error initialising game database:', error);
        dispatch({ type: ACTIONS.LOAD_STATE, payload: {} });
      }
    })();
  }, [userId]);

  // Persist gameStarted flag whenever it changes
  useEffect(() => {
    if (!state.isLoading && dbRef.current && userId) {
      saveGameStarted(dbRef.current, userId, state.gameStarted).catch(console.error);
    }
  }, [state.gameStarted]);

  const loadStateFromDB = async (db, uid) => {
    try {
      const gsRow = await dbLoadGameState(db, uid);
      const questRows = await loadCompletedQuests(db, uid);
      const zoneRows = await loadUnlockedZones(db, uid);

      dispatch({
        type: ACTIONS.LOAD_STATE,
        payload: {
          gameStarted: !!gsRow?.game_started,
          completedQuests: questRows.map(r => r.quest_id),
          unlockedZones: zoneRows.length > 0
            ? zoneRows.map(r => r.zone_id)
            : ['village'],
        },
      });
    } catch (error) {
      console.error('Error loading game state from SQLite:', error);
      dispatch({ type: ACTIONS.LOAD_STATE, payload: {} });
    }
  };

  // Actions
  const setCurrentZone = (zoneId) => {
    dispatch({ type: ACTIONS.SET_CURRENT_ZONE, payload: zoneId });
  };

  const setCurrentQuest = (questId) => {
    dispatch({ type: ACTIONS.SET_CURRENT_QUEST, payload: questId });
  };

  const completeQuest = (questId) => {
    dispatch({ type: ACTIONS.COMPLETE_QUEST, payload: questId });
    if (dbRef.current && userId) {
      insertCompletedQuest(dbRef.current, userId, questId).catch(console.error);
    }

    // Check if this unlocks a new zone
    const quest = QUESTS[questId];
    if (quest && quest.type === 'boss') {
      const zoneOrder = ['village', 'cave', 'forest', 'castle', 'mountain'];
      const currentIndex = zoneOrder.indexOf(quest.zoneId);
      if (currentIndex < zoneOrder.length - 1) {
        const nextZone = zoneOrder[currentIndex + 1];
        dispatch({ type: ACTIONS.UNLOCK_ZONE, payload: nextZone });
        if (dbRef.current && userId) {
          insertUnlockedZone(dbRef.current, userId, nextZone).catch(console.error);
        }
      }
    }
  };

  const unlockZone = (zoneId) => {
    dispatch({ type: ACTIONS.UNLOCK_ZONE, payload: zoneId });
    if (dbRef.current && userId) {
      insertUnlockedZone(dbRef.current, userId, zoneId).catch(console.error);
    }
  };

  const startGame = () => {
    dispatch({ type: ACTIONS.START_GAME });
  };

  const resetGame = async () => {
    if (dbRef.current && userId) {
      await resetGameData(dbRef.current, userId);
    }
    dispatch({ type: ACTIONS.RESET_GAME });
  };

  // Computed values
  const isZoneUnlocked = (zoneId) => state.unlockedZones.includes(zoneId);

  const isQuestCompleted = (questId) => state.completedQuests.includes(questId);

  const canStartQuest = (questId) => {
    return isQuestUnlocked(questId, state.completedQuests);
  };

  const getZoneProgress = (zoneId) => {
    const zone = ZONES[zoneId];
    if (!zone) return 0;

    const zoneQuests = zone.quests;
    const completed = zoneQuests.filter(qId => state.completedQuests.includes(qId));
    return Math.round((completed.length / zoneQuests.length) * 100);
  };

  const value = {
    ...state,
    setCurrentZone,
    setCurrentQuest,
    completeQuest,
    unlockZone,
    startGame,
    resetGame,
    resetGameProgress: resetGame,
    isZoneUnlocked,
    isQuestCompleted,
    canStartQuest,
    getZoneProgress,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export default GameContext;
