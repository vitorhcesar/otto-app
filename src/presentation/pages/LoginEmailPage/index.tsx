import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getErrorMessage } from '@/infra/http/get-error-message';
import { type AuthMethod, isValidEmail } from '@/presentation/auth/auth-flow';
import { useAuthDraft } from '@/presentation/auth/auth-draft-context';
import {
  AppleIcon,
  EmailIcon,
  GoogleIcon,
  PhoneIcon,
} from '@/presentation/components/ui/brand-icons';
import { Button } from '@/presentation/components/ui/button';
import { ContentDivider } from '@/presentation/components/ui/content-divider';
import { getPhoneDigits, PhoneField } from '@/presentation/components/ui/phone-field';
import { TextField } from '@/presentation/components/ui/text-field';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';
import { useApiService } from '@/presentation/hooks/use-api-service';

const SWITCH_DURATION = 280;
const SWITCH_EXIT_DURATION = 220;
const SWITCH_SLIDE = 18;
const SWITCH_EASING = Easing.out(Easing.cubic);

function enteringForMethod(method: AuthMethod) {
  if (method === 'phone') {
    return FadeInRight.duration(SWITCH_DURATION)
      .easing(SWITCH_EASING)
      .withInitialValues({
        opacity: 0,
        transform: [{ translateX: SWITCH_SLIDE }],
      });
  }

  return FadeInLeft.duration(SWITCH_DURATION)
    .easing(SWITCH_EASING)
    .withInitialValues({
      opacity: 0,
      transform: [{ translateX: -SWITCH_SLIDE }],
    });
}

function exitingForMethod(method: AuthMethod) {
  if (method === 'phone') {
    return FadeOutRight.duration(SWITCH_EXIT_DURATION).easing(SWITCH_EASING);
  }

  return FadeOutLeft.duration(SWITCH_EXIT_DURATION).easing(SWITCH_EASING);
}

export function LoginEmailPage() {
  const router = useRouter();
  const api = useApiService();
  const { setMethod, setEmail, setPhone, setOtpDevHint } = useAuthDraft();
  const [method, setMethodLocal] = useState<AuthMethod>('email');
  const [email, setEmailLocal] = useState('');
  const [phone, setPhoneLocal] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSwitchedMethod, setHasSwitchedMethod] = useState(false);

  const canContinue =
    method === 'email'
      ? isValidEmail(email)
      : getPhoneDigits(phone).length >= 10;

  function switchMethod(next: AuthMethod) {
    if (next === method) {
      return;
    }

    Keyboard.dismiss();
    setHasSwitchedMethod(true);
    setMethodLocal(next);
    setMethod(next);
  }

  async function handleContinue() {
    if (!canContinue || loading) {
      return;
    }

    setLoading(true);
    try {
      if (method === 'email') {
        const trimmed = email.trim();
        const result = await api.modules.auth.startEmail(trimmed);
        setMethod('email');
        setEmail(result.email);

        if (result.nextStep === 'login') {
          router.push({
            pathname: '/login-password',
            params: { method: 'email', email: result.email },
          });
          return;
        }

        router.push({
          pathname: '/login-email-phone',
          params: {
            method: 'email',
            email: result.email,
          },
        });
        return;
      }

      const phoneDigits = getPhoneDigits(phone);
      const result = await api.modules.auth.startPhone(phoneDigits);
      setMethod('phone');
      setPhone(result.phone);
      setEmail('');

      if (result.nextStep === 'login') {
        router.push({
          pathname: '/login-password',
          params: { method: 'phone', phone: result.phone },
        });
        return;
      }

      const otp = await api.modules.auth.sendOtp(result.phone);
      setOtpDevHint(otp.devHint ?? '');

      router.push({
        pathname: '/login-email-code',
        params: {
          method: 'phone',
          email: '',
          phone: result.phone,
        },
      });
    } catch (error) {
      Alert.alert('Erro', getErrorMessage(error, 'Não foi possível continuar. Tente novamente.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={require('@/assets/images/auth/logo.png')}
              style={styles.logo}
              contentFit="contain"
              accessibilityLabel="Otto"
            />

            <View style={styles.form}>
              <Animated.View
                key={method}
                entering={hasSwitchedMethod ? enteringForMethod(method) : undefined}
                exiting={exitingForMethod(method)}
                style={styles.switchingFields}
              >
                <Text style={styles.title}>
                  {method === 'email' ? 'Comece com seu E-mail' : 'Comece com seu telefone'}
                </Text>

                {method === 'email' ? (
                  <TextField
                    label="Seu melhor E-mail"
                    placeholder="Seu melhor email"
                    value={email}
                    onChangeText={setEmailLocal}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    textContentType="emailAddress"
                    returnKeyType="done"
                  />
                ) : (
                  <PhoneField value={phone} onChangeText={setPhoneLocal} />
                )}
              </Animated.View>

              <Button
                label="Continuar"
                variant="filled"
                disabled={!canContinue}
                loading={loading}
                onPress={handleContinue}
              />
            </View>

            <ContentDivider />

            <View style={styles.socialActions}>
              <Button
                label="Continuar com Apple"
                variant="stroke"
                leftIcon={<AppleIcon size={16} />}
                onPress={() => {
                  // Backend wiring comes later
                }}
              />
              <Button
                label="Continuar com Google"
                variant="stroke"
                leftIcon={<GoogleIcon size={16} />}
                onPress={() => {
                  // Backend wiring comes later
                }}
              />
              <Animated.View
                key={method}
                entering={hasSwitchedMethod ? enteringForMethod(method) : undefined}
                exiting={exitingForMethod(method)}
                style={styles.switchingAction}
              >
                {method === 'email' ? (
                  <Button
                    label="Logar com seu telefone"
                    variant="stroke"
                    leftIcon={<PhoneIcon size={16} />}
                    onPress={() => switchMethod('phone')}
                  />
                ) : (
                  <Button
                    label="Logar com seu E-mail"
                    variant="stroke"
                    leftIcon={<EmailIcon size={16} />}
                    onPress={() => switchMethod('email')}
                  />
                )}
              </Animated.View>
            </View>

            <View style={styles.terms}>
              <Text style={styles.termsText}>Ao continuar você concorda com os</Text>
              <Pressable
                accessibilityRole="link"
                onPress={() => {
                  // Terms link comes later
                }}
              >
                <Text style={styles.termsLink}>Termos de uso</Text>
              </Pressable>
            </View>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
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
  switchingFields: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 24,
  },
  switchingAction: {
    alignSelf: 'stretch',
  },
  title: {
    ...OttoTypography.h3,
    color: OttoColors.text,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  socialActions: {
    alignSelf: 'stretch',
    gap: 15,
  },
  terms: {
    alignItems: 'center',
    gap: 2,
    maxWidth: 301,
  },
  termsText: {
    ...OttoTypography.body,
    color: OttoColors.textSoft,
    textAlign: 'center',
  },
  termsLink: {
    ...OttoTypography.body,
    color: OttoColors.text,
    textDecorationLine: 'underline',
  },
});
