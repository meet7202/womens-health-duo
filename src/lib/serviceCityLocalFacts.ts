/**
 * City-level facts for `/online-consultation/:city/:service` pages, computed from data we
 * already hold (country, verified practice hours) so each page carries something specific to
 * the reader's location without invented local claims.
 */
const INDIA_TIME_ZONE = "Asia/Kolkata";

/** Countries with a single civil time zone across the cities we list. */
const SINGLE_ZONE_BY_COUNTRY: Record<string, string> = {
  IN: INDIA_TIME_ZONE,
  GB: "Europe/London",
  IE: "Europe/Dublin",
  SG: "Asia/Singapore",
  HK: "Asia/Hong_Kong",
  JP: "Asia/Tokyo",
  KR: "Asia/Seoul",
  TW: "Asia/Taipei",
  IL: "Asia/Jerusalem",
  DE: "Europe/Berlin",
  FR: "Europe/Paris",
  NL: "Europe/Amsterdam",
  BE: "Europe/Brussels",
  CH: "Europe/Zurich",
  AT: "Europe/Vienna",
  LU: "Europe/Luxembourg",
  SE: "Europe/Stockholm",
  NO: "Europe/Oslo",
  DK: "Europe/Copenhagen",
  FI: "Europe/Helsinki",
  IT: "Europe/Rome",
  ES: "Europe/Madrid",
  PT: "Europe/Lisbon",
  AE: "Asia/Dubai",
  SA: "Asia/Riyadh",
  QA: "Asia/Qatar",
  BH: "Asia/Bahrain",
  KW: "Asia/Kuwait",
  OM: "Asia/Muscat",
  NZ: "Pacific/Auckland",
};

/** Fixed reference dates so the copy does not change with the build or view date. */
const JANUARY = Date.UTC(2026, 0, 15, 12);
const JULY = Date.UTC(2026, 6, 15, 12);

/** India practice hours, minutes after midnight IST (`PRACTICE_HOURS_LINE`). */
const OPEN_IST_MINUTES = 9 * 60;
const CLOSE_IST_MINUTES = 18 * 60;

function offsetMinutes(timeZone: string, at: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(new Date(at));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUtc - at) / 60000);
}

function clock(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  const suffix = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${mm} ${suffix}`;
}

function hoursInZone(timeZone: string, at: number): string {
  const shift = offsetMinutes(timeZone, at) - offsetMinutes(INDIA_TIME_ZONE, at);
  return `${clock(OPEN_IST_MINUTES + shift)} to ${clock(CLOSE_IST_MINUTES + shift)}`;
}

export type ServiceCityLocalFacts = {
  /** One sentence on when practice hours fall in the reader's local time. */
  timeZoneLine: string;
};

export function virtualServiceCityLocalFacts(
  city: string,
  countryCode: string,
): ServiceCityLocalFacts {
  const code = countryCode.toUpperCase();
  if (code === "IN") {
    return {
      timeZoneLine: `${city} is on India Standard Time, the same as the practice. Practice hours are Monday to Saturday, 9:00 AM to 6:00 PM.`,
    };
  }
  const zone = SINGLE_ZONE_BY_COUNTRY[code];
  if (!zone) {
    return {
      timeZoneLine: `Practice hours are Monday to Saturday, 9:00 AM to 6:00 PM India time. ${city} is in a country with several time zones, so give your local time zone when you book.`,
    };
  }
  const jan = hoursInZone(zone, JANUARY);
  const jul = hoursInZone(zone, JULY);
  const when =
    jan === jul
      ? `${jan} in ${city}`
      : `${jan} in ${city} in January and ${jul} in July, because of daylight saving`;
  return {
    timeZoneLine: `Practice hours are Monday to Saturday, 9:00 AM to 6:00 PM India time. That is ${when}.`,
  };
}
