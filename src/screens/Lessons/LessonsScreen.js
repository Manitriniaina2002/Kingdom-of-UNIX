/**
 * Lessons Screen - Browse chapters and lessons
 * Responsive grid layout with progress tracking
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useLesson } from '../../context/LessonContext';
import { useResponsive, clickable } from '../../utils/responsive';
import { useLanguage } from '../../i18n';
import { downloadAllLessons } from '../../utils/lessonExporter';

// Lazy import lessons data to avoid circular dependency issues
let lessonsData = null;
function getLessonsData() {
  if (!lessonsData) {
    lessonsData = require('../../data/lessons');
  }
  return lessonsData;
}

export default function LessonsScreen({ navigation }) {
  const { completedLessons } = useLesson();
  const { layout, fonts, spacing, isTablet, isDesktop, width } = useResponsive();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const [downloading, setDownloading] = useState(false);

  const { CHAPTERS, getAllLessons, getLessonsByChapter, getChapterProgress } = getLessonsData();

  const allLessons = useMemo(() => getAllLessons(), []);

  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return CHAPTERS;
    const q = searchQuery.toLowerCase();
    return CHAPTERS.filter(ch => {
      const chapterLessons = getLessonsByChapter(ch.id);
      return (
        ch.title.toLowerCase().includes(q) ||
        ch.description.toLowerCase().includes(q) ||
        chapterLessons.some(l =>
          l.title.toLowerCase().includes(q) ||
          (l.keyCommands || []).some(c => c.toLowerCase().includes(q))
        )
      );
    });
  }, [searchQuery]);

  const totalProgress = useMemo(() => {
    const total = allLessons.length;
    const completed = completedLessons.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [allLessons, completedLessons]);

  const handleDownloadAll = async () => {
    setDownloading(true);
    try {
      await downloadAllLessons(CHAPTERS, allLessons);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloading(false);
    }
  };

  const gridColumns = isDesktop ? 3 : isTablet ? 2 : 1;
  const cardGap = spacing.md;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + spacing.md,
            paddingBottom: insets.bottom + spacing.xl,
            paddingHorizontal: layout.contentPadding,
            maxWidth: layout.contentMaxWidth,
            alignSelf: 'center',
            width: '100%',
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: fonts.xxl }]}>{t('lessons.unixLessons')}</Text>
          <Text style={[styles.subtitle, { fontSize: fonts.sm }]}>
            {t('lessons.lessonsAcrossChapters', { lessons: allLessons.length, chapters: CHAPTERS.length })}
          </Text>
        </View>

        {/* Overall Progress */}
        <View style={[styles.progressCard, { marginBottom: spacing.lg }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, { fontSize: fonts.md }]}>{t('lessons.overallProgress')}</Text>
            <Text style={[styles.progressPercent, { fontSize: fonts.lg }]}>{totalProgress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${totalProgress}%` }]} />
          </View>
          <Text style={[styles.progressMeta, { fontSize: fonts.xs }]}>
            {t('lessons.lessonsCompleted', { done: completedLessons.length, total: allLessons.length })}
          </Text>
        </View>

        {/* Search + Download */}
        <View style={[styles.actionRow, { marginBottom: spacing.lg }]}>
          <TextInput
            style={[styles.searchInput, { fontSize: fonts.md, flex: 1 }]}
            placeholder={t('lessons.searchPlaceholder')}
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={[styles.downloadButton, clickable()]}
            onPress={handleDownloadAll}
            disabled={downloading}
          >
            {downloading ? (
              <ActivityIndicator size="small" color={COLORS.background} />
            ) : (
              <Text style={[styles.downloadButtonText, { fontSize: fonts.sm }]}>
                {t('lessons.pdf')}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Chapter Grid */}
        <View style={[styles.chapterGrid, { gap: cardGap }]}>
          {filteredChapters.map((chapter) => {
            const chapterLessons = getLessonsByChapter(chapter.id);
            const progress = getChapterProgress(chapter.id, completedLessons);

            return (
              <TouchableOpacity
                key={chapter.id}
                style={[
                  styles.chapterCard,
                  {
                    width: gridColumns === 1 ? '100%' :
                      `${(100 - ((gridColumns - 1) * 2)) / gridColumns}%`,
                    borderLeftColor: chapter.color,
                  },
                  clickable(),
                ]}
                onPress={() => navigation.navigate('LessonDetail', {
                  chapterId: chapter.id,
                  lessonId: chapterLessons[0]?.id,
                })}
              >
                <View style={styles.chapterHeader}>
                  <Text style={styles.chapterIcon}>{chapter.icon}</Text>
                  <View style={styles.chapterBadge}>
                    <Text style={[styles.chapterBadgeText, { fontSize: fonts.xs }]}>
                      {t('lessons.lessonsCount', { count: chapterLessons.length })}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.chapterTitle, { fontSize: fonts.lg }]}>{chapter.title}</Text>
                <Text style={[styles.chapterDesc, { fontSize: fonts.sm }]} numberOfLines={2}>
                  {chapter.description}
                </Text>

                {/* Mini progress */}
                <View style={styles.miniProgress}>
                  <View style={styles.miniProgressBar}>
                    <View
                      style={[
                        styles.miniProgressFill,
                        { width: `${progress.percentage}%`, backgroundColor: chapter.color },
                      ]}
                    />
                  </View>
                  <Text style={[styles.miniProgressText, { fontSize: fonts.xs }]}>
                    {progress.completed}/{progress.total}
                  </Text>
                </View>

                {/* Lesson list preview */}
                {chapterLessons.slice(0, 3).map((lesson, i) => (
                  <TouchableOpacity
                    key={lesson.id}
                    style={styles.lessonPreview}
                    onPress={() => navigation.navigate('LessonDetail', {
                      chapterId: chapter.id,
                      lessonId: lesson.id,
                    })}
                  >
                    <View style={[
                      styles.lessonDot,
                      completedLessons.includes(lesson.id) && styles.lessonDotCompleted,
                    ]} />
                    <Text
                      style={[
                        styles.lessonPreviewText,
                        { fontSize: fonts.sm },
                        completedLessons.includes(lesson.id) && styles.lessonPreviewCompleted,
                      ]}
                      numberOfLines={1}
                    >
                      {lesson.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.bold,
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  progressCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  progressLabel: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.medium,
  },
  progressPercent: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.bold,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressMeta: {
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  actionRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    color: COLORS.textPrimary,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  downloadButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButtonText: {
    color: COLORS.background,
    fontWeight: FONTS.weights.bold,
  },
  chapterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chapterCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderLeftWidth: 4,
    ...SHADOWS.small,
  },
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  chapterIcon: {
    fontSize: 28,
  },
  chapterBadge: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  chapterBadgeText: {
    color: COLORS.textMuted,
  },
  chapterTitle: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.xs,
  },
  chapterDesc: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  miniProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  miniProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  miniProgressText: {
    color: COLORS.textMuted,
  },
  lessonPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  lessonDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.surfaceLight,
    marginRight: SPACING.sm,
  },
  lessonDotCompleted: {
    backgroundColor: COLORS.success,
  },
  lessonPreviewText: {
    color: COLORS.textSecondary,
    flex: 1,
  },
  lessonPreviewCompleted: {
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
});
