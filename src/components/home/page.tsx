"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CopyRight from "../copybar/page";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Mic,
  FileText,
  Brain,
  Upload,
  Zap,
  Accessibility,
  ArrowRight,
  Plus,
  Search,
  Pencil,
  Trash2,
  BookOpen,
  CheckCircle,
  Clock,
  GraduationCap,
  Trophy,
  Users,
  ChevronRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";

type Lecture = {
  _id: string;
  topic: string;
  createdAt?: string;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* ─── Landing Page ────────────────────────────────────────────────── */

const LandingPage = () => {
  const router = useRouter();

  const features = [
    {
      icon: Mic,
      color: "#F97316",
      bg: "rgba(249,115,22,0.1)",
      title: "Live Lecture Recording",
      desc: "Capture audio in real-time with noise suppression. Your mic becomes your smartest note-taker.",
    },
    {
      icon: Upload,
      color: "#EF4444",
      bg: "rgba(239,68,68,0.1)",
      title: "Upload PDFs & Slides",
      desc: "Drop in any PDF, PPT, or PPTX. Grit AI parses every slide and paragraph instantly.",
    },
    {
      icon: Brain,
      color: "#A855F7",
      bg: "rgba(168,85,247,0.1)",
      title: "AI-Generated Notes",
      desc: "Structured summaries, key concepts, and definitions - formatted for how students actually study.",
    },
    {
      icon: FileText,
      color: "#3B82F6",
      bg: "rgba(59,130,246,0.1)",
      title: "Smart Flashcards",
      desc: "Automatic Q&A cards from your lecture content. Spaced repetition built in.",
    },
    {
      icon: Zap,
      color: "#EAB308",
      bg: "rgba(234,179,8,0.1)",
      title: "Instant Quiz Generation",
      desc: "MCQs, fill-in-the-blanks, and short-answer questions generated from your exact material.",
    },
    {
      icon: Accessibility,
      color: "#10B981",
      bg: "rgba(16,185,129,0.1)",
      title: "Accessibility Mode",
      desc: "Braille-ready output and full text-to-speech support. Study without barriers.",
    },
  ];

  const steps = [
    {
      n: "01",
      icon: BookOpen,
      title: "Create a Lecture Session",
      desc: "Name your topic and open a session in seconds. No setup, no friction - just start.",
    },
    {
      n: "02",
      icon: Mic,
      title: "Record or Upload Content",
      desc: "Hit record and speak naturally, or drop in your slides and PDFs. Grit handles the rest.",
    },
    {
      n: "03",
      icon: Sparkles,
      title: "Generate Study Materials",
      desc: "One click produces a full study pack: notes, flashcards, quiz, and cheat sheet.",
    },
  ];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", paddingTop: "4rem", paddingBottom: "6rem" }}
      >
        {/* Background mesh */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(249,115,22,0.14) 0%, transparent 70%)," +
              "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(239,68,68,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border text-xs font-semibold"
            style={{
              borderColor: "rgba(249,115,22,0.3)",
              background: "rgba(249,115,22,0.06)",
              color: "#F97316",
              fontFamily: "var(--font-syne)",
            }}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            AI-Powered Study Platform
          </div>

          {/* Headline */}
          <h1
            className="font-black leading-[1.02] tracking-[-0.04em] mb-6"
            style={{
              fontFamily: "var(--font-syne)",
              color: "rgb(var(--text-primary))",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            }}
          >
            Turn Any Lecture{" "}
            <br className="hidden sm:block" />
            Into An{" "}
            <span className="brand-gradient-text">Exam Win.</span>
          </h1>

          <p
            className="text-base leading-relaxed mb-10 mx-auto max-w-2xl"
            style={{ color: "rgb(var(--text-muted))", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
          >
            Record your professor, upload your slides, and let Grit AI generate
            notes, quizzes, flashcards, and cheat sheets - in under a minute.
            Study smarter. Score higher.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <button
              onClick={() => router.push("/signup")}
              className="btn-fire flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm w-full sm:w-auto justify-center"
              style={{ fontSize: "0.95rem" }}
            >
              Get Started - It&apos;s Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm w-full sm:w-auto justify-center transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgb(var(--border-subtle))",
                color: "rgb(var(--text-secondary))",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            >
              Sign In
            </button>
          </div>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: Users, value: "10K+", label: "Students" },
              { icon: Trophy, value: "4.9★", label: "Rating" },
              { icon: Zap, value: "6", label: "AI Tools" },
              { icon: GraduationCap, value: "Free", label: "Forever" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <s.icon className="w-4 h-4" style={{ color: "#F97316" }} />
                <span className="text-sm font-bold" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>
                  {s.value}
                </span>
                <span className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 z-10">
          <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}>
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: "rgb(var(--text-muted))" }} />
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────── */}
      <section
        className="py-24 relative"
        style={{ borderTop: "1px solid rgb(var(--border-subtle))" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 100% 50%, rgba(239,68,68,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
          <div className="mb-14 max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo-icon.png" alt="Grit AI" width={28} height={28} className="object-contain opacity-90" />
              <p
                className="text-sm font-black uppercase tracking-[0.18em]"
                style={{ color: "#F97316", fontFamily: "var(--font-syne)", letterSpacing: "0.2em", textShadow: "0 0 24px rgba(249,115,22,0.4)" }}
              >
                Everything You Need
              </p>
            </div>
            <h2
              className="font-black leading-[1.05] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-syne)",
                color: "rgb(var(--text-primary))",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              Six tools. One platform.{" "}
              <span className="brand-gradient-text">Zero limits.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl p-6 transition-all duration-200 cursor-default"
                style={{
                  background: "rgb(var(--bg-surface-1))",
                  border: "1px solid rgb(var(--border-subtle))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = `1px solid ${f.color}30`;
                  e.currentTarget.style.background = "rgb(var(--bg-surface-2))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid rgb(var(--border-subtle))";
                  e.currentTarget.style.background = "rgb(var(--bg-surface-1))";
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: f.bg }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3
                  className="text-sm font-bold mb-2"
                  style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}
                >
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgb(var(--text-muted))" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────── */}
      <section
        className="py-24"
        style={{
          background: "rgb(var(--bg-surface-1))",
          borderTop: "1px solid rgb(var(--border-subtle))",
          borderBottom: "1px solid rgb(var(--border-subtle))",
        }}
      >
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-6 pb-4">
          <div className="mb-14 text-center">
            <p
              className="text-sm font-black uppercase tracking-[0.18em] mb-3"
              style={{
                color: "#F97316",
                fontFamily: "var(--font-syne)",
                letterSpacing: "0.2em",
                textShadow: "0 0 24px rgba(249,115,22,0.4)",
              }}
            >
              How It Works
            </p>
            <h2
              className="font-black leading-[1.05] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-syne)",
                color: "rgb(var(--text-primary))",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              From lecture to study pack{" "}
              <span className="brand-gradient-text">in 3 steps.</span>
            </h2>
          </div>

            {/* Desktop: 5-col grid with explicit arrows - no absolute-positioned line */}
          <div className="hidden md:grid md:grid-cols-[1fr_2.5rem_1fr_2.5rem_1fr] items-start gap-2">
            {steps.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)" }}
                  >
                    <s.icon className="w-5 h-5" style={{ color: "#F97316" }} />
                  </div>
                  <h3
                    className="text-sm font-bold mb-2"
                    style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgb(var(--text-muted))" }}>
                    {s.desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex items-center justify-center" style={{ paddingTop: "1.25rem" }}>
                    <ChevronRight className="w-5 h-5" style={{ color: "rgba(249,115,22,0.4)" }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile: vertical stack */}
          <div className="flex md:hidden flex-col gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="flex flex-col items-center text-center">
                <div className="pb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)" }}
                  >
                    <s.icon className="w-5 h-5" style={{ color: "#F97316" }} />
                  </div>
                  <h3
                    className="text-sm font-bold mb-1.5"
                    style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgb(var(--text-muted))" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-6 pb-4">
          <div className="text-center mb-12">
            <p
              className="text-sm font-black uppercase tracking-[0.18em] mb-3"
              style={{ color: "#F97316", fontFamily: "var(--font-syne)", letterSpacing: "0.2em", textShadow: "0 0 24px rgba(249,115,22,0.4)" }}
            >
              Student Reviews
            </p>
            <h2
              className="font-black leading-[1.05] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-syne)",
                color: "rgb(var(--text-primary))",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
              }}
            >
              What Students Feel About{" "}
              <span className="brand-gradient-text">Grit AI.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                quote: "Went from drowning in notes to acing finals. Grit AI is literally a cheat code.",
                name: "Rahul K.",
                role: "Engineering, IIT Delhi",
              },
              {
                quote: "I upload my professor's slides and get a full quiz in 30 seconds. Nothing comes close.",
                name: "Aanya M.",
                role: "Medicine, AIIMS",
              },
              {
                quote: "The braille output is a game-changer. Finally a tool that actually thinks about accessibility.",
                name: "Shreya V.",
                role: "Law, NLS Bangalore",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-6"
                style={{
                  background: "rgb(var(--bg-surface-1))",
                  border: "1px solid rgb(var(--border-subtle))",
                }}
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#F97316" }} viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgb(var(--text-secondary))" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-bold" style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}>
                    {t.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgb(var(--text-muted))" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────── */}
      <section className="pb-20">
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-6 pb-4">
          <div
            className="rounded-3xl px-8 py-14 text-center relative overflow-hidden"
            style={{ background: "rgb(var(--bg-surface-1))", border: "1px solid rgba(249,115,22,0.2)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(249,115,22,0.1) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <h2
                className="font-black tracking-[-0.03em] mb-4"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "rgb(var(--text-primary))",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                }}
              >
                Your next exam starts{" "}
                <span className="brand-gradient-text">here.</span>
              </h2>
              <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "rgb(var(--text-muted))" }}>
                Join thousands of students who study smarter with Grit AI. Free forever. No credit card required.
              </p>
              <button
                onClick={() => router.push("/signup")}
                className="btn-fire inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <CopyRight />
    </>
  );
};

