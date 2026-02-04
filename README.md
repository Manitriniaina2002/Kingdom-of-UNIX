# 🏰 Kingdom of UNIX

A game-based mobile learning platform that teaches UNIX commands and IT fundamentals through an immersive fantasy adventure!

![Expo SDK](https://img.shields.io/badge/Expo%20SDK-51-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.74.5-61dafb)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎮 Overview

**Kingdom of UNIX** transforms the learning experience of UNIX commands into an engaging role-playing adventure. Players journey through magical zones, complete quests, and battle bosses—all while mastering real terminal commands in a safe, sandboxed environment.

### ✨ Key Features

- 🖥️ **Interactive Terminal Simulator** - Practice real UNIX commands in a safe sandbox
- 🗺️ **5 Themed Learning Zones** - From basics to advanced networking
- ⚔️ **Quest-Based Learning** - Story-driven missions that teach progressively
- 🏆 **XP, Levels & Achievements** - Gamified progression to keep learners motivated
- 🐉 **Boss Battles** - Challenge yourself with complex command puzzles
- 📚 **Command Reference** - Built-in help with fun explanations

## 🌍 Game Zones

| Zone | Commands | Level |
|------|----------|-------|
| 🏘️ **Village of Files** | `pwd`, `ls`, `cd`, `cat` | 1+ |
| 🦇 **Cave of Permissions** | `chmod`, `chown` | 5+ |
| 🌲 **Forest of Processes** | `ps`, `top`, `kill` | 10+ |
| 🏰 **Castle of Scripts** | `grep`, `echo`, scripting | 15+ |
| ⛰️ **Mountain of Networks** | Networking concepts | 20+ |

## 📱 Screenshots

```
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
   git clone https://github.com/yourusername/kingdom-of-unix.git
   cd kingdom-of-unix
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
   
   # For iOS Simulator
   npm run ios

   # For Android
   npm run android
   ```

## 📂 Project Structure

```
Kingdom-of-UNIX/
├── App.js                    # Entry point
├── package.json              # Dependencies
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Badge/           # Achievement badges
│   │   ├── Common/          # Button, Card, Header
│   │   ├── Dialog/          # NPC dialogs
│   │   ├── Player/          # Stats bar
│   │   ├── Quest/           # Quest cards
│   │   ├── Terminal/        # Interactive terminal
│   │   └── Zone/            # Zone map nodes
│   │
│   ├── constants/
│   │   └── theme.js         # Colors, fonts, spacing
│   │
│   ├── context/             # State management
│   │   ├── GameContext.js   # Zone/quest progress
│   │   ├── PlayerContext.js # XP, achievements
│   │   └── TerminalContext.js # Terminal state
│   │
│   ├── data/                # Game content
│   │   ├── achievements.js  # Badges & levels
│   │   ├── commands.js      # UNIX command info
│   │   ├── quests.js        # Quest definitions
│   │   └── zones.js         # Zone data
│   │
│   ├── navigation/
│   │   └── AppNavigator.js  # Stack & tab navigation
│   │
│   ├── screens/             # Main app screens
│   │   ├── Home/            # Hub screen
│   │   ├── WorldMap/        # Zone selection
│   │   ├── Zone/            # Zone details
│   │   ├── Quest/           # Gameplay screen
│   │   ├── Practice/        # Sandbox terminal
│   │   └── Profile/         # Stats & settings
│   │
│   └── utils/
│       ├── commandParser.js # Command execution
│       └── virtualFilesystem.js # Sandboxed FS
```

## 🎯 Supported Commands

| Command | Description | Difficulty |
|---------|-------------|------------|
| `pwd` | Print working directory | ⭐ |
| `ls` | List directory contents | ⭐ |
| `cd` | Change directory | ⭐ |
| `cat` | View file contents | ⭐ |
| `mkdir` | Create directory | ⭐ |
| `rm` | Remove files/directories | ⭐⭐ |
| `tree` | Display directory tree | ⭐⭐ |
| `chmod` | Change permissions | ⭐⭐ |
| `chown` | Change ownership | ⭐⭐ |
| `ps` | List processes | ⭐⭐ |
| `top` | Process monitor | ⭐⭐ |
| `kill` | Terminate process | ⭐⭐ |
| `grep` | Search text patterns | ⭐⭐⭐ |
| `echo` | Print text | ⭐ |
| `whoami` | Current user | ⭐ |
| `clear` | Clear terminal | ⭐ |
| `help` | Show help | ⭐ |

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
  // ...
}
```

## 🚀 Expansion Ideas

### Planned Features

- [ ] **Multiplayer Guilds** - Form learning groups with friends
- [ ] **Daily Quests** - Fresh challenges every day
- [ ] **Leaderboards** - Compete globally or with friends
- [ ] **Voice Commands** - Speak commands for accessibility
- [ ] **AR Mode** - Visualize filesystem in augmented reality

### Community Suggestions

- [ ] **Custom Themes** - Dark, light, retro terminal themes
- [ ] **Language Packs** - Localization for multiple languages
- [ ] **Offline Mode** - Play without internet connection
- [ ] **Cloud Sync** - Sync progress across devices
- [ ] **Tutorial Videos** - Embedded video explanations
- [ ] **Certification** - Earn shareable certificates

### Advanced Zones (Future)

- 🌊 **The Sea of Streams** - Pipes, redirects, stdin/stdout
- 🌋 **Volcano of Variables** - Environment variables, exports
- 🌙 **The Dark Web (safe!)** - curl, wget, basic networking
- ❄️ **Ice Palace of Cron** - Scheduled tasks, automation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the beauty and power of UNIX systems
- Built with ❤️ for learners everywhere
- Special thanks to the React Native community

---

**Made with ⌨️ and ☕ by the Kingdom of UNIX Team**

*Happy Learning, Adventurer! 🏰*