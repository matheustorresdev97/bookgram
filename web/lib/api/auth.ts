const MOCK_LATENCY_MS = 700;

const MOCK_CREDENTIALS = {
  username: "leitor",
  password: "leitor123",
};

function delay<T>(value: T, ms = MOCK_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface LoginResult {
  success: boolean;
  user?: { username: string };
  error?: string;
}

/**
 * Mock do client da futura API de autenticação: assíncrono e com
 * latência simulada, para consumir igual a uma chamada de rede real.
 */
export async function login(
  username: string,
  password: string,
): Promise<LoginResult> {
  if (
    username === MOCK_CREDENTIALS.username &&
    password === MOCK_CREDENTIALS.password
  ) {
    return delay({ success: true, user: { username } });
  }

  return delay({ success: false, error: "Usuário ou senha inválidos." });
}
