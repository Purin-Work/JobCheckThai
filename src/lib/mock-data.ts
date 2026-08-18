import type { AnalysisResult, ScamContact, ScamReport } from "@/lib/types";

// Demo data only. Replace the repository implementation with Supabase when ready.
export const scamContacts: ScamContact[] = [
  {
    id: "contact-line-jobfast",
    type: "LINE",
    value: "@jobfast2026",
    reportCount: 12,
    riskLevel: "high",
    firstReported: "2026-05-02",
    lastReported: "2026-08-14",
    scamTypes: [
      "ขอค่าประกันก่อนเริ่มงาน",
      "หลอกให้เติมเงินทำ Task",
      "แอบอ้างเป็น Recruiter",
      "ใช้ชื่อบริษัทอื่นในการติดต่อ",
    ],
    verifiedStatus: "reviewed",
  },
  {
    id: "contact-line-examplejob",
    type: "LINE",
    value: "@examplejob",
    reportCount: 8,
    riskLevel: "high",
    firstReported: "2026-06-19",
    lastReported: "2026-08-11",
    scamTypes: ["เรียกเก็บค่าประกันงาน", "เติมเงินเพื่อทำ Task"],
    verifiedStatus: "reviewed",
  },
  {
    id: "contact-email-examplejob",
    type: "Email",
    value: "examplejob@gmail.com",
    reportCount: 3,
    riskLevel: "medium",
    firstReported: "2026-07-04",
    lastReported: "2026-08-08",
    scamTypes: ["แอบอ้างเป็น Recruiter", "ใช้อีเมลสาธารณะ"],
    verifiedStatus: "unverified",
  },
];

export const scamReports: ScamReport[] = [
  {
    id: "report-001",
    contactId: "contact-line-jobfast",
    scamType: "ขอค่าประกันก่อนเริ่มงาน",
    description: "ผู้ติดต่อขอให้โอนค่าประกันก่อนเริ่มงาน 1,500 บาท",
    amount: 1500,
    evidence: ["mock-evidence-001.jpg"],
    reportedAt: "2026-08-14",
    status: "reviewed",
  },
  {
    id: "report-002",
    contactId: "contact-line-jobfast",
    scamType: "หลอกให้เติมเงินทำ Task",
    description: "เริ่มให้ทดลองทำงานกดรีวิว ก่อนชวนให้เติมเงินเพื่อปลดล็อกงานที่มีค่าตอบแทนสูงขึ้น",
    amount: 3200,
    evidence: ["mock-evidence-002.jpg"],
    reportedAt: "2026-08-09",
    status: "reviewed",
  },
  {
    id: "report-003",
    contactId: "contact-line-jobfast",
    scamType: "แอบอ้างเป็น Recruiter",
    description: "ผู้ติดต่อใช้โลโก้บริษัทที่รู้จัก แต่บริษัทแจ้งว่าไม่ใช่ช่องทางรับสมัครงานอย่างเป็นทางการ",
    evidence: [],
    reportedAt: "2026-07-28",
    status: "reviewed",
  },
  {
    id: "report-004",
    contactId: "contact-line-examplejob",
    scamType: "เรียกเก็บค่าประกันงาน",
    description: "ขอให้ชำระค่าประกันก่อนส่งรายละเอียดสถานที่และวันเริ่มงาน",
    amount: 990,
    evidence: ["mock-evidence-004.jpg"],
    reportedAt: "2026-08-11",
    status: "reviewed",
  },
  {
    id: "report-005",
    contactId: "contact-email-examplejob",
    scamType: "แอบอ้างเป็น Recruiter",
    description: "ใช้อีเมลสาธารณะติดต่อโดยอ้างชื่อบริษัท และขอสำเนาบัตรประชาชนก่อนสัมภาษณ์",
    evidence: ["mock-evidence-005.jpg"],
    reportedAt: "2026-08-08",
    status: "reviewed",
  },
  {
    id: "report-006",
    contactId: "contact-email-examplejob",
    scamType: "ขอข้อมูลส่วนตัวผิดปกติ",
    description: "ขอข้อมูลบัญชีธนาคารและรหัส OTP โดยระบุว่าใช้สำหรับลงทะเบียนพนักงาน",
    evidence: [],
    reportedAt: "2026-07-30",
    status: "reviewed",
  },
];

export const mockAnalysis: AnalysisResult = {
  riskLevel: "medium",
  headline: "ควรตรวจสอบเพิ่มเติม",
  summary: "พบข้อมูลบางอย่างที่ควรระวังก่อนสมัครงาน",
  findings: [
    {
      id: "finding-income",
      title: "รายได้สูงผิดปกติ",
      description: "รายได้ที่ประกาศค่อนข้างสูงเมื่อเทียบกับรายละเอียดและประสบการณ์ที่ต้องการ",
      severity: "medium",
    },
    {
      id: "finding-company",
      title: "ไม่พบชื่อบริษัท",
      description: "ประกาศไม่มีข้อมูลบริษัทที่สามารถตรวจสอบได้ชัดเจน",
      severity: "medium",
    },
    {
      id: "finding-line",
      title: "ติดต่อผ่าน LINE ส่วนตัว",
      description: "ควรตรวจสอบว่าบัญชีนี้เป็นช่องทางของบริษัทจริงหรือไม่",
      severity: "medium",
    },
    {
      id: "finding-payment",
      title: "มีการขอให้โอนเงิน",
      description: "พบข้อความเกี่ยวกับการชำระเงินก่อนเริ่มงาน อย่าโอนเงินจนกว่าจะยืนยันกับบริษัทได้",
      severity: "high",
    },
  ],
  detectedContacts: scamContacts.filter((contact) =>
    ["@examplejob", "examplejob@gmail.com"].includes(contact.value),
  ),
};
