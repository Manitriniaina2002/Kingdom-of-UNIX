/**
 * Web-compatible database adapter
 * Uses localStorage to persist data on web where expo-sqlite is not available.
 * Implements the same async API surface as expo-sqlite (runAsync, getFirstAsync, getAllAsync, execAsync).
 */

const STORAGE_KEY = 'kingdom_unix_db';

/** Auto-increment counters keyed by table name */
let _counters = {};

/** In-memory tables: { tableName: [ row, row, … ] } */
let _tables = {};

/** Whether we've loaded from localStorage yet */
let _loaded = false;

// ── Persistence helpers ──────────────────────────────────

function _load() {
  if (_loaded) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      _tables = parsed.tables || {};
      _counters = parsed.counters || {};
    }
  } catch (e) {
    console.warn('webDb – failed to load from localStorage:', e);
  }
  _loaded = true;
}

function _save() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tables: _tables, counters: _counters }),
    );
  } catch (e) {
    console.warn('webDb – failed to save to localStorage:', e);
  }
}

function _ensureTable(name) {
  if (!_tables[name]) _tables[name] = [];
  if (_counters[name] == null) _counters[name] = 0;
}

function _nextId(table) {
  _counters[table] = (_counters[table] || 0) + 1;
  return _counters[table];
}

function _now() {
  return new Date().toISOString().replace('T', ' ').replace('Z', '');
}

// ── SQL-ish parser (very minimal – only handles the queries used in db.js) ──

/**
 * Parse a simplistic INSERT statement.
 * Returns { table, columns, values, onConflict } or null.
 */
function _parseInsert(sql, params) {
  // INSERT INTO <table> (<cols>) VALUES (<placeholders>) [ON CONFLICT(...) DO UPDATE SET ...]
  // INSERT OR IGNORE INTO <table> ...
  const orIgnore = /INSERT\s+OR\s+IGNORE/i.test(sql);

  // Match table and columns (columns never contain parens, so [^)]+ is fine)
  const tableMatch = sql.match(
    /INSERT\s+(?:OR\s+IGNORE\s+)?INTO\s+(\w+)\s*\(([^)]+)\)/i,
  );
  if (!tableMatch) return null;

  const table = tableMatch[1];
  const columns = tableMatch[2].split(',').map((c) => c.trim());

  // Extract VALUES(...) content — may contain nested parens like datetime('now')
  const valuesStart = sql.search(/VALUES\s*\(/i);
  if (valuesStart === -1) return null;
  const afterValues = sql.slice(valuesStart);
  const parenStart = afterValues.indexOf('(');
  let depth = 0;
  let parenEnd = -1;
  for (let i = parenStart; i < afterValues.length; i++) {
    if (afterValues[i] === '(') depth++;
    else if (afterValues[i] === ')') {
      depth--;
      if (depth === 0) { parenEnd = i; break; }
    }
  }
  if (parenEnd === -1) return null;

  const valuesContent = afterValues.slice(parenStart + 1, parenEnd);

  // Split on commas that are not inside parentheses
  const placeholders = [];
  let current = '';
  let parenDepth = 0;
  for (const ch of valuesContent) {
    if (ch === '(') parenDepth++;
    else if (ch === ')') parenDepth--;
    else if (ch === ',' && parenDepth === 0) {
      placeholders.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  if (current.trim()) placeholders.push(current.trim());

  const values = {};
  let paramIdx = 0;
  columns.forEach((col, i) => {
    const ph = placeholders[i];
    if (ph === '?') {
      values[col] = params[paramIdx++];
    } else if (/datetime\s*\(\s*'now'\s*\)/i.test(ph)) {
      values[col] = _now();
    } else if (ph != null) {
      // literal or default
      values[col] = ph.replace(/^'|'$/g, '');
    } else {
      values[col] = null;
    }
  });

  // ON CONFLICT … DO UPDATE SET …
  let onConflictUpdate = null;
  const conflictMatch = sql.match(
    /ON\s+CONFLICT\s*\([^)]+\)\s+DO\s+UPDATE\s+SET\s+(.*)/is,
  );
  if (conflictMatch) {
    onConflictUpdate = conflictMatch[1];
  }

  return { table, columns, values, orIgnore, onConflictUpdate };
}

function _parseUpdate(sql, params) {
  const m = sql.match(
    /UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+)/i,
  );
  if (!m) return null;

  const table = m[1];
  const setPart = m[2];
  const wherePart = m[3];

  return { table, setPart, wherePart, params };
}

function _parseSelect(sql) {
  const m = sql.match(
    /SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+?))?(?:\s+ORDER\s+BY\s+([\s\S]+))?$/i,
  );
  if (!m) return null;
  return {
    columns: m[1].trim(),
    table: m[2],
    where: m[3] || null,
    orderBy: m[4] || null,
  };
}

