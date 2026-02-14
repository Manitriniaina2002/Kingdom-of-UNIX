/**
 * SQLite Database Module - Persistence layer for UNIX Kingdom
 * Uses expo-sqlite legacy API for better standalone APK compatibility.
 * Falls back to a localStorage-based adapter on web.
 * Supports multi-user accounts and lesson progress tracking
 */

import { Platform } from 'react-native';
import { createWebDatabase } from './webDb';

let SQLite = null;
if (Platform.OS !== 'web') {
  SQLite = require('expo-sqlite/legacy');
}

const DB_NAME = 'kingdom_unix.db';

let _db = null;

/**
 * Open (or create) the database and run migrations
 */
export async function openDatabase() {
  if (_db) return _db;

  if (Platform.OS === 'web') {
    _db = createWebDatabase();
  } else {
    // Use legacy API with db.exec() - bypasses WebSQL transactions which can hang
    const db = SQLite.openDatabase(DB_NAME);
    console.log('Database - SQLite database opened');

    // Helper: normalize params - callers may pass (sql, [a,b]) or (sql, a, b)
    const normalizeParams = (args) => {
      if (args.length === 0) return [];
      if (args.length === 1 && Array.isArray(args[0])) return args[0];
      return args;
    };

    // Use db.exec() which is expo-sqlite's native batch execution method
    // Much more reliable than the WebSQL transaction API
    const execSql = (sql, params = []) => {
      return new Promise((resolve, reject) => {
        db.exec([{ sql, args: params }], false, (error, results) => {
          if (error) {
            console.error('Database - exec error:', error);
            reject(error);
            return;
          }
          if (results && results[0]) {
            if (results[0].error) {
              console.error('Database - SQL error:', results[0].error);
              reject(new Error(results[0].error.message || String(results[0].error)));
              return;
            }
            resolve(results[0]);
          } else {
            resolve({ rows: [], rowsAffected: 0, insertId: undefined });
          }
        });
      });
    };

    _db = {
      execAsync: async (sql) => {
        console.log('Database - execAsync called');
        await execSql(sql);
      },
      runAsync: async (sql, ...args) => {
        const params = normalizeParams(args);
        console.log('Database - runAsync called, params:', params.length);
        const result = await execSql(sql, params);
        return {
          lastInsertRowId: result.insertId,
          changes: result.rowsAffected || 0,
        };
      },
      getFirstAsync: async (sql, ...args) => {
        const params = normalizeParams(args);
        console.log('Database - getFirstAsync called');
        const result = await execSql(sql, params);
        if (result.rows && result.rows.length > 0) {
          return result.rows[0];
        }
        return null;
      },
      getAllAsync: async (sql, ...args) => {
        const params = normalizeParams(args);
        console.log('Database - getAllAsync called');
        const result = await execSql(sql, params);
        return result.rows || [];
      },
    };
  }

  await migrate(_db);
  return _db;
}

/**
 * Get the cached database instance (must call openDatabase first)
 */
export function getDB() {
  return _db;
}

// ──────────────────────── MIGRATIONS ────────────────────────

