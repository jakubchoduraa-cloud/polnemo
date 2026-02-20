import { ReactNode } from "react";
import { normalizeLang } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function generateStaticParams() {
  return [{ lang: "cs" }, { lang: "pl" }, { lang: "en" }];
}

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const current = normalizeLang(lang);

  return (
    <>
      <SiteHeader lang={current} />
      <main className="container-main py-8">{children}</main>
      <SiteFooter lang={current} />
    </>
  );
}
