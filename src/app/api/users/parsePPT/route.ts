import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import PptxParser from "node-pptx-parser";
import { writeFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { randomUUID } from "crypto";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export async function POST(req: NextRequest) {
  let tempPath: string | null = null;

  try {
    const userId = await getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum 20MB." }, { status: 413 });
    }

    if (!file.name.toLowerCase().endsWith(".pptx")) {
      return NextResponse.json({ error: "Only .pptx files are supported." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    tempPath = join(tmpdir(), `${randomUUID()}.pptx`);
    await writeFile(tempPath, buffer);

    const parser = new PptxParser(tempPath);
    const slides = await parser.extractText();

    const extractedText = slides
      .map((slide, i) => {
        const slideText = (slide.text || []).join(" ").trim();
        return `Slide ${i + 1}:\n${slideText}`;
      })
      .filter((s) => s.replace(/^Slide \d+:\n?/, "").trim().length > 0)
      .join("\n\n");

    if (!extractedText.trim()) {
      return NextResponse.json({ error: "No text content found in the uploaded PPT." }, { status: 422 });
    }

    return NextResponse.json({ text: extractedText });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to parse PPT." }, { status: 500 });
  } finally {
    if (tempPath) {
      unlink(tempPath).catch(() => {});
    }
  }
}
