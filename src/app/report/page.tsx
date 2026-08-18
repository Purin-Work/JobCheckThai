import type { Metadata } from "next";
import { BadgeCheck, EyeOff, Images, UsersRound } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ReportForm } from "@/components/report-form";

export const metadata: Metadata = {
  title: "แจ้งข้อมูลน่าสงสัย",
  description: "แจ้งประกาศงานหรือช่องทางติดต่อที่น่าสงสัยเพื่อช่วยเตือนคนหางานคนอื่น",
};

export default function ReportPage() {
  return (
    <>
      <Navbar />
      <main id="report-top" className="relative overflow-hidden bg-[#fffdfb] py-10 sm:py-14">
        <div className="absolute -right-32 top-0 size-80 rounded-full bg-[#fff4eb] blur-3xl" />
        <div className="container-shell relative max-w-[1060px]">
          <div className="grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <span className="eyebrow">Community Report</span>
              <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-.035em] text-[#17202f] sm:text-[2.45rem]">
                แจ้งงานหรือช่องทางที่น่าสงสัย
              </h1>
              <p className="mt-4 leading-7 text-[#687386]">ข้อมูลของคุณช่วยให้คนหางานคนต่อไปเห็นสัญญาณเตือนได้เร็วขึ้น</p>
              <div className="mt-8 space-y-3">
                {[
                  { icon: EyeOff, title: "ไม่ต้องเปิดเผยตัวตน", text: "เราไม่ขอชื่อหรือข้อมูลติดต่อของผู้รายงาน" },
                  { icon: BadgeCheck, title: "ตรวจสอบก่อนเผยแพร่", text: "ข้อมูลจะผ่านการทบทวนก่อนแสดงต่อผู้ใช้" },
                  { icon: UsersRound, title: "ช่วยเหลือคนหางาน", text: "ทุกข้อมูลช่วยลดโอกาสที่คนอื่นจะตกเป็นเหยื่อ" },
                  { icon: Images, title: "ลงหลักฐานให้ครบ", text: "ให้เห็นลำดับว่าโกงอย่างไร เช่น ข้อเสนอ แชทเรียกเก็บเงิน และสลิป" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3 rounded-2xl border border-[#eceef1] bg-white p-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff4eb] text-[#ff6b00]"><Icon aria-hidden="true" size={20} /></span>
                      <div><p className="text-sm font-extrabold text-[#344054]">{item.title}</p><p className="mt-1 text-xs leading-5 text-[#858c98]">{item.text}</p></div>
                    </div>
                  );
                })}
              </div>
            </aside>
            <ReportForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
