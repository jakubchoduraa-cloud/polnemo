import { getServerSession } from "next-auth";
import { authOptions, isAdminEmail } from "@/lib/auth";

export async function assertAdminApi() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    throw new Error("Unauthorized");
  }
}
