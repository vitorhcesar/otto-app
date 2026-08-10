import { ApiError, isApiError } from '@/infra/http/api-error';

/** Mensagem amigável para Alert — inclui falha de rede. */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof TypeError || (error instanceof Error && /network|fetch/i.test(error.message))) {
    return 'Sem conexão com a API. Confira se a otto-api está rodando.';
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export { ApiError, isApiError };
