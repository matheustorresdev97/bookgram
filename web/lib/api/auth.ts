const MOCK_LATENCY_MS = 700;

const MOCK_CREDENTIALS = {
  username: "leitor",
  password: "leitor123",
};

const MOCK_EXISTING_EMAIL = "leitor@bookgram.com";

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

export interface RegisterResult {
  success: boolean;
  user?: { username: string };
  error?: string;
}

/**
 * Mock do client da futura API de cadastro: assíncrono e com latência
 * simulada, para consumir igual a uma chamada de rede real.
 */
export async function register(
  name: string,
  email: string,
  password: string,
): Promise<RegisterResult> {
  if (email.toLowerCase() === MOCK_EXISTING_EMAIL) {
    return delay({
      success: false,
      error: "Este e-mail já está cadastrado.",
    });
  }

  if (password.length < 6) {
    return delay({
      success: false,
      error: "A senha deve ter pelo menos 6 caracteres.",
    });
  }

  return delay({ success: true, user: { username: name } });
}

export interface RequestPasswordResetResult {
  success: boolean;
}

/**
 * Nunca revela se o e-mail existe na base, para evitar enumeração de contas.
 */
export async function requestPasswordReset(
  email: string,
): Promise<RequestPasswordResetResult> {
  void email;
  return delay({ success: true });
}

export interface ResetPasswordResult {
  success: boolean;
  error?: string;
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<ResetPasswordResult> {
  if (!token) {
    return delay({
      success: false,
      error: "Link de redefinição inválido ou expirado.",
    });
  }

  if (password.length < 6) {
    return delay({
      success: false,
      error: "A senha deve ter pelo menos 6 caracteres.",
    });
  }

  return delay({ success: true });
}
