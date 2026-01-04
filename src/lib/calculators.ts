// src/lib/calculators.ts
import type { CategoryData } from '@/data/categoryData';

export type FlatCalculator = {
  id: string;
  name: string;
  category: string;
  path: string;
  keywords: string[];
};

export type SearchResult = { item: FlatCalculator; score: number };
export type Suggestion = { text: string; item: FlatCalculator };
export type SearchOutcome = { results: SearchResult[]; suggestion?: Suggestion };

// ----------------- utils -----------------
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const tokenize = (s: string) =>
  s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

const makeKeywords = (name: string, category: string, path?: string): string[] => {
  const base = `${name} ${category} ${path ?? ''}`;
  return Array.from(new Set(tokenize(base)));
};

// Damerau–Levenshtein edit distance (handles transpositions)
const editDistance = (a: string, b: string): number => {
  const al = a.length, bl = b.length;
  if (!al) return bl;
  if (!bl) return al;

  const dp = Array.from({ length: al + 1 }, () => Array(bl + 1).fill(0));
  for (let i = 0; i <= al; i++) dp[i][0] = i;
  for (let j = 0; j <= bl; j++) dp[0][j] = j;

  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,     // deletion
        dp[i][j - 1] + 1,     // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
      // transposition
      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
      }
    }
  }
  return dp[al][bl];
};

// Common query typos (extend as you see real analytics)
const COMMON_MISSPELLINGS: Record<string, string> = {
  mortage: 'mortgage',
  morgage: 'mortgage',
  intrest: 'interest',
  proten: 'protein',
  protiens: 'protein',
  calclator: 'calculator',
  calcualtor: 'calculator',
  precentage: 'percentage',
  stoichometry: 'stoichiometry',
  hexa: 'hex',
};

const normalizeQuery = (q: string) =>
  tokenize(q).map((w) => COMMON_MISSPELLINGS[w] || w).join(' ');

// ----------------- flatten -----------------
export const flattenCalculators = (categories: CategoryData[]): FlatCalculator[] => {
  const out: FlatCalculator[] = [];
  const seenPath = new Set<string>();   // global de-dupe by path
  const seenId = new Set<string>();     // ensure IDs are unique even for '#' items

  for (const cat of categories) {
    for (const c of cat.calculators) {
      const name = c.name;
      const path = c.link;

      // Skip duplicates that point to the exact same route
      if (path !== '#' && seenPath.has(path)) continue;
      if (path !== '#') seenPath.add(path);

      // Generate a unique id; prefer last URL segment
      let id =
        path && path !== '#'
          ? (path.split('/').filter(Boolean).pop() as string)
          : slugify(name);

      // If this id already exists (e.g., two '#' items named the same), make it unique
      if (seenId.has(id)) id = `${id}-${slugify(cat.slug)}`;
      seenId.add(id);

      out.push({
        id,
        name,
        category: cat.title,
        path,
        keywords: makeKeywords(name, cat.title, path),
      });
    }
  }
  return out;
};


// ----------------- search -----------------
const scoreItem = (item: FlatCalculator, query: string): number => {
  const qTokens = tokenize(query);
  if (!qTokens.length) return 0;

  const name = item.name.toLowerCase();
  const fields = [
    name,
    item.category.toLowerCase(),
    item.path.toLowerCase(),
    ...item.keywords,
  ].join(' ');

  const fTokens = tokenize(fields);
  if (!fTokens.length) return 0;

  // Bonuses for better ranking
  let bonus = 0;
  if (name.includes(query.toLowerCase())) bonus += 0.5; // phrase-in-name bonus
  for (const qt of qTokens) {
    if (fields.includes(qt)) bonus += 0.2; // token present
  }

  // Best token distance for each query token
  const perToken = qTokens.map((qt) => {
    let best = Infinity;
    for (const ft of fTokens) {
      const d = editDistance(qt, ft);
      if (d < best) best = d;
    }
    // Normalize by query token length
    const norm = 1 - Math.min(best, qt.length) / Math.max(qt.length, 1);
    return norm; // 0..1
  });

  const avg = perToken.reduce((a, b) => a + b, 0) / perToken.length;
  return Math.max(0, Math.min(1, avg + bonus));
};

export const searchCalculators = (
  queryRaw: string,
  list: FlatCalculator[],
  opts?: { threshold?: number; max?: number }
): SearchOutcome => {
  const threshold = opts?.threshold ?? 0.30; // slightly forgiving
  const max = opts?.max ?? 20;

  const qtrim = queryRaw.trim();
  if (!qtrim) return { results: [], suggestion: undefined }; // no suggestion on empty

  const normalized = normalizeQuery(qtrim);

  const scored = list
    .map((item) => ({ item, score: scoreItem(item, normalized) }))
    .filter((r) => r.score >= threshold)
    .sort((a, b) => b.score - a.score);

  const results = scored.slice(0, max);

  // Build a suggestion (clickable) if we typo-corrected or got no hits
  const rawTokens = tokenize(qtrim);
  const normTokens = tokenize(normalized);

  const nearestByName = (): FlatCalculator | undefined => {
    const q = normalized;
    let best: { s: number; item: FlatCalculator } | null = null;
    for (const it of list) {
      const d = editDistance(slugify(q), slugify(it.name));
      const s = 1 - Math.min(d, q.length) / Math.max(q.length, 1);
      if (!best || s > best.s) best = { s, item: it };
    }
    return best?.item;
  };

  let suggestion: Suggestion | undefined;
  if (rawTokens.join(' ') !== normTokens.join(' ')) {
    // We normalized (corrected) the query — suggest that + best match
    const item = results[0]?.item ?? nearestByName();
    if (item) suggestion = { text: normTokens.join(' '), item };
  } else if (results.length === 0) {
    // No hits — suggest nearest calculator name
    const item = nearestByName();
    if (item) suggestion = { text: item.name.toLowerCase(), item };
  }

  return { results, suggestion };
};
