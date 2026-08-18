"use client";

import { Check, CheckCircle2, ChevronDown, LockKeyhole, Send, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { ErrorState } from "@/components/states";
import { UploadArea } from "@/components/upload-area";

const incidentTypes = [
  "ขอเงินก่อนเริ่มงาน",
  "หลอกให้เติมเงินทำ Task",
  "แอบอ้าง HR / Recruiter",
  "ขอข้อมูลส่วนตัวผิดปกติ",
  "ส่งลิงก์น่าสงสัย",
  "รายละเอียดงานไม่ชัดเจน",
  "อื่น ๆ",
];

const contactTypes = ["LINE", "Email", "Instagram", "Facebook", "Telegram", "เบอร์โทร", "Website", "อื่น ๆ"];

interface FormData {
  contactType: string;
  contactValue: string;
  company: string;
  incidents: string[];
  details: string;
  amount: string;
  evidence: string[];
}

const initialForm: FormData = {
  contactType: "",
  contactValue: "",
  company: "",
  incidents: [],
  details: "",
  amount: "",
  evidence: [],
};

export function ReportForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function toggleIncident(incident: string) {
    setForm((current) => ({
      ...current,
      incidents: current.incidents.includes(incident)
        ? current.incidents.filter((item) => item !== incident)
        : [...current.incidents, incident],
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.contactType || form.contactValue.trim().length < 3 || form.incidents.length === 0 || form.details.trim().length < 10) {
      setError("กรุณากรอกประเภทช่องทาง ข้อมูลติดต่อ เหตุการณ์ และรายละเอียดอย่างน้อย 10 ตัวอักษร");
      return;
    }

    if (form.evidence.length === 0) {
      setError("กรุณาแนบหลักฐานอย่างน้อย 1 รูป เพื่อให้เห็นลำดับเหตุการณ์ที่เกิดขึ้น");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("submit failed");
      setSubmitted(true);
    } catch {
      setError("ส่งรายงานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card px-6 py-12 text-center sm:px-10">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 aria-hidden="true" size={34} />
        </span>
        <h2 className="mt-6 text-2xl font-black text-[#17202f]">รับรายงานของคุณแล้ว</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-[#687386]">ขอบคุณที่ช่วยส่งข้อมูล รายงานตัวอย่างนี้จะถูกตรวจสอบก่อนนำไปแสดงในฐานข้อมูล</p>
        <button
          type="button"
          className="primary-button mt-7"
          onClick={() => {
            setForm(initialForm);
            setSubmitted(false);
          }}
        >
          ส่งรายงานอื่น
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card overflow-hidden" noValidate>
      <div className="border-b border-[#eceef1] bg-[#fffaf6] px-5 py-5 sm:px-8">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#ff6b00] shadow-sm">
            <ShieldCheck aria-hidden="true" size={21} />
          </span>
          <div>
            <h2 className="font-black text-[#17202f]">ข้อมูลที่ใช้ตรวจสอบ</h2>
            <p className="mt-1 text-sm leading-6 text-[#687386]">กรอกเท่าที่ทราบ ไม่จำเป็นต้องใส่ข้อมูลส่วนตัวของคุณ</p>
          </div>
        </div>
      </div>

      <div className="space-y-7 p-5 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-type" className="text-sm font-extrabold text-[#344054]">ประเภทช่องทาง <span className="text-red-500">*</span></label>
            <div className="relative mt-2">
              <select
                id="contact-type"
                value={form.contactType}
                onChange={(event) => setForm({ ...form, contactType: event.target.value })}
                className="field h-13 appearance-none px-4 pr-10"
                required
              >
                <option value="">เลือกประเภทช่องทาง</option>
                {contactTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
              <ChevronDown aria-hidden="true" size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#858c98]" />
            </div>
          </div>
          <div>
            <label htmlFor="contact-value" className="text-sm font-extrabold text-[#344054]">Username / ID / Contact <span className="text-red-500">*</span></label>
            <input
              id="contact-value"
              value={form.contactValue}
              onChange={(event) => setForm({ ...form, contactValue: event.target.value })}
              className="field mt-2 h-13 px-4"
              placeholder="เช่น @examplejob"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="text-sm font-extrabold text-[#344054]">บริษัทที่ถูกอ้างถึง <span className="text-xs font-normal text-[#858c98]">(ถ้ามี)</span></label>
          <input
            id="company"
            value={form.company}
            onChange={(event) => setForm({ ...form, company: event.target.value })}
            className="field mt-2 h-13 px-4"
            placeholder="ชื่อบริษัทหรือแบรนด์ที่ผู้ติดต่อกล่าวถึง"
          />
        </div>

        <fieldset>
          <legend className="text-sm font-extrabold text-[#344054]">ประเภทเหตุการณ์ <span className="text-red-500">*</span> <span className="text-xs font-normal text-[#858c98]">เลือกได้หลายข้อ</span></legend>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {incidentTypes.map((incident) => {
              const checked = form.incidents.includes(incident);
              return (
                <label
                  key={incident}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                    checked ? "border-[#ff9b55] bg-[#fff4eb] text-[#b84900]" : "border-[#e4e7ec] bg-white text-[#586273] hover:border-[#ffc69d]"
                  }`}
                >
                  <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleIncident(incident)} />
                  <span className={`flex size-5 shrink-0 items-center justify-center rounded-md border ${checked ? "border-[#ff6b00] bg-[#ff6b00] text-white" : "border-[#cfd4dc] bg-white"}`}>
                    {checked && <Check aria-hidden="true" size={14} strokeWidth={3} />}
                  </span>
                  {incident}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="details" className="text-sm font-extrabold text-[#344054]">รายละเอียด <span className="text-red-500">*</span></label>
          <textarea
            id="details"
            value={form.details}
            onChange={(event) => setForm({ ...form, details: event.target.value })}
            className="field mt-2 min-h-36 resize-y p-4 leading-7"
            placeholder="เล่าเหตุการณ์โดยย่อ เช่น ติดต่อมาจากที่ไหน เสนองานอะไร และขอให้ทำอะไร..."
            required
          />
          <p className="mt-1.5 text-right text-xs text-[#98a0ad]">{form.details.length} ตัวอักษร</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="amount" className="text-sm font-extrabold text-[#344054]">จำนวนเงิน <span className="text-xs font-normal text-[#858c98]">(ถ้ามี)</span></label>
            <div className="relative mt-2">
              <input
                id="amount"
                type="number"
                min="0"
                value={form.amount}
                onChange={(event) => setForm({ ...form, amount: event.target.value })}
                className="field h-13 px-4 pr-14"
                placeholder="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#858c98]">บาท</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-extrabold text-[#344054]">
              หลักฐาน <span className="text-red-500">*</span>{" "}
              <span className="text-xs font-normal text-[#858c98]">(จำเป็น · 1–10 รูป)</span>
            </p>
            <p className="mt-1.5 text-xs leading-5 text-[#687386]">
              แนบภาพให้เห็นลำดับเหตุการณ์ เช่น ข้อเสนองาน แชทที่เรียกเก็บเงิน และหลักฐานการโอน โดยปิดข้อมูลส่วนตัวที่ไม่จำเป็น
            </p>
            <div className="mt-2">
              <UploadArea
                compact
                maxFiles={10}
                label="เลือกหรือวางรูปหลักฐานที่นี่"
                onFilesChange={(files) =>
                  setForm((current) => ({ ...current, evidence: files.map((file) => file.name) }))
                }
              />
            </div>
          </div>
        </div>

        {error && <ErrorState message={error} />}

        <div className="rounded-2xl border border-[#e4e7ec] bg-[#fafbfc] p-4">
          <p className="flex items-start gap-2.5 text-sm leading-6 text-[#687386]">
            <LockKeyhole aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#ff6b00]" />
            กรุณาแจ้งข้อมูลตามความจริง และหลีกเลี่ยงการเปิดเผยเลขบัตรประชาชน เลขบัญชี หรือข้อมูลส่วนตัวที่ไม่จำเป็น
          </p>
        </div>

        <button type="submit" disabled={submitting} className="primary-button w-full sm:w-auto sm:min-w-48">
          {submitting ? (
            <><span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> กำลังส่งรายงาน...</>
          ) : (
            <><Send aria-hidden="true" size={18} /> ส่งรายงาน</>
          )}
        </button>
      </div>
    </form>
  );
}
