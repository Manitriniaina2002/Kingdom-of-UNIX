/**
 * UNIX Lessons - Comprehensive lesson content for Kingdom of UNIX
 * 10 chapters, 30 lessons covering UNIX from basics to administration
 */

export const CHAPTERS = [
  { id: 'ch1', title: 'Introduction to UNIX', description: 'Understanding the UNIX world', icon: '🌍', color: '#22C55E', order: 1 },
  { id: 'ch2', title: 'Navigating the File System', description: 'Moving through directories', icon: '🧭', color: '#3B82F6', order: 2 },
  { id: 'ch3', title: 'Working with Files', description: 'Creating, viewing, and managing files', icon: '📄', color: '#8B5CF6', order: 3 },
  { id: 'ch4', title: 'File Permissions & Ownership', description: 'Controlling access to files', icon: '🔐', color: '#A855F7', order: 4 },
  { id: 'ch5', title: 'Text Processing', description: 'Searching and transforming text', icon: '📝', color: '#EC4899', order: 5 },
  { id: 'ch6', title: 'Process Management', description: 'Controlling running programs', icon: '⚙️', color: '#10B981', order: 6 },
  { id: 'ch7', title: 'Pipes & Redirection', description: 'Connecting commands together', icon: '🔗', color: '#F59E0B', order: 7 },
  { id: 'ch8', title: 'Shell Scripting Basics', description: 'Automating with scripts', icon: '📜', color: '#EF4444', order: 8 },
  { id: 'ch9', title: 'Networking Basics', description: 'Connecting to the world', icon: '🌐', color: '#6366F1', order: 9 },
  { id: 'ch10', title: 'System Administration', description: 'Managing the system', icon: '🛡️', color: '#14B8A6', order: 10 },
];

