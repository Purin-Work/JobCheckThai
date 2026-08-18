"use client";

import { FileImage, ImagePlus, UploadCloud, X } from "lucide-react";
import { useEffect, useId, useState, type DragEvent } from "react";

interface UploadAreaProps {
  compact?: boolean;
  maxFiles?: number;
  label?: string;
  onFilesChange?: (files: File[]) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function ImagePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [previewUrl] = useState(() => URL.createObjectURL(file));

  useEffect(() => () => URL.revokeObjectURL(previewUrl), [previewUrl]);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#e4e7ec] bg-white">
      <div
        role="img"
        aria-label={`ตัวอย่าง ${file.name}`}
        className="aspect-[4/3] bg-[#f4f5f7] bg-cover bg-center"
        style={{ backgroundImage: `url(${previewUrl})` }}
      />
      <div className="px-2.5 py-2">
        <p className="truncate text-xs font-bold text-[#344054]" title={file.name}>{file.name}</p>
        <p className="mt-0.5 text-[10px] text-[#858c98]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/95 text-[#586273] shadow-md transition-colors hover:bg-red-50 hover:text-red-600"
        aria-label={`ลบรูป ${file.name}`}
      >
        <X aria-hidden="true" size={16} />
      </button>
    </div>
  );
}

export function UploadArea({
  compact = false,
  maxFiles = 1,
  label = "เลือกหรือวาง Screenshot ที่นี่",
  onFilesChange,
}: UploadAreaProps) {
  const inputId = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  function updateFiles(nextFiles: File[]) {
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  }

  function addFiles(incomingFiles: File[]) {
    const invalidTypeCount = incomingFiles.filter((file) => !ACCEPTED_TYPES.has(file.type)).length;
    const oversizedCount = incomingFiles.filter((file) => file.size > MAX_FILE_SIZE).length;
    const validFiles = incomingFiles.filter(
      (file) => ACCEPTED_TYPES.has(file.type) && file.size <= MAX_FILE_SIZE,
    );
    const existingKeys = new Set(files.map(fileKey));
    const uniqueFiles = validFiles.filter((file) => !existingKeys.has(fileKey(file)));

    const nextFiles = maxFiles === 1
      ? uniqueFiles.slice(-1)
      : [...files, ...uniqueFiles].slice(0, maxFiles);

    const messages: string[] = [];
    if (invalidTypeCount > 0) messages.push(`มี ${invalidTypeCount} ไฟล์ที่ไม่ใช่ PNG, JPG หรือ WEBP`);
    if (oversizedCount > 0) messages.push(`มี ${oversizedCount} ไฟล์ที่มีขนาดเกิน 10 MB`);
    if (maxFiles > 1 && files.length + uniqueFiles.length > maxFiles) messages.push(`เลือกได้สูงสุด ${maxFiles} รูป`);
    if (uniqueFiles.length < validFiles.length) messages.push("ไฟล์ที่ซ้ำจะไม่ถูกเพิ่มอีก");

    setError(messages.join(" · "));
    if (uniqueFiles.length > 0) updateFiles(nextFiles);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    addFiles(Array.from(event.dataTransfer.files));
  }

  function removeFile(fileToRemove: File) {
    setError("");
    updateFiles(files.filter((file) => fileKey(file) !== fileKey(fileToRemove)));
  }

  const helperText = maxFiles > 1
    ? `PNG, JPG หรือ WEBP · ไฟล์ละไม่เกิน 10 MB · สูงสุด ${maxFiles} รูป`
    : "PNG, JPG หรือ WEBP ขนาดไม่เกิน 10 MB";

  return (
    <div onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
      <input
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple={maxFiles > 1}
        className="sr-only"
        onChange={(event) => {
          addFiles(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
      />

      {files.length === 0 ? (
        <label
          htmlFor={inputId}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#ffb27b] bg-[#fffaf6] px-5 text-center transition-colors hover:border-[#ff6b00] hover:bg-[#fff4eb] ${
            compact ? "min-h-32 py-5" : "min-h-48 py-7"
          }`}
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-white text-[#ff6b00] shadow-sm">
            <UploadCloud aria-hidden="true" size={23} />
          </span>
          <span className="mt-3 text-sm font-extrabold text-[#344054]">{label}</span>
          <span className="mt-1 text-xs text-[#858c98]">{helperText}</span>
        </label>
      ) : maxFiles === 1 ? (
        <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-600">
            <FileImage aria-hidden="true" size={21} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-[#344054]">{files[0].name}</p>
            <p className="text-xs text-[#687386]">{(files[0].size / 1024 / 1024).toFixed(2)} MB · พร้อมอัปโหลด</p>
          </div>
          <button
            type="button"
            onClick={() => removeFile(files[0])}
            className="flex size-9 items-center justify-center rounded-lg text-[#687386] hover:bg-white hover:text-red-600"
            aria-label="นำไฟล์ออก"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {files.map((file) => (
              <ImagePreview key={fileKey(file)} file={file} onRemove={() => removeFile(file)} />
            ))}
            {files.length < maxFiles && (
              <label
                htmlFor={inputId}
                className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#ffb27b] bg-[#fffaf6] p-3 text-center transition-colors hover:border-[#ff6b00] hover:bg-[#fff4eb]"
              >
                <ImagePlus aria-hidden="true" size={24} className="text-[#ff6b00]" />
                <span className="mt-2 text-xs font-extrabold text-[#344054]">เพิ่มรูปหลักฐาน</span>
              </label>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-xs">
            <p className="font-bold text-green-700">เลือกแล้ว {files.length}/{maxFiles} รูป</p>
            <p className="text-right text-[#858c98]">ไฟล์ละไม่เกิน 10 MB</p>
          </div>
        </div>
      )}

      {error && <p className="mt-2 text-xs font-semibold leading-5 text-red-600" role="alert">{error}</p>}
    </div>
  );
}
