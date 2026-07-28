import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/presentation/components/ui/button';
import { formatBrazilPhoneDisplay } from '@/presentation/components/ui/phone-field';
import { StepGroup } from '@/presentation/components/ui/step-group';
import { TextField } from '@/presentation/components/ui/text-field';
import { TimerIcon } from '@/presentation/components/ui/timer-icon';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';

const RESEND_SECONDS = 21;
const CODE_LENGTH = 6;

export function LoginEmailCodePage() {
  const router = useRouter();
  const { email, phone } = useLocalSearchParams<{ email?: string; phone?: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const phoneDisplay = useMemo(
    () => formatBrazilPhoneDisplay(phone ?? ''),
    [phone],
  );
  const canContinue = code.replace(/\D/g, '').length === CODE_LENGTH;
  const canResend = secondsLeft <= 0;

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  function handleCodeChange(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, CODE_LENGTH);
    setCode(digits);
    if (error) {
      setError(undefined);
    }
  }

  function handleResend() {
    if (!canResend) {
      return;
    }

    setSecondsLeft(RESEND_SECONDS);
    setError(undefined);
    setCode('');
    // Backend wiring comes later
  }

  function handleContinue() {
    if (!canContinue) {
      return;
    }

    setError(undefined);
    router.push({
      pathname: '/login-email-profile',
      params: {
        email: typeof email === 'string' ? email : '',
        phone: typeof phone === 'string' ? phone : '',
      },
    });
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <StepGroup total={5} current={2} style={styles.steps} />

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Image
              source={require('@/assets/images/auth/logo.png')}
              style={styles.logo}
              contentFit="contain"
              accessibilityLabel="Otto"
            />

            <View style={styles.form}>
              <View style={styles.headerCopy}>
                <Text style={styles.title}>Código do WhatsApp!</Text>
                <Text style={styles.subtitle}>Enviamos um código de 6 dígitos para:</Text>
                <Text style={styles.phone}>{phoneDisplay || '—'}</Text>
              </View>

              <TextField
                label="Código"
                placeholder="Código"
                value={code}
                onChangeText={handleCodeChange}
                error={error}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                maxLength={CODE_LENGTH}
                returnKeyType="done"
              />

              <Button
                label="Continuar"
                variant="filled"
                disabled={!canContinue}
                onPress={handleContinue}
              />
            </View>

            {canResend ? (
              <Pressable accessibilityRole="link" onPress={handleResend}>
                <Text style={styles.resendLink}>Reenviar código</Text>
              </Pressable>
            ) : (
              <View style={styles.resendRow}>
                <TimerIcon size={16} color={OttoColors.textSoft} />
                <Text style={styles.resendText}>
                  Reenviar em {secondsLeft} {secondsLeft === 1 ? 'segundo' : 'segundos'}
                </Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: OttoColors.background,
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  steps: {
    marginTop: 16,
    marginBottom: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
    gap: 32,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  logo: {
    width: 57,
    height: 59,
  },
  form: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 24,
  },
  headerCopy: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    ...OttoTypography.h3,
    color: OttoColors.text,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  subtitle: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  phone: {
    ...OttoTypography.h3,
    color: OttoColors.text,
    textAlign: 'center',
    alignSelf: 'stretch',
    marginTop: 8,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resendText: {
    ...OttoTypography.body,
    color: OttoColors.textSoft,
  },
  resendLink: {
    ...OttoTypography.body,
    color: OttoColors.text,
    textDecorationLine: 'underline',
  },
});
