import { BarChart3 } from "lucide-react";

// Demo data for the first frontend version.
const stats = [
  { value: "1,248", label: "การตรวจสอบ" },
  { value: "326", label: "ช่องทางที่ถูกรายงาน" },
  { value: "184", label: "รายงานจากผู้ใช้งาน" },
  { value: "7", label: "รูปแบบที่เฝ้าระวัง" },
];

export function StatisticsSection() {
  return (
    <section className="bg-[#182233] py-14 text-white sm:py-16">
      <div className="container-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-sm">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.09em] text-[#ff9b55]">
              <BarChart3 aria-hidden="true" size={16} /> Demo Statistics
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-[-.025em] sm:text-3xl">ทุกข้อมูลช่วยให้คนต่อไประวังได้เร็วขึ้น</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">ตัวเลขตัวอย่างสำหรับเวอร์ชันสาธิต ก่อนเชื่อมฐานข้อมูลจริง</p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-px overflow-hidden rounded-[22px] bg-white/10 lg:max-w-3xl lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#202c3f] px-5 py-7 text-center">
                <p className="text-3xl font-black tracking-tight text-white sm:text-[2.1rem]">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
