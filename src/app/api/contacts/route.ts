import { NextResponse } from "next/server";
import { scamContactRepository } from "@/lib/scam-repository";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim();
  if (!query) {
    return NextResponse.json({ message: "กรุณาใส่ข้อมูลที่ต้องการค้นหา" }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
  const contact = await scamContactRepository.findByValue(query);
  return NextResponse.json({ contact });
}
