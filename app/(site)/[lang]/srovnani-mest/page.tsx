import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Srovnání měst",
    description: "Praha/Brno/Ostrava vs Trojmiasto pro investory.",
    pathWithoutLang: "/srovnani-mest"
  });
}

export default function ComparePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Praha/Brno/Ostrava vs Trojmiasto</h1>
      <div className="rounded-xl border border-black/10 bg-white p-4 text-sm">
        Nižší vstupní bariéra v některých lokalitách, silná turistická i long-term poptávka, diverzifikace mimo CZ trh.
      </div>
    </div>
  );
}
