<div align="center">

<img src="https://raw.githubusercontent.com/kumarwaibhav/GritAI/master/public/logo-banner.png" alt="Grit AI" width="320" />

<h3>Turn any lecture into an exam win.</h3>

<p>Record your professor. Upload your slides. Get a full study pack in under a minute - powered by <strong>LLaMA 3.3 70B via Groq</strong>.</p>

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Groq](https://img.shields.io/badge/Groq_LLaMA_3.3_70B-F54D27?style=flat-square&logo=meta&logoColor=white)](https://groq.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://grit-ai.pages.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)](LICENSE)

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-grit--ai.pages.dev-F97316?style=for-the-badge)](https://grit-ai.pages.dev)

<p>
  <strong>⚡ Under 60s</strong> &nbsp;·&nbsp;
  <strong>🧠 6 AI Tools</strong> &nbsp;·&nbsp;
  <strong>🔒 Zero Data Stored</strong> &nbsp;·&nbsp;
  <strong>💸 Free Forever</strong>
</p>

</div>

---

## Table of Contents

- [Why Grit AI?](#why-grit-ai)
- [Features](#features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [About the Author](#about-the-author)
- [License](#license)

---

## Why Grit AI?

Every student knows the feeling — a 90-minute lecture, 40 slides, three chapters of reading, and an exam tomorrow morning. Grit AI was built to solve exactly that.

No paraphrasing. No highlights. Just paste your content and walk away with a complete, exam-ready study pack: structured notes, a quiz, a flashcard deck, and a cheat sheet — all generated in under a minute using state-of-the-art AI.

> **Stop taking notes. Start scoring higher.**

---

## Features

| Tool | Description |
|------|-------------|
| 📝 **Smart Notes** | Structured summaries with key concepts and definitions — formatted for how students actually study |
| 🧠 **Quiz Generator** | 5 scenario-based questions testing deep applied understanding, not surface recall |
| 🃏 **Flashcard Deck** | Auto-generated term/definition pairs optimized for spaced repetition |
| 📄 **Cheat Sheet** | Dense, exam-ready revision sheet — every word earns its place |
| 🎙️ **Live Recording** | Record directly in-browser with real-time transcription |
| 📤 **File Upload** | Drop in PPTX, PDF, or plain text — Grit handles all parsing |

---

## How It Works

```
  ┌─────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
  │   1. Add Content    │────▶│   2. AI Processing   │────▶│   3. Study Pack      │
  │                     │     │                      │     │                      │
  │  Upload PDF / PPTX  │     │  Groq LLaMA 3.3 70B  │     │  Smart Notes         │
  │  or record live     │     │  ~60s end-to-end      │     │  Quiz · Flashcards   │
  │  from your browser  │     │  14,400 req/day free  │     │  Cheat Sheet         │
  └─────────────────────┘     └──────────────────────┘     └──────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Radix UI |
| **AI Engine** | Groq Cloud · LLaMA 3.3 70B Versatile |
| **Database** | MongoDB Atlas · Mongoose |
| **Auth** | JWT · bcryptjs |
| **Email** | Nodemailer · Gmail SMTP |
| **Security** | Cloudflare Turnstile CAPTCHA · Upstash Rate Limiting |
| **Deployment** | Cloudflare Pages · `@opennextjs/cloudflare` |

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Groq API key (free at [groq.com](https://groq.com))
- Gmail account with App Password enabled

### 1. Clone & Install

```bash
git clone https://github.com/kumarwaibhav/GritAI.git
cd GritAI
npm install
```

### 2. Configure Environment

Create `.env.local` in the project root:

```env
# Database
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/<db>

# Auth
TOKEN_SECRET=your_random_32char_secret

# App
DOMAIN=http://localhost:3000

# AI
GROQ_API_KEY=gsk_...

# Email (Gmail SMTP — use an App Password, not your account password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=xxxx_xxxx_xxxx_xxxx
EMAIL_FROM=Grit AI <your_gmail@gmail.com>

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAA...
TURNSTILE_SECRET_KEY=0x4AAA...

# Upstash Redis (rate limiting)
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=AX...
```

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment

Connect this repo to **Cloudflare Pages** for automatic deploys on every push to `master`.

**Cloudflare Pages build settings:**

| Field | Value |
|-------|-------|
| Framework preset | None |
| Build command | `npx @opennextjs/cloudflare build` |
| Output directory | `.open-next/assets` |

Add all `.env.local` variables under **Settings → Environment Variables** in your Cloudflare Pages dashboard. Update `DOMAIN` to your live Pages URL after the first deploy.

---

## Project Structure

<details>
<summary>Click to expand</summary>

```
src/
├── app/
│   ├── api/users/          # Auth, AI generation, lecture CRUD
│   ├── lecture/[id]/       # Lecture workspace — recording + generation UI
│   ├── login/
│   ├── signup/
│   ├── profile/
│   ├── forgotpass/
│   ├── resetpassword/
│   ├── terms/
│   └── privacy/
├── components/
│   ├── home/               # Landing page sections
│   ├── navbar/
│   ├── copybar/
│   ├── darkmode/
│   └── loader/
├── helpers/
│   └── mailer.ts           # Gmail SMTP transactional email
├── models/                 # Mongoose schemas (User, Lecture)
└── dbConfig/               # MongoDB connection
```

</details>

---

## What Students Say

> *"Went from drowning in notes to acing finals. Grit AI is literally a cheat code."*
> — **Rahul K.**, Engineering, IIT Delhi

> *"I upload my professor's slides and get a full quiz in 30 seconds. Nothing comes close."*
> — **Aanya M.**, Medicine, AIIMS

> *"Finally a study tool that actually thinks about accessibility."*
> — **Shreya V.**, Law, NLS Bangalore

---

## About the Author

<div align="center">

<img src="https://avatars.githubusercontent.com/kumarwaibhav" alt="Kumar Waibhav Akshat" width="80" style="border-radius: 50%;" />

**Kumar Waibhav Akshat**

*Builder · Student · Tech Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-kumarwaibhav-181717?style=flat-square&logo=github)](https://github.com/kumarwaibhav)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kumarwaibhav-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/kumarwaibhav)
[![Email](https://img.shields.io/badge/Email-kwa.isro@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:kwa.isro@gmail.com)

</div>

---

## License

MIT — free to use, modify, and distribute. See [LICENSE](LICENSE).

---

<div align="center">

*Cram Smarter. Score Higher.*

⭐ Star this repo if Grit AI helped you study better.

</div>
