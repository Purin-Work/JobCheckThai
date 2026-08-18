import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CircleDollarSign,
  ExternalLink,
  Globe2,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { AnalysisInputPreview } from "@/components/analysis-input-preview";
import { ContactResultCard } from "@/components/contact-result-card";
import { FindingCard } from "@/components/finding-card";
import { RiskBadge } from "@/components/risk-badge";
import { SectionLink } from "@/components/section-link";
import { mockAnalysis } from "@/lib/mock-data";

const recommendations = [
  { title: "ตรวจสอบเว็บไซต์บริษัท", icon: Globe2 },
  { title: "ดูหน้า Careers ของบริษัท", icon: Building2 },
  { title: "ติดต่อผ่านช่องทางทางการ", icon: BadgeCheck },
  { title: "อย่าโอนเงินก่อนเริ่มงาน", icon: CircleDollarSign },
  { title: "อย่าส่ง OTP หรือข้อมูลธนาคาร", icon: ShieldCheck },
  { title: "ตรวจสอบ Email Domain", icon: MailCheck },
];

export function AnalysisResult() {
  return (
    <main id="result-top" className="bg-[#fffdfb]">
      <section className="border-b border-[#f0f1f3] bg-white py-9 sm:py-12">
        <div className="container-shell max-w-[1040px]">
          <SectionLink section="checker" className="inline-flex items-center gap-2 text-sm font-bold text-[#687386] hover:text-[#d95700]">
            <ArrowLeft aria-hidden="true" size={17} /> กลับไปตรวจสอบข้อมูลอื่น
          </SectionLink>
          <div className="mt-7 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">ผลการตรวจสอบเบื้องต้น</span>
              <h1 className="mt-3 text-3xl font-black tracking-[-.035em] text-[#17202f] sm:text-[2.6rem]">
                พบจุดที่ควรระวัง
              </h1>
              <p className="mt-3 max-w-xl leading-7 text-[#687386]">{mockAnalysis.summary}</p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 md:min-w-72">
              <p className="text-xs font-bold text-amber-700">ระดับความเสี่ยง</p>
              <div className="mt-2"><RiskBadge level={mockAnalysis.riskLevel} /></div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-shell max-w-[1040px] py-10 sm:py-14">
        <AnalysisInputPreview />

        <section aria-labelledby="findings-title">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 id="findings-title" className="text-xl font-black text-[#17202f] sm:text-2xl">สิ่งที่เราพบ</h2>
              <p className="mt-1 text-sm text-[#687386]">อ่านแต่ละข้อและตรวจสอบก่อนตัดสินใจสมัคร</p>
            </div>
            <span className="rounded-full bg-[#f1f3f5] px-3 py-1.5 text-xs font-extrabold text-[#687386]">{mockAnalysis.findings.length} จุด</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {mockAnalysis.findings.map((finding) => <FindingCard key={finding.id} finding={finding} />)}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="contacts-title">
          <div>
            <span className="eyebrow">ตรวจพบอัตโนมัติ</span>
            <h2 id="contacts-title" className="mt-2 text-xl font-black text-[#17202f] sm:text-2xl">ช่องทางติดต่อที่พบ</h2>
            <p className="mt-1 text-sm text-[#687386]">เราได้นำช่องทางในข้อความไปค้นกับฐานข้อมูลตัวอย่างแล้ว</p>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {mockAnalysis.detectedContacts.map((contact) => <ContactResultCard key={contact.id} contact={contact} />)}
          </div>
        </section>

        <section className="card mt-12 overflow-hidden" aria-labelledby="next-title">
          <div className="border-b border-[#eceef1] bg-[#182233] px-6 py-7 text-white sm:px-8">
            <span className="text-xs font-extrabold uppercase tracking-[.09em] text-[#ff9b55]">Safety Checklist</span>
            <h2 id="next-title" className="mt-2 text-2xl font-black">ควรทำอย่างไรต่อ?</h2>
            <p className="mt-2 text-sm text-white/65">เช็กให้ครบก่อนส่งเอกสารสำคัญหรือชำระเงินทุกครั้ง</p>
          </div>
          <div className="grid gap-px bg-[#eceef1] sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3 bg-white p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff4eb] text-[#ff6b00]">
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <div>
                    <p className="text-[10px] font-black text-[#ff8a33]">STEP {index + 1}</p>
                    <p className="mt-1 text-sm font-extrabold text-[#344054]">{item.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-4 bg-[#fff8f2] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="flex items-center gap-2 text-sm font-bold text-[#586273]">
              <Check aria-hidden="true" size={18} className="text-green-600" /> ใช้ผลนี้เป็นข้อมูลประกอบการตัดสินใจ
            </p>
            <Link href="https://datawarehouse.dbd.go.th/" target="_blank" rel="noreferrer" className="primary-button text-sm">
              ตรวจสอบบริษัทเพิ่มเติม <ExternalLink aria-hidden="true" size={16} />
            </Link>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#e8ebef] bg-white p-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#687386]">มีข้อมูลเพิ่มเติมเกี่ยวกับงานหรือช่องทางนี้?</p>
          <Link href="/report#report-top" scroll className="outline-button text-sm">แจ้งข้อมูลให้คนอื่นระวัง <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
      </div>
    </main>
  );
}
