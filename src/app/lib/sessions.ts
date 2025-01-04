import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);
const cookieStore = await cookies();

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const session = await encrypt({ userId, expiresAt });
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
  redirect("/dashboard");
}

export async function deleteSession() {
  cookieStore.delete("session");
  redirect("/");
}

type SessionPayload = {
  userId: number;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodeKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session", error);
  }
}
