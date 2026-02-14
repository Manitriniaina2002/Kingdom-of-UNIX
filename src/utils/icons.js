/**
 * Game Icons - Centralized icon system using @expo/vector-icons
 * Replaces all emoji usage with MaterialCommunityIcons / Ionicons / FontAwesome5
 */

import React from 'react';
import { MaterialCommunityIcons, Ionicons, FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = COLORS.text;

/**
 * GameIcon component - renders a vector icon
 * @param {string} name - icon identifier from ICON_MAP
 * @param {number} size - icon size (default 20)
 * @param {string} color - icon color (default COLORS.text)
 */
export const GameIcon = ({ name, size = DEFAULT_SIZE, color = DEFAULT_COLOR, style }) => {
  const iconData = ICON_MAP[name];
  if (!iconData) {
    return null;
  }

  const IconComponent = iconData.lib;
  return <IconComponent name={iconData.name} size={size} color={color} style={style} />;
};

/**
 * Icon map - maps semantic names to vector icon library + icon name
 */
export const ICON_MAP = {
  // === Navigation / Tabs ===
  home: { lib: MaterialCommunityIcons, name: 'castle' },
  map: { lib: MaterialCommunityIcons, name: 'map-outline' },
  practice: { lib: MaterialCommunityIcons, name: 'keyboard-outline' },
  profile: { lib: MaterialCommunityIcons, name: 'account-outline' },
  book: { lib: MaterialCommunityIcons, name: 'book-open-page-variant' },
  settings: { lib: Ionicons, name: 'settings-outline' },

  // === Stats ===
  xp: { lib: MaterialCommunityIcons, name: 'star-four-points' },
  gold: { lib: MaterialCommunityIcons, name: 'gold' },
  streak: { lib: MaterialCommunityIcons, name: 'fire' },
  level: { lib: MaterialCommunityIcons, name: 'shield-star' },

  // === Game Actions ===
  quest: { lib: MaterialCommunityIcons, name: 'scroll-text' },
  questBoss: { lib: MaterialCommunityIcons, name: 'dragon' },
  quickAction: { lib: MaterialCommunityIcons, name: 'lightning-bolt' },
  progress: { lib: MaterialCommunityIcons, name: 'chart-bar' },
  achievement: { lib: MaterialCommunityIcons, name: 'trophy' },
  badge: { lib: MaterialCommunityIcons, name: 'medal' },
  complete: { lib: MaterialCommunityIcons, name: 'check-circle' },
  locked: { lib: MaterialCommunityIcons, name: 'lock' },
  unlocked: { lib: MaterialCommunityIcons, name: 'lock-open' },
  celebrate: { lib: MaterialCommunityIcons, name: 'party-popper' },

  // === UI Elements ===
  arrow: { lib: MaterialCommunityIcons, name: 'chevron-right' },
  skip: { lib: MaterialCommunityIcons, name: 'skip-forward' },
  sparkle: { lib: MaterialCommunityIcons, name: 'creation' },
  play: { lib: MaterialCommunityIcons, name: 'play' },
  hint: { lib: MaterialCommunityIcons, name: 'lightbulb-on-outline' },
  pin: { lib: MaterialCommunityIcons, name: 'map-marker' },
  sound: { lib: MaterialCommunityIcons, name: 'volume-high' },
  guide: { lib: MaterialCommunityIcons, name: 'book-open-variant' },
  tips: { lib: MaterialCommunityIcons, name: 'lightbulb-on-outline' },

  // === Terminal / Commands ===
  terminal: { lib: MaterialCommunityIcons, name: 'console' },
  questTerminal: { lib: MaterialCommunityIcons, name: 'scroll-text-outline' },
  folder: { lib: MaterialCommunityIcons, name: 'folder' },
  file: { lib: MaterialCommunityIcons, name: 'file-document-outline' },
  folderOpen: { lib: MaterialCommunityIcons, name: 'folder-open' },
  tools: { lib: MaterialCommunityIcons, name: 'wrench' },
  search: { lib: MaterialCommunityIcons, name: 'magnify' },
  target: { lib: MaterialCommunityIcons, name: 'crosshairs-gps' },
  magic: { lib: MaterialCommunityIcons, name: 'auto-fix' },
  skull: { lib: MaterialCommunityIcons, name: 'skull' },
  edit: { lib: MaterialCommunityIcons, name: 'file-edit-outline' },
  keyboard: { lib: MaterialCommunityIcons, name: 'keyboard' },
  process: { lib: MaterialCommunityIcons, name: 'cog-outline' },

  // === Zone Icons ===
  village: { lib: MaterialCommunityIcons, name: 'home-group' },
  cave: { lib: MaterialCommunityIcons, name: 'bat' },
  forest: { lib: MaterialCommunityIcons, name: 'pine-tree' },
  castle: { lib: MaterialCommunityIcons, name: 'castle' },
  mountain: { lib: MaterialCommunityIcons, name: 'summit' },
  
  // === Zone Characters ===
  charVillage: { lib: MaterialCommunityIcons, name: 'folder-open' },
  charCave: { lib: MaterialCommunityIcons, name: 'key-variant' },
  charForest: { lib: MaterialCommunityIcons, name: 'leaf' },
  charCastle: { lib: MaterialCommunityIcons, name: 'crown' },
  charMountain: { lib: MaterialCommunityIcons, name: 'auto-fix' },

  // === Quest Type Icons ===
  tutorial: { lib: MaterialCommunityIcons, name: 'book-open-variant' },
  exploration: { lib: MaterialCommunityIcons, name: 'compass-outline' },
  challenge: { lib: MaterialCommunityIcons, name: 'sword-cross' },
  boss: { lib: MaterialCommunityIcons, name: 'dragon' },
  questDefault: { lib: MaterialCommunityIcons, name: 'scroll-text' },

  // === Quest Specific Icons ===
  footsteps: { lib: MaterialCommunityIcons, name: 'shoe-print' },
  compass: { lib: MaterialCommunityIcons, name: 'compass-outline' },
  readScroll: { lib: MaterialCommunityIcons, name: 'scroll-text' },
  eyePermission: { lib: MaterialCommunityIcons, name: 'eye-outline' },
  lockPermission: { lib: MaterialCommunityIcons, name: 'lock-outline' },
  plantProcess: { lib: MaterialCommunityIcons, name: 'sprout' },
  lionProcess: { lib: MaterialCommunityIcons, name: 'paw' },

  // === Command Icons ===
  cmdPwd: { lib: MaterialCommunityIcons, name: 'map-marker' },
  cmdLs: { lib: MaterialCommunityIcons, name: 'eye-outline' },
  cmdCd: { lib: MaterialCommunityIcons, name: 'walk' },
  cmdCat: { lib: MaterialCommunityIcons, name: 'book-open-variant' },
  cmdTree: { lib: MaterialCommunityIcons, name: 'file-tree' },
  cmdMkdir: { lib: MaterialCommunityIcons, name: 'hammer' },
  cmdRm: { lib: MaterialCommunityIcons, name: 'delete-outline' },
  cmdChmod: { lib: MaterialCommunityIcons, name: 'lock-outline' },
  cmdChown: { lib: MaterialCommunityIcons, name: 'crown' },
  cmdPs: { lib: MaterialCommunityIcons, name: 'eye-outline' },
  cmdTop: { lib: MaterialCommunityIcons, name: 'monitor' },
  cmdKill: { lib: MaterialCommunityIcons, name: 'crosshairs-gps' },
  cmdGrep: { lib: MaterialCommunityIcons, name: 'magnify' },
  cmdEcho: { lib: MaterialCommunityIcons, name: 'bullhorn-outline' },
  cmdWhoami: { lib: MaterialCommunityIcons, name: 'card-account-details-outline' },
  cmdClear: { lib: MaterialCommunityIcons, name: 'broom' },
  cmdHelp: { lib: MaterialCommunityIcons, name: 'help-circle-outline' },
  cmdTouch: { lib: MaterialCommunityIcons, name: 'file-plus-outline' },

  // === Achievement Icons ===
  achFirstSteps: { lib: MaterialCommunityIcons, name: 'star-shooting' },
  achCommands: { lib: MaterialCommunityIcons, name: 'file-edit-outline' },
  achQuestWarrior: { lib: MaterialCommunityIcons, name: 'sword-cross' },
  achZoneConqueror: { lib: MaterialCommunityIcons, name: 'crown' },
  achVillage: { lib: MaterialCommunityIcons, name: 'home-group' },
  achCave: { lib: MaterialCommunityIcons, name: 'bat' },
  achForest: { lib: MaterialCommunityIcons, name: 'pine-tree' },
  achExploration: { lib: MaterialCommunityIcons, name: 'compass-outline' },
  achMystery: { lib: MaterialCommunityIcons, name: 'auto-fix' },
  achCompletionist: { lib: MaterialCommunityIcons, name: 'crosshairs-gps' },
  achSpeed: { lib: MaterialCommunityIcons, name: 'lightning-bolt' },
  achPerfectionist: { lib: MaterialCommunityIcons, name: 'diamond-stone' },
  achKnowledge: { lib: MaterialCommunityIcons, name: 'bookshelf' },
  achHidden: { lib: MaterialCommunityIcons, name: 'owl' },
  achEasterEgg: { lib: MaterialCommunityIcons, name: 'egg-easter' },
  achPersistence: { lib: MaterialCommunityIcons, name: 'arm-flex' },

  // === Level Icons ===
  lvl1: { lib: MaterialCommunityIcons, name: 'sprout' },
  lvl2: { lib: MaterialCommunityIcons, name: 'scroll-text' },
  lvl3: { lib: MaterialCommunityIcons, name: 'book-open-variant' },
  lvl4: { lib: MaterialCommunityIcons, name: 'walk' },
  lvl5: { lib: MaterialCommunityIcons, name: 'folder' },
  lvl6: { lib: MaterialCommunityIcons, name: 'key-variant' },
  lvl7: { lib: MaterialCommunityIcons, name: 'eye-outline' },
  lvl8: { lib: MaterialCommunityIcons, name: 'pipe' },
  lvl9: { lib: MaterialCommunityIcons, name: 'console' },
  lvl10: { lib: MaterialCommunityIcons, name: 'sword-cross' },
  lvl11: { lib: MaterialCommunityIcons, name: 'sword' },
  lvl12: { lib: MaterialCommunityIcons, name: 'scroll-text' },
  lvl13: { lib: MaterialCommunityIcons, name: 'shield-outline' },
  lvl14: { lib: MaterialCommunityIcons, name: 'crown' },
  lvl15: { lib: MaterialCommunityIcons, name: 'star-four-points' },
  lvl16: { lib: MaterialCommunityIcons, name: 'trophy' },
  lvl17: { lib: MaterialCommunityIcons, name: 'medal' },
  lvl18: { lib: MaterialCommunityIcons, name: 'robot' },
  lvl19: { lib: MaterialCommunityIcons, name: 'trident' },
  lvl20: { lib: MaterialCommunityIcons, name: 'castle' },
};

/**
 * Get icon text representation for terminal/text-only contexts
 * Returns a simple text symbol instead of emoji
 */
export const ICON_TEXT = {
  folder: '[DIR]',
  file: '[FILE]',
  castle: '[KINGDOM]',
  quest: '[QUEST]',
  hint: '[TIP]',
  complete: '[OK]',
  pin: '[>>]',
  target: '[!]',
  magic: '[?]',
  skull: '[X]',
  edit: '[EDIT]',
  keyboard: '[KB]',
  process: '[PROC]',
  locked: '[LOCKED]',
  success: '[OK]',
  nav: '[NAV]',
  files: '[FILES]',
  tools: '[TOOLS]',
  monitor: '[MON]',
};
