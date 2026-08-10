import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthSession } from '@/presentation/auth/auth-session-context';
import { Button } from '@/presentation/components/ui/button';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';
import { useAuthDraft } from '@/presentation/auth/auth-draft-context';

export function HomePage() {
  const router = useRouter();
  const { signOut } = useAuthSession();
  const { resetDraft } = useAuthDraft();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await signOut();
      resetDraft();
      router.replace('/');
    } catch {
      Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>Home</Text>
          <Button
            label="Logout"
            variant="stroke"
            loading={loading}
            onPress={handleLogout}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export function HomeLoading() {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator color={OttoColors.primary} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    ...OttoTypography.h3,
    color: OttoColors.text,
  },
});
