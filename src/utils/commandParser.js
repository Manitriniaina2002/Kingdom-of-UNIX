/**
 * Command Parser - Sandboxed UNIX command interpreter
 * Parses and executes commands in the virtual filesystem
 */

import { getCommand } from '../data/commands';
import {
  resolvePath,
  pathExists,
  isDirectory,
  isFile,
  getFileContent,
  getDirectoryContents,
  addDirectory,
  removePath,
  updatePermissions,
  buildTree,
} from './virtualFilesystem';

/**
 * Parse a command string into command and arguments
 */
export const parseCommand = (input) => {
  const trimmed = input.trim();
  const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  
  // Remove quotes from arguments
  const cleanParts = parts.map(part => part.replace(/^"(.*)"$/, '$1'));
  
  const command = cleanParts[0]?.toLowerCase() || '';
  const args = cleanParts.slice(1);
  const flags = args.filter(arg => arg.startsWith('-'));
  const positionalArgs = args.filter(arg => !arg.startsWith('-'));
  
  return {
    raw: input,
    command,
    args,
    flags,
    positionalArgs,
    hasFlag: (flag) => flags.includes(flag) || flags.some(f => f.includes(flag.replace('-', ''))),
  };
};

/**
 * Execute a parsed command
 */
export const executeCommand = (parsed, filesystem, currentPath) => {
  const { command, args, flags, positionalArgs, hasFlag } = parsed;
  
  // Default result structure
  const result = {
    success: false,
    output: '',
    newPath: null,
    newFilesystem: null,
    clear: false,
    commandType: command,
  };

  // Handle empty command
  if (!command) {
    return { ...result, success: true };
  }

  // Execute based on command
  switch (command) {
    case 'pwd':
      return executePwd(currentPath);
    
    case 'ls':
      return executeLs(filesystem, currentPath, args, hasFlag);
    
    case 'cd':
      return executeCd(filesystem, currentPath, positionalArgs);
    
    case 'cat':
      return executeCat(filesystem, currentPath, positionalArgs);
    
    case 'tree':
      return executeTree(filesystem, currentPath, positionalArgs);
    
    case 'mkdir':
      return executeMkdir(filesystem, currentPath, positionalArgs, hasFlag);
    
    case 'rm':
      return executeRm(filesystem, currentPath, positionalArgs, hasFlag);
    
    case 'chmod':
      return executeChmod(filesystem, currentPath, args);
    
    case 'chown':
      return executeChown(filesystem, currentPath, args);
    
    case 'whoami':
      return executeWhoami();
    
    case 'echo':
      return executeEcho(args);
    
    case 'clear':
      return { ...result, success: true, clear: true };
    
    case 'help':
      return executeHelp(positionalArgs);
    
    case 'ps':
      return executePs(hasFlag);
    
    case 'top':
      return executeTop();
    
    case 'kill':
      return executeKill(args);
    
    case 'grep':
      return executeGrep(args, filesystem, currentPath);
    
    case 'man':
      return executeMan(positionalArgs);
    
    case 'touch':
      return executeTouch(filesystem, currentPath, positionalArgs);
    
    case 'stat':
      return executeStat(filesystem, currentPath, positionalArgs);
    
    default:
      return executeUnknown(command);
  }
};

// ============ COMMAND IMPLEMENTATIONS ============

function executePwd(currentPath) {
  return {
    success: true,
    output: currentPath,
    newPath: null,
    newFilesystem: null,
  };
}

