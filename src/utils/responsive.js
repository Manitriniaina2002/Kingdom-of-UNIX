/**
 * Responsive Design Utilities for UNIX Kingdom
 * Provides hooks and helpers for adaptive layouts across all device sizes
 */

import { useWindowDimensions, Platform, PixelRatio } from 'react-native';
import { useMemo } from 'react';

// ──────────────────────── BREAKPOINTS ────────────────────────

export const BREAKPOINTS = {
  miniPhone: 320,
  phone: 480,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
};

// Base design dimensions (iPhone 14 Pro)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

// ──────────────────────── DEVICE DETECTION ────────────────────────

export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// ──────────────────────── SCALING FUNCTIONS ────────────────────────

/**
 * Scale a size value based on screen width relative to base design
 * Clamped to prevent extreme scaling on very large/small screens
 */
export function rs(size, width = BASE_WIDTH) {
  const scale = width / BASE_WIDTH;
  const clampedScale = Math.max(0.7, Math.min(scale, 1.8));
  const newSize = size * clampedScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * Scale font size - more conservative than general scaling
 */
export function rf(size, width = BASE_WIDTH) {
  const scale = width / BASE_WIDTH;
  const clampedScale = Math.max(0.8, Math.min(scale, 1.5));
  const newSize = size * clampedScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// ──────────────────────── DEVICE TYPE ────────────────────────

export function getDeviceType(width) {
  if (width < BREAKPOINTS.miniPhone) return 'miniPhone';
  if (width < BREAKPOINTS.phone) return 'phone';
  if (width < BREAKPOINTS.tablet) return 'phone';
  if (width < BREAKPOINTS.desktop) return 'tablet';
  return 'desktop';
}

// ──────────────────────── MAIN HOOK ────────────────────────

/**
 * Main responsive hook - provides all responsive values and helpers
 *
 * Usage:
 *   const { deviceType, isTablet, rs, rf, layout } = useResponsive();
 */
export function useResponsive() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const deviceType = getDeviceType(width);
    const isMiniPhone = width < BREAKPOINTS.miniPhone;
    const isPhone = width >= BREAKPOINTS.miniPhone && width < BREAKPOINTS.tablet;
    const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
    const isDesktop = width >= BREAKPOINTS.desktop;
    const isLandscape = width > height;

    // Responsive size scaler bound to current width
    const scale = (size) => rs(size, width);
    const fontScale = (size) => rf(size, width);

    // Grid columns based on device
    const gridColumns = isMiniPhone ? 1 : isPhone ? 2 : isTablet ? 3 : 4;

    // Content max width (prevents overly wide content on desktop)
    const maxContentWidth = isDesktop ? 1200 : isTablet ? 900 : width;

    // Spacing multiplier
    const spacingMultiplier = isMiniPhone ? 0.75 : isPhone ? 1 : isTablet ? 1.25 : 1.5;

    // Font size multiplier
    const fontMultiplier = isMiniPhone ? 0.85 : isPhone ? 1 : isTablet ? 1.1 : 1.2;

    // Layout helpers
    const layout = {
      // Content container
      contentPadding: isMiniPhone ? 8 : isPhone ? 12 : isTablet ? 24 : 32,
      contentMaxWidth: maxContentWidth,

      // Terminal
      terminalHeight: isMiniPhone ? 200 : isPhone ? 280 : isTablet ? 400 : 500,

      // Header
      headerHeight: isMiniPhone ? 50 : isPhone ? 60 : 70,

      // Tab bar
      tabBarHeight: isMiniPhone ? 55 : isPhone ? 60 : isTablet ? 70 : 0, // 0 = sidebar on desktop
      useSidebar: isDesktop,
      sidebarWidth: 240,

      // Cards
      cardMinWidth: isMiniPhone ? 140 : isPhone ? 160 : 200,
      cardColumns: gridColumns,

      // Grid item width calculator
      getGridItemWidth: (columns = gridColumns, gap = 12) => {
        const containerWidth = Math.min(width - (layout.contentPadding * 2), maxContentWidth);
        return (containerWidth - (gap * (columns - 1))) / columns;
      },

      // Modal/dialog width
      dialogWidth: isMiniPhone ? '95%' : isPhone ? '90%' : isTablet ? '70%' : '50%',
      dialogMaxWidth: 600,

      // Navigation type
      navType: isDesktop ? 'sidebar' : 'bottom-tabs',
    };

    // Responsive font sizes
    const fonts = {
      xs: fontScale(10),
      sm: fontScale(12),
      md: fontScale(14),
      lg: fontScale(16),
      xl: fontScale(18),
      xxl: fontScale(24),
      xxxl: fontScale(32),
      title: fontScale(40),
    };

    // Responsive spacing
    const spacing = {
      xs: scale(4),
      sm: scale(8),
      md: scale(12),
      lg: scale(16),
      xl: scale(20),
      xxl: scale(24),
      xxxl: scale(32),
    };

    return {
      // Dimensions
      width,
      height,
      isLandscape,

      // Device type
      deviceType,
      isMiniPhone,
      isPhone,
      isTablet,
      isDesktop,
      isWeb,

      // Scalers
      rs: scale,
      rf: fontScale,
      spacingMultiplier,
      fontMultiplier,

      // Pre-computed responsive values
      layout,
      fonts,
      spacing,

      // Grid helpers
      gridColumns,
      maxContentWidth,
    };
  }, [width, height]);
}

// ──────────────────────── STYLE HELPERS ────────────────────────

/**
 * Create a responsive container style that centers content with max width
 */
export function responsiveContainer(width, maxWidth = 1200, padding = 16) {
  const isWide = width > maxWidth + (padding * 2);
  return {
    flex: 1,
    width: '100%',
    maxWidth: isWide ? maxWidth : undefined,
    alignSelf: isWide ? 'center' : undefined,
    paddingHorizontal: padding,
  };
}

/**
 * Platform-specific style (returns web styles only on web)
 */
export function webStyle(styles) {
  return Platform.OS === 'web' ? styles : {};
}

/**
 * Get cursor style for web
 */
export function clickable() {
  return Platform.OS === 'web' ? { cursor: 'pointer' } : {};
}
