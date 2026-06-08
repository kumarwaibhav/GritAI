"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen mesh-bg" style={{ fontFamily: "var(--font-dm-sans)" }}>
      <div className="max-w-3xl mx-auto px-5 py-16">

        <Link href="/signup" className="inline-flex items-center gap-2 text-sm mb-10 transition-colors hover:text-orange-400" style={{ color: "rgb(var(--text-muted))" }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-[0.15em] mb-3" style={{ color: "#F97316", fontFamily: "var(--font-syne)" }}>Legal</p>
          <h1 className="text-4xl font-black tracking-tight mb-2" style={{ fontFamily: "var(--font-syne)", color: "rgb(var(--text-primary))" }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
            Effective Date: 1 June 2026 &nbsp;·&nbsp; Last Updated: 8 June 2026
          </p>
        </div>

        <div className="space-y-8" style={{ color: "rgb(var(--text-secondary))", lineHeight: "1.8", fontSize: "0.9rem" }}>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>1. Introduction and Identity of Data Fiduciary</h2>
            <p>This Privacy Policy describes how <strong>Grit AI</strong>, operated by <strong>Kumar Waibhav Akshat</strong> ("Data Fiduciary", "we", "our", "us"), collects, uses, stores, and protects your personal data in accordance with the <strong>Digital Personal Data Protection Act, 2023</strong> ("DPDP Act"), the <strong>Information Technology Act, 2000</strong>, and the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong> ("SPDI Rules").</p>
            <div className="mt-3 p-4 rounded-xl" style={{ background: "rgb(var(--bg-surface-1))", border: "1px solid rgb(var(--border-subtle))" }}>
              <p><strong>Data Fiduciary:</strong> Kumar Waibhav Akshat</p>
              <p><strong>Platform:</strong> Grit AI</p>
              <p><strong>Contact:</strong> kwa.isro@gmail.com</p>
              <p><strong>Country:</strong> India</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>2. Personal Data We Collect</h2>
            <p className="mb-2">We collect personal data only to the extent necessary to provide our services ("purpose limitation" under DPDP Act Section 4).</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-3">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgb(var(--border-subtle))" }}>
                    <th className="text-left py-2 pr-4 font-semibold" style={{ color: "rgb(var(--text-primary))" }}>Data Category</th>
                    <th className="text-left py-2 pr-4 font-semibold" style={{ color: "rgb(var(--text-primary))" }}>Specific Data</th>
                    <th className="text-left py-2 font-semibold" style={{ color: "rgb(var(--text-primary))" }}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Account Data", "Name, email address, phone number, password (hashed)", "Account creation, authentication, and communication"],
                    ["Profile Data", "Gender, date of birth (optional)", "Personalisation of experience"],
                    ["User Content", "Lecture transcripts, uploaded PDF/PPTX files", "AI processing to generate study materials"],
                    ["Usage Data", "Lecture titles, generated notes, quiz results", "Service delivery and storage"],
                    ["Technical Data", "IP address (rate limiting only, not stored), browser type, device type", "Security, fraud prevention"],
                  ].map(([cat, data, purpose]) => (
                    <tr key={cat} style={{ borderBottom: "1px solid rgb(var(--border-subtle))" }}>
                      <td className="py-2 pr-4 font-medium" style={{ color: "rgb(var(--text-primary))" }}>{cat}</td>
                      <td className="py-2 pr-4">{data}</td>
                      <td className="py-2">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3"><strong>Sensitive Personal Data:</strong> Passwords are classified as SPDI under Rule 3 of the SPDI Rules. They are stored as bcrypt hashes and never in plaintext.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>3. Consent and Legal Basis for Processing</h2>
            <p>Under <strong>Section 6 of the DPDP Act, 2023</strong>, we process your personal data on the basis of your free, specific, informed, unconditional, and unambiguous consent, which you provide by:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Ticking the "I agree" checkbox during account registration;</li>
              <li>Continuing to use the Platform after being presented with this Policy.</li>
            </ul>
            <p className="mt-3">You have the right to withdraw consent at any time by deleting your account or contacting our Grievance Officer. Withdrawal does not affect the lawfulness of processing prior to withdrawal.</p>
            <p className="mt-3"><strong>Children:</strong> Under Section 9 of the DPDP Act, processing of personal data of children (under 18) requires verifiable parental consent. We do not knowingly collect data from children under 13.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>4. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To create and manage your account;</li>
              <li>To process lecture content and generate AI study materials;</li>
              <li>To communicate service-related notifications (account security, password reset);</li>
              <li>To enforce our Terms of Service and prevent fraud;</li>
              <li>To comply with legal obligations under Indian law.</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> use your data for advertising, profiling, or sale to third parties. We do <strong>not</strong> use your lecture content to train AI models.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>5. Data Sharing and Third-Party Processors</h2>
            <p className="mb-3">We engage the following third-party data processors. Each processes data strictly on our instructions and for the stated purpose:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgb(var(--border-subtle))" }}>
                    <th className="text-left py-2 pr-4 font-semibold" style={{ color: "rgb(var(--text-primary))" }}>Processor</th>
                    <th className="text-left py-2 pr-4 font-semibold" style={{ color: "rgb(var(--text-primary))" }}>Purpose</th>
                    <th className="text-left py-2 font-semibold" style={{ color: "rgb(var(--text-primary))" }}>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["MongoDB Atlas (MongoDB Inc.)", "Database storage of user accounts and lecture data", "USA"],
                    ["Cloudflare Inc.", "Platform hosting and serverless compute", "USA"],
                    ["Groq Inc.", "AI text generation from lecture transcripts", "USA"],
                    ["Upstash Inc.", "Rate limiting (IP address, not stored after window expires)", "USA"],
                    ["Cloudflare Inc.", "CAPTCHA verification (Turnstile) and CDN", "USA"],
                    ["Mailtrap / SMTP Provider", "Transactional email delivery", "EU/USA"],
                  ].map(([proc, purpose, loc]) => (
                    <tr key={proc} style={{ borderBottom: "1px solid rgb(var(--border-subtle))" }}>
                      <td className="py-2 pr-4 font-medium" style={{ color: "rgb(var(--text-primary))" }}>{proc}</td>
                      <td className="py-2 pr-4">{purpose}</td>
                      <td className="py-2">{loc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>6. Cross-Border Data Transfers</h2>
            <p>Your personal data is transferred to and stored on servers located outside India (United States, European Union). These transfers are made to service providers who are necessary to operate the Platform. Under <strong>Section 16 of the DPDP Act, 2023</strong>, cross-border transfers are permitted unless restricted by the Central Government. We ensure appropriate contractual safeguards are in place with all international processors.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>7. Data Retention</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgb(var(--border-subtle))" }}>
                    <th className="text-left py-2 pr-4 font-semibold" style={{ color: "rgb(var(--text-primary))" }}>Data Type</th>
                    <th className="text-left py-2 font-semibold" style={{ color: "rgb(var(--text-primary))" }}>Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Account data (name, email, phone)", "Until account deletion or 3 years of inactivity"],
                    ["Lecture transcripts and generated content", "Until manually deleted by user or account deletion"],
                    ["IP addresses (rate limiting)", "15 minutes (sliding window, then purged from Redis)"],
                    ["Session tokens (JWT)", "24 hours (cookie expiry)"],
                    ["Password reset tokens", "1 hour from generation"],
                  ].map(([type, period]) => (
                    <tr key={type} style={{ borderBottom: "1px solid rgb(var(--border-subtle))" }}>
                      <td className="py-2 pr-4" style={{ color: "rgb(var(--text-primary))" }}>{type}</td>
                      <td className="py-2">{period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>8. Your Rights as a Data Principal</h2>
            <p className="mb-2">Under the <strong>DPDP Act, 2023 (Sections 11–14)</strong>, you have the following rights:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Right to Access (Section 11):</strong> Request a summary of personal data we hold about you and how it has been processed.</li>
              <li><strong>Right to Correction and Erasure (Section 12):</strong> Request correction of inaccurate or outdated data, and erasure of data no longer necessary for the stated purpose.</li>
              <li><strong>Right to Grievance Redressal (Section 13):</strong> Lodge a complaint with our Grievance Officer. If unresolved, escalate to the <strong>Data Protection Board of India</strong> once operational.</li>
              <li><strong>Right to Nominate (Section 14):</strong> Nominate another individual to exercise your rights in the event of your death or incapacity.</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time. This will result in account deletion and cessation of services.</li>
            </ul>
            <p className="mt-3">To exercise any right, email <strong>kwa.isro@gmail.com</strong> with subject line "DPDP Data Request". We will respond within <strong>7 working days</strong>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>9. Security Measures</h2>
            <p>We implement the following security measures in compliance with <strong>Rule 8 of the SPDI Rules, 2011</strong>:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Passwords stored as bcrypt hashes (never plaintext);</li>
              <li>HTTPS enforced across all connections (TLS 1.2+);</li>
              <li>JWT session tokens with 24-hour expiry, transmitted via HttpOnly cookies;</li>
              <li>Rate limiting on authentication endpoints (Upstash Redis);</li>
              <li>CAPTCHA verification on all account creation and login forms;</li>
              <li>No sensitive data logged to server logs or monitoring tools.</li>
            </ul>
            <p className="mt-3">In the event of a personal data breach that is likely to cause harm, we will notify affected users and the Data Protection Board within <strong>72 hours</strong> of becoming aware, as required under the DPDP Act.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>10. Cookies and Tracking</h2>
            <p>We use the following cookies:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>token</strong> (HttpOnly, Secure, SameSite=Strict): Authentication session. Required for the service to function. Expires in 24 hours.</li>
            </ul>
            <p className="mt-3">We do not use advertising cookies, tracking pixels, or third-party analytics. Cloudflare Turnstile may set its own cookies for CAPTCHA functionality — see Cloudflare's privacy policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. Material changes will be communicated via email or a prominent notice on the Platform at least <strong>15 days</strong> before taking effect. Continued use constitutes acceptance of the revised Policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: "rgb(var(--text-primary))", fontFamily: "var(--font-syne)" }}>12. Grievance Officer</h2>
            <p className="mb-3">In accordance with <strong>Section 13 of the DPDP Act, 2023</strong> and Rule 3(1)(d) of the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021:</p>
            <div className="p-4 rounded-xl" style={{ background: "rgb(var(--bg-surface-1))", border: "1px solid rgba(249,115,22,0.2)" }}>
              <p><strong>Grievance Officer:</strong> Kumar Waibhav Akshat</p>
              <p><strong>Email:</strong> kwa.isro@gmail.com</p>
              <p><strong>Acknowledgement:</strong> Within 24 hours</p>
              <p><strong>Resolution:</strong> Within 15 days</p>
              <p className="mt-2 text-xs" style={{ color: "rgb(var(--text-muted))" }}>If your grievance is not resolved to your satisfaction, you may approach the <strong>Data Protection Board of India</strong> (once constituted) or the <strong>Adjudicating Officer</strong> under the IT Act, 2000.</p>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 flex gap-4 text-sm" style={{ borderTop: "1px solid rgb(var(--border-subtle))", color: "rgb(var(--text-dim))" }}>
          <Link href="/terms" className="hover:text-orange-400 transition-colors" style={{ color: "#F97316" }}>Terms of Service</Link>
          <span>·</span>
          <Link href="/signup" className="hover:text-orange-400 transition-colors">Back to Signup</Link>
        </div>

      </div>
    </div>
  );
}
