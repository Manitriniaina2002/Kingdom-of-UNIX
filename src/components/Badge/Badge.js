/**
 * Badge Component - Achievement and badge display
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

const Badge = ({
  badge,
  isUnlocked = false,
  onPress,
  size = 'normal',
  showName = true,
  showDescription = false,
}) => {
  if (!badge) return null;

  const badgeSize = size === 'large' ? 80 : size === 'small' ? 40 : 60;
  const iconSize = size === 'large' ? 40 : size === 'small' ? 20 : 30;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        size === 'large' && styles.containerLarge,
        !isUnlocked && styles.lockedContainer,
      ]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View
        style={[
          styles.badgeCircle,
          {
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeSize / 2,
          },
          isUnlocked && styles.unlockedBadge,
          !isUnlocked && styles.lockedBadge,
        ]}
      >
        <Text style={[styles.badgeIcon, { fontSize: iconSize }]}>
          {isUnlocked ? badge.icon : '❓'}
        </Text>
        
        {/* Shine effect for unlocked badges */}
        {isUnlocked && (
          <View style={styles.shineEffect} />
        )}
      </View>

      {showName && (
        <Text
          style={[
            styles.badgeName,
            size === 'small' && styles.badgeNameSmall,
            !isUnlocked && styles.lockedText,
          ]}
          numberOfLines={2}
        >
          {isUnlocked ? badge.name : '???'}
        </Text>
      )}

      {showDescription && isUnlocked && (
        <Text style={styles.badgeDescription} numberOfLines={2}>
          {badge.description}
        </Text>
      )}

      {/* XP Reward indicator */}
      {isUnlocked && badge.xpReward && size !== 'small' && (
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{badge.xpReward} XP</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Achievement Card (larger format for lists)
export const AchievementCard = ({
  achievement,
  isUnlocked = false,
  progress = null,
  onPress,
}) => {
  if (!achievement) return null;

  return (
    <TouchableOpacity
      style={[
        styles.achievementCard,
        !isUnlocked && styles.achievementCardLocked,
      ]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.achievementIcon}>
        <Text style={styles.achievementEmoji}>
          {isUnlocked ? achievement.icon : '🔒'}
        </Text>
      </View>

      <View style={styles.achievementContent}>
        <Text style={[styles.achievementName, !isUnlocked && styles.lockedText]}>
          {achievement.secret && !isUnlocked ? '???' : achievement.name}
        </Text>
        <Text style={[styles.achievementDesc, !isUnlocked && styles.lockedText]}>
          {achievement.secret && !isUnlocked
            ? 'Secret achievement'
            : achievement.description}
        </Text>
        
        {progress !== null && !isUnlocked && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>
        )}
      </View>

      <View style={styles.achievementReward}>
        <Text style={styles.rewardValue}>+{achievement.xpReward}</Text>
        <Text style={styles.rewardLabel}>XP</Text>
      </View>

      {isUnlocked && (
        <View style={styles.checkMark}>
          <Text style={styles.checkEmoji}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: SPACING.sm,
    width: 80,
  },
  containerLarge: {
    width: 100,
  },
  lockedContainer: {
    opacity: 0.6,
  },
  badgeCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  unlockedBadge: {
    backgroundColor: COLORS.gold,
    borderWidth: 3,
    borderColor: '#FFF5CC',
  },
  lockedBadge: {
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 2,
    borderColor: COLORS.textMuted,
  },
  badgeIcon: {
    textAlign: 'center',
  },
  shineEffect: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 40,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ rotate: '45deg' }],
  },
  badgeName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.medium,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  badgeNameSmall: {
    fontSize: 10,
  },
  lockedText: {
    color: COLORS.textMuted,
  },
  badgeDescription: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  xpBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.round,
    marginTop: SPACING.xs,
  },
  xpText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
  },
  // Achievement Card Styles
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  achievementCardLocked: {
    opacity: 0.7,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
  achievementDesc: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  progressBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 2,
    marginRight: SPACING.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  progressText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
  },
  achievementReward: {
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
  rewardValue: {
    color: COLORS.gold,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  rewardLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  checkMark: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.success,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkEmoji: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: FONTS.weights.bold,
  },
});

export default Badge;
