import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactDetail } from "@/components/contact-detail";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { scamContacts, scamReports } from "@/lib/mock-data";

interface ContactDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return scamContacts.map((contact) => ({ id: contact.id }));
}

export async function generateMetadata({ params }: ContactDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const contact = scamContacts.find((item) => item.id === id);

  return {
    title: contact ? `ประวัติรายงาน ${contact.value}` : "ไม่พบช่องทาง",
    description: contact
      ? `ประวัติการรายงานและข้อมูลที่ควรระวังของ ${contact.type} ${contact.value}`
      : "ไม่พบข้อมูลช่องทางที่ค้นหา",
  };
}

export default async function ContactDetailPage({ params }: ContactDetailPageProps) {
  const { id } = await params;
  const contact = scamContacts.find((item) => item.id === id);
  if (!contact) notFound();

  const reports = scamReports
    .filter((report) => report.contactId === contact.id)
    .sort((a, b) => b.reportedAt.localeCompare(a.reportedAt));

  return (
    <>
      <Navbar />
      <ContactDetail contact={contact} reports={reports} />
      <Footer />
    </>
  );
}
