import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Safely parse any date value (Firestore timestamp, ISO string, epoch ms, or Date object).
 * If invalid or unrecognized, returns fallbackDate or current Date. Never throws Invalid time value.
 */
export function toSafeDate(val, fallbackDate = new Date()) {
  if (!val) return fallbackDate;
  if (typeof val?.toDate === "function") {
    try {
      const d = val.toDate();
      return isNaN(d.getTime()) ? fallbackDate : d;
    } catch {
      return fallbackDate;
    }
  }
  if (val instanceof Date) {
    return isNaN(val.getTime()) ? fallbackDate : val;
  }
  const d = new Date(val);
  return isNaN(d.getTime()) ? fallbackDate : d;
}

/**
 * Safely format date into readable string, gracefully supporting human strings like "10 mins ago".
 */
export function formatDateTime(val) {
  if (!val) return "—";
  if (typeof val?.toDate === "function") {
    try {
      return val.toDate().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  }
  if (val instanceof Date) {
    if (isNaN(val.getTime())) return "—";
    return val.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const d = new Date(val);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  // If it's a relative string like "10 mins ago", return it directly
  return String(val);
}
