import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import type { RiskLevel } from "@/lib/types";

const riskConfig = {
  low: {
    text: "ไม่พบจุดผิดปกติชัดเจน",
    className: "border-green-200 bg-green-50 text-green-700",
    icon: CheckCircle2,
  },
  medium: {
    text: "ควรตรวจสอบเพิ่มเติม",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: AlertTriangle,
  },
  high: {
    text: "มีความเสี่ยงสูง",
    className: "border-red-200 bg-red-50 text-red-700",
    icon: ShieldAlert,
  },
} satisfies Record<RiskLevel, { text: string; className: string; icon: typeof CheckCircle2 }>;

export function RiskBadge({ level, compact = false }: { level: RiskLevel; compact?: boolean }) {
  const config = riskConfig[level];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border font-bold ${config.className} ${
        compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
      }`}
    >
      <Icon aria-hidden="true" size={compact ? 15 : 17} />
      {config.text}
    </span>
  );
}
