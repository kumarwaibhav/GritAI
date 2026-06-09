"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

const Forgotpass = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post("/api/users/forgotpassword", { email });
      setSent(true);
    } catch (err: any) {
      if (err.response?.status === 429) {
        toast.error("Too many requests. Try again in an hour.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg px-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
      <div className="w-full max-w-sm animate-fade-in-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 flex-shrink-0">
            <Image src="/logo-icon.png" alt="Grit AI" width={40} height={40} className="object-contain" />
          </div>
          <span
            className="text-3xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}
          >
            <span className="brand-gradient-text">Grit</span>
            <span style={{ color: "rgb(var(--text-primary))" }}> AI</span>
          </span>
        </div>

        {!sent ? (
          <>
            <div className="mb-7 text-center">
              <h2
                className="text-3xl font-black tracking-tight mb-2"
                style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}
              >
                Reset Password
              </h2>
              <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
                Enter your email and we&apos;ll send a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                  style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  className="grit-input"
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="btn-fire w-full py-3 rounded-xl font-semibold text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "Sending…" : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
              style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)" }}
            >
              <svg className="w-7 h-7" style={{ color: "#F97316" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3
              className="text-2xl font-black"
              style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}
            >
              Check your inbox
            </h3>
            <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
              Reset instructions sent to <strong style={{ color: "rgb(var(--text-primary))" }}>{email}</strong>
            </p>
          </div>
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
};

export default Forgotpass;
