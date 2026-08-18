import {
  AlertTriangle,
  ArrowLeft,
  Banknote,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  FileCheck2,
  Flag,
  MessageSquareWarning,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { RiskBadge } from "@/components/risk-badge";
import { SectionLink } from "@/components/section-link";
import type { ScamContact, ScamReport } from "@/lib/types";

function formatThaiDate(value: string) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

const verificationLabels = {
  reviewed: "มีรายงานที่ผ่านการทบทวน",
  unverified: "กำลังรอตรวจสอบข้อมูล",
  disputed: "มีการโต้แย้งข้อมูล",
};

export function ContactDetail({ contact, reports }: { contact: ScamContact; reports: ScamReport[] }) {
  return (
    <main id="contact-detail-top" className="bg-[#fffdfb]">
      <section className="border-b border-[#eceef1] bg-white py-9 sm:py-12">
        <div className="container-shell max-w-[1040px]">
          <SectionLink
            section="contact-search"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#687386] hover:text-[#d95700]"
          >
            <ArrowLeft aria-hidden="true" size={17} /> กลับไปค้นหาช่องทางอื่น
          </SectionLink>

          <div className="mt-7 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">ประวัติช่องทางที่ถูกรายงาน</p>
              <p className="mt-4 text-sm font-bold uppercase tracking-[.09em] text-[#d95700]">{contact.type}</p>
              <h1 className="mt-1 break-all text-3xl font-black tracking-[-.03em] text-[#17202f] sm:text-[2.5rem]">
                {contact.value}
              </h1>
              <p className="mt-3 max-w-xl leading-7 text-[#687386]">
                ข้อมูลด้านล่างมาจากรายงานของผู้ใช้งาน ใช้เพื่อตรวจสอบประกอบการตัดสินใจก่อนติดต่อหรือส่งข้อมูลส่วนตัว
              </p>
            </div>
            <RiskBadge level={contact.riskLevel} />
          </div>
        </div>
      </section>

      <div className="container-shell max-w-[1040px] py-10 sm:py-14">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="สรุปข้อมูลช่องทาง">
          <div className="card p-5 shadow-sm">
            <Flag aria-hidden="true" size={19} className="text-red-500" />
            <p className="mt-4 text-xs font-bold text-[#858c98]">จำนวนรายงานทั้งหมด</p>
            <p className="mt-1 text-2xl font-black text-[#17202f]">{contact.reportCount} รายงาน</p>
          </div>
          <div className="card p-5 shadow-sm">
            <CalendarDays aria-hidden="true" size={19} className="text-[#ff6b00]" />
            <p className="mt-4 text-xs font-bold text-[#858c98]">พบรายงานครั้งแรก</p>
            <p className="mt-1 font-black text-[#17202f]">{formatThaiDate(contact.firstReported)}</p>
          </div>
          <div className="card p-5 shadow-sm">
            <CalendarClock aria-hidden="true" size={19} className="text-[#ff6b00]" />
            <p className="mt-4 text-xs font-bold text-[#858c98]">รายงานล่าสุด</p>
            <p className="mt-1 font-black text-[#17202f]">{formatThaiDate(contact.lastReported)}</p>
          </div>
          <div className="card p-5 shadow-sm">
            <CheckCircle2 aria-hidden="true" size={19} className="text-green-600" />
            <p className="mt-4 text-xs font-bold text-[#858c98]">สถานะข้อมูล</p>
            <p className="mt-1 text-sm font-black leading-6 text-[#17202f]">{verificationLabels[contact.verifiedStatus]}</p>
          </div>
        </section>

        <section className="card mt-7 overflow-hidden" aria-labelledby="reported-types-title">
          <div className="border-b border-[#eceef1] px-6 py-5 sm:px-8">
            <h2 id="reported-types-title" className="flex items-center gap-2 text-xl font-black text-[#17202f]">
              <ShieldAlert aria-hidden="true" size={21} className="text-[#ff6b00]" /> ประเภทเหตุการณ์ที่เคยถูกรายงาน
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 p-6 sm:px-8">
            {contact.scamTypes.map((type) => (
              <span key={type} className="rounded-full border border-red-100 bg-red-50 px-3.5 py-2 text-sm font-bold text-red-700">
                {type}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="report-history-title">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">Report History</span>
              <h2 id="report-history-title" className="mt-2 text-2xl font-black text-[#17202f]">รายงานล่าสุดจากผู้ใช้งาน</h2>
            </div>
            <p className="text-xs text-[#858c98]">แสดง {reports.length} รายงานตัวอย่างจากทั้งหมด {contact.reportCount} รายงาน</p>
          </div>

          {reports.length > 0 ? (
            <div className="mt-5 space-y-4">
              {reports.map((report, index) => (
                <article key={report.id} className="card p-5 shadow-sm sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff4eb] font-black text-[#d95700]">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <div>
                          <h3 className="font-black text-[#17202f]">{report.scamType}</h3>
                          <p className="mt-1 text-xs font-semibold text-[#858c98]">รายงานเมื่อ {formatThaiDate(report.reportedAt)}</p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                          <FileCheck2 aria-hidden="true" size={14} /> ผ่านการทบทวน
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[#586273]">{report.description}</p>
                      {report.amount && (
                        <p className="mt-3 inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-extrabold text-red-700">
                          <Banknote aria-hidden="true" size={17} /> จำนวนเงินที่แจ้ง: {report.amount.toLocaleString("th-TH")} บาท
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-[#d9dde4] bg-white p-8 text-center text-sm text-[#687386]">
              ยังไม่มีรายละเอียดรายงานที่เปิดเผยได้
            </div>
          )}
        </section>

        <aside className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
          <AlertTriangle aria-hidden="true" size={20} className="mt-0.5 shrink-0" />
          <p>
            การพบประวัติรายงานไม่ได้ยืนยันว่าบุคคลหรือบัญชีนี้เป็นมิจฉาชีพโดยอัตโนมัติ
            ควรตรวจสอบกับบริษัทผ่านเว็บไซต์และช่องทางทางการก่อนตัดสินใจ
          </p>
        </aside>

        <div className="mt-8 flex flex-col justify-between gap-4 rounded-[22px] bg-[#182233] p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="flex items-center gap-2 font-black"><MessageSquareWarning aria-hidden="true" size={20} className="text-[#ff9b55]" /> มีข้อมูลเกี่ยวกับช่องทางนี้เพิ่มเติม?</p>
            <p className="mt-1 text-sm text-white/60">รายงานของคุณจะถูกตรวจสอบก่อนนำไปแสดง</p>
          </div>
          <Link href="/report#report-top" scroll className="primary-button shrink-0">แจ้งข้อมูลเพิ่มเติม</Link>
        </div>
      </div>
    </main>
  );
}
