import { PrismaClient, City, PropertyType } from "@prisma/client";

const prisma = new PrismaClient();

const cities: City[] = [City.Gdansk, City.Gdynia, City.Sopot];
const types: PropertyType[] = [PropertyType.apartment, PropertyType.condo, PropertyType.house, PropertyType.villa];

async function main() {
  await prisma.conciergeRequest.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.property.deleteMany();
  await prisma.project.deleteMany();
  await prisma.developer.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.localityStats.deleteMany();
  await prisma.fxRateDaily.deleteMany();

  const devs = await Promise.all(
    ["Baltic Prime", "Seaside Build", "Nordic Harbor", "Amber Living", "Wavefront Estates"].map((name, idx) =>
      prisma.developer.create({
        data: {
          slug: `developer-${idx + 1}`,
          name,
          websiteUrl: `https://example${idx + 1}.com`,
          contactEmail: `contact${idx + 1}@example.com`,
          description: `Developer focused on high-quality coastal projects in Trojmiasto (${name}).`
        }
      })
    )
  );

  for (const city of cities) {
    const ranges: Record<City, [number, number]> = {
      Gdansk: [3200000, 7300000],
      Gdynia: [2900000, 6400000],
      Sopot: [4800000, 12000000]
    };
    await prisma.localityStats.create({
      data: {
        city,
        publicPriceRangeMinCzk: ranges[city][0],
        publicPriceRangeMaxCzk: ranges[city][1],
        notes: "Public range from curated on-market inventory"
      }
    });
  }

  const projects = [];
  for (let i = 1; i <= 10; i++) {
    const city = cities[(i - 1) % cities.length];
    const min = 2500000 + i * 150000;
    const max = min + 1800000;
    const project = await prisma.project.create({
      data: {
        slug: `projekt-${i}`,
        name: `Projekt ${i} ${city}`,
        city,
        developerId: devs[(i - 1) % devs.length].id,
        unitsTotal: 40 + i * 5,
        unitsForSale: 10 + i,
        publicPriceRangeMinCzk: Math.round(min / 1000) * 1000,
        publicPriceRangeMaxCzk: Math.round(max / 1000) * 1000,
        description: `Nový development ${i} v ${city} s důrazem na dlouhodobý výnos a správu nájmu.`,
        locationNotes: "Dobrá dopravní dostupnost, služby a školy v okolí."
      }
    });
    projects.push(project);
  }

  for (let i = 1; i <= 30; i++) {
    const city = cities[(i - 1) % cities.length];
    const project = projects[(i - 1) % projects.length];
    await prisma.property.create({
      data: {
        slug: `nemovitost-${i}`,
        title: `Investiční nemovitost ${i} (${city})`,
        city,
        neighborhood: ["Wrzeszcz", "Orlowo", "Dolny Sopot"][i % 3],
        propertyType: types[i % types.length],
        areaM2: 45 + i * 3,
        bedrooms: (i % 4) + 1,
        bathrooms: (i % 2) + 1,
        yieldEstimate: i % 5 === 0 ? null : Number((4.1 + (i % 4) * 0.5).toFixed(1)),
        rentPotentialNotes: "Vysoká poptávka po dlouhodobých nájmech, silná sezóna i mimo léto.",
        photos: [
          `https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80`,
          `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80`
        ],
        descriptionShort: "Kurátorovaný listing vhodný pro českého investora.",
        descriptionLong:
          "Detailní kurátorský popis: právní kontext, orientační nájemní potenciál, dopravní dostupnost a klíčová rizika.",
        travelTimePlaneHours: 1.2,
        travelTimeTrainHours: 8.4,
        airportTravelTimeMin: 25 + (i % 20),
        riskFlagsJson: {
          legal: "check",
          zoning: i % 6 === 0 ? "review" : "ok",
          tax: "check",
          flood: i % 7 === 0 ? "review" : "low",
          hoa: "verify",
          tenant: i % 5 === 0 ? "turnover-risk" : "stable"
        },
        sourceName: "Manual curation",
        sourceUrl: `https://example.com/listing-${i}`,
        sourceLastSeenAt: new Date(),
        projectId: project.id,
        developerId: devs[(i - 1) % devs.length].id,
        status: "published",
        isTopPick: i <= 15,
        publishedAt: new Date(Date.now() - i * 86400000)
      }
    });
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.blogPost.create({
      data: {
        slug: `blog-${i}`,
        lang: "cs",
        title: `Jak investovat v Trojmiasto #${i}`,
        excerpt: "Krátký praktický přehled pro české kupce.",
        contentMd:
          "## Proč Trojmiasto\nTrojmiasto nabízí silný mix turismu, IT pracovních míst a stabilní poptávky po nájmu.\n\n## Co řešit před koupí\nPrávní prověrku, daně, správu nemovitosti a exit scénář.",
        publishedAt: new Date(Date.now() - i * 43200000),
        seoTitle: `SEO článek ${i} | NEMOVITOSTI V POLSKU`,
        seoDescription: "Praktické know-how pro nákup nemovitosti v Polsku bez zbytečných chyb."
      }
    });
  }

  await prisma.fxRateDaily.create({
    data: {
      date: new Date(new Date().toISOString().slice(0, 10)),
      plnToCzkRate: 5.91,
      source: "CNB"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
