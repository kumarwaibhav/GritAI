"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import JSZip from "jszip";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import Nav from "@/components/navbar/page";
import CopyRight from "@/components/copybar/page";
import Loader from "@/components/loader/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaFilePowerpoint, FaFilePdf } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";

declare global {
  interface Window { webkitSpeechRecognition: any; }
}

const LecturePage = () => {
  const router = useRouter();
  const params = useParams() as { id?: string | string[] } | null;
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [userRole, setUserRole] = useState("");
  const [lectureDetails, setLectureDetails] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);
  const [notes, setNotes] = useState<string | null>(null);
  const [qwiz, setQwiz] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<string | null>(null);
  const [cheatSheet, setCheatSheet] = useState<string | null>(null);
  const [quizCount, setQuizCount] = useState(10);
  const [activeTab, setActiveTab] = useState("notes");
  const [buttonText, setButtonText] = useState("Generate Study Materials");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAccessible, setIsAccessible] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [speakingTabs, setSpeakingTabs] = useState<{ [k: string]: boolean }>({});
  const [isExtracting, setIsExtracting] = useState(false);
  const pptInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") setSynth(window.speechSynthesis);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const r = new window.webkitSpeechRecognition();
      r.continuous = true;
      r.interimResults = true;
      r.lang = "en-US";
      r.onresult = (event: any) => {
        let finalText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) finalText += event.results[i][0].transcript;
        }
        setTranscript((prev) => {
          if (finalText.trim() && !prev.endsWith(finalText.trim()))
            return prev + " " + finalText.trim();
          return prev;
        });
      };
      setRecognition(r);
    }
  }, []);

  useEffect(() => {
    if (isRecording) {
      timer.current = setInterval(() => setTime((t) => t + 1), 1000);
      recognition?.start();
    } else {
      if (timer.current) clearInterval(timer.current);
      setTime(0);
      recognition?.stop();
    }
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [isRecording, recognition]);

  const expiryLogout = async () => {
    try { await axios.get("/api/users/logout"); } catch {}
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        const d = data.data;
        setUserDetails(d);
        setUserRole(d.role);
        setLoading(false);
        const lecture = d.lectures.find((l: any) => l._id.toString() === id);
        if (lecture) {
          setLectureDetails({
            lectureId: lecture._id,
            lectureName: lecture.topic,
            LectureTime: formatLectureTime(lecture.createdAt),
          });
          setTranscript(lecture.transcript || "");
          setNotes(lecture.notes || null);
          setQwiz(lecture.qwiz || null);
          setFlashcards(lecture.flashcards || null);
          setCheatSheet(lecture.cheatSheet || null);
        } else {
          router.push("/");
        }
      } catch {
        await expiryLogout();
        router.push("/login");
      }
    };
    fetchData();
  }, [router, id]);

  const formatTime = (t: number) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const formatLectureTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString("en-IN")} ${d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false })}`;
  };

  const callGenerate = async (type: string, extra: Record<string, unknown> = {}) => {
    const res = await fetch("/api/users/generateResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, type, ...extra }),
    });
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) throw new Error(`Server error (${res.status})`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || `Failed to generate ${type}`);
    return json.output;
  };

  const handleGenerateClick = async () => {
    if (!transcript.trim()) { toast.error("Please add a transcript first"); return; }
    setIsGenerating(true);
    try {
      setButtonText("Generating notes…");
      const n = await callGenerate("lectureNotes");
      setNotes(n);
      setActiveTab("notes");

      setButtonText("Generating quiz…");
      const q = await callGenerate("quiz", { quizCount });
      setQwiz(q);
      setActiveTab("qwiz");

      setButtonText("Generating scenario questions…");
      const fc = await callGenerate("flashcards");
      setFlashcards(fc);
      setActiveTab("flashcards");

      setButtonText("Generating cheat sheet…");
      const cs = await callGenerate("cheatsheet");
      setCheatSheet(cs);
      setActiveTab("cheatsheet");

      setButtonText("Saving…");
      const saveRes = await fetch("/api/users/saveGeneration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: lectureDetails?.lectureName, notes: n, qwiz: q, flashcards: fc, cheatSheet: cs }), // order: notes, quiz, scenario, cheatsheet
      });
      const saveResult = await saveRes.json();
      if (saveResult.success) toast.success("Study materials generated and saved!");

      setButtonText("Generate Study Materials");
    } catch (e: any) {
      toast.error(e?.message || "Generation failed");
      setButtonText("Generate Study Materials");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveTranscript = async () => {
    try {
      const res = await fetch("/api/users/saveTranscript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: lectureDetails?.lectureName, transcript }),
      });
      const r = await res.json();
      if (res.ok) toast.success(r.message);
      else toast.error(r.error);
    } catch { toast.error("Failed to save transcript"); }
  };

  const handleDocumentUpload = async (file: File, endpoint: string, label: string) => {
    setIsExtracting(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(endpoint, { method: "POST", body: fd });
      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("application/json")) throw new Error(`Server error (${res.status})`);
      const result = await res.json();
      if (!res.ok) { toast.error(result.error || `Failed to extract ${label}`); return; }
      setTranscript(result.text || "");
      toast.success(`${label} extracted! Review transcript and generate.`);
    } catch (e: any) {
      toast.error(e.message || `Error parsing ${label}`);
    } finally { setIsExtracting(false); }
  };

  const extractPptx = async (file: File) => {
    const zip = await JSZip.loadAsync(file);
    const slideFiles = Object.keys(zip.files)
      .filter((n) => /^ppt\/slides\/slide\d+\.xml$/i.test(n))
      .sort((a, b) => {
        const na = Number(a.match(/slide(\d+)\.xml$/i)?.[1] || 0);
        const nb = Number(b.match(/slide(\d+)\.xml$/i)?.[1] || 0);
        return na - nb;
      });
    if (!slideFiles.length) throw new Error("No slides found.");
    const texts = await Promise.all(slideFiles.map(async (sf, i) => {
      const xml = await zip.file(sf)?.async("text");
      if (!xml) return "";
      const doc = new DOMParser().parseFromString(xml, "application/xml");
      const text = Array.from(doc.getElementsByTagNameNS("*", "t"))
        .map((n) => n.textContent || "").join(" ").replace(/\s+/g, " ").trim();
      return text ? `Slide ${i + 1}:\n${text}` : "";
    }));
    const extracted = texts.filter(Boolean).join("\n\n");
    if (!extracted.trim()) throw new Error("No text found in PPT.");
    return extracted;
  };

  const handlePPTUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    e.target.value = "";
    setIsExtracting(true);
    try {
      if (!file.name.toLowerCase().endsWith(".pptx")) throw new Error("Only .pptx files supported.");
      setTranscript(await extractPptx(file));
      toast.success("PPT extracted! Review transcript and generate.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error parsing PPT");
    } finally { setIsExtracting(false); }
  };

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    e.target.value = "";
    await handleDocumentUpload(file, "/api/users/parsePDF", "PDF");
  };

  const splitTextIntoChunks = (text: string, size = 200) => {
    return text.match(new RegExp(`.{1,${size}}(\\s|$)`, "g")) || [];
  };

  const toggleSpeech = (tab: string, text: string) => {
    if (!synth) return;
    if (speakingTabs[tab]) {
      synth.cancel();
      setSpeakingTabs((p) => ({ ...p, [tab]: false }));
    } else {
      if (!text) return;
      const chunks = splitTextIntoChunks(text);
      const utts = chunks.map((chunk, i) => {
        const u = new SpeechSynthesisUtterance(chunk);
        u.lang = "en-US";
        u.onend = () => {
          if (i === chunks.length - 1) setSpeakingTabs((p) => ({ ...p, [tab]: false }));
          else synth.speak(utts[i + 1]);
        };
        return u;
      });
      if (utts.length > 0) { synth.speak(utts[0]); setSpeakingTabs((p) => ({ ...p, [tab]: true })); }
    }
  };

  const stripMarkdown = (md: string) =>
    md.replace(/[#_*~>]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/!\[.*\]\(.*\)/g, "").replace(/\n+/g, " ").trim();

  const parseInlineMd = (text: string): TextRun[] =>
    text.split(/(\*\*[^*]+\*\*)/g).map((p) =>
      p.startsWith("**") && p.endsWith("**")
        ? new TextRun({ text: p.slice(2, -2), bold: true })
        : new TextRun({ text: p })
    );

  const mdToDocxParagraphs = (md: string): Paragraph[] =>
    md.split("\n").map((rawLine) => {
      const line = rawLine.trimEnd();
      if (line.startsWith("### ")) return new Paragraph({ heading: HeadingLevel.HEADING_3, children: parseInlineMd(line.slice(4)) });
      if (line.startsWith("## ")) return new Paragraph({ heading: HeadingLevel.HEADING_2, children: parseInlineMd(line.slice(3)) });
      if (line.startsWith("# ")) return new Paragraph({ heading: HeadingLevel.HEADING_1, children: parseInlineMd(line.slice(2)) });
      if (line.startsWith("- ") || line.startsWith("* ")) return new Paragraph({ bullet: { level: 0 }, children: parseInlineMd(line.slice(2)) });
      if (/^\d+\.\s/.test(line)) return new Paragraph({ numbering: { reference: "default-numbering", level: 0 }, children: parseInlineMd(line.replace(/^\d+\.\s/, "")) });
      if (line.trim() === "---") return new Paragraph({ children: [new TextRun({ text: "──────────────────────────", color: "999999" })] });
      if (!line.trim()) return new Paragraph({ children: [new TextRun("")] });
      return new Paragraph({ children: parseInlineMd(line) });
    });

  const convertToBraille = (text: string) => {
    const map: Record<string, string> = {
      A:"⠁",B:"⠃",C:"⠉",D:"⠙",E:"⠑",F:"⠋",G:"⠛",H:"⠓",I:"⠊",J:"⠚",K:"⠅",L:"⠇",M:"⠍",N:"⠝",O:"⠕",P:"⠏",Q:"⠟",R:"⠗",S:"⠎",T:"⠞",U:"⠥",V:"⠧",W:"⠺",X:"⠭",Y:"⠽",Z:"⠵",
      "1":"⠼⠁","2":"⠼⠃","3":"⠼⠉","4":"⠼⠙","5":"⠼⠑","6":"⠼⠋","7":"⠼⠛","8":"⠼⠓","9":"⠼⠊","0":"⠼⠚",
      " ":" ",".":"⠲",",":"⠂","?":"⠦","!":"⠖","-":"⠤",":":"⠒",";":"⠆","(":"⠶",")":"⠶","/":"⠌","'":"⠄","\"":"⠐⠦","&":"⠯",
    };
    return text.toUpperCase().split("").map((c) => map[c] || c).join("");
  };

  const handleSave = (title: string, content: string) => {
    if (!content) return;
    let final = content.replace(/<br\s*\/?>/g, "\n");
    if (isAccessible) final = convertToBraille(final);
    const doc = new Document({
      numbering: {
        config: [{
          reference: "default-numbering",
          levels: [{ level: 0, format: "decimal", text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
        }],
      },
      sections: [{
        properties: {},
        children: [
          new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: title, bold: true })] }),
          new Paragraph({ children: [new TextRun("")] }),
          ...(isAccessible
            ? final.split("\n").map((l) => new Paragraph({ children: [new TextRun(l)] }))
            : mdToDocxParagraphs(final)),
        ],
      }],
    });
    Packer.toBlob(doc).then((b) => saveAs(b, `${title}${isAccessible ? "_braille" : ""}.docx`));
  };

  if (!lectureDetails) {
    return (
      <div className="flex h-screen items-center justify-center mesh-bg">
        <Loader />
      </div>
    );
  }

  const tabConfig = [
    { value: "notes", label: "Notes", content: notes, emptyMsg: "Generate notes from your transcript." },
    { value: "qwiz", label: "Quiz", content: qwiz, emptyMsg: "Generate a quiz from your transcript." },
    { value: "flashcards", label: "Scenario Q", content: flashcards, emptyMsg: "Generate scenario questions." },
    { value: "cheatsheet", label: "Cheat Sheet", content: cheatSheet, emptyMsg: "Generate a cheat sheet." },
  ];

  const hasAnyContent = notes || qwiz || flashcards || cheatSheet;

  return (
    <div className="min-h-screen mesh-bg flex flex-col" style={{ fontFamily: "var(--font-dm-sans)" }}>
      <Nav loading={loading} userRole={userRole} userDetails={userDetails} />

      <div className="pt-16 px-4 pb-2 max-w-6xl mx-auto">
        {/* Lecture header */}
        <div className="flex items-start justify-between mt-4 mb-5 animate-fade-in">
          <div>
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-1.5 text-xs mb-3 transition-colors hover:text-orange-400"
              style={{ color: "rgb(var(--text-muted))" }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Lectures
            </button>
            <h1
              className="text-2xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}
            >
              {lectureDetails.lectureName}
            </h1>
            <p className="text-xs mt-1" style={{ color: "rgb(var(--text-muted))" }}>
              {lectureDetails.LectureTime}
            </p>
          </div>

          {/* Accessibility toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>Accessibility</span>
            <label className="flex items-center cursor-pointer gap-2">
              <input type="checkbox" checked={isAccessible} onChange={() => setIsAccessible(!isAccessible)} className="hidden" />
              <div
                className="relative w-10 h-5 rounded-full transition-colors"
                style={{ background: isAccessible ? "#F97316" : "rgb(var(--bg-surface-3))", border: "1px solid rgb(var(--border-subtle))" }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                  style={{ left: isAccessible ? "calc(100% - 18px)" : "2px" }}
                />
              </div>
              <AiOutlineEye className="text-base" style={{ color: isAccessible ? "#F97316" : "rgb(var(--text-muted))" }} />
            </label>
          </div>
        </div>

        {/* Upload bar */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl mb-4 animate-fade-in delay-50"
          style={{ background: "rgb(var(--bg-surface-1))", border: "1px solid rgb(var(--border-subtle))" }}
        >
          <input ref={pptInputRef} type="file" accept=".pptx" className="hidden" onChange={handlePPTUpload} />
          <input ref={pdfInputRef} type="file" accept=".pdf" className="hidden" onChange={handlePDFUpload} />

          <button
            onClick={() => pptInputRef.current?.click()}
            disabled={isExtracting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all disabled:opacity-50"
            style={{
              background: "rgb(var(--bg-surface-2))",
              border: "1px solid rgb(var(--border-subtle))",
              color: "rgb(var(--text-secondary))",
            }}
          >
            <FaFilePowerpoint className="text-orange-500 text-base" />
            {isExtracting ? "Extracting…" : "Upload PPT"}
          </button>

          <button
            onClick={() => pdfInputRef.current?.click()}
            disabled={isExtracting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all disabled:opacity-50"
            style={{
              background: "rgb(var(--bg-surface-2))",
              border: "1px solid rgb(var(--border-subtle))",
              color: "rgb(var(--text-secondary))",
            }}
          >
            <FaFilePdf className="text-red-500 text-base" />
            {isExtracting ? "Extracting…" : "Upload PDF"}
          </button>

          <p className="text-xs" style={{ color: "rgb(var(--text-dim))" }}>
            Upload <strong>.pptx</strong> or <strong>.pdf</strong> to auto-fill transcript
          </p>
        </div>

        {/* Recording bar */}
        <div
          className="rounded-2xl mb-4 overflow-hidden animate-fade-in delay-100 transition-all duration-300"
          style={{
            background: isRecording ? "rgba(239,68,68,0.04)" : "rgb(var(--bg-surface-1))",
            border: isRecording ? "1px solid rgba(239,68,68,0.15)" : "1px solid rgb(var(--border-subtle))",
          }}
        >
          {isRecording ? (
            /* Active - centered focused panel */
            <div className="flex flex-col items-center gap-5 px-6 py-8">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ background: "#EF4444", boxShadow: "0 0 8px rgba(239,68,68,0.6)" }}
                />
                <span className="text-sm font-mono font-semibold" style={{ color: "#EF4444" }}>
                  {formatTime(time)}
                </span>
              </div>
              <div className="wave-container">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="wave-bar" />
                ))}
              </div>
              <button
                onClick={() => setIsRecording(false)}
                className="flex items-center gap-2 px-8 py-2.5 rounded-full text-xs font-semibold transition-all hover:bg-red-500/10"
                style={{ border: "1px solid rgba(239,68,68,0.4)", color: "#EF4444" }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="1.5" />
                </svg>
                Stop Recording
              </button>
            </div>
          ) : (
            /* Idle - compact horizontal row */
            <button
              onClick={() => setIsRecording(true)}
              className="w-full flex items-center justify-between px-5 py-3.5 transition-all hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgb(var(--bg-surface-2))", border: "1px solid rgb(var(--border-subtle))" }}
                >
                  <FaMicrophoneAlt className="text-sm" style={{ color: "rgb(var(--text-muted))" }} />
                </div>
                <p
                  className="text-sm font-semibold"
                  style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}
                >
                  Click to Record Lecture
                </p>
              </div>
              <div
                className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(249,115,22,0.12)", color: "#F97316", border: "1px solid rgba(249,115,22,0.2)" }}
              >
                Record
              </div>
            </button>
          )}
        </div>

        {/* Transcript */}
        <div
          className="rounded-2xl mb-4 animate-fade-in delay-150"
          style={{ background: "rgb(var(--bg-surface-1))", border: "1px solid rgb(var(--border-subtle))" }}
        >
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: "1px solid rgb(var(--border-subtle))" }}
          >
            <Label
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "rgb(var(--text-muted))", fontFamily: "var(--font-syne)" }}
            >
              Lecture Transcript
            </Label>
            <div className="flex items-center gap-2">
              {isAccessible && transcript && (
                <button
                  onClick={() => toggleSpeech("transcript", transcript)}
                  className="text-xs px-2.5 py-1 rounded-lg transition-all"
                  style={{
                    background: speakingTabs["transcript"] ? "rgba(239,68,68,0.12)" : "rgb(var(--bg-surface-2))",
                    color: speakingTabs["transcript"] ? "#EF4444" : "rgb(var(--text-muted))",
                    border: "1px solid rgb(var(--border-subtle))",
                  }}
                >
                  {speakingTabs["transcript"] ? "🔴 Stop" : "🔊 Listen"}
                </button>
              )}
            </div>
          </div>

          <div className="p-4 relative">
            <textarea
              className="w-full h-32 text-sm resize-none outline-none no-scrollbar rounded-xl p-3 transition-all"
              placeholder="Start recording, upload a file, or paste your transcript here…"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              style={{
                background: "rgb(var(--bg-surface-2))",
                border: "1px solid rgb(var(--border-subtle))",
                color: "rgb(var(--text-primary))",
                fontFamily: "var(--font-dm-sans)",
              }}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={saveTranscript}
                className="text-xs px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: "rgb(var(--bg-surface-2))",
                  border: "1px solid rgb(var(--border-subtle))",
                  color: "rgb(var(--text-secondary))",
                }}
              >
                Save Transcript
              </button>
              {transcript && (
                <button
                  onClick={() => handleSave("Lecture Transcript", transcript)}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all"
                  style={{
                    background: "rgb(var(--bg-surface-2))",
                    border: "1px solid rgb(var(--border-subtle))",
                    color: "rgb(var(--text-secondary))",
                  }}
                >
                  Download {isAccessible ? "Braille" : "DOCX"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Generate button */}
        <div className="flex justify-center mb-4 animate-fade-in delay-200">
          <button
            onClick={handleGenerateClick}
            disabled={isGenerating}
            className={`flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed ${isGenerating ? "animating" : ""}`}
            style={{
              background: "linear-gradient(135deg, #F97316, #EF4444)",
              color: "white",
              boxShadow: isGenerating ? undefined : "0 8px 24px rgba(249,115,22,0.25)",
            }}
          >
            <FaWandMagicSparkles className={isGenerating ? "animate-spin" : ""} />
            {buttonText}
          </button>
        </div>

        {/* Results tabs */}
        <div
          className="rounded-2xl overflow-hidden animate-fade-in delay-250"
          style={{ background: "rgb(var(--bg-surface-1))", border: "1px solid rgb(var(--border-subtle))" }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab bar */}
            <div
              className="px-4 pt-3 pb-0"
              style={{ borderBottom: "1px solid rgb(var(--border-subtle))" }}
            >
              <TabsList
                className="bg-transparent p-0 h-auto gap-1 w-full justify-start"
              >
                {tabConfig.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-xs rounded-t-lg rounded-b-none px-4 py-2.5 font-medium data-[state=active]:shadow-none transition-all"
                    style={{
                      fontFamily: "var(--font-syne)",
                      color: "rgb(var(--text-muted))",
                      background: "transparent",
                    }}
                  >
                    {tab.label}
                    {tab.content && (
                      <span className="ml-1.5 w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#F97316" }} />
                    )}
                  </TabsTrigger>
                ))}

                {/* MCQ count selector */}
                <div className="ml-auto flex items-center gap-1.5 mb-1 pr-1">
                  <span className="text-xs" style={{ color: "rgb(var(--text-dim))" }}>MCQs:</span>
                  <select
                    value={quizCount}
                    onChange={(e) => setQuizCount(Number(e.target.value))}
                    disabled={isGenerating}
                    className="text-xs rounded-lg px-2 py-1 outline-none"
                    style={{
                      background: "rgb(var(--bg-surface-2))",
                      border: "1px solid rgb(var(--border-subtle))",
                      color: "rgb(var(--text-primary))",
                    }}
                  >
                    {[5, 10, 15, 20, 25].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </TabsList>
            </div>

            {/* Tab content */}
            <div className="min-h-[280px] max-h-[520px] overflow-y-auto">
              {tabConfig.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="m-0 p-5">
                  {tab.content ? (
                    <div className="relative">
                      {/* Action buttons */}
                      <div className="flex justify-end gap-2 mb-3">
                        <button
                          onClick={() => tab.content && handleSave(
                            tab.value === "notes" ? "Lecture Notes" :
                            tab.value === "qwiz" ? "Quiz" :
                            tab.value === "flashcards" ? "Scenario Questions" : "Cheat Sheet",
                            tab.content
                          )}
                          className="text-xs px-3 py-1.5 rounded-lg transition-all"
                          style={{
                            background: "rgba(249,115,22,0.1)",
                            border: "1px solid rgba(249,115,22,0.2)",
                            color: "#F97316",
                          }}
                        >
                          Download {isAccessible ? "Braille" : "DOCX"}
                        </button>
                        {isAccessible && (
                          <button
                            onClick={() => tab.content && toggleSpeech(tab.value, stripMarkdown(tab.content))}
                            className="text-xs px-3 py-1.5 rounded-lg transition-all"
                            style={{
                              background: speakingTabs[tab.value] ? "rgba(239,68,68,0.12)" : "rgb(var(--bg-surface-2))",
                              border: "1px solid rgb(var(--border-subtle))",
                              color: speakingTabs[tab.value] ? "#EF4444" : "rgb(var(--text-muted))",
                            }}
                          >
                            {speakingTabs[tab.value] ? "🔴 Stop" : "🔊 Listen"}
                          </button>
                        )}
                      </div>
                      <div className="prose-grit">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {String(tab.content).replace(/<br\s*\/?>/g, "\n")}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: "rgb(var(--bg-surface-2))" }}
                      >
                        <FaWandMagicSparkles style={{ color: "rgb(var(--text-dim))", fontSize: "18px" }} />
                      </div>
                      <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
                        {tab.emptyMsg}
                      </p>
                      <button
                        onClick={handleGenerateClick}
                        disabled={isGenerating}
                        className="btn-fire text-xs px-4 py-2 rounded-xl disabled:opacity-50"
                      >
                        Generate Now
                      </button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

      </div>
      <CopyRight />
    </div>
  );
};

export default LecturePage;
