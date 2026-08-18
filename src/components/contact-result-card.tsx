import { ArrowRight, CalendarDays, Flag, MessageCircleWarning } from "lucide-react";
import Link from "next/link";
import { RiskBadge } from "@/components/risk-badge";
import type { ScamContact } from "@/lib/types";

export function ContactResultCard({ contact }: { contact: ScamContact }) {
  const formattedDate = new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(contact.lastReported));

  return (
    <article className="card mt-7 overflow-hidden border-red-100 text-left shadow-[0_18px_60px_rgba(78,31,18,.09)]">
      <div className="border-b border-red-100 bg-red-50/70 px-5 py-5 sm:px-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.1em] text-red-600">{contact.type} ID</p>
            <h3 className="mt-1 text-xl font-black text-[#17202f]">{contact.value}</h3>
          </div>
          <RiskBadge level={contact.riskLevel} compact />
        </div>
      </div>
      <div className="p-5 sm:p-7">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#fafbfc] p-4">
            <p className="flex items-center gap-2 text-sm text-[#687386]">
              <Flag aria-hidden="true" size={17} className="text-red-500" /> จำนวนรายงานจากผู้ใช้
            </p>
            <p className="mt-2 text-2xl font-black text-[#17202f]">{contact.reportCount} รายงาน</p>
          </div>
          <div className="rounded-2xl bg-[#fafbfc] p-4">
            <p className="flex items-center gap-2 text-sm text-[#687386]">
              <CalendarDays aria-hidden="true" size={17} className="text-[#ff6b00]" /> รายงานล่าสุด
            </p>
            <p className="mt-2 font-extrabold text-[#17202f]">{formattedDate}</p>
          </div>
        </div>
        <div className="mt-5">
          <p className="flex items-center gap-2 text-sm font-extrabold text-[#344054]">
            <MessageCircleWarning aria-hidden="true" size={18} className="text-[#ff6b00]" />
            ประเภทที่เคยถูกรายงาน
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {contact.scamTypes.map((type) => (
              <li key={type} className="flex items-start gap-2 text-sm leading-6 text-[#586273]">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ff8a33]" /> {type}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-5 text-[#858c98]">
            ข้อมูลมาจากรายงานของผู้ใช้งานและใช้ประกอบการตัดสินใจ ไม่ได้หมายความว่าบัญชีนี้เป็นมิจฉาชีพโดยอัตโนมัติ
          </p>
          <Link href={`/contact/${contact.id}#contact-detail-top`} scroll className="outline-button shrink-0 text-sm">
            ดูประวัติรายงาน <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
