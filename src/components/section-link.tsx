"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ComponentProps, type MouseEvent } from "react";

const PENDING_SECTION_KEY = "jobcheckthai:pending-section";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  section: string;
  onSectionClick?: () => void;
};

function scrollToSection(section: string, behavior: ScrollBehavior) {
  if (section === "top") {
    window.scrollTo({ top: 0, behavior });
    return true;
  }

  const target = document.getElementById(section);
  if (!target) return false;
  const navbar = document.querySelector<HTMLElement>("[data-site-navbar]");
  const navbarOffset = (navbar?.offsetHeight ?? 72) + 16;
  const targetTop = window.scrollY + target.getBoundingClientRect().top - navbarOffset;
  window.scrollTo({ top: Math.max(0, targetTop), behavior });
  return true;
}

export function SectionLink({ section, onSectionClick, onClick, ...props }: SectionLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const href = `/#${section}`;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    onSectionClick?.();

    if (pathname === "/") {
      window.history.pushState(null, "", href);
      // Wait for the mobile menu to collapse before measuring the target position.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToSection(section, "smooth"));
      });
      return;
    }

    sessionStorage.setItem(PENDING_SECTION_KEY, section);
    router.push(href, { scroll: false });
  }

  return <Link {...props} href={href} onClick={handleClick} />;
}

export function SectionScrollManager() {
  useEffect(() => {
    const pendingSection = sessionStorage.getItem(PENDING_SECTION_KEY);
    const hashSection = decodeURIComponent(window.location.hash.slice(1));
    const section = pendingSection || hashSection;
    if (!section) return;

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(section, "auto");
      sessionStorage.removeItem(PENDING_SECTION_KEY);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}
