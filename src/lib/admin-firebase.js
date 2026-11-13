// src/lib/admin-firebase.js
// 100% Real-time Firebase Firestore service layer — NO mock or dummy data.

import {
  collection,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  increment,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export const COLLECTIONS = {
  USERS: "users",
  ORDERS: "orders",
  ADD_MONEY_REQUESTS: "addMoneyRequests",
  PRODUCTS: "products",
  HOME_OFFERS: "homeOffers",
  DIAMOND_PACKAGES: "diamondPackages",
  VOUCHERS: "vouchers",
  TRANSACTIONS: "transactions",
  ACTIVITIES: "activities",
  SITE_SETTINGS: "siteSettings",
  ADMINS: "admins",
};

function assertDb() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Add your NEXT_PUBLIC_FIREBASE_* keys to .env.local.");
  }
}

// ─── Generic Real-Time Collection Subscriber ───────────────────────────────
function subscribeCollection(collectionName, queryConstraints, onData, onError) {
  if (!isFirebaseConfigured || !db) {
    onError?.(new Error("Firebase is not configured. Please set NEXT_PUBLIC_FIREBASE_* keys in .env.local."));
    onData([]);
    return () => {};
  }

  const colRef = collection(db, collectionName);
  const q = queryConstraints.length > 0 ? query(colRef, ...queryConstraints) : colRef;

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onData(items);
    },
    (error) => {
      console.error(`Firestore [${collectionName}] subscription error:`, error);
      onError?.(error);
    }
  );
}

// ─── Audit Logs (activities) ───────────────────────────────────────────────
export async function logActivity(adminName, action, details) {
  assertDb();
  await addDoc(collection(db, COLLECTIONS.ACTIVITIES), {
    adminName: adminName || "Admin",
    action,
    details,
    timestamp: serverTimestamp(),
  });
}

export function subscribeToActivities(onData, onError) {
  return subscribeCollection(
    COLLECTIONS.ACTIVITIES,
    [orderBy("timestamp", "desc"), limit(100)],
    onData,
    onError
  );
}

// ─── Orders ────────────────────────────────────────────────────────────────
export function subscribeToOrders(onData, onError) {
  return subscribeCollection(
    COLLECTIONS.ORDERS,
    [orderBy("createdAt", "desc"), limit(200)],
    onData,
    onError
  );
}

export async function updateOrderStatus(orderDocId, status, adminName = "Admin") {
  assertDb();
  const ref = doc(db, COLLECTIONS.ORDERS, orderDocId);
  await updateDoc(ref, { status, updatedAt: serverTimestamp() });
  await logActivity(adminName, "ORDER_STATUS_UPDATE", `Order ${orderDocId} updated to ${status}`);
}

// ─── Users ─────────────────────────────────────────────────────────────────
export function subscribeToUsers(onData, onError) {
  return subscribeCollection(COLLECTIONS.USERS, [], onData, onError);
}

export async function toggleUserStatus(userDocId, currentStatus, adminName = "Admin") {
  assertDb();
  const nextStatus = currentStatus === "Active" ? "Banned" : "Active";
  await updateDoc(doc(db, COLLECTIONS.USERS, userDocId), {
    status: nextStatus,
    updatedAt: serverTimestamp(),
  });
  await logActivity(adminName, "USER_STATUS_CHANGE", `User ${userDocId} set to ${nextStatus}`);
}

export async function adjustUserBalance(userDocId, amount, type = "add", adminName = "Admin") {
  assertDb();
  const delta = type === "add" ? Math.abs(Number(amount)) : -Math.abs(Number(amount));
  await updateDoc(doc(db, COLLECTIONS.USERS, userDocId), {
    balance: increment(delta),
    updatedAt: serverTimestamp(),
  });
  await logActivity(adminName, "BALANCE_ADJUST", `User ${userDocId} ${type} ৳${amount}`);
}

export async function adjustUserDiamonds(userDocId, amount, type = "add", adminName = "Admin") {
  assertDb();
  const delta = type === "add" ? Math.abs(Number(amount)) : -Math.abs(Number(amount));
  await updateDoc(doc(db, COLLECTIONS.USERS, userDocId), {
    diamonds: increment(delta),
    updatedAt: serverTimestamp(),
  });
  await logActivity(adminName, "DIAMOND_ADJUST", `User ${userDocId} ${type} ${amount} diamonds`);
}

