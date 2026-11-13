// src/components/admin/StatusBadge.jsx
// Reusable status badge with semantic colors

import { cn } from "@/lib/utils";

const STATUS_MAP = {
  // Orders
  Pending:    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  Processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Completed:  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  Cancelled:  "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
  Failed:     "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
  // Users
  Active:     "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  Banned:     "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
  // Money
  Approved:   "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  Rejected:   "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
  // Generic
  Available:  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  Hidden:     "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
};

export default function StatusBadge({ status }) {
  const cls = STATUS_MAP[status] ?? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        cls
      )}
    >
      {status}
    </span>
  );
}

