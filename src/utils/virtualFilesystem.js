/**
 * Virtual Filesystem - Sandboxed filesystem for the game
 * Creates an in-memory filesystem structure for safe command execution
 */

/**
 * Create the initial virtual filesystem for the game
 */
export const createVirtualFilesystem = () => {
  return {
    '/': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'root',
      group: 'root',
      children: ['home', 'etc', 'var', 'usr'],
    },
    '/home': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'root',
      group: 'root',
      children: ['adventurer'],
    },
    '/home/adventurer': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'adventurer',
      group: 'adventurer',
      children: ['market', 'tavern', 'library', 'blacksmith', 'welcome.txt', 'notes.txt'],
    },
    '/home/adventurer/welcome.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'adventurer',
      group: 'adventurer',
      content: `🏰 Welcome to the Kingdom of UNIX! 🏰

You are an adventurer who has just arrived in our magical realm.
Here, knowledge of the ancient UNIX commands will guide your path.

Your journey begins in the Village of Files, where you'll learn
to navigate our lands using commands like 'ls', 'cd', and 'pwd'.

May your terminal always compile, and your paths always resolve!

- Elder Directory, Guardian of the Village`,
      size: 412,
    },
    '/home/adventurer/notes.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'adventurer',
      group: 'adventurer',
      content: `Adventurer's Notes:

Day 1: Arrived at the village. Must learn basic commands!

Commands I've discovered:
- pwd : Shows where I am
- ls  : Lists what's around me
- cd  : Moves me to different places

Remember: ".." goes back one level!`,
      size: 234,
    },
    '/home/adventurer/market': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'adventurer',
      group: 'adventurer',
      children: ['weapons', 'potions', 'scrolls', 'prices.txt'],
    },
    '/home/adventurer/market/prices.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'merchant',
      group: 'market',
      content: `=== Village Market Prices ===

Weapons:
  Keyboard of Power   - 100 gold
  Mouse of Precision  - 50 gold

Potions:
  Healing Brew        - 25 gold
  Speed Elixir        - 30 gold

Scrolls:
  Scroll of 'man'     - 15 gold
  Scroll of 'help'    - FREE!`,
      size: 275,
    },
    '/home/adventurer/market/weapons': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'merchant',
      group: 'market',
      children: ['sword.txt', 'staff.txt'],
    },
    '/home/adventurer/market/weapons/sword.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'merchant',
      group: 'market',
      content: 'A mighty sword forged from pure silicon!',
      size: 40,
    },
    '/home/adventurer/market/weapons/staff.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'merchant',
      group: 'market',
      content: 'A magical staff that compiles code with a wave!',
      size: 47,
    },
    '/home/adventurer/market/potions': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'merchant',
      group: 'market',
      children: ['health.txt', 'mana.txt'],
    },
    '/home/adventurer/market/potions/health.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'merchant',
      group: 'market',
      content: 'A red potion that restores your debugging energy!',
      size: 49,
    },
    '/home/adventurer/market/potions/mana.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'merchant',
      group: 'market',
      content: 'A blue potion that enhances your coding focus!',
      size: 46,
    },
    '/home/adventurer/market/scrolls': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'merchant',
      group: 'market',
      children: ['ancient_spell.sh'],
    },
    '/home/adventurer/market/scrolls/ancient_spell.sh': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'merchant',
      group: 'market',
      content: `#!/bin/bash
# Ancient Spell of Hello
echo "Hello, brave adventurer!"
echo "May your code be bug-free!"`,
      size: 98,
    },
    '/home/adventurer/tavern': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'innkeeper',
      group: 'tavern',
      children: ['menu.txt', 'rumors.txt', 'guestbook.txt'],
    },
    '/home/adventurer/tavern/menu.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'innkeeper',
      group: 'tavern',
      content: `🍺 The Compiling Cauldron - Menu 🍺

Today's Specials:
  Binary Brew        - 5 gold
  Recursive Stew     - 8 gold
  Segfault Sandwich  - 6 gold

Desserts:
  Stack Overflow Cake - 7 gold
  Null Pointer Pudding - 4 gold`,
      size: 234,
    },
    '/home/adventurer/tavern/rumors.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'innkeeper',
      group: 'tavern',
      content: `Rumors heard at the tavern:

"I heard there's a dragon in the Village made entirely of
misorganized directories. Only a true file master can defeat it!"

"The Cave of Permissions holds secrets that only chmod can unlock..."

"Some say the Forest holds processes that never sleep..."`,
      size: 289,
    },
    '/home/adventurer/tavern/guestbook.txt': {
      type: 'file',
      permissions: '-rw-rw-r--',
      owner: 'innkeeper',
      group: 'tavern',
      content: `=== Tavern Guestbook ===

"Great ale!" - bash_warrior
"The stew could use more RAM." - memory_knight
"Love this place!" - sys_admin_sam
"Will return after compiling." - gcc_guru`,
      size: 189,
    },
    '/home/adventurer/library': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'librarian',
      group: 'library',
      children: ['welcome.txt', 'basics', 'secrets'],
    },
    '/home/adventurer/library/welcome.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'librarian',
      group: 'library',
      content: `📚 Welcome to the Village Library 📚

Here you will find scrolls of knowledge about UNIX commands.
Browse the 'basics' section to start your learning journey.
The 'secrets' folder contains advanced wisdom for later...

- The Librarian`,
      size: 245,
    },
    '/home/adventurer/library/basics': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'librarian',
      group: 'library',
      children: ['navigation.txt', 'files.txt', 'tips.txt'],
    },
    '/home/adventurer/library/basics/navigation.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'librarian',
      group: 'library',
      content: `=== Navigation Commands ===

pwd  - Print Working Directory
       Shows your current location

ls   - List
       Shows files and folders here
       Try: ls -l for details!

cd   - Change Directory
       Moves you to another location
       cd ..    = go back one level
       cd ~     = go to home
       cd /     = go to root`,
      size: 342,
    },
    '/home/adventurer/library/basics/files.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'librarian',
      group: 'library',
      content: `=== File Commands ===

cat   - Display file contents
        cat filename.txt

mkdir - Create a new directory
        mkdir new_folder

rm    - Remove files/directories
        rm file.txt
        rm -r folder/  (for directories)
        
⚠️ Warning: rm is permanent!`,
      size: 278,
    },
    '/home/adventurer/library/basics/tips.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'librarian',
      group: 'library',
      content: `=== Pro Tips for Beginners ===

1. Use TAB to auto-complete names
2. Use ↑ arrow for previous commands  
3. "clear" cleans the terminal
4. "help" shows available commands
5. Don't fear mistakes - experiment!

Remember: The best way to learn
is by doing! Try commands and see
what happens. This is a safe space.`,
      size: 312,
    },
    '/home/adventurer/library/secrets': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'librarian',
      group: 'library',
      children: ['ancient_wisdom.txt', 'hidden_commands.txt'],
    },
    '/home/adventurer/library/secrets/ancient_wisdom.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'librarian',
      group: 'library',
      content: `🔮 Ancient Wisdom of the UNIX Masters 🔮

"In the beginning, there was the command line..."

The Three Virtues of a UNIX Adventurer:
1. Laziness - Automate everything!
2. Impatience - Make things fast!
3. Hubris - Write code others will admire!

Secret: Pipes (|) connect commands together,
making them more powerful than alone.`,
      size: 356,
    },
    '/home/adventurer/library/secrets/hidden_commands.txt': {
      type: 'file',
      permissions: '-rw-------',
      owner: 'librarian',
      group: 'library',
      content: `=== Hidden Command Secrets ===

Ctrl+C - Stop a running command
Ctrl+L - Clear screen (like 'clear')
Ctrl+A - Go to line start
Ctrl+E - Go to line end

The mythical 'sudo' grants ultimate power...
but with great power comes great responsibility!`,
      size: 267,
    },
    '/home/adventurer/blacksmith': {
      type: 'directory',
      permissions: 'drwxr-xr-x',
      owner: 'blacksmith',
      group: 'crafters',
      children: ['forge.txt', 'orders'],
    },
    '/home/adventurer/blacksmith/forge.txt': {
      type: 'file',
      permissions: '-rw-r--r--',
      owner: 'blacksmith',
      group: 'crafters',
      content: `⚒️ The Binary Blacksmith ⚒️

"I forge scripts into executables!"

Services:
- Make scripts executable (chmod +x)
- Craft permission shields
- Forge mighty pipes

Visit me when you reach the Cave of Permissions!`,
      size: 213,
    },
    '/home/adventurer/blacksmith/orders': {
      type: 'directory',
      permissions: 'drwx------',
      owner: 'blacksmith',
      group: 'crafters',
      children: ['pending.txt'],
    },
    '/home/adventurer/blacksmith/orders/pending.txt': {
      type: 'file',
      permissions: '-rw-------',
      owner: 'blacksmith',
      group: 'crafters',
      content: 'Order #1: chmod sword.sh - Make it executable!\nOrder #2: Fix permissions on the castle gate',
      size: 95,
    },
  };
};

