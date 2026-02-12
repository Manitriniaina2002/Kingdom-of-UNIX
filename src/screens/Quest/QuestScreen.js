/**
 * Quest Screen - Play through a quest with terminal challenges
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useGame } from '../../context/GameContext';
import { usePlayer } from '../../context/PlayerContext';
import { useTerminal } from '../../context/TerminalContext';
import { QUESTS } from '../../data/quests';
import { ZONES } from '../../data/zones';
import { createQuestFilesystem } from '../../utils/virtualFilesystem';
import { matchesObjective } from '../../utils/commandParser';
import Header from '../../components/Common/Header';
import Terminal from '../../components/Terminal/Terminal';
import DialogBox from '../../components/Dialog/DialogBox';
import Button from '../../components/Common/Button';
import { GameIcon } from '../../utils/icons';

const QuestScreen = ({ route, navigation }) => {
  const { questId } = route.params;
  const insets = useSafeAreaInsets();
  const { completeQuest, isQuestCompleted, setCurrentQuest } = useGame();
  const { addXP, addGold, addBadge, hintsEnabled } = usePlayer();
  const { 
    startQuestMode, 
    endQuestMode, 
    advanceObjective, 
    useHint,
    currentObjectiveIndex,
    hintsUsed,
    getQuestDuration,
    addOutput,
    resetTerminal,
  } = useTerminal();

  const [quest, setQuest] = useState(null);
  const [objectives, setObjectives] = useState([]);
  const [showIntroDialog, setShowIntroDialog] = useState(true);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [questComplete, setQuestComplete] = useState(false);

  // Initialize quest
  useEffect(() => {
    const questData = QUESTS[questId];
    if (questData) {
      setQuest(questData);
      setObjectives(questData.objectives.map(obj => ({ ...obj, completed: false })));
      setCurrentQuest(questId);
      
      // Set up quest filesystem
      const questFs = createQuestFilesystem(questId);
      startQuestMode(questId, questFs, '/home/adventurer');
    }

    return () => {
      endQuestMode();
    };
  }, [questId]);

  // Get current objective
  const currentObjective = objectives[currentObjectiveIndex];
  const zone = quest ? ZONES[quest.zoneId] : null;

  // Handle command execution
  const handleCommandExecuted = useCallback((result) => {
    if (!currentObjective || questComplete) return;

    // Check if command matches current objective
    if (matchesObjective(result.command + ' ' + (result.args?.join(' ') || ''), currentObjective)) {
      // Mark objective as completed
      setObjectives(prev => {
        const updated = [...prev];
        updated[currentObjectiveIndex].completed = true;
        return updated;
      });

      // Add success feedback
      addOutput('success', `Objective completed: ${currentObjective.description}`);

      // Check if quest is complete
      if (currentObjectiveIndex === objectives.length - 1) {
        setQuestComplete(true);
        setTimeout(() => setShowCompletionDialog(true), 500);
      } else {
        // Move to next objective
        advanceObjective();
        
        // Show next objective hint
        setTimeout(() => {
          addOutput('info', `\nNext: ${objectives[currentObjectiveIndex + 1].description}`);
        }, 300);
      }
    }
  }, [currentObjective, currentObjectiveIndex, objectives, questComplete]);

  // Handle hint request
  const handleHintPress = () => {
    if (currentObjective?.hint && hintsEnabled) {
      useHint(currentObjective.hint);
      setShowHint(true);
    }
  };

  // Handle quest completion
  const handleCompleteQuest = () => {
    if (!quest) return;

    const duration = getQuestDuration();
    
    // Award XP and Gold
    addXP(quest.xpReward);
    addGold(quest.goldReward);

    // Award badge if quest has one
    if (quest.badge) {
      addBadge(quest.badge.id);
    }

    // Mark quest as completed
    completeQuest(questId);

    // Reset and close
    setShowCompletionDialog(false);
    resetTerminal();
    navigation.goBack();
  };

  // Handle skip intro
  const handleSkipIntro = () => {
    setShowIntroDialog(false);
    addOutput('info', `Objective: ${currentObjective?.description || 'Start the quest!'}`);
  };

  if (!quest) {
    return (
      <View style={styles.container}>
        <Header title="Loading..." showBack onLeftPress={() => navigation.goBack()} />
      </View>
    );
  }

  const alreadyCompleted = isQuestCompleted(questId);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Header */}
      <Header
        title={quest.name}
        subtitle={zone?.name}
        showBack
        onLeftPress={() => {
          Alert.alert(
            'Leave Quest?',
            'Your progress in this quest will be lost.',
            [
              { text: 'Stay', style: 'cancel' },
              { text: 'Leave', style: 'destructive', onPress: () => {
                resetTerminal();
                navigation.goBack();
              }},
            ]
          );
        }}
        rightIcon=""
      />

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Progress</Text>
          <Text style={styles.progressCount}>
            {objectives.filter(o => o.completed).length}/{objectives.length}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(objectives.filter(o => o.completed).length / objectives.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Objectives List */}
      <View style={styles.objectivesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {objectives.map((obj, index) => (
            <View 
              key={obj.id}
              style={[
                styles.objectiveChip,
                obj.completed && styles.objectiveCompleted,
                index === currentObjectiveIndex && styles.objectiveCurrent,
              ]}
            >
              <Text style={styles.objectiveNumber}>
                {obj.completed ? '✓' : index + 1}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Current Objective Card */}
      {currentObjective && !questComplete && (
        <View style={styles.currentObjectiveCard}>
          <View style={styles.objectiveHeader}>
            <Text style={styles.objectiveLabel}>Current Objective</Text>
            {hintsEnabled && (
              <TouchableOpacity style={styles.hintButton} onPress={handleHintPress}>
                <Text style={styles.hintButtonText}>Hint</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.objectiveDescription}>
            {currentObjective.description}
          </Text>
          <View style={styles.expectedCommand}>
            <Text style={styles.expectedLabel}>Expected:</Text>
            <Text style={styles.expectedText}>{currentObjective.command}</Text>
          </View>
        </View>
      )}

      {/* Terminal */}
      <View style={styles.terminalContainer}>
        <Terminal
          onCommandExecuted={handleCommandExecuted}
          height={280}
          questMode={true}
          placeholder={currentObjective ? `Type: ${currentObjective.command.split(' ')[0]}...` : 'Type a command...'}
        />
      </View>

      {/* Quest Complete Overlay */}
      {questComplete && (
        <View style={styles.completeOverlay}>
          <GameIcon name="celebrate" size={48} color={COLORS.gold} />
          <Text style={styles.completeTitle}>Quest Complete!</Text>
          <Button
            title="Claim Rewards"
            onPress={() => setShowCompletionDialog(true)}
          />
        </View>
      )}

      {/* Intro Dialog */}
      <DialogBox
        visible={showIntroDialog && !alreadyCompleted}
        characterImage={require('../../../assets/me.png')}
        characterName="Manitriniaina"
        message={quest.story.intro}
        onClose={handleSkipIntro}
        onComplete={handleSkipIntro}
      />

      {/* Completion Dialog */}
      <DialogBox
        visible={showCompletionDialog}
        characterImage={require('../../../assets/me.png')}
        characterName="Manitriniaina"
        messages={[
          quest.story.completion,
          `Quest Rewards:\n\n${quest.xpReward} XP\n${quest.goldReward} Gold${quest.badge ? `\n${quest.badge.name} Badge` : ''}`,
        ]}
        onClose={handleCompleteQuest}
        onComplete={handleCompleteQuest}
        continueText="Claim"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  progressSection: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  progressTitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  progressCount: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: BORDER_RADIUS.round,
  },
  objectivesSection: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  objectiveChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  objectiveCompleted: {
    backgroundColor: COLORS.success,
  },
  objectiveCurrent: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.gold,
  },
  objectiveNumber: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  currentObjectiveCard: {
    margin: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  objectiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  objectiveLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    textTransform: 'uppercase',
  },
  hintButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.round,
  },
  hintButtonText: {
    color: COLORS.warning,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.medium,
  },
  objectiveDescription: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    marginBottom: SPACING.sm,
  },
  expectedCommand: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.terminalBg,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  expectedLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    marginRight: SPACING.sm,
  },
  expectedText: {
    color: COLORS.terminalText,
    fontFamily: 'monospace',
    fontSize: FONTS.sizes.sm,
  },
  terminalContainer: {
    flex: 1,
    padding: SPACING.md,
  },
  completeOverlay: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.large,
    borderWidth: 2,
    borderColor: COLORS.gold,
  },
  completeIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  completeTitle: {
    color: COLORS.gold,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.lg,
  },
});

export default QuestScreen;
