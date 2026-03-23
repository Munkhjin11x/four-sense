/** Mongolia timezone (Ulaanbaatar) - UTC+8, no DST */
export const MONGOLIA_TIMEZONE = "Asia/Ulaanbaatar";

export function toMongoliaISOString(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: MONGOLIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";

  const year = get("year");
  const month = get("month");
  const day = get("day");
  const hour = get("hour");
  const minute = get("minute");
  const second = get("second");

  return `${year}-${month}-${day}T${hour}:${minute}:${second}+08:00`;
}

export function toMongoliaDateTimeString(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: MONGOLIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";

  const year = get("year");
  const month = get("month");
  const day = get("day");
  const hour = get("hour");
  const minute = get("minute");
  const second = get("second");

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

/**
 * Parse "YYYY-MM-DD HH:mm:ss" as Mongolia local time.
 * Use when displaying order dates stored in DB (they are in Mongolia timezone).
 */
export function parseMongoliaDateTime(dateStr: string): Date {
  const normalized = dateStr.replace(" ", "T") + "+08:00";
  return new Date(normalized);
}

/**
 * Check if a date falls on today in Mongolia timezone.
 */
export function isMongoliaToday(date: Date): boolean {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: MONGOLIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date) === formatter.format(new Date());
}

/**
 * Check if a date/time is in the past (before now) in Mongolia timezone.
 */
export function isMongoliaPast(date: Date): boolean {
  const dateStr = toMongoliaDateTimeString(date);
  const nowStr = toMongoliaDateTimeString(new Date());
  return dateStr < nowStr;
}

/**
 * Get the start of today (midnight) in Mongolia timezone as a Date.
 * Use for disabling past dates in calendar.
 */
export function getMongoliaTodayStart(): Date {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: MONGOLIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(new Date());
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "01";
  const str = `${get("year")}-${get("month")}-${get("day")}T00:00:00+08:00`;
  return new Date(str);
}

export function getMongoliaNowTimeString(): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: MONGOLIA_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(new Date());
  const hour = parts.find((p) => p.type === "hour")?.value ?? "00";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
  return `${hour}:${minute}`;
}
