import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/lead-form";

export async function generateMetadata() {
  return buildMetadata({
    title: "Kontakt",
    description: "Kontaktujte concierge tým pro nákup bez stresu.",
    pathWithoutLang: "/kontakt"
  });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold">Kontakt</h1>
        <p className="mt-2 text-black/70">Napište nám a připravíme další kroky k bezpečné akvizici v Polsku.</p>
      </div>
      <LeadForm lang={lang} />
    </div>
  );
}
