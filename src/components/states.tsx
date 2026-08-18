import { CircleAlert, LoaderCircle, SearchX } from "lucide-react";

export function LoadingState({ label = "กำลังตรวจสอบข้อมูล..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl bg-[#fff8f2] px-5 py-8 text-sm font-bold text-[#d95700]" role="status">
      <LoaderCircle aria-hidden="true" className="animate-spin" size={21} />
      {label}
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[#d9dde4] bg-[#fafbfc] px-6 py-8 text-center">
      <SearchX aria-hidden="true" size={28} className="mx-auto text-[#98a0ad]" />
      <p className="mt-3 font-bold text-[#344054]">ยังไม่พบประวัติการรายงานในฐานข้อมูลตัวอย่าง</p>
      <p className="mt-1 text-sm text-[#687386]">ไม่พบรายงานไม่ได้แปลว่าปลอดภัย ควรตรวจสอบกับบริษัทอีกครั้ง</p>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700" role="alert">
      <CircleAlert aria-hidden="true" className="mt-0.5 shrink-0" size={19} />
      <p>{message}</p>
    </div>
  );
}
