# JobCheckThai

Frontend demo สำหรับช่วยคนหางานไทยตรวจสอบประกาศงาน แชทจาก Recruiter และประวัติช่องทางติดต่อที่น่าสงสัย เช่น LINE, Email และ Social Media

> โปรเจกต์นี้เป็น **Demo Frontend** ข้อมูลผลวิเคราะห์ สถิติ รายงาน และ API ทั้งหมดเป็น Mock Data ยังไม่ใช่ระบบตรวจสอบบุคคลหรือประกาศงานจริง

## Features

- ตรวจประกาศงานจากข้อความ ลิงก์ หรือ Screenshot
- แสดงผลความเสี่ยงและจุดที่ควรตรวจสอบเพิ่มเติมด้วยภาษาที่เข้าใจง่าย
- ค้นหาประวัติ LINE ID, Email และช่องทางติดต่อจากฐานข้อมูลตัวอย่าง
- หน้ารายละเอียดช่องทางพร้อมประวัติรายงานแบบไม่เปิดเผยตัวตน
- ฟอร์มแจ้งข้อมูลพร้อมแนบหลักฐานได้ 1–10 รูปในฝั่ง Frontend
- Loading, empty, error และ form validation states
- Responsive สำหรับ Desktop, Tablet และ Mobile
- รองรับภาษาไทยด้วย Noto Sans Thai

## Tech Stack

- Next.js 16 และ App Router
- React 19
- TypeScript แบบ Strict
- Tailwind CSS 4
- Lucide React Icons
- Next.js Route Handlers

## Getting Started

ต้องติดตั้ง Node.js รุ่นที่รองรับ Next.js 16 ก่อน จากนั้นรัน:

```bash
npm install
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
npm run dev      # Development server
npm run lint     # ESLint
npm run build    # Production build และ TypeScript validation
npm run start    # Start production server หลัง build
```

## Routes

| Route | รายละเอียด |
| --- | --- |
| `/` | หน้าแรก ตัวตรวจงาน และค้นหาช่องทาง |
| `/check/result` | ผลวิเคราะห์ประกาศงานตัวอย่าง |
| `/contact/[id]` | ประวัติรายงานของช่องทางตัวอย่าง |
| `/report` | แบบฟอร์มแจ้งข้อมูลน่าสงสัย |
| `/api/analyze` | Mock analysis API |
| `/api/contacts` | Mock contact search API |
| `/api/reports` | Mock report submission API |

ลองค้นหา `@jobfast2026`, `@examplejob` หรือ `examplejob@gmail.com` เพื่อดูข้อมูลตัวอย่าง

## Project Structure

```text
src/
├─ app/          # Pages และ Route Handlers
├─ components/   # UI และ interactive components
└─ lib/          # Types, mock data และ repository abstraction
```

## Environment Variables

คัดลอก `.env.example` เป็น `.env.local` เมื่อต้องการเริ่มเชื่อมบริการจริง:

```bash
cp .env.example .env.local
```

ค่าทั้งหมดในไฟล์ยังไม่ถูกเรียกใช้ใน Demo ปัจจุบัน และ `.env.local` จะไม่ถูก commit

## Demo Limitations

- ผลวิเคราะห์ทุกครั้งมาจาก `mockAnalysis` และไม่ได้ใช้ AI วิเคราะห์เนื้อหาจริง
- การค้นหาใช้ข้อมูลจาก `src/lib/mock-data.ts`
- รูป Screenshot และหลักฐานแสดงตัวอย่างใน Browser แต่ยังไม่อัปโหลดไป Storage
- การส่งรายงานตอบกลับสถานะ Mock และไม่มีการบันทึกลง Database
- Supabase และ Gemini ยังไม่ได้เชื่อมต่อ
- ตัวเลขสถิติทั้งหมดเป็นข้อมูลสาธิต

โครงสร้าง repository และ Route Handlers ถูกแยกไว้เพื่อให้เปลี่ยนไปใช้ Supabase Storage, Supabase Database และ Gemini API ในขั้นต่อไปได้ง่ายขึ้น

## Validation Status

- ESLint ผ่าน
- TypeScript strict ผ่าน
- Production build ผ่าน
- `npm audit` ไม่พบช่องโหว่ใน production dependencies ณ วันที่ตรวจล่าสุด
