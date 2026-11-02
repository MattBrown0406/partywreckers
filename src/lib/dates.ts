const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/**
 * Normalise a publish date to ISO 8601 (YYYY-MM-DD) for meta tags and JSON-LD.
 * Accepts ISO strings (returned unchanged) and "Month D, YYYY" strings as used in
 * blog data. Parsing is done by hand so the result never shifts with the timezone
 * of the machine doing the prerender. Returns undefined for anything else.
 */
export const toIsoDate = (value?: string): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed;

  const match = trimmed.match(/^([A-Za-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})$/);
  if (!match) return undefined;

  const monthIndex = MONTHS.findIndex((month) => month.startsWith(match[1].toLowerCase().slice(0, 3)));
  const day = Number(match[2]);
  if (monthIndex === -1 || day < 1 || day > 31) return undefined;

  return `${match[3]}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};
