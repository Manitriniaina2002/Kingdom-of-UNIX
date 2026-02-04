/**
 * Achievements and Badges Data
 */

export const ACHIEVEMENTS = {
  // Progress Achievements
  first_command: {
    id: 'first_command',
    name: 'Hello, World!',
    description: 'Execute your first UNIX command',
    icon: '🌟',
    xpReward: 25,
    category: 'progress',
    secret: false,
  },
  command_novice: {
    id: 'command_novice',
    name: 'Command Novice',
    description: 'Execute 10 different commands',
    icon: '📝',
    xpReward: 50,
    category: 'progress',
    requirement: { type: 'unique_commands', count: 10 },
    secret: false,
  },
  command_apprentice: {
    id: 'command_apprentice',
    name: 'Command Apprentice',
    description: 'Execute 50 commands total',
    icon: '⚔️',
    xpReward: 100,
    category: 'progress',
    requirement: { type: 'total_commands', count: 50 },
    secret: false,
  },
  command_master: {
    id: 'command_master',
    name: 'Command Master',
    description: 'Execute 200 commands total',
    icon: '👑',
    xpReward: 250,
    category: 'progress',
    requirement: { type: 'total_commands', count: 200 },
    secret: false,
  },

  // Zone Achievements
  village_complete: {
    id: 'village_complete',
    name: 'Village Champion',
    description: 'Complete all quests in the Village of Files',
    icon: '🏘️',
    xpReward: 200,
    category: 'zones',
    secret: false,
  },
  cave_complete: {
    id: 'cave_complete',
    name: 'Cave Conqueror',
    description: 'Complete all quests in the Cave of Permissions',
    icon: '🦇',
    xpReward: 300,
    category: 'zones',
    secret: false,
  },
  forest_complete: {
    id: 'forest_complete',
    name: 'Forest Guardian',
    description: 'Complete all quests in the Forest of Processes',
    icon: '🌲',
    xpReward: 400,
    category: 'zones',
    secret: false,
  },

  // Skill Achievements
  navigation_pro: {
    id: 'navigation_pro',
    name: 'Path Finder',
    description: 'Use cd 50 times',
    icon: '🧭',
    xpReward: 75,
    category: 'skills',
    requirement: { type: 'command_usage', command: 'cd', count: 50 },
    secret: false,
  },
  permission_wizard: {
    id: 'permission_wizard',
    name: 'Permission Wizard',
    description: 'Use chmod 25 times',
    icon: '🔮',
    xpReward: 100,
    category: 'skills',
    requirement: { type: 'command_usage', command: 'chmod', count: 25 },
    secret: false,
  },
  process_hunter: {
    id: 'process_hunter',
    name: 'Process Hunter',
    description: 'Use kill 10 times',
    icon: '🎯',
    xpReward: 100,
    category: 'skills',
    requirement: { type: 'command_usage', command: 'kill', count: 10 },
    secret: false,
  },

  // Special Achievements
  speed_runner: {
    id: 'speed_runner',
    name: 'Speed Runner',
    description: 'Complete a quest in under 60 seconds',
    icon: '⚡',
    xpReward: 150,
    category: 'special',
    secret: false,
  },
  perfect_quest: {
    id: 'perfect_quest',
    name: 'Perfectionist',
    description: 'Complete a quest without using any hints',
    icon: '💎',
    xpReward: 100,
    category: 'special',
    secret: false,
  },
  help_seeker: {
    id: 'help_seeker',
    name: 'Knowledge Seeker',
    description: 'Use the help command 10 times',
    icon: '📚',
    xpReward: 50,
    category: 'special',
    requirement: { type: 'command_usage', command: 'help', count: 10 },
    secret: false,
  },

  // Secret Achievements
  night_owl: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Play between midnight and 4 AM',
    icon: '🦉',
    xpReward: 75,
    category: 'secret',
    secret: true,
  },
  easter_egg: {
    id: 'easter_egg',
    name: 'Curious Explorer',
    description: 'Try to run a forbidden command',
    icon: '🥚',
    xpReward: 50,
    category: 'secret',
    secret: true,
  },
  persistent: {
    id: 'persistent',
    name: 'Never Give Up',
    description: 'Retry a failed command 5 times',
    icon: '💪',
    xpReward: 75,
    category: 'secret',
    secret: true,
  },
};

// Level Definitions
export const LEVELS = [
  { level: 1, xpRequired: 0, title: 'Terminal Newbie', icon: '🌱' },
  { level: 2, xpRequired: 100, title: 'Script Seeker', icon: '📜' },
  { level: 3, xpRequired: 250, title: 'Command Learner', icon: '📖' },
  { level: 4, xpRequired: 500, title: 'Directory Walker', icon: '🚶' },
  { level: 5, xpRequired: 800, title: 'File Handler', icon: '📁' },
  { level: 6, xpRequired: 1200, title: 'Permission Novice', icon: '🔑' },
  { level: 7, xpRequired: 1700, title: 'Process Watcher', icon: '👁️' },
  { level: 8, xpRequired: 2300, title: 'Pipe Apprentice', icon: '🔗' },
  { level: 9, xpRequired: 3000, title: 'Shell Crafter', icon: '🐚' },
  { level: 10, xpRequired: 4000, title: 'UNIX Knight', icon: '⚔️' },
  { level: 11, xpRequired: 5200, title: 'Terminal Warrior', icon: '🗡️' },
  { level: 12, xpRequired: 6600, title: 'Command Sage', icon: '🧙' },
  { level: 13, xpRequired: 8200, title: 'System Guardian', icon: '🛡️' },
  { level: 14, xpRequired: 10000, title: 'Kernel Knight', icon: '👑' },
  { level: 15, xpRequired: 12500, title: 'Root Master', icon: '🌟' },
  { level: 16, xpRequired: 15500, title: 'Shell Legend', icon: '🏆' },
  { level: 17, xpRequired: 19000, title: 'UNIX Grandmaster', icon: '🎖️' },
  { level: 18, xpRequired: 23000, title: 'System Overlord', icon: '👾' },
  { level: 19, xpRequired: 28000, title: 'Terminal Titan', icon: '🔱' },
  { level: 20, xpRequired: 35000, title: 'King of UNIX', icon: '🏰' },
];

// Get level for XP amount
export const getLevelForXP = (xp) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
};

// Get XP needed for next level
export const getXPForNextLevel = (currentXP) => {
  const currentLevel = getLevelForXP(currentXP);
  const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1);
  return nextLevel ? nextLevel.xpRequired - currentXP : 0;
};

// Get progress percentage to next level
export const getLevelProgress = (currentXP) => {
  const currentLevel = getLevelForXP(currentXP);
  const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1);
  
  if (!nextLevel) return 100;
  
  const levelXP = currentXP - currentLevel.xpRequired;
  const levelRange = nextLevel.xpRequired - currentLevel.xpRequired;
  
  return Math.round((levelXP / levelRange) * 100);
};
