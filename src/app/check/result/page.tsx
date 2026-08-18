import type { Metadata } from "next";
import { AnalysisResult } from "@/components/analysis-result";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "ผลการตรวจสอบงาน",
  description: "ผลการตรวจสอบเบื้องต้นและคำแนะนำก่อนสมัครงาน",
};

export default function CheckResultPage() {
  return (
    <>
      <Navbar />
      <AnalysisResult />
      <Footer />
    </>
  );
}
