import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export const maxDuration = 60;

const SYSTEM_PROMPT = `You are an elite academic AI assistant with deep expertise in pedagogy, knowledge synthesis, and exam preparation. You have trained on thousands of university-level courses across all disciplines.

Your outputs are used by students preparing for high-stakes examinations. Every response must be:
- Pedagogically sound and factually precise
- Structured for maximum cognitive retention
- Formatted as clean, valid Markdown ONLY - zero HTML tags, zero preamble, zero meta-commentary
- Directly useful without any filler phrases like "Here is your..." or "Certainly!"

Begin your response immediately with the content. Nothing before it.`;

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not defined in environment variables.");
    }

    const client = new Groq({ apiKey });

    const data = await req.json();
    const transcript = data.transcript;
    const type = data.type;

    if (!transcript || typeof transcript !== "string") {
      return NextResponse.json({ error: "Transcript is required" }, { status: 400 });
    }

    if (transcript.length > 100000) {
      return NextResponse.json({ error: "Transcript too large" }, { status: 413 });
    }

    const allowedTypes = ["lectureNotes", "notes", "quiz", "flashcards", "cheatsheet"];
    if (type && !allowedTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid generation type" }, { status: 400 });
    }
    const parsedQuizCount = Number(data.quizCount);
    const quizCount = Number.isFinite(parsedQuizCount)
      ? Math.min(50, Math.max(1, Math.floor(parsedQuizCount)))
      : 10;

    let userPrompt = "";
    let temperature = 0.4;

    if (type === "lectureNotes" || type === "notes") {
      temperature = 0.3;
      userPrompt = `Transform the following lecture transcript into comprehensive, exam-ready lecture notes exceeding 1000 words.

## Output Structure (strictly follow):
# [Inferred Topic Title]

## Overview
- 2–3 sentence summary of the entire lecture

## [Major Section 1]
### [Subsection if needed]
- Key concept with explanation
- Supporting detail or example
- Any formulas, definitions, or named theories

## [Major Section 2]
...continue for all sections...

## Key Definitions
| Term | Definition |
|------|------------|
| ... | ... |

## Summary & Exam Takeaways
- Bullet the 5–8 most testable concepts

## Rules:
- Minimum 1000 words
- Use # → ## → ### hierarchy correctly
- Blank line after every heading
- Bold (**term**) all technical terms on first use
- If equations appear in transcript, render them clearly
- No HTML. No preamble.

---
TRANSCRIPT:
${transcript}`;

    } else if (type === "quiz") {
      temperature = 0.5;
      userPrompt = `Generate exactly ${quizCount} high-quality multiple choice questions (MCQs) from the lecture transcript below.

## Quality Standards:
- Questions must test conceptual understanding, NOT just rote recall
- All 4 options must be plausible - no obviously wrong distractors
- Vary difficulty: ~30% easy, ~50% medium, ~20% hard
- Cover different sections of the transcript proportionally

## Strict Format (repeat for every question):

**Question [N]:** [Clear, unambiguous question text]

A) [Option]
B) [Option]
C) [Option]
D) [Option]

**Answer:** [Letter] - [1–2 sentence explanation of WHY this is correct and why key distractors are wrong]

---

## Rules:
- Exactly ${quizCount} questions, no more, no less
- No HTML. No preamble. Start directly with Question 1.

---
TRANSCRIPT:
${transcript}`;

    } else if (type === "flashcards") {
      temperature = 0.6;
      userPrompt = `Generate 5 advanced scenario-based questions from the lecture transcript below. These should test deep, applied understanding - not surface recall.

## Target cognitive levels (Bloom's Taxonomy):
- Analysis, Evaluation, and Synthesis - NOT mere Knowledge or Comprehension

## Strict Format (repeat for all 5):

## Scenario [N]: [Short descriptive title]

**Situation:** [2–4 sentence realistic scenario that applies concepts from the lecture in a novel context]

**Question:** [A precise analytical question the student must reason through - should require connecting multiple concepts]

**What to think about:** [3–5 bullet hints guiding the student's reasoning process without giving away the answer]

**Key Concepts Tested:** [Comma-separated list of lecture concepts being assessed]

---

## Rules:
- Each scenario must be genuinely different - vary domain, complexity, and concept tested
- No HTML. No preamble. Start directly with Scenario 1.

---
TRANSCRIPT:
${transcript}`;

    } else if (type === "cheatsheet") {
      temperature = 0.3;
      userPrompt = `Create a dense, exam-ready cheat sheet from the lecture transcript below. This is a last-minute revision tool - every word must earn its place.

## Output Structure:

# [Topic] - Cheat Sheet

## [Section 1 Name]
- **[Term/Concept]:** [Ultra-concise definition or rule - max 15 words]
- **[Formula/Law]:** [Expression + when to use it]
...minimum 8 bullets per section

## [Section 2 Name]
...

## Common Mistakes to Avoid
- [Misconception] → [Correct understanding]
...at least 5 entries

## Quick-Fire Facts
- [Fact] - [Why it matters]
...at least 10 entries

## Rules:
- Minimum 30 bullet points total
- Maximum 15 words per bullet - ruthlessly concise
- Bold all key terms
- No paragraphs. Bullets only.
- No HTML. No preamble.

---
TRANSCRIPT:
${transcript}`;

    } else {
      temperature = 0.4;
      userPrompt = `Generate structured lecture notes in clean Markdown format from the following transcript. Use proper heading hierarchy, bullet points, and bold key terms.\n\n${transcript}`;
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 8192,
      temperature,
    });

    const output = response.choices[0].message.content ?? "";
    return NextResponse.json({ output });

  } catch (error: unknown) {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
