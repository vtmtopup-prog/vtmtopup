"use client";
// src/app/admin/logs/page.jsx
// Real-time admin activity audit log synced with AppContext

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/admin/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Activity } from "lucide-react";
import { cn, formatDateTime } from "@/lib/utils";

const ACTION_COLORS = {
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-300",
  error:   "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-300",
  info:    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300",
};

export default function LogsPage() {
  const { activities } = useApp();
  const [search, setSearch] = useState("");

  const filtered = (activities || []).filter((l) => {
    const q = search.toLowerCase();
    return !q || [l.title, l.desc, l.type].join(" ").toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Activity Log"
        description={`${activities?.length || 0} recent administrative actions logged`}
      />

      <div className="flex justify-end">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search action or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs w-64"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/20">
              <tr>
                {["Timestamp", "Operation / Title", "Log Details", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-14 text-center text-sm text-muted-foreground">
                    <Activity className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    No recent admin activity recorded yet.
                  </td>
                </tr>
              ) : (
                filtered.map((l) => (
                  <tr key={l.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap font-mono">
                      {formatDateTime(l.id || l.time)}
                    </td>
                    <td className="px-4 py-2.5 font-bold text-xs text-foreground">{l.title}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground max-w-md">{l.desc}</td>
                    <td className="px-4 py-2.5">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold border",
                        ACTION_COLORS[l.type] || ACTION_COLORS.info
                      )}>
                        {l.type?.toUpperCase() || "INFO"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
