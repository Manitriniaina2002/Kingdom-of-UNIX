/**
 * Auth Context - User authentication and account management
 * Handles signup, login, guest accounts, and multi-user switching
 * Persistence via SQLite (expo-sqlite) + expo-crypto for password hashing
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  openDatabase,
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  updateUserLastLogin,
  deleteUser,
} from '../database/db';
import CryptoJS from 'crypto-js';

const AuthContext = createContext();

// ──────────────────────── INITIAL STATE ────────────────────────

const initialState = {
  currentUser: null, // { id, username, displayName, avatar, isGuest, createdAt, lastLogin }
  users: [],         // all registered users
  isAuthenticated: false,
  isLoading: true,
};

// ──────────────────────── ACTION TYPES ────────────────────────

const ACTIONS = {
  LOAD_USERS: 'LOAD_USERS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  ADD_USER: 'ADD_USER',
  REMOVE_USER: 'REMOVE_USER',
};

// ──────────────────────── REDUCER ────────────────────────

function authReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ACTIONS.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case ACTIONS.REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };

    default:
      return state;
  }
}

// ──────────────────────── HELPERS ────────────────────────

/**
 * Hash a plain-text password using SHA-256 via crypto-js.
 * Returns the hex digest string.
 */
async function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}

/**
 * Map a raw DB row into the user shape consumed by the rest of the app.
 */
function mapUserRow(row) {
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    avatar: row.avatar,
    isGuest: !!row.is_guest,
    createdAt: row.created_at,
    lastLogin: row.last_login,
  };
}

