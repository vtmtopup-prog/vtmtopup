// src/components/admin/KpiCard.jsx
// Clean KPI stat card for the dashboard

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export default function KpiCard({ title, value, icon: Icon, trend, trendLabel, className }) {
  const isPositive = trend === undefined ? null : trend >= 0;

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground leading-none">
              {value}
            </p>
            {trendLabel && (
              <p
                className={cn(
                  "text-xs font-medium",
                  isPositive === null
                    ? "text-muted-foreground"
                    : isPositive
                    ? "text-emerald-600"
                    : "text-rose-600"
                )}
              >
                {isPositive !== null && (isPositive ? "↑ " : "↓ ")}
                {trendLabel}
              </p>
            )}
          </div>
          {Icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

