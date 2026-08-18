"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { SectionLink } from "@/components/section-link";

const navItems = [
  { label: "หน้าแรก", section: "top" },
  { label: "ตรวจสอบงาน", section: "checker" },
  { label: "ค้นหาช่องทาง", section: "contact-search" },
  { label: "วิธีป้องกัน", section: "scam-patterns" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [visibleSection, setVisibleSection] = useState("top");
  const pathname = usePathname();
  const routeSection = pathname.startsWith("/check")
    ? "checker"
    : pathname.startsWith("/contact")
      ? "contact-search"
      : null;
  const activeSection = pathname === "/" ? visibleSection : routeSection;

  useEffect(() => {
    if (pathname !== "/") return;

    let frame = 0;
    const updateVisibleSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const readingLine = window.scrollY + 150;
        let currentSection = "top";

        for (const item of navItems) {
          const element = document.getElementById(item.section);
          if (element && element.offsetTop <= readingLine) {
            currentSection = item.section;
          }
        }

        setVisibleSection(currentSection);
      });
    };

    updateVisibleSection();
    window.addEventListener("scroll", updateVisibleSection, { passive: true });
    window.addEventListener("resize", updateVisibleSection);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateVisibleSection);
      window.removeEventListener("resize", updateVisibleSection);
    };
  }, [pathname]);

  return (
    <header data-site-navbar className="sticky top-0 z-50 border-b border-[#eceef1]/90 bg-white/90 backdrop-blur-xl">
      <div className="container-shell flex h-[72px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 xl:flex" aria-label="เมนูหลัก">
          {navItems.map((item) => (
            (() => {
              const isActive = activeSection === item.section;
              return (
                <SectionLink
                  key={item.section}
                  section={item.section}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#fff4eb] text-[#d95700] shadow-[inset_0_0_0_1px_#ffd8bd]"
                      : "text-[#4b5565] hover:bg-[#fff8f2] hover:text-[#d95700]"
                  }`}
                >
                  {item.label}
                </SectionLink>
              );
            })()
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link
            href="/report#report-top"
            scroll
            aria-current={pathname === "/report" ? "page" : undefined}
            className={`${pathname === "/report" ? "primary-button" : "outline-button"} min-h-10 px-4 text-sm`}
          >
            แจ้งข้อมูลน่าสงสัย
          </Link>
        </div>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#344054] xl:hidden"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-[#eceef1] bg-white px-5 py-4 shadow-lg xl:hidden" aria-label="เมนูมือถือ">
          <div className="mx-auto flex max-w-xl flex-col gap-1">
            {navItems.map((item) => (
              <SectionLink
                key={item.section}
                section={item.section}
                aria-current={activeSection === item.section ? "page" : undefined}
                className={`rounded-xl px-4 py-3 font-semibold transition-colors ${
                  activeSection === item.section
                    ? "bg-[#fff4eb] text-[#d95700] shadow-[inset_0_0_0_1px_#ffd8bd]"
                    : "text-[#344054] hover:bg-[#fff8f2] hover:text-[#d95700]"
                }`}
                onSectionClick={() => setOpen(false)}
              >
                {item.label}
              </SectionLink>
            ))}
            <Link
              href="/report#report-top"
              scroll
              aria-current={pathname === "/report" ? "page" : undefined}
              className={`${pathname === "/report" ? "primary-button" : "outline-button"} mt-2 w-full`}
              onClick={() => setOpen(false)}
            >
              แจ้งข้อมูลน่าสงสัย
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
