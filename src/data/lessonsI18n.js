/**
 * Language-aware lesson data loader
 * Returns the appropriate lesson data based on the current language
 */

import * as en from './lessons';
import * as fr from './lessons_fr';
import * as mg from './lessons_mg';

const lessonsMap = { en, fr, mg };

/**
 * Get lesson data for a given language code
 * @param {string} langCode - 'en', 'fr', or 'mg'
 * @returns {{ CHAPTERS, LESSONS, getAllLessons, getLessonsByChapter, getChapterProgress }}
 */
export function getLessonsForLang(langCode = 'en') {
  return lessonsMap[langCode] || lessonsMap.en;
}
