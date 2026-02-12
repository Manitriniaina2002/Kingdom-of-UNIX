/**
 * App Navigator - Main navigation structure
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { GameIcon } from '../utils/icons';

// Screens
import HomeScreen from '../screens/Home/HomeScreen';
import WorldMapScreen from '../screens/WorldMap/WorldMapScreen';
import ZoneScreen from '../screens/Zone/ZoneScreen';
import QuestScreen from '../screens/Quest/QuestScreen';
import PracticeScreen from '../screens/Practice/PracticeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Bar Icon component
const TabIcon = ({ iconName, label, focused }) => (
  <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    <GameIcon name={iconName} size={22} color={focused ? COLORS.primary : COLORS.textSecondary} />
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
  </View>
);

// Suppress tab label entirely on all platforms
const noLabel = () => null;

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
        gestureEnabled: false, // Prevent swipe back during quest
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

// Main Tab Navigator
const MainTabs = () => {
  const insets = useSafeAreaInsets();

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
            <TabIcon iconName="home" label="Home" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{
          tabBarLabel: noLabel,
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="map" label="Map" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          tabBarLabel: noLabel,
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="practice" label="Practice" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: noLabel,
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName="profile" label="Profile" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
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
});

export default AppNavigator;
