"use client";

import { ArrowRight, FileImage, Link2, MessageSquareText, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorState } from "@/components/states";
import { UploadArea } from "@/components/upload-area";

const tabs = [
  { id: "text", label: "ข้อความ", icon: MessageSquareText },
  { id: "link", label: "ลิงก์", icon: Link2 },
  { id: "screenshot", label: "Screenshot", icon: FileImage },
] as const;

type TabId = (typeof tabs)[number]["id"];

const placeholders: Record<Exclude<TabId, "screenshot">, string> = {
  text: "วางข้อความประกาศงานหรือข้อความจาก Recruiter ที่นี่...",
  link: "วางลิงก์ประกาศงานหรือเว็บไซต์บริษัท เช่น https://...",
};

export function JobChecker() {
  const [activeTab, setActiveTab] = useState<TabId>("text");
  const [value, setValue] = useState("");
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    if (activeTab !== "screenshot" && value.trim().length < 5) {
      setError("กรุณาใส่ข้อมูลอย่างน้อย 5 ตัวอักษร เพื่อให้เราช่วยตรวจสอบได้");
      return;
    }

    if (activeTab === "screenshot" && screenshotFiles.length === 0) {
      setError("กรุณาเลือก Screenshot อย่างน้อย 1 รูปก่อนตรวจสอบ");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab,
          content: activeTab === "screenshot" ? screenshotFiles[0].name : value,
        }),
      });
      if (!response.ok) throw new Error("ไม่สามารถตรวจสอบได้");
      const result = await response.json();
      sessionStorage.setItem("jobcheckthai:last-analysis", JSON.stringify(result));
      router.push("/check/result");
    } catch {
      setError("ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง");
      setLoading(false);
    }
  }

  return (
    <section id="checker" className="relative z-10 bg-[#fff8f2] py-12 sm:py-16">
      <div className="container-shell">
        <div className="card mx-auto max-w-[980px] overflow-hidden shadow-[0_25px_80px_rgba(61,37,19,.10)]">
          <div className="border-b border-[#eceef1] px-5 py-6 sm:px-8 sm:py-7">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <span className="eyebrow">เริ่มตรวจสอบได้เลย</span>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.025em] text-[#17202f] sm:text-[1.85rem]">
                  เอาข้อมูลที่สงสัยมาเช็ก
                </h2>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                <span className="size-2 rounded-full bg-green-500" /> ไม่เก็บข้อมูลในเวอร์ชันทดลอง
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#f4f5f7] p-1.5" role="tablist" aria-label="ประเภทข้อมูล">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const selected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold transition-all ${
                      selected
                        ? "bg-white text-[#d95700] shadow-sm"
                        : "text-[#687386] hover:bg-white/60 hover:text-[#344054]"
                    }`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setError("");
                    }}
                  >
                    <Icon aria-hidden="true" size={17} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              {activeTab === "screenshot" ? (
                <UploadArea onFilesChange={setScreenshotFiles} />
              ) : activeTab === "text" ? (
                <textarea
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  className="field min-h-48 resize-y p-4 leading-7"
                  placeholder={placeholders[activeTab]}
                  aria-label="ข้อความที่ต้องการตรวจสอบ"
                />
              ) : (
                <input
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  className="field h-14 px-4"
                  placeholder={placeholders[activeTab]}
                  aria-label="ข้อมูลที่ต้องการตรวจสอบ"
                />
              )}
            </div>

            {error && <div className="mt-4"><ErrorState message={error} /></div>}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="primary-button flex-1 sm:flex-none sm:min-w-48"
              >
                {loading ? (
                  <><span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> กำลังตรวจสอบ...</>
                ) : (
                  <>ตรวจสอบเลย <ArrowRight aria-hidden="true" size={18} /></>
                )}
              </button>
              <button
                type="button"
                className="secondary-button flex-1 sm:flex-none"
                onClick={() => setActiveTab("screenshot")}
              >
                <Upload aria-hidden="true" size={18} /> อัปโหลด Screenshot
              </button>
              <p className="text-center text-xs text-[#858c98] sm:ml-auto sm:text-right">
                ตรวจสอบเบื้องต้นได้ฟรี<br className="hidden sm:block" /> ไม่จำเป็นต้องสมัครสมาชิก
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
