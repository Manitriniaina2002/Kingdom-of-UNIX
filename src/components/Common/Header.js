/**
 * Common Header Component
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, LAYOUT } from '../../constants/theme';

const Header = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBack = false,
  transparent = false,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + SPACING.sm },
        transparent && styles.transparent,
      ]}
    >
      <View style={styles.content}>
        {/* Left Button */}
        <View style={styles.leftSection}>
          {(showBack || leftIcon) && (
            <TouchableOpacity style={styles.iconButton} onPress={onLeftPress}>
              <Text style={styles.iconText}>
                {showBack ? '←' : leftIcon}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          {title && (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right Button */}
        <View style={styles.rightSection}>
          {rightIcon && (
            <TouchableOpacity style={styles.iconButton} onPress={onRightPress}>
              <Text style={styles.iconText}>{rightIcon}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Custom Children (e.g., search bar, tabs) */}
      {children && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: LAYOUT.headerHeight,
    paddingHorizontal: SPACING.md,
  },
  leftSection: {
    width: 50,
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 50,
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    color: COLORS.textPrimary,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  childrenContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
});

export default Header;
