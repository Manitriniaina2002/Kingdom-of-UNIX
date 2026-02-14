/**
 * Lesson Context - Tracks lesson reading progress per user
 * Persistence via SQLite (expo-sqlite)
 */

import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import {
  openDatabase,
  saveLessonProgress,
  markLessonComplete,
} from '../database/db';
import { useAuth } from './AuthContext';

const LessonContext = createContext();

const initialState = {
  completedLessons: [],   // array of lesson IDs
  readPositions: {},       // { lessonId: scrollPosition }
  isLoading: true,
};

const ACTIONS = {
  LOAD_STATE: 'LOAD_STATE',
  COMPLETE_LESSON: 'COMPLETE_LESSON',
  UPDATE_POSITION: 'UPDATE_POSITION',
  RESET: 'RESET',
};

function lessonReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_STATE:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    case ACTIONS.COMPLETE_LESSON:
      if (state.completedLessons.includes(action.payload)) return state;
      return {
        ...state,
        completedLessons: [...state.completedLessons, action.payload],
      };

    case ACTIONS.UPDATE_POSITION:
      return {
        ...state,
        readPositions: {
          ...state.readPositions,
          [action.payload.lessonId]: action.payload.position,
        },
      };

    case ACTIONS.RESET:
      return { ...initialState, isLoading: false };

    default:
      return state;
  }
}

export function LessonProvider({ children }) {
  const [state, dispatch] = useReducer(lessonReducer, initialState);
  const dbRef = useRef(null);
  const { currentUser } = useAuth();
  const userId = currentUser?.id;

  // Load lesson progress when user changes
  useEffect(() => {
    if (!userId) {
      dispatch({ type: ACTIONS.RESET });
      return;
    }
    (async () => {
      try {
        const db = await openDatabase();
        dbRef.current = db;
        const rows = await db.getAllAsync(
          'SELECT lesson_id, completed, last_read_position FROM lesson_progress WHERE user_id = ?',
          userId
        );
        const completedLessons = rows.filter(r => r.completed).map(r => r.lesson_id);
        const readPositions = {};
        rows.forEach(r => { readPositions[r.lesson_id] = r.last_read_position || 0; });
        dispatch({
          type: ACTIONS.LOAD_STATE,
          payload: { completedLessons, readPositions },
        });
      } catch (error) {
        console.error('LessonContext load error:', error);
        dispatch({ type: ACTIONS.LOAD_STATE, payload: {} });
      }
    })();
  }, [userId]);

  const completeLesson = useCallback(async (lessonId) => {
    dispatch({ type: ACTIONS.COMPLETE_LESSON, payload: lessonId });
    if (dbRef.current && userId) {
      await markLessonComplete(dbRef.current, userId, lessonId);
    }
  }, [userId]);

  const updateReadPosition = useCallback(async (lessonId, position) => {
    dispatch({ type: ACTIONS.UPDATE_POSITION, payload: { lessonId, position } });
    if (dbRef.current && userId) {
      await saveLessonProgress(dbRef.current, userId, lessonId, position);
    }
  }, [userId]);

  const isLessonCompleted = useCallback((lessonId) => {
    return state.completedLessons.includes(lessonId);
  }, [state.completedLessons]);

  const getReadPosition = useCallback((lessonId) => {
    return state.readPositions[lessonId] || 0;
  }, [state.readPositions]);

  const value = {
    ...state,
    completeLesson,
    updateReadPosition,
    isLessonCompleted,
    getReadPosition,
  };

  return (
    <LessonContext.Provider value={value}>
      {children}
    </LessonContext.Provider>
  );
}

export function useLesson() {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLesson must be used within a LessonProvider');
  }
  return context;
}

export default LessonContext;
