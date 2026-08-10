import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { AuthMethod } from '@/presentation/auth/auth-flow';

export type AuthDraft = {
  method: AuthMethod;
  email: string;
  phone: string;
  password: string;
  verificationToken: string;
};

type AuthDraftContextValue = {
  draft: AuthDraft;
  setMethod: (method: AuthMethod) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setPassword: (password: string) => void;
  setVerificationToken: (token: string) => void;
  resetDraft: () => void;
};

const INITIAL_DRAFT: AuthDraft = {
  method: 'email',
  email: '',
  phone: '',
  password: '',
  verificationToken: '',
};

const AuthDraftContext = createContext<AuthDraftContextValue | null>(null);

export function AuthDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<AuthDraft>(INITIAL_DRAFT);

  const setMethod = useCallback((method: AuthMethod) => {
    setDraft((current) => ({ ...current, method }));
  }, []);

  const setEmail = useCallback((email: string) => {
    setDraft((current) => ({ ...current, email }));
  }, []);

  const setPhone = useCallback((phone: string) => {
    setDraft((current) => ({ ...current, phone }));
  }, []);

  const setPassword = useCallback((password: string) => {
    setDraft((current) => ({ ...current, password }));
  }, []);

  const setVerificationToken = useCallback((verificationToken: string) => {
    setDraft((current) => ({ ...current, verificationToken }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(INITIAL_DRAFT);
  }, []);

  const value = useMemo(
    () => ({
      draft,
      setMethod,
      setEmail,
      setPhone,
      setPassword,
      setVerificationToken,
      resetDraft,
    }),
    [draft, setMethod, setEmail, setPhone, setPassword, setVerificationToken, resetDraft],
  );

  return <AuthDraftContext.Provider value={value}>{children}</AuthDraftContext.Provider>;
}

export function useAuthDraft() {
  const context = useContext(AuthDraftContext);
  if (!context) {
    throw new Error('useAuthDraft must be used within AuthDraftProvider');
  }
  return context;
}
