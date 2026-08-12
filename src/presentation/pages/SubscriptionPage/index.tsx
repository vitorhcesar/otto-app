import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/presentation/components/ui/back-button';
import { Button } from '@/presentation/components/ui/button';
import { GhostIcon } from '@/presentation/components/ui/subscription-icons';
import { OttoColors, OttoFonts, OttoTypography } from '@/presentation/constants/theme';

export function SubscriptionPage() {
  function handleSubscribe() {
    Alert.alert('Assinar', 'Em breve.');
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BackButton />

        <View style={styles.headerCopy}>
          <Text style={styles.title}>Assinatura</Text>
          <Text style={styles.subtitle}>Acompanhe todas as suas assinaturas</Text>
        </View>

        <View style={styles.empty}>
          <GhostIcon size={20} color={OttoColors.textSoft} />

          <View style={styles.emptyCopy}>
            <Text style={styles.emptyTitle}>Sem assinatura ativa</Text>
            <Text style={styles.emptySubtitle}>
              Assine o Otto Premium ou Pro para desbloquear mais funcionalidades
            </Text>
          </View>

          <Button label="Assinar" variant="filled" onPress={handleSubscribe} />
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
  empty: {
    marginTop: 40,
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 16,
  },
  emptyCopy: {
    gap: 4,
    alignItems: 'center',
    maxWidth: 280,
  },
  emptyTitle: {
    ...OttoTypography.bodySmall,
    fontFamily: OttoFonts.semiBold,
    color: OttoColors.text,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
    textAlign: 'center',
  },
});