async function migrate(db) {
  console.log('Database - starting migrations');
  try {
    // Execute each statement individually for legacy API compatibility
    const statements = [
      `PRAGMA journal_mode = WAL`,
      
      `CREATE TABLE IF NOT EXISTS users (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        username      TEXT    UNIQUE NOT NULL,
        password_hash TEXT    NOT NULL,
        display_name  TEXT    NOT NULL,
        avatar        TEXT    DEFAULT '',
        created_at    TEXT    DEFAULT (datetime('now')),
        last_login    TEXT,
        is_guest      INTEGER DEFAULT 0
      )`,
      
      `CREATE TABLE IF NOT EXISTS player_profile (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id       INTEGER NOT NULL,
        player_name   TEXT    NOT NULL DEFAULT 'ATRIKA',
        avatar        TEXT    NOT NULL DEFAULT '',
        created_at    TEXT,
        xp            INTEGER NOT NULL DEFAULT 0,
        gold          INTEGER NOT NULL DEFAULT 50,
        total_commands_executed INTEGER NOT NULL DEFAULT 0,
        sound_enabled INTEGER NOT NULL DEFAULT 1,
        hints_enabled INTEGER NOT NULL DEFAULT 1,
        current_streak INTEGER NOT NULL DEFAULT 0,
        last_play_date TEXT,
        total_play_time INTEGER NOT NULL DEFAULT 0,
        UNIQUE(user_id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS player_commands (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id     INTEGER NOT NULL,
        command     TEXT    NOT NULL,
        usage_count INTEGER NOT NULL DEFAULT 1,
        UNIQUE(user_id, command)
      )`,
      
      `CREATE TABLE IF NOT EXISTS player_achievements (
        id             INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id        INTEGER NOT NULL,
        achievement_id TEXT    NOT NULL,
        unlocked_at    TEXT    NOT NULL DEFAULT (datetime('now')),
        UNIQUE(user_id, achievement_id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS player_badges (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id   INTEGER NOT NULL,
        badge_id  TEXT    NOT NULL,
        earned_at TEXT    NOT NULL DEFAULT (datetime('now')),
        UNIQUE(user_id, badge_id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS game_state (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id       INTEGER NOT NULL,
        game_started  INTEGER NOT NULL DEFAULT 0,
        UNIQUE(user_id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS completed_quests (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id      INTEGER NOT NULL,
        quest_id     TEXT    NOT NULL,
        completed_at TEXT    NOT NULL DEFAULT (datetime('now')),
        UNIQUE(user_id, quest_id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS unlocked_zones (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id     INTEGER NOT NULL,
        zone_id     TEXT    NOT NULL,
        unlocked_at TEXT    NOT NULL DEFAULT (datetime('now')),
        UNIQUE(user_id, zone_id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS lesson_progress (
        id                 INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id            INTEGER NOT NULL,
        lesson_id          TEXT    NOT NULL,
        completed          INTEGER DEFAULT 0,
        last_read_position INTEGER DEFAULT 0,
        completed_at       TEXT,
        UNIQUE(user_id, lesson_id)
      )`
    ];
    
    // Execute each statement individually
    for (let i = 0; i < statements.length; i++) {
      console.log(`Database - executing migration ${i + 1}/${statements.length}`);
      await db.runAsync(statements[i], []);
    }
    
    console.log('Database - migrations completed successfully');
  } catch (error) {
    console.error('Database - migration error:', error);
    throw error;
  }
}

// ──────────────────────── USER MANAGEMENT QUERIES ────────────────────────

/** Create a new user account */
export async function createUser(db, username, passwordHash, displayName, avatar = '', isGuest = 0) {
  console.log('Database - createUser called for username:', username);
  try {
    const result = await db.runAsync(
      `INSERT INTO users (username, password_hash, display_name, avatar, created_at, last_login, is_guest)
       VALUES (?, ?, ?, ?, datetime('now'), datetime('now'), ?)`,
      username,
      passwordHash,
      displayName,
      avatar,
      isGuest ? 1 : 0
    );
    const userId = result.lastInsertRowId;
    console.log('Database - user created with ID:', userId);

    // Initialize player_profile for the new user
    await db.runAsync(
      `INSERT OR IGNORE INTO player_profile (user_id) VALUES (?)`,
      userId
    );

    // Initialize game_state for the new user
    await db.runAsync(
      `INSERT OR IGNORE INTO game_state (user_id) VALUES (?)`,
      userId
    );

    // Ensure 'village' is always unlocked by default for the new user
    await db.runAsync(
      `INSERT OR IGNORE INTO unlocked_zones (user_id, zone_id) VALUES (?, ?)`,
      userId,
      'village'
    );

    console.log('Database - user initialization complete');
    return userId;
  } catch (error) {
    console.error('Database - createUser error:', error);
    throw error;
  }
}

/** Get a user by username */
export async function getUserByUsername(db, username) {
  return await db.getFirstAsync(
    `SELECT * FROM users WHERE username = ?`,
    username
  );
}

/** Get a user by id */
export async function getUserById(db, userId) {
  return await db.getFirstAsync(
    `SELECT * FROM users WHERE id = ?`,
    userId
  );
}

