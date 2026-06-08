"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import DarkModeButton from "@/components/darkmode/page";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"validating" | "valid" | "invalid" | "success">("validating");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    axios.get(`/api/users/resetpassword?token=${token}`)
      .then(() => setStatus("valid"))
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/users/resetpassword", { token, newPassword });
      setStatus("success");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Reset failed. Link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg px-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
      <DarkModeButton />

      <div className="w-full max-w-sm animate-fade-in-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-8 h-8 flex-shrink-0">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="grit-g-rp" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
              </defs>
              <path d="M20 20 L80 20 L80 40 L40 40 L40 60 L60 60 L60 50 L80 50 L80 80 L20 80 Z" fill="url(#grit-g-rp)" />
              <rect x="45" y="45" width="10" height="10" fill="white" opacity="0.8"/>
            </svg>
          </div>
          <span className="text-xl font-black" style={{ fontFamily: "var(--font-syne)" }}>
            <span className="brand-gradient-text">Grit</span>
            <span style={{ color: "rgb(var(--text-primary))" }}> AI</span>
          </span>
        </div>

        {/* Validating */}
        {status === "validating" && (
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>Verifying reset link...</p>
          </div>
        )}

        {/* Invalid token */}
        {status === "invalid" && (
          <div className="text-center space-y-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-black" style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}>
              Link expired
            </h3>
            <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
              This reset link is invalid or has expired. Links are valid for 1 hour.
            </p>
            <Link href="/forgotpass" className="inline-block btn-fire px-5 py-2.5 rounded-xl text-sm font-semibold mt-2">
              Request new link
            </Link>
          </div>
        )}

        {/* Success */}
        {status === "success" && (
          <div className="text-center space-y-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
              style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)" }}
            >
              <svg className="w-7 h-7" style={{ color: "#F97316" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black" style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}>
              Password reset!
            </h3>
            <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
              Your password has been updated. You can now sign in.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="btn-fire px-6 py-2.5 rounded-xl text-sm font-semibold"
            >
              Sign In
            </button>
          </div>
        )}

        {/* Form */}
        {status === "valid" && (
          <>
            <div className="mb-7 text-center">
              <h2
                className="text-3xl font-black tracking-tight mb-2"
                style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}
              >
                New password
              </h2>
              <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
                Choose a strong password for your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="grit-input pr-10"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute top-1/2 right-3 -translate-y-1/2"
                    style={{ color: "rgb(var(--text-muted))" }}
                  >
                    {showPw ? <FaRegEye size={14} /> : <FaEyeSlash size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="grit-input"
                  required
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs mt-1 text-red-400">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || newPassword !== confirmPassword || newPassword.length < 8}
                className="btn-fire w-full py-3 rounded-xl font-semibold text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Resetting...
                  </span>
                ) : "Reset Password"}
              </button>
            </form>
          </>
        )}

        <p className="text-center text-sm mt-6" style={{ color: "rgb(var(--text-muted))" }}>
          Remember your password?{" "}
          <Link href="/login" className="font-semibold" style={{ color: "#F97316" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center mesh-bg">
        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
