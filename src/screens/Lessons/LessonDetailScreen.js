/**
 * Lesson Detail Screen - Read lesson content with styled sections
 * Supports progress tracking, navigation between lessons, and PDF download
 */

import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useLesson } from '../../context/LessonContext';
import { useResponsive, clickable } from '../../utils/responsive';
import { useLanguage } from '../../i18n';
import { downloadLesson } from '../../utils/lessonExporter';
import { getLessonsForLang } from '../../data/lessonsI18n';

export default function LessonDetailScreen({ route, navigation }) {
  const { chapterId, lessonId } = route.params;
  const { completeLesson, isLessonCompleted } = useLesson();
  const { layout, fonts, spacing, isTablet, isDesktop } = useResponsive();
  const { t, language } = useLanguage();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);

  const [downloading, setDownloading] = useState(false);

  const { CHAPTERS, LESSONS, getLessonsByChapter } = getLessonsForLang(language);

  const chapter = CHAPTERS.find(c => c.id === chapterId);
  const lesson = LESSONS[lessonId];
  const chapterLessons = useMemo(
    () => getLessonsByChapter(chapterId),
    [chapterId, language]
  );

  const currentIndex = chapterLessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? chapterLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < chapterLessons.length - 1 ? chapterLessons[currentIndex + 1] : null;
  const completed = isLessonCompleted(lessonId);

  const handleComplete = useCallback(() => {
    completeLesson(lessonId);
  }, [lessonId, completeLesson]);

  const handleNavigate = useCallback((newLessonId) => {
    navigation.replace('LessonDetail', { chapterId, lessonId: newLessonId });
  }, [chapterId, navigation]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadLesson(lesson, chapter?.title, language);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloading(false);
    }
  };

  if (!lesson) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{t('lessons.lessonNotFound')}</Text>
      </View>
    );
  }

  const maxWidth = isDesktop ? 800 : isTablet ? 700 : '100%';

  // Render a content section based on type
  const renderSection = (section, index) => {
    switch (section.type) {
      case 'heading':
        return (
          <Text key={index} style={[styles.sectionHeading, { fontSize: fonts.xl }]}>
            {section.text}
          </Text>
        );

      case 'paragraph':
        return (
          <Text key={index} style={[styles.paragraph, { fontSize: fonts.md }]}>
            {section.text}
          </Text>
        );

      case 'code':
        return (
          <View key={index} style={styles.codeBlock}>
            <Text style={[styles.codePrompt, { fontSize: fonts.sm }]}>
              $ {section.command}
            </Text>
            {section.output ? (
              <Text style={[styles.codeOutput, { fontSize: fonts.sm }]}>
                {section.output}
              </Text>
            ) : null}
          </View>
        );

      case 'tip':
        return (
          <View key={index} style={styles.tipBox}>
            <Text style={[styles.tipText, { fontSize: fonts.sm }]}>
              <Text style={styles.tipLabel}>{t('common.tip')}</Text>
              {section.text}
            </Text>
          </View>
        );

      case 'warning':
        return (
          <View key={index} style={styles.warningBox}>
            <Text style={[styles.warningText, { fontSize: fonts.sm }]}>
              <Text style={styles.warningLabel}>{t('common.warning')}</Text>
              {section.text}
            </Text>
          </View>
        );

      case 'list':
        return (
          <View key={index} style={styles.list}>
            {section.items.map((item, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>•</Text>
                <Text style={[styles.listText, { fontSize: fonts.md }]}>{item}</Text>
              </View>
            ))}
          </View>
        );

      case 'table':
        return (
          <ScrollView key={index} horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                {section.headers.map((h, i) => (
                  <View key={i} style={styles.tableHeaderCell}>
                    <Text style={[styles.tableHeaderText, { fontSize: fonts.sm }]}>{h}</Text>
                  </View>
                ))}
              </View>
              {section.rows.map((row, ri) => (
                <View key={ri} style={styles.tableRow}>
                  {row.map((cell, ci) => (
                    <View key={ci} style={styles.tableCell}>
                      <Text style={[styles.tableCellText, { fontSize: fonts.sm }]}>{cell}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + spacing.md,
            paddingBottom: insets.bottom + spacing.xxxl,
            paddingHorizontal: layout.contentPadding,
          },
        ]}
      >
        <View style={[styles.content, { maxWidth, alignSelf: 'center', width: '100%' }]}>
          {/* Back + actions */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={[styles.backButton, clickable()]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>{t('common.back')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.downloadBtn, clickable()]}
              onPress={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <ActivityIndicator size="small" color={COLORS.secondary} />
              ) : (
                <Text style={[styles.downloadBtnText, { fontSize: fonts.sm }]}>
                  {t('lessons.downloadPdf')}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Chapter label */}
          <Text style={[styles.chapterLabel, { fontSize: fonts.xs, color: chapter?.color || COLORS.textMuted }]}>
            {chapter?.icon} {chapter?.title} — {t('lessons.lessonOf', { current: currentIndex + 1, total: chapterLessons.length })}
          </Text>

          {/* Lesson title */}
          <Text style={[styles.lessonTitle, { fontSize: fonts.xxl }]}>{lesson.title}</Text>

          {/* Meta info */}
          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { fontSize: fonts.xs }]}>
              {lesson.estimatedReadTime || t('lessons.defaultReadTime')}
            </Text>
            {lesson.keyCommands?.length > 0 && (
              <View style={styles.commandTags}>
                {lesson.keyCommands.map((cmd) => (
                  <View key={cmd} style={styles.commandTag}>
                    <Text style={[styles.commandTagText, { fontSize: fonts.xs }]}>{cmd}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Completion badge */}
          {completed && (
            <View style={styles.completedBadge}>
              <Text style={[styles.completedText, { fontSize: fonts.sm }]}>
                {t('lessons.completed')}
              </Text>
            </View>
          )}

          {/* Content sections */}
          <View style={styles.sections}>
            {lesson.content.map(renderSection)}
          </View>

          {/* Examples */}
          {lesson.examples?.length > 0 && (
            <View style={styles.examplesSection}>
              <Text style={[styles.sectionHeading, { fontSize: fonts.xl }]}>{t('lessons.examplesTitle')}</Text>
              {lesson.examples.map((ex, i) => (
                <View key={i} style={styles.exampleCard}>
                  <Text style={[styles.exampleDesc, { fontSize: fonts.md }]}>{ex.description}</Text>
                  <View style={styles.codeBlock}>
                    <Text style={[styles.codePrompt, { fontSize: fonts.sm }]}>$ {ex.input}</Text>
                    {ex.output ? (
                      <Text style={[styles.codeOutput, { fontSize: fonts.sm }]}>{ex.output}</Text>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Practice Exercises */}
          {lesson.practiceExercises?.length > 0 && (
            <View style={styles.exercisesSection}>
              <Text style={[styles.sectionHeading, { fontSize: fonts.xl }]}>{t('lessons.practiceExercises')}</Text>
              {lesson.practiceExercises.map((ex, i) => (
                <View key={i} style={styles.exerciseCard}>
                  <Text style={[styles.exerciseInstruction, { fontSize: fonts.md }]}>
                    {i + 1}. {ex.instruction}
                  </Text>
                  <Text style={[styles.exerciseHint, { fontSize: fonts.sm }]}>
                    Hint: {ex.hint}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Mark Complete Button */}
          {!completed && (
            <TouchableOpacity
              style={[styles.completeButton, clickable()]}
              onPress={handleComplete}
            >
              <Text style={[styles.completeButtonText, { fontSize: fonts.lg }]}>
                {t('lessons.markCompleted')}
              </Text>
            </TouchableOpacity>
          )}

          {/* Navigation */}
          <View style={styles.navRow}>
            {prevLesson ? (
              <TouchableOpacity
                style={[styles.navButton, clickable()]}
                onPress={() => handleNavigate(prevLesson.id)}
              >
                <Text style={[styles.navLabel, { fontSize: fonts.xs }]}>{t('common.previous')}</Text>
                <Text style={[styles.navTitle, { fontSize: fonts.sm }]} numberOfLines={1}>
                  ← {prevLesson.title}
                </Text>
              </TouchableOpacity>
            ) : <View style={styles.navSpacer} />}

            {nextLesson ? (
              <TouchableOpacity
                style={[styles.navButton, styles.navButtonRight, clickable()]}
                onPress={() => handleNavigate(nextLesson.id)}
              >
                <Text style={[styles.navLabel, { fontSize: fonts.xs }]}>{t('common.next')}</Text>
                <Text style={[styles.navTitle, { fontSize: fonts.sm }]} numberOfLines={1}>
                  {nextLesson.title} →
                </Text>
              </TouchableOpacity>
            ) : <View style={styles.navSpacer} />}
          </View>
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.lg,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {},
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  backButton: {
    paddingVertical: SPACING.sm,
    paddingRight: SPACING.md,
  },
  backText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },
  downloadBtn: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  downloadBtnText: {
    color: COLORS.secondary,
    fontWeight: FONTS.weights.medium,
  },
  chapterLabel: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  lessonTitle: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  metaText: {
    color: COLORS.textMuted,
  },
  commandTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  commandTag: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  commandTagText: {
    color: COLORS.terminalText,
    fontFamily: FONTS.terminal,
  },
  completedBadge: {
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    alignSelf: 'flex-start',
    marginBottom: SPACING.lg,
  },
  completedText: {
    color: COLORS.success,
    fontWeight: FONTS.weights.medium,
  },
  sections: {
    marginBottom: SPACING.xl,
  },
  sectionHeading: {
    color: COLORS.secondary,
    fontWeight: FONTS.weights.bold,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  paragraph: {
    color: COLORS.textPrimary,
    lineHeight: 24,
    marginBottom: SPACING.md,
  },
  codeBlock: {
    backgroundColor: COLORS.terminalBg,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  codePrompt: {
    color: COLORS.terminalText,
    fontFamily: FONTS.terminal,
  },
  codeOutput: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.terminal,
    marginTop: SPACING.sm,
  },
  tipBox: {
    backgroundColor: 'rgba(0, 182, 3, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
  },
  tipText: {
    color: COLORS.textPrimary,
  },
  tipLabel: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.bold,
  },
  warningBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.error,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
  },
  warningText: {
    color: COLORS.textPrimary,
  },
  warningLabel: {
    color: COLORS.error,
    fontWeight: FONTS.weights.bold,
  },
  list: {
    marginVertical: SPACING.sm,
    paddingLeft: SPACING.md,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: SPACING.xs,
  },
  listBullet: {
    color: COLORS.primary,
    marginRight: SPACING.sm,
    fontSize: FONTS.sizes.md,
  },
  listText: {
    color: COLORS.textPrimary,
    flex: 1,
  },
  table: {
    marginVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
  },
  tableHeaderCell: {
    padding: SPACING.sm,
    minWidth: 100,
    borderRightWidth: 1,
    borderRightColor: COLORS.surfaceLight,
  },
  tableHeaderText: {
    color: COLORS.secondary,
    fontWeight: FONTS.weights.bold,
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceLight,
  },
  tableCell: {
    padding: SPACING.sm,
    minWidth: 100,
    borderRightWidth: 1,
    borderRightColor: COLORS.surfaceLight,
  },
  tableCellText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.terminal,
  },
  examplesSection: {
    marginBottom: SPACING.xl,
  },
  exampleCard: {
    marginBottom: SPACING.md,
  },
  exampleDesc: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.medium,
    marginBottom: SPACING.xs,
  },
  exercisesSection: {
    marginBottom: SPACING.xl,
  },
  exerciseCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  exerciseInstruction: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.medium,
  },
  exerciseHint: {
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
    fontStyle: 'italic',
  },
  completeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  completeButtonText: {
    color: COLORS.background,
    fontWeight: FONTS.weights.bold,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  navButton: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  navButtonRight: {
    alignItems: 'flex-end',
  },
  navSpacer: {
    flex: 1,
  },
  navLabel: {
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  navTitle: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.medium,
  },
});
