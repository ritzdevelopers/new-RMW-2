export interface IndependenceDayConfig {
  /** Master switch. Set to false to fully disable the feature. */
  enabled: boolean;
  /** ISO date (YYYY-MM-DD), inclusive, local time. */
  startDate: string;
  /** ISO date (YYYY-MM-DD), inclusive, local time. */
  endDate: string;
  /**
   * Dev/testing override — when true, the experience is always shown
   * regardless of date. Keep this false in production.
   */
  devOverride: boolean;
  bannerText: string;
}

export const independenceDayConfig: IndependenceDayConfig = {
  enabled: true,
  startDate: "2026-08-10",
  endDate: "2026-08-17",
  devOverride: false,
  bannerText: "🇮🇳 Celebrating India's Independence Day 🇮🇳",
};

export function isIndependenceDayActive(
  config: IndependenceDayConfig = independenceDayConfig,
  referenceDate: Date = new Date()
): boolean {
  if (!config.enabled) return false;
  if (config.devOverride) return true;

  const start = new Date(`${config.startDate}T00:00:00`);
  const end = new Date(`${config.endDate}T23:59:59`);

  return referenceDate >= start && referenceDate <= end;
}