// ─── Add Money Requests ────────────────────────────────────────────────────
export function subscribeToAddMoneyRequests(onData, onError) {
  return subscribeCollection(
    COLLECTIONS.ADD_MONEY_REQUESTS,
    [orderBy("createdAt", "desc"), limit(100)],
    onData,
    onError
  );
}

export async function approveAddMoneyRequest(requestDocId, userId, amount, adminName = "Admin") {
  assertDb();
  const batch = writeBatch(db);
  batch.update(doc(db, COLLECTIONS.ADD_MONEY_REQUESTS, requestDocId), {
    status: "Approved",
    updatedAt: serverTimestamp(),
  });
  if (userId) {
    batch.update(doc(db, COLLECTIONS.USERS, userId), {
      balance: increment(Number(amount)),
      updatedAt: serverTimestamp(),
    });
  }
  await batch.commit();
  await logActivity(adminName, "ADD_MONEY_APPROVE", `Approved ৳${amount} for request ${requestDocId}`);
}

export async function rejectAddMoneyRequest(requestDocId, reason = "Rejected by admin", adminName = "Admin") {
  assertDb();
  await updateDoc(doc(db, COLLECTIONS.ADD_MONEY_REQUESTS, requestDocId), {
    status: "Rejected",
    reason,
    updatedAt: serverTimestamp(),
  });
  await logActivity(adminName, "ADD_MONEY_REJECT", `Rejected request ${requestDocId}: ${reason}`);
}

// ─── Unified Products Catalog ──────────────────────────────────────────────
export function subscribeToProducts(onData, onError) {
  return subscribeCollection(COLLECTIONS.PRODUCTS, [orderBy("name")], onData, onError);
}

export async function addProduct(data, adminName = "Admin") {
  assertDb();
  const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCTS), {
    name: data.name,
    slug: data.slug,
    category: data.category || "Game / Top up",
    image: data.image || "",
    status: data.status || "Active",
    rechargeOptions: data.rechargeOptions || [],
    createdAt: serverTimestamp(),
  });
  await logActivity(adminName, "PRODUCT_CREATE", `Created product "${data.name}"`);
  return docRef;
}

