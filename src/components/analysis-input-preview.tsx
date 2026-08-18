"use client";

import { FileImage, Link2, MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";

interface SavedAnalysis {
  sourceType?: "text" | "link" | "screenshot";
  sourceContent?: string;
}

const sourceConfig = {
  text: { label: "ข้อความหรือแชทที่ส่งมาตรวจ", icon: MessageSquareText },
  link: { label: "ลิงก์ที่ส่งมาตรวจ", icon: Link2 },
  screenshot: { label: "Screenshot ที่ส่งมาตรวจ", icon: FileImage },
};

export function AnalysisInputPreview() {
  const [source, setSource] = useState<SavedAnalysis | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = sessionStorage.getItem("jobcheckthai:last-analysis");
        setSource(saved ? (JSON.parse(saved) as SavedAnalysis) : null);
      } catch {
        setSource(null);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const type = source?.sourceType ?? "text";
  const config = sourceConfig[type];
  const Icon = config.icon;

  return (
    <section className="mb-10 rounded-[20px] border border-[#e4e7ec] bg-white p-5 sm:p-6" aria-labelledby="source-preview-title">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff4eb] text-[#ff6b00]">
          <Icon aria-hidden="true" size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="source-preview-title" className="font-black text-[#17202f]">{config.label}</h2>
          {source?.sourceContent ? (
            <p className="mt-3 max-h-32 overflow-y-auto whitespace-pre-wrap rounded-xl bg-[#fafbfc] p-4 text-sm leading-7 text-[#586273]">
              {source.sourceContent}
            </p>
          ) : (
            <p className="mt-2 text-sm leading-6 text-[#858c98]">
              {type === "screenshot"
                ? "ระบบวิเคราะห์จาก Screenshot ที่อัปโหลด"
                : "ไม่พบข้อมูลต้นฉบับใน Session นี้ กำลังแสดงผลการวิเคราะห์ตัวอย่าง"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
