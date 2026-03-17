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

# UNIX Kingdom

A game-based learning platform that teaches UNIX commands through an immersive fantasy adventure.

![Expo SDK](https://img.shields.io/badge/Expo%20SDK-51-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.74.5-61dafb)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20Web-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Overview

**UNIX Kingdom** transforms learning UNIX commands into an engaging role-playing game. Players journey through magical zones, complete quests, and battle bosses — all while mastering real terminal commands in a safe, sandboxed environment.

### Key Features

- **Interactive Terminal Simulator** — Practice real UNIX commands in a sandboxed virtual filesystem
- **5 Themed Learning Zones** — Progressively unlock zones from basics to networking
- **Quest-Based Learning** — Story-driven missions that teach commands in context
- **XP, Levels & Achievements** — Gamified progression system
- **Boss Battles** — Complex command puzzles at the end of each zone
- **Structured Lessons** — Chapters with examples, code blocks, and exercises
- **Command Reference** — Built-in help with explanations for every command
- **Multilanguage Support** — English, French, and Malagasy
- **Multi-User Accounts** — Login, signup, guest mode, quick user switching
- **Responsive Design** — Mobile, tablet, and web (desktop)
- **Offline-first** — All data stored locally via SQLite (Android) / localStorage (Web)

## Game Zones

| Zone | Commands | Level |
| ---- | -------- | ----- |
| Village of Files | `pwd`, `ls`, `cd`, `cat`, `mkdir`, `touch`, `cp`, `mv`, `rm` | 1+ |
| Cave of Permissions | `chmod`, `chown`, `ls -la` | 5+ |
| Forest of Processes | `ps`, `top`, `kill`, `bg`, `fg` | 10+ |
| Castle of Scripts | `grep`, `echo`, `sed`, `awk`, scripting | 15+ |
| Mountain of Networks | `ping`, `curl`, `netstat`, `ssh` | 20+ |

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- For Android builds: Android SDK + Java 17+

### Installation

```bash
git clone https://github.com/Manitriniaina2002/Kingdom-of-UNIX.git
cd Kingdom-of-UNIX
npm install
```

### Run (Development)

```bash
# Start Metro + Expo dev server
npx expo start --clear

# Then press:
#   a  →  Android emulator / connected device
#   w  →  Web browser
```

### Build APK (local)

```bash
# Generate native android/ folder
npx expo prebuild --platform android

# Build release APK
cd android
.\gradlew.bat assembleRelease          # Windows
./gradlew assembleRelease              # macOS / Linux
```

Output: `android/app/build/outputs/apk/release/Unix-Kingdom.apk`

> **Tip (Windows):** If you hit Gradle lock timeouts, set a short-path `GRADLE_USER_HOME`:
> ```powershell
> $env:GRADLE_USER_HOME = "C:\Users\<you>\Kingdom-of-UNIX\.gradle-local"
> ```
> The `android/` directory is git-ignored (generated artifact).

### Build APK (EAS cloud)

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

## Project Structure

```text
Kingdom-of-UNIX/
├── App.js                        # Entry point — providers + splash loader
├── app.json                      # Expo config (icon, package name, EAS)
├── eas.json                      # EAS build profiles
├── assets/
│   ├── unix-kingdom-logo.png     # App icon, splash & in-app logo
│   └── me.png                    # Character image (dialog box)
└── src/
    ├── components/
    │   ├── Common/               # AnimatedBackground, Button, Card,
    │   │                         #   Header, Toast, UnixUniverseLoader
    │   ├── Badge/                # Achievement badge display
    │   ├── Dialog/               # NPC dialog boxes (typewriter effect)
    │   ├── Player/               # PlayerStatsBar
    │   ├── Quest/                # QuestCard
    │   ├── Terminal/             # Interactive terminal component
    │   └── Zone/                 # ZoneNode (world map node)
    ├── constants/
    │   └── theme.js              # Colors, fonts, spacing, shadows
    ├── context/
    │   ├── AuthContext.js        # Auth: login, signup, guest, multi-user
    │   ├── GameContext.js        # Zone/quest progress (per user)
    │   ├── LessonContext.js      # Lesson completion tracking
    │   ├── PlayerContext.js      # XP, gold, achievements, settings
    │   └── TerminalContext.js    # Terminal session state & history
    ├── data/
    │   ├── achievements.js       # Achievement & level definitions
    │   ├── commands.js           # UNIX command metadata
    │   ├── lessons.js            # Lesson content (EN)
    │   ├── lessons_fr.js         # Lesson content (FR)
    │   ├── lessons_mg.js         # Lesson content (MG)
    │   ├── lessonsI18n.js        # Lesson i18n selector
    │   ├── quests.js             # Quest definitions
    │   └── zones.js              # Zone data & unlock order
    ├── database/
    │   ├── db.js                 # SQLite abstraction (Android)
    │   └── webDb.js              # localStorage adapter (Web)
    ├── i18n/
    │   ├── index.js              # LanguageProvider & useLanguage hook
    │   ├── en.js                 # English strings
    │   ├── fr.js                 # French strings
    │   └── mg.js                 # Malagasy strings
    ├── navigation/
    │   └── AppNavigator.js       # Stack + bottom-tab navigation
    ├── screens/
    │   ├── Auth/                 # LoginScreen, SignupScreen
    │   ├── Home/                 # HomeScreen (hub)
    │   ├── Lessons/              # LessonsScreen, LessonDetailScreen
    │   ├── Practice/             # Sandbox terminal screen
    │   ├── Profile/              # Stats, achievements, settings
    │   ├── Quest/                # Quest gameplay screen
    │   ├── WorldMap/             # Zone selection map
    │   └── Zone/                 # Zone detail & quest list
    └── utils/
        ├── commandParser.js      # UNIX command execution engine
        ├── icons.js              # Icon name → component mapping
        ├── lessonExporter.js     # Lesson text-file download
        ├── responsive.js         # Responsive layout helpers
        └── virtualFilesystem.js  # Sandboxed in-memory filesystem
```

## Multilanguage

| Language | Code |
| -------- | ---- |
| English  | `en` |
| Français | `fr` |
| Malagasy | `mg` |

Switch from **Profile → Settings → Language**.

### Adding a Language

1. Copy `src/i18n/en.js` → `src/i18n/xx.js` and translate all keys
2. Register in `src/i18n/index.js`:

   ```javascript
   import xx from './xx';
   const translations = { en, fr, mg, xx };
   export const LANGUAGES = [...existing, { code: 'xx', label: 'Name', flag: '🏳️' }];
   ```

## Customization

### Adding Commands

1. Add metadata to `src/data/commands.js`
2. Add execution logic to `src/utils/commandParser.js`

### Adding Quests

```javascript
// src/data/quests.js
'quest_id': {
  id: 'quest_id',
  name: 'Quest Name',
  zoneId: 'village',
  description: 'Description',
  objectives: [
    { id: 'obj1', description: 'Task', command: 'ls' },
  ],
  xpReward: 100,
  goldReward: 10,
}
```

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | Expo SDK 51 / React Native 0.74.5 |
| Navigation | React Navigation 6 (stack + bottom tabs) |
| Persistence | expo-sqlite (Android), localStorage (Web) |
| Auth | Custom (SHA-256 via crypto-js, local DB) |
| Styling | React Native StyleSheet + responsive helpers |
| Build | Gradle 8.8 (local) / EAS Build (cloud) |
| Icons | @expo/vector-icons (Feather, MaterialCommunityIcons) |

## Planned Features

- [ ] Daily quests with rotating challenges
- [ ] Leaderboards
- [ ] Cloud sync across devices
- [ ] Shareable completion certificates
- [ ] New zones: Streams, Variables, Cron scheduler

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'feat: add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

## License

MIT — see [LICENSE](LICENSE) for details.

---

**By RANDRIAMBOLOLONA Manitriniaina**
   ];
