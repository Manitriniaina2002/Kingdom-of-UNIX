/**
 * Game Context - Global game state management
 * Handles zones, quests, and game progression
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ZONES } from '../data/zones';
import { QUESTS, isQuestUnlocked } from '../data/quests';

const GameContext = createContext();

const STORAGE_KEY = '@kingdom_unix_game_state';

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

  // Load saved state on mount
  useEffect(() => {
    loadGameState();
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      saveGameState();
    }
  }, [state.completedQuests, state.unlockedZones, state.gameStarted]);

  const loadGameState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        dispatch({ type: ACTIONS.LOAD_STATE, payload: parsed });
      } else {
        dispatch({ type: ACTIONS.LOAD_STATE, payload: {} });
      }
    } catch (error) {
      console.error('Error loading game state:', error);
      dispatch({ type: ACTIONS.LOAD_STATE, payload: {} });
    }
  };

  const saveGameState = async () => {
    try {
      const stateToSave = {
        completedQuests: state.completedQuests,
        unlockedZones: state.unlockedZones,
        gameStarted: state.gameStarted,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving game state:', error);
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
    
    // Check if this unlocks a new zone
    const quest = QUESTS[questId];
    if (quest && quest.type === 'boss') {
      const zoneOrder = ['village', 'cave', 'forest', 'castle', 'mountain'];
      const currentIndex = zoneOrder.indexOf(quest.zoneId);
      if (currentIndex < zoneOrder.length - 1) {
        const nextZone = zoneOrder[currentIndex + 1];
        dispatch({ type: ACTIONS.UNLOCK_ZONE, payload: nextZone });
      }
    }
  };

  const unlockZone = (zoneId) => {
    dispatch({ type: ACTIONS.UNLOCK_ZONE, payload: zoneId });
  };

  const startGame = () => {
    dispatch({ type: ACTIONS.START_GAME });
  };

  const resetGame = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
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