/**
 * Create a quest-specific filesystem
 */
export const createQuestFilesystem = (questId) => {
  const baseFs = createVirtualFilesystem();
  
  switch (questId) {
    case 'quest_village_boss':
      // Add dragon lair for the boss fight
      return {
        ...baseFs,
        '/home/adventurer': {
          ...baseFs['/home/adventurer'],
          children: [...baseFs['/home/adventurer'].children, 'dragon_lair'],
        },
        '/home/adventurer/dragon_lair': {
          type: 'directory',
          permissions: 'drwxr-xr-x',
          owner: 'dragon',
          group: 'monsters',
          children: ['chaos.txt', 'mess'],
        },
        '/home/adventurer/dragon_lair/chaos.txt': {
          type: 'file',
          permissions: '-rw-r--r--',
          owner: 'dragon',
          group: 'monsters',
          content: 'RAWR! I am the Directory Dragon! My chaos shall reign!',
          size: 54,
        },
        '/home/adventurer/dragon_lair/mess': {
          type: 'directory',
          permissions: 'drwxr-xr-x',
          owner: 'dragon',
          group: 'monsters',
          children: [],
        },
      };
    
    case 'quest_cave_entrance':
      return {
        ...baseFs,
        '/home/adventurer': {
          ...baseFs['/home/adventurer'],
          children: [...baseFs['/home/adventurer'].children, 'gate.txt'],
        },
        '/home/adventurer/gate.txt': {
          type: 'file',
          permissions: '-r--------',
          owner: 'guardian',
          group: 'cave',
          content: 'The gate to the Cave of Permissions. Only those who understand may pass.',
          size: 70,
        },
      };
    
    case 'quest_permission_puzzle':
      return {
        ...baseFs,
        '/home/adventurer': {
          ...baseFs['/home/adventurer'],
          children: [...baseFs['/home/adventurer'].children, 'magic_spell.sh', 'treasure.txt', 'key.txt'],
        },
        '/home/adventurer/magic_spell.sh': {
          type: 'file',
          permissions: '-rw-r--r--',
          owner: 'adventurer',
          group: 'adventurer',
          content: '#!/bin/bash\necho "The spell is cast!"',
          size: 38,
        },
        '/home/adventurer/treasure.txt': {
          type: 'file',
          permissions: '-rw-rw-rw-',
          owner: 'adventurer',
          group: 'adventurer',
          content: 'Ancient treasure map showing the way forward!',
          size: 45,
        },
        '/home/adventurer/key.txt': {
          type: 'file',
          permissions: '-rw-r--r--',
          owner: 'adventurer',
          group: 'adventurer',
          content: 'The key to the next chamber.',
          size: 28,
        },
      };
    
    case 'quest_forest_awakening':
      return baseFs; // Forest quests use process simulation, not filesystem
    
    default:
      return baseFs;
  }
};

