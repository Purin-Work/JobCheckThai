import { NextResponse } from "next/server";
import { mockAnalysis } from "@/lib/mock-data";

const allowedTypes = new Set(["text", "link", "contact", "screenshot"]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { type?: string; content?: string };
    if (!body.type || !allowedTypes.has(body.type) || !body.content?.trim()) {
      return NextResponse.json({ message: "ประเภทหรือข้อมูลที่ส่งมาตรวจไม่ถูกต้อง" }, { status: 400 });
    }

    // Artificial latency keeps loading states testable in the frontend demo.
    await new Promise((resolve) => setTimeout(resolve, 650));
    return NextResponse.json({
      ...mockAnalysis,
      sourceType: body.type,
      sourceContent: body.content?.trim().slice(0, 5000) ?? "",
      analyzedAt: new Date().toISOString(),
      provider: "mock",
    });
  } catch {
    return NextResponse.json({ message: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }
}
