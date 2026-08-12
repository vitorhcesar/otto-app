import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getErrorMessage, isApiError } from '@/infra/http/get-error-message';
import { getPreferences } from '@/infra/preferences/preferences-store';
import {
  authenticateWithBiometrics,
  getBiometricCapability,
  type BiometricCapability,
} from '@/presentation/biometrics/biometric-capability';
import { InfoCircleIcon } from '@/presentation/components/ui/api-keys-icons';
import { BackButton } from '@/presentation/components/ui/back-button';
import { Button } from '@/presentation/components/ui/button';
import { PasswordField } from '@/presentation/components/ui/password-field';
import { VerifiedBadgeIcon } from '@/presentation/components/ui/profile-icons';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';
import { useApiService } from '@/presentation/hooks/use-api-service';

const MIN_PASSWORD_LENGTH = 8;

type Step = 'checking' | 'current-password' | 'new-password';
type VerifiedBy = 'password' | 'biometric';

function passwordErrorMessage(error: unknown, fallback: string) {
  if (isApiError(error)) {
    if (error.code === 'INVALID_CREDENTIALS') {
      return 'Senha atual incorreta.';
    }
    if (error.code === 'PASSWORD_TOO_SHORT') {
      return 'A nova senha deve ter pelo menos 8 caracteres.';
    }
  }
  return getErrorMessage(error, fallback);
}

export function ChangePasswordPage() {
  const router = useRouter();
  const api = useApiService();
  const biometricAttempted = useRef(false);

  const [step, setStep] = useState<Step>('checking');
  const [verifiedBy, setVerifiedBy] = useState<VerifiedBy | null>(null);
  const [capability, setCapability] = useState<BiometricCapability | null>(null);
  const [biometricsUnlockEnabled, setBiometricsUnlockEnabled] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordValid = newPassword.length >= MIN_PASSWORD_LENGTH;
  const canChange =
    passwordValid && newPassword === confirmPassword && confirmPassword.length > 0;

  const unlockWithBiometrics = useCallback(async (bio: BiometricCapability) => {
    try {
      const result = await authenticateWithBiometrics(
        `Confirme com ${bio.label} para alterar a senha`,
      );
      if (!result.success) {
        return false;
      }
      setVerifiedBy('biometric');
      setStep('new-password');
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [stored, bio] = await Promise.all([
        getPreferences(),
        getBiometricCapability(),
      ]);
      if (cancelled) {
        return;
      }

      const canUnlock =
        stored.biometricsEnabled && bio.hardwareAvailable && bio.enrolled;
      setCapability(bio);
      setBiometricsUnlockEnabled(canUnlock);

      if (canUnlock && !biometricAttempted.current) {
        biometricAttempted.current = true;
        const unlocked = await unlockWithBiometrics(bio);
        if (cancelled) {
          return;
        }
        if (!unlocked) {
          setStep('current-password');
        }
        return;
      }

      setStep('current-password');
    })();

    return () => {
      cancelled = true;
    };
  }, [unlockWithBiometrics]);

  function goToSettings() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/settings');
  }

  async function handleVerifyCurrentPassword() {
    if (!currentPassword || loading) {
      return;
    }

    setLoading(true);
    try {
      await api.modules.auth.verifyPassword(currentPassword);
      setVerifiedBy('password');
      setStep('new-password');
    } catch (error) {
      Alert.alert(
        'Não foi possível confirmar',
        passwordErrorMessage(error, 'Senha atual incorreta. Tente novamente.'),
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRetryBiometrics() {
    if (!capability || loading) {
      return;
    }
    await unlockWithBiometrics(capability);
  }

  async function handleChangePassword() {
    if (!canChange || loading) {
      return;
    }

    setLoading(true);
    try {
      await api.modules.auth.changePassword({
        newPassword,
        currentPassword:
          verifiedBy === 'password' ? currentPassword : undefined,
      });
      Alert.alert('Senha alterada', 'Sua senha foi atualizada com sucesso.', [
        {
          text: 'OK',
          onPress: () => {
            goToSettings();
          },
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Erro ao alterar senha',
        passwordErrorMessage(
          error,
          'Não foi possível alterar a senha. Tente novamente.',
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  const confirmError =
    confirmPassword.length > 0 && newPassword !== confirmPassword
      ? 'As senhas não coincidem'
      : undefined;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step !== 'new-password' ? (
            <BackButton onPress={goToSettings} fallbackHref="/settings" />
          ) : null}

          {step === 'checking' ? null : step === 'current-password' ? (
            <View style={styles.form}>
              <View style={styles.headerCopy}>
                <Text style={styles.title}>Confirmar senha</Text>
                <Text style={styles.subtitle}>
                  {biometricsUnlockEnabled
                    ? `Para alterar sua senha, confirme com a senha atual ou use ${capability?.label ?? 'a biometria'}.`
                    : 'Para alterar sua senha, confirme que é você digitando a senha atual.'}
                </Text>
              </View>

              <PasswordField
                label="Senha atual"
                placeholder="Senha atual"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handleVerifyCurrentPassword}
              />

              <Button
                label="Continuar"
                variant="filled"
                disabled={currentPassword.length < 1}
                loading={loading}
                onPress={handleVerifyCurrentPassword}
              />

              {biometricsUnlockEnabled ? (
                <Button
                  label={`Usar ${capability?.label ?? 'biometria'}`}
                  variant="stroke"
                  disabled={loading}
                  onPress={handleRetryBiometrics}
                />
              ) : null}
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.headerCopy}>
                <Text style={styles.title}>Alterar senha</Text>
                <Text style={styles.subtitle}>
                  Defina uma nova senha para sua conta. Use 8 ou mais caracteres
                  com uma mistura de letras, números e símbolos.
                </Text>
              </View>

              <View style={styles.fields}>
                <PasswordField
                  label="Digite sua senha"
                  placeholder="Digite sua senha"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  autoComplete="new-password"
                  textContentType="newPassword"
                  returnKeyType="next"
                  showToggle={false}
                  trailing={
                    passwordValid ? (
                      <VerifiedBadgeIcon size={16} color={OttoColors.primary} />
                    ) : undefined
                  }
                />
                <PasswordField
                  label="Confirmar senha"
                  placeholder="Confirmar senha"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  autoComplete="new-password"
                  textContentType="newPassword"
                  returnKeyType="done"
                  error={confirmError}
                  onSubmitEditing={handleChangePassword}
                />
              </View>

              <View style={styles.hintRow}>
                <InfoCircleIcon size={16} />
                <Text style={styles.hintText}>Ao menos 8 caracteres</Text>
              </View>

              <Button
                label="Alterar senha"
                variant="filled"
                disabled={!canChange}
                loading={loading}
                onPress={handleChangePassword}
              />

              <Button
                label="Voltar para configurações"
                variant="stroke"
                disabled={loading}
                onPress={goToSettings}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: OttoColors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
    gap: 24,
  },
  form: {
    alignSelf: 'stretch',
    gap: 24,
  },
  headerCopy: {
    gap: 4,
  },
  title: {
    ...OttoTypography.h1,
    color: OttoColors.text,
  },
  subtitle: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
  },
  fields: {
    alignSelf: 'stretch',
    gap: 16,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hintText: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
  },
});
