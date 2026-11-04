import { currentUser } from "@clerk/nextjs/server";

export async function isBlogEditor(): Promise<boolean> {
  const allowed = new Set((process.env.BLOG_EDITOR_EMAILS ?? "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean));
  if (!allowed.size) return false;
  const user = await currentUser();
  return Boolean(user?.emailAddresses.some((email) =>
    email.verification?.status === "verified" && allowed.has(email.emailAddress.toLowerCase())
  ));
}
