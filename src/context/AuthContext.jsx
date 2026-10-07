"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  loginWithEmail: async () => {},
  registerWithEmail: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updateUserProfile: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync with Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          setUser({
            uid: currentUser.uid,
            name: currentUser.displayName || currentUser.email?.split("@")[0] || "Player1",
            email: currentUser.email,
            avatar: currentUser.photoURL || "/default-avatar.png",
          });
        } else {
          // Keep null if not logged into Firebase unless set by mock login
          setUser(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Auth state change error:", error);
        setUser(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  /**
   * Quick test / direct login helper.
   * Can be passed custom userData or defaults to a mock player.
   */
  const login = (userData) => {
    const mockUser = userData || {
      name: "Player1",
      email: "player1@topupbuzz.com",
      avatar: "/default-avatar.png",
    };
    setUser(mockUser);
  };

  // Real Firebase sign-ins
  const loginWithEmail = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmail = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // Ignored if purely local mock session
    }
    setUser(null);
  };

  const resetPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (profileData) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, profileData);
    }
    setUser((prev) => ({ ...prev, ...profileData }));
  };

  const value = {
    user,
    loading,
    login,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
