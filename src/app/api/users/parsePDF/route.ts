import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
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
      return NextResponse.json({ error: "File too large. Maximum 10MB." }, { status: 413 });
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Only .pdf files are supported." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfParseModule = await import("pdf-parse/lib/pdf-parse.js");
    const pdfParse = pdfParseModule.default;
    const parsed = await pdfParse(buffer);
    const extractedText = (parsed.text || "").trim();

    if (!extractedText) {
      return NextResponse.json({ error: "No text content found in the uploaded PDF." }, { status: 422 });
    }

    return NextResponse.json({ text: extractedText });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to parse PDF." }, { status: 500 });
  }
}