/**
 * Get the contents of a directory
 */
export const getDirectoryContents = (filesystem, path) => {
  const node = filesystem[path];
  if (!node || node.type !== 'directory') {
    return null;
  }
  return node.children || [];
};

/**
 * Resolve a path (handle . and ..)
 */
export const resolvePath = (currentPath, targetPath) => {
  // Handle absolute paths
  if (targetPath.startsWith('/')) {
    return normalizePath(targetPath);
  }
  
  // Handle home shortcut
  if (targetPath === '~' || targetPath.startsWith('~/')) {
    const homePath = '/home/adventurer';
    if (targetPath === '~') return homePath;
    return normalizePath(homePath + targetPath.slice(1));
  }
  
  // Handle relative paths
  const parts = currentPath.split('/').filter(Boolean);
  const targetParts = targetPath.split('/').filter(Boolean);
  
  for (const part of targetParts) {
    if (part === '..') {
      parts.pop();
    } else if (part !== '.') {
      parts.push(part);
    }
  }
  
  return '/' + parts.join('/') || '/';
};

/**
 * Normalize a path (remove double slashes, trailing slash, etc.)
 */
export const normalizePath = (path) => {
  const parts = path.split('/').filter(Boolean);
  const result = [];
  
  for (const part of parts) {
    if (part === '..') {
      result.pop();
    } else if (part !== '.') {
      result.push(part);
    }
  }
  
  return '/' + result.join('/') || '/';
};

