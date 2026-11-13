"use client";
// src/app/admin/users/page.jsx
// Live Customer Management: Balance & Diamond Adjustments, Ban/Unban

import { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Gem, Wallet, Ban, CheckCircle } from "lucide-react";

function fmt(n) {
  return "৳" + Number(n || 0).toLocaleString("en-US");
}

export default function UsersPage() {
  const { users, adjustUserBalance, adjustUserDiamonds, toggleUserBan } = useApp();
  const [search, setSearch] = useState("");

  // Adjust dialog
  const [adjustTarget, setAdjustTarget] = useState(null); // { user, field: "balance"|"diamonds" }
  const [adjustAmount, setAdjustAmount] = useState("");
  const [adjustType, setAdjustType] = useState("add");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return (users || []).filter(
      (u) => !q || [u.name, u.email, u.phone, u.rankTier].join(" ").toLowerCase().includes(q)
    );
  }, [users, search]);

  const openAdjust = (u, field) => {
    setAdjustTarget({ ...u, field });
    setAdjustAmount("");
    setAdjustType("add");
  };

  const confirmAdjust = () => {
    if (!adjustTarget || !adjustAmount) return;
    const amt = Number(adjustAmount);
    if (!amt || amt <= 0) return;

    if (adjustTarget.field === "balance") {
      adjustUserBalance(adjustTarget.id, amt, adjustType);
    } else {
      adjustUserDiamonds(adjustTarget.id, amt, adjustType);
    }
    setAdjustTarget(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Accounts"
        description={`${users?.length || 0} registered players · Live wallet balance and diamond score adjustments`}
      />

      <div className="flex justify-end">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search customer name, email, phone…"
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
                {["Player Name", "Contact Email", "Wallet Balance", "Total Diamonds", "Tier / Level", "Orders", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    No customers found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-xs text-foreground">{u.name}</div>
                      {u.phone && <div className="text-[11px] text-muted-foreground font-mono">{u.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3 text-xs font-bold text-emerald-600">{fmt(u.balance)}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className="flex items-center gap-1 font-semibold text-blue-600">
                        <Gem className="w-3.5 h-3.5 text-blue-500" />
                        {(u.diamonds || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-muted text-foreground">
                        {u.rankTier || "Bronze"} ({u.level || "LVL 1"})
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold">{u.totalOrders || 0}</td>
                    <td className="px-4 py-3"><StatusBadge status={u.status || "Active"} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                          onClick={() => openAdjust(u, "balance")}
                        >
                          <Wallet className="w-3 h-3 mr-1" />
                          Balance
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs border-blue-300 text-blue-700 hover:bg-blue-50"
                          onClick={() => openAdjust(u, "diamonds")}
                        >
                          <Gem className="w-3 h-3 mr-1" />
                          Diamonds
                        </Button>
                        <Button
                          size="sm"
                          variant={u.status === "Banned" ? "outline" : "ghost"}
                          className={`h-7 px-2 text-xs ${
                            u.status === "Banned"
                              ? "text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                              : "text-rose-600 hover:bg-rose-50"
                          }`}
                          onClick={() => toggleUserBan(u.id)}
                        >
                          {u.status === "Banned" ? (
                            <><CheckCircle className="w-3 h-3 mr-1" />Unban</>
                          ) : (
                            <><Ban className="w-3 h-3 mr-1" />Ban</>
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Adjust Modal */}
      <Dialog open={!!adjustTarget} onOpenChange={(o) => !o && setAdjustTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              Adjust Player {adjustTarget?.field === "balance" ? "Taka Balance" : "Diamonds"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Target account: <strong>{adjustTarget?.name}</strong>
          </p>
          <div className="flex gap-2 py-2">
            <Select value={adjustType} onValueChange={setAdjustType}>
              <SelectTrigger className="w-28 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add (+)</SelectItem>
                <SelectItem value="subtract">Subtract (-)</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              min="1"
              placeholder={adjustTarget?.field === "balance" ? "Amount (৳)" : "Diamonds count"}
              value={adjustAmount}
              onChange={(e) => setAdjustAmount(e.target.value)}
              className="flex-1 h-9 text-sm"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setAdjustTarget(null)}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={!adjustAmount}
              onClick={confirmAdjust}
            >
              Apply Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
