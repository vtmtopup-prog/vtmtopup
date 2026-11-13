"use client";
// src/app/admin/settings/page.jsx
// Live Gateway config + Site notice + Maintenance toggle synced with website

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/admin/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, AlertTriangle, Check } from "lucide-react";

function SettingSection({ title, description, children }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  const { gatewaySettings, updateGatewaySettings, siteSettings, updateSiteSettings } = useApp();

  const [gw, setGw] = useState(gatewaySettings || {});
  const [st, setSt] = useState(siteSettings || {});
  const [savedGw, setSavedGw] = useState(false);
  const [savedSt, setSavedSt] = useState(false);

  useEffect(() => {
    if (gatewaySettings) setGw(gatewaySettings);
  }, [gatewaySettings]);

  useEffect(() => {
    if (siteSettings) setSt(siteSettings);
  }, [siteSettings]);

  const handleGwSave = () => {
    updateGatewaySettings(gw);
    setSavedGw(true);
    setTimeout(() => setSavedGw(false), 2000);
  };

  const handleSiteSave = () => {
    updateSiteSettings(st);
    setSavedSt(true);
    setTimeout(() => setSavedSt(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader
        title="Settings & System Configuration"
        description="Configure payment numbers, deposit limits, site-wide marquee announcements, and maintenance mode in real time."
      />

      {/* Gateway Settings */}
      <SettingSection
        title="Payment Gateways"
        description="Configure bKash, Nagad, and Rocket numbers shown on the /add-money deposit page."
      >
        <div className="space-y-5">
          {/* bKash */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-foreground">bKash Gateway</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{gw.bkashActive ? "Active" : "Disabled"}</span>
                <Switch
                  checked={!!gw.bkashActive}
                  onCheckedChange={(v) => setGw((p) => ({ ...p, bkashActive: v }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">bKash Number</Label>
                <Input
                  value={gw.bkashNumber || ""}
                  onChange={(e) => setGw((p) => ({ ...p, bkashNumber: e.target.value }))}
                  placeholder="01XXX-XXXXXX"
                  className="mt-1 h-8 text-xs font-mono"
                />
              </div>
              <div>
                <Label className="text-xs">Account Type</Label>
                <Select value={gw.bkashType || "Personal"} onValueChange={(v) => setGw((p) => ({ ...p, bkashType: v }))}>
                  <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personal" className="text-xs">Personal</SelectItem>
                    <SelectItem value="Merchant" className="text-xs">Merchant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Nagad */}
          <div className="space-y-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-foreground">Nagad Gateway</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{gw.nagadActive ? "Active" : "Disabled"}</span>
                <Switch
                  checked={!!gw.nagadActive}
                  onCheckedChange={(v) => setGw((p) => ({ ...p, nagadActive: v }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Nagad Number</Label>
                <Input
                  value={gw.nagadNumber || ""}
                  onChange={(e) => setGw((p) => ({ ...p, nagadNumber: e.target.value }))}
                  placeholder="01XXX-XXXXXX"
                  className="mt-1 h-8 text-xs font-mono"
                />
              </div>
              <div>
                <Label className="text-xs">Account Type</Label>
                <Select value={gw.nagadType || "Merchant"} onValueChange={(v) => setGw((p) => ({ ...p, nagadType: v }))}>
                  <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personal" className="text-xs">Personal</SelectItem>
                    <SelectItem value="Merchant" className="text-xs">Merchant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Rocket */}
          <div className="space-y-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-foreground">Rocket Gateway</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{gw.rocketActive ? "Active" : "Disabled"}</span>
                <Switch
                  checked={!!gw.rocketActive}
                  onCheckedChange={(v) => setGw((p) => ({ ...p, rocketActive: v }))}
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Rocket Number</Label>
              <Input
                value={gw.rocketNumber || ""}
                onChange={(e) => setGw((p) => ({ ...p, rocketNumber: e.target.value }))}
                placeholder="01XXX-XXXXXX"
                className="mt-1 h-8 text-xs font-mono"
              />
            </div>
          </div>

          {/* Limits */}
          <div className="space-y-3 pt-3 border-t border-border">
            <h4 className="text-xs font-bold text-foreground">Deposit Limits</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Minimum Deposit (৳)</Label>
                <Input
                  type="number"
                  value={gw.minAddMoney || 25}
                  onChange={(e) => setGw((p) => ({ ...p, minAddMoney: Number(e.target.value) }))}
                  className="mt-1 h-8 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Maximum Deposit (৳)</Label>
                <Input
                  type="number"
                  value={gw.maxAddMoney || 25000}
                  onChange={(e) => setGw((p) => ({ ...p, maxAddMoney: Number(e.target.value) }))}
                  className="mt-1 h-8 text-xs"
                />
              </div>
            </div>
          </div>

          <Button size="sm" className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={handleGwSave}>
            {savedGw ? <><Check className="w-3.5 h-3.5" /> Saved ✓</> : <><Save className="w-3.5 h-3.5" /> Save Gateway Settings</>}
          </Button>
        </div>
      </SettingSection>

      {/* Site Settings */}
      <SettingSection
        title="Site Configuration & Announcements"
        description="Control the marquee alert banner and maintenance mode across the website."
      >
        <div className="space-y-5">
          {/* Maintenance Mode */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
            <div>
              <p className="text-xs font-semibold text-foreground">Maintenance Mode</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Disable the store temporarily for customers.
              </p>
            </div>
            <Switch
              checked={!st.siteActive}
              onCheckedChange={(v) => setSt((p) => ({ ...p, siteActive: !v }))}
            />
          </div>
          {!st.siteActive && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Site is currently in <strong>Maintenance Mode</strong>.
              </p>
            </div>
          )}

          {/* Site Notice Banner */}
          <div>
            <Label className="text-xs">Home Page Marquee Banner Notice</Label>
            <Input
              value={st.siteNotice || ""}
              onChange={(e) => setSt((p) => ({ ...p, siteNotice: e.target.value }))}
              placeholder="🚨 Notice: Server upgrade in progress..."
              className="mt-1 h-9 text-sm"
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              Changes to this notice immediately show in the top marquee banner on the home page.
            </p>
          </div>

          {/* Contact Links */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Official WhatsApp</Label>
              <Input
                value={st.whatsappNumber || ""}
                onChange={(e) => setSt((p) => ({ ...p, whatsappNumber: e.target.value }))}
                placeholder="+880 1700-000000"
                className="mt-1 h-8 text-xs font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Telegram Channel URL</Label>
              <Input
                value={st.telegramChannel || ""}
                onChange={(e) => setSt((p) => ({ ...p, telegramChannel: e.target.value }))}
                placeholder="https://t.me/vtmtopup"
                className="mt-1 h-8 text-xs font-mono"
              />
            </div>
          </div>

          <Button size="sm" className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={handleSiteSave}>
            {savedSt ? <><Check className="w-3.5 h-3.5" /> Saved ✓</> : <><Save className="w-3.5 h-3.5" /> Save Site Settings</>}
          </Button>
        </div>
      </SettingSection>
    </div>
  );
}