function executeLs(filesystem, currentPath, args, hasFlag) {
  // Determine target path
  const targetPath = args.find(a => !a.startsWith('-')) 
    ? resolvePath(currentPath, args.find(a => !a.startsWith('-')))
    : currentPath;
  
  if (!pathExists(filesystem, targetPath)) {
    return {
      success: false,
      output: `ls: cannot access '${targetPath}': No such file or directory`,
    };
  }
  
  if (!isDirectory(filesystem, targetPath)) {
    // It's a file, show just the filename
    const node = filesystem[targetPath];
    if (hasFlag('-l')) {
      return {
        success: true,
        output: formatLsLong([{ name: targetPath.split('/').pop(), ...node }]),
      };
    }
    return {
      success: true,
      output: targetPath.split('/').pop(),
    };
  }
  
  const contents = getDirectoryContents(filesystem, targetPath);
  
  if (contents.length === 0) {
    return { success: true, output: '' };
  }
  
  // Include hidden files with -a
  let items = hasFlag('-a') 
    ? ['.', '..', ...contents]
    : contents.filter(name => !name.startsWith('.'));
  
  // Long format with -l
  if (hasFlag('-l')) {
    const detailed = items.map(name => {
      if (name === '.') return { name: '.', ...filesystem[targetPath] };
      if (name === '..') {
        const parentPath = targetPath === '/' ? '/' : targetPath.substring(0, targetPath.lastIndexOf('/')) || '/';
        return { name: '..', ...filesystem[parentPath] };
      }
      const itemPath = targetPath === '/' ? `/${name}` : `${targetPath}/${name}`;
      return { name, ...filesystem[itemPath] };
    });
    return {
      success: true,
      output: formatLsLong(detailed),
    };
  }
  
  // Regular format - colorize directories
  const formatted = items.map(name => {
    if (name === '.' || name === '..') return name + '/';
    const itemPath = targetPath === '/' ? `/${name}` : `${targetPath}/${name}`;
    const node = filesystem[itemPath];
    return node?.type === 'directory' ? `[DIR] ${name}/` : `[FILE] ${name}`;
  });
  
  return {
    success: true,
    output: formatted.join('  '),
  };
}

function formatLsLong(items) {
  const lines = items.map(item => {
    const permissions = item.permissions || '-rw-r--r--';
    const owner = (item.owner || 'adventurer').padEnd(10);
    const group = (item.group || 'adventurer').padEnd(10);
    const size = String(item.size || (item.type === 'directory' ? 4096 : 0)).padStart(6);
    const date = 'Feb  4 12:00';
    const name = item.type === 'directory' && !item.name.endsWith('/') 
      ? item.name + '/' 
      : item.name;
    return `${permissions}  ${owner} ${group} ${size} ${date} ${name}`;
  });
  return lines.join('\n');
}

function executeCd(filesystem, currentPath, positionalArgs) {
  const target = positionalArgs[0] || '~';
  const newPath = resolvePath(currentPath, target);
  
  if (!pathExists(filesystem, newPath)) {
    return {
      success: false,
      output: `cd: ${target}: No such file or directory`,
    };
  }
  
  if (!isDirectory(filesystem, newPath)) {
    return {
      success: false,
      output: `cd: ${target}: Not a directory`,
    };
  }
  
  return {
    success: true,
    output: '',
    newPath: newPath,
  };
}

function executeCat(filesystem, currentPath, positionalArgs) {
  if (positionalArgs.length === 0) {
    return {
      success: false,
      output: 'cat: missing file operand\nTry: cat <filename>',
    };
  }
  
  const outputs = [];
  for (const arg of positionalArgs) {
    const targetPath = resolvePath(currentPath, arg);
    
    if (!pathExists(filesystem, targetPath)) {
      outputs.push(`cat: ${arg}: No such file or directory`);
      continue;
    }
    
    if (isDirectory(filesystem, targetPath)) {
      outputs.push(`cat: ${arg}: Is a directory`);
      continue;
    }
    
    const content = getFileContent(filesystem, targetPath);
    outputs.push(content);
  }
  
  return {
    success: true,
    output: outputs.join('\n'),
  };
}

function executeTree(filesystem, currentPath, positionalArgs) {
  const targetPath = positionalArgs[0] 
    ? resolvePath(currentPath, positionalArgs[0])
    : currentPath;
  
  if (!pathExists(filesystem, targetPath)) {
    return {
      success: false,
      output: `tree: ${positionalArgs[0] || '.'}: No such file or directory`,
    };
  }
  
  const tree = buildTree(filesystem, targetPath);
  return {
    success: true,
    output: tree,
  };
}

