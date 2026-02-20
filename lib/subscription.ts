import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireActiveSubscription() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/cs/pro");
  if (session.user.subscriptionStatus !== "ACTIVE") redirect("/cs/pro");
  return session;
}
