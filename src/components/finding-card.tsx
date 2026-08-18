import { AlertTriangle, CircleAlert } from "lucide-react";
import type { Finding } from "@/lib/types";

export function FindingCard({ finding }: { finding: Finding }) {
  const danger = finding.severity === "high";
  const Icon = danger ? CircleAlert : AlertTriangle;

  return (
    <article
      className={`rounded-[20px] border p-5 sm:p-6 ${
        danger ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50/60"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-white ${
            danger ? "text-red-600" : "text-amber-600"
          }`}
        >
          <Icon aria-hidden="true" size={21} />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-black text-[#17202f]">{finding.title}</h3>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[.08em] ${
                danger ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
              }`}
            >
              {danger ? "ต้องระวัง" : "ควรเช็กเพิ่ม"}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#586273]">{finding.description}</p>
        </div>
      </div>
    </article>
  );
}
