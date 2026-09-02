import { Image } from 'expo-image';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthSession } from '@/presentation/auth/auth-session-context';
import {
  authenticateWithBiometrics,
  shouldRequireBiometricLock,
  type BiometricCapability,
} from '@/presentation/biometrics/biometric-capability';
import { Button } from '@/presentation/components/ui/button';
import {
  BiometricsFaceIcon,
  BiometricsFingerprintIcon,
} from '@/presentation/components/ui/biometrics-icons';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';
import { HomeLoading } from '@/presentation/pages/HomePage';

type Gate = 'pending' | 'open' | 'locked';

export function BiometricLockGate({ children }: { children: ReactNode }) {
  const { isAuthenticated, signOut } = useAuthSession();
  const [gate, setGate] = useState<Gate>(isAuthenticated ? 'pending' : 'open');
  const [capability, setCapability] = useState<BiometricCapability | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const gateRef = useRef(gate);
  const promptingRef = useRef(false);
  const appStateRef = useRef(AppState.currentState);
  const sawLoggedOutReady = useRef(!isAuthenticated);

  useEffect(() => {
    gateRef.current = gate;
  }, [gate]);

  const lockIfRequired = useCallback(async () => {
    const { required, capability: bio } = await shouldRequireBiometricLock();
    setCapability(bio);
    if (required) {
      setGate('locked');
      return bio;
    }
    setGate('open');
    return null;
  }, []);

  const promptUnlock = useCallback(async (bio: BiometricCapability) => {
    if (promptingRef.current) {
      return;
    }

    promptingRef.current = true;
    try {
      const result = await authenticateWithBiometrics(
        `Desbloqueie o Otto com ${bio.label}`,
      );
      if (result.success) {
        setGate('open');
      }
    } catch {
      // Stay locked; the overlay offers a retry.
    } finally {
      promptingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      sawLoggedOutReady.current = true;
      setGate('open');
      setCapability(null);
      return;
    }

    if (sawLoggedOutReady.current) {
      setGate('open');
      return;
    }

    let cancelled = false;

    (async () => {
      const bio = await lockIfRequired();
      if (cancelled || !bio) {
        return;
      }
      await promptUnlock(bio);
    })();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, lockIfRequired, promptUnlock]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      const previous = appStateRef.current;
      appStateRef.current = nextState;

      if (nextState === 'background' && isAuthenticated) {
        void lockIfRequired();
        return;
      }

      if (nextState !== 'active' || previous !== 'background' || !isAuthenticated) {
        return;
      }

      void (async () => {
        const bio = await lockIfRequired();
        if (bio && gateRef.current === 'locked') {
          await promptUnlock(bio);
        }
      })();
    });

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated, lockIfRequired, promptUnlock]);

  async function handleRetry() {
    const bio = capability ?? (await lockIfRequired());
    if (!bio) {
      return;
    }
    await promptUnlock(bio);
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  }

  const cover = isAuthenticated && gate !== 'open';
  const icon =
    capability?.kind === 'fingerprint' ? (
      <BiometricsFingerprintIcon size={32} color={OttoColors.textMid} />
    ) : (
      <BiometricsFaceIcon size={32} color={OttoColors.textMid} />
    );

  return (
    <View style={styles.root}>
      {children}
      {cover ? (
        <View style={styles.cover} pointerEvents="auto">
          {gate === 'pending' ? (
            <HomeLoading />
          ) : (
            <SafeAreaView style={styles.lockSafe} edges={['top', 'bottom']}>
              <View style={styles.lockContent}>
                <Image
                  source={require('@/assets/images/auth/logo.png')}
                  style={styles.logo}
                  contentFit="contain"
                  accessibilityLabel="Otto"
                />
                <View style={styles.iconWrap}>{icon}</View>
                <View style={styles.copy}>
                  <Text style={styles.title}>Desbloquear Otto</Text>
                  <Text style={styles.subtitle}>
                    {capability
                      ? `Use ${capability.label} para entrar no app`
                      : 'Use a biometria para entrar no app'}
                  </Text>
                </View>
                <View style={styles.actions}>
                  <Button
                    label={`Usar ${capability?.label ?? 'biometria'}`}
                    variant="filled"
                    onPress={handleRetry}
                  />
                  <Button
                    label="Sair da conta"
                    variant="stroke"
                    loading={signingOut}
                    onPress={handleSignOut}
                  />
                </View>
              </View>
            </SafeAreaView>
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: OttoColors.background,
    zIndex: 50,
  },
  lockSafe: {
    flex: 1,
  },
  lockContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  logo: {
    width: 57,
    height: 59,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: OttoColors.neutralBlackSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    alignItems: 'center',
    gap: 4,
  },
  title: {
    ...OttoTypography.h3,
    color: OttoColors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
    textAlign: 'center',
  },
  actions: {
    alignSelf: 'stretch',
    maxWidth: 400,
    gap: 12,
  },
});
