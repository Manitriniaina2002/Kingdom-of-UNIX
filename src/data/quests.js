/**
 * Quest Data - All quests in the Kingdom of UNIX
 */

export const QUESTS = {
  // ============ VILLAGE OF FILES QUESTS ============
  quest_first_steps: {
    id: 'quest_first_steps',
    zoneId: 'village',
    name: 'First Steps',
    description: 'Learn your first UNIX command and take your first steps in the kingdom!',
    type: 'tutorial',
    difficulty: 'beginner',
    xpReward: 50,
    goldReward: 10,
    unlocked: true,
    requiredQuests: [],
    estimatedTime: '5 min',
    objectives: [
      {
        id: 'obj_1',
        description: 'Use the pwd command to see where you are',
        command: 'pwd',
        hint: 'pwd stands for "Print Working Directory" - it shows your current location!',
        completed: false,
      },
      {
        id: 'obj_2',
        description: 'Use ls to see what\'s around you',
        command: 'ls',
        hint: 'ls means "list" - it shows all files and folders in your current location!',
        completed: false,
      },
    ],
    story: {
      intro: 'Greetings, young adventurer! I am Elder Directory, guardian of this village. Before you can explore our lands, you must learn to see where you are and what surrounds you.',
      completion: 'Excellent! You\'ve taken your first steps in understanding our world. The ability to see your location and surroundings is the foundation of all UNIX wisdom!',
    },
    badge: {
      id: 'badge_first_steps',
      name: 'First Steps',
      icon: '👣',
      description: 'Completed your first quest in the Kingdom!',
    },
  },

  quest_explore_village: {
    id: 'quest_explore_village',
    zoneId: 'village',
    name: 'Village Explorer',
    description: 'Navigate through the village directories and discover hidden locations!',
    type: 'exploration',
    difficulty: 'beginner',
    xpReward: 100,
    goldReward: 25,
    unlocked: false,
    requiredQuests: ['quest_first_steps'],
    estimatedTime: '10 min',
    objectives: [
      {
        id: 'obj_1',
        description: 'Move to the market directory',
        command: 'cd market',
        hint: 'cd means "change directory" - use it followed by the folder name!',
        completed: false,
      },
      {
        id: 'obj_2',
        description: 'List what\'s in the market',
        command: 'ls',
        hint: 'Now that you\'re in the market, use ls to see what\'s for sale!',
        completed: false,
      },
      {
        id: 'obj_3',
        description: 'Go back to where you started',
        command: 'cd ..',
        hint: 'The special name ".." means "parent directory" - it takes you up one level!',
        completed: false,
      },
      {
        id: 'obj_4',
        description: 'Visit the tavern',
        command: 'cd tavern',
        hint: 'The tavern is where adventurers share stories. Navigate there!',
        completed: false,
      },
    ],
    story: {
      intro: 'Now that you can see, it\'s time to move! Our village has many locations - the market, the tavern, the blacksmith. Learn to travel between them!',
      completion: 'You navigate like a true villager now! The cd command will take you anywhere in the kingdom. Remember: ".." always takes you back!',
    },
    badge: {
      id: 'badge_explorer',
      name: 'Village Explorer',
      icon: '🧭',
      description: 'Mastered basic navigation in the Village of Files!',
    },
  },

  quest_hidden_scrolls: {
    id: 'quest_hidden_scrolls',
    zoneId: 'village',
    name: 'The Hidden Scrolls',
    description: 'Learn to read the ancient scrolls (files) scattered throughout the village!',
    type: 'learning',
    difficulty: 'beginner',
    xpReward: 150,
    goldReward: 40,
    unlocked: false,
    requiredQuests: ['quest_explore_village'],
    estimatedTime: '15 min',
    objectives: [
      {
        id: 'obj_1',
        description: 'Navigate to the library',
        command: 'cd library',
        hint: 'The library holds many scrolls!',
        completed: false,
      },
      {
        id: 'obj_2',
        description: 'Read the welcome scroll',
        command: 'cat welcome.txt',
        hint: 'cat displays the contents of a file. Use: cat filename',
        completed: false,
      },
      {
        id: 'obj_3',
        description: 'View the directory tree',
        command: 'tree',
        hint: 'tree shows you the entire structure of directories and files!',
        completed: false,
      },
      {
        id: 'obj_4',
        description: 'Find and read the secret scroll',
        command: 'cat secrets/ancient_wisdom.txt',
        hint: 'You can read files in subdirectories using paths like: folder/file.txt',
        completed: false,
      },
    ],
    story: {
      intro: 'The library contains scrolls of great wisdom! But scrolls are useless if you cannot read them. Learn the art of viewing file contents!',
      completion: 'The knowledge within the scrolls is now yours! The cat command reveals the contents of any text file. With tree, you see the full structure of any location!',
    },
    badge: {
      id: 'badge_scholar',
      name: 'Scholar',
      icon: '📜',
      description: 'Learned to read files and explore directory structures!',
    },
  },

  quest_village_boss: {
    id: 'quest_village_boss',
    zoneId: 'village',
    name: 'The Directory Dragon',
    description: 'Face the Directory Dragon! Create, organize, and clean up a messy directory structure!',
    type: 'boss',
    difficulty: 'intermediate',
    xpReward: 300,
    goldReward: 100,
    unlocked: false,
    requiredQuests: ['quest_hidden_scrolls'],
    estimatedTime: '20 min',
    objectives: [
      {
        id: 'obj_1',
        description: 'Create a new fortress directory',
        command: 'mkdir fortress',
        hint: 'mkdir creates new directories. Use: mkdir directory_name',
        completed: false,
      },
      {
        id: 'obj_2',
        description: 'Create nested chambers inside',
        command: 'mkdir -p fortress/chambers/treasury',
        hint: 'Use mkdir -p to create multiple nested directories at once!',
        completed: false,
      },
      {
        id: 'obj_3',
        description: 'Remove the dragon\'s lair (dangerous directory)',
        command: 'rm -r dragon_lair',
        hint: 'rm removes files, rm -r removes directories. Be careful - this is permanent!',
        completed: false,
      },
      {
        id: 'obj_4',
        description: 'Verify the dragon is defeated',
        command: 'ls',
        hint: 'List the directory to confirm the dragon_lair is gone!',
        completed: false,
      },
    ],
    story: {
      intro: 'The Directory Dragon has created chaos in our village! Folders are nested wrongly, and its lair threatens our peace. You must learn to create order... and destroy chaos!',
      completion: '🏆 VICTORY! The Directory Dragon is vanquished! You\'ve mastered the fundamental arts of the filesystem. The path to the Cave of Permissions now opens before you!',
    },
    badge: {
      id: 'badge_dragon_slayer',
      name: 'Dragon Slayer',
      icon: '🐉',
      description: 'Defeated the Directory Dragon and mastered filesystem basics!',
    },
  },

  // ============ CAVE OF PERMISSIONS QUESTS ============
  quest_cave_entrance: {
    id: 'quest_cave_entrance',
    zoneId: 'cave',
    name: 'Entering the Cave',
    description: 'Learn to see permissions and understand the three types of access!',
    type: 'tutorial',
    difficulty: 'intermediate',
    xpReward: 100,
    goldReward: 30,
    unlocked: false,
    requiredQuests: ['quest_village_boss'],
    estimatedTime: '10 min',
    objectives: [
      {
        id: 'obj_1',
        description: 'View detailed file information',
        command: 'ls -l',
        hint: 'ls -l shows "long" format with permissions, owner, size, and more!',
        completed: false,
      },
      {
        id: 'obj_2',
        description: 'Check the permissions of the gate',
        command: 'ls -l gate.txt',
        hint: 'You can check a specific file\'s permissions with ls -l filename',
        completed: false,
      },
      {
        id: 'obj_3',
        description: 'View your own identity',
        command: 'whoami',
        hint: 'whoami tells you which user you are in the system!',
        completed: false,
      },
    ],
    story: {
      intro: 'Welcome to my cave, seeker. I am Guardian Chmod. Before you can control permissions, you must learn to SEE them. The mystic symbols -rwxrwxrwx hold great power!',
      completion: 'You now see the truth! r=read, w=write, x=execute. The three groups are: owner, group, others. Remember this pattern well!',
    },
    badge: {
      id: 'badge_permission_sight',
      name: 'Permission Sight',
      icon: '👁️',
      description: 'Learned to read and understand UNIX permissions!',
    },
  },

  quest_permission_puzzle: {
    id: 'quest_permission_puzzle',
    zoneId: 'cave',
    name: 'The Permission Puzzle',
    description: 'Change file permissions to unlock the ancient doors!',
    type: 'puzzle',
    difficulty: 'intermediate',
    xpReward: 200,
    goldReward: 60,
    unlocked: false,
    requiredQuests: ['quest_cave_entrance'],
    estimatedTime: '15 min',
    objectives: [
      {
        id: 'obj_1',
        description: 'Make the script executable',
        command: 'chmod +x magic_spell.sh',
        hint: 'chmod +x adds execute permission. Scripts need this to run!',
        completed: false,
      },
      {
        id: 'obj_2',
        description: 'Set the treasure read-only for everyone',
        command: 'chmod 444 treasure.txt',
        hint: '444 means read-only for all. 4=read, 2=write, 1=execute!',
        completed: false,
      },
      {
        id: 'obj_3',
        description: 'Give yourself full control of the key',
        command: 'chmod 700 key.txt',
        hint: '7=rwx for owner, 0=nothing for group and others!',
        completed: false,
      },
    ],
    story: {
      intro: 'Three doors stand before you, each sealed by permission magic. To proceed, you must change the permissions on the ancient artifacts!',
      completion: 'The doors open! You understand both symbolic (+x, -w) and numeric (755, 644) permission notation. Powerful knowledge indeed!',
    },
    badge: {
      id: 'badge_chmod_master',
      name: 'Chmod Master',
      icon: '🔐',
      description: 'Mastered the chmod command and permission numbers!',
    },
  },

  // ============ FOREST OF PROCESSES QUESTS ============
  quest_forest_awakening: {
    id: 'quest_forest_awakening',
    zoneId: 'forest',
    name: 'Awakening to Processes',
    description: 'Learn to see the living processes that inhabit the forest!',
    type: 'tutorial',
    difficulty: 'intermediate',
    xpReward: 150,
    goldReward: 50,
    unlocked: false,
    requiredQuests: ['quest_permission_puzzle'],
    estimatedTime: '12 min',
    objectives: [
      {
        id: 'obj_1',
        description: 'See all running processes',
        command: 'ps aux',
        hint: 'ps shows processes. "aux" shows ALL processes with details!',
        completed: false,
      },
      {
        id: 'obj_2',
        description: 'Watch processes in real-time',
        command: 'top',
        hint: 'top shows a live view of running processes. Press q to exit!',
        completed: false,
      },
      {
        id: 'obj_3',
        description: 'Find a specific process',
        command: 'ps aux | grep forest',
        hint: 'Combine ps with grep to find specific processes!',
        completed: false,
      },
    ],
    story: {
      intro: 'Welcome, traveler. I am Master Daemon, keeper of the forest. Every creature here is a process - born, living, and eventually ending. Learn to see them!',
      completion: 'Your eyes are open! Every program that runs is a process with a PID (Process ID). ps and top are your eyes in this forest!',
    },
    badge: {
      id: 'badge_process_sight',
      name: 'Process Sight',
      icon: '🌿',
      description: 'Learned to view and monitor running processes!',
    },
  },

  quest_taming_processes: {
    id: 'quest_taming_processes',
    zoneId: 'forest',
    name: 'Taming Wild Processes',
    description: 'Learn to control and stop runaway processes!',
    type: 'challenge',
    difficulty: 'advanced',
    xpReward: 250,
    goldReward: 80,
    unlocked: false,
    requiredQuests: ['quest_forest_awakening'],
    estimatedTime: '15 min',
    objectives: [
      {
        id: 'obj_1',
        description: 'Find the rogue process ID',
        command: 'ps aux | grep rogue',
        hint: 'Find the PID of the rogue process first!',
        completed: false,
      },
      {
        id: 'obj_2',
        description: 'Terminate the rogue process gracefully',
        command: 'kill 1234',
        hint: 'Use kill followed by the PID. This sends a polite "please stop" signal!',
        completed: false,
      },
      {
        id: 'obj_3',
        description: 'Force stop the stubborn beast',
        command: 'kill -9 5678',
        hint: 'kill -9 is the "nuclear option" - forces immediate termination!',
        completed: false,
      },
    ],
    story: {
      intro: 'Chaos! A rogue process beast rampages through the forest, consuming resources! You must hunt it down and stop it!',
      completion: 'The forest is calm again! Remember: kill asks nicely, kill -9 forces. Always try the gentle way first!',
    },
    badge: {
      id: 'badge_process_tamer',
      name: 'Process Tamer',
      icon: '🦁',
      description: 'Mastered process management and the kill command!',
    },
  },
};

// Get all quests for a specific zone
export const getQuestsForZone = (zoneId) => {
  return Object.values(QUESTS).filter(quest => quest.zoneId === zoneId);
};

// Get quest by ID
export const getQuestById = (questId) => {
  return QUESTS[questId] || null;
};

// Check if a quest is unlocked based on completed quests
export const isQuestUnlocked = (questId, completedQuests) => {
  const quest = QUESTS[questId];
  if (!quest) return false;
  if (quest.unlocked) return true;
  return quest.requiredQuests.every(reqId => completedQuests.includes(reqId));
};
