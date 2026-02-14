/**
 * Player Context - Player stats, XP, achievements, and inventory
 * Persistence via SQLite (expo-sqlite)
 * Multi-user aware: scoped to the current authenticated user
 */

import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { ACHIEVEMENTS, getLevelForXP, getLevelProgress, getXPForNextLevel } from '../data/achievements';
import {
  openDatabase,
  loadPlayerProfile,
  savePlayerProfile,
  loadPlayerCommands,
  recordCommandUsage,
  loadAchievements,
  insertAchievement,
  loadBadges,
  insertBadge,
  resetPlayerData,
} from '../database/db';
import { useAuth } from './AuthContext';

const PlayerContext = createContext();

// Initial state
const initialState = {
  // Profile
  playerName: 'ATRIKA',
  avatar: '',
  createdAt: null,

  // Stats
  xp: 0,
  gold: 50,

  // Command stats
  totalCommandsExecuted: 0,
  uniqueCommandsUsed: [],
  commandUsageCount: {}, // { 'ls': 15, 'cd': 20, ... }

  // Achievements
  unlockedAchievements: [],
  badges: [],

  // Settings
  soundEnabled: true,
  hintsEnabled: true,

  // Session
  currentStreak: 0,
  lastPlayDate: null,
  totalPlayTime: 0, // in seconds

  isLoading: true,
};

// Action types
const ACTIONS = {
  LOAD_STATE: 'LOAD_STATE',
  SET_PLAYER_NAME: 'SET_PLAYER_NAME',
  SET_AVATAR: 'SET_AVATAR',
  ADD_XP: 'ADD_XP',
  ADD_GOLD: 'ADD_GOLD',
  SPEND_GOLD: 'SPEND_GOLD',
  RECORD_COMMAND: 'RECORD_COMMAND',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  ADD_BADGE: 'ADD_BADGE',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  UPDATE_STREAK: 'UPDATE_STREAK',
  ADD_PLAY_TIME: 'ADD_PLAY_TIME',
  RESET_PLAYER: 'RESET_PLAYER',
};

// Reducer
function playerReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_STATE:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    case ACTIONS.SET_PLAYER_NAME:
      return {
        ...state,
        playerName: action.payload,
      };

    case ACTIONS.SET_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };

    case ACTIONS.ADD_XP:
      return {
        ...state,
        xp: state.xp + action.payload,
      };

    case ACTIONS.ADD_GOLD:
      return {
        ...state,
        gold: state.gold + action.payload,
      };

    case ACTIONS.SPEND_GOLD:
      return {
        ...state,
        gold: Math.max(0, state.gold - action.payload),
      };

    case ACTIONS.RECORD_COMMAND: {
      const command = action.payload;
      const newUniqueCommands = state.uniqueCommandsUsed.includes(command)
        ? state.uniqueCommandsUsed
        : [...state.uniqueCommandsUsed, command];

      return {
        ...state,
        totalCommandsExecuted: state.totalCommandsExecuted + 1,
        uniqueCommandsUsed: newUniqueCommands,
        commandUsageCount: {
          ...state.commandUsageCount,
          [command]: (state.commandUsageCount[command] || 0) + 1,
        },
      };
    }

    case ACTIONS.UNLOCK_ACHIEVEMENT:
      if (state.unlockedAchievements.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        unlockedAchievements: [...state.unlockedAchievements, action.payload],
      };

    case ACTIONS.ADD_BADGE:
      if (state.badges.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        badges: [...state.badges, action.payload],
      };

    case ACTIONS.UPDATE_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };

    case ACTIONS.UPDATE_STREAK: {
      const today = new Date().toDateString();
      const lastPlay = state.lastPlayDate;

      let newStreak = 1;
      if (lastPlay) {
        const lastDate = new Date(lastPlay);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate.toDateString() === yesterday.toDateString()) {
          newStreak = state.currentStreak + 1;
        } else if (lastDate.toDateString() === today) {
          newStreak = state.currentStreak;
        }
      }

      return {
        ...state,
        currentStreak: newStreak,
        lastPlayDate: today,
      };
    }

    case ACTIONS.ADD_PLAY_TIME:
      return {
        ...state,
        totalPlayTime: state.totalPlayTime + action.payload,
      };

    case ACTIONS.RESET_PLAYER:
      return {
        ...initialState,
        isLoading: false,
      };

    default:
      return state;
  }
}