function _parseDelete(sql) {
  const m = sql.match(/DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?/i);
  if (!m) return null;
  return { table: m[1], where: m[2] || null };
}

// ── Simple WHERE evaluator ──────────────────────────────

function _evaluateWhere(row, whereSql, params) {
  if (!whereSql) return true;

  // Handle AND
  const andParts = whereSql.split(/\s+AND\s+/i);
  let paramIdx = 0;

  return andParts.every((part) => {
    const eqMatch = part.match(/(\w+)\s*=\s*\?/);
    if (eqMatch) {
      const col = eqMatch[1];
      const val = params[paramIdx++];
      return row[col] == val; // loose comparison intentional
    }
    return true;
  });
}

// ── The web database object that mimics expo-sqlite's async API ──

class WebDatabase {
  /**
   * Execute arbitrary SQL (used for migrations / multi-statement).
   * On web we just ensure the tables exist in memory.
   */
  async execAsync(sql) {
    _load();
    // Extract CREATE TABLE statements to ensure tables exist
    const createRegex =
      /CREATE\s+TABLE\s+IF\s+NOT\s+EXISTS\s+(\w+)/gi;
    let match;
    while ((match = createRegex.exec(sql)) !== null) {
      _ensureTable(match[1]);
    }

    // Handle inline DELETE statements (used in deleteUser)
    const deleteRegex = /DELETE\s+FROM\s+(\w+)\s+WHERE\s+user_id\s*=\s*(\d+)/gi;
    while ((match = deleteRegex.exec(sql)) !== null) {
      const table = match[1];
      const userId = parseInt(match[2], 10);
      _ensureTable(table);
      _tables[table] = _tables[table].filter((r) => r.user_id != userId);
    }

    // Handle inline DELETE without WHERE for users table
    const deleteUserRegex = /DELETE\s+FROM\s+users\s+WHERE\s+id\s*=\s*(\d+)/gi;
    while ((match = deleteUserRegex.exec(sql)) !== null) {
      const userId = parseInt(match[1], 10);
      _ensureTable('users');
      _tables['users'] = _tables['users'].filter((r) => r.id != userId);
    }

    _save();
  }

  /**
   * Run an INSERT / UPDATE / DELETE and return { lastInsertRowId, changes }.
   */
  async runAsync(sql, ...params) {
    _load();
    const sqlTrimmed = sql.trim();

    // ── INSERT ──
    if (/^INSERT/i.test(sqlTrimmed)) {
      const parsed = _parseInsert(sqlTrimmed, params);
      if (!parsed) {
        console.warn('webDb.runAsync – unsupported INSERT:', sql);
        return { lastInsertRowId: 0, changes: 0 };
      }

      _ensureTable(parsed.table);
      const rows = _tables[parsed.table];

      // Determine unique constraint columns from schema patterns
      const uniqueCols = _getUniqueConstraint(parsed.table, parsed.columns);

      // Check for conflict
      let existingIdx = -1;
      if (uniqueCols.length > 0) {
        existingIdx = rows.findIndex((r) =>
          uniqueCols.every((c) => r[c] != null && r[c] == parsed.values[c]),
        );
      }

      if (existingIdx >= 0) {
        if (parsed.orIgnore) {
          _save();
          return { lastInsertRowId: rows[existingIdx].id, changes: 0 };
        }
        if (parsed.onConflictUpdate) {
          // Apply the update using excluded.* values
          const setClauses = parsed.onConflictUpdate
            .split(',')
            .map((s) => s.trim());
          setClauses.forEach((clause) => {
            const m = clause.match(/(\w+)\s*=\s*excluded\.(\w+)/);
            if (m) {
              rows[existingIdx][m[1]] = parsed.values[m[2]];
            }
            const m2 = clause.match(/(\w+)\s*=\s*(\w+)\s*\+\s*1/);
            if (m2) {
              rows[existingIdx][m2[1]] = (rows[existingIdx][m2[1]] || 0) + 1;
            }
            const m3 = clause.match(/(\w+)\s*=\s*datetime\('now'\)/i);
            if (m3) {
              rows[existingIdx][m3[1]] = _now();
            }
          });
          _save();
          return { lastInsertRowId: rows[existingIdx].id, changes: 1 };
        }
      }

      // Normal insert
      const id = _nextId(parsed.table);
      const newRow = { id, ...parsed.values };
      rows.push(newRow);
      _save();
      return { lastInsertRowId: id, changes: 1 };
    }

    // ── UPDATE ──
    if (/^UPDATE/i.test(sqlTrimmed)) {
      const parsed = _parseUpdate(sqlTrimmed, params);
      if (!parsed) {
        console.warn('webDb.runAsync – unsupported UPDATE:', sql);
        return { lastInsertRowId: 0, changes: 0 };
      }

      _ensureTable(parsed.table);
      const rows = _tables[parsed.table];

      // Build where params (they come after set params)
      // Count ? in SET part to know how many params are for SET
      const setQCount = (parsed.setPart.match(/\?/g) || []).length;
      const setParams = params.slice(0, setQCount);
      const whereParams = params.slice(setQCount);

      let changes = 0;
      rows.forEach((row) => {
        if (_evaluateWhere(row, parsed.wherePart, whereParams)) {
          // Apply SET clauses
          let spIdx = 0;
          const setClauses = parsed.setPart.split(',').map((s) => s.trim());
          setClauses.forEach((clause) => {
            const m = clause.match(/(\w+)\s*=\s*\?/);
            if (m) {
              row[m[1]] = setParams[spIdx++];
            }
            const m2 = clause.match(/(\w+)\s*=\s*datetime\('now'\)/i);
            if (m2) {
              row[m2[1]] = _now();
            }
            const m3 = clause.match(/(\w+)\s*=\s*(\d+)/);
            if (m3 && !m) {
              row[m3[1]] = parseInt(m3[2], 10);
            }
          });
          changes++;
        }
      });

      _save();
      return { lastInsertRowId: 0, changes };
    }

    // ── DELETE ──
    if (/^DELETE/i.test(sqlTrimmed)) {
      const parsed = _parseDelete(sqlTrimmed);
      if (!parsed) {
        console.warn('webDb.runAsync – unsupported DELETE:', sql);
        return { lastInsertRowId: 0, changes: 0 };
      }

      _ensureTable(parsed.table);
      const before = _tables[parsed.table].length;
      _tables[parsed.table] = _tables[parsed.table].filter(
        (row) => !_evaluateWhere(row, parsed.where, params),
      );
      const changes = before - _tables[parsed.table].length;
      _save();
      return { lastInsertRowId: 0, changes };
    }

    console.warn('webDb.runAsync – unhandled SQL:', sql);
    return { lastInsertRowId: 0, changes: 0 };
  }

