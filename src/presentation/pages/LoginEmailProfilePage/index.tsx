import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/presentation/components/ui/button';
import { PasswordField } from '@/presentation/components/ui/password-field';
import { StepGroup } from '@/presentation/components/ui/step-group';
import { TextField } from '@/presentation/components/ui/text-field';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function LoginEmailProfilePage() {
  const router = useRouter();
  const { email: emailParam, phone } = useLocalSearchParams<{
    email?: string;
    phone?: string;
  }>();
  const [email, setEmail] = useState(typeof emailParam === 'string' ? emailParam : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canContinue =
    isValidEmail(email) &&
    password.length >= MIN_PASSWORD_LENGTH &&
    passwordsMatch;

  function handleContinue() {
    if (!canContinue) {
      return;
    }

    router.push({
      pathname: '/login-email-data',
      params: {
        email: email.trim(),
        phone: typeof phone === 'string' ? phone : '',
      },
    });
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <StepGroup total={5} current={3} style={styles.steps} />

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
                <Text style={styles.title}>Comece por aqui</Text>
                <Text style={styles.subtitle}>Só mais alguns dados e você está dentro</Text>
              </View>

              <View style={styles.fields}>
                <TextField
                  label="Digite seu E-mail"
                  placeholder="Digite seu E-mail"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                />
                <PasswordField
                  label="Digite sua senha"
                  placeholder="Digite sua senha"
                  value={password}
                  onChangeText={setPassword}
                  autoComplete="new-password"
                  returnKeyType="next"
                />
                <PasswordField
                  label="Confirmar senha"
                  placeholder="Confirmar senha"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  autoComplete="new-password"
                  returnKeyType="done"
                  defaultVisible
                />
              </View>

              <Button
                label="Continuar"
                variant="filled"
                disabled={!canContinue}
                onPress={handleContinue}
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
  fields: {
    alignSelf: 'stretch',
    gap: 16,
  },
});