/** Get all users */
export async function getAllUsers(db) {
  return await db.getAllAsync(`SELECT * FROM users ORDER BY created_at DESC`);
}

/** Update user's last login timestamp */
export async function updateUserLastLogin(db, userId) {
  await db.runAsync(
    `UPDATE users SET last_login = datetime('now') WHERE id = ?`,
    userId
  );
}

/** Delete a user and all associated data */
export async function deleteUser(db, userId) {
  const tables = [
    'player_commands',
    'player_achievements',
    'player_badges',
    'completed_quests',
    'unlocked_zones',
    'lesson_progress',
    'game_state',
    'player_profile',
  ];
  for (const table of tables) {
    await db.runAsync(`DELETE FROM ${table} WHERE user_id = ?`, userId);
  }
  await db.runAsync(`DELETE FROM users WHERE id = ?`, userId);
}

// ──────────────────────── PLAYER QUERIES ────────────────────────

/** Load the player profile row for a given user */
export async function loadPlayerProfile(db, userId) {
  return await db.getFirstAsync(
    `SELECT * FROM player_profile WHERE user_id = ?`,
    userId
  );
}

/** Save player profile (upsert for a given user) */
export async function savePlayerProfile(db, userId, profile) {
  await db.runAsync(
    `INSERT INTO player_profile (user_id, player_name, avatar, created_at, xp, gold,
       total_commands_executed, sound_enabled, hints_enabled, current_streak,
       last_play_date, total_play_time)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET
       player_name = excluded.player_name,
       avatar = excluded.avatar,
       created_at = excluded.created_at,
       xp = excluded.xp,
       gold = excluded.gold,
       total_commands_executed = excluded.total_commands_executed,
       sound_enabled = excluded.sound_enabled,
       hints_enabled = excluded.hints_enabled,
       current_streak = excluded.current_streak,
       last_play_date = excluded.last_play_date,
       total_play_time = excluded.total_play_time`,
    userId,
    profile.playerName ?? 'ATRIKA',
    profile.avatar ?? '',
    profile.createdAt ?? null,
    profile.xp ?? 0,
    profile.gold ?? 50,
    profile.totalCommandsExecuted ?? 0,
    profile.soundEnabled ? 1 : 0,
    profile.hintsEnabled ? 1 : 0,
    profile.currentStreak ?? 0,
    profile.lastPlayDate ?? null,
    profile.totalPlayTime ?? 0
  );
}

/** Load unique commands used + usage counts for a given user */
export async function loadPlayerCommands(db, userId) {
  return await db.getAllAsync(
    `SELECT command, usage_count FROM player_commands WHERE user_id = ?`,
    userId
  );
}

/** Record a command execution (upsert) for a given user */
export async function recordCommandUsage(db, userId, command) {
  await db.runAsync(
    `INSERT INTO player_commands (user_id, command, usage_count) VALUES (?, ?, 1)
     ON CONFLICT(user_id, command) DO UPDATE SET usage_count = usage_count + 1`,
    userId,
    command
  );
}

/** Load unlocked achievement IDs for a given user */
export async function loadAchievements(db, userId) {
  return await db.getAllAsync(
    `SELECT achievement_id FROM player_achievements WHERE user_id = ?`,
    userId
  );
}

/** Insert a new achievement for a given user */
export async function insertAchievement(db, userId, achievementId) {
  await db.runAsync(
    `INSERT OR IGNORE INTO player_achievements (user_id, achievement_id) VALUES (?, ?)`,
    userId,
    achievementId
  );
}

/** Load badge IDs for a given user */
export async function loadBadges(db, userId) {
  return await db.getAllAsync(
    `SELECT badge_id FROM player_badges WHERE user_id = ?`,
    userId
  );
}

/** Insert a new badge for a given user */
export async function insertBadge(db, userId, badgeId) {
  await db.runAsync(
    `INSERT OR IGNORE INTO player_badges (user_id, badge_id) VALUES (?, ?)`,
    userId,
    badgeId
  );
}

