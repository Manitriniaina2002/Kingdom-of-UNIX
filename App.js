/**
 * Kingdom of UNIX - Main Application Entry Point
 * A game-based learning platform for UNIX concepts
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/context/AuthContext';
import { GameProvider } from './src/context/GameContext';
import { PlayerProvider } from './src/context/PlayerContext';
import { TerminalProvider } from './src/context/TerminalContext';
import { LessonProvider } from './src/context/LessonContext';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      <AuthProvider>
        <GameProvider>
          <PlayerProvider>
            <TerminalProvider>
              <LessonProvider>
                <AppNavigator />
              </LessonProvider>
            </TerminalProvider>
          </PlayerProvider>
        </GameProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
