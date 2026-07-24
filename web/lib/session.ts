import { cookies } from "next/headers";

const TOKEN_COOKIE = "token";
const TOKEN_PREFIX = "mock-token-";
const SESSION_MAX_AGE = 60 * 60 * 24;

export interface SessionUser {
  username: string;
}

export async function createSession(username: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE, `${TOKEN_PREFIX}${username}`, {
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
 * Mock do "userGet": decodifica o usuário autenticado a partir do cookie de
 * sessão. Usado pelo header e por checagens de autenticação no servidor.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  if (!token?.startsWith(TOKEN_PREFIX)) {
    return null;
  }

  return { username: token.slice(TOKEN_PREFIX.length) };
}
