import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
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

import { getAuthStep, paramString } from '@/presentation/auth/auth-flow';
import { Button } from '@/presentation/components/ui/button';
import { getPhoneDigits, PhoneField } from '@/presentation/components/ui/phone-field';
import { StepGroup } from '@/presentation/components/ui/step-group';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';

function getUsernameFromEmail(email?: string) {
  if (!email) {
    return 'usuário';
  }

  const localPart = email.split('@')[0]?.trim();
  return localPart || 'usuário';
}

export function LoginEmailWhatsAppPage() {
  const router = useRouter();
  const { email: emailParam } = useLocalSearchParams<{
    email?: string;
    method?: string;
  }>();
  const email = paramString(emailParam);
  const [phone, setPhone] = useState('');
  const step = getAuthStep('email', 'phone');

  const username = useMemo(() => getUsernameFromEmail(email), [email]);
  const canContinue = getPhoneDigits(phone).length >= 10;

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <StepGroup total={step.total} current={step.current} style={styles.steps} />

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
                <Text style={styles.title}>Boas-vindas, {username}!</Text>
                <Text style={styles.subtitle}>Qual seu número de WhatsApp?</Text>
              </View>

              <PhoneField value={phone} onChangeText={setPhone} />

              <Button
                label="Continuar"
                variant="filled"
                disabled={!canContinue}
                onPress={() => {
                  router.push({
                    pathname: '/login-email-code',
                    params: {
                      method: 'email',
                      email,
                      phone: getPhoneDigits(phone),
                    },
                  });
                }}
              />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Já tem uma conta?</Text>
              <Pressable accessibilityRole="link" onPress={() => router.back()}>
                <Text style={styles.footerLink}>Fazer login</Text>
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  footerText: {
    ...OttoTypography.body,
    color: OttoColors.textSoft,
  },
  footerLink: {
    ...OttoTypography.body,
    color: OttoColors.text,
    textDecorationLine: 'underline',
  },
});
