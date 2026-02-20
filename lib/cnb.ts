import { prisma } from "@/lib/prisma";

// CNB daily text endpoint parser for PLN->CZK.
export async function fetchAndStoreTodayFxRate(date = new Date()) {
  const d = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
  const url = `https://www.cnb.cz/en/financial_markets/foreign_exchange_market/exchange_rate_fixing/daily.txt?date=${d}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("CNB fetch failed");
  }

  const text = await res.text();
  const line = text
    .split("\n")
    .find((l) => l.toUpperCase().includes("POLISH ZLOTY") || l.startsWith("Poland|"));

  if (!line) throw new Error("PLN rate not found");

  const parts = line.split("|");
  const amount = Number(parts[2]);
  const rate = Number((parts[4] || "").replace(",", "."));
  if (!amount || !rate) throw new Error("Invalid PLN rate format");

  const plnToCzk = rate / amount;
  const day = new Date(date.toISOString().slice(0, 10));

  return prisma.fxRateDaily.upsert({
    where: { date: day },
    update: { plnToCzkRate: plnToCzk },
    create: { date: day, plnToCzkRate: plnToCzk, source: "CNB" }
  });
}
