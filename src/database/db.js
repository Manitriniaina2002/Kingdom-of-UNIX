/**
 * SQLite Database Module - Persistence layer for Kingdom of UNIX
 * Uses expo-sqlite (v14) with async API
 */

import * as SQLite from 'expo-sqlite';

const DB_NAME = 'kingdom_unix.db';

let _db = null;

/**
 * Open (or create) the database and run migrations
 */
export async function openDatabase() {
  if (_db) return _db;
  _db = await SQLite.openDatabaseAsync(DB_NAME);
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
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS player_profile (
      id            INTEGER PRIMARY KEY CHECK (id = 1),
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
      total_play_time INTEGER NOT NULL DEFAULT 0
    );

    INSERT OR IGNORE INTO player_profile (id) VALUES (1);

    CREATE TABLE IF NOT EXISTS player_commands (
      command     TEXT PRIMARY KEY,
      usage_count INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS player_achievements (
      achievement_id TEXT PRIMARY KEY,
      unlocked_at    TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS player_badges (
      badge_id   TEXT PRIMARY KEY,
      earned_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS game_state (
      id            INTEGER PRIMARY KEY CHECK (id = 1),
      game_started  INTEGER NOT NULL DEFAULT 0
    );

    INSERT OR IGNORE INTO game_state (id) VALUES (1);

    CREATE TABLE IF NOT EXISTS completed_quests (
      quest_id     TEXT PRIMARY KEY,
      completed_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS unlocked_zones (
      zone_id     TEXT PRIMARY KEY,
      unlocked_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Ensure 'village' is always unlocked by default
  await db.runAsync(
    `INSERT OR IGNORE INTO unlocked_zones (zone_id) VALUES (?)`,
    'village'
  );
}

// ──────────────────────── PLAYER QUERIES ────────────────────────

/** Load the single player profile row */
export async function loadPlayerProfile(db) {
  return await db.getFirstAsync(`SELECT * FROM player_profile WHERE id = 1`);
}

/** Save player profile (upsert) */
export async function savePlayerProfile(db, profile) {
  await db.runAsync(
    `UPDATE player_profile SET
       player_name = ?,
       avatar = ?,
       created_at = ?,
       xp = ?,
       gold = ?,
       total_commands_executed = ?,
       sound_enabled = ?,
       hints_enabled = ?,
       current_streak = ?,
       last_play_date = ?,
       total_play_time = ?
     WHERE id = 1`,
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
    profile.totalPlayTime ?? 0,
  );
}

/** Load unique commands used + usage counts */
export async function loadPlayerCommands(db) {
  return await db.getAllAsync(`SELECT command, usage_count FROM player_commands`);
}

/** Record a command execution (upsert) */
export async function recordCommandUsage(db, command) {
  await db.runAsync(
    `INSERT INTO player_commands (command, usage_count) VALUES (?, 1)
     ON CONFLICT(command) DO UPDATE SET usage_count = usage_count + 1`,
    command
  );
}

/** Load unlocked achievement IDs */
export async function loadAchievements(db) {
  return await db.getAllAsync(`SELECT achievement_id FROM player_achievements`);
}

/** Insert a new achievement */
export async function insertAchievement(db, achievementId) {
  await db.runAsync(
    `INSERT OR IGNORE INTO player_achievements (achievement_id) VALUES (?)`,
    achievementId
  );
}

/** Load badge IDs */
export async function loadBadges(db) {
  return await db.getAllAsync(`SELECT badge_id FROM player_badges`);
}

/** Insert a new badge */
export async function insertBadge(db, badgeId) {
  await db.runAsync(
    `INSERT OR IGNORE INTO player_badges (badge_id) VALUES (?)`,
    badgeId
  );
}

/** Reset all player data */
export async function resetPlayerData(db) {
  await db.execAsync(`
    DELETE FROM player_commands;
    DELETE FROM player_achievements;
    DELETE FROM player_badges;
    UPDATE player_profile SET
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
    WHERE id = 1;
  `);
}

// ──────────────────────── GAME QUERIES ────────────────────────

/** Load game state row */
export async function loadGameState(db) {
  return await db.getFirstAsync(`SELECT * FROM game_state WHERE id = 1`);
}

/** Save game started flag */
export async function saveGameStarted(db, started) {
  await db.runAsync(
    `UPDATE game_state SET game_started = ? WHERE id = 1`,
    started ? 1 : 0
  );
}

/** Load completed quest IDs */
export async function loadCompletedQuests(db) {
  return await db.getAllAsync(`SELECT quest_id FROM completed_quests`);
}

/** Insert a completed quest */
export async function insertCompletedQuest(db, questId) {
  await db.runAsync(
    `INSERT OR IGNORE INTO completed_quests (quest_id) VALUES (?)`,
    questId
  );
}

/** Load unlocked zone IDs */
export async function loadUnlockedZones(db) {
  return await db.getAllAsync(`SELECT zone_id FROM unlocked_zones`);
}

/** Insert an unlocked zone */
export async function insertUnlockedZone(db, zoneId) {
  await db.runAsync(
    `INSERT OR IGNORE INTO unlocked_zones (zone_id) VALUES (?)`,
    zoneId
  );
}

/** Reset all game data */
export async function resetGameData(db) {
  await db.execAsync(`
    DELETE FROM completed_quests;
    DELETE FROM unlocked_zones;
    UPDATE game_state SET game_started = 0 WHERE id = 1;
  `);
  // Re-insert default zone
  await db.runAsync(
    `INSERT OR IGNORE INTO unlocked_zones (zone_id) VALUES (?)`,
    'village'
  );
}