function executeMkdir(filesystem, currentPath, positionalArgs, hasFlag) {
  if (positionalArgs.length === 0) {
    return {
      success: false,
      output: 'mkdir: missing operand\nTry: mkdir <directory>',
    };
  }
  
  let newFs = { ...filesystem };
  const results = [];
  
  for (const arg of positionalArgs) {
    if (hasFlag('-p')) {
      // Create parent directories
      const parts = arg.split('/').filter(Boolean);
      let buildPath = currentPath;
      
      for (const part of parts) {
        const checkPath = buildPath === '/' ? `/${part}` : `${buildPath}/${part}`;
        if (!pathExists(newFs, checkPath)) {
          newFs = addDirectory(newFs, buildPath, part);
          if (!newFs) {
            results.push(`mkdir: cannot create directory '${arg}'`);
            break;
          }
        }
        buildPath = checkPath;
      }
    } else {
      const parentPath = currentPath;
      const name = arg.split('/').pop();
      const targetPath = parentPath === '/' ? `/${name}` : `${parentPath}/${name}`;
      
      if (pathExists(newFs, targetPath)) {
        results.push(`mkdir: cannot create directory '${arg}': File exists`);
        continue;
      }
      
      newFs = addDirectory(newFs, parentPath, name);
      if (!newFs) {
        results.push(`mkdir: cannot create directory '${arg}'`);
      }
    }
  }
  
  return {
    success: results.length === 0,
    output: results.join('\n') || `Created directory${positionalArgs.length > 1 ? 'ies' : ''}!`,
    newFilesystem: newFs,
  };
}

function executeRm(filesystem, currentPath, positionalArgs, hasFlag) {
  if (positionalArgs.length === 0) {
    return {
      success: false,
      output: 'rm: missing operand\nTry: rm <file> or rm -r <directory>',
    };
  }
  
  let newFs = { ...filesystem };
  const results = [];
  const recursive = hasFlag('-r') || hasFlag('-rf') || hasFlag('-fr');
  
  for (const arg of positionalArgs) {
    const targetPath = resolvePath(currentPath, arg);
    
    if (!pathExists(newFs, targetPath)) {
      results.push(`rm: cannot remove '${arg}': No such file or directory`);
      continue;
    }
    
    if (isDirectory(newFs, targetPath) && !recursive) {
      results.push(`rm: cannot remove '${arg}': Is a directory (use -r)`);
      continue;
    }
    
    const removed = removePath(newFs, targetPath, recursive);
    if (removed) {
      newFs = removed;
    } else {
      results.push(`rm: cannot remove '${arg}'`);
    }
  }
  
  return {
    success: results.length === 0,
    output: results.join('\n') || 'Removed successfully!',
    newFilesystem: newFs,
  };
}

function executeChmod(filesystem, currentPath, args) {
  if (args.length < 2) {
    return {
      success: false,
      output: 'chmod: missing operand\nTry: chmod <mode> <file>\nExample: chmod +x script.sh or chmod 755 file',
    };
  }
  
  const mode = args[0];
  const targetArg = args[1];
  const targetPath = resolvePath(currentPath, targetArg);
  
  if (!pathExists(filesystem, targetPath)) {
    return {
      success: false,
      output: `chmod: cannot access '${targetArg}': No such file or directory`,
    };
  }
  
  const node = filesystem[targetPath];
  let newPermissions = node.permissions;
  
  // Handle symbolic mode (+x, -w, etc.)
  if (mode.match(/^[+-][rwx]+$/)) {
    const isAdd = mode[0] === '+';
    const perms = mode.slice(1);
    
    // Simplified - just update the string representation
    if (isAdd && perms.includes('x')) {
      newPermissions = newPermissions.slice(0, 3) + 'x' + newPermissions.slice(4);
    }
    if (!isAdd && perms.includes('w')) {
      newPermissions = newPermissions.slice(0, 2) + '-' + newPermissions.slice(3);
    }
  }
  
  // Handle numeric mode (755, 644, etc.)
  if (mode.match(/^[0-7]{3}$/)) {
    const prefix = node.type === 'directory' ? 'd' : '-';
    const owner = parseNumericPermission(parseInt(mode[0]));
    const group = parseNumericPermission(parseInt(mode[1]));
    const others = parseNumericPermission(parseInt(mode[2]));
    newPermissions = prefix + owner + group + others;
  }
  
  const newFs = updatePermissions(filesystem, targetPath, newPermissions);
  
  return {
    success: true,
    output: `Permissions updated: ${newPermissions}`,
    newFilesystem: newFs,
  };
}

