import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/sessions";

const protectedRoutes = ["/dashboard", "/day", "/mistakes", "/setup", "/trade", "/triggers"];
const publicRoutes = ["/", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect("/login");
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect("/dashboard");
  }

  return NextResponse.next();
}
