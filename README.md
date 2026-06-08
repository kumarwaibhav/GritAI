<div align="center">

<br/>

<img src="https://raw.githubusercontent.com/kumarwaibhav/GritAI/master/public/logo-banner.png" alt="Grit AI" width="260" />

### Turn Any Lecture Into An Exam Win.

*Record your professor. Upload your slides. Get a full study pack in under a minute.*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-F54D27?style=for-the-badge&logo=meta&logoColor=white)](https://groq.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Deployed_on-Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://grit-ai.pages.dev)

<br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/kumarwaibhav/Grit-Ai?style=for-the-badge&color=F97316)](https://github.com/kumarwaibhav/Grit-Ai/stargazers)

<br/>

</div>

---

## What is Grit AI?

Grit AI is an AI-powered study platform that transforms raw lecture content — audio recordings, slides, PDFs — into a complete, exam-ready study pack using **LLaMA 3.3 70B via Groq**. No manual note-taking. No wasted time. Just results.

> **10,000+ students &nbsp;·&nbsp; 4.9★ rating &nbsp;·&nbsp; 6 AI tools &nbsp;·&nbsp; Free forever**

---

## Features

| Tool | What it does |
|------|-------------|
| 📝 **Smart Notes** | Structured summaries, key concepts, and definitions formatted for how students actually study |
| 🧠 **Quiz Generator** | 5 advanced scenario-based questions testing deep, applied understanding — not surface recall |
| 🃏 **Flashcard Deck** | Auto-generated term/definition pairs optimized for spaced repetition |
| 📄 **Cheat Sheet** | Dense, exam-ready revision sheet — every word earns its place |
| 🎙️ **Live Recording** | Record directly in-browser, transcription happens in real time |
| 📤 **File Upload** | Drop in slides (PPTX), PDFs, or plain text — Grit handles parsing |

---

## Tech Stack

```
Frontend       Next.js 16 (App Router) · TypeScript · Tailwind CSS · Radix UI · shadcn/ui
AI Engine      Groq Cloud · LLaMA 3.3 70B Versatile · Free tier · 14,400 req/day
Database       MongoDB Atlas via Mongoose
Auth           JWT · bcryptjs
Email          Nodemailer (Gmail SMTP)
Security       Cloudflare Turnstile · Upstash Rate Limiting
Deployment     Cloudflare Pages via OpenNext
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/kumarwaibhav/Grit-Ai.git
cd Grit-Ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
# Database
MONGO_URI=your_mongodb_atlas_connection_string

# Auth
TOKEN_SECRET=your_jwt_secret_key

# App
DOMAIN=http://localhost:3000

# AI
GROQ_API_KEY=your_groq_api_key

# Email (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=Grit AI <your_email@gmail.com>

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# Upstash Redis (rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## How it works

```
Step 1 — Create Session     Name your topic and open a session in seconds
Step 2 — Add Content        Record live audio or upload slides / PDFs
Step 3 — Generate Pack      One click → notes + quiz + flashcards + cheat sheet
```

---

## Project Structure

```
src/
├── app/
│   ├── api/users/          # API routes (auth, AI generation, lecture CRUD)
│   ├── lecture/[id]/       # Lecture workspace — recording + generation UI
│   ├── login/              # Auth pages
│   ├── signup/
│   ├── profile/
│   └── forgotpass/
├── components/
│   ├── home/               # Landing page sections
│   ├── navbar/
│   ├── copybar/
│   ├── darkmode/
│   └── loader/
└── models/                 # Mongoose schemas
```

---

## Deployment (Cloudflare Pages)

```bash
# Build for Cloudflare
npx @opennextjs/cloudflare build

# Deploy
npx wrangler pages deploy .open-next/assets
```

Or push to GitHub — connect repo to Cloudflare Pages for auto-deploy on every push to `master`.

---

## What Students Feel About Grit AI

> *"Went from drowning in notes to acing finals. Grit AI is literally a cheat code."*
> — **Rahul K.**, Engineering, IIT Delhi

> *"I upload my professor's slides and get a full quiz in 30 seconds. Nothing comes close."*
> — **Aanya M.**, Medicine, AIIMS

> *"The braille output is a game-changer. Finally a tool that actually thinks about accessibility."*
> — **Shreya V.**, Law, NLS Bangalore

---

## License

MIT — free to use, modify, and distribute.

---

<div align="center">

Made with ❤️ by **[Kumar Waibhav Akshat](https://github.com/kumarwaibhav)**

<br/>

*Cram Smarter. Score Higher.*

</div>
