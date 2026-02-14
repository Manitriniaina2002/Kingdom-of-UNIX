/**
 * Theme constants for UNIX Kingdom
 * Dark mode terminal aesthetic with fantasy accents
 */

export const COLORS = {
  // Base colors
  background: '#0D1117',
  surface: '#161B22',
  surfaceLight: '#21262D',
  
  // Terminal colors
  terminalBg: '#0A0E14',
  terminalText: '#00FF41',
  terminalPrompt: '#58A6FF',
  terminalError: '#FF6B6B',
  terminalWarning: '#FFD93D',
  terminalSuccess: '#4ADE80',
  terminalInfo: '#60A5FA',
  
  // Game UI colors
  primary: '#00b603',
  primaryLight: '#33c436',
  secondary: '#06B6D4',
  accent: '#F59E0B',
  gold: '#FFD700',
  
  // Text colors
  textPrimary: '#E6EDF3',
  textSecondary: '#8B949E',
  textMuted: '#6E7681',
  
  // Status colors
  success: '#4ADE80',
  warning: '#FBBF24',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Zone colors
  zoneVillage: '#22C55E',
  zoneCave: '#A855F7',
  zoneForest: '#10B981',
  zoneCastle: '#F59E0B',
  zoneMountain: '#6366F1',
  
  // XP and Level
  xpBar: '#00b603',
  xpBarBg: '#374151',
  levelBadge: '#FFD700',
};

export const FONTS = {
  // Font families (using system fonts for cross-platform)
  primary: 'System',
  terminal: 'monospace',
  heading: 'System',
  
  // Font sizes
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 32,
    title: 40,
  },
  
  // Font weights
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
  glow: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  }),
};

// Animation durations
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Screen dimensions helpers (base values - use useResponsive() for adaptive values)
export const LAYOUT = {
  terminalHeight: 300,
  headerHeight: 60,
  tabBarHeight: 70,
  cardWidth: '90%',
  maxWidth: 400,
  // Responsive layout constants
  maxContentWidth: 1200,
  sidebarWidth: 240,
  authCardMaxWidth: 480,
  lessonContentMaxWidth: 800,
};
