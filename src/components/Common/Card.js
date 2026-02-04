/**
 * Common Card Component
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

const Card = ({
  children,
  title,
  subtitle,
  icon,
  onPress,
  variant = 'default', // default, elevated, outlined
  padding = true,
  style,
}) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  const getCardStyle = () => {
    const styles = [cardStyles.base];
    
    switch (variant) {
      case 'elevated':
        styles.push(cardStyles.elevated);
        break;
      case 'outlined':
        styles.push(cardStyles.outlined);
        break;
      default:
        styles.push(cardStyles.default);
    }
    
    if (padding) styles.push(cardStyles.padded);
    
    return styles;
  };

  return (
    <Wrapper
      style={[...getCardStyle(), style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {(title || subtitle || icon) && (
        <View style={cardStyles.header}>
          {icon && <Text style={cardStyles.icon}>{icon}</Text>}
          <View style={cardStyles.headerText}>
            {title && <Text style={cardStyles.title}>{title}</Text>}
            {subtitle && <Text style={cardStyles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
      )}
      {children}
    </Wrapper>
  );
};

const cardStyles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: COLORS.surface,
  },
  elevated: {
    backgroundColor: COLORS.surface,
    ...SHADOWS.medium,
  },
  outlined: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  padded: {
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  icon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
});

export default Card;
