import { NextResponse } from "next/server";

interface ReportPayload {
  contactType?: string;
  contactValue?: string;
  incidents?: string[];
  details?: string;
  evidence?: string[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReportPayload;
    if (
      !body.contactType ||
      !body.contactValue ||
      body.contactValue.trim().length < 3 ||
      !body.incidents?.length ||
      !body.details ||
      body.details.trim().length < 10 ||
      !body.evidence?.length ||
      (body.evidence?.length ?? 0) > 10
    ) {
      return NextResponse.json({ message: "กรุณากรอกข้อมูลให้ครบ" }, { status: 400 });
    }

    await new Promise((resolve) => setTimeout(resolve, 650));
    return NextResponse.json(
      { id: `demo-report-${Date.now()}`, status: "pending", storage: "mock" },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }
}