/**
 * Check if a path exists in the filesystem
 */
export const pathExists = (filesystem, path) => {
  return filesystem.hasOwnProperty(path);
};

/**
 * Check if a path is a directory
 */
export const isDirectory = (filesystem, path) => {
  const node = filesystem[path];
  return node && node.type === 'directory';
};

/**
 * Check if a path is a file
 */
export const isFile = (filesystem, path) => {
  const node = filesystem[path];
  return node && node.type === 'file';
};

/**
 * Get file content
 */
export const getFileContent = (filesystem, path) => {
  const node = filesystem[path];
  if (!node || node.type !== 'file') {
    return null;
  }
  return node.content;
};

/**
 * Add a directory to the filesystem
 */
export const addDirectory = (filesystem, parentPath, name) => {
  const newFs = { ...filesystem };
  const parent = newFs[parentPath];
  
  if (!parent || parent.type !== 'directory') {
    return null;
  }
  
  const newPath = parentPath === '/' ? `/${name}` : `${parentPath}/${name}`;
  
  // Add to parent's children
  newFs[parentPath] = {
    ...parent,
    children: [...parent.children, name],
  };
  
  // Create the new directory
  newFs[newPath] = {
    type: 'directory',
    permissions: 'drwxr-xr-x',
    owner: 'adventurer',
    group: 'adventurer',
    children: [],
  };
  
  return newFs;
};

/**
 * Remove a path from the filesystem
 */
export const removePath = (filesystem, path, recursive = false) => {
  const newFs = { ...filesystem };
  const node = newFs[path];
  
  if (!node) {
    return null;
  }
  
  // Can't remove root
  if (path === '/') {
    return null;
  }
  
  // If directory with children and not recursive, fail
  if (node.type === 'directory' && node.children.length > 0 && !recursive) {
    return null;
  }
  
  // Find parent and update its children
  const parentPath = path.substring(0, path.lastIndexOf('/')) || '/';
  const name = path.substring(path.lastIndexOf('/') + 1);
  
  if (newFs[parentPath]) {
    newFs[parentPath] = {
      ...newFs[parentPath],
      children: newFs[parentPath].children.filter(child => child !== name),
    };
  }
  
  // Remove the path
  delete newFs[path];
  
  // If recursive, remove all children
  if (recursive && node.type === 'directory') {
    Object.keys(newFs).forEach(key => {
      if (key.startsWith(path + '/')) {
        delete newFs[key];
      }
    });
  }
  
  return newFs;
};

/**
 * Update file permissions
 */
export const updatePermissions = (filesystem, path, newPermissions) => {
  const newFs = { ...filesystem };
  const node = newFs[path];
  
  if (!node) {
    return null;
  }
  
  newFs[path] = {
    ...node,
    permissions: newPermissions,
  };
  
  return newFs;
};

/**
 * Build a tree representation of a directory
 */
export const buildTree = (filesystem, path, prefix = '', isLast = true) => {
  const node = filesystem[path];
  if (!node) return '';
  
  const name = path === '/' ? '/' : path.split('/').pop();
  let result = '';
  
  if (path !== '/') {
    const connector = isLast ? '└── ' : '├── ';
    result += prefix + connector + name + '\n';
  } else {
    result += '.\n';
  }
  
  if (node.type === 'directory' && node.children) {
    const childPrefix = path === '/' ? '' : prefix + (isLast ? '    ' : '│   ');
    node.children.forEach((child, index) => {
      const childPath = path === '/' ? `/${child}` : `${path}/${child}`;
      const isChildLast = index === node.children.length - 1;
      result += buildTree(filesystem, childPath, childPrefix, isChildLast);
    });
  }
  
  return result;
};
