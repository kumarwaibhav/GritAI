<div align="center">

<br/>

<img src="https://raw.githubusercontent.com/kumarwaibhav/GritAI/master/public/logo-banner.png" alt="Grit AI" width="220" />

<br/><br/>

**Turn any lecture into an exam win.**

*Record your professor. Upload your slides. Get a full study pack in under a minute.*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Groq](https://img.shields.io/badge/Groq_LLaMA_3.3_70B-F54D27?style=flat-square&logo=meta&logoColor=white)](https://groq.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://grit-ai.pages.dev)

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-grit--ai.pages.dev-F97316?style=for-the-badge)](https://grit-ai.pages.dev)&nbsp;&nbsp;[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

<br/>

</div>

---

## What is Grit AI?

Grit AI transforms raw lecture content — audio recordings, slides, PDFs — into a complete, exam-ready study pack using **LLaMA 3.3 70B via Groq**. Stop wasting time on manual notes. Start scoring higher.

<div align="center">
<br/>

| ⚡ Under 60s | 🧠 6 AI Tools | 🔒 Zero Data Stored | 💸 Free Forever |
|:---:|:---:|:---:|:---:|
| Full study pack generated | Notes, quiz, flashcards & more | Session-scoped processing only | No credit card. Ever. |

<br/>
</div>

---

## Features

| Tool | What it does |
|------|-------------|
| 📝 **Smart Notes** | Structured summaries, key concepts, and definitions — formatted for how students actually study |
| 🧠 **Quiz Generator** | 5 scenario-based questions testing deep applied understanding — not surface recall |
| 🃏 **Flashcard Deck** | Auto-generated term/definition pairs optimized for spaced repetition |
| 📄 **Cheat Sheet** | Dense, exam-ready revision sheet — every word earns its place |
| 🎙️ **Live Recording** | Record directly in-browser with real-time transcription |
| 📤 **File Upload** | Drop in PPTX, PDF, or plain text — Grit handles the parsing |

---

## How It Works

```
  ┌─────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
  │   Upload / Record   │────▶│    Groq LLaMA 3.3    │────▶│   Study Pack Ready   │
  │                     │     │       70B             │     │                      │
  │  PDF · PPTX · Audio │     │  14,400 req/day free  │     │  Notes · Quiz        │
  │  Live mic recording │     │  ~60s end-to-end      │     │  Flashcards · Sheet  │
  └─────────────────────┘     └──────────────────────┘     └──────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Radix UI |
| **AI Engine** | Groq Cloud · LLaMA 3.3 70B Versatile |
| **Database** | MongoDB Atlas via Mongoose |
| **Auth** | JWT · bcryptjs |
| **Email** | Nodemailer · Gmail SMTP |
| **Security** | Cloudflare Turnstile CAPTCHA · Upstash Rate Limiting |
| **Deployment** | Cloudflare Pages via `@opennextjs/cloudflare` |

---

## Getting Started

**Prerequisites:** Node.js 18+, npm, MongoDB Atlas account, Groq API key

### 1. Clone

```bash
git clone https://github.com/kumarwaibhav/GritAI.git
cd GritAI
npm install
```

### 2. Environment Variables

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

# Email  (Gmail SMTP — use an App Password, not your login password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=xxxx_xxxx_xxxx_xxxx
EMAIL_FROM=Grit AI <your_gmail@gmail.com>

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAA...
TURNSTILE_SECRET_KEY=0x4AAA...

# Upstash Redis  (rate limiting)
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

**Build settings:**
| Field | Value |
|-------|-------|
| Framework preset | None |
| Build command | `npx @opennextjs/cloudflare build` |
| Output directory | `.open-next/assets` |

Add all `.env.local` variables in the Cloudflare Pages → Settings → Environment Variables panel. Set `DOMAIN` to your live Pages URL after first deploy.

---

<details>
<summary><b>📁 Project Structure</b></summary>
<br/>

```
src/
├── app/
│   ├── api/users/          # Auth, AI generation, lecture CRUD API routes
│   ├── lecture/[id]/       # Lecture workspace — recording + generation UI
│   ├── login/              # Auth pages
│   ├── signup/
│   ├── profile/
│   ├── forgotpass/
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

## License

MIT — free to use, modify, and distribute. See [LICENSE](LICENSE).

---

<div align="center">

<br/>

Made with ❤️ by **[Kumar Waibhav Akshat](https://github.com/kumarwaibhav)**

*Cram Smarter. Score Higher.*

<br/>

</div>
