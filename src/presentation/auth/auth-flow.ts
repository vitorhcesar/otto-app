export type AuthMethod = 'email' | 'whatsapp';

export type AuthScreen = 'phone' | 'code' | 'profile' | 'data';

export type AuthStep = {
  current: number;
  total: number;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMAIL_STEPS: Record<AuthScreen, number> = {
  phone: 1,
  code: 2,
  profile: 3,
  data: 4,
};

const WHATSAPP_STEPS: Record<Exclude<AuthScreen, 'phone'>, number> = {
  code: 1,
  profile: 2,
  data: 3,
};

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function parseAuthMethod(value: unknown): AuthMethod {
  return value === 'whatsapp' ? 'whatsapp' : 'email';
}

export function getAuthStep(method: AuthMethod, screen: AuthScreen): AuthStep {
  if (method === 'whatsapp') {
    if (screen === 'phone') {
      return { current: 1, total: 4 };
    }

    return {
      current: WHATSAPP_STEPS[screen],
      total: 4,
    };
  }

  return {
    current: EMAIL_STEPS[screen],
    total: 5,
  };
}

export function paramString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}
