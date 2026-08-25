const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/**
 * Deterministic "D Mon YYYY" for SSR + client hydration.
 * Uses IST so Node (often UTC) and browsers in any timezone match.
 */
export function formatBlogDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const ist = new Date(date.getTime() + IST_OFFSET_MS);
  return `${ist.getUTCDate()} ${MONTHS[ist.getUTCMonth()]} ${ist.getUTCFullYear()}`;
}
