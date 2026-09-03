import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

export function LoginEmailPage() {
  const router = useRouter();
  const api = useApiService();
  const { setMethod, setEmail, setPhone, setOtpDevHint } = useAuthDraft();
  const [method, setMethodLocal] = useState<AuthMethod>('email');
  const [email, setEmailLocal] = useState('');
  const [phone, setPhoneLocal] = useState('');
  const [loading, setLoading] = useState(false);

  const canContinue =
    method === 'email'
      ? isValidEmail(email)
      : getPhoneDigits(phone).length >= 10;

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
              {method === 'email' ? (
                <Button
                  label="Logar com seu telefone"
                  variant="stroke"
                  leftIcon={<PhoneIcon size={16} />}
                  onPress={() => {
                    setMethodLocal('phone');
                    setMethod('phone');
                  }}
                />
              ) : (
                <Button
                  label="Logar com seu E-mail"
                  variant="stroke"
                  leftIcon={<EmailIcon size={16} />}
                  onPress={() => {
                    setMethodLocal('email');
                    setMethod('email');
                  }}
                />
              )}
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
