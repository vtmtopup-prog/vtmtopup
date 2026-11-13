"use client";
// src/app/admin/leaderboard/page.jsx
// Live Leaderboard & Podium Manager synced with Home Page TopPerformers

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/admin/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Gem, Trophy, RotateCcw, Check, Pencil } from "lucide-react";

const MEDALS = { 1: "🥇 Gold (1st)", 2: "🥈 Silver (2nd)", 3: "🥉 Bronze (3rd)" };

export default function LeaderboardPage() {
  const {
    leaderboard,
    autoCalculateLeaderboard,
    toggleAutoCalculateLeaderboard,
    updateLeaderboardItem,
    resetLeaderboard,
  } = useApp();

  const [editing, setEditing] = useState({});
  const [savedRank, setSavedRank] = useState(null);

  const startEdit = (e) => {
    setEditing((p) => ({
      ...p,
      [e.rank]: {
        name: e.name || "",
        diamonds: e.diamonds || 0,
        level: e.level || "LEVEL 1",
        avatar: e.avatar || "",
      },
    }));
  };

  const handleSave = (rank) => {
    const draft = editing[rank];
    if (!draft) return;
    updateLeaderboardItem(rank, {
      name: draft.name.trim(),
      diamonds: Number(draft.diamonds) || 0,
      level: draft.level.trim(),
      avatar: draft.avatar.trim(),
    });
    setEditing((p) => {
      const n = { ...p };
      delete n[rank];
      return n;
    });
    setSavedRank(rank);
    setTimeout(() => setSavedRank(null), 2000);
  };

  const podium = [1, 2, 3].map((r) => {
    return (leaderboard || []).find((p) => p.rank === r) || {
      rank: r,
      name: `Player ${r}`,
      diamonds: 0,
      level: `LEVEL ${4 - r}`,
      avatar: "",
    };
  });

  const rest = (leaderboard || []).filter((p) => p.rank > 3);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leaderboard & Top Performers"
        description="Manage the 3 Home Page podium performers (Rank 1, 2, 3) and full rankings in real time."
      >
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs gap-1.5"
            onClick={resetLeaderboard}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Podium
          </Button>
        </div>
      </PageHeader>

      {/* Mode Controls */}
      <Card>
        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-foreground">Leaderboard Mode</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {autoCalculateLeaderboard
                ? "Auto-Calculation: Player rankings are automatically calculated based on real completed orders."
                : "Manual Override: You can manually set and edit player names, scores, and tiers for the Home Page podium."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold">
              {autoCalculateLeaderboard ? "Auto Calculate" : "Manual Override"}
            </span>
            <Switch
              checked={autoCalculateLeaderboard}
              onCheckedChange={toggleAutoCalculateLeaderboard}
            />
          </div>
        </CardContent>
      </Card>

      {/* Podium Cards (1, 2, 3) */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Home Page Podium (Rank 1, 2, 3)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {podium.map((e) => {
            const draft = editing[e.rank];
            const isSaved = savedRank === e.rank;
            return (
              <Card
                key={e.rank}
                className={`relative overflow-hidden border-2 ${
                  e.rank === 1
                    ? "border-amber-400 bg-amber-50/20 dark:bg-amber-950/10"
                    : e.rank === 2
                    ? "border-teal-500 bg-teal-50/20 dark:bg-teal-950/10"
                    : "border-amber-700 bg-amber-50/10 dark:bg-amber-950/10"
                }`}
              >
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                    {MEDALS[e.rank]}
                  </CardTitle>
                  <span className="text-xs font-mono text-muted-foreground">Rank #{e.rank}</span>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs">Player Name</Label>
                    <Input
                      value={draft?.name ?? e.name ?? ""}
                      onChange={(ev) =>
                        setEditing((p) => ({
                          ...p,
                          [e.rank]: { ...(p[e.rank] || e), name: ev.target.value },
                        }))
                      }
                      onFocus={() => !draft && startEdit(e)}
                      placeholder="Player Name"
                      className="mt-1 h-8 text-xs font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Diamond Score</Label>
                      <Input
                        type="number"
                        value={draft?.diamonds ?? e.diamonds ?? 0}
                        onChange={(ev) =>
                          setEditing((p) => ({
                            ...p,
                            [e.rank]: { ...(p[e.rank] || e), diamonds: ev.target.value },
                          }))
                        }
                        onFocus={() => !draft && startEdit(e)}
                        className="mt-1 h-8 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Badge / Level</Label>
                      <Input
                        value={draft?.level ?? e.level ?? "LEVEL 1"}
                        onChange={(ev) =>
                          setEditing((p) => ({
                            ...p,
                            [e.rank]: { ...(p[e.rank] || e), level: ev.target.value },
                          }))
                        }
                        onFocus={() => !draft && startEdit(e)}
                        placeholder="PREMIUM"
                        className="mt-1 h-8 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Avatar URL</Label>
                    <Input
                      value={draft?.avatar ?? e.avatar ?? ""}
                      onChange={(ev) =>
                        setEditing((p) => ({
                          ...p,
                          [e.rank]: { ...(p[e.rank] || e), avatar: ev.target.value },
                        }))
                      }
                      onFocus={() => !draft && startEdit(e)}
                      placeholder="https://..."
                      className="mt-1 h-8 text-xs"
                    />
                  </div>
                  <Button
                    size="sm"
                    className="w-full h-8 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleSave(e.rank)}
                  >
                    {isSaved ? <><Check className="w-3.5 h-3.5" /> Saved to Home Page ✓</> : "Save to Podium"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Full Rankings Table (Rank 4+) */}
      {rest.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Remaining Ranked Players (Rank 4+)</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/20">
                <tr>
                  {["Rank", "Player", "Diamonds", "Level", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rest.map((p) => (
                  <tr key={p.rank} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-xs text-muted-foreground">#{p.rank}</td>
                    <td className="px-4 py-2.5 font-medium text-xs">{p.name}</td>
                    <td className="px-4 py-2.5 text-xs text-emerald-600 font-semibold">
                      💎 {(p.diamonds || 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-xs">{p.level || "LEVEL 1"}</td>
                    <td className="px-4 py-2.5">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                        onClick={() => {
                          const newName = prompt("New Player Name:", p.name);
                          if (!newName) return;
                          const newDia = prompt("Diamonds:", p.diamonds);
                          updateLeaderboardItem(p.rank, {
                            name: newName.trim(),
                            diamonds: Number(newDia) || 0,
                          });
                        }}
                      >
                        Quick Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
