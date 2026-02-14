/**
 * Game Data - Zones, Quests, and World Structure
 * UNIX Kingdom World Map Configuration
 */

export const ZONES = {
  village: {
    id: 'village',
    name: 'The Village of Files',
    description: 'Your journey begins here! Learn to navigate the kingdom\'s filesystem and discover the secrets of directories.',
    icon: 'village',
    color: '#22C55E',
    unlocked: true,
    requiredLevel: 1,
    commands: ['ls', 'cd', 'pwd', 'tree', 'cat'],
    position: { x: 50, y: 70 },
    quests: ['quest_first_steps', 'quest_explore_village', 'quest_hidden_scrolls', 'quest_village_boss'],
    story: {
      intro: 'Welcome, young traveler! The Village of Files is where all adventurers begin their journey. Here, the wise Manitriniaina will teach you the ancient art of navigation.',
      character: 'Manitriniaina',
      characterEmoji: 'charVillage',
    },
  },
  cave: {
    id: 'cave',
    name: 'The Cave of Permissions',
    description: 'Deep within these caverns lie the secrets of file permissions. Only those who master chmod and chown may pass!',
    icon: 'cave',
    color: '#A855F7',
    unlocked: false,
    requiredLevel: 5,
    commands: ['chmod', 'chown', 'ls -l', 'stat', 'umask'],
    position: { x: 25, y: 45 },
    quests: ['quest_cave_entrance', 'quest_permission_puzzle', 'quest_guardian_challenge', 'quest_cave_boss'],
    story: {
      intro: 'The Cave of Permissions holds ancient power. Here, you\'ll learn to control who can read, write, and execute the sacred scrolls of the kingdom.',
      character: 'Guardian Chmod',
      characterEmoji: 'charCave',
    },
  },
  forest: {
    id: 'forest',
    name: 'The Forest of Processes',
    description: 'Living creatures roam this enchanted forest - processes that breathe life into the kingdom. Learn to observe and control them!',
    icon: 'forest',
    color: '#10B981',
    unlocked: false,
    requiredLevel: 10,
    commands: ['ps', 'top', 'kill', 'bg', 'fg', 'jobs', 'nohup'],
    position: { x: 75, y: 40 },
    quests: ['quest_forest_awakening', 'quest_tracking_beasts', 'quest_taming_processes', 'quest_forest_boss'],
    story: {
      intro: 'The Forest of Processes is alive with running tasks and background spirits. Master Daemon will teach you to see and control these invisible forces.',
      character: 'Master Daemon',
      characterEmoji: 'charForest',
    },
  },
  castle: {
    id: 'castle',
    name: 'The Castle of Pipes',
    description: 'In this grand castle, you\'ll learn the royal art of connecting commands and redirecting the flow of data!',
    icon: 'castle',
    color: '#F59E0B',
    unlocked: false,
    requiredLevel: 15,
    commands: ['|', '>', '>>', '<', 'grep', 'sort', 'uniq', 'wc'],
    position: { x: 50, y: 25 },
    quests: ['quest_castle_gates', 'quest_pipe_mastery', 'quest_data_streams', 'quest_castle_boss'],
    story: {
      intro: 'Welcome to the Castle of Pipes, where data flows like water through ancient aqueducts. The Pipe Master will show you how to connect commands in powerful chains.',
      character: 'Pipe Master',
      characterEmoji: 'charCastle',
    },
  },
  mountain: {
    id: 'mountain',
    name: 'The Mountain of Networks',
    description: 'Climb the highest peaks to master networking commands and connect with distant realms!',
    icon: 'mountain',
    color: '#6366F1',
    unlocked: false,
    requiredLevel: 20,
    commands: ['ping', 'curl', 'wget', 'ssh', 'scp', 'netstat'],
    position: { x: 50, y: 10 },
    quests: ['quest_mountain_base', 'quest_signal_tower', 'quest_distant_realms', 'quest_mountain_boss'],
    story: {
      intro: 'The Mountain of Networks reaches into the clouds where messages travel between kingdoms. Sage Netstat will guide you through the mysteries of connections.',
      character: 'Sage Netstat',
      characterEmoji: 'charMountain',
    },
  },
};

export const ZONE_ORDER = ['village', 'cave', 'forest', 'castle', 'mountain'];

export const WORLD_CONNECTIONS = [
  { from: 'village', to: 'cave' },
  { from: 'village', to: 'forest' },
  { from: 'cave', to: 'castle' },
  { from: 'forest', to: 'castle' },
  { from: 'castle', to: 'mountain' },
];