function parseNumericPermission(num) {
  const r = num & 4 ? 'r' : '-';
  const w = num & 2 ? 'w' : '-';
  const x = num & 1 ? 'x' : '-';
  return r + w + x;
}

function executeChown(filesystem, currentPath, args) {
  if (args.length < 2) {
    return {
      success: false,
      output: 'chown: missing operand\nTry: chown <owner>[:<group>] <file>',
    };
  }
  
  // Simulate chown - in real UNIX this requires root
  return {
    success: true,
    output: 'Ownership change simulated! (Note: In real UNIX, this requires administrator privileges)',
  };
}

function executeWhoami() {
  return {
    success: true,
    output: 'adventurer',
  };
}

function executeEcho(args) {
  // Handle variable expansion
  const output = args.map(arg => {
    if (arg.startsWith('$')) {
      const varName = arg.slice(1);
      const envVars = {
        HOME: '/home/adventurer',
        USER: 'adventurer',
        PATH: '/usr/bin:/bin',
        PWD: '/home/adventurer',
      };
      return envVars[varName] || '';
    }
    return arg;
  }).join(' ');
  
  return {
    success: true,
    output: output,
  };
}

function executeHelp(positionalArgs) {
  if (positionalArgs.length > 0) {
    const cmdName = positionalArgs[0].toLowerCase();
    const cmdInfo = getCommand(cmdName);
    
    if (cmdInfo) {
      let output = `${cmdInfo.name} - ${cmdInfo.fullName}\n\n`;
      output += `${cmdInfo.description}\n\n`;
      output += `Usage: ${cmdInfo.syntax}\n\n`;
      output += `${cmdInfo.funExplanation}\n`;
      
      if (cmdInfo.options) {
        output += '\nOptions:\n';
        Object.entries(cmdInfo.options).forEach(([opt, desc]) => {
          output += `  ${opt.padEnd(8)} ${desc}\n`;
        });
      }
      
      if (cmdInfo.examples) {
        output += '\nExamples:\n';
        cmdInfo.examples.forEach(ex => {
          output += `  $ ${ex}\n`;
        });
      }
      
      if (cmdInfo.warning) {
        output += `\n${cmdInfo.warning}\n`;
      }
      
      return { success: true, output };
    }
    
    return {
      success: false,
      output: `help: no help found for '${cmdName}'`,
    };
  }
  
  const output = `Kingdom of UNIX - Command Help

[NAV] Navigation:
  pwd        Show current directory
  ls         List files and directories
  cd         Change directory
  tree       Show directory tree

[FILES] Files:
  cat        Display file contents
  mkdir      Create directory
  rm         Remove files/directories
  touch      Create empty file

[LOCK] Permissions:
  chmod      Change file permissions
  chown      Change file owner
  stat       Show file details

[PROC] Processes:
  ps         Show running processes
  top        Live process viewer
  kill       Stop a process

[TOOLS] Utilities:
  echo       Print text
  whoami     Show current user
  clear      Clear terminal
  help       Show this help

[TIP] Tip: Type "help <command>" for detailed info!
Example: help ls`;

  return { success: true, output };
}

