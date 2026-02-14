/**
 * Profile Screen - Player stats, achievements, settings, and user management
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
import { useAuth } from '../../context/AuthContext';
import { ACHIEVEMENTS, LEVELS } from '../../data/achievements';
import { COMMANDS } from '../../data/commands';
import Header from '../../components/Common/Header';
import Card from '../../components/Common/Card';
import Badge, { AchievementCard } from '../../components/Badge/Badge';
import Button from '../../components/Common/Button';
import { GameIcon } from '../../utils/icons';
import { useResponsive, clickable } from '../../utils/responsive';
import { useLanguage, LANGUAGES } from '../../i18n';

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { layout, fonts, spacing, isTablet, isDesktop, maxContentWidth } = useResponsive();
  const { t, language, setLanguage } = useLanguage();
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
  const {
    currentUser,
    users,
    logout,
    switchUser,
    deleteAccount,
    updateProfile,
  } = useAuth();

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
      t('profile.resetProgress'),
      t('profile.resetConfirmMsg'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.reset'),
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              t('profile.finalConfirmation'),
              t('profile.resetFinalMsg'),
              [
                { text: t('profile.keepProgress'), style: 'cancel' },
                {
                  text: t('profile.deleteEverything'),
                  style: 'destructive',
                  onPress: () => {
                    resetPlayer();
                    resetGameProgress();
                    Alert.alert(t('profile.progressReset'), t('profile.progressResetMsg'));
                  }
                },
              ]
            );
          }
        },
      ]
    );
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      t('profile.logout'),
      t('profile.logoutConfirmMsg'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('profile.logout'), onPress: () => logout() },
      ]
    );
  };

  // Handle switch user
  const handleSwitchUser = async (userId) => {
    try {
      await switchUser(userId);
    } catch (e) {
      Alert.alert(t('common.error'), e.message || t('profile.switchUserFailed'));
    }
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    Alert.alert(
      t('profile.deleteAccount'),
      t('profile.deleteAccountConfirmMsg'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.delete'),
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              t('profile.finalConfirmation'),
              t('profile.deleteUserConfirm', { name: currentUser?.displayName || currentUser?.username }),
              [
                { text: t('profile.keepAccount'), style: 'cancel' },
                {
                  text: t('profile.deleteForever'),
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await deleteAccount(currentUser.id);
                    } catch (e) {
                      Alert.alert(t('common.error'), e.message || t('profile.deleteAccountFailed'));
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const otherUsers = users.filter(u => u.id !== currentUser?.id);

  const renderStatsTab = () => (
    <View>
      {/* User Info Card */}
      <Card style={styles.userCard}>
        <View style={styles.userHeader}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>{currentUser?.avatar || '🧙'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{currentUser?.displayName || t('common.adventurer')}</Text>
            <Text style={styles.userUsername}>@{currentUser?.username || t('common.unknown')}</Text>
            {currentUser?.isGuest && (
              <View style={styles.guestBadge}>
                <Text style={styles.guestBadgeText}>{t('common.guest')}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[styles.logoutButton, clickable()]}
            onPress={handleLogout}
          >
            <GameIcon name="arrow" size={16} color={COLORS.error} />
            <Text style={styles.logoutButtonText}>{t('profile.logout')}</Text>
          </TouchableOpacity>
        </View>
      </Card>

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
          {t('profile.xpToLevel', { xp: nextLevelXP - xp, level: levelNum + 1 })}
        </Text>
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <Card style={[styles.statCard, isDesktop && { width: '23%' }, isTablet && { width: '23%' }]}>
          <GameIcon name="challenge" size={24} color={COLORS.primary} style={{ marginBottom: SPACING.xs }} />
          <Text style={styles.statValue}>{completedQuests.length}</Text>
          <Text style={styles.statLabel}>{t('profile.quests')}</Text>
        </Card>
        <Card style={[styles.statCard, isDesktop && { width: '23%' }, isTablet && { width: '23%' }]}>
          <GameIcon name="map" size={24} color={COLORS.primary} style={{ marginBottom: SPACING.xs }} />
          <Text style={styles.statValue}>{unlockedZones.length}</Text>
          <Text style={styles.statLabel}>{t('profile.zones')}</Text>
        </Card>
        <Card style={[styles.statCard, isDesktop && { width: '23%' }, isTablet && { width: '23%' }]}>
          <GameIcon name="achievement" size={24} color={COLORS.gold} style={{ marginBottom: SPACING.xs }} />
          <Text style={styles.statValue}>{unlockedCount}</Text>
          <Text style={styles.statLabel}>{t('profile.badges')}</Text>
        </Card>
        <Card style={[styles.statCard, isDesktop && { width: '23%' }, isTablet && { width: '23%' }]}>
          <GameIcon name="keyboard" size={24} color={COLORS.primary} style={{ marginBottom: SPACING.xs }} />
          <Text style={styles.statValue}>{learnedCommands.length}</Text>
          <Text style={styles.statLabel}>{t('profile.commands')}</Text>
        </Card>
      </View>

      {/* Commands Mastery */}
      <Card style={styles.masteryCard}>
        <Text style={styles.cardTitle}>{t('profile.commandMastery')}</Text>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>
            {t('profile.commandsProgress', { learned: learnedCommands.length, total: Object.keys(COMMANDS).length })}
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
            <Text style={styles.timeLabel}>{t('profile.totalPlayTime')}</Text>
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
        <Text style={styles.cardTitle}><GameIcon name="achievement" size={16} color={COLORS.gold} /> {t('profile.achievementsTitle')}</Text>
        <Text style={styles.achievementCount}>
          {t('profile.achievementsUnlocked', { done: unlockedCount, total: totalAchievements })}
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
      {/* Switch User Section */}
      {otherUsers.length > 0 && (
        <Card style={styles.settingsCard}>
          <Text style={styles.cardTitle}><GameIcon name="profile" size={16} color={COLORS.primary} /> {t('profile.switchUser')}</Text>
          {otherUsers.map(user => (
            <TouchableOpacity
              key={user.id}
              style={[styles.switchUserRow, clickable()]}
              onPress={() => handleSwitchUser(user.id)}
            >
              <View style={styles.switchUserAvatar}>
                <Text style={styles.switchUserAvatarText}>{user.avatar || '🧙'}</Text>
              </View>
              <View style={styles.switchUserInfo}>
                <Text style={styles.switchUserName}>{user.displayName}</Text>
                <Text style={styles.switchUserUsername}>@{user.username}{user.isGuest ? ` ${t('common.guestSuffix')}` : ''}</Text>
              </View>
              <GameIcon name="arrow" size={16} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </Card>
      )}

      {/* Preferences */}
      <Card style={styles.settingsCard}>
        <Text style={styles.cardTitle}><GameIcon name="settings" size={16} color={COLORS.textSecondary} /> {t('profile.preferences')}</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <GameIcon name="sound" size={18} color={COLORS.primary} />
            <Text style={styles.settingLabel}>{t('profile.soundEffects')}</Text>
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
            <Text style={styles.settingLabel}>{t('profile.showHints')}</Text>
          </View>
          <Switch
            value={hintsEnabled}
            onValueChange={() => updateSettings({ hintsEnabled: !hintsEnabled })}
            trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '80' }}
            thumbColor={hintsEnabled ? COLORS.primary : COLORS.textSecondary}
          />
        </View>
      </Card>

      {/* Language Selector */}
      <Card style={styles.settingsCard}>
        <Text style={styles.cardTitle}><GameIcon name="settings" size={16} color={COLORS.primary} /> {t('profile.language')}</Text>
        <View style={styles.languageGrid}>
          {LANGUAGES.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                language === lang.code && styles.languageOptionActive,
                clickable(),
              ]}
              onPress={() => setLanguage(lang.code)}
            >
              <Text style={styles.languageFlag}>{lang.flag}</Text>
              <Text style={[styles.languageName, language === lang.code && styles.languageNameActive]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Account Actions */}
      <Card style={styles.settingsCard}>
        <Text style={styles.cardTitle}><GameIcon name="profile" size={16} color={COLORS.textSecondary} /> {t('profile.account')}</Text>

        <TouchableOpacity
          style={[styles.accountAction, clickable()]}
          onPress={handleLogout}
        >
          <GameIcon name="arrow" size={18} color={COLORS.textSecondary} />
          <Text style={styles.accountActionText}>{t('profile.logout')}</Text>
        </TouchableOpacity>
      </Card>

      {/* About */}
      <Card style={styles.settingsCard}>
        <Text style={styles.cardTitle}><GameIcon name="terminal" size={16} color={COLORS.textSecondary} /> {t('profile.about')}</Text>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>{t('profile.version')}</Text>
          <Text style={styles.aboutValue}>1.0.0</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>{t('profile.createdBy')}</Text>
          <Text style={styles.aboutValue}>{t('profile.teamName')}</Text>
        </View>
      </Card>

      {/* Danger Zone */}
      <Card style={[styles.settingsCard, styles.dangerCard]}>
        <Text style={styles.dangerTitle}>{t('profile.dangerZone')}</Text>
        <Text style={styles.dangerText}>
          {t('profile.resetWarning')}
        </Text>
        <Button
          title={t('profile.resetAllProgress')}
          onPress={handleResetProgress}
          variant="danger"
        />
        <View style={{ height: SPACING.md }} />
        <Text style={styles.dangerText}>
          {t('profile.deleteAccountWarning')}
        </Text>
        <Button
          title={t('profile.deleteAccount')}
          onPress={handleDeleteAccount}
          variant="danger"
        />
      </Card>
    </View>
  );

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Header */}
      <Header
        title={t('profile.profile')}
        subtitle={currentUser?.displayName || levelTitle}
      />

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {[
          { key: 'stats', label: t('profile.stats'), iconName: 'progress' },
          { key: 'achievements', label: t('profile.badges'), iconName: 'achievement' },
          { key: 'settings', label: t('profile.settings'), iconName: 'settings' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab, clickable()]}
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
        contentContainerStyle={{ maxWidth: maxContentWidth, alignSelf: 'center', width: '100%', paddingHorizontal: layout.contentPadding }}
      >
        {activeTab === 'stats' && renderStatsTab()}
        {activeTab === 'achievements' && renderAchievementsTab()}
        {activeTab === 'settings' && renderSettingsTab()}
        <View style={{ height: SPACING.xxxl }} />
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
  // User card
  userCard: {
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  userAvatarText: {
    fontSize: 28,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
  },
  userUsername: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  guestBadge: {
    backgroundColor: COLORS.warning + '30',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
    marginTop: SPACING.xs,
  },
  guestBadgeText: {
    color: COLORS.warning,
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.bold,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.error + '15',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.error + '30',
  },
  logoutButtonText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  // Level card
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
  // Switch user
  switchUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  switchUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  switchUserAvatarText: {
    fontSize: 20,
  },
  switchUserInfo: {
    flex: 1,
  },
  switchUserName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },
  switchUserUsername: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  // Account actions
  accountAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  accountActionText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
  },
  // Settings
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
  // Language selector
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: SPACING.xs,
  },
  languageOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '15',
  },
  languageFlag: {
    fontSize: 20,
  },
  languageName: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  languageNameActive: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.bold,
  },
});

export default ProfileScreen;
