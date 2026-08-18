import { BadgeDollarSign, Laptop, MousePointerClick, UserRoundX } from "lucide-react";

const patterns = [
  {
    title: "งานกด Like / Review",
    description: "เริ่มจากงานง่าย ๆ ก่อนชวนให้เติมเงินเพื่อปลดล็อก Task",
    icon: MousePointerClick,
    tag: "Task Scam",
  },
  {
    title: "Admin Online",
    description: "รายละเอียดงานน้อย แต่เสนอรายได้สูงผิดปกติและรับทันที",
    icon: Laptop,
    tag: "งานคลุมเครือ",
  },
  {
    title: "Fake Recruiter",
    description: "แอบอ้างชื่อบริษัทหรือ HR เพื่อขอข้อมูลส่วนตัวของผู้สมัคร",
    icon: UserRoundX,
    tag: "แอบอ้าง",
  },
  {
    title: "งานที่ต้องจ่ายก่อน",
    description: "เรียกเก็บค่าประกัน ค่าอบรม หรือค่าอุปกรณ์ก่อนเริ่มงาน",
    icon: BadgeDollarSign,
    tag: "เรียกเก็บเงิน",
  },
];

export function ScamPatterns() {
  return (
    <section id="scam-patterns" className="section-space bg-white">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">รู้ทันก่อนเสียเงิน</span>
            <h2 className="section-title mt-3">รูปแบบงานที่ควรระวัง</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[#687386] md:text-right">สังเกตสัญญาณเหล่านี้ โดยเฉพาะเมื่อถูกเร่งให้ตัดสินใจหรือโอนเงินทันที</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {patterns.map((pattern, index) => {
            const Icon = pattern.icon;
            return (
              <article key={pattern.title} className="group rounded-[22px] border border-[#e8ebef] bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#ffc69d] hover:shadow-[0_18px_45px_rgba(44,32,22,.08)]">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#fff4eb] text-[#ff6b00] transition-colors group-hover:bg-[#ff6b00] group-hover:text-white">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <span className="rounded-full bg-[#f5f6f7] px-2.5 py-1 text-[10px] font-bold text-[#687386]">{pattern.tag}</span>
                </div>
                <p className="mt-7 text-xs font-black text-[#ff8a33]">0{index + 1}</p>
                <h3 className="mt-1 text-lg font-black text-[#17202f]">{pattern.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#687386]">{pattern.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
