/**
 * Quest Card Component - Displays quest information
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { GameIcon } from '../../utils/icons';

const QuestCard = ({
  quest,
  onPress,
  isCompleted = false,
  isLocked = false,
  isActive = false,
  showProgress = true,
  compact = false,
}) => {
  if (!quest) return null;

  const getDifficultyColor = () => {
    switch (quest.difficulty) {
      case 'beginner':
        return COLORS.success;
      case 'intermediate':
        return COLORS.warning;
      case 'advanced':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const getTypeIcon = () => {
    switch (quest.type) {
      case 'tutorial':
        return 'tutorial';
      case 'exploration':
        return 'exploration';
      case 'learning':
        return 'guide';
      case 'puzzle':
        return 'quest';
      case 'challenge':
        return 'challenge';
      case 'boss':
        return 'boss';
      default:
        return 'questDefault';
    }
  };

  const completedObjectives = quest.objectives?.filter(o => o.completed).length || 0;
  const totalObjectives = quest.objectives?.length || 0;
  const progress = totalObjectives > 0 ? (completedObjectives / totalObjectives) * 100 : 0;

  if (compact) {
    return (
      <TouchableOpacity
        style={[
          styles.compactContainer,
          isCompleted && styles.completedContainer,
          isLocked && styles.lockedContainer,
          isActive && styles.activeContainer,
        ]}
        onPress={onPress}
        disabled={isLocked}
        activeOpacity={0.7}
      >
        <View style={[styles.compactIcon, { justifyContent: 'center', alignItems: 'center' }]}>
          {isLocked ? <GameIcon name="locked" size={20} color={COLORS.textMuted} /> : isCompleted ? <GameIcon name="complete" size={20} color={COLORS.success} /> : <GameIcon name={getTypeIcon()} size={20} color={COLORS.primary} />}
        </View>
        <View style={styles.compactContent}>
          <Text style={[styles.compactTitle, isLocked && styles.lockedText]}>
            {quest.name}
          </Text>
          <Text style={styles.compactReward}>
            +{quest.xpReward} XP
          </Text>
        </View>
        {isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isCompleted && styles.completedContainer,
        isLocked && styles.lockedContainer,
        isActive && styles.activeContainer,
      ]}
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.8}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {isLocked ? <GameIcon name="locked" size={24} color={COLORS.textMuted} /> : isCompleted ? <GameIcon name="complete" size={24} color={COLORS.success} /> : <GameIcon name={getTypeIcon()} size={24} color={COLORS.primary} />}
        </View>
        <View style={styles.headerContent}>
          <Text style={[styles.title, isLocked && styles.lockedText]}>
            {quest.name}
          </Text>
          <View style={styles.badges}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
              <Text style={styles.badgeText}>{quest.difficulty}</Text>
            </View>
            <View style={styles.typeBadge}>
              <Text style={styles.badgeText}>{quest.type}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Description */}
      <Text style={[styles.description, isLocked && styles.lockedText]} numberOfLines={2}>
        {isLocked ? 'Complete previous quests to unlock' : quest.description}
      </Text>

      {/* Progress Bar (if active) */}
      {isActive && showProgress && totalObjectives > 0 && (
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {completedObjectives}/{totalObjectives} objectives
          </Text>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.rewards}>
          <Text style={styles.rewardText}><GameIcon name="xp" size={14} color={COLORS.gold} /> {quest.xpReward} XP</Text>
          <Text style={styles.rewardText}><GameIcon name="gold" size={14} color={COLORS.gold} /> {quest.goldReward} Gold</Text>
        </View>
        <View style={styles.timeEstimate}>
          <Text style={styles.timeText}>{quest.estimatedTime}</Text>
        </View>
      </View>

      {/* Status Indicator */}
      {isCompleted && (
        <View style={styles.completedBanner}>
          <Text style={styles.completedText}>COMPLETED</Text>
        </View>
      )}

      {isActive && (
        <View style={styles.activeBanner}>
          <Text style={styles.activeText}>IN PROGRESS</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    ...SHADOWS.medium,
  },
  completedContainer: {
    borderColor: COLORS.success,
    opacity: 0.8,
  },
  lockedContainer: {
    opacity: 0.5,
    borderColor: COLORS.textMuted,
  },
  activeContainer: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 24,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.xs,
  },
  lockedText: {
    color: COLORS.textMuted,
  },
  badges: {
    flexDirection: 'row',
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.xs,
  },
  typeBadge: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  badgeText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.medium,
    textTransform: 'capitalize',
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  progressSection: {
    marginBottom: SPACING.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.round,
  },
  progressText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewards: {
    flexDirection: 'row',
  },
  rewardText: {
    color: COLORS.gold,
    fontSize: FONTS.sizes.sm,
    marginRight: SPACING.md,
  },
  timeEstimate: {},
  timeText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  completedBanner: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  completedText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
  },
  activeBanner: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  activeText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
  },
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  compactIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
  },
  compactContent: {
    flex: 1,
  },
  compactTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },
  compactReward: {
    color: COLORS.gold,
    fontSize: FONTS.sizes.xs,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});

export default QuestCard;
