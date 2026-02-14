# 🏰 UNIX Kingdom

A game-based learning platform that teaches UNIX commands and IT fundamentals through an immersive fantasy adventure!

![Expo SDK](https://img.shields.io/badge/Expo%20SDK-51-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.74.5-61dafb)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎮 Overview

**UNIX Kingdom** transforms the learning experience of UNIX commands into an engaging role-playing adventure. Players journey through magical zones, complete quests, and battle bosses—all while mastering real terminal commands in a safe, sandboxed environment.

### ✨ Key Features

- 🖥️ **Interactive Terminal Simulator** — Practice real UNIX commands in a safe sandbox
- 🗺️ **5 Themed Learning Zones** — From basics to advanced networking
- ⚔️ **Quest-Based Learning** — Story-driven missions that teach progressively
- 🏆 **XP, Levels & Achievements** — Gamified progression to keep learners motivated
- 🐉 **Boss Battles** — Challenge yourself with complex command puzzles
- 📚 **Comprehensive Lessons** — Structured UNIX lessons with chapters, examples, and exercises
- 📖 **Command Reference** — Built-in help with fun explanations
- 🌐 **Multilanguage Support** — English, French (Français), and Malagasy
- 👥 **Multi-User Accounts** — Login, signup, guest mode, and quick user switching
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop (web)

## 🌍 Game Zones

| Zone                         | Commands                 | Level |
| ---------------------------- | ------------------------ | ----- |
| 🏘️ **Village of Files**      | `pwd`, `ls`, `cd`, `cat` | 1+    |
| 🦇 **Cave of Permissions**   | `chmod`, `chown`         | 5+    |
| 🌲 **Forest of Processes**   | `ps`, `top`, `kill`      | 10+   |
| 🏰 **Castle of Scripts**     | `grep`, `echo`, scripting | 15+  |
| ⛰️ **Mountain of Networks**  | Networking concepts       | 20+  |

## 📱 Screenshots

```text
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   🏰 Home       │  │   🗺️ Map        │  │   ⌨️ Terminal    │
│                 │  │                 │  │                 │
│  Welcome,       │  │  ┌───┐ ┌───┐   │  │  $ ls           │
│  Adventurer!    │  │  │ 🏘️ │ │ 🦇 │   │  │  docs/          │
│                 │  │  └───┘ └───┘   │  │  projects/      │
│  Level 5        │  │  ┌───┐ ┌───┐   │  │  notes.txt      │
│  ⭐ 1,250 XP    │  │  │ 🌲 │ │ 🏰 │   │  │                 │
│  💰 45 Gold     │  │  └───┘ └───┘   │  │  $ _             │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your device (optional, for testing)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Manitriniaina2002/Kingdom-of-UNIX.git
   cd Kingdom-of-UNIX
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on device/emulator**

   ```bash
   # Scan QR code with Expo Go app, or:

   # For Web
   npm run web

   # For iOS Simulator
   npm run ios

   # For Android
   npm run android
   ```

## 📂 Project Structure

```text
Kingdom-of-UNIX/
├── App.js                        # Entry point with providers
├── package.json                  # Dependencies
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── Badge/                # Achievement badges
│   │   ├── Common/               # Button, Card, Header
│   │   ├── Dialog/               # NPC dialog boxes
│   │   ├── Player/               # Player stats bar
│   │   ├── Quest/                # Quest cards
│   │   ├── Terminal/             # Interactive terminal
│   │   └── Zone/                 # Zone map nodes
│   │
│   ├── constants/
│   │   └── theme.js              # Colors, fonts, spacing
│   │
│   ├── context/                  # State management (React Context)
│   │   ├── AuthContext.js        # Authentication & user accounts
│   │   ├── GameContext.js        # Zone/quest progress
│   │   ├── LessonContext.js      # Lesson completion tracking
│   │   ├── PlayerContext.js      # XP, achievements, settings
│   │   └── TerminalContext.js    # Terminal state & history
│   │
│   ├── data/                     # Game content
│   │   ├── achievements.js       # Badges & level definitions
│   │   ├── commands.js           # UNIX command metadata
│   │   ├── lessons.js            # Lesson chapters & content
│   │   ├── quests.js             # Quest definitions
│   │   └── zones.js              # Zone data & connections
│   │
│   ├── database/                 # Persistence layer
│   │   ├── db.js                 # Database abstraction (SQLite / Web)
│   │   └── webDb.js              # localStorage adapter for web
│   │
│   ├── i18n/                     # Multilanguage translations
│   │   ├── index.js              # LanguageProvider & useLanguage hook
│   │   ├── en.js                 # English
│   │   ├── fr.js                 # French (Français)
│   │   └── mg.js                 # Malagasy
│   │
│   ├── navigation/
│   │   └── AppNavigator.js       # Stack & tab navigation
│   │
│   ├── screens/                  # Main app screens
│   │   ├── Auth/                 # Login & Signup
│   │   ├── Home/                 # Hub screen
│   │   ├── Lessons/              # Lesson browser & reader
│   │   ├── Practice/             # Sandbox terminal
│   │   ├── Profile/              # Stats, badges, settings
│   │   ├── Quest/                # Gameplay screen
│   │   ├── WorldMap/             # Zone selection map
│   │   └── Zone/                 # Zone details & quest list
│   │
│   └── utils/
│       ├── commandParser.js      # Command execution engine
│       ├── icons.js              # Game icon mapping
│       ├── lessonExporter.js     # PDF export utility
│       ├── responsive.js         # Responsive layout helpers
│       └── virtualFilesystem.js  # Sandboxed filesystem
│
└── assets/                       # Images & static assets
```

## 🌐 Multilanguage Support

UNIX Kingdom supports **3 languages** out of the box:

| Flag | Language | Code |
| ---- | -------- | ---- |
| 🇬🇧   | English  | `en` |
| 🇫🇷   | Français | `fr` |
| 🇲🇬   | Malagasy | `mg` |

Switch languages from **Profile → Settings → Language**. The preference is persisted across sessions.

## 🎯 Supported Commands

| Command  | Description              | Difficulty |
| -------- | ------------------------ | ---------- |
| `pwd`    | Print working directory  | ⭐          |
| `ls`     | List directory contents  | ⭐          |
| `cd`     | Change directory         | ⭐          |
| `cat`    | View file contents       | ⭐          |
| `mkdir`  | Create directory         | ⭐          |
| `touch`  | Create file              | ⭐          |
| `echo`   | Print text               | ⭐          |
| `whoami` | Current user             | ⭐          |
| `clear`  | Clear terminal           | ⭐          |
| `help`   | Show help                | ⭐          |
| `cp`     | Copy files               | ⭐⭐        |
| `mv`     | Move/rename files        | ⭐⭐        |
| `rm`     | Remove files/directories | ⭐⭐        |
| `tree`   | Display directory tree   | ⭐⭐        |
| `head`   | View first lines         | ⭐⭐        |
| `tail`   | View last lines          | ⭐⭐        |
| `find`   | Find files               | ⭐⭐        |
| `wc`     | Word/line count          | ⭐⭐        |
| `chmod`  | Change permissions       | ⭐⭐        |
| `chown`  | Change ownership         | ⭐⭐        |
| `ps`     | List processes           | ⭐⭐        |
| `top`    | Process monitor          | ⭐⭐        |
| `kill`   | Terminate process        | ⭐⭐        |
| `grep`   | Search text patterns     | ⭐⭐⭐      |
| `sort`   | Sort lines               | ⭐⭐⭐      |
| `uniq`   | Remove duplicates        | ⭐⭐⭐      |
| `sed`    | Stream editor            | ⭐⭐⭐      |
| `awk`    | Text processing          | ⭐⭐⭐      |

## 🛠️ Customization

### Adding New Commands

1. Add command metadata to `src/data/commands.js`:

   ```javascript
   newcmd: {
     name: 'newcmd',
     funExplanation: 'Your fun explanation',
     syntax: 'newcmd [options]',
     examples: ['newcmd -a', 'newcmd file.txt'],
     difficulty: 1,
   },
   ```

2. Implement execution logic in `src/utils/commandParser.js`:

   ```javascript
   case 'newcmd':
     return handleNewCmd(args, filesystem, currentPath);
   ```

### Adding New Quests

Add quest data to `src/data/quests.js`:

```javascript
'new_quest_id': {
  id: 'new_quest_id',
  name: 'Quest Name',
  zoneId: 'village',
  description: 'Quest description',
  objectives: [
    { id: 'obj1', description: 'Task 1', command: 'pwd' },
    { id: 'obj2', description: 'Task 2', command: 'ls' },
  ],
  xpReward: 100,
  goldReward: 10,
}
```

### Adding a New Language

1. Create a new translation file `src/i18n/xx.js` (copy `en.js` as template)
2. Translate all keys
3. Register in `src/i18n/index.js`:

   ```javascript
   import xx from './xx';
   const translations = { en, fr, mg, xx };

   export const LANGUAGES = [
     ...existing,
     { code: 'xx', label: 'Language Name', flag: '🏳️' },
   ];
   ```

## 🚀 Expansion Ideas

### Planned Features

- [ ] Multiplayer Guilds — Form learning groups with friends
- [ ] Daily Quests — Fresh challenges every day
- [ ] Leaderboards — Compete globally or with friends
- [ ] Cloud Sync — Sync progress across devices
- [ ] Certification — Earn shareable certificates

### Advanced Zones (Future)

- 🌊 **The Sea of Streams** — Pipes, redirects, stdin/stdout
- 🌋 **Volcano of Variables** — Environment variables, exports
- 🌙 **The Dark Web (safe!)** — curl, wget, basic networking
- ❄️ **Ice Palace of Cron** — Scheduled tasks, automation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the beauty and power of UNIX systems
- Built with ❤️ for learners everywhere
- Special thanks to the React Native and Expo communities

---

**Made with ⌨️ and ☕ by RANDRIAMBOLOLONA Manitriniaina**

*Happy Learning, Adventurer! 🏰*
