import { levels } from "./levels.js";

export const chapters = [
  { name: "開場", startIndex: 0 },
  { name: "1. SRP 單一職責", startIndex: 2 },
  { name: "2. SSOT 唯一真相", startIndex: 11 },
  { name: "3. DRY 不要重複", startIndex: 16 },
  { name: "4. 最小改動", startIndex: 19 },
  { name: "5. AI Coding 原則複習", startIndex: 23 }
];

export function getChapterRange(chapterIndex) {
  const start = chapters[chapterIndex].startIndex;
  const next = chapters[chapterIndex + 1];
  const end = next ? next.startIndex - 1 : levels.length - 1;
  return { start, end };
}

export function getChapterIndexOfLevel(levelIndex) {
  for (let i = chapters.length - 1; i >= 0; i -= 1) {
    if (chapters[i].startIndex <= levelIndex) return i;
  }
  return 0;
}
