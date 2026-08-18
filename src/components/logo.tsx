import { ShieldCheck } from "lucide-react";
import { SectionLink } from "@/components/section-link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <SectionLink section="top" className="group inline-flex items-center gap-2.5" aria-label="JobCheckThai หน้าแรก">
      <span className="relative flex size-10 items-center justify-center rounded-[13px] bg-[#ff6b00] text-white shadow-[0_8px_18px_rgba(255,107,0,.22)] transition-transform group-hover:-rotate-3 group-hover:scale-105">
        <ShieldCheck aria-hidden="true" size={23} strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="text-[1.15rem] font-black tracking-[-0.035em] text-[#17202f]">
          JobCheck<span className="text-[#ff6b00]">Thai</span>
        </span>
      )}
    </SectionLink>
  );
}