// ──────────────────────── PROVIDER ────────────────────────

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const dbRef = useRef(null);

  /**
   * Ensure the database is open. Returns the db handle.
   * Safe to call multiple times – reuses the cached ref.
   */
  const ensureDB = useCallback(async () => {
    if (dbRef.current) return dbRef.current;
    const db = await openDatabase();
    dbRef.current = db;
    return db;
  }, []);

  // ── Initialize on mount ────────────────────────────────
  const initialize = useCallback(async () => {
    // Set a timeout to ensure we always stop loading, even if initialization fails
    const timeoutId = setTimeout(() => {
      console.warn('AuthContext - initialization timeout after 5 seconds');
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }, 5000);

    try {
      console.log('AuthContext - starting initialization');
      const db = await ensureDB();
      console.log('AuthContext - database opened successfully');

      // Load every registered user
      const rows = await getAllUsers(db);
      const users = rows.map(mapUserRow);
      console.log('AuthContext - loaded', users.length, 'users');

      dispatch({ type: ACTIONS.LOAD_USERS, payload: users });

      if (users.length > 0) {
        // Auto-login the user with the most recent lastLogin timestamp
        const sorted = [...users].sort((a, b) => {
          if (!a.lastLogin) return 1;
          if (!b.lastLogin) return -1;
          return new Date(b.lastLogin) - new Date(a.lastLogin);
        });

        const mostRecent = sorted[0];

        // Only auto-login if the user actually has a lastLogin value
        if (mostRecent.lastLogin) {
          console.log('AuthContext - auto-login user:', mostRecent.username);
          await updateUserLastLogin(db, mostRecent.id);
          const now = new Date().toISOString();
          dispatch({
            type: ACTIONS.SET_CURRENT_USER,
            payload: { ...mostRecent, lastLogin: now },
          });
        }
      }

      console.log('AuthContext - initialization complete');
      clearTimeout(timeoutId);
    } catch (error) {
      console.error('AuthContext – initialization error:', error);
      clearTimeout(timeoutId);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, [ensureDB]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // ── Signup ─────────────────────────────────────────────
  const signup = useCallback(
    async (username, password, displayName, avatar = '') => {
      console.log('AuthContext - signup attempt for username:', username);
      try {
        const db = await ensureDB();
        console.log('AuthContext - database ready for signup');

        // Prevent duplicate usernames
        const existing = await getUserByUsername(db, username);
        if (existing) {
          console.log('AuthContext - username already exists');
          throw new Error('Username already taken');
        }

        console.log('AuthContext - hashing password');
        const passwordHash = await hashPassword(password);
        const now = new Date().toISOString();

        console.log('AuthContext - creating user in database');
        const userId = await createUser(db, username, passwordHash, displayName || username, avatar, false);
        console.log('AuthContext - user created with ID:', userId);

        const newUser = {
          id: userId,
          username,
          displayName: displayName || username,
          avatar,
          isGuest: false,
          createdAt: now,
          lastLogin: now,
        };

        dispatch({ type: ACTIONS.ADD_USER, payload: newUser });
        dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: newUser });

        console.log('AuthContext - signup successful');
        return newUser;
      } catch (error) {
        console.error('AuthContext - signup error:', error);
        throw error;
      }
    },
    [ensureDB],
  );

  // ── Login ──────────────────────────────────────────────
  const login = useCallback(async (username, password) => {
    const db = await ensureDB();

    const row = await getUserByUsername(db, username);
    if (!row) {
      throw new Error('User not found');
    }

    const passwordHash = await hashPassword(password);
    if (passwordHash !== row.password_hash) {
      throw new Error('Invalid password');
    }

    const now = new Date().toISOString();
    await updateUserLastLogin(db, row.id);

    const user = { ...mapUserRow(row), lastLogin: now };

    dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: user });

    // Also refresh the users list with the updated lastLogin
    const allUsers = await getAllUsers(db);
    dispatch({
      type: ACTIONS.LOAD_USERS,
      payload: allUsers.map(mapUserRow),
    });

    return user;
  }, [ensureDB]);

  // ── Login as Guest ─────────────────────────────────────
  const loginAsGuest = useCallback(async () => {
    const db = await ensureDB();

    // Generate a random 4-character hex suffix
    const randomSuffix = Math.floor(Math.random() * 0xFFFF)
      .toString(16)
      .toUpperCase()
      .padStart(4, '0');
    const guestUsername = `Guest_${randomSuffix}`;
    const now = new Date().toISOString();

    const userId = await createUser(db, guestUsername, '', guestUsername, '', true);

    const guestUser = {
      id: userId,
      username: guestUsername,
      displayName: guestUsername,
      avatar: '',
      isGuest: true,
      createdAt: now,
      lastLogin: now,
    };

    dispatch({ type: ACTIONS.ADD_USER, payload: guestUser });
    dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: guestUser });

    return guestUser;
  }, [ensureDB]);

  // ── Logout ─────────────────────────────────────────────
  const logout = useCallback(() => {
    dispatch({ type: ACTIONS.LOGOUT });
  }, []);

  // ── Switch User ────────────────────────────────────────
  const switchUser = useCallback(async (userId) => {
    const db = await ensureDB();

    const row = await getUserById(db, userId);
    if (!row) {
      throw new Error('User not found');
    }

    const now = new Date().toISOString();
    await updateUserLastLogin(db, row.id);

    const user = { ...mapUserRow(row), lastLogin: now };

    dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: user });

    // Refresh users list
    dispatch({
      type: ACTIONS.LOAD_USERS,
      payload: state.users.map((u) => (u.id === user.id ? user : u)),
    });

    return user;
  }, [state.users, ensureDB]);

  // ── Delete Account ─────────────────────────────────────
  const deleteAccount = useCallback(
    async (userId) => {
      const db = await ensureDB();

      await deleteUser(db, userId);

      dispatch({ type: ACTIONS.REMOVE_USER, payload: userId });

      // If the deleted user is the currently logged-in user, log out
      if (state.currentUser && state.currentUser.id === userId) {
        dispatch({ type: ACTIONS.LOGOUT });
      }
    },
    [state.currentUser, ensureDB],
  );

  // ── Update Profile ─────────────────────────────────────
  const updateProfile = useCallback(
    async (displayName, avatar) => {
      const db = await ensureDB();
      if (!state.currentUser) throw new Error('No user logged in');

      await db.runAsync(
        `UPDATE users SET display_name = ?, avatar = ? WHERE id = ?`,
        displayName,
        avatar,
        state.currentUser.id,
      );

      const updatedUser = {
        ...state.currentUser,
        displayName,
        avatar,
      };

      dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: updatedUser });

      // Refresh users list
      dispatch({
        type: ACTIONS.LOAD_USERS,
        payload: state.users.map((u) =>
          u.id === updatedUser.id ? updatedUser : u,
        ),
      });

      return updatedUser;
    },
    [state.currentUser, state.users, ensureDB],
  );

  // ── Context value ──────────────────────────────────────

  const value = {
    // State
    currentUser: state.currentUser,
    users: state.users,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,

    // Methods
    initialize,
    signup,
    login,
    loginAsGuest,
    logout,
    switchUser,
    deleteAccount,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ──────────────────────── HOOK ────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
