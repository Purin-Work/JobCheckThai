import { ArrowUpRight, Heart } from "lucide-react";
import { Logo } from "@/components/logo";
import { SectionLink } from "@/components/section-link";

const links = [
  ["วิธีใช้งาน", "checker"],
  ["วิธีป้องกัน", "scam-patterns"],
];

export function Footer() {
  return (
    <footer className="border-t-4 border-[#fff0e5] bg-white">
      <div className="container-shell py-12">
        <div className="grid gap-10 border-b border-[#eceef1] pb-10 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-md text-lg font-bold text-[#344054]">
              “เช็กก่อนสมัคร มั่นใจก่อนทำงาน”
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#687386]">
              JobCheckThai เป็นเครื่องมือช่วยตรวจสอบเบื้องต้น ผลการตรวจสอบควรใช้ประกอบการตัดสินใจ
              และไม่สามารถยืนยันได้ 100% ว่าประกาศหรือบุคคลใดเป็นมิจฉาชีพ
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {links.map(([label, section]) => (
              <SectionLink
                key={label}
                section={section}
                className="inline-flex items-center gap-1.5 font-semibold text-[#4b5565] transition-colors hover:text-[#d95700]"
              >
                {label}
                <ArrowUpRight aria-hidden="true" size={14} />
              </SectionLink>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-[#858c98] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 JobCheckThai · Demo frontend</p>
          <p className="inline-flex items-center gap-1.5">
            สร้างด้วยความตั้งใจเพื่อคนหางานไทย <Heart aria-hidden="true" size={14} className="text-[#ff6b00]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
