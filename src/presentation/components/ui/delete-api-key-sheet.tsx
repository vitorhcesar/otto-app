import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/presentation/components/ui/button';
import { Sheet } from '@/presentation/components/ui/sheet';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';

export type DeleteApiKeySheetProps = {
  visible: boolean;
  keyName?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteApiKeySheet({
  visible,
  loading = false,
  onClose,
  onConfirm,
}: DeleteApiKeySheetProps) {
  return (
    <Sheet visible={visible} onClose={onClose} title="Excluir chave">
      <Text style={styles.message}>
        Tem certeza que deseja excluir esta chave de API? Esta ação não pode
        ser desfeita.
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
