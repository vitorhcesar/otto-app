import { BaseApiModule } from '@/infra/http/services/api/modules/base-api.module';

export type EmailStartResponse = {
  email: string;
  exists: boolean;
  nextStep: 'whatsapp' | 'login';
};

export type OtpSendResponse = {
  phone: string;
  expiresIn: number;
  resendCooldown: number;
  devHint?: string;
};

export type OtpVerifyResponse = {
  phone: string;
  verificationToken: string;
  phoneRegistered: boolean;
};

export type AuthProfile = {
  fullName: string | null;
  displayName: string | null;
  city: string | null;
  birthDate: string | null;
  cpf: string | null;
  avatarKey: string | null;
  onboardingStep: number;
  onboardingCompleted: boolean;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  phoneNumber: string | null;
  phoneNumberVerified: boolean;
};

export type AuthSession = {
  token: string;
  expiresAt: string;
};

export type AuthResult = {
  user: AuthUser;
  session: AuthSession;
  profile: AuthProfile;
};

export type MeResponse = {
  authenticated: true;
  user: AuthUser;
  profile: AuthProfile;
};

export type RegisterInput = {
  email: string;
  password: string;
  phone: string;
  verificationToken: string;
  fullName: string;
  birthDate: string;
  cpf: string;
  avatarKey?: string;
};

export interface IAuthModule {
  startEmail(email: string): Promise<EmailStartResponse>;
  sendOtp(phone: string): Promise<OtpSendResponse>;
  verifyOtp(phone: string, code: string): Promise<OtpVerifyResponse>;
  register(input: RegisterInput): Promise<AuthResult>;
  login(email: string, password: string): Promise<AuthResult>;
  logout(): Promise<void>;
  me(): Promise<MeResponse>;
}

export class AuthModule extends BaseApiModule implements IAuthModule {
  startEmail(email: string) {
    return this.http.post<EmailStartResponse>(
      '/api/v1/auth/email/start',
      { email },
      { skipAuth: true },
    );
  }

  sendOtp(phone: string) {
    return this.http.post<OtpSendResponse>(
      '/api/v1/auth/otp/send',
      { phone },
      { skipAuth: true },
    );
  }

  verifyOtp(phone: string, code: string) {
    return this.http.post<OtpVerifyResponse>(
      '/api/v1/auth/otp/verify',
      { phone, code },
      { skipAuth: true },
    );
  }

  register(input: RegisterInput) {
    return this.http.post<AuthResult>('/api/v1/auth/register', input, { skipAuth: true });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResult>(
      '/api/v1/auth/login',
      { email, password },
      { skipAuth: true },
    );
  }

  logout() {
    return this.http.post<void>('/api/v1/auth/logout');
  }

  me() {
    return this.http.get<MeResponse>('/api/v1/auth/me');
  }
}
