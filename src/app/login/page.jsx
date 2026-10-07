"use client";
import { useState } from "react";
import { ChevronLeft, Eye, EyeOff, Mail, Lock, HelpCircle } from "lucide-react";
import Link from "next/link";

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,34.551,44,29.861,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            <Link href="/" className="group flex items-center font-black text-xl sm:text-2xl uppercase tracking-widest font-sans">
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.55)] group-hover:brightness-110 transition-all duration-200">
                TOPUP
              </span>
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(244,63,94,0.6)] group-hover:brightness-110 transition-all duration-200">
                BUZZ
              </span>
            </Link>
          </div>

          {/* Right: Balance action with Help link */}
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

        {/* Bottom Glowing Divider: Blue to Red Gaming Energy Line */}
        <div className="relative w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/60 via-50% to-transparent overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 via-red-500 to-transparent opacity-80" />
          <div className="absolute inset-0 blur-[2px] bg-gradient-to-r from-blue-400 via-red-400 to-transparent opacity-70" />
        </div>
      </header>

      {/* Main */}
      <main className="login-main">
        <div className="login-card">

          {/* Title */}
          <div className="login-card-header">
            <h1 className="login-title">Login</h1>
            <p className="login-subtitle">Login or register an account to continue</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div className="login-field">
              <label className="login-label" htmlFor="login-email">Email</label>
              <div className="login-input-wrap">
                <Mail className="login-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  className="login-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label className="login-label" htmlFor="login-password">Password</label>
              <div className="login-input-wrap">
                <Lock className="login-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="login-forgot-wrap">
              <Link href="#" className="login-forgot">Forgot password?</Link>
            </div>

            {/* Sign In button */}
            <button type="submit" className="login-signin-btn">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <div className="login-divider-line" />
            <span className="login-divider-text">or</span>
            <div className="login-divider-line" />
          </div>

          {/* Google button */}
          <button type="button" className="login-google-btn">
            <GoogleIcon />
            <span>Sign in with Google</span>
          </button>

          {/* Register link */}
          <p className="login-register-text">
            New User?{" "}
            <Link href="#" className="login-register-link">Register Now</Link>
          </p>

          {/* Footer note */}
          <p className="login-terms">
            By signing in, you agree to our{" "}
            <Link href="#" className="login-terms-link">Terms</Link>
            {" "}and{" "}
            <Link href="#" className="login-terms-link">Privacy Policy</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}