/** Reset all player data for a given user */
export async function resetPlayerData(db, userId) {
  await db.runAsync(`DELETE FROM player_commands WHERE user_id = ?`, userId);
  await db.runAsync(`DELETE FROM player_achievements WHERE user_id = ?`, userId);
  await db.runAsync(`DELETE FROM player_badges WHERE user_id = ?`, userId);
  await db.runAsync(
    `UPDATE player_profile SET
      player_name = 'ATRIKA',
      avatar = '',
      created_at = NULL,
      xp = 0,
      gold = 50,
      total_commands_executed = 0,
      sound_enabled = 1,
      hints_enabled = 1,
      current_streak = 0,
      last_play_date = NULL,
      total_play_time = 0
    WHERE user_id = ?`,
    userId
  );
}

// ──────────────────────── GAME QUERIES ────────────────────────

/** Load game state row for a given user */
export async function loadGameState(db, userId) {
  return await db.getFirstAsync(
    `SELECT * FROM game_state WHERE user_id = ?`,
    userId
  );
}

/** Save game started flag for a given user */
export async function saveGameStarted(db, userId, started) {
  await db.runAsync(
    `INSERT INTO game_state (user_id, game_started) VALUES (?, ?)
     ON CONFLICT(user_id) DO UPDATE SET game_started = excluded.game_started`,
    userId,
    started ? 1 : 0
  );
}

/** Load completed quest IDs for a given user */
export async function loadCompletedQuests(db, userId) {
  return await db.getAllAsync(
    `SELECT quest_id FROM completed_quests WHERE user_id = ?`,
    userId
  );
}

/** Insert a completed quest for a given user */
export async function insertCompletedQuest(db, userId, questId) {
  await db.runAsync(
    `INSERT OR IGNORE INTO completed_quests (user_id, quest_id) VALUES (?, ?)`,
    userId,
    questId
  );
}

/** Load unlocked zone IDs for a given user */
export async function loadUnlockedZones(db, userId) {
  return await db.getAllAsync(
    `SELECT zone_id FROM unlocked_zones WHERE user_id = ?`,
    userId
  );
}

/** Insert an unlocked zone for a given user */
export async function insertUnlockedZone(db, userId, zoneId) {
  await db.runAsync(
    `INSERT OR IGNORE INTO unlocked_zones (user_id, zone_id) VALUES (?, ?)`,
    userId,
    zoneId
  );
}

/** Reset all game data for a given user */
export async function resetGameData(db, userId) {
  await db.runAsync(`DELETE FROM completed_quests WHERE user_id = ?`, userId);
  await db.runAsync(`DELETE FROM unlocked_zones WHERE user_id = ?`, userId);
  await db.runAsync(
    `UPDATE game_state SET game_started = 0 WHERE user_id = ?`,
    userId
  );
  // Re-insert default zone for this user
  await db.runAsync(
    `INSERT OR IGNORE INTO unlocked_zones (user_id, zone_id) VALUES (?, ?)`,
    userId,
    'village'
  );
}

// ──────────────────────── LESSON PROGRESS QUERIES ────────────────────────

/** Load lesson progress for a specific lesson and user */
export async function loadLessonProgress(db, userId, lessonId) {
  return await db.getFirstAsync(
    `SELECT * FROM lesson_progress WHERE user_id = ? AND lesson_id = ?`,
    userId,
    lessonId
  );
}

/** Save lesson progress (upsert) for a given user and lesson */
export async function saveLessonProgress(db, userId, lessonId, lastReadPosition) {
  await db.runAsync(
    `INSERT INTO lesson_progress (user_id, lesson_id, last_read_position)
     VALUES (?, ?, ?)
     ON CONFLICT(user_id, lesson_id) DO UPDATE SET
       last_read_position = excluded.last_read_position`,
    userId,
    lessonId,
    lastReadPosition
  );
}

/** Mark a lesson as complete for a given user */
export async function markLessonComplete(db, userId, lessonId) {
  await db.runAsync(
    `INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at)
     VALUES (?, ?, 1, datetime('now'))
     ON CONFLICT(user_id, lesson_id) DO UPDATE SET
       completed = 1,
       completed_at = datetime('now')`,
    userId,
    lessonId
  );
}