/* ─── Dashboard ───────────────────────────────────────────────────── */

interface DashboardProps {
  lectures: Lecture[];
  onAdd: () => void;
  onEdit: (l: Lecture) => void;
  onDelete: (l: Lecture) => void;
  onOpen: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  filtered: Lecture[];
}

const Dashboard: React.FC<DashboardProps> = ({
  lectures,
  onAdd,
  onEdit,
  onDelete,
  onOpen,
  searchQuery,
  setSearchQuery,
  filtered,
}) => {
  const stats = [
    {
      icon: BookOpen,
      color: "#F97316",
      bg: "rgba(249,115,22,0.1)",
      label: "Total Lectures",
      value: lectures.length.toString(),
    },
    {
      icon: Brain,
      color: "#A855F7",
      bg: "rgba(168,85,247,0.1)",
      label: "AI Status",
      value: "Active",
    },
    {
      icon: Zap,
      color: "#EAB308",
      bg: "rgba(234,179,8,0.1)",
      label: "Study Tools",
      value: "6",
    },
    {
      icon: GraduationCap,
      color: "#10B981",
      bg: "rgba(16,185,129,0.1)",
      label: "Your Plan",
      value: "Free",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-20" style={{ fontFamily: "var(--font-dm-sans)" }}>
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-6 pb-4">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-4"
              style={{
                background: "rgb(var(--bg-surface-1))",
                border: "1px solid rgb(var(--border-subtle))",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: s.bg }}
              >
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <p
                className="text-xl font-black"
                style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))", letterSpacing: "-0.02em" }}
              >
                {s.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgb(var(--text-muted))" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Lectures section */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgb(var(--bg-surface-1))",
            border: "1px solid rgb(var(--border-subtle))",
          }}
        >
          {/* Section header */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid rgb(var(--border-subtle))" }}
          >
            <div className="flex items-center gap-3">
              <h2
                className="text-base font-black tracking-tight"
                style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))", letterSpacing: "-0.02em" }}
              >
                Your Lectures
              </h2>
              {lectures.length > 0 && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: "rgb(var(--bg-surface-2))",
                    color: "rgb(var(--text-muted))",
                    border: "1px solid rgb(var(--border-subtle))",
                  }}
                >
                  {lectures.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {lectures.length > 0 && (
                <div className="relative">
                  <Search
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                    style={{ color: "rgb(var(--text-muted))" }}
                  />
                  <input
                    type="text"
                    placeholder="Search lectures…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs rounded-lg outline-none transition-all"
                    style={{
                      background: "rgb(var(--bg-surface-2))",
                      border: "1px solid rgb(var(--border-subtle))",
                      color: "rgb(var(--text-primary))",
                      width: "10rem",
                    }}
                  />
                </div>
              )}
              <button
                onClick={onAdd}
                className="btn-fire flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                New Lecture
              </button>
            </div>
          </div>

          {/* Table / Empty state */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "rgb(var(--bg-surface-2))" }}
              >
                <BookOpen className="w-6 h-6" style={{ color: "rgb(var(--text-dim))" }} />
              </div>
              <div className="text-center">
                <p
                  className="text-sm font-bold"
                  style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}
                >
                  {searchQuery ? "No matches found" : "No lectures yet"}
                </p>
                <p className="text-xs mt-1" style={{ color: "rgb(var(--text-muted))" }}>
                  {searchQuery
                    ? "Try a different search term."
                    : "Create your first lecture to start generating AI study materials."}
                </p>
              </div>
              {!searchQuery && (
                <button onClick={onAdd} className="btn-fire text-xs px-5 py-2 rounded-lg">
                  Create First Lecture
                </button>
              )}
            </div>
          ) : (
            <div>
              {/* Table header */}
              <div
                className="hidden sm:grid grid-cols-[3rem_1fr_9rem_8rem] gap-4 px-5 py-2.5"
                style={{ background: "rgb(var(--bg-surface-2))", borderBottom: "1px solid rgb(var(--border-subtle))" }}
              >
                {["#", "Topic", "Created", "Actions"].map((h, i) => (
                  <span
                    key={h}
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{
                      color: "rgb(var(--text-muted))",
                      fontFamily: "var(--font-syne)",
                      textAlign: i === 3 ? "right" : i === 0 ? "center" : "left",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Rows */}
              {filtered.map((lecture, i) => (
                <div
                  key={lecture._id}
                  className="group grid grid-cols-1 sm:grid-cols-[3rem_1fr_9rem_8rem] gap-4 items-center px-5 py-3.5 cursor-pointer transition-all"
                  style={{
                    borderBottom: i < filtered.length - 1 ? "1px solid rgb(var(--border-subtle))" : "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgb(var(--bg-surface-2))";
                  }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  onClick={() => onOpen(lecture._id)}
                >
                  {/* Index */}
                  <span
                    className="hidden sm:block text-center text-xs font-mono font-semibold"
                    style={{ color: "rgb(var(--text-dim))" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Topic */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.15)" }}
                    >
                      <FileText className="w-3.5 h-3.5" style={{ color: "#F97316" }} />
                    </div>
                    <span
                      className="text-sm font-medium truncate"
                      style={{ color: "rgb(var(--text-primary))" }}
                    >
                      {lecture.topic}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <Clock className="w-3 h-3 flex-shrink-0" style={{ color: "rgb(var(--text-dim))" }} />
                    <span className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>
                      {lecture.createdAt ? formatDate(lecture.createdAt) : "-"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div
                    className="hidden sm:flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onOpen(lecture._id)}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all"
                      style={{
                        background: "rgba(249,115,22,0.12)",
                        color: "#F97316",
                        border: "1px solid rgba(249,115,22,0.2)",
                      }}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => onEdit(lecture)}
                      className="p-1.5 rounded-lg transition-all hover:bg-white/5"
                      style={{ color: "rgb(var(--text-muted))" }}
                      title="Rename"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(lecture)}
                      className="p-1.5 rounded-lg transition-all hover:bg-red-500/10"
                      style={{ color: "rgb(var(--text-muted))" }}
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5 hover:text-red-400" />
                    </button>
                  </div>

                  {/* Mobile actions */}
                  <div
                    className="flex sm:hidden items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onOpen(lecture._id)}
                      className="text-[11px] font-semibold px-3 py-1.5 rounded-lg"
                      style={{ background: "rgba(249,115,22,0.12)", color: "#F97316" }}
                    >
                      Open
                    </button>
                    <button onClick={() => onEdit(lecture)} className="p-1.5" style={{ color: "rgb(var(--text-muted))" }}>
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => onDelete(lecture)} className="p-1.5" style={{ color: "rgb(var(--text-muted))" }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CopyRight />
    </div>
  );
};

/* ─── Root Home Component ─────────────────────────────────────────── */

const Home = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newLecture, setNewLecture] = useState("");
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);
  const [lectureToDelete, setLectureToDelete] = useState<Lecture | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
    const jwt = localStorage.getItem("token");
    setToken(jwt);
    if (jwt) fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const res = await axios.get("/api/users/lectures", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLectures(res.data.lectures || []);
    } catch {
      toast.error("Failed to fetch lectures");
    }
  };

  const handleAddLecture = async () => {
    if (!newLecture.trim()) { toast.error("Topic cannot be empty"); return; }
    try {
      const res = await axios.post(
        "/api/users/lecture",
        { topic: newLecture.trim() },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setNewLecture(""); setDialogOpen(false);
      toast.success(res.data.message || "Lecture added");
      fetchLectures();
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Failed to add lecture");
    }
  };

  const handleUpdateLecture = async (id: string) => {
    if (!newLecture.trim()) { toast.error("Topic cannot be empty"); return; }
    try {
      const res = await axios.put(
        "/api/users/updatelecture",
        { lectureId: id, newTopic: newLecture.trim() },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setNewLecture(""); setDialogOpen(false); setEditingLecture(null);
      toast.success(res.data.message || "Lecture updated");
      fetchLectures();
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Failed to update lecture");
    }
  };

  const handleDeleteLecture = async (id: string) => {
    try {
      await axios.delete("/api/users/deletelecture", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { lectureId: id },
      });
      setLectures((prev) => prev.filter((l) => l._id !== id));
      setDeleteDialogOpen(false);
      toast.success("Lecture deleted");
    } catch {
      toast.error("Failed to delete lecture");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      editingLecture ? handleUpdateLecture(editingLecture._id) : handleAddLecture();
    }
  };

  const filtered = lectures.filter((l) =>
    l.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isMounted) return null;

  return (
    <>
      {/* Landing page for guests */}
      {!token && <LandingPage />}

      {/* Dashboard for authenticated users */}
      {token && (
        <Dashboard
          lectures={lectures}
          filtered={filtered}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAdd={() => { setEditingLecture(null); setNewLecture(""); setDialogOpen(true); }}
          onEdit={(l) => { setEditingLecture(l); setNewLecture(l.topic); setDialogOpen(true); }}
          onDelete={(l) => { setLectureToDelete(l); setDeleteDialogOpen(true); }}
          onOpen={(id) => router.push(`/lecture/${id}`)}
        />
      )}

      {/* ── Delete Confirmation Dialog ── */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent
          className="rounded-2xl border max-w-sm"
          style={{
            background: "rgb(var(--bg-surface-2))",
            borderColor: "rgb(var(--border-subtle))",
            color: "rgb(var(--text-primary))",
          }}
        >
          <DialogTitle className="text-base font-semibold" style={{ fontFamily: "var(--font-syne)" }}>
            Delete Lecture
          </DialogTitle>
          <p className="text-sm mt-1" style={{ color: "rgb(var(--text-muted))" }}>
            &ldquo;{lectureToDelete?.topic}&rdquo; will be permanently deleted. This cannot be undone.
          </p>
          <DialogFooter className="gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="rounded-xl border text-xs"
              style={{ borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-secondary))" }}
            >
              Cancel
            </Button>
            <button
              onClick={() => lectureToDelete && handleDeleteLecture(lectureToDelete._id)}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Add / Edit Dialog ── */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) { setEditingLecture(null); setNewLecture(""); }
        }}
      >
        <DialogContent
          className="rounded-2xl border max-w-sm"
          style={{
            background: "rgb(var(--bg-surface-2))",
            borderColor: "rgb(var(--border-subtle))",
            color: "rgb(var(--text-primary))",
          }}
        >
          <DialogTitle className="text-base font-semibold" style={{ fontFamily: "var(--font-syne)" }}>
            {editingLecture ? "Rename Lecture" : "New Lecture"}
          </DialogTitle>
          <p className="text-xs mt-0.5" style={{ color: "rgb(var(--text-muted))" }}>
            {editingLecture
              ? "Update the lecture topic name."
              : "Enter a topic to create a new lecture session."}
          </p>
          <div className="mt-3">
            <Input
              placeholder="e.g. Quantum Mechanics Chapter 3"
              value={newLecture}
              onChange={(e) => setNewLecture(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="rounded-xl text-sm"
              style={{
                background: "rgb(var(--bg-surface-3))",
                borderColor: "rgb(var(--border-default))",
                color: "rgb(var(--text-primary))",
              }}
            />
          </div>
          <DialogFooter className="gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => { setDialogOpen(false); setEditingLecture(null); setNewLecture(""); }}
              className="rounded-xl text-xs border"
              style={{ borderColor: "rgb(var(--border-subtle))", color: "rgb(var(--text-secondary))" }}
            >
              Cancel
            </Button>
            <button
              onClick={() => editingLecture ? handleUpdateLecture(editingLecture._id) : handleAddLecture()}
              className="btn-fire text-xs px-5 py-2 rounded-xl"
            >
              {editingLecture ? "Save Changes" : "Create Lecture"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;
