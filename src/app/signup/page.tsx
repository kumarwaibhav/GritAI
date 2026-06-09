"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { PhoneInput } from "./phone-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Turnstile } from "@marsidev/react-turnstile";

const SignupU = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/");
  }, [router]);

  const handleSignUp = async () => {
    if (!name || !email || !phoneNumber || !password) {
      toast.error("Please fill all fields");
      return;
    }
    if (!agreed) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      await axios.post("/api/users/signup", { name, email, phoneNumber, password, captchaToken });
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex mesh-bg" style={{ fontFamily: "var(--font-dm-sans)" }}>
      {/* Left Panel */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-between p-10 relative overflow-hidden"
        style={{ background: "rgb(var(--bg-surface-1))", borderRight: "1px solid rgb(var(--border-subtle))" }}
      >
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: "linear-gradient(135deg, #F97316, #EF4444)" }}
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

        <div className="relative z-10">
          <h2
            className="font-black leading-[1.0] tracking-[-0.04em] mb-8"
            style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))", fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
          >
            Study smarter{" "}
            from day{" "}
            <span className="brand-gradient-text">one.</span>
          </h2>

          {/* Steps */}
          <div className="space-y-4">
            {[
              { n: "01", title: "Create a lecture", desc: "Name your topic and open a session." },
              { n: "02", title: "Record or upload", desc: "Mic recording or drop a PDF/PPT." },
              { n: "03", title: "Generate & study", desc: "AI notes, quiz, cheat sheet in seconds." },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-3">
                <span
                  className="text-xs font-black mt-0.5"
                  style={{ fontFamily: "var(--font-syne)", color: "#F97316", minWidth: "24px" }}
                >
                  {s.n}
                </span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>{s.title}</p>
                  <p className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs" style={{ color: "rgb(var(--text-dim))" }}>
          © 2023–26 Grit AI · By Kumar Waibhav Akshat
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
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
          <div className="mb-7">
            <h2
              className="text-4xl font-black mb-2"
              style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))", letterSpacing: "-0.03em", lineHeight: "1.0" }}
            >
              Create account
            </h2>
            <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
              Free forever. No credit card needed.
            </p>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Kumar Waibhav Akshat"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="grit-input"
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                Email
              </label>
              <input
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="grit-input"
                autoComplete="email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                Phone Number
              </label>
              <PhoneInput
                value={phoneNumber}
                onChange={(v) => setPhoneNumber(v || "")}
                placeholder="Enter phone number"
                className="rounded-xl text-sm"
                style={{
                  background: "rgb(var(--bg-surface-2))",
                  border: "1px solid rgb(var(--border-subtle))",
                  color: "rgb(var(--text-primary))",
                } as React.CSSProperties}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="grit-input pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  style={{ color: "rgb(var(--text-muted))" }}
                >
                  {showPassword ? <FaRegEye size={14} /> : <FaEyeSlash size={14} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-1">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(!!v)}
                className="mt-0.5"
                style={{ borderColor: "rgb(var(--border-default))" }}
              />
              <label htmlFor="terms" className="text-xs cursor-pointer" style={{ color: "rgb(var(--text-muted))" }}>
                I agree to the{" "}
                <Link href="/terms" target="_blank" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: "#F97316" }}>Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" target="_blank" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: "#F97316" }}>Privacy Policy</Link>
              </label>
            </div>

            <Turnstile
              siteKey="0x4AAAAAADgzpj4mgOllr9CQ"
              onSuccess={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
              options={{ theme: "auto" }}
            />

            {/* Submit */}
            <button
              onClick={handleSignUp}
              disabled={loading || !captchaToken}
              className="btn-fire w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account…
                </span>
              ) : "Create Free Account"}
            </button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "rgb(var(--border-subtle))" }} />
            <span className="text-xs" style={{ color: "rgb(var(--text-dim))" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "rgb(var(--border-subtle))" }} />
          </div>

          <p className="text-center text-sm" style={{ color: "rgb(var(--text-muted))" }}>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold transition-colors hover:text-orange-400" style={{ color: "#F97316" }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupU;
