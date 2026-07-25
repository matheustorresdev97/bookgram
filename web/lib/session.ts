import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const TOKEN_COOKIE = "token";
const SESSION_MAX_AGE = 60 * 60 * 24;

const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET);

export interface SessionUser {
  username: string;
}

export async function createSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
}

/**
 * Verifica a assinatura do JWT localmente (sem round-trip para a API) usando o
 * mesmo segredo (JWT_SECRET) com que o backend assinou o token no login/registro.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, encodedSecret, {
      algorithms: ["HS256"],
    });

    if (typeof payload.sub !== "string") {
      return null;
    }

    return { username: payload.sub };
  } catch {
    return null;
  }
}
