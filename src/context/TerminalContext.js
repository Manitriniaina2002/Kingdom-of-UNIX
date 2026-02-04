/**
 * Terminal Context - Sandboxed terminal state and virtual filesystem
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { parseCommand, executeCommand } from '../utils/commandParser';
import { createVirtualFilesystem } from '../utils/virtualFilesystem';

const TerminalContext = createContext();

// Initial state
const initialState = {
  // Terminal output history
  history: [
    {
      type: 'system',
      content: '🏰 Welcome to the Kingdom of UNIX Terminal!',
      timestamp: Date.now(),
    },
    {
      type: 'info',
      content: 'Type "help" for a list of commands, or start a quest to learn!',
      timestamp: Date.now(),
    },
  ],
  
  // Command history for up/down navigation
  commandHistory: [],
  historyIndex: -1,
  
  // Current input
  currentInput: '',
  
  // Virtual filesystem
  filesystem: createVirtualFilesystem(),
  currentPath: '/home/adventurer',
  
  // Quest mode
  questMode: false,
  currentQuestId: null,
  currentObjectiveIndex: 0,
  questStartTime: null,
  hintsUsed: 0,
  
  // Terminal state
  isProcessing: false,
  lastCommand: null,
  lastResult: null,
};

// Action types
const ACTIONS = {
  ADD_OUTPUT: 'ADD_OUTPUT',
  CLEAR_TERMINAL: 'CLEAR_TERMINAL',
  SET_INPUT: 'SET_INPUT',
  EXECUTE_COMMAND: 'EXECUTE_COMMAND',
  UPDATE_PATH: 'UPDATE_PATH',
  UPDATE_FILESYSTEM: 'UPDATE_FILESYSTEM',
  START_QUEST_MODE: 'START_QUEST_MODE',
  END_QUEST_MODE: 'END_QUEST_MODE',
  ADVANCE_OBJECTIVE: 'ADVANCE_OBJECTIVE',
  USE_HINT: 'USE_HINT',
  SET_PROCESSING: 'SET_PROCESSING',
  NAVIGATE_HISTORY: 'NAVIGATE_HISTORY',
  RESET_TERMINAL: 'RESET_TERMINAL',
};

// Reducer
function terminalReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_OUTPUT:
      return {
        ...state,
        history: [...state.history, {
          ...action.payload,
          timestamp: Date.now(),
        }],
      };
    
    case ACTIONS.CLEAR_TERMINAL:
      return {
        ...state,
        history: [{
          type: 'system',
          content: '🧹 Terminal cleared',
          timestamp: Date.now(),
        }],
      };
    
    case ACTIONS.SET_INPUT:
      return {
        ...state,
        currentInput: action.payload,
        historyIndex: -1,
      };
    
    case ACTIONS.EXECUTE_COMMAND:
      return {
        ...state,
        commandHistory: [action.payload, ...state.commandHistory].slice(0, 100),
        lastCommand: action.payload,
        currentInput: '',
        historyIndex: -1,
      };
    
    case ACTIONS.UPDATE_PATH:
      return {
        ...state,
        currentPath: action.payload,
      };
    
    case ACTIONS.UPDATE_FILESYSTEM:
      return {
        ...state,
        filesystem: action.payload,
      };
    
    case ACTIONS.START_QUEST_MODE:
      return {
        ...state,
        questMode: true,
        currentQuestId: action.payload.questId,
        currentObjectiveIndex: 0,
        questStartTime: Date.now(),
        hintsUsed: 0,
        // Reset to quest-specific filesystem if provided
        filesystem: action.payload.filesystem || state.filesystem,
        currentPath: action.payload.startPath || '/home/adventurer',
      };
    
    case ACTIONS.END_QUEST_MODE:
      return {
        ...state,
        questMode: false,
        currentQuestId: null,
        currentObjectiveIndex: 0,
        questStartTime: null,
      };
    
    case ACTIONS.ADVANCE_OBJECTIVE:
      return {
        ...state,
        currentObjectiveIndex: state.currentObjectiveIndex + 1,
      };
    
    case ACTIONS.USE_HINT:
      return {
        ...state,
        hintsUsed: state.hintsUsed + 1,
      };
    
    case ACTIONS.SET_PROCESSING:
      return {
        ...state,
        isProcessing: action.payload,
      };
    
    case ACTIONS.NAVIGATE_HISTORY: {
      const direction = action.payload;
      const newIndex = direction === 'up'
        ? Math.min(state.historyIndex + 1, state.commandHistory.length - 1)
        : Math.max(state.historyIndex - 1, -1);
      
      return {
        ...state,
        historyIndex: newIndex,
        currentInput: newIndex >= 0 ? state.commandHistory[newIndex] : '',
      };
    }
    
    case ACTIONS.RESET_TERMINAL:
      return {
        ...initialState,
        filesystem: createVirtualFilesystem(),
      };
    
    default:
      return state;
  }
}

// Provider component
export function TerminalProvider({ children }) {
  const [state, dispatch] = useReducer(terminalReducer, initialState);

  // Add output to terminal
  const addOutput = useCallback((type, content) => {
    dispatch({
      type: ACTIONS.ADD_OUTPUT,
      payload: { type, content },
    });
  }, []);

  // Clear terminal
  const clearTerminal = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_TERMINAL });
  }, []);

  // Set current input
  const setInput = useCallback((input) => {
    dispatch({ type: ACTIONS.SET_INPUT, payload: input });
  }, []);

  // Execute a command
  const runCommand = useCallback((commandString) => {
    if (!commandString.trim()) return null;

    dispatch({ type: ACTIONS.SET_PROCESSING, payload: true });
    dispatch({ type: ACTIONS.EXECUTE_COMMAND, payload: commandString });

    // Add command to output
    addOutput('command', `$ ${commandString}`);

    // Parse and execute
    const parsed = parseCommand(commandString);
    const result = executeCommand(parsed, state.filesystem, state.currentPath);

    // Handle result
    if (result.output) {
      addOutput(result.success ? 'output' : 'error', result.output);
    }

    if (result.newPath) {
      dispatch({ type: ACTIONS.UPDATE_PATH, payload: result.newPath });
    }

    if (result.newFilesystem) {
      dispatch({ type: ACTIONS.UPDATE_FILESYSTEM, payload: result.newFilesystem });
    }

    if (result.clear) {
      clearTerminal();
    }

    dispatch({ type: ACTIONS.SET_PROCESSING, payload: false });

    return {
      success: result.success,
      command: parsed.command,
      args: parsed.args,
    };
  }, [state.filesystem, state.currentPath, addOutput, clearTerminal]);

  // Navigate command history
  const navigateHistory = useCallback((direction) => {
    dispatch({ type: ACTIONS.NAVIGATE_HISTORY, payload: direction });
  }, []);

  // Start quest mode
  const startQuestMode = useCallback((questId, filesystem, startPath) => {
    dispatch({
      type: ACTIONS.START_QUEST_MODE,
      payload: { questId, filesystem, startPath },
    });
    addOutput('system', '📜 Quest mode activated! Follow the objectives to complete the quest.');
  }, [addOutput]);

  // End quest mode
  const endQuestMode = useCallback(() => {
    dispatch({ type: ACTIONS.END_QUEST_MODE });
    addOutput('system', '🏁 Quest mode ended.');
  }, [addOutput]);

  // Advance to next objective
  const advanceObjective = useCallback(() => {
    dispatch({ type: ACTIONS.ADVANCE_OBJECTIVE });
  }, []);

  // Use a hint
  const useHint = useCallback((hint) => {
    dispatch({ type: ACTIONS.USE_HINT });
    addOutput('hint', `💡 Hint: ${hint}`);
  }, [addOutput]);

  // Reset terminal
  const resetTerminal = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_TERMINAL });
  }, []);

  // Get quest duration in seconds
  const getQuestDuration = useCallback(() => {
    if (!state.questStartTime) return 0;
    return Math.floor((Date.now() - state.questStartTime) / 1000);
  }, [state.questStartTime]);

  const value = {
    ...state,
    addOutput,
    clearTerminal,
    setInput,
    runCommand,
    navigateHistory,
    startQuestMode,
    endQuestMode,
    advanceObjective,
    useHint,
    resetTerminal,
    getQuestDuration,
  };

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
}

// Custom hook
export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}

export default TerminalContext;