  /**
   * SELECT returning the first matching row, or null.
   */
  async getFirstAsync(sql, ...params) {
    _load();
    const parsed = _parseSelect(sql);
    if (!parsed) {
      console.warn('webDb.getFirstAsync – unsupported SELECT:', sql);
      return null;
    }

    _ensureTable(parsed.table);
    const rows = _tables[parsed.table];
    const match = rows.find((row) =>
      _evaluateWhere(row, parsed.where, params),
    );
    if (!match) return null;
    return parsed.columns === '*' ? { ...match } : _project(match, parsed.columns);
  }

  /**
   * SELECT returning all matching rows.
   */
  async getAllAsync(sql, ...params) {
    _load();
    const parsed = _parseSelect(sql);
    if (!parsed) {
      console.warn('webDb.getAllAsync – unsupported SELECT:', sql);
      return [];
    }

    _ensureTable(parsed.table);
    let rows = _tables[parsed.table].filter((row) =>
      _evaluateWhere(row, parsed.where, params),
    );

    // Handle ORDER BY
    if (parsed.orderBy) {
      const descMatch = parsed.orderBy.match(/(\w+)\s+DESC/i);
      const ascMatch = parsed.orderBy.match(/(\w+)(?:\s+ASC)?/i);
      if (descMatch) {
        const col = descMatch[1];
        rows.sort((a, b) => (b[col] || '') > (a[col] || '') ? 1 : -1);
      } else if (ascMatch) {
        const col = ascMatch[1];
        rows.sort((a, b) => (a[col] || '') > (b[col] || '') ? 1 : -1);
      }
    }

    if (parsed.columns === '*') return rows.map((r) => ({ ...r }));
    return rows.map((r) => _project(r, parsed.columns));
  }
}

// ── Helpers ──────────────────────────────────────────────

function _project(row, columnsSql) {
  const cols = columnsSql.split(',').map((c) => c.trim());
  const result = {};
  cols.forEach((c) => {
    result[c] = row[c];
  });
  return result;
}

/**
 * Determine unique constraint columns for known tables.
 * This mirrors the UNIQUE constraints defined in db.js migrate().
 */
function _getUniqueConstraint(table, columns) {
  const constraints = {
    users: ['username'],
    player_profile: ['user_id'],
    player_commands: ['user_id', 'command'],
    player_achievements: ['user_id', 'achievement_id'],
    player_badges: ['user_id', 'badge_id'],
    game_state: ['user_id'],
    completed_quests: ['user_id', 'quest_id'],
    unlocked_zones: ['user_id', 'zone_id'],
    lesson_progress: ['user_id', 'lesson_id'],
  };
  const unique = constraints[table];
  if (!unique) return [];
  // Only apply if all unique columns are present in the insert
  if (unique.every((c) => columns.includes(c))) return unique;
  return [];
}

// ── Factory ──────────────────────────────────────────────

export function createWebDatabase() {
  return new WebDatabase();
}
