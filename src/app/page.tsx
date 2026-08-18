import { ContactSearch } from "@/components/contact-search";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { JobChecker } from "@/components/job-checker";
import { Navbar } from "@/components/navbar";
import { ScamPatterns } from "@/components/scam-patterns";
import { SectionScrollManager } from "@/components/section-link";
import { StatisticsSection } from "@/components/statistics-section";

export default function HomePage() {
  return (
    <>
      <SectionScrollManager />
      <Navbar />
      <main>
        <HeroSection />
        <JobChecker />
        <ContactSearch />
        <ScamPatterns />
        <StatisticsSection />
      </main>
      <Footer />
    </>
  );
}
