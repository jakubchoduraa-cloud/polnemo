import Link from "next/link";
import { Lang, localizedPath } from "@/lib/i18n";

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="mt-16 border-t border-black/10 bg-sand">
      <div className="container-main grid gap-3 py-8 text-sm md:grid-cols-3">
        <p>NEMOVITOSTI V POLSKU - curated directory for Czech buyers.</p>
        <div className="flex gap-3">
          <Link href={localizedPath(lang, "/faq")}>FAQ</Link>
          <Link href={localizedPath(lang, "/jak-zacit")}>Jak začít</Link>
          <Link href={localizedPath(lang, "/kontakt")}>Kontakt</Link>
        </div>
        <p className="md:text-right">Bez veřejného zobrazování přesných cen.</p>
      </div>
    </footer>
  );
}