// Provider component
export function PlayerProvider({ children }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const dbRef = useRef(null);
  const { currentUser } = useAuth();
  const userId = currentUser?.id;

  // Reload player state whenever the authenticated user changes
  useEffect(() => {
    if (!userId) {
      dispatch({ type: ACTIONS.RESET_PLAYER });
      return;
    }
    (async () => {
      try {
        const db = await openDatabase();
        dbRef.current = db;
        await loadPlayerStateFromDB(db, userId);
      } catch (error) {
        console.error('Error initialising player database:', error);
        dispatch({ type: ACTIONS.LOAD_STATE, payload: {} });
      }
    })();
  }, [userId]);

  // Persist to SQLite whenever relevant fields change
  useEffect(() => {
    if (!state.isLoading && dbRef.current && userId) {
      savePlayerStateToDB(dbRef.current, userId, state);
    }
  }, [
    state.playerName,
    state.avatar,
    state.xp,
    state.gold,
    state.totalCommandsExecuted,
    state.uniqueCommandsUsed,
    state.commandUsageCount,
    state.unlockedAchievements,
    state.badges,
    state.currentStreak,
    state.lastPlayDate,
    state.totalPlayTime,
    state.soundEnabled,
    state.hintsEnabled,
  ]);

  const loadPlayerStateFromDB = async (db, uid) => {
    try {
      const profile = await loadPlayerProfile(db, uid);

      if (!profile) {
        // New user – use auth display name and avatar
        dispatch({
          type: ACTIONS.LOAD_STATE,
          payload: {
            playerName: currentUser?.displayName || 'ATRIKA',
            avatar: currentUser?.avatar || '',
            createdAt: new Date().toISOString(),
          },
        });
        return;
      }

      const cmdRows = await loadPlayerCommands(db, uid);
      const uniqueCommandsUsed = cmdRows.map(r => r.command);
      const commandUsageCount = {};
      cmdRows.forEach(r => { commandUsageCount[r.command] = r.usage_count; });

      const achRows = await loadAchievements(db, uid);
      const badgeRows = await loadBadges(db, uid);

      dispatch({
        type: ACTIONS.LOAD_STATE,
        payload: {
          playerName: profile.player_name || 'ATRIKA',
          avatar: profile.avatar || '',
          createdAt: profile.created_at,
          xp: profile.xp,
          gold: profile.gold,
          totalCommandsExecuted: profile.total_commands_executed,
          soundEnabled: !!profile.sound_enabled,
          hintsEnabled: !!profile.hints_enabled,
          currentStreak: profile.current_streak,
          lastPlayDate: profile.last_play_date,
          totalPlayTime: profile.total_play_time,
          uniqueCommandsUsed,
          commandUsageCount,
          unlockedAchievements: achRows.map(r => r.achievement_id),
          badges: badgeRows.map(r => r.badge_id),
        },
      });
    } catch (error) {
      console.error('Error loading player state from SQLite:', error);
      dispatch({ type: ACTIONS.LOAD_STATE, payload: { createdAt: new Date().toISOString() } });
    }
  };

  const savePlayerStateToDB = async (db, uid, s) => {
    try {
      await savePlayerProfile(db, uid, s);
    } catch (error) {
      console.error('Error saving player profile to SQLite:', error);
    }
  };

  // Actions
  const setPlayerName = (name) => {
    dispatch({ type: ACTIONS.SET_PLAYER_NAME, payload: name });
  };

  const setAvatar = (avatar) => {
    dispatch({ type: ACTIONS.SET_AVATAR, payload: avatar });
  };

  const addXP = (amount) => {
    dispatch({ type: ACTIONS.ADD_XP, payload: amount });
  };

  const addGold = (amount) => {
    dispatch({ type: ACTIONS.ADD_GOLD, payload: amount });
  };

  const spendGold = (amount) => {
    if (state.gold >= amount) {
      dispatch({ type: ACTIONS.SPEND_GOLD, payload: amount });
      return true;
    }
    return false;
  };

  const recordCommand = (command) => {
    const baseCommand = command.trim().split(/\s+/)[0].toLowerCase();
    dispatch({ type: ACTIONS.RECORD_COMMAND, payload: baseCommand });
    if (dbRef.current && userId) {
      recordCommandUsage(dbRef.current, userId, baseCommand).catch(console.error);
    }
    checkAchievements(baseCommand);
  };

  const unlockAchievement = (achievementId) => {
    const achievement = ACHIEVEMENTS[achievementId];
    if (achievement && !state.unlockedAchievements.includes(achievementId)) {
      dispatch({ type: ACTIONS.UNLOCK_ACHIEVEMENT, payload: achievementId });
      if (dbRef.current && userId) {
        insertAchievement(dbRef.current, userId, achievementId).catch(console.error);
      }
      if (achievement.xpReward) {
        addXP(achievement.xpReward);
      }
      return achievement;
    }
    return null;
  };

  const addBadge = (badgeId) => {
    dispatch({ type: ACTIONS.ADD_BADGE, payload: badgeId });
    if (dbRef.current && userId) {
      insertBadge(dbRef.current, userId, badgeId).catch(console.error);
    }
  };

  const updateSettings = (settings) => {
    dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: settings });
  };

  const updateStreak = () => {
    dispatch({ type: ACTIONS.UPDATE_STREAK });
  };

  const addPlayTime = (seconds) => {
    dispatch({ type: ACTIONS.ADD_PLAY_TIME, payload: seconds });
  };

  const resetPlayer = async () => {
    if (dbRef.current && userId) {
      await resetPlayerData(dbRef.current, userId);
    }
    dispatch({ type: ACTIONS.RESET_PLAYER });
  };

  // Check achievements based on current state
  const checkAchievements = (latestCommand) => {
    const newState = { ...state };
    newState.totalCommandsExecuted += 1;
    newState.commandUsageCount[latestCommand] = (newState.commandUsageCount[latestCommand] || 0) + 1;

    if (newState.totalCommandsExecuted === 1) {
      unlockAchievement('first_command');
    }

    if (newState.uniqueCommandsUsed.length >= 10) {
      unlockAchievement('command_novice');
    }
    if (newState.totalCommandsExecuted >= 50) {
      unlockAchievement('command_apprentice');
    }
    if (newState.totalCommandsExecuted >= 200) {
      unlockAchievement('command_master');
    }

    Object.entries(ACHIEVEMENTS).forEach(([id, achievement]) => {
      if (achievement.requirement?.type === 'command_usage') {
        const count = newState.commandUsageCount[achievement.requirement.command] || 0;
        if (count >= achievement.requirement.count) {
          unlockAchievement(id);
        }
      }
    });
  };

  // Computed values
  const level = getLevelForXP(state.xp);
  const levelProgress = getLevelProgress(state.xp);
  const xpToNextLevel = getXPForNextLevel(state.xp);

  const value = {
    ...state,
    level,
    levelProgress,
    xpToNextLevel,
    setPlayerName,
    setAvatar,
    addXP,
    addGold,
    spendGold,
    recordCommand,
    unlockAchievement,
    addBadge,
    updateSettings,
    updateStreak,
    addPlayTime,
    resetPlayer,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

// Custom hook
export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}

export default PlayerContext;
