import {
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears
} from "date-fns";

export function getSmartDateDiff(from: Date, to = new Date()) {
  const days = differenceInDays(to, from);

  if (days < 7) {
    return `${days} ${days !== 1 ? "zile" : "zi"}`;
  }

  const weeks = differenceInWeeks(to, from);
  if (weeks < 5) {
    return `${weeks} ${weeks !== 1 ? "săptămâni" : "săptămână"}`;
  }

  const months = differenceInMonths(to, from);
  if (months < 12) {
    return `${months} ${months !== 1 ? "luni" : "lună"}`;
  }

  const years = differenceInYears(to, from);
  return `${years} ${years !== 1 ? "ani" : "an"}`;
}