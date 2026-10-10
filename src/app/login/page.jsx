"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  HelpCircle,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { TbHomeFilled } from "react-icons/tb";
import { BsCartCheckFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { TiClipboard } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,34.551,44,29.861,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

// Map Firebase authentication error codes to user-friendly messages
function getFriendlyErrorMessage(error) {
  if (!error || !error.code) {
    return error?.message || "An unexpected error occurred. Please try again.";
  }

  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password. Please verify your credentials.";
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please wait a few minutes before trying again.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/popup-closed-by-user":
      return "Google sign-in popup was closed before completion.";
    case "auth/popup-blocked":
      return "Sign-in popup was blocked by your browser. Please allow popups for this site.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email using a different sign-in method.";
    default:
      return error.message || "Failed to sign in. Please try again.";
  }
}

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loginWithEmail, loginWithGoogle, resetPassword } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Status message state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const redirectUrl = searchParams.get("redirect") || "/";

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      router.replace(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  // Email & Password login handler
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      setIsSubmitting(true);
      await loginWithEmail(email.trim(), password);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });
      router.push(redirectUrl);
    } catch (err) {
      const msg = getFriendlyErrorMessage(err);
      setErrorMessage(msg);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google Sign-In handler
  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setIsGoogleLoading(true);
      await loginWithGoogle();
      toast({
        title: "Welcome!",
        description: "Signed in with Google successfully.",
      });
      router.push(redirectUrl);
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        const msg = getFriendlyErrorMessage(err);
        setErrorMessage(msg);
        toast({
          variant: "destructive",
          title: "Google Sign-In Failed",
          description: msg,
        });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Forgot password handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage(
        "Please enter your email address above to reset your password.",
      );
      return;
    }

    try {
      setIsResetting(true);
      await resetPassword(email.trim());
      const msg =
        "Password reset link sent to your email. Please check your inbox!";
      setSuccessMessage(msg);
      toast({
        title: "Reset Email Sent",
        description: msg,
      });
    } catch (err) {
      const msg = getFriendlyErrorMessage(err);
      setErrorMessage(msg);
      toast({
        variant: "destructive",
        title: "Reset Failed",
        description: msg,
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="login-card">
      {/* Title */}
      <div className="login-card-header">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">
          Login or register an account to continue
        </p>
      </div>

      {/* Alert: Error feedback */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50/90 p-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
          <span className="leading-relaxed font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Alert: Success feedback */}
      {successMessage && (
        <div
          role="status"
          className="mb-4 flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50/90 p-3 text-xs text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
          <span className="leading-relaxed font-medium">{successMessage}</span>
        </div>
      )}

      {/* Form */}
      <form className="login-form" onSubmit={handleEmailLogin}>
        {/* Email */}
        <div className="login-field">
          <label className="login-label" htmlFor="login-email">
            Email
          </label>
          <div className="login-input-wrap">
            <Mail className="login-input-icon" />
            <input
              id="login-email"
              type="email"
              required
              disabled={isSubmitting || isGoogleLoading || isResetting}
              className="login-input"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="login-field">
          <label className="login-label" htmlFor="login-password">
            Password
          </label>
          <div className="login-input-wrap">
            <Lock className="login-input-icon" />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              disabled={isSubmitting || isGoogleLoading || isResetting}
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="login-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="login-forgot-wrap">
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={isResetting || isSubmitting || isGoogleLoading}
            className="login-forgot bg-transparent border-0 p-0 cursor-pointer hover:underline disabled:opacity-50"
          >
            {isResetting ? "Sending reset link..." : "Forgot password?"}
          </button>
        </div>

        {/* Sign In button */}
        <button
          type="submit"
          disabled={isSubmitting || isGoogleLoading || isResetting}
          className="login-signin-btn flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="login-divider">
        <div className="login-divider-line" />
        <span className="login-divider-text">or</span>
        <div className="login-divider-line" />
      </div>

      {/* Google button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isSubmitting || isGoogleLoading || isResetting}
        className="login-google-btn disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isGoogleLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Connecting to Google...</span>
          </>
        ) : (
          <>
            <GoogleIcon />
            <span>Sign in with Google</span>
          </>
        )}
      </button>

      {/* Register link */}
      <p className="login-register-text">
        New User?{" "}
        <Link href="/register" className="login-register-link">
          Register Now
        </Link>
      </p>

      {/* Footer note */}
      <p className="login-terms">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="login-terms-link">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="login-terms-link">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="login-page-root">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-18 flex items-center justify-between relative">
          {/* Left: Modern Glassmorphic Back Button */}
          <Link
            href="/"
            aria-label="Go back"
            className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 border border-white/10 hover:border-cyan-500/40 shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-white group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none opacity-50" />
          </Link>

          {/* Center: Stylized Gaming Logo */}
          <div className="flex items-center select-none tracking-wider">
            <Link
              href="/"
              className="group flex items-center font-black text-xl sm:text-2xl uppercase tracking-widest font-sans"
            >
              <span className="bg-gradient-to-r mr-1 from-blue-500 via-cyan-400 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.55)] group-hover:brightness-110 transition-all duration-200">
                VTM
              </span>
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(244,63,94,0.6)] group-hover:brightness-110 transition-all duration-200">
                TopUp
              </span>
            </Link>
          </div>

          {/* Right: Help link */}
          <div className="flex items-center">
            <Link
              href="/contact"
              aria-label="Need Help?"
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 border border-white/10 hover:border-red-500/40 shadow-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] transition-all duration-200"
            >
              <HelpCircle className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-200" />
            </Link>
          </div>
        </div>

        {/* Bottom Glowing Divider */}
        <div className="relative w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/60 via-50% to-transparent overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 via-red-500 to-transparent opacity-80" />
          <div className="absolute inset-0 blur-[2px] bg-gradient-to-r from-blue-400 via-red-400 to-transparent opacity-70" />
        </div>
      </header>

      {/* Main */}
      <main className="login-main">
        <Suspense
          fallback={
            <div className="login-card flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
          }
        >
          <LoginFormContent />
        </Suspense>
      </main>
      {/* Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* iOS Frosted Glass Floating Bottom Navbar (Fixed Transparency) */}
          <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg">
            {/* ব্যাকগ্রাউন্ড এখন ৮০% সাদা (bg-white/80), যা পেছনের জিনিসপত্র ঢেকে দেবে কিন্তু কাচের ফিল দেবে */}
            <div
              className="relative flex justify-around items-center h-[68px] px-2 rounded-[2rem] 
                  bg-white/90 backdrop-blur-2xl 
                  border border-white/50 
                  shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden"
            >
              {/* Home Tab (Active) - একটিভ ট্যাবে নীল রঙ (iOS স্টাইল) */}
              <Link
                href="/"
                className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full 
                 transition-all duration-300 active:scale-90 text-blue-600"
              >
                <TbHomeFilled className="w-[22px] h-[22px]" />
                <span className="text-[10px] font-semibold tracking-tight">
                  Home
                </span>
              </Link>
              {/* My Orders Tab */}
              <Link
                href="/orders"
                className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full 
                 transition-all duration-300 active:scale-90 text-gray-500 hover:text-gray-900"
              >
                <BsCartCheckFill className="w-[22px] h-[22px]" />
                <span className="text-[10px] font-medium tracking-tight">
                  My Orders
                </span>
              </Link>
              {/* Add Money Tab */}
              <Link
                href="/add-money"
                className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full 
                 transition-all duration-300 active:scale-90 text-gray-500 hover:text-gray-900"
              >
                <IoMdAddCircle className="w-[22px] h-[22px]" />
                <span className="text-[10px] font-medium tracking-tight">
                  Add Money
                </span>
              </Link>{" "}
              {/* My Code Tab */}
              <Link
                href="/my-codes"
                className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full 
                 transition-all duration-300 active:scale-90 text-gray-500 hover:text-gray-900"
              >
                <TiClipboard className="w-[22px] h-[22px]" />
                <span className="text-[10px] font-medium tracking-tight">
                  My Code
                </span>
              </Link>
              {/* My Account Tab */}
              <Link
                href="/profile"
                className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full 
                 transition-all duration-300 active:scale-90 text-gray-500 hover:text-gray-900"
              >
                <FaRegUser className="w-[22px] h-[22px]" />
                <span className="text-[10px] font-medium tracking-tight">
                  Account
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
