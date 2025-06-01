import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "./auth";

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = verifyToken(token || "");

  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { user, response: null };
}
