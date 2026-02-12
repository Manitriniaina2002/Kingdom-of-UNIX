/**
 * Profile Screen - Player stats, achievements, and settings
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { usePlayer } from '../../context/PlayerContext';
import { useGame } from '../../context/GameContext';
import { ACHIEVEMENTS, LEVELS } from '../../data/achievements';
import { COMMANDS } from '../../data/commands';
import Header from '../../components/Common/Header';
import Card from '../../components/Common/Card';
import Badge, { AchievementCard } from '../../components/Badge/Badge';
import Button from '../../components/Common/Button';
import { GameIcon } from '../../utils/icons';

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { 
    xp, 
    gold, 
    level, 
    unlockedAchievements, 
    uniqueCommandsUsed, 
    totalPlayTime,
    soundEnabled,
    hintsEnabled,
    updateSettings,
    resetPlayer,
  } = usePlayer();
  const { 
    completedQuests, 
    unlockedZones, 
    resetGameProgress 
  } = useGame();

  const [activeTab, setActiveTab] = useState('stats');

  // level is an object: { level: 1, title: 'Terminal Newbie', icon: '🌱', xpRequired: 0 }
  const levelNum = level?.level || 1;
  const levelTitle = level?.title || 'Unknown';
  const levelIcon = level?.icon || 'lvl1';

  // Calculate progress
  const currentLevelXP = level?.xpRequired || 0;
  const nextLevelData = LEVELS.find(l => l.level === levelNum + 1);
  const nextLevelXP = nextLevelData?.xpRequired || currentLevelXP;
  const xpProgress = nextLevelXP > currentLevelXP 
    ? ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 
    : 100;

  // Alias for cleaner code
  const achievements = unlockedAchievements || [];
  const learnedCommands = uniqueCommandsUsed || [];

  // Get all achievements with unlock status
  const allAchievements = Object.values(ACHIEVEMENTS).map(cat => 
    Object.values(cat).map(ach => ({
      ...ach,
      unlocked: achievements.includes(ach.id),
    }))
  ).flat();

  const unlockedCount = allAchievements.filter(a => a.unlocked).length;
  const totalAchievements = allAchievements.length;

  // Format play time
  const formatPlayTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Handle reset progress
  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset ALL your progress? This cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive', 
          onPress: () => {
            Alert.alert(
              'Final Confirmation',
              'This will delete all XP, gold, achievements, and quest progress!',
              [
                { text: 'Keep My Progress', style: 'cancel' },
                { 
                  text: 'Delete Everything', 
                  style: 'destructive', 
                  onPress: () => {
                    resetPlayer();
                    resetGameProgress();
                    Alert.alert('Progress Reset', 'Your progress has been reset. Start your journey anew!');
                  }
                },
              ]
            );
          }
        },
      ]
    );
  };

  const renderStatsTab = () => (
    <View>
      {/* Level Card */}
      <Card style={styles.levelCard}>
        <View style={styles.levelHeader}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelNumber}>{levelNum}</Text>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>{levelTitle}</Text>
            <Text style={styles.xpText}>{xp.toLocaleString()} XP</Text>
          </View>
          <View style={styles.goldBox}>
            <GameIcon name="gold" size={16} color={COLORS.gold} style={{ marginRight: SPACING.xs }} />
            <Text style={styles.goldAmount}>{gold}</Text>
          </View>
        </View>
        <View style={styles.xpBar}>
          <View style={[styles.xpFill, { width: `${Math.min(xpProgress, 100)}%` }]} />
        </View>
        <Text style={styles.xpNeeded}>
          {nextLevelXP - xp} XP to Level {levelNum + 1}
        </Text>
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <GameIcon name="challenge" size={24} color={COLORS.primary} style={{ marginBottom: SPACING.xs }} />
          <Text style={styles.statValue}>{completedQuests.length}</Text>
          <Text style={styles.statLabel}>Quests</Text>
        </Card>
        <Card style={styles.statCard}>
          <GameIcon name="map" size={24} color={COLORS.primary} style={{ marginBottom: SPACING.xs }} />
          <Text style={styles.statValue}>{unlockedZones.length}</Text>
          <Text style={styles.statLabel}>Zones</Text>
        </Card>
        <Card style={styles.statCard}>
          <GameIcon name="achievement" size={24} color={COLORS.gold} style={{ marginBottom: SPACING.xs }} />
          <Text style={styles.statValue}>{unlockedCount}</Text>
          <Text style={styles.statLabel}>Badges</Text>
        </Card>
        <Card style={styles.statCard}>
          <GameIcon name="keyboard" size={24} color={COLORS.primary} style={{ marginBottom: SPACING.xs }} />
          <Text style={styles.statValue}>{learnedCommands.length}</Text>
          <Text style={styles.statLabel}>Commands</Text>
        </Card>
      </View>

      {/* Commands Mastery */}
      <Card style={styles.masteryCard}>
        <Text style={styles.cardTitle}>Command Mastery</Text>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>
            {learnedCommands.length}/{Object.keys(COMMANDS).length} Commands
          </Text>
          <Text style={styles.progressPercent}>
            {Math.round((learnedCommands.length / Object.keys(COMMANDS).length) * 100)}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(learnedCommands.length / Object.keys(COMMANDS).length) * 100}%` }
            ]} 
          />
        </View>
        <View style={styles.commandTags}>
          {learnedCommands.slice(0, 8).map(cmd => (
            <View key={cmd} style={styles.commandTag}>
              <Text style={styles.commandTagText}>{cmd}</Text>
            </View>
          ))}
          {learnedCommands.length > 8 && (
            <View style={[styles.commandTag, styles.moreTag]}>
              <Text style={styles.commandTagText}>+{learnedCommands.length - 8}</Text>
            </View>
          )}
        </View>
      </Card>

      {/* Play Time */}
      <Card style={styles.timeCard}>
        <View style={styles.timeRow}>
          <GameIcon name="streak" size={28} color={COLORS.warning} />
          <View>
            <Text style={styles.timeLabel}>Total Play Time</Text>
            <Text style={styles.timeValue}>{formatPlayTime(totalPlayTime)}</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderAchievementsTab = () => (
    <View>
      {/* Achievement Progress */}
      <Card style={styles.achievementProgress}>
        <Text style={styles.cardTitle}><GameIcon name="achievement" size={16} color={COLORS.gold} /> Achievements</Text>
        <Text style={styles.achievementCount}>
          {unlockedCount} / {totalAchievements} Unlocked
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(unlockedCount / totalAchievements) * 100}%` }
            ]} 
          />
        </View>
      </Card>

      {/* Achievement Categories */}
      {Object.entries(ACHIEVEMENTS).map(([category, categoryAchievements]) => (
        <View key={category} style={styles.achievementCategory}>
          <Text style={styles.categoryTitle}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
          {Object.values(categoryAchievements).map(achievement => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              unlocked={achievements.includes(achievement.id)}
            />
          ))}
        </View>
      ))}
    </View>
  );

  const renderSettingsTab = () => (
    <View>
      {/* Preferences */}
      <Card style={styles.settingsCard}>
        <Text style={styles.cardTitle}><GameIcon name="settings" size={16} color={COLORS.textSecondary} /> Preferences</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <GameIcon name="sound" size={18} color={COLORS.primary} />
            <Text style={styles.settingLabel}>Sound Effects</Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={() => updateSettings({ soundEnabled: !soundEnabled })}
            trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '80' }}
            thumbColor={soundEnabled ? COLORS.primary : COLORS.textSecondary}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <GameIcon name="hint" size={18} color={COLORS.warning} />
            <Text style={styles.settingLabel}>Show Hints</Text>
          </View>
          <Switch
            value={hintsEnabled}
            onValueChange={() => updateSettings({ hintsEnabled: !hintsEnabled })}
            trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '80' }}
            thumbColor={hintsEnabled ? COLORS.primary : COLORS.textSecondary}
          />
        </View>
      </Card>

      {/* About */}
      <Card style={styles.settingsCard}>
        <Text style={styles.cardTitle}><GameIcon name="terminal" size={16} color={COLORS.textSecondary} /> About</Text>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Version</Text>
          <Text style={styles.aboutValue}>1.0.0</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Created by</Text>
          <Text style={styles.aboutValue}>Kingdom of UNIX Team</Text>
        </View>
      </Card>

      {/* Danger Zone */}
      <Card style={[styles.settingsCard, styles.dangerCard]}>
        <Text style={styles.dangerTitle}>Danger Zone</Text>
        <Text style={styles.dangerText}>
          Resetting your progress will delete all XP, gold, achievements, and quest progress.
        </Text>
        <Button
          title="Reset All Progress"
          onPress={handleResetProgress}
          variant="danger"
        />
      </Card>
    </View>
  );

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Header */}
      <Header
        title="Profile"
        subtitle={levelTitle}
      />

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {[
          { key: 'stats', label: 'Stats', iconName: 'progress' },
          { key: 'achievements', label: 'Badges', iconName: 'achievement' },
          { key: 'settings', label: 'Settings', iconName: 'settings' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <GameIcon name={tab.iconName} size={16} color={activeTab === tab.key ? COLORS.primary : COLORS.textSecondary} />
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'stats' && renderStatsTab()}
        {activeTab === 'achievements' && renderAchievementsTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.xs,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabIcon: {
    fontSize: FONTS.sizes.md,
  },
  tabLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  activeTabLabel: {
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  levelCard: {
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  levelBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  levelNumber: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  xpText: {
    color: COLORS.gold,
    fontSize: FONTS.sizes.sm,
  },
  goldBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  goldIcon: {
    fontSize: FONTS.sizes.md,
    marginRight: SPACING.xs,
  },
  goldAmount: {
    color: COLORS.gold,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
  xpBar: {
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  xpFill: {
    height: '100%',
    backgroundColor: COLORS.gold,
    borderRadius: BORDER_RADIUS.round,
  },
  xpNeeded: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  statCard: {
    width: '48%',
    padding: SPACING.md,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  masteryCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.sm,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  progressPercent: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: BORDER_RADIUS.round,
  },
  commandTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  commandTag: {
    backgroundColor: COLORS.terminalBg,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  moreTag: {
    backgroundColor: COLORS.primary + '30',
  },
  commandTagText: {
    color: COLORS.terminalText,
    fontFamily: 'monospace',
    fontSize: FONTS.sizes.xs,
  },
  timeCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  timeIcon: {
    fontSize: 28,
  },
  timeLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  timeValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  achievementProgress: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  achievementCount: {
    color: COLORS.gold,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    marginBottom: SPACING.sm,
  },
  achievementCategory: {
    marginBottom: SPACING.lg,
  },
  categoryTitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.sm,
  },
  settingsCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  settingIcon: {
    fontSize: FONTS.sizes.lg,
  },
  settingLabel: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  aboutLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  aboutValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
  },
  dangerCard: {
    borderWidth: 1,
    borderColor: COLORS.error + '50',
    backgroundColor: COLORS.error + '10',
  },
  dangerTitle: {
    color: COLORS.error,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.sm,
  },
  dangerText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.md,
  },
});

export default ProfileScreen;