export async function updateProduct(productDocId, updates, adminName = "Admin") {
  assertDb();
  await updateDoc(doc(db, COLLECTIONS.PRODUCTS, productDocId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
  await logActivity(adminName, "PRODUCT_UPDATE", `Updated product ${productDocId}`);
}

export async function deleteProduct(productDocId, adminName = "Admin") {
  assertDb();
  await deleteDoc(doc(db, COLLECTIONS.PRODUCTS, productDocId));
  await logActivity(adminName, "PRODUCT_DELETE", `Deleted product ${productDocId}`);
}

// ─── Home Offers ───────────────────────────────────────────────────────────
export function subscribeToHomeOffers(onData, onError) {
  return subscribeCollection(COLLECTIONS.HOME_OFFERS, [], onData, onError);
}

export async function addHomeOffer(data, adminName = "Admin") {
  assertDb();
  const ref = await addDoc(collection(db, COLLECTIONS.HOME_OFFERS), {
    title: data.title,
    slug: data.slug,
    image: data.image || "",
    visible: data.visible !== false,
    createdAt: serverTimestamp(),
  });
  await logActivity(adminName, "OFFER_CREATE", `Created home offer "${data.title}"`);
  return ref;
}

export async function updateHomeOffer(offerDocId, updates, adminName = "Admin") {
  assertDb();
  await updateDoc(doc(db, COLLECTIONS.HOME_OFFERS, offerDocId), updates);
  await logActivity(adminName, "OFFER_UPDATE", `Updated home offer ${offerDocId}`);
}

export async function deleteHomeOffer(offerDocId, adminName = "Admin") {
  assertDb();
  await deleteDoc(doc(db, COLLECTIONS.HOME_OFFERS, offerDocId));
  await logActivity(adminName, "OFFER_DELETE", `Deleted home offer ${offerDocId}`);
}

// ─── Diamond Packages ──────────────────────────────────────────────────────
export function subscribeToDiamondPackages(onData, onError) {
  return subscribeCollection(COLLECTIONS.DIAMOND_PACKAGES, [], onData, onError);
}

export async function addDiamondPackage(data, adminName = "Admin") {
  assertDb();
  const ref = await addDoc(collection(db, COLLECTIONS.DIAMOND_PACKAGES), {
    name: data.name,
    price: Number(data.price),
    stock: data.stock || "Unlimited",
    createdAt: serverTimestamp(),
  });
  await logActivity(adminName, "PACKAGE_CREATE", `Added diamond package "${data.name}"`);
  return ref;
}

export async function deleteDiamondPackage(packageDocId, adminName = "Admin") {
  assertDb();
  await deleteDoc(doc(db, COLLECTIONS.DIAMOND_PACKAGES, packageDocId));
  await logActivity(adminName, "PACKAGE_DELETE", `Deleted diamond package ${packageDocId}`);
}

// ─── UniPin Vouchers ───────────────────────────────────────────────────────
export function subscribeToVouchers(onData, onError) {
  return subscribeCollection(COLLECTIONS.VOUCHERS, [], onData, onError);
}

export async function addVoucher(data, adminName = "Admin") {
  assertDb();
  const ref = await addDoc(collection(db, COLLECTIONS.VOUCHERS), {
    code: data.code,
    pin: data.pin,
    status: data.status || "Available",
    createdAt: serverTimestamp(),
  });
  await logActivity(adminName, "VOUCHER_ADD", `Added UniPin voucher ${data.code}`);
  return ref;
}

export async function deleteVoucher(voucherDocId, adminName = "Admin") {
  assertDb();
  await deleteDoc(doc(db, COLLECTIONS.VOUCHERS, voucherDocId));
  await logActivity(adminName, "VOUCHER_DELETE", `Deleted voucher ${voucherDocId}`);
}

// ─── Transactions ──────────────────────────────────────────────────────────
export function subscribeToTransactions(onData, onError) {
  return subscribeCollection(
    COLLECTIONS.TRANSACTIONS,
    [orderBy("createdAt", "desc"), limit(200)],
    onData,
    onError
  );
}

// ─── Site Settings ─────────────────────────────────────────────────────────
export function subscribeToSiteSettings(onData, onError) {
  if (!isFirebaseConfigured || !db) {
    onError?.(new Error("Firebase is not configured."));
    onData(null);
    return () => {};
  }
  return onSnapshot(
    doc(db, COLLECTIONS.SITE_SETTINGS, "config"),
    (snap) => {
      onData(snap.exists() ? { id: snap.id, ...snap.data() } : null);
    },
    (error) => {
      console.error("Firestore [siteSettings] error:", error);
      onError?.(error);
    }
  );
}

export async function saveSiteSettings(data, adminName = "Admin") {
  assertDb();
  await setDoc(
    doc(db, COLLECTIONS.SITE_SETTINGS, "config"),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );
  await logActivity(adminName, "SETTINGS_UPDATE", "Updated site & gateway settings");
}

// ─── Admin Staff ───────────────────────────────────────────────────────────
export function subscribeToAdmins(onData, onError) {
  return subscribeCollection(COLLECTIONS.ADMINS, [], onData, onError);
}

export async function addAdminStaff(data, adminName = "Admin") {
  assertDb();
  const ref = await addDoc(collection(db, COLLECTIONS.ADMINS), {
    name: data.name,
    email: data.email,
    role: data.role || "Staff",
    status: "Active",
    createdAt: serverTimestamp(),
  });
  await logActivity(adminName, "ADMIN_ADD", `Added admin staff ${data.email}`);
  return ref;
}

export async function deleteAdminStaff(adminDocId, adminName = "Admin") {
  assertDb();
  await deleteDoc(doc(db, COLLECTIONS.ADMINS, adminDocId));
  await logActivity(adminName, "ADMIN_REMOVE", `Removed admin staff ${adminDocId}`);
}
