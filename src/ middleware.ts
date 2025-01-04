import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/sessions";

const protectedRoutes = ["/dashboard", "/day", "/mistakes", "/setup", "/trade"];
const publicRoutes = ["/", "/register", "/triggers"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  console.log("cookie", cookie);
  const session = await decrypt(cookie);
  console.log("session", session);
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL ("/", req.nextUrl));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL ("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
