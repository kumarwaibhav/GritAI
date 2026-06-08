"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen mesh-bg" style={{ fontFamily: "var(--font-dm-sans)" }}>
      <div className="max-w-3xl mx-auto px-5 py-16">

        <Link href="/signup" className="inline-flex items-center gap-2 text-sm mb-10 transition-colors hover:text-orange-400" style={{ color: "rgb(var(--text-muted))" }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-[0.15em] mb-3" style={{ color: "#F97316", fontFamily: "var(--font-syne)" }}>Legal</p>
          <h1 className="text-4xl font-black tracking-tight mb-2" style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}>
            Terms of Service
          </h1>
          <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
            Effective Date: 1 June 2026 &nbsp;·&nbsp; Last Updated: 8 June 2026
          </p>
        </div>

        <div className="prose-custom space-y-8" style={{ color: "rgb(var(--text-secondary))", lineHeight: "1.8", fontSize: "0.9rem" }}>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>1. About These Terms</h2>
            <p>These Terms of Service ("Terms") govern your access to and use of Grit AI ("Platform", "we", "our", "us"), an AI-powered study platform operated by <strong>Kumar Waibhav Akshat</strong>, an individual operating under applicable Indian law. By creating an account or using the Platform, you ("User", "you") agree to be bound by these Terms. If you do not agree, you must not use the Platform.</p>
            <p className="mt-3">These Terms are a legally binding agreement under the <strong>Indian Contract Act, 1872</strong> and the <strong>Information Technology Act, 2000</strong> ("IT Act") and its rules.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>2. Eligibility</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You must be at least <strong>18 years of age</strong> to create an account. Users between 13–18 may use the Platform only with verifiable parental or guardian consent as required under the <strong>Digital Personal Data Protection Act, 2023</strong> ("DPDP Act").</li>
              <li>You must be legally capable of entering into a binding contract under Indian law.</li>
              <li>You must not be barred from receiving services under any applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>3. Account Registration and Security</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You agree to provide accurate, complete, and current information during registration.</li>
              <li>You are solely responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must notify us immediately at <strong>kwa.isro@gmail.com</strong> upon any unauthorized access or security breach.</li>
              <li>We reserve the right to suspend or terminate accounts found to be providing false information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>4. Use of the Platform</h2>
            <p className="mb-2">You agree to use Grit AI solely for lawful, personal, and non-commercial educational purposes. You must not:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload content that is defamatory, obscene, pornographic, hateful, or in violation of any law;</li>
              <li>Upload content that infringes upon any third party's intellectual property rights;</li>
              <li>Attempt to reverse-engineer, decompile, or tamper with any part of the Platform;</li>
              <li>Use automated tools, bots, or scrapers to access the Platform;</li>
              <li>Circumvent security features, authentication, or access controls;</li>
              <li>Upload files containing malware, viruses, or harmful code;</li>
              <li>Use the AI-generated output to spread misinformation or for academic fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>5. AI-Generated Content Disclaimer</h2>
            <p>Grit AI uses large language models to generate study materials. You acknowledge that:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>AI-generated notes, quizzes, flashcards, and cheat sheets may contain errors, inaccuracies, or omissions;</li>
              <li>The content is intended as a study aid and must not be relied upon as a substitute for professional, academic, medical, legal, or financial advice;</li>
              <li>We do not guarantee the accuracy, completeness, or fitness of AI-generated content for any particular examination or purpose;</li>
              <li>You are solely responsible for verifying the content before use in academic settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>6. Intellectual Property</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>All Platform code, design, branding, and non-user-generated content are the intellectual property of Kumar Waibhav Akshat and protected under applicable Indian intellectual property laws.</li>
              <li>You retain ownership of lecture transcripts and files you upload ("User Content").</li>
              <li>By uploading User Content, you grant us a limited, non-exclusive, royalty-free licence to process it solely to provide the services described on this Platform.</li>
              <li>We do not use your User Content to train AI models.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>7. Availability and Modifications</h2>
            <p>We strive for high availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of the Platform at any time with reasonable notice. Continued use after changes constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>The Platform is provided on an "as is" and "as available" basis without warranties of any kind;</li>
              <li>We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform;</li>
              <li>Our total aggregate liability to you shall not exceed ₹500 (Indian Rupees Five Hundred).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>9. Termination</h2>
            <p>We may terminate or suspend your access immediately, without prior notice, if you breach these Terms. You may delete your account at any time by contacting us. Upon termination, your right to use the Platform ceases and your data will be handled as described in the Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>10. Governing Law and Dispute Resolution</h2>
            <p>These Terms are governed by the laws of the Republic of India. Any dispute arising out of or in connection with these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be subject to the exclusive jurisdiction of the competent courts located in <strong>New Delhi, India</strong>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>11. Grievance Officer</h2>
            <p>In accordance with the <strong>Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</strong>, the following Grievance Officer has been appointed:</p>
            <div className="mt-3 p-4 rounded-xl" style={{ background: "rgb(var(--bg-surface-1))", border: "1px solid rgb(var(--border-subtle))" }}>
              <p><strong>Name:</strong> Kumar Waibhav Akshat</p>
              <p><strong>Email:</strong> kwa.isro@gmail.com</p>
              <p><strong>Response Time:</strong> Within 24 hours of receipt of complaint</p>
              <p><strong>Resolution Time:</strong> Within 15 days of receipt of complaint</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>12. Contact</h2>
            <p>For any questions regarding these Terms, contact us at <strong>kwa.isro@gmail.com</strong>.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 flex gap-4 text-sm" style={{ borderTop: "1px solid rgb(var(--border-subtle))", color: "rgb(var(--text-dim))" }}>
          <Link href="/privacy" className="hover:text-orange-400 transition-colors" style={{ color: "#F97316" }}>Privacy Policy</Link>
          <span>·</span>
          <Link href="/signup" className="hover:text-orange-400 transition-colors">Back to Signup</Link>
        </div>

      </div>
    </div>
  );
}