function executePs(hasFlag) {
  // Simulated process list
  const processes = [
    { pid: 1, user: 'root', cpu: '0.0', mem: '0.1', command: '/sbin/init' },
    { pid: 42, user: 'adventurer', cpu: '0.5', mem: '2.1', command: '/bin/bash' },
    { pid: 123, user: 'adventurer', cpu: '1.2', mem: '3.5', command: 'kingdom_game' },
    { pid: 456, user: 'system', cpu: '0.1', mem: '0.5', command: 'quest_manager' },
    { pid: 789, user: 'adventurer', cpu: '0.3', mem: '1.0', command: 'terminal_sim' },
  ];
  
  if (hasFlag('aux') || hasFlag('-ef')) {
    let output = 'USER         PID  %CPU  %MEM  COMMAND\n';
    processes.forEach(p => {
      output += `${p.user.padEnd(12)} ${String(p.pid).padStart(4)}  ${p.cpu.padStart(4)}  ${p.mem.padStart(4)}  ${p.command}\n`;
    });
    return { success: true, output };
  }
  
  let output = '  PID  COMMAND\n';
  processes.filter(p => p.user === 'adventurer').forEach(p => {
    output += `${String(p.pid).padStart(5)}  ${p.command}\n`;
  });
  return { success: true, output };
}

function executeTop() {
  const output = `Process Monitor (Simulated)

Tasks:  5 total,   1 running,   4 sleeping
Memory: 4096 MB total, 2048 MB free
Uptime: 1 day, 3 hours, 42 minutes

  PID USER      %CPU %MEM    COMMAND
  123 adventur   1.2  3.5    kingdom_game
   42 adventur   0.5  2.1    bash
  789 adventur   0.3  1.0    terminal_sim
  456 system     0.1  0.5    quest_manager
    1 root       0.0  0.1    init

[TIP] In real UNIX, press 'q' to quit top
(This is a simulation - command completed)`;

  return { success: true, output };
}

function executeKill(args) {
  if (args.length === 0) {
    return {
      success: false,
      output: 'kill: missing operand\nTry: kill <PID> or kill -9 <PID>',
    };
  }
  
  const signal = args.find(a => a.startsWith('-')) || '-TERM';
  const pid = args.find(a => !a.startsWith('-'));
  
  if (!pid || !pid.match(/^\d+$/)) {
    return {
      success: false,
      output: 'kill: invalid PID',
    };
  }
  
  // Simulated kill response
  const signalName = signal === '-9' ? 'SIGKILL' : 'SIGTERM';
  return {
    success: true,
    output: `Signal ${signalName} sent to process ${pid}\n(Simulated - process would be terminated in real UNIX)`,
  };
}

