/** Indian tricolor palette — use as subtle accents only */
export const TRICOLOR = {
  saffron: "#FF9933",
  white: "#FFFFFF",
  green: "#138808",
  chakra: "#000080",
} as const;

/** Banner height in px — keep in sync with IndependenceDayBanner */
export const INDEPENDENCE_BANNER_HEIGHT_PX = 28;

/** Inclusive active window — adjust these dates each year */
export const INDEPENDENCE_DAY_START = "2026-08-10";
export const INDEPENDENCE_DAY_END = "2026-08-16";

/**
 * Manual testing toggle — set to true to force-show anytime (disable before go-live if outside date window).
 * Also works via NEXT_PUBLIC_ENABLE_INDEPENDENCE_DAY=true or automatically in `npm run dev`.
 */
export const FORCE_INDEPENDENCE_DAY_PREVIEW = true;

/**
 * Preview override:
 * - FORCE_INDEPENDENCE_DAY_PREVIEW in this file
 * - NEXT_PUBLIC_ENABLE_INDEPENDENCE_DAY=true in .env.local
 * - Automatically enabled in development (npm run dev)
 */
export const ENABLE_INDEPENDENCE_DAY_PREVIEW =
  FORCE_INDEPENDENCE_DAY_PREVIEW ||
  process.env.NEXT_PUBLIC_ENABLE_INDEPENDENCE_DAY === "true" ||
  process.env.NODE_ENV === "development";

/**
 * Central Independence Day configuration.
 *
 * Toggle `enabled` to disable the entire experience.
 * Set NEXT_PUBLIC_ENABLE_INDEPENDENCE_DAY=true to preview outside the active window.
 */
export const independenceDayConfig = {
  /** Master switch — set to false to disable everywhere */
  enabled: true,

  /** Development / testing override — see ENABLE_INDEPENDENCE_DAY_PREVIEW */
  forcePreview: ENABLE_INDEPENDENCE_DAY_PREVIEW,

  startDate: INDEPENDENCE_DAY_START,
  endDate: INDEPENDENCE_DAY_END,

  bannerText: "🇮🇳 Celebrating India's 80th Independence Day 🇮🇳",
  bannerHeightPx: INDEPENDENCE_BANNER_HEIGHT_PX,
  colors: TRICOLOR,
} as const;

export type IndependenceDayConfig = typeof independenceDayConfig;
