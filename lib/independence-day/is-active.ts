import { independenceDayConfig } from "./config";

function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isIndependenceDayActive(options?: {
  includePreview?: boolean;
  now?: Date;
}): boolean {
  const { includePreview = true, now = new Date() } = options ?? {};

  if (!independenceDayConfig.enabled) {
    return false;
  }

  if (includePreview && independenceDayConfig.forcePreview) {
    return true;
  }

  const start = parseLocalDate(independenceDayConfig.startDate);
  start.setHours(0, 0, 0, 0);

  const end = parseLocalDate(independenceDayConfig.endDate);
  end.setHours(23, 59, 59, 999);

  return now >= start && now <= end;
}
