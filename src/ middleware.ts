import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/sessions";

const protectedRoutes = ["/dashboard", "/day", "/mistakes", "/setup", "/trade"];
const publicRoutes = ["/", "/register", "/triggers"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  console.log("cookie", cookie);
  const session = await decrypt(cookie);
  console.log("session", session);
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL ("/", request.nextUrl));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL ("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}
