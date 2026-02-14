/**
 * Terminal Component - Interactive terminal simulator
 * The heart of the gameplay experience
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { useTerminal } from '../../context/TerminalContext';
import { usePlayer } from '../../context/PlayerContext';
import { useResponsive } from '../../utils/responsive';

const Terminal = ({ 
  onCommandExecuted, 
  height = 350, 
  showPath = true,
  placeholder = 'Type a command...',
  questMode = false,
}) => {
  const {
    history,
    currentInput,
    currentPath,
    setInput,
    runCommand,
    navigateHistory,
    isProcessing,
  } = useTerminal();
  
  const { recordCommand } = usePlayer();
  const scrollViewRef = useRef(null);
  const inputRef = useRef(null);
  const { fonts: rFonts } = useResponsive();

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [history]);

  const handleSubmit = () => {
    if (!currentInput.trim() || isProcessing) return;
    
    const command = currentInput.trim();
    const result = runCommand(command);
    
    if (result) {
      recordCommand(result.command);
      onCommandExecuted?.(result);
    }
  };

  const handleKeyPress = (e) => {
    // Handle up/down arrow for history navigation
    if (e.nativeEvent.key === 'ArrowUp') {
      navigateHistory('up');
    } else if (e.nativeEvent.key === 'ArrowDown') {
      navigateHistory('down');
    }
  };

  const renderHistoryItem = (item, index) => {
    const getStyle = () => {
      switch (item.type) {
        case 'command':
          return styles.commandText;
        case 'output':
          return styles.outputText;
        case 'error':
          return styles.errorText;
        case 'system':
          return styles.systemText;
        case 'hint':
          return styles.hintText;
        case 'info':
          return styles.infoText;
        case 'success':
          return styles.successText;
        default:
          return styles.outputText;
      }
    };

    return (
      <Text key={index} style={[styles.historyText, getStyle()]}>
        {item.content}
      </Text>
    );
  };

  // Get shortened path for display
  const getDisplayPath = () => {
    const path = currentPath;
    if (path === '/home/adventurer') return '~';
    if (path.startsWith('/home/adventurer/')) {
      return '~/' + path.slice('/home/adventurer/'.length);
    }
    return path;
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { height }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Terminal Header */}
      <View style={styles.header}>
        <View style={styles.headerDots}>
          <View style={[styles.dot, styles.dotRed]} />
          <View style={[styles.dot, styles.dotYellow]} />
          <View style={[styles.dot, styles.dotGreen]} />
        </View>
        <Text style={styles.headerTitle}>
          {questMode ? 'Quest Terminal' : 'Kingdom Terminal'}
        </Text>
        <View style={styles.headerDots} />
      </View>

      {/* Terminal Output */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.outputArea}
        contentContainerStyle={styles.outputContent}
        showsVerticalScrollIndicator={true}
      >
        {history.map(renderHistoryItem)}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>
        {showPath && (
          <Text style={styles.prompt}>
            <Text style={styles.promptUser}>adventurer</Text>
            <Text style={styles.promptAt}>@</Text>
            <Text style={styles.promptHost}>kingdom</Text>
            <Text style={styles.promptColon}>:</Text>
            <Text style={styles.promptPath}>{getDisplayPath()}</Text>
            <Text style={styles.promptSymbol}>$ </Text>
          </Text>
        )}
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={currentInput}
          onChangeText={setInput}
          onSubmitEditing={handleSubmit}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          spellCheck={false}
          returnKeyType="send"
          editable={!isProcessing}
        />
        <TouchableOpacity 
          style={[styles.submitButton, isProcessing && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isProcessing}
        >
          <Text style={styles.submitButtonText}>⏎</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.terminalBg,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  headerDots: {
    flexDirection: 'row',
    width: 50,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.xs,
  },
  dotRed: {
    backgroundColor: '#FF5F56',
  },
  dotYellow: {
    backgroundColor: '#FFBD2E',
  },
  dotGreen: {
    backgroundColor: '#27CA40',
  },
  headerTitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  outputArea: {
    flex: 1,
    padding: SPACING.md,
  },
  outputContent: {
    paddingBottom: SPACING.md,
  },
  historyText: {
    fontFamily: FONTS.terminal,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
    marginBottom: SPACING.xs,
  },
  commandText: {
    color: COLORS.terminalPrompt,
  },
  outputText: {
    color: COLORS.terminalText,
  },
  errorText: {
    color: COLORS.terminalError,
  },
  systemText: {
    color: COLORS.terminalInfo,
    fontStyle: 'italic',
  },
  hintText: {
    color: COLORS.terminalWarning,
  },
  infoText: {
    color: COLORS.textSecondary,
  },
  successText: {
    color: COLORS.terminalSuccess,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceLight,
  },
  prompt: {
    fontFamily: FONTS.terminal,
    fontSize: FONTS.sizes.sm,
  },
  promptUser: {
    color: COLORS.success,
    fontWeight: FONTS.weights.bold,
  },
  promptAt: {
    color: COLORS.textSecondary,
  },
  promptHost: {
    color: COLORS.secondary,
    fontWeight: FONTS.weights.bold,
  },
  promptColon: {
    color: COLORS.textSecondary,
  },
  promptPath: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.bold,
  },
  promptSymbol: {
    color: COLORS.textPrimary,
  },
  input: {
    flex: 1,
    color: COLORS.terminalText,
    fontFamily: FONTS.terminal,
    fontSize: FONTS.sizes.sm,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
});

export default Terminal;
