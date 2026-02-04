/**
 * Common Button Component
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

const Button = ({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'medium', // small, medium, large
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const styles = [buttonStyles.base];
    
    // Variant styles
    switch (variant) {
      case 'secondary':
        styles.push(buttonStyles.secondary);
        break;
      case 'outline':
        styles.push(buttonStyles.outline);
        break;
      case 'ghost':
        styles.push(buttonStyles.ghost);
        break;
      case 'danger':
        styles.push(buttonStyles.danger);
        break;
      case 'success':
        styles.push(buttonStyles.success);
        break;
      default:
        styles.push(buttonStyles.primary);
    }
    
    // Size styles
    switch (size) {
      case 'small':
        styles.push(buttonStyles.small);
        break;
      case 'large':
        styles.push(buttonStyles.large);
        break;
      default:
        styles.push(buttonStyles.medium);
    }
    
    if (fullWidth) styles.push(buttonStyles.fullWidth);
    if (disabled) styles.push(buttonStyles.disabled);
    
    return styles;
  };

  const getTextStyle = () => {
    const styles = [buttonStyles.text];
    
    if (variant === 'outline' || variant === 'ghost') {
      styles.push(buttonStyles.textOutline);
    }
    
    switch (size) {
      case 'small':
        styles.push(buttonStyles.textSmall);
        break;
      case 'large':
        styles.push(buttonStyles.textLarge);
        break;
    }
    
    if (disabled) styles.push(buttonStyles.textDisabled);
    
    return styles;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.textPrimary} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Text style={[buttonStyles.icon, buttonStyles.iconLeft]}>{icon}</Text>
          )}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Text style={[buttonStyles.icon, buttonStyles.iconRight]}>{icon}</Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.small,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    ...SHADOWS.none,
  },
  danger: {
    backgroundColor: COLORS.error,
  },
  success: {
    backgroundColor: COLORS.success,
  },
  small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  medium: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  large: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxl,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.bold,
    fontSize: FONTS.sizes.md,
  },
  textOutline: {
    color: COLORS.primary,
  },
  textSmall: {
    fontSize: FONTS.sizes.sm,
  },
  textLarge: {
    fontSize: FONTS.sizes.lg,
  },
  textDisabled: {
    color: COLORS.textMuted,
  },
  icon: {
    fontSize: 18,
  },
  iconLeft: {
    marginRight: SPACING.sm,
  },
  iconRight: {
    marginLeft: SPACING.sm,
  },
});

// Add none shadow
SHADOWS.none = {
  shadowColor: 'transparent',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
};

export default Button;
