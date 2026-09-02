import { ApiError, isApiError } from '@/infra/http/api-error';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  OTP_INVALID: 'Código inválido. Confira o código enviado por SMS.',
  OTP_EXPIRED: 'O código expirou. Solicite um novo SMS.',
  OTP_RESEND_COOLDOWN: 'Aguarde alguns segundos para reenviar o código.',
  OTP_SEND_FAILED: 'Não foi possível enviar o código por SMS. Tente novamente.',
  PHONE_INVALID: 'Número de telefone inválido.',
  PHONE_REQUIRED: 'Informe seu número de telefone.',
};

/** Mensagem amigável para Alert — inclui falha de rede. */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (isApiError(error)) {
    return AUTH_ERROR_MESSAGES[error.code] ?? error.message;
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
