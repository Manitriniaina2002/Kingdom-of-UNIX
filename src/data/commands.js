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
    funExplanation: 'Think of it as asking "Where am I?" in the kingdom. pwd tells you the full path from the kingdom\'s root to your current location!',
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
    funExplanation: 'Like looking around a room to see what\'s there! ls shows you all the files and folders nearby. Use -l to see more details like a detective!',
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
    funExplanation: 'Like walking through doors! cd lets you move from room to room (directory to directory). Use ".." to go back, like walking out a door you just entered!',
  },

  cat: {
    name: 'cat',
    fullName: 'Concatenate',
    description: 'Displays the contents of a file',
    syntax: 'cat [file]',
    category: 'files',
    difficulty: 'beginner',
    examples: ['cat readme.txt', 'cat notes.txt'],
    funExplanation: 'Like opening a scroll and reading it! cat shows you everything written inside a file. The name comes from "concatenate" - joining things together!',
  },

  tree: {
    name: 'tree',
    fullName: 'Tree',
    description: 'Shows directory structure as a tree',
    syntax: 'tree [path]',
    category: 'navigation',
    difficulty: 'beginner',
    examples: ['tree', 'tree documents/'],
    funExplanation: 'Like seeing a family tree, but for folders! tree draws a beautiful picture showing all directories and files nested inside each other.',
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
    funExplanation: 'Like building a new room! mkdir creates a new folder where you can store files. Use -p to create a whole chain of folders at once!',
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
    funExplanation: 'Like throwing something in the trash... except there\'s NO UNDO! Be careful with rm, especially rm -rf. Once deleted, files are gone forever!',
    warning: 'DANGER: rm permanently deletes files! There is no recycle bin. Triple-check before using rm -rf!',
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
    funExplanation: 'Like setting locks on doors! chmod controls who can read (r), write (w), or execute (x) a file. Numbers like 755 are shorthand codes!',
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
    funExplanation: 'Like transferring ownership of a treasure! chown changes who owns a file. Only the root (superuser) can give files to others!',
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
    funExplanation: 'Like taking a snapshot of all the creatures in the forest! ps shows you every program running right now, with their process IDs (PIDs).',
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
    funExplanation: 'Like watching a live security camera! top shows processes in real-time, constantly updating. You can see which programs use the most resources!',
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
    funExplanation: 'Like asking someone to leave, or kicking them out! kill sends signals to processes. The default is polite, -9 is forceful!',
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
    funExplanation: 'Like a search spell! grep finds all lines containing your search term. Perfect for finding needles in haystacks of text!',
  },

  echo: {
    name: 'echo',
    fullName: 'Echo',
    description: 'Displays text or variable values',
    syntax: 'echo [text]',
    category: 'basic',
    difficulty: 'beginner',
    examples: ['echo "Hello World"', 'echo $HOME', 'echo "Value: $USER"'],
    funExplanation: 'Like a parrot repeating what you say! echo prints text to the screen. Also useful for showing variable values!',
  },

  whoami: {
    name: 'whoami',
    fullName: 'Who Am I',
    description: 'Displays current username',
    syntax: 'whoami',
    category: 'basic',
    difficulty: 'beginner',
    examples: ['whoami'],
    funExplanation: 'Like checking your ID card! whoami tells you which user you\'re logged in as. Simple but often needed!',
  },

  clear: {
    name: 'clear',
    fullName: 'Clear',
    description: 'Clears the terminal screen',
    syntax: 'clear',
    category: 'basic',
    difficulty: 'beginner',
    examples: ['clear'],
    funExplanation: 'Like wiping a whiteboard clean! clear removes all previous output from the terminal. Fresh start!',
  },

  help: {
    name: 'help',
    fullName: 'Help',
    description: 'Shows available commands and hints',
    syntax: 'help [command]',
    category: 'basic',
    difficulty: 'beginner',
    examples: ['help', 'help ls', 'help chmod'],
    funExplanation: 'Your guidebook! help shows you what commands are available and how to use them. Never be afraid to ask for help!',
  },

  // ──────── File Operations ────────
  touch: {
    name: 'touch',
    fullName: 'Touch',
    description: 'Creates empty files or updates timestamps',
    syntax: 'touch [file]',
    category: 'files',
    difficulty: 'beginner',
    examples: ['touch newfile.txt', 'touch a.txt b.txt c.txt'],
    funExplanation: 'Like placing a blank scroll on the desk! touch creates a new empty file if it doesn\'t exist, or updates the timestamp if it does.',
  },

  cp: {
    name: 'cp',
    fullName: 'Copy',
    description: 'Copies files and directories',
    syntax: 'cp [options] source destination',
    category: 'files',
    difficulty: 'beginner',
    options: {
      '-r': 'Copy directories recursively',
      '-a': 'Archive mode (preserves permissions)',
      '-i': 'Interactive mode (prompt before overwrite)',
    },
    examples: ['cp file.txt backup.txt', 'cp -r mydir/ mydir_backup/'],
    funExplanation: 'Like a magical copier! cp creates an exact duplicate of a file or directory. Use -r for entire folders!',
  },

  mv: {
    name: 'mv',
    fullName: 'Move',
    description: 'Moves or renames files and directories',
    syntax: 'mv source destination',
    category: 'files',
    difficulty: 'beginner',
    options: {
      '-i': 'Interactive mode (prompt before overwrite)',
    },
    examples: ['mv old.txt new.txt', 'mv file.txt /tmp/'],
    funExplanation: 'Like teleporting an item! mv both moves files between locations AND renames them. Two powers in one command!',
  },

  head: {
    name: 'head',
    fullName: 'Head',
    description: 'Shows the first lines of a file',
    syntax: 'head [options] [file]',
    category: 'files',
    difficulty: 'beginner',
    options: {
      '-n': 'Number of lines to show (default 10)',
    },
    examples: ['head file.txt', 'head -5 file.txt'],
    funExplanation: 'Like peeking at the top of a scroll! head shows you just the beginning of a file without opening the whole thing.',
  },

  tail: {
    name: 'tail',
    fullName: 'Tail',
    description: 'Shows the last lines of a file',
    syntax: 'tail [options] [file]',
    category: 'files',
    difficulty: 'beginner',
    options: {
      '-n': 'Number of lines to show (default 10)',
      '-f': 'Follow - watch for new lines in real-time',
    },
    examples: ['tail file.txt', 'tail -f /var/log/syslog'],
    funExplanation: 'Like reading the end of a scroll! tail -f is especially magical - it watches a file in real-time as new lines are added.',
  },

  less: {
    name: 'less',
    fullName: 'Less',
    description: 'View file contents page by page',
    syntax: 'less [file]',
    category: 'files',
    difficulty: 'beginner',
    controls: {
      'q': 'Quit',
      'Space': 'Next page',
      'b': 'Previous page',
      '/': 'Search forward',
    },
    examples: ['less longfile.txt'],
    funExplanation: 'Like reading a book page by page instead of unrolling the entire scroll! Far better than cat for long files.',
  },

  find: {
    name: 'find',
    fullName: 'Find',
    description: 'Search for files and directories',
    syntax: 'find [path] [options]',
    category: 'files',
    difficulty: 'intermediate',
    options: {
      '-name': 'Search by filename pattern',
      '-type f': 'Files only',
      '-type d': 'Directories only',
      '-size': 'Search by file size',
    },
    examples: ['find . -name "*.txt"', 'find /home -type f -name "*.log"'],
    funExplanation: 'Like a search spell for your entire filesystem! find can locate any file matching your criteria, no matter how deep.',
  },

  stat: {
    name: 'stat',
    fullName: 'File Status',
    description: 'Display detailed file information',
    syntax: 'stat [file]',
    category: 'permissions',
    difficulty: 'intermediate',
    examples: ['stat myfile.txt', 'stat /etc/passwd'],
    funExplanation: 'Like a detailed inspection report! stat shows everything about a file: size, permissions, ownership, and timestamps.',
  },

  umask: {
    name: 'umask',
    fullName: 'User Mask',
    description: 'Set default permissions for new files',
    syntax: 'umask [mask]',
    category: 'permissions',
    difficulty: 'intermediate',
    examples: ['umask', 'umask 022', 'umask 077'],
    funExplanation: 'Like setting a default lock template! umask determines what permissions new files get automatically. Lower is more open!',
  },

  chgrp: {
    name: 'chgrp',
    fullName: 'Change Group',
    description: 'Changes the group ownership of a file',
    syntax: 'chgrp [group] [file]',
    category: 'permissions',
    difficulty: 'intermediate',
    examples: ['chgrp developers file.txt', 'chgrp -R team project/'],
    funExplanation: 'Like assigning a file to a guild! chgrp changes which group has access to a file.',
  },

  // ──────── Text Processing ────────
  sort: {
    name: 'sort',
    fullName: 'Sort',
    description: 'Sort lines of text files',
    syntax: 'sort [options] [file]',
    category: 'pipes',
    difficulty: 'intermediate',
    options: {
      '-n': 'Numeric sort',
      '-r': 'Reverse order',
      '-k': 'Sort by specific field',
      '-u': 'Unique (remove duplicates)',
    },
    examples: ['sort names.txt', 'sort -rn numbers.txt'],
    funExplanation: 'Like a magical librarian that organizes all your scrolls! sort arranges lines alphabetically, numerically, or in reverse.',
  },

  uniq: {
    name: 'uniq',
    fullName: 'Unique',
    description: 'Remove adjacent duplicate lines',
    syntax: 'uniq [options] [file]',
    category: 'pipes',
    difficulty: 'intermediate',
    options: {
      '-c': 'Count occurrences',
      '-d': 'Show only duplicates',
    },
    examples: ['sort file | uniq', 'sort file | uniq -c'],
    funExplanation: 'Like removing identical cards stacked together! Always sort first, because uniq only removes consecutive duplicates.',
  },

  wc: {
    name: 'wc',
    fullName: 'Word Count',
    description: 'Count lines, words, and bytes in files',
    syntax: 'wc [options] [file]',
    category: 'pipes',
    difficulty: 'beginner',
    options: {
      '-l': 'Count lines only',
      '-w': 'Count words only',
      '-c': 'Count bytes only',
    },
    examples: ['wc file.txt', 'wc -l *.txt', 'ls | wc -l'],
    funExplanation: 'Like a counting spell! wc tells you exactly how many lines, words, and characters are in a file.',
  },

  cut: {
    name: 'cut',
    fullName: 'Cut',
    description: 'Extract specific columns from text',
    syntax: 'cut [options] [file]',
    category: 'pipes',
    difficulty: 'intermediate',
    options: {
      '-d': 'Set delimiter (default: tab)',
      '-f': 'Select fields by number',
    },
    examples: ['cut -d: -f1 /etc/passwd', 'cut -d, -f2,3 data.csv'],
    funExplanation: 'Like using scissors on a table! cut extracts specific columns from structured text data.',
  },

  sed: {
    name: 'sed',
    fullName: 'Stream Editor',
    description: 'Stream editor for text transformation',
    syntax: 'sed [options] \'command\' [file]',
    category: 'pipes',
    difficulty: 'advanced',
    options: {
      '-i': 'Edit file in-place',
      's/old/new/g': 'Substitute all occurrences',
    },
    examples: ['sed "s/old/new/g" file.txt', 'sed -i "s/http/https/g" urls.txt'],
    funExplanation: 'Like a find-and-replace spell for text streams! sed transforms text as it flows through, making it incredibly powerful for batch edits.',
  },

  awk: {
    name: 'awk',
    fullName: 'AWK',
    description: 'Pattern scanning and text processing',
    syntax: 'awk \'pattern {action}\' [file]',
    category: 'pipes',
    difficulty: 'advanced',
    examples: ['awk \'{print $1}\' file.txt', 'awk -F: \'{print $1}\' /etc/passwd'],
    funExplanation: 'The most powerful text processing wizard! awk splits lines into fields and lets you manipulate each one. $1 is field 1, $2 is field 2, etc.',
  },

  tr: {
    name: 'tr',
    fullName: 'Translate',
    description: 'Translate or delete characters',
    syntax: 'tr [set1] [set2]',
    category: 'pipes',
    difficulty: 'intermediate',
    examples: ['echo "HELLO" | tr A-Z a-z', 'echo "hello" | tr a-z A-Z'],
    funExplanation: 'Like a character transformation spell! tr changes one set of characters into another. Great for case conversion!',
  },

  tee: {
    name: 'tee',
    fullName: 'Tee',
    description: 'Read stdin and write to stdout AND files',
    syntax: 'tee [options] [file]',
    category: 'pipes',
    difficulty: 'intermediate',
    examples: ['ls | tee filelist.txt', 'echo "log" | tee -a log.txt'],
    funExplanation: 'Like a T-junction in plumbing! tee splits output in two directions: to the screen AND to a file at the same time.',
  },

  xargs: {
    name: 'xargs',
    fullName: 'Extended Arguments',
    description: 'Build and execute commands from stdin',
    syntax: 'xargs [options] [command]',
    category: 'pipes',
    difficulty: 'advanced',
    examples: ['find . -name "*.log" | xargs rm', 'echo "a b c" | xargs mkdir'],
    funExplanation: 'Like a command amplifier! xargs takes output from one command and turns it into arguments for another command.',
  },

  // ──────── Process Management ────────
  bg: {
    name: 'bg',
    fullName: 'Background',
    description: 'Resume a stopped job in the background',
    syntax: 'bg [job_id]',
    category: 'processes',
    difficulty: 'intermediate',
    examples: ['bg', 'bg %1'],
    funExplanation: 'Like telling a paused creature: "keep running, but stay out of sight!" bg resumes a stopped job in the background.',
  },

  fg: {
    name: 'fg',
    fullName: 'Foreground',
    description: 'Bring a background job to the foreground',
    syntax: 'fg [job_id]',
    category: 'processes',
    difficulty: 'intermediate',
    examples: ['fg', 'fg %1'],
    funExplanation: 'Like calling a background creature to come front and center! fg brings a background job back to your active terminal.',
  },

  jobs: {
    name: 'jobs',
    fullName: 'Jobs',
    description: 'List background and stopped jobs',
    syntax: 'jobs',
    category: 'processes',
    difficulty: 'intermediate',
    examples: ['jobs'],
    funExplanation: 'Like a roster of all background creatures! jobs shows every process you\'ve sent to the background or paused.',
  },

  nohup: {
    name: 'nohup',
    fullName: 'No Hangup',
    description: 'Run a command immune to hangups',
    syntax: 'nohup command &',
    category: 'processes',
    difficulty: 'advanced',
    examples: ['nohup ./server.sh &', 'nohup python script.py > output.log &'],
    funExplanation: 'Like casting an immortality spell! nohup makes a process survive even when you close the terminal or log out.',
  },

  killall: {
    name: 'killall',
    fullName: 'Kill All',
    description: 'Kill processes by name instead of PID',
    syntax: 'killall [options] name',
    category: 'processes',
    difficulty: 'intermediate',
    examples: ['killall firefox', 'killall -9 hung_process'],
    funExplanation: 'Like a mass banish spell! killall targets all processes with a given name instead of needing individual PIDs.',
  },

  // ──────── Networking ────────
  ping: {
    name: 'ping',
    fullName: 'Ping',
    description: 'Test network connectivity to a host',
    syntax: 'ping [options] host',
    category: 'network',
    difficulty: 'intermediate',
    options: {
      '-c': 'Number of packets to send',
    },
    examples: ['ping google.com', 'ping -c 3 localhost'],
    funExplanation: 'Like shouting across a canyon and listening for an echo! ping checks if a remote host is reachable and how fast the connection is.',
  },

  hostname: {
    name: 'hostname',
    fullName: 'Hostname',
    description: 'Show or set the system hostname',
    syntax: 'hostname',
    category: 'network',
    difficulty: 'beginner',
    examples: ['hostname', 'hostname -I'],
    funExplanation: 'Like checking the name plate on your castle door! hostname tells you your machine\'s name on the network.',
  },

  curl: {
    name: 'curl',
    fullName: 'Client URL',
    description: 'Transfer data to/from URLs',
    syntax: 'curl [options] URL',
    category: 'network',
    difficulty: 'intermediate',
    options: {
      '-O': 'Save with original filename',
      '-I': 'Fetch headers only',
      '-o': 'Save to specific filename',
      '-L': 'Follow redirects',
    },
    examples: ['curl https://example.com', 'curl -O https://example.com/file.zip'],
    funExplanation: 'The Swiss Army knife of network tools! curl can download files, check APIs, send data, and much more.',
  },

  wget: {
    name: 'wget',
    fullName: 'Web Get',
    description: 'Download files from the web',
    syntax: 'wget [options] URL',
    category: 'network',
    difficulty: 'intermediate',
    options: {
      '-c': 'Continue interrupted download',
      '-r': 'Recursive download',
      '-q': 'Quiet mode',
    },
    examples: ['wget https://example.com/file.txt', 'wget -c https://example.com/large.zip'],
    funExplanation: 'Like sending a messenger bird to fetch a scroll! wget downloads files from URLs and can even resume interrupted downloads.',
  },

  ssh: {
    name: 'ssh',
    fullName: 'Secure Shell',
    description: 'Connect securely to remote machines',
    syntax: 'ssh [user@]hostname',
    category: 'network',
    difficulty: 'advanced',
    options: {
      '-p': 'Specify port number',
    },
    examples: ['ssh user@server.com', 'ssh -p 2222 admin@10.0.0.1'],
    funExplanation: 'Like opening a magical portal to another castle! SSH gives you encrypted remote access to any machine.',
  },

  scp: {
    name: 'scp',
    fullName: 'Secure Copy',
    description: 'Copy files between machines over SSH',
    syntax: 'scp source user@host:destination',
    category: 'network',
    difficulty: 'advanced',
    examples: ['scp file.txt user@server:/home/', 'scp user@server:/data/report.txt .'],
    funExplanation: 'Like teleporting files between castles! scp copies files securely between your machine and remote servers.',
  },

  netstat: {
    name: 'netstat',
    fullName: 'Network Statistics',
    description: 'Display network connections and statistics',
    syntax: 'netstat [options]',
    category: 'network',
    difficulty: 'advanced',
    options: {
      '-t': 'TCP connections',
      '-l': 'Listening ports',
      '-n': 'Numeric addresses',
      '-p': 'Show process using the connection',
    },
    examples: ['netstat -tlnp', 'netstat -an'],
    funExplanation: 'Like viewing all the messenger birds and trade routes of your kingdom! netstat shows every network connection.',
  },

  // ──────── System Administration ────────
  sudo: {
    name: 'sudo',
    fullName: 'Superuser Do',
    description: 'Execute a command as another user (usually root)',
    syntax: 'sudo command',
    category: 'admin',
    difficulty: 'intermediate',
    examples: ['sudo apt update', 'sudo rm /var/log/old.log'],
    funExplanation: 'Like borrowing the king\'s crown for one command! sudo gives you temporary superpower to do things only root can do.',
    warning: 'Be very careful with sudo! Double-check every command before running it with elevated privileges.',
  },

  df: {
    name: 'df',
    fullName: 'Disk Free',
    description: 'Display filesystem disk space usage',
    syntax: 'df [options]',
    category: 'admin',
    difficulty: 'intermediate',
    options: {
      '-h': 'Human-readable sizes',
    },
    examples: ['df -h', 'df -h /'],
    funExplanation: 'Like checking how full your kingdom\'s treasure vaults are! df shows how much disk space is used and available.',
  },

  du: {
    name: 'du',
    fullName: 'Disk Usage',
    description: 'Estimate file and directory space usage',
    syntax: 'du [options] [path]',
    category: 'admin',
    difficulty: 'intermediate',
    options: {
      '-s': 'Summary (total only)',
      '-h': 'Human-readable sizes',
    },
    examples: ['du -sh /var/log', 'du -sh * | sort -rh | head -10'],
    funExplanation: 'Like weighing each chest of treasure! du tells you exactly how much space each directory is using.',
  },

  free: {
    name: 'free',
    fullName: 'Free Memory',
    description: 'Display memory usage',
    syntax: 'free [options]',
    category: 'admin',
    difficulty: 'intermediate',
    options: {
      '-h': 'Human-readable output',
    },
    examples: ['free -h', 'free -m'],
    funExplanation: 'Like checking how many workers are available vs busy! free shows total, used, and available RAM and swap.',
  },

  uptime: {
    name: 'uptime',
    fullName: 'Uptime',
    description: 'Show system uptime and load',
    syntax: 'uptime',
    category: 'admin',
    difficulty: 'beginner',
    examples: ['uptime'],
    funExplanation: 'Like asking the castle guard how long they\'ve been on watch! uptime shows how long the system has been running.',
  },

  man: {
    name: 'man',
    fullName: 'Manual',
    description: 'Display the manual page for a command',
    syntax: 'man [command]',
    category: 'basic',
    difficulty: 'beginner',
    controls: {
      'q': 'Quit',
      'Space': 'Next page',
      '/pattern': 'Search',
    },
    examples: ['man ls', 'man chmod', 'man grep'],
    funExplanation: 'The great UNIX encyclopedia! man gives you the complete reference manual for any command. When in doubt, read the manual!',
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
