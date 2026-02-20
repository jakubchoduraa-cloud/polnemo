import Link from "next/link";
import { Lang, localizedPath } from "@/lib/i18n";

export function SiteHeader({ lang }: { lang: Lang }) {
  return (
    <header className="border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="container-main flex h-16 items-center justify-between">
        <Link href={localizedPath(lang, "")} className="font-semibold tracking-wide">
          NEMOVITOSTI V POLSKU
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href={localizedPath(lang, "/trojmiasto")}>Trojmiasto</Link>
          <Link href={localizedPath(lang, "/projekty")}>Projekty</Link>
          <Link href={localizedPath(lang, "/blog")}>Blog</Link>
          <Link href={localizedPath(lang, "/pro")} className="rounded bg-brand px-3 py-1.5 text-white">
            PRO
          </Link>
        </nav>
      </div>
    </header>
  );
}
