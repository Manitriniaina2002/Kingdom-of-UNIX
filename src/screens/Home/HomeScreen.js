/**
 * Home Screen - Main entry point and game hub
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useGame } from '../../context/GameContext';
import { usePlayer } from '../../context/PlayerContext';
import { ZONES, ZONE_ORDER } from '../../data/zones';
import { QUESTS } from '../../data/quests';
import PlayerStatsBar from '../../components/Player/PlayerStatsBar';
import QuestCard from '../../components/Quest/QuestCard';
import Button from '../../components/Common/Button';
import DialogBox from '../../components/Dialog/DialogBox';
import { GameIcon } from '../../utils/icons';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { gameStarted, startGame, completedQuests, unlockedZones, currentQuest } = useGame();
  const { level, playerName, updateStreak } = usePlayer();
  const [showWelcome, setShowWelcome] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Update streak on app open
    updateStreak();

    // Show welcome dialog for new players
    if (!gameStarted) {
      setTimeout(() => setShowWelcome(true), 500);
    }
  }, []);

  const handleStartGame = () => {
    startGame();
    setShowWelcome(false);
    navigation.getParent()?.navigate('Map');
  };

  // Get current progress
  const totalQuests = Object.keys(QUESTS).length;
  const completedCount = completedQuests.length;
  const progressPercent = Math.round((completedCount / totalQuests) * 100);

  // Get suggested next quest
  const getSuggestedQuest = () => {
    for (const zoneId of ZONE_ORDER) {
      const zone = ZONES[zoneId];
      if (!unlockedZones.includes(zoneId)) continue;

      for (const questId of zone.quests) {
        if (!completedQuests.includes(questId)) {
          return QUESTS[questId];
        }
      }
    }
    return null;
  };

  const suggestedQuest = getSuggestedQuest();

  // Get current zone
  const getCurrentZone = () => {
    for (const zoneId of ZONE_ORDER) {
      const zone = ZONES[zoneId];
      if (!unlockedZones.includes(zoneId)) continue;
      
      const zoneQuests = zone.quests;
      const completed = zoneQuests.filter(qId => completedQuests.includes(qId));
      
      if (completed.length < zoneQuests.length) {
        return zone;
      }
    }
    return ZONES[ZONE_ORDER[ZONE_ORDER.length - 1]];
  };

  const currentZone = getCurrentZone();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <GameIcon name="home" size={28} color={COLORS.primary} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Kingdom of UNIX</Text>
            <Text style={styles.subtitle}>Learn by Adventure</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => navigation.getParent()?.navigate('Profile')}
          >
            <GameIcon name="settings" size={22} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Player Stats */}
        <PlayerStatsBar 
          onProfilePress={() => navigation.getParent()?.navigate('Profile')}
        />

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Banner */}
          <View style={styles.welcomeBanner}>
            <Image 
              source={require('../../../assets/ATRIKA.png')}
              style={styles.welcomePhoto}
            />
            <View style={styles.welcomeContent}>
              <Text style={styles.welcomeTitle}>
                Welcome back, {playerName}!
              </Text>
              <Text style={styles.welcomeText}>
                {completedCount === 0 
                  ? 'Your adventure awaits! Start your first quest.'
                  : `You've completed ${completedCount} quest${completedCount === 1 ? '' : 's'}. Keep going!`}
              </Text>
            </View>
          </View>

          {/* Current Zone Card */}
          {currentZone && (
            <TouchableOpacity 
              style={[styles.zoneCard, { backgroundColor: currentZone.color + '20' }]}
              onPress={() => navigation.navigate('Zone', { zoneId: currentZone.id })}
            >
              <View style={styles.zoneHeader}>
                <GameIcon name={currentZone.icon} size={28} color={currentZone.color || COLORS.primary} />
                <View style={styles.zoneInfo}>
                  <Text style={styles.zoneLabel}>Current Zone</Text>
                  <Text style={styles.zoneName}>{currentZone.name}</Text>
                </View>
                <GameIcon name="arrow" size={22} color={COLORS.textSecondary} />
              </View>
              <View style={styles.zoneProgress}>
                <View style={styles.zoneProgressBar}>
                  <View 
                    style={[
                      styles.zoneProgressFill, 
                      { 
                        width: `${(currentZone.quests.filter(qId => completedQuests.includes(qId)).length / currentZone.quests.length) * 100}%`,
                        backgroundColor: currentZone.color,
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.zoneProgressText}>
                  {currentZone.quests.filter(qId => completedQuests.includes(qId)).length}/{currentZone.quests.length} quests
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Suggested Quest */}
          {suggestedQuest && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}><GameIcon name="quest" size={18} color={COLORS.primary} /> Suggested Quest</Text>
              <QuestCard 
                quest={suggestedQuest}
                onPress={() => navigation.navigate('Quest', { questId: suggestedQuest.id })}
              />
            </View>
          )}

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}><GameIcon name="quickAction" size={18} color={COLORS.primary} /> Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => navigation.getParent()?.navigate('Map')}
              >
                <GameIcon name="map" size={28} color={COLORS.primary} />
                <Text style={styles.actionTitle}>World Map</Text>
                <Text style={styles.actionDesc}>Explore zones</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => navigation.getParent()?.navigate('Practice')}
              >
                <GameIcon name="terminal" size={28} color={COLORS.primary} />
                <Text style={styles.actionTitle}>Practice</Text>
                <Text style={styles.actionDesc}>Free terminal</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => navigation.getParent()?.navigate('Profile')}
              >
                <GameIcon name="guide" size={28} color={COLORS.primary} />
                <Text style={styles.actionTitle}>Commands</Text>
                <Text style={styles.actionDesc}>Learn more</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => navigation.getParent()?.navigate('Profile')}
              >
                <GameIcon name="achievement" size={28} color={COLORS.primary} />
                <Text style={styles.actionTitle}>Achievements</Text>
                <Text style={styles.actionDesc}>{completedCount} earned</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Overall Progress */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}><GameIcon name="progress" size={18} color={COLORS.primary} /> Overall Progress</Text>
            <View style={styles.progressCard}>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Quests Completed</Text>
                <Text style={styles.progressValue}>{completedCount}/{totalQuests}</Text>
              </View>
              <View style={styles.overallProgressBar}>
                <View style={[styles.overallProgressFill, { width: `${progressPercent}%` }]} />
              </View>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Zones Unlocked</Text>
                <Text style={styles.progressValue}>{unlockedZones.length}/{ZONE_ORDER.length}</Text>
              </View>
            </View>
          </View>

          <View style={{ height: SPACING.xxxl }} />
        </ScrollView>
      </Animated.View>

      {/* Welcome Dialog */}
      <DialogBox
        visible={showWelcome}
        characterImage={require('../../../assets/me.png')}
        characterName="Manitriniaina"
        messages={[
          "Greetings, young traveler! Welcome to the Kingdom of UNIX!",
          "I am Manitriniaina, your guide on this magical journey into the world of computers.",
          "Here, you'll learn the ancient art of the Command Line through quests and adventures!",
          "Don't worry if you've never used a computer terminal before - we start from the very beginning!",
          "Are you ready to begin your adventure? The Village of Files awaits!",
        ]}
        onClose={() => setShowWelcome(false)}
        onComplete={handleStartGame}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  logo: {
    fontSize: 40,
    marginRight: SPACING.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
    marginTop: SPACING.md,
  },
  welcomeBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  welcomePhoto: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  welcomeText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.xs,
  },
  zoneCard: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  zoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoneIcon: {
    fontSize: 36,
    marginRight: SPACING.md,
  },
  zoneInfo: {
    flex: 1,
  },
  zoneLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    textTransform: 'uppercase',
  },
  zoneName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  zoneArrow: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xxl,
  },
  zoneProgress: {
    marginTop: SPACING.md,
  },
  zoneProgressBar: {
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  zoneProgressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.round,
  },
  zoneProgressText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    textAlign: 'right',
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  actionCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    margin: '1%',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  actionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
  actionDesc: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  progressCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  progressLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  progressValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  overallProgressBar: {
    height: 12,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  overallProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.round,
  },
});

export default HomeScreen;
