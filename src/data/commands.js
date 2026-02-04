/**
 * Commands Data - UNIX commands and their sandboxed behavior
 * Safe, educational command definitions
 */

export const COMMANDS = {
  // Navigation Commands
  pwd: {
    name: 'pwd',
    fullName: 'Print Working Directory',
    description: 'Shows your current location in the filesystem',
    syntax: 'pwd',
    category: 'navigation',
    difficulty: 'beginner',
    examples: ['pwd'],
    funExplanation: '🗺️ Think of it as asking "Where am I?" in the kingdom. pwd tells you the full path from the kingdom\'s root to your current location!',
  },

  ls: {
    name: 'ls',
    fullName: 'List',
    description: 'Lists files and directories in the current location',
    syntax: 'ls [options] [path]',
    category: 'navigation',
    difficulty: 'beginner',
    options: {
      '-l': 'Long format with details',
      '-a': 'Show hidden files (starting with .)',
      '-la': 'Long format including hidden files',
      '-h': 'Human-readable sizes',
    },
    examples: ['ls', 'ls -l', 'ls -la', 'ls documents/'],
    funExplanation: '👀 Like looking around a room to see what\'s there! ls shows you all the files and folders nearby. Use -l to see more details like a detective!',
  },

  cd: {
    name: 'cd',
    fullName: 'Change Directory',
    description: 'Moves to a different directory',
    syntax: 'cd [path]',
    category: 'navigation',
    difficulty: 'beginner',
    special: {
      '..': 'Go to parent directory',
      '~': 'Go to home directory',
      '/': 'Go to root directory',
      '-': 'Go to previous directory',
    },
    examples: ['cd documents', 'cd ..', 'cd ~', 'cd /home'],
    funExplanation: '🚶 Like walking through doors! cd lets you move from room to room (directory to directory). Use ".." to go back, like walking out a door you just entered!',
  },

  cat: {
    name: 'cat',
    fullName: 'Concatenate',
    description: 'Displays the contents of a file',
    syntax: 'cat [file]',
    category: 'files',
    difficulty: 'beginner',
    examples: ['cat readme.txt', 'cat notes.txt'],
    funExplanation: '📖 Like opening a scroll and reading it! cat shows you everything written inside a file. The name comes from "concatenate" - joining things together!',
  },

  tree: {
    name: 'tree',
    fullName: 'Tree',
    description: 'Shows directory structure as a tree',
    syntax: 'tree [path]',
    category: 'navigation',
    difficulty: 'beginner',
    examples: ['tree', 'tree documents/'],
    funExplanation: '🌳 Like seeing a family tree, but for folders! tree draws a beautiful picture showing all directories and files nested inside each other.',
  },

  mkdir: {
    name: 'mkdir',
    fullName: 'Make Directory',
    description: 'Creates a new directory',
    syntax: 'mkdir [options] [name]',
    category: 'files',
    difficulty: 'beginner',
    options: {
      '-p': 'Create parent directories as needed',
    },
    examples: ['mkdir projects', 'mkdir -p deep/nested/folder'],
    funExplanation: '🏗️ Like building a new room! mkdir creates a new folder where you can store files. Use -p to create a whole chain of folders at once!',
  },

  rm: {
    name: 'rm',
    fullName: 'Remove',
    description: 'Deletes files or directories',
    syntax: 'rm [options] [file/directory]',
    category: 'files',
    difficulty: 'beginner',
    options: {
      '-r': 'Remove directories recursively',
      '-f': 'Force removal without confirmation',
      '-i': 'Interactive mode (ask before each removal)',
    },
    examples: ['rm file.txt', 'rm -r folder/', 'rm -rf dangerous_folder/'],
    funExplanation: '🗑️ Like throwing something in the trash... except there\'s NO UNDO! Be careful with rm, especially rm -rf. Once deleted, files are gone forever!',
    warning: '⚠️ DANGER: rm permanently deletes files! There is no recycle bin. Triple-check before using rm -rf!',
  },

  // Permission Commands
  chmod: {
    name: 'chmod',
    fullName: 'Change Mode',
    description: 'Changes file permissions',
    syntax: 'chmod [mode] [file]',
    category: 'permissions',
    difficulty: 'intermediate',
    modes: {
      '+x': 'Add execute permission',
      '-w': 'Remove write permission',
      '755': 'rwxr-xr-x (common for scripts)',
      '644': 'rw-r--r-- (common for files)',
      '700': 'rwx------ (private)',
    },
    examples: ['chmod +x script.sh', 'chmod 755 program', 'chmod 644 document.txt'],
    funExplanation: '🔐 Like setting locks on doors! chmod controls who can read (r), write (w), or execute (x) a file. Numbers like 755 are shorthand codes!',
    permissionTable: 'r=4, w=2, x=1. Add them up! 7=rwx, 6=rw, 5=rx, 4=r, 0=none',
  },

  chown: {
    name: 'chown',
    fullName: 'Change Owner',
    description: 'Changes file owner and group',
    syntax: 'chown [owner]:[group] [file]',
    category: 'permissions',
    difficulty: 'intermediate',
    examples: ['chown user file.txt', 'chown user:group file.txt'],
    funExplanation: '👑 Like transferring ownership of a treasure! chown changes who owns a file. Only the root (superuser) can give files to others!',
  },

  // Process Commands
  ps: {
    name: 'ps',
    fullName: 'Process Status',
    description: 'Shows running processes',
    syntax: 'ps [options]',
    category: 'processes',
    difficulty: 'intermediate',
    options: {
      'aux': 'Show all processes with details',
      '-ef': 'Full format listing',
    },
    examples: ['ps', 'ps aux', 'ps aux | grep firefox'],
    funExplanation: '👁️ Like taking a snapshot of all the creatures in the forest! ps shows you every program running right now, with their process IDs (PIDs).',
  },

  top: {
    name: 'top',
    fullName: 'Table of Processes',
    description: 'Real-time view of running processes',
    syntax: 'top',
    category: 'processes',
    difficulty: 'intermediate',
    controls: {
      'q': 'Quit',
      'k': 'Kill a process',
      'h': 'Help',
    },
    examples: ['top'],
    funExplanation: '📺 Like watching a live security camera! top shows processes in real-time, constantly updating. You can see which programs use the most resources!',
  },

  kill: {
    name: 'kill',
    fullName: 'Kill Process',
    description: 'Sends signals to processes (usually to stop them)',
    syntax: 'kill [signal] [PID]',
    category: 'processes',
    difficulty: 'intermediate',
    signals: {
      '(default)': 'SIGTERM - Ask process to terminate gracefully',
      '-9': 'SIGKILL - Force immediate termination',
      '-HUP': 'SIGHUP - Restart/reload process',
    },
    examples: ['kill 1234', 'kill -9 5678'],
    funExplanation: '🎯 Like asking someone to leave, or kicking them out! kill sends signals to processes. The default is polite, -9 is forceful!',
  },

  // Pipe and Redirection
  grep: {
    name: 'grep',
    fullName: 'Global Regular Expression Print',
    description: 'Searches for patterns in files or output',
    syntax: 'grep [options] [pattern] [file]',
    category: 'pipes',
    difficulty: 'intermediate',
    options: {
      '-i': 'Case insensitive',
      '-r': 'Recursive search',
      '-n': 'Show line numbers',
      '-v': 'Invert match (show non-matching)',
    },
    examples: ['grep "error" log.txt', 'ps aux | grep firefox', 'grep -i "hello" *.txt'],
    funExplanation: '🔍 Like a search spell! grep finds all lines containing your search term. Perfect for finding needles in haystacks of text!',
  },

  echo: {
    name: 'echo',
    fullName: 'Echo',
    description: 'Displays text or variable values',
    syntax: 'echo [text]',
    category: 'basic',
    difficulty: 'beginner',
    examples: ['echo "Hello World"', 'echo $HOME', 'echo "Value: $USER"'],
    funExplanation: '📢 Like a parrot repeating what you say! echo prints text to the screen. Also useful for showing variable values!',
  },

  whoami: {
    name: 'whoami',
    fullName: 'Who Am I',
    description: 'Displays current username',
    syntax: 'whoami',
    category: 'basic',
    difficulty: 'beginner',
    examples: ['whoami'],
    funExplanation: '🪪 Like checking your ID card! whoami tells you which user you\'re logged in as. Simple but often needed!',
  },

  clear: {
    name: 'clear',
    fullName: 'Clear',
    description: 'Clears the terminal screen',
    syntax: 'clear',
    category: 'basic',
    difficulty: 'beginner',
    examples: ['clear'],
    funExplanation: '🧹 Like wiping a whiteboard clean! clear removes all previous output from the terminal. Fresh start!',
  },

  help: {
    name: 'help',
    fullName: 'Help',
    description: 'Shows available commands and hints',
    syntax: 'help [command]',
    category: 'basic',
    difficulty: 'beginner',
    examples: ['help', 'help ls', 'help chmod'],
    funExplanation: '📚 Your guidebook! help shows you what commands are available and how to use them. Never be afraid to ask for help!',
  },
};

// Get command by name
export const getCommand = (name) => {
  return COMMANDS[name.toLowerCase()] || null;
};

// Get commands by category
export const getCommandsByCategory = (category) => {
  return Object.values(COMMANDS).filter(cmd => cmd.category === category);
};

// Get commands by difficulty
export const getCommandsByDifficulty = (difficulty) => {
  return Object.values(COMMANDS).filter(cmd => cmd.difficulty === difficulty);
};

// Get all categories
export const getCategories = () => {
  const categories = new Set(Object.values(COMMANDS).map(cmd => cmd.category));
  return Array.from(categories);
};
