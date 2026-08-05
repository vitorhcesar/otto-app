import { Image } from 'expo-image';
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

import { RefreshIcon, ShieldCheckIcon } from '@/presentation/components/ui/auth-icons';
import { Button } from '@/presentation/components/ui/button';
import { StepGroup } from '@/presentation/components/ui/step-group';
import { TextField } from '@/presentation/components/ui/text-field';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';

/** Formats digits as DD/MM/YYYY */
export function formatBirthDate(digits: string) {
  const cleaned = digits.replace(/\D/g, '').slice(0, 8);

  if (cleaned.length <= 2) {
    return cleaned;
  }

  if (cleaned.length <= 4) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  }

  return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
}

/** Formats digits as XXX.XXX.XXX-XX */
export function formatCpf(digits: string) {
  const cleaned = digits.replace(/\D/g, '').slice(0, 11);

  if (cleaned.length <= 3) {
    return cleaned;
  }

  if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  }

  if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  }

  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
}

function isCompleteBirthDate(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 8) {
    return false;
  }

  const day = Number(digits.slice(0, 2));
  const month = Number(digits.slice(2, 4));
  const year = Number(digits.slice(4, 8));

  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900) {
    return false;
  }

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getTime() <= Date.now()
  );
}

function isCompleteCpf(value: string) {
  return value.replace(/\D/g, '').length === 11;
}

export function LoginEmailDataPage() {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');

  const canContinue =
    fullName.trim().length >= 2 &&
    isCompleteBirthDate(birthDate) &&
    isCompleteCpf(cpf);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <StepGroup total={5} current={4} style={styles.steps} />

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.avatarWrap}>
              <Image
                source={require('@/assets/images/auth/avatar-default.png')}
                style={styles.avatar}
                contentFit="cover"
                accessibilityLabel="Foto de perfil"
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Trocar foto de perfil"
                style={styles.avatarAction}
                onPress={() => {
                  // Image picker wiring comes later
                }}>
                <RefreshIcon size={12} color={OttoColors.buttonFilledText} />
              </Pressable>
            </View>

            <View style={styles.form}>
              <View style={styles.headerCopy}>
                <Text style={styles.title}>Seus dados</Text>
                <Text style={styles.subtitle}>Essas informações mantêm sua conta segura</Text>
              </View>

              <View style={styles.fields}>
                <TextField
                  label="Nome completo"
                  placeholder="Nome completo"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoComplete="name"
                  textContentType="name"
                  returnKeyType="next"
                />
                <TextField
                  label="Data de nascimento"
                  placeholder="Data de nascimento"
                  value={birthDate}
                  onChangeText={(text) => setBirthDate(formatBirthDate(text))}
                  keyboardType="number-pad"
                  returnKeyType="next"
                  maxLength={10}
                />
                <TextField
                  label="CPF"
                  placeholder="CPF"
                  value={cpf}
                  onChangeText={(text) => setCpf(formatCpf(text))}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  maxLength={14}
                />
              </View>

              <View style={styles.securityRow}>
                <ShieldCheckIcon size={16} color={OttoColors.primary} />
                <Text style={styles.securityText}>
                  Dados seguros pela LGPD com criptografia
                </Text>
              </View>

              <Button
                label="Criar conta"
                variant="filled"
                disabled={!canContinue}
                onPress={() => {
                  // Backend + Step 5 navigation comes later
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
  avatarWrap: {
    width: 112,
    height: 112,
    position: 'relative',
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: OttoColors.borderStrong,
  },
  avatarAction: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: OttoColors.text,
    alignItems: 'center',
    justifyContent: 'center',
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
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'stretch',
  },
  securityText: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
  },
});
