import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { clearSession, getSessionToken, saveSession } from '@/infra/auth/session-store';
import type { AuthProfile, AuthResult, AuthUser } from '@/infra/http/services/api/modules/auth.module';
import { useApiService } from '@/presentation/hooks/use-api-service';

type AuthSessionContextValue = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  profile: AuthProfile | null;
  applyAuthResult: (result: AuthResult) => Promise<void>;
  refreshSession: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const api = useApiService();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);

  const refreshSession = useCallback(async () => {
    const token = await getSessionToken();
    if (!token) {
      setUser(null);
      setProfile(null);
      return;
    }

    try {
      const me = await api.modules.auth.me();
      setUser(me.user);
      setProfile(me.profile);
    } catch {
      await clearSession();
      setUser(null);
      setProfile(null);
    }
  }, [api.modules.auth]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await refreshSession();
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [refreshSession]);

  const applyAuthResult = useCallback(async (result: AuthResult) => {
    await saveSession(result.session);
    setUser(result.user);
    setProfile(result.profile);
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api.modules.auth.logout();
    } catch {
      // ignore network errors on logout
    } finally {
      await clearSession();
      setUser(null);
      setProfile(null);
    }
  }, [api.modules.auth]);

  const value = useMemo(
    () => ({
      isLoading,
      isAuthenticated: Boolean(user),
      user,
      profile,
      applyAuthResult,
      refreshSession,
      signOut,
    }),
    [isLoading, user, profile, applyAuthResult, refreshSession, signOut],
  );

  return <AuthSessionContext.Provider value={value}>{children}</AuthSessionContext.Provider>;
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext);
  if (!context) {
    throw new Error('useAuthSession must be used within AuthSessionProvider');
  }
  return context;
}
