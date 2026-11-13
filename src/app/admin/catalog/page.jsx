"use client";
// src/app/admin/catalog/page.jsx
// Complete Catalog Manager: Games, TopUp Products, Friday Offers, and Free Fire Products

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const EMPTY_PROD = { name: "", slug: "", image: "", category: "Game / Top up" };
const EMPTY_OFFER = { name: "", slug: "", image: "" };

export default function CatalogPage() {
  const {
    topupProducts,
    addTopupProduct,
    updateTopupProduct,
    deleteTopupProduct,
    specialOffers,
    addSpecialOffer,
    updateSpecialOffer,
    deleteSpecialOffer,
    freeFireProducts,
    addFFProduct,
    updateFFProduct,
    deleteFFProduct,
  } = useApp();

  const [activeTab, setActiveTab] = useState("topup");

  // Dialog states for Topup Products
  const [prodForm, setProdForm] = useState(EMPTY_PROD);
  const [prodEditSlug, setProdEditSlug] = useState(null);
  const [prodDialogOpen, setProdDialogOpen] = useState(false);
  const [prodDeleteSlug, setProdDeleteSlug] = useState(null);

  // Dialog states for Special Offers
  const [offerForm, setOfferForm] = useState(EMPTY_OFFER);
  const [offerEditId, setOfferEditId] = useState(null);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [offerDeleteId, setOfferDeleteId] = useState(null);

  // Dialog states for Free Fire Products
  const [ffForm, setFfForm] = useState(EMPTY_OFFER);
  const [ffEditId, setFfEditId] = useState(null);
  const [ffDialogOpen, setFfDialogOpen] = useState(false);
  const [ffDeleteId, setFfDeleteId] = useState(null);

  // ─── Topup Product Handlers ────────────────────────────────────────────────
  const openAddProd = () => {
    setProdForm(EMPTY_PROD);
    setProdEditSlug(null);
    setProdDialogOpen(true);
  };

  const openEditProd = (p) => {
    setProdForm({ name: p.name, slug: p.slug, image: p.image || "", category: p.category || "Game / Top up" });
    setProdEditSlug(p.slug);
    setProdDialogOpen(true);
  };

  const saveProd = () => {
    if (!prodForm.name.trim() || !prodForm.slug.trim()) return;
    if (prodEditSlug) {
      updateTopupProduct(prodEditSlug, prodForm);
    } else {
      addTopupProduct({ ...prodForm, active: true, rechargeOptions: [] });
    }
    setProdDialogOpen(false);
  };

  // ─── Special Offer Handlers ───────────────────────────────────────────────
  const openAddOffer = () => {
    setOfferForm(EMPTY_OFFER);
    setOfferEditId(null);
    setOfferDialogOpen(true);
  };

  const openEditOffer = (o) => {
    setOfferForm({ name: o.name, slug: o.slug, image: o.image || "" });
    setOfferEditId(o.id);
    setOfferDialogOpen(true);
  };

  const saveOffer = () => {
    if (!offerForm.name.trim() || !offerForm.slug.trim()) return;
    if (offerEditId) {
      updateSpecialOffer(offerEditId, offerForm);
    } else {
      addSpecialOffer(offerForm);
    }
    setOfferDialogOpen(false);
  };

  // ─── Free Fire Card Handlers ─────────────────────────────────────────────
  const openAddFF = () => {
    setFfForm(EMPTY_OFFER);
    setFfEditId(null);
    setFfDialogOpen(true);
  };

  const openEditFF = (p) => {
    setFfForm({ name: p.name, slug: p.slug, image: p.image || "" });
    setFfEditId(p.id);
    setFfDialogOpen(true);
  };

  const saveFF = () => {
    if (!ffForm.name.trim() || !ffForm.slug.trim()) return;
    if (ffEditId) {
      updateFFProduct(ffEditId, ffForm);
    } else {
      addFFProduct(ffForm);
    }
    setFfDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Store Catalog & Offers"
        description="Manage top-up games, packages, Friday offers, and homepage cards in real time."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <TabsList className="h-9">
            <TabsTrigger value="topup" className="text-xs px-3">
              TopUp Games ({topupProducts?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="special-offers" className="text-xs px-3">
              Friday Offers ({specialOffers?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="ff-products" className="text-xs px-3">
              Free Fire Cards ({freeFireProducts?.length || 0})
            </TabsTrigger>
          </TabsList>

          {activeTab === "topup" && (
            <Button size="sm" onClick={openAddProd} className="h-8 text-xs gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Add Game / Product
            </Button>
          )}
          {activeTab === "special-offers" && (
            <Button size="sm" onClick={openAddOffer} className="h-8 text-xs gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Add Friday Offer
            </Button>
          )}
          {activeTab === "ff-products" && (
            <Button size="sm" onClick={openAddFF} className="h-8 text-xs gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Add Free Fire Card
            </Button>
          )}
        </div>

        {/* ─── TAB 1: TopUp Games & Products ─────────────────────────────────── */}
        <TabsContent value="topup" className="m-0">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/20">
                  <tr>
                    {["Preview", "Game / Product Name", "Slug", "Category", "Options", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(topupProducts || []).length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-sm text-muted-foreground">
                        No products found. Click "Add Game / Product" to create one.
                      </td>
                    </tr>
                  ) : (
                    (topupProducts || []).map((p) => (
                      <tr key={p.slug} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5">
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-900 border border-border flex items-center justify-center relative">
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 font-medium text-xs">{p.name}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{p.slug}</td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">{p.category || "Game / Top up"}</td>
                        <td className="px-4 py-2.5 text-xs font-semibold text-emerald-600">
                          {(p.rechargeOptions || []).length} Packages
                        </td>
                        <td className="px-4 py-2.5">
                          <StatusBadge status={p.active !== false ? "Active" : "Hidden"} />
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <Link href={`/admin/catalog/${p.slug}`}>
                              <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 border-primary/40 hover:bg-primary/10 hover:text-primary">
                                <ExternalLink className="w-3 h-3" />
                                Edit Packages
                              </Button>
                            </Link>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => openEditProd(p)}>
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                              onClick={() => updateTopupProduct(p.slug, { active: !(p.active !== false) })}
                              title={p.active !== false ? "Hide from Store" : "Show on Store"}
                            >
                              {p.active !== false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                              onClick={() => setProdDeleteSlug(p.slug)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
        </TabsContent>

        {/* ─── TAB 2: Friday Special Offers ──────────────────────────────────── */}
        <TabsContent value="special-offers" className="m-0">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/20">
                  <tr>
                    {["Preview", "Offer Title", "Target URL Slug", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(specialOffers || []).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                        No special offers found. Click "Add Friday Offer" to create one.
                      </td>
                    </tr>
                  ) : (
                    (specialOffers || []).map((o) => (
                      <tr key={o.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5">
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-900 border border-border flex items-center justify-center relative">
                            {o.image ? (
                              <img src={o.image} alt={o.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 font-bold text-xs">{o.name}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{o.slug}</td>
                        <td className="px-4 py-2.5">
                          <StatusBadge status={o.active !== false ? "Active" : "Hidden"} />
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => openEditOffer(o)}>
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                              onClick={() => updateSpecialOffer(o.id, { active: !(o.active !== false) })}
                            >
                              {o.active !== false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                              onClick={() => setOfferDeleteId(o.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
        </TabsContent>

        {/* ─── TAB 3: Garena Free Fire Products ─────────────────────────────── */}
        <TabsContent value="ff-products" className="m-0">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/20">
                  <tr>
                    {["Preview", "Card Title", "Target URL Slug", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(freeFireProducts || []).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                        No Free Fire cards found. Click "Add Free Fire Card" to create one.
                      </td>
                    </tr>
                  ) : (
                    (freeFireProducts || []).map((p) => (
                      <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5">
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-900 border border-border flex items-center justify-center relative">
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 font-bold text-xs">{p.name}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{p.slug}</td>
                        <td className="px-4 py-2.5">
                          <StatusBadge status={p.active !== false ? "Active" : "Hidden"} />
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => openEditFF(p)}>
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                              onClick={() => updateFFProduct(p.id, { active: !(p.active !== false) })}
                            >
                              {p.active !== false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                              onClick={() => setFfDeleteId(p.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
        </TabsContent>
      </Tabs>

      {/* ─── MODAL: Add/Edit Topup Product ─────────────────────────────────── */}
      <Dialog open={prodDialogOpen} onOpenChange={setProdDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{prodEditSlug ? "Edit Product" : "Add New Game / Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-1">
            <div>
              <Label className="text-xs">Product Name</Label>
              <Input
                value={prodForm.name}
                onChange={(e) => setProdForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Free Fire TopUp (BD)"
                className="mt-1 h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">URL Slug</Label>
              <Input
                value={prodForm.slug}
                disabled={!!prodEditSlug}
                onChange={(e) => setProdForm((p) => ({ ...p, slug: e.target.value }))}
                placeholder="e.g. free-fire-topup-bd"
                className="mt-1 h-9 text-sm font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Image Path</Label>
              <Input
                value={prodForm.image}
                onChange={(e) => setProdForm((p) => ({ ...p, image: e.target.value }))}
                placeholder="/freefiretopup(bd).webp"
                className="mt-1 h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Category</Label>
              <Input
                value={prodForm.category}
                onChange={(e) => setProdForm((p) => ({ ...p, category: e.target.value }))}
                placeholder="Game / Top up"
                className="mt-1 h-9 text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setProdDialogOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={saveProd} disabled={!prodForm.name || !prodForm.slug}>
              {prodEditSlug ? "Save Changes" : "Create Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── MODAL: Add/Edit Special Offer ─────────────────────────────────── */}
      <Dialog open={offerDialogOpen} onOpenChange={setOfferDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{offerEditId ? "Edit Friday Offer" : "Add Friday Special Offer"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-1">
            <div>
              <Label className="text-xs">Offer Name</Label>
              <Input
                value={offerForm.name}
                onChange={(e) => setOfferForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. WEEKLY OFFER"
                className="mt-1 h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Target Product Slug</Label>
              <Input
                value={offerForm.slug}
                onChange={(e) => setOfferForm((p) => ({ ...p, slug: e.target.value }))}
                placeholder="e.g. weekly-monthly-offer"
                className="mt-1 h-9 text-sm font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Image Path</Label>
              <Input
                value={offerForm.image}
                onChange={(e) => setOfferForm((p) => ({ ...p, image: e.target.value }))}
                placeholder="/weeklylight.webp"
                className="mt-1 h-9 text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setOfferDialogOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={saveOffer} disabled={!offerForm.name || !offerForm.slug}>Save Offer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── MODAL: Add/Edit Free Fire Card ───────────────────────────────── */}
      <Dialog open={ffDialogOpen} onOpenChange={setFfDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{ffEditId ? "Edit Free Fire Card" : "Add Free Fire Card"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-1">
            <div>
              <Label className="text-xs">Card Name</Label>
              <Input
                value={ffForm.name}
                onChange={(e) => setFfForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. UID TOP-UP [BD]"
                className="mt-1 h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Target Product Slug</Label>
              <Input
                value={ffForm.slug}
                onChange={(e) => setFfForm((p) => ({ ...p, slug: e.target.value }))}
                placeholder="e.g. free-fire-topup-bd"
                className="mt-1 h-9 text-sm font-mono"
              />
            </div>
            <div>
              <Label className="text-xs">Image Path</Label>
              <Input
                value={ffForm.image}
                onChange={(e) => setFfForm((p) => ({ ...p, image: e.target.value }))}
                placeholder="/freefiretopup(bd).webp"
                className="mt-1 h-9 text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setFfDialogOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={saveFF} disabled={!ffForm.name || !ffForm.slug}>Save Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Confirm Deletions ──────────────────────────────────────────────── */}
      <AlertDialog open={!!prodDeleteSlug} onOpenChange={(o) => !o && setProdDeleteSlug(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete this product?</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => { deleteTopupProduct(prodDeleteSlug); setProdDeleteSlug(null); }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!offerDeleteId} onOpenChange={(o) => !o && setOfferDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete this Friday Offer?</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => { deleteSpecialOffer(offerDeleteId); setOfferDeleteId(null); }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!ffDeleteId} onOpenChange={(o) => !o && setFfDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete this Free Fire Card?</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => { deleteFFProduct(ffDeleteId); setFfDeleteId(null); }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
