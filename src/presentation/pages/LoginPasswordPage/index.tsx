import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
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

import { getErrorMessage } from '@/infra/http/get-error-message';
import {
  isValidEmail,
  paramString,
  parseAuthMethod,
} from '@/presentation/auth/auth-flow';
import { useAuthDraft } from '@/presentation/auth/auth-draft-context';
import { useAuthSession } from '@/presentation/auth/auth-session-context';
import { Button } from '@/presentation/components/ui/button';
import { PasswordField } from '@/presentation/components/ui/password-field';
import { formatBrazilPhoneDisplay } from '@/presentation/components/ui/phone-field';
import { TextField } from '@/presentation/components/ui/text-field';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';
import { useApiService } from '@/presentation/hooks/use-api-service';

export function LoginPasswordPage() {
  const router = useRouter();
  const api = useApiService();
  const { applyAuthResult } = useAuthSession();
  const { draft, setEmail, resetDraft } = useAuthDraft();
  const params = useLocalSearchParams<{
    email?: string;
    phone?: string;
    method?: string;
  }>();
  const method =
    parseAuthMethod(params.method) === 'phone' || Boolean(paramString(params.phone))
      ? 'phone'
      : 'email';
  const emailParam = paramString(params.email) || draft.email;
  const phone = paramString(params.phone) || (method === 'phone' ? draft.phone : '');
  const phoneDisplay = useMemo(() => formatBrazilPhoneDisplay(phone), [phone]);

  const [email, setEmailLocal] = useState(emailParam);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);

  const identifierReady = method === 'phone' ? phone.length >= 10 : isValidEmail(email);
  const canContinue = identifierReady && password.length >= 6;

  async function submitLogin(nextEmail: string, nextPassword: string) {
    if (submittingRef.current || nextPassword.length < 6) {
      return;
    }

    if (method === 'phone') {
      if (phone.length < 10) {
        return;
      }
    } else if (!isValidEmail(nextEmail)) {
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    try {
      const result = await api.modules.auth.login(
        method === 'phone'
          ? { phone, password: nextPassword }
          : { email: nextEmail.trim(), password: nextPassword },
      );
      await applyAuthResult(result);
      resetDraft();
      router.replace('/(tabs)/activities');
    } catch (error) {
      Alert.alert(
        'Erro no login',
        getErrorMessage(error, 'Não foi possível entrar. Tente novamente.'),
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  }

  function looksLikeAutofill(previous: string, next: string) {
    return (
      next.length >= 6 &&
      (previous.length === 0 || next.length - previous.length > 1)
    );
  }

  function handleEmailChange(value: string) {
    const previous = email;
    setEmailLocal(value);
    setEmail(value.trim());
    if (looksLikeAutofill(previous, value) && password.length >= 6) {
      void submitLogin(value, password);
    }
  }

  function handlePasswordChange(value: string) {
    const previous = password;
    setPassword(value);
    if (looksLikeAutofill(previous, value) && identifierReady) {
      void submitLogin(email, value);
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
              <View style={styles.headerCopy}>
                <Text style={styles.title}>Entrar na sua conta</Text>
                <Text style={styles.subtitle}>
                  {method === 'phone'
                    ? 'Use seu telefone e senha'
                    : 'Use seu e-mail e senha'}
                </Text>
              </View>

              <View style={styles.fields}>
                {method === 'phone' ? (
                  <TextField
                    label="Telefone"
                    placeholder="Telefone"
                    value={phoneDisplay}
                    editable={false}
                    autoComplete="tel"
                    textContentType="telephoneNumber"
                  />
                ) : (
                  <TextField
                    label="E-mail"
                    placeholder="E-mail"
                    value={email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="username"
                    textContentType="username"
                    importantForAutofill="yes"
                    returnKeyType="next"
                  />
                )}
                <PasswordField
                  label="Senha"
                  placeholder="Senha"
                  value={password}
                  onChangeText={handlePasswordChange}
                  onChange={(event) => {
                    const value = event.nativeEvent.text ?? '';
                    if (value !== password) {
                      handlePasswordChange(value);
                    }
                  }}
                  autoComplete="password"
                  textContentType="password"
                  importantForAutofill="yes"
                  returnKeyType="go"
                  enablesReturnKeyAutomatically
                  onSubmitEditing={() => {
                    void submitLogin(email, password);
                  }}
                />
              </View>

              <Button
                label="Entrar"
                variant="filled"
                disabled={!canContinue}
                loading={loading}
                onPress={() => {
                  void submitLogin(email, password);
                }}
              />
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
  fields: {
    alignSelf: 'stretch',
    gap: 16,
  },
});
