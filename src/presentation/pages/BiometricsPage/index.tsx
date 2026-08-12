import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  DEFAULT_PREFERENCES,
  getPreferences,
  savePreferences,
} from '@/infra/preferences/preferences-store';
import {
  authenticateWithBiometrics,
  getBiometricCapability,
  type BiometricCapability,
} from '@/presentation/biometrics/biometric-capability';
import { BackButton } from '@/presentation/components/ui/back-button';
import {
  BiometricsFaceIcon,
  BiometricsFingerprintIcon,
} from '@/presentation/components/ui/biometrics-icons';
import { OttoColors, OttoFonts, OttoTypography } from '@/presentation/constants/theme';

export function BiometricsPage() {
  const [enabled, setEnabled] = useState(
    DEFAULT_PREFERENCES.biometricsEnabled,
  );
  const [capability, setCapability] = useState<BiometricCapability | null>(
    null,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [stored, bio] = await Promise.all([
        getPreferences(),
        getBiometricCapability(),
      ]);
      if (cancelled) {
        return;
      }
      setEnabled(stored.biometricsEnabled);
      setCapability(bio);
      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (nextEnabled: boolean) => {
    setEnabled(nextEnabled);
    const current = await getPreferences();
    await savePreferences({
      ...current,
      biometricsEnabled: nextEnabled,
    });
  }, []);

  async function handleToggle(value: boolean) {
    if (!value) {
      await persist(false);
      return;
    }

    if (capability && !capability.hardwareAvailable) {
      Alert.alert(
        'Biometria indisponível',
        'Este dispositivo não possui hardware biométrico disponível.',
      );
      return;
    }

    if (capability && !capability.enrolled) {
      Alert.alert(
        'Biometria não configurada',
        `Configure ${capability.label} nas ajustes do sistema para usar no Otto.`,
      );
      return;
    }

    try {
      const result = await authenticateWithBiometrics(
        'Confirme para habilitar a biometria no Otto',
      );

      if (!result.success) {
        return;
      }

      await persist(true);
    } catch {
      // Web / unsupported environments — still allow storing preference.
      await persist(true);
    }
  }

  const subtitle =
    capability?.subtitle ?? 'Configure como a biometria é usada no Otto';
  const toggleTitle = capability?.toggleTitle ?? 'Habilitar Biometria';
  const toggleDescription =
    capability?.toggleDescription ??
    'Use a biometria para entrar no app sem digitar a senha';

  const icon =
    capability?.kind === 'fingerprint' ? (
      <BiometricsFingerprintIcon size={20} color={OttoColors.textMid} />
    ) : (
      <BiometricsFaceIcon size={20} color={OttoColors.textMid} />
    );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BackButton />

        <View style={styles.headerCopy}>
          <Text style={styles.title}>Biometria</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View
          style={[
            styles.row,
            enabled && styles.rowActive,
            !ready && styles.rowLoading,
          ]}
        >
          <View style={styles.iconWrap}>{icon}</View>
          <View style={styles.rowCopy}>
            <Text style={styles.rowTitle}>{toggleTitle}</Text>
            <Text style={styles.rowDescription}>{toggleDescription}</Text>
          </View>
          <Switch
            value={enabled}
            onValueChange={handleToggle}
            trackColor={{
              false: OttoColors.borderStrong,
              true: OttoColors.primary,
            }}
            thumbColor={OttoColors.text}
            ios_backgroundColor={OttoColors.borderStrong}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: OttoColors.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
    gap: 24,
  },
  headerCopy: {
    gap: 4,
  },
  title: {
    ...OttoTypography.h1,
    color: OttoColors.text,
  },
  subtitle: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
  },
  rowActive: {
    backgroundColor: OttoColors.surface,
  },
  rowLoading: {
    opacity: 0.7,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: OttoColors.neutralBlackSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCopy: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: OttoFonts.semiBold,
    fontSize: 16,
    lineHeight: 26,
    color: OttoColors.text,
  },
  rowDescription: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
  },
});
