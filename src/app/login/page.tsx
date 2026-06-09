"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Mic, FileText, Brain, Accessibility } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.error("Please fill all fields");
      return;
    }
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/users/login", { ...user, captchaToken });
      localStorage.setItem("token", "session");
      toast.success("Welcome back!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex mesh-bg overflow-hidden"
      style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
    >
      {/* Left Panel - Brand */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-10 relative overflow-hidden h-full"
        style={{ background: "rgb(var(--bg-surface-1))", borderRight: "1px solid rgb(var(--border-subtle))" }}
      >
        {/* Gradient orb */}
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "linear-gradient(135deg, #F97316, #EF4444)" }}
        />
        <div
          className="absolute top-1/3 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: "#F97316" }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-1">
          <div className="w-12 h-12 flex-shrink-0">
            <Image src="/logo-icon.png" alt="Grit AI" width={56} height={56} className="object-contain" />
          </div>
          <span className="text-xl font-black tracking-tight" style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}>
            <span className="brand-gradient-text">Grit</span>
            <span style={{ color: "rgb(var(--text-primary))" }}> AI</span>
          </span>
        </div>

        {/* Central content */}
        <div className="relative z-10">
          <p
            className="font-black leading-[1.0] tracking-[-0.04em] mb-8"
            style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))", fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
          >
            Turn any lecture into{" "}
            <span className="brand-gradient-text">exam-ready</span>{" "}
            study tools.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {[
              { Icon: Mic, label: "Live Recording" },
              { Icon: FileText, label: "PDF & PPT Upload" },
              { Icon: Brain, label: "AI Notes & Quiz" },
              { Icon: Accessibility, label: "Accessibility Mode" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgb(var(--text-secondary))",
                }}
              >
                <f.Icon className="w-3 h-3 flex-shrink-0" />
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.15)" }}
          >
            <p className="text-sm leading-relaxed mb-2" style={{ color: "rgb(var(--text-secondary))" }}>
              "Went from drowning in notes to acing finals. Grit AI is literally a cheat code."
            </p>
            <p className="text-xs font-semibold" style={{ color: "#F97316", fontFamily: "var(--font-syne)" }}>
              - Engineering student, IIT Delhi
            </p>
          </div>
        </div>

        {/* Bottom attribution */}
        <p className="relative z-10 text-xs" style={{ color: "rgb(var(--text-dim))" }}>
          © 2023–26 Grit AI · By Kumar Waibhav Akshat
        </p>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex items-center gap-1">
          <div className="w-11 h-11 flex-shrink-0">
            <Image src="/logo-icon.png" alt="Grit AI" width={48} height={48} className="object-contain" />
          </div>
          <span className="text-xl font-black tracking-tight" style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}>
            <span className="brand-gradient-text">Grit</span>
            <span style={{ color: "rgb(var(--text-primary))" }}> AI</span>
          </span>
        </div>

        <div className="w-full max-w-sm animate-fade-in-up">
          {/* Header */}
          <div className="mb-5">
            <h2
              className="text-4xl font-black mb-2"
              style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))", letterSpacing: "-0.03em", lineHeight: "1.0" }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
              Sign in to continue to your dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-3">
            <div>
              <label
                className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="you@university.edu"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="grit-input"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}
                >
                  Password
                </label>
                <Link
                  href="/forgotpass"
                  className="text-xs transition-colors hover:text-orange-400"
                  style={{ color: "#F97316" }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="grit-input pr-10"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                  style={{ color: "rgb(var(--text-muted))" }}
                >
                  {showPassword ? <FaRegEye size={14} /> : <FaEyeSlash size={14} />}
                </button>
              </div>
            </div>

            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
              options={{ theme: "auto" }}
            />

            <button
              type="submit"
              disabled={loading || !captchaToken}
              className="btn-fire w-full py-3 rounded-xl font-semibold text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </span>
              ) : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ background: "rgb(var(--border-subtle))" }} />
            <span className="text-xs" style={{ color: "rgb(var(--text-dim))" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "rgb(var(--border-subtle))" }} />
          </div>

          <p className="text-center text-sm" style={{ color: "rgb(var(--text-muted))" }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold transition-colors hover:text-orange-400"
              style={{ color: "#F97316" }}
            >
              Sign Up Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
