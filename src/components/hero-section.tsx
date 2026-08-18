import { ArrowDown, BadgeCheck, BriefcaseBusiness, Check, Search, ShieldCheck } from "lucide-react";
import { SectionLink } from "@/components/section-link";

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pb-10 pt-14 sm:pb-16 sm:pt-20">
      <div className="absolute -right-24 -top-36 size-[420px] rounded-full bg-[#fff4eb] blur-3xl" />
      <div className="absolute -left-12 bottom-2 size-48 rounded-full bg-[#fff9f4] blur-2xl" />
      <div className="container-shell relative grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
        <div className="reveal-up">
          <h1 className="display-title max-w-[680px]">
            งานนี้จริงไหม?
            <span className="mt-1 block text-[#ff6b00]">เช็กก่อนสมัคร ปลอดภัยกว่า</span>
          </h1>
          <p className="mt-6 max-w-[640px] text-[1.05rem] leading-8 text-[#687386] sm:text-lg">
            ช่วยตรวจสอบประกาศงาน แชท และช่องทางการติดต่อที่น่าสงสัย
            ก่อนส่งข้อมูลส่วนตัวหรือโอนเงิน
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SectionLink section="checker" className="primary-button sm:min-w-44">
              ตรวจสอบงาน <ArrowDown aria-hidden="true" size={18} />
            </SectionLink>
            <SectionLink section="contact-search" className="secondary-button sm:min-w-52">
              <Search aria-hidden="true" size={18} /> ค้นหาช่องทางติดต่อ
            </SectionLink>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#687386]">
            <span className="inline-flex items-center gap-2">
              <Check aria-hidden="true" size={16} className="text-[#16a34a]" /> ฟรี ไม่ต้องสมัครสมาชิก
            </span>
            <span className="inline-flex items-center gap-2">
              <Check aria-hidden="true" size={16} className="text-[#16a34a]" /> รวดเร็วได้ผลลัพธ์ทันที
            </span>
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-[540px] md:block lg:justify-self-end" aria-hidden="true">
          <div className="dot-grid absolute -right-10 -top-8 size-44 rounded-3xl opacity-70" />
          <div className="float-gentle relative mx-auto w-[84%] max-w-[390px] rounded-[38px] border border-[#eceef1] bg-[#fff] p-3 shadow-[0_30px_90px_rgba(32,39,51,.14)]">
            <div className="rounded-[28px] bg-[#fff8f2] px-5 pb-6 pt-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[11px] font-extrabold text-[#d95700]">
                  <ShieldCheck size={18} /> JOBCHECK
                </span>
                <span className="flex gap-1">
                  <i className="size-1.5 rounded-full bg-[#ff6b00]" />
                  <i className="size-1.5 rounded-full bg-[#ffc69d]" />
                  <i className="size-1.5 rounded-full bg-[#ffc69d]" />
                </span>
              </div>
              <div className="mt-7 rounded-2xl border border-[#ffe0c9] bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#fff0e5] text-[#ff6b00]">
                    <BriefcaseBusiness size={21} />
                  </span>
                  <div className="flex-1">
                    <div className="h-2.5 w-3/4 rounded bg-[#2e3745]" />
                    <div className="mt-2 h-2 w-1/2 rounded bg-[#d9dde4]" />
                  </div>
                </div>
                <div className="mt-4 space-y-2.5">
                  <div className="h-2 w-full rounded bg-[#edf0f3]" />
                  <div className="h-2 w-[90%] rounded bg-[#edf0f3]" />
                  <div className="h-2 w-[70%] rounded bg-[#edf0f3]" />
                </div>
                <div className="mt-4 rounded-xl bg-[#fff4eb] px-3 py-2.5 text-[10px] font-bold text-[#d95700]">
                  รายได้ 800–2,500 บาท / วัน
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#182233] p-4 text-white">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#16a34a]">
                  <BadgeCheck size={22} />
                </span>
                <div>
                  <p className="text-[10px] text-white/60">กำลังช่วยตรวจสอบ</p>
                  <p className="mt-0.5 text-xs font-extrabold">จุดที่ควรระวังก่อนสมัคร</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -left-2 top-[18%] rounded-2xl border border-[#eceef1] bg-white px-4 py-3 shadow-xl sm:-left-7">
            <p className="flex items-center gap-2 text-xs font-extrabold text-[#344054]">
              <Search size={16} className="text-[#ff6b00]" /> เช็กช่องทางติดต่อ
            </p>
          </div>
          <div className="absolute -bottom-4 right-0 rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-xl sm:right-2">
            <p className="flex items-center gap-2 text-xs font-extrabold text-[#16773a]">
              <ShieldCheck size={17} /> ก่อนส่งข้อมูลส่วนตัว
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
