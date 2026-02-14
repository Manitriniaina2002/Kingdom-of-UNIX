/**
 * UNIX Kingdom - Main Application Entry Point
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
import { LanguageProvider } from './src/i18n';
import { ToastProvider } from './src/components/Common/Toast';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      <LanguageProvider>
        <ToastProvider>
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
        </ToastProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
};

export default App;
