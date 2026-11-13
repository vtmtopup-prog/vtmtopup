// src/lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const rawApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// Check if a real key has been configured (not empty, not undefined, not default placeholder)
export const isFirebaseConfigured = Boolean(
  rawApiKey &&
    rawApiKey !== "YOUR_FIREBASE_API_KEY" &&
    rawApiKey.trim().length > 10
);

const firebaseConfig = {
  // Use a dummy string fallback if no key is set yet, preventing `auth/invalid-api-key` crash on startup
  apiKey: isFirebaseConfigured ? rawApiKey : "AIzaSyDummyKeyForLocalPreview1234567890",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-vtmtopup.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-vtmtopup",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-vtmtopup.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef",
};

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
} catch (err) {
  console.warn("Firebase initialization warning (running in preview mode):", err.message);
}

export { app, auth, db, googleProvider };