export const LESSONS = {
  // ═══════════════════════ CHAPTER 1: Introduction ═══════════════════════
  lesson_ch1_01: {
    id: 'lesson_ch1_01', chapterId: 'ch1', title: 'What is UNIX?', order: 1,
    estimatedReadTime: '5 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'A Brief History' },
      { type: 'paragraph', text: 'UNIX was created at Bell Labs in 1969 by Ken Thompson and Dennis Ritchie. It became the foundation for many modern operating systems including Linux, macOS, and BSD variants.' },
      { type: 'heading', text: 'The UNIX Philosophy' },
      { type: 'paragraph', text: 'UNIX follows key design principles: do one thing well, everything is a file, and programs should work together through text streams. This makes UNIX incredibly powerful and flexible.' },
      { type: 'list', items: ['Write programs that do one thing and do it well', 'Write programs to work together', 'Write programs to handle text streams as a universal interface', 'Everything is a file (devices, processes, sockets)'] },
      { type: 'heading', text: 'UNIX vs Linux' },
      { type: 'paragraph', text: 'Linux is a UNIX-like operating system created by Linus Torvalds in 1991. While not technically UNIX, it follows the same principles and supports the same commands. Most servers worldwide run Linux.' },
      { type: 'tip', text: 'When people say "UNIX commands", they usually mean commands that work on both UNIX and Linux systems.' },
    ],
    examples: [
      { input: 'uname -s', output: 'Linux', description: 'Check your operating system name' },
      { input: 'uname -a', output: 'Linux hostname 5.15.0 #1 SMP x86_64 GNU/Linux', description: 'Show all system information' },
    ],
    practiceExercises: [
      { instruction: 'Check what operating system you are running', expectedCommand: 'uname', hint: 'The uname command shows system information' },
      { instruction: 'Display all system information at once', expectedCommand: 'uname -a', hint: 'Use the -a flag for all information' },
    ],
  },

  lesson_ch1_02: {
    id: 'lesson_ch1_02', chapterId: 'ch1', title: 'The Terminal & Shell', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['echo', 'whoami'],
    content: [
      { type: 'heading', text: 'What is a Terminal?' },
      { type: 'paragraph', text: 'A terminal (or terminal emulator) is a program that provides a text-based interface to interact with your computer. It displays a prompt where you type commands and shows the output.' },
      { type: 'heading', text: 'What is a Shell?' },
      { type: 'paragraph', text: 'The shell is the program that interprets your commands. Popular shells include Bash (Bourne Again Shell), Zsh, and Fish. The shell reads what you type, executes it, and displays the result.' },
      { type: 'heading', text: 'The Command Prompt' },
      { type: 'paragraph', text: 'The prompt typically shows your username, hostname, and current directory. It ends with $ for regular users or # for root (administrator).' },
      { type: 'code', command: 'echo $SHELL', output: '/bin/bash' },
      { type: 'tip', text: 'You can find out which shell you are using with echo $SHELL. Most Linux distributions use Bash by default.' },
      { type: 'heading', text: 'Your First Commands' },
      { type: 'code', command: 'whoami', output: 'adventurer' },
    ],
    examples: [
      { input: 'echo "Hello, World!"', output: 'Hello, World!', description: 'Print text to the terminal' },
      { input: 'whoami', output: 'adventurer', description: 'Display current username' },
    ],
    practiceExercises: [
      { instruction: 'Print your username to the screen', expectedCommand: 'whoami', hint: 'whoami shows the current logged-in user' },
      { instruction: 'Print the text "Hello UNIX" to the terminal', expectedCommand: 'echo Hello UNIX', hint: 'Use echo followed by the text you want to print' },
    ],
  },

  lesson_ch1_03: {
    id: 'lesson_ch1_03', chapterId: 'ch1', title: 'Command Structure', order: 3,
    estimatedReadTime: '5 min', keyCommands: ['man', 'help'],
    content: [
      { type: 'heading', text: 'Anatomy of a Command' },
      { type: 'paragraph', text: 'Every UNIX command follows the pattern: command [options] [arguments]. The command is what you want to do, options modify how it works, and arguments are what it works on.' },
      { type: 'code', command: 'ls -la /home', output: 'total 4\ndrwxr-xr-x 3 root root 4096 Jan 1 00:00 .' },
      { type: 'paragraph', text: 'In "ls -la /home": ls is the command, -la are options (l=long format, a=all files), and /home is the argument (which directory to list).' },
      { type: 'heading', text: 'Options and Flags' },
      { type: 'list', items: ['Short options use a single dash: -l, -a, -h', 'Short options can be combined: -la is the same as -l -a', 'Long options use double dashes: --all, --help', 'Some options take values: --color=auto'] },
      { type: 'heading', text: 'Getting Help' },
      { type: 'paragraph', text: 'Use man (manual) to read documentation for any command. Press q to quit the manual, and use arrow keys or space to scroll.' },
      { type: 'code', command: 'man ls', output: 'LS(1)\nNAME\n  ls - list directory contents\n...' },
      { type: 'tip', text: 'Most commands support --help for a quick summary. Try: ls --help' },
    ],
    examples: [
      { input: 'ls --help', output: 'Usage: ls [OPTION]... [FILE]...\nList information about the FILEs...', description: 'Quick help for the ls command' },
      { input: 'man pwd', output: 'PWD(1)\nNAME\n  pwd - print name of current/working directory', description: 'Read the manual for pwd' },
    ],
    practiceExercises: [
      { instruction: 'Get help for the ls command', expectedCommand: 'ls --help', hint: 'Use --help after the command name' },
      { instruction: 'Read the manual page for the echo command', expectedCommand: 'man echo', hint: 'Use man followed by the command name' },
    ],
  },

  // ═══════════════════════ CHAPTER 2: File System Navigation ═══════════════════════
  lesson_ch2_01: {
    id: 'lesson_ch2_01', chapterId: 'ch2', title: 'Directory Structure', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['ls'],
    content: [
      { type: 'heading', text: 'The UNIX File System Tree' },
      { type: 'paragraph', text: 'UNIX organizes everything in a hierarchical tree starting from the root directory /. Every file and directory is under this single root, unlike Windows which has separate drive letters.' },
      { type: 'heading', text: 'Key Directories' },
      { type: 'table', headers: ['Directory', 'Purpose'], rows: [
        ['/', 'Root - top of the file system'],
        ['/home', 'User home directories'],
        ['/etc', 'System configuration files'],
        ['/var', 'Variable data (logs, mail, temp)'],
        ['/tmp', 'Temporary files (cleared on reboot)'],
        ['/usr', 'User programs and utilities'],
        ['/bin', 'Essential command binaries'],
        ['/dev', 'Device files (hardware)'],
      ]},
      { type: 'tip', text: 'Your personal files live in /home/yourusername. The ~ symbol is a shortcut for your home directory.' },
      { type: 'heading', text: 'Hidden Files' },
      { type: 'paragraph', text: 'Files starting with a dot (.) are hidden by default. Configuration files like .bashrc, .profile, and .ssh are hidden to keep directories clean.' },
    ],
    examples: [
      { input: 'ls /', output: 'bin  dev  etc  home  lib  tmp  usr  var', description: 'List root directory contents' },
      { input: 'ls -a ~', output: '.  ..  .bashrc  .profile  Documents  Downloads', description: 'List all files including hidden ones in home' },
    ],
    practiceExercises: [
      { instruction: 'List the contents of the root directory', expectedCommand: 'ls /', hint: 'Use ls with / as the path' },
      { instruction: 'Show hidden files in the current directory', expectedCommand: 'ls -a', hint: 'The -a flag shows all files, including hidden ones' },
    ],
  },

  lesson_ch2_02: {
    id: 'lesson_ch2_02', chapterId: 'ch2', title: 'Navigating with pwd, cd, ls', order: 2,
    estimatedReadTime: '6 min', keyCommands: ['pwd', 'cd', 'ls'],
    content: [
      { type: 'heading', text: 'Where Am I? (pwd)' },
      { type: 'paragraph', text: 'pwd (print working directory) shows your current location in the file system. Always use this when you are unsure of where you are.' },
      { type: 'code', command: 'pwd', output: '/home/adventurer' },
      { type: 'heading', text: 'Moving Around (cd)' },
      { type: 'paragraph', text: 'cd (change directory) moves you to a different directory. Use it with a path to go somewhere specific.' },
      { type: 'code', command: 'cd /tmp', output: '' },
      { type: 'heading', text: 'Listing Contents (ls)' },
      { type: 'paragraph', text: 'ls lists files and directories. It has many useful flags for different formats.' },
      { type: 'list', items: ['ls -l: long format with permissions, size, date', 'ls -a: show hidden files (starting with .)', 'ls -h: human-readable file sizes (KB, MB)', 'ls -t: sort by modification time', 'ls -R: list subdirectories recursively'] },
      { type: 'tip', text: 'Combine flags: ls -lah gives you a detailed list of all files with readable sizes.' },
    ],
    examples: [
      { input: 'ls -lh', output: 'total 8.0K\ndrwxr-xr-x 2 user user 4.0K Jan 1 notes.txt\n-rw-r--r-- 1 user user 1.2K Jan 1 readme.md', description: 'Long listing with human-readable sizes' },
      { input: 'cd .. && pwd', output: '/home', description: 'Move up one directory and show location' },
    ],
    practiceExercises: [
      { instruction: 'Show your current working directory', expectedCommand: 'pwd', hint: 'pwd prints the full path of where you are' },
      { instruction: 'List all files in long format', expectedCommand: 'ls -la', hint: 'Combine -l (long) and -a (all) flags' },
    ],
  },

  lesson_ch2_03: {
    id: 'lesson_ch2_03', chapterId: 'ch2', title: 'Paths & Shortcuts', order: 3,
    estimatedReadTime: '5 min', keyCommands: ['cd', 'tree'],
    content: [
      { type: 'heading', text: 'Absolute vs Relative Paths' },
      { type: 'paragraph', text: 'An absolute path starts from root (/), like /home/user/docs. A relative path starts from your current directory, like docs/notes.txt. Use absolute paths when you need to be precise.' },
      { type: 'heading', text: 'Path Shortcuts' },
      { type: 'table', headers: ['Shortcut', 'Meaning'], rows: [
        ['~', 'Your home directory (/home/username)'],
        ['.', 'Current directory'],
        ['..', 'Parent directory (one level up)'],
        ['-', 'Previous directory (where you just were)'],
      ]},
      { type: 'code', command: 'cd ~', output: '' },
      { type: 'heading', text: 'Tab Completion' },
      { type: 'paragraph', text: 'Press Tab to auto-complete file and directory names. Press Tab twice to see all possibilities. This saves tremendous typing time and prevents errors.' },
      { type: 'tip', text: 'Use cd - to quickly toggle between two directories. Great when working in two places.' },
    ],
    examples: [
      { input: 'cd ~/Documents', output: '', description: 'Go to Documents in your home directory' },
      { input: 'tree -L 2', output: '.\n├── docs\n│   ├── readme.md\n│   └── notes.txt\n└── src\n    └── main.js', description: 'Show directory tree 2 levels deep' },
    ],
    practiceExercises: [
      { instruction: 'Navigate to your home directory using the shortcut', expectedCommand: 'cd ~', hint: 'The ~ character represents your home directory' },
      { instruction: 'Go up one directory level', expectedCommand: 'cd ..', hint: 'Two dots (..) means the parent directory' },
    ],
  },

  // ═══════════════════════ CHAPTER 3: Working with Files ═══════════════════════
  lesson_ch3_01: {
    id: 'lesson_ch3_01', chapterId: 'ch3', title: 'Creating & Viewing Files', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['touch', 'mkdir', 'cat', 'less', 'head', 'tail'],
    content: [
      { type: 'heading', text: 'Creating Files and Directories' },
      { type: 'paragraph', text: 'touch creates empty files or updates timestamps. mkdir creates directories. Use mkdir -p to create nested directories in one command.' },
      { type: 'code', command: 'touch newfile.txt', output: '' },
      { type: 'code', command: 'mkdir -p projects/web/css', output: '' },
      { type: 'heading', text: 'Viewing File Contents' },
      { type: 'paragraph', text: 'Several commands let you view files in different ways:' },
      { type: 'list', items: ['cat: display entire file at once', 'less: page through a file (use q to quit)', 'head: show first 10 lines (use -n for custom count)', 'tail: show last 10 lines (use -f to follow live updates)'] },
      { type: 'code', command: 'cat /etc/hostname', output: 'kingdom-server' },
      { type: 'tip', text: 'Use tail -f to watch log files update in real time. Very useful for debugging.' },
    ],
    examples: [
      { input: 'head -5 /etc/passwd', output: 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin\nbin:x:2:2:bin:/usr/bin\nsys:x:3:3:sys:/dev\nsync:x:4:65534:sync:/bin', description: 'Show first 5 lines of a file' },
      { input: 'tail -3 /var/log/syslog', output: 'Jan 1 12:00:01 server systemd[1]: Started Session\nJan 1 12:00:02 server sshd[1234]: Accepted\nJan 1 12:00:03 server kernel: info', description: 'Show last 3 lines of a log file' },
    ],
    practiceExercises: [
      { instruction: 'Create a new empty file called notes.txt', expectedCommand: 'touch notes.txt', hint: 'Use the touch command followed by the filename' },
      { instruction: 'Create a nested directory structure projects/src', expectedCommand: 'mkdir -p projects/src', hint: 'Use mkdir with the -p flag for nested directories' },
    ],
  },

  lesson_ch3_02: {
    id: 'lesson_ch3_02', chapterId: 'ch3', title: 'Copying, Moving & Renaming', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['cp', 'mv'],
    content: [
      { type: 'heading', text: 'Copying Files (cp)' },
      { type: 'paragraph', text: 'cp copies files and directories. Use -r (recursive) to copy entire directories with their contents.' },
      { type: 'code', command: 'cp file.txt backup.txt', output: '' },
      { type: 'code', command: 'cp -r mydir/ mydir_backup/', output: '' },
      { type: 'heading', text: 'Moving and Renaming (mv)' },
      { type: 'paragraph', text: 'mv moves files to a new location OR renames them. There is no separate rename command in UNIX - mv does both.' },
      { type: 'code', command: 'mv oldname.txt newname.txt', output: '' },
      { type: 'code', command: 'mv file.txt /tmp/', output: '' },
      { type: 'warning', text: 'mv overwrites the destination without asking. Use mv -i (interactive) to get a confirmation prompt before overwriting.' },
      { type: 'tip', text: 'To copy while preserving permissions and timestamps, use cp -a (archive mode).' },
    ],
    examples: [
      { input: 'cp -r src/ src_backup/', output: '', description: 'Copy an entire directory recursively' },
      { input: 'mv *.txt documents/', output: '', description: 'Move all .txt files into the documents directory' },
    ],
    practiceExercises: [
      { instruction: 'Copy file.txt to a new file called backup.txt', expectedCommand: 'cp file.txt backup.txt', hint: 'Use cp with source and destination' },
      { instruction: 'Rename old.txt to new.txt', expectedCommand: 'mv old.txt new.txt', hint: 'Use mv to rename files' },
    ],
  },

  lesson_ch3_03: {
    id: 'lesson_ch3_03', chapterId: 'ch3', title: 'Deleting Files & Wildcards', order: 3,
    estimatedReadTime: '5 min', keyCommands: ['rm', 'rmdir'],
    content: [
      { type: 'heading', text: 'Deleting Files (rm)' },
      { type: 'paragraph', text: 'rm removes files permanently. There is no recycle bin in UNIX - deleted files are gone forever. Use -r for directories and -f to force without confirmation.' },
      { type: 'code', command: 'rm unwanted.txt', output: '' },
      { type: 'code', command: 'rm -r old_directory/', output: '' },
      { type: 'warning', text: 'Never run rm -rf / or rm -rf * without double-checking. These commands can destroy your entire system. Always verify your path first with pwd.' },
      { type: 'heading', text: 'Wildcards (Globbing)' },
      { type: 'paragraph', text: 'Wildcards let you match multiple files at once:' },
      { type: 'table', headers: ['Pattern', 'Matches'], rows: [
        ['*', 'Any number of characters'],
        ['?', 'Exactly one character'],
        ['[abc]', 'Any one character from the set'],
        ['[0-9]', 'Any digit'],
        ['*.txt', 'All files ending in .txt'],
      ]},
      { type: 'tip', text: 'Use rmdir to remove empty directories only - it is safer than rm -r because it will refuse to delete directories with contents.' },
    ],
    examples: [
      { input: 'ls *.js', output: 'app.js  index.js  utils.js', description: 'List all JavaScript files' },
      { input: 'rm -i *.log', output: 'rm: remove regular file \'error.log\'?', description: 'Delete log files with confirmation' },
    ],
    practiceExercises: [
      { instruction: 'Delete a file called temp.txt', expectedCommand: 'rm temp.txt', hint: 'Use rm followed by the filename' },
      { instruction: 'List all files ending with .txt', expectedCommand: 'ls *.txt', hint: 'Use the * wildcard before .txt' },
    ],
  },

  // ═══════════════════════ CHAPTER 4: Permissions ═══════════════════════
  lesson_ch4_01: {
    id: 'lesson_ch4_01', chapterId: 'ch4', title: 'Understanding Permissions', order: 1,
    estimatedReadTime: '7 min', keyCommands: ['ls'],
    content: [
      { type: 'heading', text: 'The Permission System' },
      { type: 'paragraph', text: 'Every file in UNIX has three sets of permissions for three categories of users: the owner (u), the group (g), and others (o). Each set controls read (r), write (w), and execute (x) access.' },
      { type: 'heading', text: 'Reading Permission Strings' },
      { type: 'code', command: 'ls -l myfile.txt', output: '-rw-r--r-- 1 user group 1024 Jan 1 myfile.txt' },
      { type: 'paragraph', text: 'The string -rw-r--r-- breaks down as: - (file type), rw- (owner: read+write), r-- (group: read only), r-- (others: read only).' },
      { type: 'table', headers: ['Character', 'Meaning', 'Numeric'], rows: [
        ['r', 'Read (view contents)', '4'],
        ['w', 'Write (modify contents)', '2'],
        ['x', 'Execute (run as program)', '1'],
        ['-', 'Permission denied', '0'],
      ]},
      { type: 'heading', text: 'File Types' },
      { type: 'list', items: ['- : regular file', 'd : directory', 'l : symbolic link', 'b : block device', 'c : character device'] },
      { type: 'tip', text: 'Directories need execute (x) permission to let you enter them (cd into them), and read (r) to list their contents.' },
    ],
    examples: [
      { input: 'ls -la', output: 'drwxr-xr-x 2 user user 4096 Jan 1 Documents\n-rwxr-x--- 1 user user 8192 Jan 1 script.sh\n-rw-r--r-- 1 user user 1024 Jan 1 readme.md', description: 'View permissions of all files' },
      { input: 'stat myfile.txt', output: 'Access: (0644/-rw-r--r--)  Uid: (1000/user)  Gid: (1000/user)', description: 'Detailed file status including permissions' },
    ],
    practiceExercises: [
      { instruction: 'View the detailed permissions of all files', expectedCommand: 'ls -la', hint: 'Use ls -la for long format listing of all files' },
      { instruction: 'Check the detailed status of a file', expectedCommand: 'stat myfile.txt', hint: 'The stat command shows detailed file information' },
    ],
  },

  lesson_ch4_02: {
    id: 'lesson_ch4_02', chapterId: 'ch4', title: 'Changing Permissions (chmod)', order: 2,
    estimatedReadTime: '6 min', keyCommands: ['chmod'],
    content: [
      { type: 'heading', text: 'Numeric Mode (Octal)' },
      { type: 'paragraph', text: 'The most common way to set permissions. Add up the values: r=4, w=2, x=1. Three digits represent owner, group, others.' },
      { type: 'table', headers: ['Command', 'Result', 'Meaning'], rows: [
        ['chmod 755', 'rwxr-xr-x', 'Owner: all, Group/Others: read+execute'],
        ['chmod 644', 'rw-r--r--', 'Owner: read+write, Group/Others: read only'],
        ['chmod 700', 'rwx------', 'Owner: all, Group/Others: none'],
        ['chmod 600', 'rw-------', 'Owner: read+write, no one else'],
      ]},
      { type: 'heading', text: 'Symbolic Mode' },
      { type: 'paragraph', text: 'More readable way using letters: u (user/owner), g (group), o (others), a (all). Actions: + (add), - (remove), = (set exactly).' },
      { type: 'code', command: 'chmod u+x script.sh', output: '' },
      { type: 'code', command: 'chmod go-w file.txt', output: '' },
      { type: 'tip', text: '755 is the standard for directories and scripts. 644 is standard for regular files. Memorize these two.' },
      { type: 'warning', text: 'Never chmod 777 on production systems. It gives everyone full access and is a security risk.' },
    ],
    examples: [
      { input: 'chmod 755 deploy.sh', output: '', description: 'Make a script executable by everyone' },
      { input: 'chmod u+x,g-w file.txt', output: '', description: 'Add execute for owner, remove write for group' },
    ],
    practiceExercises: [
      { instruction: 'Make script.sh executable for the owner', expectedCommand: 'chmod u+x script.sh', hint: 'Use u+x to add execute permission for the user/owner' },
      { instruction: 'Set file permissions to read/write for owner only', expectedCommand: 'chmod 600 file.txt', hint: '6 = read(4) + write(2), 0 = no permissions' },
    ],
  },

  lesson_ch4_03: {
    id: 'lesson_ch4_03', chapterId: 'ch4', title: 'Ownership & Special Permissions', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['chown', 'chgrp'],
    content: [
      { type: 'heading', text: 'Changing Ownership (chown)' },
      { type: 'paragraph', text: 'chown changes who owns a file. You can change the owner, the group, or both at once. Typically requires root/sudo privileges.' },
      { type: 'code', command: 'chown user:group file.txt', output: '' },
      { type: 'code', command: 'chown -R www-data:www-data /var/www/', output: '' },
      { type: 'heading', text: 'Changing Group (chgrp)' },
      { type: 'paragraph', text: 'chgrp changes only the group ownership. Useful when you just need to share a file with a specific group.' },
      { type: 'heading', text: 'Special Permission Bits' },
      { type: 'table', headers: ['Bit', 'Numeric', 'Effect'], rows: [
        ['setuid', '4000', 'File runs as the file owner, not the user running it'],
        ['setgid', '2000', 'File runs as the group. On directories, new files inherit the group'],
        ['sticky', '1000', 'On directories, only the owner can delete their own files (e.g., /tmp)'],
      ]},
      { type: 'tip', text: 'The /tmp directory has the sticky bit set so users cannot delete each other\'s temporary files.' },
    ],
    examples: [
      { input: 'chown alice:devs project/', output: '', description: 'Change owner to alice, group to devs' },
      { input: 'chmod 1777 /tmp', output: '', description: 'Set sticky bit on a shared directory' },
    ],
    practiceExercises: [
      { instruction: 'Change the owner of file.txt to the user bob', expectedCommand: 'chown bob file.txt', hint: 'Use chown followed by the new owner and filename' },
      { instruction: 'Change the group of file.txt to developers', expectedCommand: 'chgrp developers file.txt', hint: 'Use chgrp followed by the group name and filename' },
    ],
  },

  // ═══════════════════════ CHAPTER 5: Text Processing ═══════════════════════
  lesson_ch5_01: {
    id: 'lesson_ch5_01', chapterId: 'ch5', title: 'Searching with grep', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['grep'],
    content: [
      { type: 'heading', text: 'What is grep?' },
      { type: 'paragraph', text: 'grep (Global Regular Expression Print) searches text for patterns and prints matching lines. It is one of the most frequently used UNIX commands.' },
      { type: 'code', command: 'grep "error" /var/log/syslog', output: 'Jan 1 12:00 error: disk full\nJan 1 13:00 error: connection timeout' },
      { type: 'heading', text: 'Common grep Flags' },
      { type: 'list', items: ['-i: case-insensitive search', '-r: search recursively through directories', '-n: show line numbers', '-v: invert match (show lines that do NOT match)', '-c: count matching lines', '-l: show only filenames that contain matches'] },
      { type: 'heading', text: 'Basic Regular Expressions' },
      { type: 'paragraph', text: 'grep supports regex patterns: ^ (start of line), $ (end of line), . (any character), * (zero or more of previous).' },
      { type: 'tip', text: 'Use grep -rn to search code effectively - it searches all files recursively and shows line numbers.' },
    ],
    examples: [
      { input: 'grep -rn "TODO" src/', output: 'src/app.js:15:// TODO: add validation\nsrc/utils.js:42:// TODO: refactor', description: 'Find all TODO comments in source code' },
      { input: 'grep -c "error" logfile.txt', output: '23', description: 'Count how many lines contain "error"' },
    ],
    practiceExercises: [
      { instruction: 'Search for the word "hello" in file.txt (case-insensitive)', expectedCommand: 'grep -i "hello" file.txt', hint: 'Use the -i flag for case-insensitive matching' },
      { instruction: 'Search recursively for "config" in the current directory', expectedCommand: 'grep -r "config" .', hint: 'Use -r for recursive search and . for current directory' },
    ],
  },

  lesson_ch5_02: {
    id: 'lesson_ch5_02', chapterId: 'ch5', title: 'Sorting & Counting', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['sort', 'uniq', 'wc', 'cut'],
    content: [
      { type: 'heading', text: 'Sorting with sort' },
      { type: 'paragraph', text: 'sort arranges lines alphabetically by default. Common flags: -n (numeric sort), -r (reverse), -k (sort by specific field), -u (unique - remove duplicates).' },
      { type: 'code', command: 'sort -n numbers.txt', output: '1\n5\n10\n42\n100' },
      { type: 'heading', text: 'Counting with wc' },
      { type: 'paragraph', text: 'wc (word count) counts lines, words, and characters. Use -l for lines only, -w for words only, -c for bytes.' },
      { type: 'code', command: 'wc -l /etc/passwd', output: '32 /etc/passwd' },
      { type: 'heading', text: 'Unique Lines with uniq' },
      { type: 'paragraph', text: 'uniq removes adjacent duplicate lines. Always sort first since uniq only removes consecutive duplicates. Use -c to count occurrences.' },
      { type: 'heading', text: 'Extracting Fields with cut' },
      { type: 'paragraph', text: 'cut extracts specific columns from text. Use -d for delimiter and -f for field numbers.' },
      { type: 'code', command: 'cut -d: -f1 /etc/passwd', output: 'root\ndaemon\nbin\nuser' },
    ],
    examples: [
      { input: 'sort names.txt | uniq -c | sort -rn', output: '   5 alice\n   3 bob\n   1 charlie', description: 'Count and sort name occurrences' },
      { input: 'wc -lwc file.txt', output: '  100   450  3200 file.txt', description: 'Count lines, words, and characters' },
    ],
    practiceExercises: [
      { instruction: 'Count the number of lines in a file', expectedCommand: 'wc -l file.txt', hint: 'Use wc with the -l flag for line count' },
      { instruction: 'Sort a file numerically in reverse order', expectedCommand: 'sort -rn numbers.txt', hint: 'Use -n for numeric and -r for reverse' },
    ],
  },

  lesson_ch5_03: {
    id: 'lesson_ch5_03', chapterId: 'ch5', title: 'Stream Editing (sed & awk)', order: 3,
    estimatedReadTime: '7 min', keyCommands: ['sed', 'awk', 'tr'],
    content: [
      { type: 'heading', text: 'sed - Stream Editor' },
      { type: 'paragraph', text: 'sed performs text transformations on an input stream. The most common use is search-and-replace with the s command.' },
      { type: 'code', command: 'sed \'s/old/new/g\' file.txt', output: '(file contents with old replaced by new)' },
      { type: 'paragraph', text: 'The g flag means global (replace all occurrences per line). Without g, only the first occurrence on each line is replaced.' },
      { type: 'heading', text: 'awk - Pattern Processing' },
      { type: 'paragraph', text: 'awk is a powerful text processing tool that works on fields (columns). By default it splits on whitespace. $1 is the first field, $2 the second, etc.' },
      { type: 'code', command: 'awk \'{print $1, $3}\' data.txt', output: 'alice 90\nbob 85\ncharlie 92' },
      { type: 'heading', text: 'tr - Translate Characters' },
      { type: 'paragraph', text: 'tr translates or deletes characters. Useful for case conversion and removing specific characters.' },
      { type: 'code', command: 'echo "HELLO" | tr A-Z a-z', output: 'hello' },
      { type: 'tip', text: 'sed -i edits files in-place (modifies the original file). Use sed -i.bak to create a backup first.' },
    ],
    examples: [
      { input: 'sed \'s/http/https/g\' urls.txt', output: 'https://example.com\nhttps://google.com', description: 'Replace http with https in all URLs' },
      { input: 'awk -F: \'{print $1}\' /etc/passwd', output: 'root\ndaemon\nuser', description: 'Print first field from colon-separated file' },
    ],
    practiceExercises: [
      { instruction: 'Replace all occurrences of "foo" with "bar" in file.txt', expectedCommand: 'sed \'s/foo/bar/g\' file.txt', hint: 'Use sed with s/pattern/replacement/g' },
      { instruction: 'Convert text to lowercase', expectedCommand: 'echo "TEXT" | tr A-Z a-z', hint: 'Use tr to translate uppercase to lowercase ranges' },
    ],
  },

  // ═══════════════════════ CHAPTER 6: Process Management ═══════════════════════
  lesson_ch6_01: {
    id: 'lesson_ch6_01', chapterId: 'ch6', title: 'Viewing Processes', order: 1,
    estimatedReadTime: '5 min', keyCommands: ['ps', 'top'],
    content: [
      { type: 'heading', text: 'What is a Process?' },
      { type: 'paragraph', text: 'A process is a running instance of a program. Every command you run creates a process with a unique Process ID (PID). The system kernel manages all processes.' },
      { type: 'heading', text: 'Listing Processes (ps)' },
      { type: 'code', command: 'ps aux', output: 'USER  PID %CPU %MEM   COMMAND\nroot    1  0.0  0.1   /sbin/init\nuser 1234  2.5  1.0   /usr/bin/node app.js\nuser 1235  0.0  0.0   bash' },
      { type: 'list', items: ['ps: show your own processes', 'ps aux: show all processes for all users', 'ps -ef: another format showing full command lines'] },
      { type: 'heading', text: 'Real-Time Monitoring (top)' },
      { type: 'paragraph', text: 'top shows a live-updating view of processes sorted by CPU usage. Press q to quit, k to kill a process, M to sort by memory.' },
      { type: 'tip', text: 'Use ps aux | grep processname to quickly find a specific running process.' },
    ],
    examples: [
      { input: 'ps aux | grep node', output: 'user 1234 2.5 1.0 node app.js', description: 'Find all Node.js processes' },
      { input: 'ps -ef --forest', output: 'UID  PID PPID CMD\n  0    1    0 init\n  0  100    1  \\_ sshd\n1000  200  100      \\_ bash', description: 'Show process tree hierarchy' },
    ],
    practiceExercises: [
      { instruction: 'List all running processes', expectedCommand: 'ps aux', hint: 'Use ps with aux flags to see all processes' },
      { instruction: 'Open the real-time process monitor', expectedCommand: 'top', hint: 'top shows live process information' },
    ],
  },

  lesson_ch6_02: {
    id: 'lesson_ch6_02', chapterId: 'ch6', title: 'Controlling Processes', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['kill', 'killall'],
    content: [
      { type: 'heading', text: 'Sending Signals with kill' },
      { type: 'paragraph', text: 'kill sends signals to processes. Despite its name, it does not always kill - it sends a specified signal that the process can handle.' },
      { type: 'heading', text: 'Common Signals' },
      { type: 'table', headers: ['Signal', 'Number', 'Effect'], rows: [
        ['SIGTERM', '15', 'Graceful termination (default)'],
        ['SIGKILL', '9', 'Force kill immediately (cannot be caught)'],
        ['SIGHUP', '1', 'Hangup - often used to reload config'],
        ['SIGSTOP', '19', 'Pause the process'],
        ['SIGCONT', '18', 'Resume a paused process'],
      ]},
      { type: 'code', command: 'kill 1234', output: '' },
      { type: 'code', command: 'kill -9 1234', output: '' },
      { type: 'warning', text: 'Always try kill (SIGTERM) first. Only use kill -9 (SIGKILL) as a last resort since it does not allow the process to clean up.' },
      { type: 'paragraph', text: 'killall kills all processes by name instead of PID, and pkill supports pattern matching.' },
    ],
    examples: [
      { input: 'kill -15 1234', output: '', description: 'Gracefully terminate process 1234' },
      { input: 'killall firefox', output: '', description: 'Kill all Firefox processes by name' },
    ],
    practiceExercises: [
      { instruction: 'Gracefully stop process with PID 5678', expectedCommand: 'kill 5678', hint: 'Use kill followed by the PID (default signal is SIGTERM)' },
      { instruction: 'Force kill a stuck process with PID 9999', expectedCommand: 'kill -9 9999', hint: 'Use -9 for SIGKILL (force kill)' },
    ],
  },

  lesson_ch6_03: {
    id: 'lesson_ch6_03', chapterId: 'ch6', title: 'Background & Foreground', order: 3,
    estimatedReadTime: '5 min', keyCommands: ['bg', 'fg', 'jobs'],
    content: [
      { type: 'heading', text: 'Running in Background' },
      { type: 'paragraph', text: 'Add & to the end of a command to run it in the background. This lets you continue using the terminal while the process runs.' },
      { type: 'code', command: 'long_running_task &', output: '[1] 1234' },
      { type: 'heading', text: 'Job Control' },
      { type: 'list', items: ['Ctrl+Z: pause (suspend) the current foreground process', 'bg: resume a paused process in the background', 'fg: bring a background process to the foreground', 'jobs: list all background and suspended jobs'] },
      { type: 'code', command: 'jobs', output: '[1]+  Running    long_running_task &\n[2]-  Stopped    vim file.txt' },
      { type: 'heading', text: 'Keeping Processes Alive' },
      { type: 'paragraph', text: 'nohup runs a command immune to hangups, so it continues even after you close the terminal. Use disown to detach an already-running job.' },
      { type: 'code', command: 'nohup ./server.sh &', output: 'nohup: appending output to nohup.out' },
      { type: 'tip', text: 'Use screen or tmux for persistent terminal sessions that survive disconnection. Better than nohup for interactive work.' },
    ],
    examples: [
      { input: 'sleep 100 &', output: '[1] 5678', description: 'Run sleep in background' },
      { input: 'fg %1', output: 'sleep 100', description: 'Bring job 1 to the foreground' },
    ],
    practiceExercises: [
      { instruction: 'Run a command in the background', expectedCommand: 'sleep 60 &', hint: 'Add & at the end to run in background' },
      { instruction: 'List current background jobs', expectedCommand: 'jobs', hint: 'The jobs command shows all background/suspended jobs' },
    ],
  },

  // ═══════════════════════ CHAPTER 7: Pipes & Redirection ═══════════════════════
  lesson_ch7_01: {
    id: 'lesson_ch7_01', chapterId: 'ch7', title: 'Standard Streams', order: 1,
    estimatedReadTime: '5 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'The Three Standard Streams' },
      { type: 'paragraph', text: 'Every UNIX process has three standard I/O streams that connect it to the outside world:' },
      { type: 'table', headers: ['Stream', 'File Descriptor', 'Default'], rows: [
        ['stdin (standard input)', '0', 'Keyboard'],
        ['stdout (standard output)', '1', 'Terminal screen'],
        ['stderr (standard error)', '2', 'Terminal screen'],
      ]},
      { type: 'heading', text: 'Why Three Streams?' },
      { type: 'paragraph', text: 'Separating output and error streams lets you handle them differently. You can save output to a file while still seeing errors on screen, or vice versa.' },
      { type: 'heading', text: 'How Data Flows' },
      { type: 'paragraph', text: 'Input flows into a program through stdin. Normal output comes out through stdout. Error messages come through stderr. This separation is fundamental to the pipe system.' },
      { type: 'tip', text: 'Programs that read from stdin and write to stdout are called "filters" and are designed to be chained together with pipes.' },
    ],
    examples: [
      { input: 'echo "hello" 1>/dev/null', output: '', description: 'Discard stdout (no visible output)' },
      { input: 'ls nonexistent 2>/dev/null', output: '', description: 'Discard error messages' },
    ],
    practiceExercises: [
      { instruction: 'Display the text "hello world" (uses stdout)', expectedCommand: 'echo "hello world"', hint: 'echo sends text to stdout' },
      { instruction: 'Try listing a nonexistent file to see stderr', expectedCommand: 'ls nonexistent_file', hint: 'ls will print an error to stderr for missing files' },
    ],
  },

  lesson_ch7_02: {
    id: 'lesson_ch7_02', chapterId: 'ch7', title: 'Redirection', order: 2,
    estimatedReadTime: '6 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'Output Redirection' },
      { type: 'paragraph', text: 'Redirect stdout to a file with > (overwrite) or >> (append). This is how you save command output.' },
      { type: 'code', command: 'echo "line 1" > output.txt', output: '' },
      { type: 'code', command: 'echo "line 2" >> output.txt', output: '' },
      { type: 'heading', text: 'Error Redirection' },
      { type: 'paragraph', text: 'Redirect stderr with 2>. Combine both stdout and stderr with &> or 2>&1.' },
      { type: 'code', command: 'command 2> errors.log', output: '' },
      { type: 'code', command: 'command > output.log 2>&1', output: '' },
      { type: 'heading', text: 'Input Redirection' },
      { type: 'paragraph', text: 'Redirect stdin from a file with <. The program reads from the file instead of waiting for keyboard input.' },
      { type: 'code', command: 'sort < unsorted.txt', output: 'alice\nbob\ncharlie' },
      { type: 'heading', text: 'The Null Device' },
      { type: 'paragraph', text: '/dev/null is a special file that discards everything written to it. Use it to silence output: command > /dev/null 2>&1' },
      { type: 'warning', text: 'Using > overwrites the file completely. Always use >> if you want to append to existing content.' },
    ],
    examples: [
      { input: 'ls /etc > filelist.txt 2> errors.txt', output: '', description: 'Save output and errors to separate files' },
      { input: 'cat < input.txt > output.txt', output: '', description: 'Read from one file, write to another' },
    ],
    practiceExercises: [
      { instruction: 'Save the output of ls to a file called listing.txt', expectedCommand: 'ls > listing.txt', hint: 'Use > to redirect stdout to a file' },
      { instruction: 'Append the current date to a log file', expectedCommand: 'date >> log.txt', hint: 'Use >> to append instead of overwrite' },
    ],
  },

  lesson_ch7_03: {
    id: 'lesson_ch7_03', chapterId: 'ch7', title: 'Pipes & Command Chaining', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['tee', 'xargs'],
    content: [
      { type: 'heading', text: 'The Pipe Operator (|)' },
      { type: 'paragraph', text: 'Pipes connect the stdout of one command to the stdin of the next. This lets you chain commands to build powerful data processing pipelines.' },
      { type: 'code', command: 'cat access.log | grep "404" | wc -l', output: '47' },
      { type: 'heading', text: 'The tee Command' },
      { type: 'paragraph', text: 'tee splits output to both a file AND stdout. Useful when you want to save output while also seeing it or passing it to another pipe.' },
      { type: 'code', command: 'ls | tee filelist.txt | wc -l', output: '12' },
      { type: 'heading', text: 'Command Chaining' },
      { type: 'table', headers: ['Operator', 'Behavior'], rows: [
        ['cmd1 && cmd2', 'Run cmd2 ONLY if cmd1 succeeds'],
        ['cmd1 || cmd2', 'Run cmd2 ONLY if cmd1 fails'],
        ['cmd1 ; cmd2', 'Run cmd2 regardless of cmd1 result'],
      ]},
      { type: 'heading', text: 'xargs - Build Commands from Input' },
      { type: 'paragraph', text: 'xargs reads items from stdin and passes them as arguments to another command.' },
      { type: 'code', command: 'find . -name "*.log" | xargs rm', output: '' },
      { type: 'tip', text: 'Complex pipelines are the essence of UNIX power. Start simple and add stages one at a time.' },
    ],
    examples: [
      { input: 'ps aux | sort -rk 3 | head -5', output: 'USER PID %CPU... (top 5 CPU-hungry processes)', description: 'Find top 5 processes by CPU usage' },
      { input: 'mkdir build && cd build && cmake ..', output: '', description: 'Chain commands that depend on each other' },
    ],
    practiceExercises: [
      { instruction: 'Count the number of files in the current directory using a pipe', expectedCommand: 'ls | wc -l', hint: 'Pipe ls output to wc -l to count lines' },
      { instruction: 'Find lines containing "error" and save to a file while displaying', expectedCommand: 'grep "error" log.txt | tee errors.txt', hint: 'Use tee to split output to file and screen' },
    ],
  },

  // ═══════════════════════ CHAPTER 8: Shell Scripting ═══════════════════════
  lesson_ch8_01: {
    id: 'lesson_ch8_01', chapterId: 'ch8', title: 'Variables & Environment', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['export', 'env'],
    content: [
      { type: 'heading', text: 'Shell Variables' },
      { type: 'paragraph', text: 'Variables store values. Assign with NAME=value (no spaces around =). Access with $NAME or ${NAME}.' },
      { type: 'code', command: 'NAME="Kingdom"', output: '' },
      { type: 'code', command: 'echo "Welcome to $NAME"', output: 'Welcome to Kingdom' },
      { type: 'heading', text: 'Environment Variables' },
      { type: 'paragraph', text: 'Environment variables are available to all child processes. Use export to make a variable available globally.' },
      { type: 'list', items: ['$PATH: directories to search for commands', '$HOME: your home directory', '$USER: current username', '$PWD: current working directory', '$SHELL: your default shell'] },
      { type: 'code', command: 'export PATH="$PATH:/usr/local/bin"', output: '' },
      { type: 'heading', text: 'Configuration Files' },
      { type: 'paragraph', text: '~/.bashrc runs for every new terminal. ~/.profile runs at login. Add export statements to these files to make variables permanent.' },
      { type: 'tip', text: 'Use env to see all current environment variables. Use printenv VAR to see a specific one.' },
    ],
    examples: [
      { input: 'echo $PATH', output: '/usr/local/bin:/usr/bin:/bin', description: 'View the command search path' },
      { input: 'env | grep HOME', output: 'HOME=/home/adventurer', description: 'Find your home directory variable' },
    ],
    practiceExercises: [
      { instruction: 'Create a variable called GREETING with value "Hello"', expectedCommand: 'GREETING="Hello"', hint: 'Use NAME=value syntax (no spaces around =)' },
      { instruction: 'Display the value of the PATH variable', expectedCommand: 'echo $PATH', hint: 'Use $ to access variable values' },
    ],
  },

  lesson_ch8_02: {
    id: 'lesson_ch8_02', chapterId: 'ch8', title: 'Control Flow', order: 2,
    estimatedReadTime: '7 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'If / Else' },
      { type: 'paragraph', text: 'The if statement tests conditions. Use [[ ]] for the test expression (preferred over the older [ ] syntax).' },
      { type: 'code', command: 'if [[ -f "config.txt" ]]; then\n  echo "Config found"\nelse\n  echo "Config missing"\nfi', output: 'Config found' },
      { type: 'heading', text: 'Common Test Operators' },
      { type: 'table', headers: ['Test', 'Meaning'], rows: [
        ['-f file', 'File exists and is a regular file'],
        ['-d dir', 'Directory exists'],
        ['-z "$var"', 'Variable is empty'],
        ['-n "$var"', 'Variable is not empty'],
        ['$a -eq $b', 'Numbers are equal'],
        ['$a == $b', 'Strings are equal'],
      ]},
      { type: 'heading', text: 'For Loops' },
      { type: 'code', command: 'for file in *.txt; do\n  echo "Processing $file"\ndone', output: 'Processing notes.txt\nProcessing readme.txt' },
      { type: 'heading', text: 'While Loops' },
      { type: 'code', command: 'count=1\nwhile [[ $count -le 5 ]]; do\n  echo "Count: $count"\n  ((count++))\ndone', output: 'Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5' },
      { type: 'tip', text: 'Use "set -e" at the top of scripts to exit on any error. This prevents scripts from continuing after a failure.' },
    ],
    examples: [
      { input: 'for i in 1 2 3; do echo $i; done', output: '1\n2\n3', description: 'Simple loop through a list' },
      { input: '[[ -d /tmp ]] && echo "exists"', output: 'exists', description: 'Quick one-liner conditional test' },
    ],
    practiceExercises: [
      { instruction: 'Check if a file called test.txt exists', expectedCommand: '[[ -f test.txt ]] && echo "exists"', hint: 'Use [[ -f filename ]] to test for file existence' },
      { instruction: 'Loop through numbers 1 to 3', expectedCommand: 'for i in 1 2 3; do echo $i; done', hint: 'Use a for loop with a list of values' },
    ],
  },

  lesson_ch8_03: {
    id: 'lesson_ch8_03', chapterId: 'ch8', title: 'Functions & Arguments', order: 3,
    estimatedReadTime: '6 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'Script Arguments' },
      { type: 'paragraph', text: 'Scripts receive arguments through special variables:' },
      { type: 'table', headers: ['Variable', 'Meaning'], rows: [
        ['$0', 'Script name'],
        ['$1, $2, ...', 'First, second, ... argument'],
        ['$@', 'All arguments as separate words'],
        ['$#', 'Number of arguments'],
        ['$?', 'Exit code of the last command'],
      ]},
      { type: 'heading', text: 'Defining Functions' },
      { type: 'code', command: 'greet() {\n  echo "Hello, $1! Welcome to $2."\n}\ngreet "Adventurer" "Kingdom"', output: 'Hello, Adventurer! Welcome to Kingdom.' },
      { type: 'heading', text: 'Exit Codes' },
      { type: 'paragraph', text: 'Every command returns an exit code: 0 means success, anything else means failure. Use $? to check the last exit code. Use exit N in scripts to return a specific code.' },
      { type: 'code', command: 'ls /nonexistent\necho $?', output: 'ls: cannot access /nonexistent\n2' },
      { type: 'tip', text: 'Always check exit codes in scripts. Use "set -e" to automatically exit on errors, or check $? after critical commands.' },
    ],
    examples: [
      { input: 'echo $?', output: '0', description: 'Check if the last command succeeded (0 = success)' },
      { input: 'add() { echo $(($1 + $2)); }; add 5 3', output: '8', description: 'Define and call a simple function' },
    ],
    practiceExercises: [
      { instruction: 'Check the exit code of the last command', expectedCommand: 'echo $?', hint: '$? holds the exit code of the previously executed command' },
      { instruction: 'Print the number of arguments passed to the current shell', expectedCommand: 'echo $#', hint: '$# contains the count of positional parameters' },
    ],
  },

  // ═══════════════════════ CHAPTER 9: Networking ═══════════════════════
  lesson_ch9_01: {
    id: 'lesson_ch9_01', chapterId: 'ch9', title: 'Network Basics', order: 1,
    estimatedReadTime: '5 min', keyCommands: ['ping', 'hostname', 'ip'],
    content: [
      { type: 'heading', text: 'Checking Connectivity (ping)' },
      { type: 'paragraph', text: 'ping sends ICMP packets to test if a host is reachable and measures round-trip time. Use Ctrl+C to stop.' },
      { type: 'code', command: 'ping -c 3 google.com', output: '64 bytes from google.com: time=12.3 ms\n64 bytes from google.com: time=11.8 ms\n64 bytes from google.com: time=12.1 ms' },
      { type: 'heading', text: 'Your Network Identity' },
      { type: 'code', command: 'hostname', output: 'kingdom-server' },
      { type: 'code', command: 'ip addr show', output: 'inet 192.168.1.100/24 ...' },
      { type: 'heading', text: 'DNS Lookup' },
      { type: 'paragraph', text: 'DNS translates domain names to IP addresses. Use nslookup or dig to query DNS.' },
      { type: 'code', command: 'nslookup google.com', output: 'Name: google.com\nAddress: 142.250.80.46' },
      { type: 'heading', text: 'Tracing Routes' },
      { type: 'paragraph', text: 'traceroute shows the path packets take to reach a destination, listing each hop along the way.' },
      { type: 'tip', text: 'Use ping -c N to send exactly N packets instead of pinging indefinitely.' },
    ],
    examples: [
      { input: 'ping -c 1 localhost', output: '64 bytes from 127.0.0.1: time=0.03 ms', description: 'Ping yourself (localhost = 127.0.0.1)' },
      { input: 'hostname -I', output: '192.168.1.100', description: 'Show your IP address' },
    ],
    practiceExercises: [
      { instruction: 'Ping localhost once to test networking', expectedCommand: 'ping -c 1 localhost', hint: 'Use ping -c 1 to send exactly one packet' },
      { instruction: 'Display your hostname', expectedCommand: 'hostname', hint: 'The hostname command shows the system name' },
    ],
  },

  lesson_ch9_02: {
    id: 'lesson_ch9_02', chapterId: 'ch9', title: 'Downloading & Transferring', order: 2,
    estimatedReadTime: '6 min', keyCommands: ['curl', 'wget', 'scp'],
    content: [
      { type: 'heading', text: 'curl - Transfer Data' },
      { type: 'paragraph', text: 'curl transfers data to/from URLs. It supports HTTP, HTTPS, FTP, and many other protocols. It is the Swiss Army knife of network tools.' },
      { type: 'code', command: 'curl -O https://example.com/file.zip', output: '% Total    % Received  Speed\n100 1024k  100 1024k   500k  0:00:02' },
      { type: 'heading', text: 'wget - Download Files' },
      { type: 'paragraph', text: 'wget is designed for downloading files. It supports recursive downloads, resuming interrupted downloads, and mirroring sites.' },
      { type: 'code', command: 'wget https://example.com/data.csv', output: 'Saving to: data.csv\ndata.csv    100%[========>] 1.02M  500KB/s' },
      { type: 'heading', text: 'scp - Secure Copy' },
      { type: 'paragraph', text: 'scp copies files between machines over SSH. The syntax is like cp but with remote host prefixes.' },
      { type: 'code', command: 'scp file.txt user@server:/home/user/', output: 'file.txt     100%  1024   500.0KB/s  00:00' },
      { type: 'heading', text: 'rsync - Smart Sync' },
      { type: 'paragraph', text: 'rsync synchronizes files efficiently by only transferring differences. Great for backups and deployments.' },
      { type: 'tip', text: 'curl -I fetches only the HTTP headers. Useful for checking if a URL is valid without downloading the full content.' },
    ],
    examples: [
      { input: 'curl -I https://example.com', output: 'HTTP/2 200\ncontent-type: text/html\ncontent-length: 1256', description: 'Check HTTP headers of a URL' },
      { input: 'wget -c https://example.com/large-file.zip', output: 'Continuing at byte position 512000...', description: 'Resume an interrupted download' },
    ],
    practiceExercises: [
      { instruction: 'Download a file from a URL using wget', expectedCommand: 'wget https://example.com/file.txt', hint: 'Use wget followed by the URL' },
      { instruction: 'Check the HTTP headers of a website', expectedCommand: 'curl -I https://example.com', hint: 'Use curl with the -I flag for headers only' },
    ],
  },

  lesson_ch9_03: {
    id: 'lesson_ch9_03', chapterId: 'ch9', title: 'Remote Access (SSH)', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['ssh'],
    content: [
      { type: 'heading', text: 'What is SSH?' },
      { type: 'paragraph', text: 'SSH (Secure Shell) provides encrypted remote access to other machines. It replaces older insecure protocols like telnet and rlogin.' },
      { type: 'code', command: 'ssh user@hostname', output: 'user@hostname:~$' },
      { type: 'heading', text: 'SSH Key Authentication' },
      { type: 'paragraph', text: 'Password authentication is convenient but keys are more secure. Generate a key pair with ssh-keygen and copy the public key to the server.' },
      { type: 'code', command: 'ssh-keygen -t ed25519', output: 'Generating public/private ed25519 key pair.\nYour identification has been saved in ~/.ssh/id_ed25519' },
      { type: 'code', command: 'ssh-copy-id user@server', output: 'Number of key(s) added: 1' },
      { type: 'heading', text: 'SSH Config File' },
      { type: 'paragraph', text: 'Create ~/.ssh/config to save connection settings. Then connect with just ssh myserver instead of typing the full command.' },
      { type: 'tip', text: 'Always use SSH key authentication in production. Disable password authentication on servers for better security.' },
      { type: 'warning', text: 'Never share your private key (~/.ssh/id_ed25519). Only share the public key (.pub file).' },
    ],
    examples: [
      { input: 'ssh -p 2222 admin@192.168.1.50', output: 'admin@server:~$', description: 'Connect to SSH on a non-default port' },
      { input: 'ssh user@server "ls /var/log"', output: 'syslog\nauth.log\ndpkg.log', description: 'Run a remote command without interactive shell' },
    ],
    practiceExercises: [
      { instruction: 'Generate a new SSH key pair', expectedCommand: 'ssh-keygen', hint: 'ssh-keygen generates a public/private key pair' },
      { instruction: 'Connect to a remote server at 10.0.0.1 as admin', expectedCommand: 'ssh admin@10.0.0.1', hint: 'Use ssh user@hostname format' },
    ],
  },

  // ═══════════════════════ CHAPTER 10: System Administration ═══════════════════════
  lesson_ch10_01: {
    id: 'lesson_ch10_01', chapterId: 'ch10', title: 'User Management', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['sudo', 'useradd', 'passwd'],
    content: [
      { type: 'heading', text: 'The Root User & sudo' },
      { type: 'paragraph', text: 'Root (UID 0) is the superuser with unlimited access. Never log in as root directly. Instead, use sudo to run individual commands with root privileges.' },
      { type: 'code', command: 'sudo apt update', output: 'Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease\nReading package lists... Done' },
      { type: 'heading', text: 'Managing Users' },
      { type: 'list', items: ['useradd: create a new user', 'userdel: delete a user', 'usermod: modify user properties', 'passwd: change password', 'groups: show group memberships'] },
      { type: 'code', command: 'sudo useradd -m -s /bin/bash newuser', output: '' },
      { type: 'code', command: 'sudo passwd newuser', output: 'New password:\nRetype new password:\npasswd: password updated' },
      { type: 'heading', text: 'User Information Files' },
      { type: 'paragraph', text: '/etc/passwd contains user accounts, /etc/shadow contains hashed passwords, and /etc/group contains group definitions.' },
      { type: 'warning', text: 'Be very careful with sudo. Double-check every command before running it as root, especially rm commands.' },
    ],
    examples: [
      { input: 'id', output: 'uid=1000(user) gid=1000(user) groups=1000(user),27(sudo)', description: 'Show your user and group IDs' },
      { input: 'sudo usermod -aG docker user', output: '', description: 'Add a user to the docker group' },
    ],
    practiceExercises: [
      { instruction: 'Display your user ID and group memberships', expectedCommand: 'id', hint: 'The id command shows your UID, GID, and groups' },
      { instruction: 'List all groups you belong to', expectedCommand: 'groups', hint: 'The groups command shows your group memberships' },
    ],
  },

  lesson_ch10_02: {
    id: 'lesson_ch10_02', chapterId: 'ch10', title: 'Package Management', order: 2,
    estimatedReadTime: '5 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'What is a Package Manager?' },
      { type: 'paragraph', text: 'Package managers install, update, and remove software. They handle dependencies automatically. Different distributions use different managers.' },
      { type: 'heading', text: 'Common Package Managers' },
      { type: 'table', headers: ['Distro', 'Manager', 'Install Example'], rows: [
        ['Ubuntu/Debian', 'apt', 'sudo apt install nginx'],
        ['Fedora/RHEL', 'dnf/yum', 'sudo dnf install nginx'],
        ['Arch', 'pacman', 'sudo pacman -S nginx'],
        ['Alpine', 'apk', 'sudo apk add nginx'],
      ]},
      { type: 'heading', text: 'Basic apt Operations' },
      { type: 'list', items: ['sudo apt update: refresh package lists', 'sudo apt upgrade: upgrade installed packages', 'sudo apt install pkgname: install a package', 'sudo apt remove pkgname: uninstall a package', 'apt search keyword: search for packages'] },
      { type: 'tip', text: 'Always run apt update before apt install to ensure you get the latest version of a package.' },
    ],
    examples: [
      { input: 'apt search editor', output: 'vim - Vi IMproved\nnano - small friendly text editor\nemacs - GNU Emacs editor', description: 'Search for available packages' },
      { input: 'sudo apt install -y htop', output: 'Setting up htop (3.2.1) ...\nProcessing triggers...', description: 'Install htop without confirmation prompt' },
    ],
    practiceExercises: [
      { instruction: 'Update the package list', expectedCommand: 'sudo apt update', hint: 'Use sudo apt update to refresh package lists' },
      { instruction: 'Search for packages related to "git"', expectedCommand: 'apt search git', hint: 'Use apt search followed by a keyword' },
    ],
  },

  lesson_ch10_03: {
    id: 'lesson_ch10_03', chapterId: 'ch10', title: 'System Monitoring', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['df', 'du', 'free', 'uptime'],
    content: [
      { type: 'heading', text: 'Disk Usage' },
      { type: 'paragraph', text: 'df shows filesystem disk space usage. du shows directory space usage. Both support -h for human-readable sizes.' },
      { type: 'code', command: 'df -h', output: 'Filesystem  Size  Used Avail Use%\n/dev/sda1    50G   30G   18G  63%\n/dev/sda2   200G  120G   72G  63%' },
      { type: 'code', command: 'du -sh /var/log', output: '1.2G\t/var/log' },
      { type: 'heading', text: 'Memory Usage' },
      { type: 'code', command: 'free -h', output: '              total   used   free   available\nMem:           16G    8.5G   3.2G   7.1G\nSwap:          4G     0.5G   3.5G' },
      { type: 'heading', text: 'System Uptime & Load' },
      { type: 'code', command: 'uptime', output: ' 14:30:00 up 45 days, 3:12,  2 users,  load average: 0.15, 0.10, 0.05' },
      { type: 'paragraph', text: 'Load average shows system load over 1, 5, and 15 minutes. Values above your CPU count indicate the system is overloaded.' },
      { type: 'heading', text: 'Scheduled Tasks (cron)' },
      { type: 'paragraph', text: 'crontab schedules recurring tasks. Edit with crontab -e. Format: minute hour day month weekday command.' },
      { type: 'code', command: 'crontab -l', output: '0 2 * * * /usr/local/bin/backup.sh\n*/5 * * * * /usr/bin/check-health.sh' },
      { type: 'tip', text: 'Use du -sh * | sort -rh | head -10 to find the 10 largest files/directories in a location.' },
    ],
    examples: [
      { input: 'df -h /', output: 'Filesystem  Size  Used Avail Use%\n/dev/sda1    50G   30G   18G  63%', description: 'Check root filesystem space' },
      { input: 'free -h', output: 'Mem:  16G  8.5G  3.2G\nSwap: 4G   0.5G  3.5G', description: 'Check memory and swap usage' },
    ],
    practiceExercises: [
      { instruction: 'Check disk space usage in human-readable format', expectedCommand: 'df -h', hint: 'Use df -h for human-readable disk usage' },
      { instruction: 'Check how long the system has been running', expectedCommand: 'uptime', hint: 'uptime shows system uptime and load averages' },
    ],
  },
};

// ──────────────────────── HELPER FUNCTIONS ────────────────────────

export function getAllLessons() {
  const chapterOrder = {};
  CHAPTERS.forEach(ch => { chapterOrder[ch.id] = ch.order; });

  return Object.values(LESSONS).sort((a, b) => {
    const chapterDiff = (chapterOrder[a.chapterId] || 0) - (chapterOrder[b.chapterId] || 0);
    if (chapterDiff !== 0) return chapterDiff;
    return a.order - b.order;
  });
}

export function getLessonsByChapter(chapterId) {
  return Object.values(LESSONS)
    .filter(l => l.chapterId === chapterId)
    .sort((a, b) => a.order - b.order);
}

export function getChapterProgress(chapterId, completedLessonIds = []) {
  const chapterLessons = getLessonsByChapter(chapterId);
  const completed = chapterLessons.filter(l => completedLessonIds.includes(l.id)).length;
  const total = chapterLessons.length;
  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}
