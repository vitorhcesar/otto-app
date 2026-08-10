import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
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
} from '@/presentation/auth/auth-flow';
import { useAuthDraft } from '@/presentation/auth/auth-draft-context';
import { useAuthSession } from '@/presentation/auth/auth-session-context';
import { Button } from '@/presentation/components/ui/button';
import { PasswordField } from '@/presentation/components/ui/password-field';
import { TextField } from '@/presentation/components/ui/text-field';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';
import { useApiService } from '@/presentation/hooks/use-api-service';

export function LoginPasswordPage() {
  const router = useRouter();
  const api = useApiService();
  const { applyAuthResult } = useAuthSession();
  const { draft, setEmail, resetDraft } = useAuthDraft();
  const params = useLocalSearchParams<{ email?: string }>();
  const emailParam = paramString(params.email) || draft.email;

  const [email, setEmailLocal] = useState(emailParam);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const canContinue = isValidEmail(email) && password.length >= 6;

  async function handleLogin() {
    if (!canContinue || loading) {
      return;
    }

    setLoading(true);
    try {
      const result = await api.modules.auth.login(email.trim(), password);
      await applyAuthResult(result);
      resetDraft();
      router.replace('/(tabs)/activities');
    } catch (error) {
      Alert.alert(
        'Erro no login',
        getErrorMessage(error, 'Não foi possível entrar. Tente novamente.'),
      );
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
              <View style={styles.headerCopy}>
                <Text style={styles.title}>Entrar na sua conta</Text>
                <Text style={styles.subtitle}>Use seu e-mail e senha</Text>
              </View>

              <View style={styles.fields}>
                <TextField
                  label="E-mail"
                  placeholder="E-mail"
                  value={email}
                  onChangeText={(value) => {
                    setEmailLocal(value);
                    setEmail(value.trim());
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                />
                <PasswordField
                  label="Senha"
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  autoComplete="password"
                  returnKeyType="done"
                />
              </View>

              <Button
                label="Entrar"
                variant="filled"
                disabled={!canContinue}
                loading={loading}
                onPress={handleLogin}
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