function executeGrep(args, filesystem, currentPath) {
  if (args.length < 1) {
    return {
      success: false,
      output: 'grep: missing pattern\nTry: grep <pattern> <file>',
    };
  }
  
  const pattern = args[0].replace(/^["']|["']$/g, '');
  
  if (args.length === 1) {
    return {
      success: true,
      output: `grep: searching for "${pattern}"\n(Provide a file to search, or pipe from another command)`,
    };
  }
  
  const targetArg = args[1];
  const targetPath = resolvePath(currentPath, targetArg);
  
  if (!pathExists(filesystem, targetPath)) {
    return {
      success: false,
      output: `grep: ${targetArg}: No such file or directory`,
    };
  }
  
  const content = getFileContent(filesystem, targetPath);
  if (content === null) {
    return {
      success: false,
      output: `grep: ${targetArg}: Is a directory`,
    };
  }
  
  const lines = content.split('\n');
  const matches = lines.filter(line => 
    line.toLowerCase().includes(pattern.toLowerCase())
  );
  
  if (matches.length === 0) {
    return {
      success: true,
      output: '(no matches found)',
    };
  }
  
  return {
    success: true,
    output: matches.join('\n'),
  };
}

function executeMan(positionalArgs) {
  if (positionalArgs.length === 0) {
    return {
      success: false,
      output: 'What manual page do you want?\nTry: man <command>',
    };
  }
  
  // Redirect to help
  return executeHelp(positionalArgs);
}

function executeTouch(filesystem, currentPath, positionalArgs) {
  if (positionalArgs.length === 0) {
    return {
      success: false,
      output: 'touch: missing file operand',
    };
  }
  
  // Simplified touch - just acknowledge
  return {
    success: true,
    output: `File${positionalArgs.length > 1 ? 's' : ''} touched!`,
  };
}

function executeStat(filesystem, currentPath, positionalArgs) {
  if (positionalArgs.length === 0) {
    return {
      success: false,
      output: 'stat: missing file operand',
    };
  }
  
  const targetPath = resolvePath(currentPath, positionalArgs[0]);
  
  if (!pathExists(filesystem, targetPath)) {
    return {
      success: false,
      output: `stat: cannot stat '${positionalArgs[0]}': No such file or directory`,
    };
  }
  
  const node = filesystem[targetPath];
  const output = `  File: ${positionalArgs[0]}
  Size: ${node.size || 4096}       Blocks: 8          IO Block: 4096   ${node.type}
Access: (${node.permissions})  Uid: ( 1000/adventurer)   Gid: ( 1000/adventurer)
Access: 2026-02-04 12:00:00.000000000 +0000
Modify: 2026-02-04 12:00:00.000000000 +0000
Change: 2026-02-04 12:00:00.000000000 +0000`;
  
  return { success: true, output };
}

function executeUnknown(command) {
  // Fun responses for unknown commands
  const responses = [
    `Command '${command}' not found. This spell is not in our grimoire!`,
    `Unknown command '${command}'. Type 'help' to see available commands.`,
    `The crystal ball doesn't recognize '${command}'. Try 'help'!`,
  ];
  
  // Special easter eggs
  const easterEggs = {
    'sudo': 'Nice try! In the Kingdom of UNIX, everyone is equal (mostly).',
    'rm -rf /': 'Whoa there! That would destroy the entire kingdom! Request denied.',
    'vim': 'Ah, the legendary editor! But this terminal is too humble for such power.',
    'emacs': 'A fine choice! But we keep things simple here in the village.',
    'exit': 'You can\'t exit the Kingdom that easily! You\'re on an adventure!',
    'hack': 'There\'s nothing to hack here - this is a learning environment!',
    'hello': 'Hello, adventurer! Welcome to the Kingdom of UNIX!',
    'hi': 'Hi there! Ready to learn some commands?',
  };
  
  if (easterEggs[command]) {
    return {
      success: false,
      output: easterEggs[command],
    };
  }
  
  return {
    success: false,
    output: responses[Math.floor(Math.random() * responses.length)],
  };
}

/**
 * Check if a command matches a quest objective
 */
export const matchesObjective = (commandString, objective) => {
  const parsed = parseCommand(commandString);
  const objParsed = parseCommand(objective.command);
  
  // Exact match
  if (commandString.trim() === objective.command.trim()) {
    return true;
  }
  
  // Match base command and key arguments
  if (parsed.command === objParsed.command) {
    // For simple commands like pwd, ls, whoami
    if (objParsed.args.length === 0) {
      return true;
    }
    
    // Check if required flags are present
    const hasRequiredFlags = objParsed.flags.every(flag => 
      parsed.hasFlag(flag) || parsed.args.includes(flag)
    );
    
    // Check if required positional args are present
    const hasRequiredArgs = objParsed.positionalArgs.every(arg =>
      parsed.positionalArgs.some(pArg => 
        pArg === arg || pArg.endsWith(arg) || arg.endsWith(pArg)
      )
    );
    
    return hasRequiredFlags && (objParsed.positionalArgs.length === 0 || hasRequiredArgs);
  }
  
  return false;
};

/**
 * Get command suggestions for autocomplete
 */
export const getCommandSuggestions = (input) => {
  const commands = ['pwd', 'ls', 'cd', 'cat', 'tree', 'mkdir', 'rm', 'chmod', 
                   'chown', 'ps', 'top', 'kill', 'grep', 'echo', 'whoami', 
                   'clear', 'help', 'man', 'touch', 'stat'];
  
  if (!input) return commands.slice(0, 5);
  
  return commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
};
