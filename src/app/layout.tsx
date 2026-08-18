import type { Metadata, Viewport } from "next";
import "@fontsource-variable/noto-sans-thai";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "JobCheckThai — เช็กก่อนสมัคร ปลอดภัยกว่า",
    template: "%s | JobCheckThai",
  },
  description:
    "เครื่องมือช่วยตรวจสอบประกาศงาน แชท Recruiter และช่องทางการติดต่อที่น่าสงสัยสำหรับคนหางานในประเทศไทย",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
