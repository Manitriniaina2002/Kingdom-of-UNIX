/**
 * Lesson Exporter - Generate PDF/HTML from lesson content
 * Uses expo-print for PDF generation and expo-sharing for file sharing
 */

import { Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const escapeHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Generate styled HTML for a single lesson
 */
export function generateLessonHTML(lesson, chapterTitle = '') {
  const sections = lesson.content.map((section) => {
    switch (section.type) {
      case 'heading':
        return `<h2>${escapeHtml(section.text)}</h2>`;
      case 'paragraph':
        return `<p>${escapeHtml(section.text)}</p>`;
      case 'code':
        return `<div class="code-block">
          <div class="code-prompt">$ ${escapeHtml(section.command)}</div>
          ${section.output ? `<div class="code-output">${escapeHtml(section.output)}</div>` : ''}
        </div>`;
      case 'tip':
        return `<div class="tip-box"><strong>Tip:</strong> ${escapeHtml(section.text)}</div>`;
      case 'warning':
        return `<div class="warning-box"><strong>Warning:</strong> ${escapeHtml(section.text)}</div>`;
      case 'list':
        return `<ul>${section.items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
      case 'table':
        return `<table>
          <thead><tr>${section.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
          <tbody>${section.rows.map(row =>
            `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`
          ).join('')}</tbody>
        </table>`;
      default:
        return '';
    }
  }).join('\n');

  const examples = lesson.examples?.length ? `
    <h2>Examples</h2>
    ${lesson.examples.map(ex => `
      <div class="example">
        <p class="example-desc">${escapeHtml(ex.description)}</p>
        <div class="code-block">
          <div class="code-prompt">$ ${escapeHtml(ex.input)}</div>
          ${ex.output ? `<div class="code-output">${escapeHtml(ex.output)}</div>` : ''}
        </div>
      </div>
    `).join('')}
  ` : '';

  const exercises = lesson.practiceExercises?.length ? `
    <h2>Practice Exercises</h2>
    ${lesson.practiceExercises.map((ex, i) => `
      <div class="exercise">
        <p><strong>${i + 1}.</strong> ${escapeHtml(ex.instruction)}</p>
        <p class="exercise-hint"><em>Hint: ${escapeHtml(ex.hint)}</em></p>
      </div>
    `).join('')}
  ` : '';

  return `
    <div class="lesson">
      ${chapterTitle ? `<p class="chapter-label">${escapeHtml(chapterTitle)}</p>` : ''}
      <h1>${escapeHtml(lesson.title)}</h1>
      <p class="meta">${lesson.estimatedReadTime || ''} | Commands: ${(lesson.keyCommands || []).join(', ') || 'None'}</p>
      ${sections}
      ${examples}
      ${exercises}
    </div>
  `;
}

/**
 * Full HTML document template with dark theme styling
 */
function wrapInDocument(bodyHtml, title = 'Kingdom of UNIX - Lessons') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0D1117; color: #E6EDF3;
      padding: 40px 30px; line-height: 1.7; font-size: 14px;
    }
    h1 { color: #00b603; font-size: 24px; margin-bottom: 8px; border-bottom: 2px solid #21262D; padding-bottom: 12px; }
    h2 { color: #58A6FF; font-size: 18px; margin: 24px 0 12px; }
    p { margin-bottom: 12px; }
    .chapter-label { color: #8B949E; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .meta { color: #6E7681; font-size: 12px; margin-bottom: 20px; }
    .code-block { background: #0A0E14; border: 1px solid #21262D; border-radius: 8px; padding: 12px 16px; margin: 12px 0; font-family: 'Courier New', monospace; font-size: 13px; overflow-x: auto; }
    .code-prompt { color: #00FF41; }
    .code-prompt::before { content: ''; }
    .code-output { color: #8B949E; margin-top: 8px; white-space: pre-wrap; }
    .tip-box { background: rgba(0, 182, 3, 0.1); border-left: 3px solid #00b603; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 12px 0; }
    .warning-box { background: rgba(239, 68, 68, 0.1); border-left: 3px solid #EF4444; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 12px 0; }
    ul { margin: 12px 0 12px 24px; }
    li { margin-bottom: 6px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { border: 1px solid #21262D; padding: 8px 12px; text-align: left; }
    th { background: #161B22; color: #58A6FF; font-weight: 600; }
    td { background: #0D1117; }
    .example { margin-bottom: 16px; }
    .example-desc { color: #E6EDF3; font-weight: 500; }
    .exercise { background: #161B22; border-radius: 8px; padding: 12px 16px; margin: 8px 0; }
    .exercise-hint { color: #6E7681; font-size: 13px; }
    .lesson { margin-bottom: 60px; page-break-after: always; }
    .lesson:last-child { page-break-after: avoid; }
    .cover { text-align: center; padding: 80px 0; }
    .cover h1 { font-size: 36px; border: none; }
    .cover p { color: #8B949E; font-size: 16px; }
    @media print {
      body { background: white; color: #1a1a1a; padding: 20px; }
      .code-block { background: #f5f5f5; border-color: #ddd; }
      .code-prompt { color: #006400; }
      .code-output { color: #555; }
      h1 { color: #006400; }
      h2 { color: #003380; }
      th { background: #eee; color: #003380; }
      td { background: white; }
      .tip-box { background: #f0fff0; }
      .warning-box { background: #fff0f0; }
      .exercise { background: #f5f5f5; }
    }
  </style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;
}

/**
 * Generate complete HTML document for all lessons grouped by chapter
 */
export function generateAllLessonsHTML(chapters, allLessons) {
  const coverHtml = `
    <div class="cover">
      <h1>Kingdom of UNIX</h1>
      <p>Complete UNIX Command Line Course</p>
      <p style="margin-top: 20px; color: #6E7681;">Generated from the Kingdom of UNIX app</p>
    </div>
  `;

  const chaptersHtml = chapters.map(chapter => {
    const chapterLessons = allLessons.filter(l => l.chapterId === chapter.id);
    if (chapterLessons.length === 0) return '';

    const lessonsHtml = chapterLessons
      .sort((a, b) => a.order - b.order)
      .map(lesson => generateLessonHTML(lesson, chapter.title))
      .join('\n');

    return lessonsHtml;
  }).join('\n');

  return wrapInDocument(coverHtml + chaptersHtml, 'Kingdom of UNIX - Complete Course');
}

/**
 * Download a single lesson as PDF
 */
export async function downloadLesson(lesson, chapterTitle = '') {
  const html = wrapInDocument(
    generateLessonHTML(lesson, chapterTitle),
    `Kingdom of UNIX - ${lesson.title}`
  );

  const { uri } = await Print.printToFileAsync({ html });

  const filename = `kingdom-unix-${lesson.id}.pdf`;
  const newUri = FileSystem.documentDirectory + filename;

  await FileSystem.moveAsync({ from: uri, to: newUri });

  if (Platform.OS !== 'web' && await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(newUri, {
      mimeType: 'application/pdf',
      dialogTitle: `Share ${lesson.title}`,
    });
  }

  return newUri;
}

/**
 * Download all lessons as a single PDF document
 */
export async function downloadAllLessons(chapters, allLessons) {
  const html = generateAllLessonsHTML(chapters, allLessons);

  const { uri } = await Print.printToFileAsync({ html });

  const filename = 'kingdom-unix-complete-course.pdf';
  const newUri = FileSystem.documentDirectory + filename;

  await FileSystem.moveAsync({ from: uri, to: newUri });

  if (Platform.OS !== 'web' && await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(newUri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Share Kingdom of UNIX Course',
    });
  }

  return newUri;
}
