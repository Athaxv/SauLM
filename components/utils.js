export const cls = (...c) => c.filter(Boolean).join(" ");

export function timeAgo(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const sec = Math.max(1, Math.floor((now - d) / 1000));
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const unitDivisors = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2629800,
    years: 31557600
  }
    const ranges = [
    { limit: 60, unit: "seconds" },
    { limit: 3600, unit: "minutes" },
    { limit: 86400, unit: "hours" },
    { limit: 604800, unit: "days" },
    { limit: 2629800, unit: "weeks" },
    { limit: 31557600, unit: "months" }
  ];

  let unit = "years";
  let value = -Math.floor(sec / unitDivisors.years);
  for (const { limit, unit: u } of ranges) {
    if (sec < limit) {
      unit = u;
      value = -Math.floor(sec / unitDivisors[u]);
      break;
    }
  }
  return rtf.format(value, /** @type {Intl.RelativeTimeFormatUnit} */ (unit));
}

export const makeId = (p) => `${p}${Math.random().toString(36).slice(2, 10)}`;
