/**
 * Player Stats Bar Component - XP, Level, Gold display
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { usePlayer } from '../../context/PlayerContext';

const PlayerStatsBar = ({ onProfilePress, compact = false }) => {
  const { 
    playerName, 
    avatar, 
    xp, 
    gold, 
    level, 
    levelProgress,
    xpToNextLevel,
    currentStreak,
  } = usePlayer();

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactContainer} onPress={onProfilePress}>
        <View style={styles.compactAvatar}>
          <Text style={styles.compactAvatarText}>{avatar}</Text>
        </View>
        <View style={styles.compactLevel}>
          <Text style={styles.compactLevelText}>{level.level}</Text>
        </View>
        <View style={styles.compactStats}>
          <Text style={styles.compactXP}>⭐ {xp}</Text>
          <Text style={styles.compactGold}>💰 {gold}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* Avatar and Level */}
      <TouchableOpacity style={styles.profileSection} onPress={onProfilePress}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{avatar}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{level.level}</Text>
          </View>
        </View>
        <View style={styles.nameSection}>
          <Text style={styles.playerName} numberOfLines={1}>{playerName}</Text>
          <Text style={styles.levelTitle}>{level.title}</Text>
        </View>
      </TouchableOpacity>

      {/* XP Progress */}
      <View style={styles.xpSection}>
        <View style={styles.xpHeader}>
          <Text style={styles.xpLabel}>XP</Text>
          <Text style={styles.xpValue}>{xp}</Text>
        </View>
        <View style={styles.xpBarContainer}>
          <View style={[styles.xpBar, { width: `${levelProgress}%` }]} />
        </View>
        <Text style={styles.xpToNext}>{xpToNextLevel} XP to next level</Text>
      </View>

      {/* Gold and Streak */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>💰</Text>
          <Text style={styles.statValue}>{gold}</Text>
        </View>
        {currentStreak > 0 && (
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{currentStreak}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: SPACING.sm,
  },
  avatar: {
    fontSize: 36,
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 25,
    overflow: 'hidden',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.gold,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  levelText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
  },
  nameSection: {
    flex: 1,
  },
  playerName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
  levelTitle: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xs,
  },
  xpSection: {
    flex: 1.5,
    paddingHorizontal: SPACING.md,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  xpLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  xpValue: {
    color: COLORS.gold,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
  },
  xpBarContainer: {
    height: 6,
    backgroundColor: COLORS.xpBarBg,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  xpBar: {
    height: '100%',
    backgroundColor: COLORS.xpBar,
    borderRadius: BORDER_RADIUS.round,
  },
  xpToNext: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
    textAlign: 'right',
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    marginLeft: SPACING.xs,
  },
  statIcon: {
    fontSize: 14,
    marginRight: SPACING.xs,
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.round,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  compactAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactAvatarText: {
    fontSize: 16,
  },
  compactLevel: {
    backgroundColor: COLORS.gold,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
    marginRight: SPACING.sm,
  },
  compactLevelText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
  },
  compactStats: {
    flexDirection: 'row',
  },
  compactXP: {
    color: COLORS.gold,
    fontSize: FONTS.sizes.xs,
    marginRight: SPACING.sm,
  },
  compactGold: {
    color: COLORS.gold,
    fontSize: FONTS.sizes.xs,
  },
});

export default PlayerStatsBar;
