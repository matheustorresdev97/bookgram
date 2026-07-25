export const API_URL = process.env.API_URL ?? "http://localhost:8080";

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.message ?? `Erro ao comunicar com a API (${response.status})`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function handleResponseOrUndefined<T>(
  response: Response,
): Promise<T | undefined> {
  if (response.status === 404) {
    return undefined;
  }

  return handleResponse<T>(response);
}

export async function handleDeleteResponse(
  response: Response,
): Promise<boolean> {
  if (response.status === 404) {
    return false;
  }

  await handleResponse<void>(response);

  return true;
}
