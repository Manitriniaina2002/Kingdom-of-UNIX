/**
 * App Navigator - Main navigation structure
 * Supports auth flow, lessons tab, and responsive sidebar on desktop
 */

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { GameIcon } from '../utils/icons';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../utils/responsive';
import { useLanguage } from '../i18n';

// Screens
import HomeScreen from '../screens/Home/HomeScreen';
import WorldMapScreen from '../screens/WorldMap/WorldMapScreen';
import ZoneScreen from '../screens/Zone/ZoneScreen';
import QuestScreen from '../screens/Quest/QuestScreen';
import PracticeScreen from '../screens/Practice/PracticeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import LessonsScreen from '../screens/Lessons/LessonsScreen';
import LessonDetailScreen from '../screens/Lessons/LessonDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

// Custom Tab Bar Icon component
const TabIcon = ({ iconName, label, focused }) => (
  <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    <GameIcon name={iconName} size={22} color={focused ? COLORS.primary : COLORS.textSecondary} />
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
  </View>
);

// Suppress tab label entirely on all platforms
const noLabel = () => null;

// Auth Navigator (Login/Signup)
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'fade',
    }}
  >
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
  </AuthStack.Navigator>
);

// Home Stack Navigator
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="Zone" component={ZoneScreen} />
    <Stack.Screen
      name="Quest"
      component={QuestScreen}
      options={{
        gestureEnabled: false,
      }}
    />
  </Stack.Navigator>
);

// Map Stack Navigator
const MapStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name="WorldMapMain" component={WorldMapScreen} />
    <Stack.Screen name="Zone" component={ZoneScreen} />
    <Stack.Screen
      name="Quest"
      component={QuestScreen}
      options={{
        gestureEnabled: false,
      }}
    />
  </Stack.Navigator>
);

// Lessons Stack Navigator
const LessonsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name="LessonsMain" component={LessonsScreen} />
    <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainTabs = () => {
  const insets = useSafeAreaInsets();
  const { layout } = useResponsive();
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.surfaceLight,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: SPACING.xs,
          ...SHADOWS.medium,
        },
        tabBarShowLabel: false,
        tabBarLabel: () => null,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: noLabel,
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="home" label={t('nav.home')} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{
          tabBarLabel: noLabel,
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="map" label={t('nav.map')} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsStack}
        options={{
          tabBarLabel: noLabel,
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="book" label={t('nav.lessons')} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          tabBarLabel: noLabel,
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="practice" label={t('nav.practice')} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: noLabel,
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="profile" label={t('nav.profile')} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator - shows auth or main based on authentication state
const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require('../../assets/unix-kingdom-logo.png')}
          style={styles.loadingLogo}
          resizeMode="contain"
        />
        <Text style={styles.loadingTitle}>{t('common.appTitle')}</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
  },
  tabIconFocused: {
    backgroundColor: COLORS.primary + '20',
  },
  tabLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.medium,
    marginTop: 2,
  },
  tabLabelFocused: {
    color: COLORS.primary,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogo: {
    width: 56,
    height: 56,
    marginBottom: SPACING.md,
  },
  loadingTitle: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
  },
});

export default AppNavigator;
