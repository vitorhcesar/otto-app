import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/presentation/components/ui/button';
import { Sheet } from '@/presentation/components/ui/sheet';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';

export type DeleteAccountSheetProps = {
  visible: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteAccountSheet({
  visible,
  loading = false,
  onClose,
  onConfirm,
}: DeleteAccountSheetProps) {
  return (
    <Sheet visible={visible} onClose={onClose} title="Excluir conta">
      <Text style={styles.message}>
        Isso apaga sua conta, perfil, sessões e dados associados. Esta ação não
        pode ser desfeita.
      </Text>

      <View style={styles.actions}>
        <Button
          label="Cancelar"
          variant="stroke"
          style={styles.actionButton}
          disabled={loading}
          onPress={onClose}
        />
        <Button
          label="Excluir"
          variant="danger"
          style={styles.actionButton}
          loading={loading}
          onPress={onConfirm}
        />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  message: {
    ...OttoTypography.bodySmall,
    color: OttoColors.textSoft,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
