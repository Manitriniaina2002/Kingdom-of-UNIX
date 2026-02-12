/**
 * Zone Node Component - Interactive zone on the world map
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { GameIcon } from '../../utils/icons';

const ZoneNode = ({
  zone,
  onPress,
  isUnlocked = false,
  progress = 0,
  isSelected = false,
  size = 'normal',
}) => {
  if (!zone) return null;

  const nodeSize = size === 'large' ? 100 : size === 'small' ? 60 : 80;
  const iconSize = size === 'large' ? 40 : size === 'small' ? 24 : 32;
  const fontSize = size === 'large' ? FONTS.sizes.md : FONTS.sizes.sm;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width: nodeSize, height: nodeSize },
        !isUnlocked && styles.lockedContainer,
        isSelected && styles.selectedContainer,
      ]}
      onPress={onPress}
      disabled={!isUnlocked}
      activeOpacity={0.8}
    >
      {/* Glow Effect for unlocked zones */}
      {isUnlocked && (
        <View
          style={[
            styles.glowEffect,
            { 
              backgroundColor: zone.color,
              width: nodeSize + 20,
              height: nodeSize + 20,
              borderRadius: (nodeSize + 20) / 2,
            },
          ]}
        />
      )}

      {/* Main Node */}
      <View
        style={[
          styles.node,
          {
            width: nodeSize,
            height: nodeSize,
            borderRadius: nodeSize / 2,
            backgroundColor: isUnlocked ? zone.color : COLORS.surfaceLight,
          },
          isSelected && { borderColor: COLORS.gold, borderWidth: 3 },
        ]}
      >
        {isUnlocked ? <GameIcon name={zone.icon} size={iconSize} color="#fff" /> : <GameIcon name="locked" size={iconSize} color={COLORS.textMuted} />}
      </View>

      {/* Progress Ring (if unlocked) */}
      {isUnlocked && progress > 0 && (
        <View style={[styles.progressRing, { width: nodeSize + 8, height: nodeSize + 8 }]}>
          <View
            style={[
              styles.progressArc,
              {
                borderColor: COLORS.gold,
                transform: [{ rotate: `${(progress / 100) * 360}deg` }],
              },
            ]}
          />
        </View>
      )}

      {/* Zone Name */}
      <View style={styles.nameContainer}>
        <Text
          style={[
            styles.zoneName,
            { fontSize },
            !isUnlocked && styles.lockedText,
          ]}
          numberOfLines={2}
        >
          {zone.name}
        </Text>
        
        {/* Progress Text */}
        {isUnlocked && (
          <Text style={styles.progressText}>
            {progress}% Complete
          </Text>
        )}
        
        {/* Locked Text */}
        {!isUnlocked && (
          <Text style={styles.lockText}>
            Level {zone.requiredLevel}
          </Text>
        )}
      </View>

      {/* Completion Star */}
      {isUnlocked && progress === 100 && (
        <View style={styles.completionStar}>
          <GameIcon name="xp" size={14} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: SPACING.md,
  },
  lockedContainer: {
    opacity: 0.6,
  },
  selectedContainer: {},
  glowEffect: {
    position: 'absolute',
    opacity: 0.3,
  },
  node: {
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  icon: {
    textAlign: 'center',
  },
  progressRing: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  progressArc: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 999,
    borderWidth: 3,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  nameContainer: {
    position: 'absolute',
    bottom: -35,
    alignItems: 'center',
    width: 120,
  },
  zoneName: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.bold,
    textAlign: 'center',
  },
  lockedText: {
    color: COLORS.textMuted,
  },
  progressText: {
    color: COLORS.success,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  lockText: {
    color: COLORS.textMuted,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  completionStar: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: COLORS.gold,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  starEmoji: {
    fontSize: 16,
  },
});

export default ZoneNode;
