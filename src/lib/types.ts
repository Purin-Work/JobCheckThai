export type ContactType =
  | "LINE"
  | "Email"
  | "Phone"
  | "Instagram"
  | "Facebook"
  | "Telegram"
  | "Website";

export type RiskLevel = "low" | "medium" | "high";

export interface ScamContact {
  id: string;
  type: ContactType;
  value: string;
  reportCount: number;
  riskLevel: RiskLevel;
  firstReported: string;
  lastReported: string;
  scamTypes: string[];
  verifiedStatus: "unverified" | "reviewed" | "disputed";
}

export interface ScamReport {
  id: string;
  contactId: string;
  scamType: string;
  description: string;
  amount?: number;
  evidence: string[];
  reportedAt: string;
  status: "pending" | "reviewed" | "rejected";
}

export interface Finding {
  id: string;
  title: string;
  description: string;
  severity: RiskLevel;
}

export interface AnalysisResult {
  riskLevel: RiskLevel;
  headline: string;
  summary: string;
  findings: Finding[];
  detectedContacts: ScamContact[];
}
