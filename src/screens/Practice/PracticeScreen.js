/**
 * Practice Screen - Sandbox terminal for free exploration
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { usePlayer } from '../../context/PlayerContext';
import { useTerminal } from '../../context/TerminalContext';
import { COMMANDS } from '../../data/commands';
import { createVirtualFilesystem } from '../../utils/virtualFilesystem';
import Header from '../../components/Common/Header';
import Terminal from '../../components/Terminal/Terminal';
import Card from '../../components/Common/Card';

const PracticeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { learnedCommands, recordCommand } = usePlayer();
  const { resetTerminal, setFilesystem, setCurrentPath } = useTerminal();
  
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [showCommandRef, setShowCommandRef] = useState(false);

  // Initialize practice filesystem
  useEffect(() => {
    const practiceFs = createVirtualFilesystem();
    setFilesystem(practiceFs);
    setCurrentPath('/home/adventurer');
    resetTerminal();
  }, []);

  // Group commands by category
  const commandCategories = {
    'Navigation': ['pwd', 'ls', 'cd'],
    'File Operations': ['cat', 'mkdir', 'rm', 'tree'],
    'System': ['ps', 'top', 'kill', 'whoami'],
    'Text': ['grep', 'echo'],
    'Permissions': ['chmod', 'chown'],
    'Utility': ['clear', 'help'],
  };

  // Handle command tap to show info
  const handleCommandTap = (cmdKey) => {
    setSelectedCommand(COMMANDS[cmdKey]);
    setShowCommandRef(true);
  };

  // Handle command execution
  const handleCommandExecuted = (result) => {
    if (result.command && !result.error) {
      recordCommand(result.command);
    }
  };

  // Reset terminal to fresh state
  const handleResetTerminal = () => {
    const freshFs = createVirtualFilesystem();
    setFilesystem(freshFs);
    setCurrentPath('/home/adventurer');
    resetTerminal();
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Header */}
      <Header
        title="Practice Terminal"
        subtitle="Sandbox Mode"
        rightIcon="🔄"
        onRightPress={handleResetTerminal}
      />

      {/* Terminal Section */}
      <View style={styles.terminalSection}>
        <Terminal
          onCommandExecuted={handleCommandExecuted}
          height={300}
          questMode={false}
          placeholder="Try any command..."
        />
      </View>

      {/* Command Reference Toggle */}
      <TouchableOpacity 
        style={styles.refToggle}
        onPress={() => setShowCommandRef(!showCommandRef)}
      >
        <Text style={styles.refToggleText}>
          {showCommandRef ? '▼ Hide Command Reference' : '▲ Show Command Reference'}
        </Text>
      </TouchableOpacity>

      {/* Command Reference Panel */}
      {showCommandRef && (
        <View style={styles.refPanel}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Selected Command Detail */}
            {selectedCommand && (
              <Card style={styles.selectedCommandCard}>
                <View style={styles.selectedHeader}>
                  <Text style={styles.selectedName}>{selectedCommand.name}</Text>
                  <Text style={styles.selectedDifficulty}>
                    {selectedCommand.difficulty === 1 ? '⭐' : 
                     selectedCommand.difficulty === 2 ? '⭐⭐' : '⭐⭐⭐'}
                  </Text>
                </View>
                <Text style={styles.selectedFun}>{selectedCommand.funExplanation}</Text>
                <View style={styles.syntaxBox}>
                  <Text style={styles.syntaxLabel}>Syntax:</Text>
                  <Text style={styles.syntaxText}>{selectedCommand.syntax}</Text>
                </View>
                <View style={styles.examplesBox}>
                  <Text style={styles.examplesLabel}>Examples:</Text>
                  {selectedCommand.examples.map((ex, idx) => (
                    <Text key={idx} style={styles.exampleText}>• {ex}</Text>
                  ))}
                </View>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setSelectedCommand(null)}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </Card>
            )}

            {/* Command Categories */}
            {Object.entries(commandCategories).map(([category, commands]) => (
              <View key={category} style={styles.categorySection}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <View style={styles.commandGrid}>
                  {commands.map((cmdKey) => {
                    const cmd = COMMANDS[cmdKey];
                    const isLearned = learnedCommands.includes(cmdKey);
                    return (
                      <TouchableOpacity
                        key={cmdKey}
                        style={[
                          styles.commandChip,
                          isLearned && styles.commandLearned,
                        ]}
                        onPress={() => handleCommandTap(cmdKey)}
                      >
                        <Text style={styles.commandName}>{cmdKey}</Text>
                        {isLearned && <Text style={styles.learnedBadge}>✓</Text>}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}

            {/* Quick Tips */}
            <Card style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>💡 Quick Tips</Text>
              <Text style={styles.tipText}>• Use <Text style={styles.tipCmd}>help</Text> to see available commands</Text>
              <Text style={styles.tipText}>• Use <Text style={styles.tipCmd}>ls -la</Text> for detailed file info</Text>
              <Text style={styles.tipText}>• Use <Text style={styles.tipCmd}>tree</Text> to visualize directory structure</Text>
              <Text style={styles.tipText}>• Navigate with <Text style={styles.tipCmd}>cd folder</Text> and <Text style={styles.tipCmd}>cd ..</Text></Text>
            </Card>

            {/* Stats */}
            <Card style={styles.statsCard}>
              <Text style={styles.statsTitle}>📊 Your Stats</Text>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Commands Learned:</Text>
                <Text style={styles.statValue}>{learnedCommands.length}/{Object.keys(COMMANDS).length}</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(learnedCommands.length / Object.keys(COMMANDS).length) * 100}%` }
                  ]} 
                />
              </View>
            </Card>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  terminalSection: {
    flex: 1,
    padding: SPACING.md,
  },
  refToggle: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceLight,
  },
  refToggleText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  refPanel: {
    maxHeight: 300,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceLight,
  },
  selectedCommandCard: {
    margin: SPACING.md,
    marginBottom: SPACING.sm,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    position: 'relative',
  },
  selectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  selectedName: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    fontFamily: 'monospace',
  },
  selectedDifficulty: {
    fontSize: FONTS.sizes.sm,
  },
  selectedFun: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.sm,
    fontStyle: 'italic',
  },
  syntaxBox: {
    backgroundColor: COLORS.terminalBg,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  syntaxLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    marginBottom: 4,
  },
  syntaxText: {
    color: COLORS.terminalText,
    fontFamily: 'monospace',
    fontSize: FONTS.sizes.sm,
  },
  examplesBox: {
    marginTop: SPACING.xs,
  },
  examplesLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    marginBottom: 4,
  },
  exampleText: {
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
    fontSize: FONTS.sizes.sm,
    marginBottom: 2,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    padding: SPACING.xs,
  },
  closeButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  categorySection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  categoryTitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
  },
  commandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  commandChip: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  commandLearned: {
    backgroundColor: COLORS.success + '30',
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  commandName: {
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  learnedBadge: {
    color: COLORS.success,
    fontSize: FONTS.sizes.xs,
  },
  tipsCard: {
    margin: SPACING.md,
    marginTop: SPACING.sm,
    padding: SPACING.md,
  },
  tipsTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.sm,
  },
  tipText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.xs,
  },
  tipCmd: {
    color: COLORS.terminalText,
    fontFamily: 'monospace',
  },
  statsCard: {
    margin: SPACING.md,
    marginTop: SPACING.sm,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statsTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.sm,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  statValue: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: BORDER_RADIUS.round,
  },
});

export default PracticeScreen;
