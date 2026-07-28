import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
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

import { AppleIcon, GoogleIcon, WhatsAppIcon } from '@/presentation/components/ui/brand-icons';
import { Button } from '@/presentation/components/ui/button';
import { ContentDivider } from '@/presentation/components/ui/content-divider';
import { TextField } from '@/presentation/components/ui/text-field';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function LoginEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const canContinue = isValidEmail(email);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
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
              <Text style={styles.title}>Comece com seu E-mail</Text>

              <TextField
                label="Seu melhor E-mail"
                placeholder="Seu melhor email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="done"
              />

              <Button
                label="Continuar"
                variant="filled"
                disabled={!canContinue}
                onPress={() => {
                  router.push({
                    pathname: '/login-email-whatsapp',
                    params: { email: email.trim() },
                  });
                }}
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
              <Button
                label="Logar com seu WhatsApp"
                variant="stroke"
                leftIcon={<WhatsAppIcon size={16} />}
                onPress={() => {
                  // Backend wiring comes later
                }}
              />
            </View>

            <View style={styles.terms}>
              <Text style={styles.termsText}>Ao continuar você concorda com os</Text>
              <Pressable
                accessibilityRole="link"
                onPress={() => {
                  // Terms link comes later
                }}>
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
