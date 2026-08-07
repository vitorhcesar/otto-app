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

import { type AuthMethod, isValidEmail } from '@/presentation/auth/auth-flow';
import {
  AppleIcon,
  EmailIcon,
  GoogleIcon,
  WhatsAppIcon,
} from '@/presentation/components/ui/brand-icons';
import { Button } from '@/presentation/components/ui/button';
import { ContentDivider } from '@/presentation/components/ui/content-divider';
import { getPhoneDigits, PhoneField } from '@/presentation/components/ui/phone-field';
import { TextField } from '@/presentation/components/ui/text-field';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';

export function LoginEmailPage() {
  const router = useRouter();
  const [method, setMethod] = useState<AuthMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const canContinue =
    method === 'email'
      ? isValidEmail(email)
      : getPhoneDigits(phone).length >= 10;

  function handleContinue() {
    if (!canContinue) {
      return;
    }

    if (method === 'email') {
      router.push({
        pathname: '/login-email-whatsapp',
        params: {
          method: 'email',
          email: email.trim(),
        },
      });
      return;
    }

    router.push({
      pathname: '/login-email-code',
      params: {
        method: 'whatsapp',
        email: '',
        phone: getPhoneDigits(phone),
      },
    });
  }

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
              <Text style={styles.title}>
                {method === 'email' ? 'Comece com seu E-mail' : 'Comece com seu WhatsApp'}
              </Text>

              {method === 'email' ? (
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
              ) : (
                <PhoneField value={phone} onChangeText={setPhone} />
              )}

              <Button
                label="Continuar"
                variant="filled"
                disabled={!canContinue}
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
                  label="Logar com seu WhatsApp"
                  variant="stroke"
                  leftIcon={<WhatsAppIcon size={16} />}
                  onPress={() => setMethod('whatsapp')}
                />
              ) : (
                <Button
                  label="Logar com seu E-mail"
                  variant="stroke"
                  leftIcon={<EmailIcon size={16} />}
                  onPress={() => setMethod('email')}
                />
              )}
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
