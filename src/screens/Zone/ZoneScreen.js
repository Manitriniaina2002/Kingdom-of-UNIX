/**
 * Zone Screen - Displays a specific zone with its quests
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useGame } from '../../context/GameContext';
import { ZONES } from '../../data/zones';
import { QUESTS, isQuestUnlocked } from '../../data/quests';
import Header from '../../components/Common/Header';
import QuestCard from '../../components/Quest/QuestCard';
import DialogBox from '../../components/Dialog/DialogBox';
import { GameIcon } from '../../utils/icons';
import { useResponsive, clickable } from '../../utils/responsive';
import { useLanguage } from '../../i18n';

const ZoneScreen = ({ route, navigation }) => {
  const { zoneId } = route.params;
  const insets = useSafeAreaInsets();
  const { completedQuests, isZoneUnlocked, setCurrentZone, getZoneProgress } = useGame();
  const [showIntro, setShowIntro] = useState(false);

  const zone = ZONES[zoneId];
  const zoneQuests = zone?.quests.map(qId => QUESTS[qId]).filter(Boolean) || [];
  const progress = getZoneProgress(zoneId);
  const { layout, fonts, spacing, isTablet, isDesktop, maxContentWidth } = useResponsive();
  const { t } = useLanguage();

  useEffect(() => {
    if (zone) {
      setCurrentZone(zoneId);
      
      // Show intro for first visit to a zone
      const hasCompletedAnyQuest = zone.quests.some(qId => completedQuests.includes(qId));
      if (!hasCompletedAnyQuest) {
        setShowIntro(true);
      }
    }
  }, [zoneId]);

  if (!zone) {
    return (
      <View style={styles.container}>
        <Header title={t('zone.zoneNotFound')} showBack onLeftPress={() => navigation.goBack()} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t('zone.zoneNotExist')}</Text>
        </View>
      </View>
    );
  }

  const handleQuestPress = (quest) => {
    const canStart = isQuestUnlocked(quest.id, completedQuests);
    if (canStart) {
      navigation.navigate('Quest', { questId: quest.id });
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header
        title={zone.name}
        subtitle={t('zone.percentComplete', { pct: progress })}
        showBack
        onLeftPress={() => navigation.goBack()}
        rightIcon=""
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ maxWidth: maxContentWidth, alignSelf: 'center', width: '100%', padding: layout.contentPadding }}
        showsVerticalScrollIndicator={false}
      >
        {/* Zone Header Card */}
        <View style={[styles.zoneHeader, { backgroundColor: zone.color + '20' }]}>
          <View style={styles.zoneIconContainer}>
            <GameIcon name={zone.icon} size={40} color={zone.color || COLORS.primary} />
          </View>
          <Text style={styles.zoneDescription}>{zone.description}</Text>
          
          {/* Commands taught in this zone */}
          <View style={styles.commandsSection}>
            <Text style={styles.commandsTitle}>{t('zone.commandsYouLearn')}</Text>
            <View style={styles.commandsList}>
              {zone.commands.map((cmd, index) => (
                <View key={index} style={styles.commandTag}>
                  <Text style={styles.commandText}>{cmd}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progress}%`, backgroundColor: zone.color }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {t('zone.questsCompletedProgress', { done: zone.quests.filter(qId => completedQuests.includes(qId)).length, total: zone.quests.length })}
            </Text>
          </View>
        </View>

        {/* Story Character */}
        {zone.story && (
          <TouchableOpacity 
            style={styles.npcCard}
            onPress={() => setShowIntro(true)}
          >
            <View style={styles.npcAvatar}>
              <GameIcon name={zone.story.characterEmoji} size={24} color={COLORS.primary} />
            </View>
            <View style={styles.npcContent}>
              <Text style={styles.npcName}>{zone.story.character}</Text>
              <Text style={styles.npcRole}>{t('zone.zoneGuide')}</Text>
            </View>
            <Text style={styles.npcTalk}>{t('zone.talk')}</Text>
          </TouchableOpacity>
        )}

        {/* Quests Section */}
        <View style={styles.questsSection}>
          <Text style={styles.sectionTitle}><GameIcon name="quest" size={20} color={COLORS.primary} /> {t('zone.questsTitle')}</Text>
          
          {zoneQuests.map((quest, index) => {
            const isCompleted = completedQuests.includes(quest.id);
            const isLocked = !isQuestUnlocked(quest.id, completedQuests);
            
            return (
              <View key={quest.id} style={styles.questItem}>
                <View style={styles.questNumber}>
                  <Text style={styles.questNumberText}>{index + 1}</Text>
                  {index < zoneQuests.length - 1 && (
                    <View style={[
                      styles.questLine,
                      isCompleted && styles.questLineCompleted,
                    ]} />
                  )}
                </View>
                <View style={styles.questCardContainer}>
                  <QuestCard
                    quest={quest}
                    isCompleted={isCompleted}
                    isLocked={isLocked}
                    onPress={() => handleQuestPress(quest)}
                  />
                </View>
              </View>
            );
          })}
        </View>

        {/* Zone Completion Reward */}
        {progress === 100 && (
          <View style={styles.completionCard}>
            <GameIcon name="achievement" size={48} color={COLORS.gold} />
            <Text style={styles.completionTitle}>{t('zone.zoneComplete')}</Text>
            <Text style={styles.completionText}>
              {t('zone.zoneCompleteMsg', { name: zone.name })}
            </Text>
          </View>
        )}

        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>

      {/* Zone Intro Dialog */}
      {zone.story && (
        <DialogBox
          visible={showIntro}
          characterImage={require('../../../assets/me.png')}
          characterName="Manitriniaina"
          message={zone.story.intro}
          onClose={() => setShowIntro(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.lg,
  },
  scrollView: {
    flex: 1,
  },
  zoneHeader: {
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  zoneIconContainer: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  zoneIcon: {
    fontSize: 40,
  },
  zoneDescription: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  commandsSection: {
    marginBottom: SPACING.lg,
  },
  commandsTitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  commandsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  commandTag: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    margin: SPACING.xs,
  },
  commandText: {
    color: COLORS.terminalText,
    fontFamily: 'monospace',
    fontSize: FONTS.sizes.sm,
  },
  progressSection: {
    marginTop: SPACING.md,
  },
  progressBar: {
    height: 10,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.round,
  },
  progressText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    textAlign: 'center',
  },
  npcCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  npcAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  npcEmoji: {
    fontSize: 24,
  },
  npcContent: {
    flex: 1,
  },
  npcName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
  npcRole: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  npcTalk: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  questsSection: {
    paddingHorizontal: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.lg,
  },
  questItem: {
    flexDirection: 'row',
  },
  questNumber: {
    alignItems: 'center',
    marginRight: SPACING.md,
    paddingTop: SPACING.md,
  },
  questNumberText: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    textAlign: 'center',
    lineHeight: 28,
    overflow: 'hidden',
  },
  questLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
    marginTop: SPACING.xs,
    marginBottom: -SPACING.md,
  },
  questLineCompleted: {
    backgroundColor: COLORS.success,
  },
  questCardContainer: {
    flex: 1,
  },
  completionCard: {
    margin: SPACING.md,
    padding: SPACING.xl,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gold,
  },
  completionIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  completionTitle: {
    color: COLORS.gold,
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.sm,
  },
  completionText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
  },
});

export default ZoneScreen;
