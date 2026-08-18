"use client";

import { Aperture, AtSign, Globe2, Mail, MessageCircle, Phone, Search, Send, Users } from "lucide-react";
import { FormEvent, useState } from "react";
import { ContactResultCard } from "@/components/contact-result-card";
import { EmptyState, ErrorState, LoadingState } from "@/components/states";
import type { ScamContact } from "@/lib/types";

const filters = [
  { label: "LINE", value: "@jobfast2026", icon: MessageCircle },
  { label: "Email", value: "examplejob@gmail.com", icon: Mail },
  { label: "เบอร์โทร", value: "0812345678", icon: Phone },
  { label: "Instagram", value: "jobfast_th", icon: Aperture },
  { label: "Facebook", value: "Job Fast Thailand", icon: Users },
  { label: "Telegram", value: "@jobfasttg", icon: Send },
  { label: "Website", value: "jobfast.example", icon: Globe2 },
];

type State = "idle" | "loading" | "found" | "empty" | "error";

export function ContactSearch() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<ScamContact | null>(null);

  async function search(event?: FormEvent) {
    event?.preventDefault();
    if (!query.trim()) {
      setState("error");
      return;
    }

    setState("loading");
    try {
      const response = await fetch(`/api/contacts?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("request failed");
      const data = (await response.json()) as { contact: ScamContact | null };
      setResult(data.contact);
      setState(data.contact ? "found" : "empty");
    } catch {
      setState("error");
    }
  }

  return (
    <section id="contact-search" className="section-space bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-[920px] text-center">
          <span className="eyebrow"><AtSign aria-hidden="true" size={16} /> ค้นจากฐานข้อมูลรายงาน</span>
          <h2 className="section-title mt-3">เคยมีคนรายงานช่องทางนี้หรือไม่?</h2>
          <p className="mt-3 text-[#687386]">ค้นหา LINE ID, Email, เบอร์โทร หรือ Social Media ก่อนติดต่อ</p>

          <form onSubmit={search} className="mt-8 flex flex-col gap-3 rounded-[20px] border border-[#e4e7ec] bg-white p-2 shadow-[0_16px_50px_rgba(26,35,50,.08)] sm:flex-row">
            <label htmlFor="contact-query" className="sr-only">ช่องทางที่ต้องการค้นหา</label>
            <div className="relative flex-1">
              <Search aria-hidden="true" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98a0ad]" />
              <input
                id="contact-query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="LINE ID, Email, เบอร์โทร, Instagram..."
                className="h-14 w-full rounded-[14px] border-0 bg-[#fafbfc] pl-12 pr-4 text-[#17202f] outline-none ring-[#ff6b00]/15 transition-shadow focus:ring-4"
              />
            </div>
            <button type="submit" className="primary-button h-14 sm:min-w-32">ค้นหา</button>
          </form>

          <div className="mt-5 flex flex-wrap justify-center gap-2" aria-label="ตัวอย่างประเภทช่องทาง">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.label}
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#e4e7ec] bg-white px-3 py-2 text-xs font-bold text-[#687386] transition-colors hover:border-[#ffb27b] hover:bg-[#fff8f2] hover:text-[#d95700]"
                  onClick={() => {
                    setQuery(filter.value);
                    setState("idle");
                  }}
                >
                  <Icon aria-hidden="true" size={14} /> {filter.label}
                </button>
              );
            })}
          </div>

          <div className="mt-7" aria-live="polite">
            {state === "loading" && <LoadingState label="กำลังค้นหาในฐานข้อมูลรายงาน..." />}
            {state === "found" && result && <ContactResultCard contact={result} />}
            {state === "empty" && <EmptyState />}
            {state === "error" && <ErrorState message="กรุณาใส่ข้อมูลที่ต้องการค้นหา หรือลองใหม่อีกครั้ง" />}
            {state === "idle" && (
              <p className="text-xs text-[#98a0ad]">ลองค้นหา <button type="button" className="font-bold text-[#d95700] underline underline-offset-2" onClick={() => setQuery("@jobfast2026")}>@jobfast2026</button> เพื่อดูตัวอย่างผลลัพธ์</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
