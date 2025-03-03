import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/sessions";

const protectedRoutes = [
  "/dashboard",
  "/today",
  "/trade",
  "/trades",
  "/stats",
  "/triggers",
  "/mistakes",
  "/setups",
];
const publicRoutes = ["/", "/register"];

export default async function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    const session = await decrypt(cookie);
    if (isProtectedRoute && !session?.userId) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
  }
}
