"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Input, Button, Divider } from "@heroui/react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
} from "lucide-react";

// Google SVG Icon component
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
    case "auth/email-already-in-use":
      return "An account is already registered with this email address.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    case "auth/operation-not-allowed":
      return "Email/Password sign-up is currently disabled in Firebase Console.";
    case "auth/network-request-failed":
      return "Network connection failed. Please check your internet connection.";
    case "auth/popup-closed-by-user":
      return "Google sign-in popup was closed before completion.";
    case "auth/popup-blocked":
      return "Sign-in popup was blocked by your browser. Please allow popups.";
    default:
      return error.message || "Failed to create account. Please try again.";
  }
}

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Email / Password registration handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    try {
      setLoading(true);

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password,
      );

      // Update Firebase Auth profile displayName
      if (userCredential?.user) {
        await updateProfile(userCredential.user, {
          displayName: formData.name.trim(),
        });
      }

      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      setErrorMessage(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Google sign up / sign in handler
  const handleGoogleSignup = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setGoogleLoading(true);
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setErrorMessage(getFriendlyErrorMessage(err));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1a13] text-white flex items-center justify-center p-4 pt-24 pb-20">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
        {/* Top Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-orbitron tracking-wide text-white">
            Sign Up
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Enter your information to create an account
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          {/* Full Name */}
          <Input
            isRequired
            name="name"
            type="text"
            label="Full Name"
            placeholder="John Doe"
            variant="bordered"
            value={formData.name}
            onChange={handleChange}
            startContent={
              <User className="w-4 h-4 text-gray-400 pointer-events-none" />
            }
            classNames={{
              input: "text-white text-sm placeholder:text-gray-600",
              inputWrapper:
                "bg-black/40 border-white/10 hover:border-emerald-500/50 data-[hover=true]:border-emerald-500/50 group-data-[focus=true]:border-emerald-500 rounded-xl",
              label:
                "text-gray-400 text-xs group-data-[filled=true]:text-emerald-400",
            }}
          />

          {/* Email Address */}
          <Input
            name="email"
            type="email"
            label="Email Address"
            placeholder="name@example.com"
            variant="bordered"
            value={formData.email}
            onChange={handleChange}
            startContent={
              <Mail className="w-4 h-4 text-gray-400 pointer-events-none" />
            }
            classNames={{
              input: "text-white text-sm placeholder:text-gray-600",
              inputWrapper:
                "bg-black/40 border-white/10 hover:border-emerald-500/50 data-[hover=true]:border-emerald-500/50 group-data-[focus=true]:border-emerald-500 rounded-xl",
              label:
                "text-gray-400 text-xs group-data-[filled=true]:text-emerald-400",
            }}
          />

          {/* Phone Number */}
          <Input
            name="phone"
            isRequired
            type="tel"
            label="Phone Number"
            placeholder="01XXXXXXXXX"
            variant="bordered"
            value={formData.phone}
            onChange={handleChange}
            startContent={
              <Phone className="w-4 h-4 text-gray-400 pointer-events-none" />
            }
            classNames={{
              input: "text-white text-sm placeholder:text-gray-600",
              inputWrapper:
                "bg-black/40 border-white/10 hover:border-emerald-500/50 data-[hover=true]:border-emerald-500/50 group-data-[focus=true]:border-emerald-500 rounded-xl",
              label:
                "text-gray-400 text-xs group-data-[filled=true]:text-emerald-400",
            }}
          />

          {/* Passwords (Responsive Row: Half width on desktop, full on mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="••••••••"
              variant="bordered"
              value={formData.password}
              onChange={handleChange}
              startContent={
                <Lock className="w-4 h-4 text-gray-400 pointer-events-none" />
              }
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none text-gray-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              classNames={{
                input: "text-white text-sm placeholder:text-gray-600",
                inputWrapper:
                  "bg-black/40 border-white/10 hover:border-emerald-500/50 data-[hover=true]:border-emerald-500/50 group-data-[focus=true]:border-emerald-500 rounded-xl",
                label:
                  "text-gray-400 text-xs group-data-[filled=true]:text-emerald-400",
              }}
            />

            <Input
              isRequired
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm"
              placeholder="••••••••"
              variant="bordered"
              value={formData.confirmPassword}
              onChange={handleChange}
              startContent={
                <Lock className="w-4 h-4 text-gray-400 pointer-events-none" />
              }
              endContent={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="focus:outline-none text-gray-400 hover:text-white transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              classNames={{
                input: "text-white text-sm placeholder:text-gray-600",
                inputWrapper:
                  "bg-black/40 border-white/10 hover:border-emerald-500/50 data-[hover=true]:border-emerald-500/50 group-data-[focus=true]:border-emerald-500 rounded-xl",
                label:
                  "text-gray-400 text-xs group-data-[filled=true]:text-emerald-400",
              }}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={loading}
            spinner={<Loader2 className="w-5 h-5 animate-spin text-black" />}
            className="bg-emerald-500 text-black font-bold w-full py-3 rounded-xl mt-4 hover:bg-emerald-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.3)] h-auto"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <Divider className="bg-white/10" />
          <span className="absolute bg-[#0a1a13] px-3 text-xs text-gray-500 uppercase tracking-widest">
            or
          </span>
        </div>

        {/* Google Sign-In Button */}
        <Button
          type="button"
          onClick={handleGoogleSignup}
          isLoading={googleLoading}
          spinner={<Loader2 className="w-5 h-5 animate-spin text-black" />}
          className="w-full bg-white text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95 h-auto shadow-sm"
        >
          <GoogleIcon />
          <span>Sign in with Google</span>
        </Button>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-400 font-semibold hover:underline hover:text-emerald-300 transition"
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
