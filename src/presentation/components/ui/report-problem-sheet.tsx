import { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getErrorMessage } from '@/infra/http/get-error-message';
import { PROBLEM_REPORT_MAX_LENGTH } from '@/infra/http/services/api/modules/support.module';
import { CloseIcon } from '@/presentation/components/ui/auth-icons';
import { Button } from '@/presentation/components/ui/button';
import { OttoColors, OttoTypography } from '@/presentation/constants/theme';
import { useApiService } from '@/presentation/hooks/use-api-service';

const SHEET_RADIUS = 24;
const ANIM_MS = 280;

export type ReportProblemSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
};

export function ReportProblemSheet({
  visible,
  onClose,
  onSubmitted,
}: ReportProblemSheetProps) {
  const api = useApiService();
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);
  const [mounted, setMounted] = useState(visible);
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const trimmed = message.trim();
  const canSubmit = trimmed.length > 0 && !loading;
  const showFloatingLabel = focused || message.length > 0;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      setMessage('');
      setFocused(false);
      progress.value = withTiming(1, {
        duration: ANIM_MS,
        easing: Easing.out(Easing.cubic),
      });
      return;
    }

    progress.value = withTiming(
      0,
      { duration: ANIM_MS, easing: Easing.in(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(setMounted)(false);
        }
      },
    );
  }, [visible, progress]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.55,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - progress.value) * 420 }],
  }));

  async function handleSubmit() {
    if (!canSubmit) {
      return;
    }

    setLoading(true);
    try {
      await api.modules.support.createProblemReport(trimmed);
      onSubmitted?.();
      onClose();
      Alert.alert('Enviado', 'Obrigado pelo seu relato.');
    } catch (error) {
      Alert.alert(
        'Erro',
        getErrorMessage(error, 'Não foi possível enviar o relato. Tente novamente.'),
      );
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.root} pointerEvents="box-none">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Fechar"
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        >
          <Animated.View style={[styles.backdrop, backdropStyle]} />
        </Pressable>

        <Animated.View
          style={[
            styles.sheet,
            { paddingBottom: Math.max(insets.bottom, 16) + 8 },
            sheetStyle,
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Reportar um problema</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fechar"
              hitSlop={12}
              style={styles.closeButton}
              onPress={onClose}
            >
              <CloseIcon size={20} color={OttoColors.primary} />
            </Pressable>
          </View>

          <Text style={styles.disclaimer}>
            Esse não é um canal de comunicação direto com o time de atendimento
            do Otto, você não será respondido ou contatado a partir desse
            formulário
          </Text>

          <View style={styles.fieldWrap}>
            {showFloatingLabel ? (
              <View style={styles.labelRow} pointerEvents="none">
                <View style={styles.labelBackground}>
                  <Text style={styles.floatingLabel}>
                    Por favor, conte-nos mais
                  </Text>
                </View>
              </View>
            ) : null}

            <View
              style={[
                styles.inputShell,
                showFloatingLabel
                  ? styles.inputShellActive
                  : styles.inputShellIdle,
              ]}
            >
              <TextInput
                value={message}
                onChangeText={(text) =>
                  setMessage(text.slice(0, PROBLEM_REPORT_MAX_LENGTH))
                }
                placeholder={
                  showFloatingLabel ? undefined : 'Por favor, conte-nos mais'
                }
                placeholderTextColor={OttoColors.textSoft}
                multiline
                textAlignVertical="top"
                maxLength={PROBLEM_REPORT_MAX_LENGTH}
                style={styles.input}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
              <Text style={styles.counter}>
                {message.length}/{PROBLEM_REPORT_MAX_LENGTH}
              </Text>
            </View>
          </View>

          <Button
            label="Enviar"
            variant="filled"
            loading={loading}
            disabled={!canSubmit}
            onPress={handleSubmit}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000000',
  },
  sheet: {
    backgroundColor: OttoColors.background,
    borderTopLeftRadius: SHEET_RADIUS,
    borderTopRightRadius: SHEET_RADIUS,
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    ...OttoTypography.h3,
    color: OttoColors.text,
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -4,
  },
  disclaimer: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
  },
  fieldWrap: {
    alignSelf: 'stretch',
    position: 'relative',
  },
  labelRow: {
    position: 'absolute',
    top: -8,
    left: 13,
    zIndex: 2,
  },
  labelBackground: {
    backgroundColor: OttoColors.background,
    paddingHorizontal: 4,
  },
  floatingLabel: {
    ...OttoTypography.captionSmall,
    color: OttoColors.text,
  },
  inputShell: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    minHeight: 140,
  },
  inputShellIdle: {
    borderColor: OttoColors.borderSoft,
  },
  inputShellActive: {
    borderColor: OttoColors.borderStrong,
  },
  input: {
    ...OttoTypography.body,
    color: OttoColors.text,
    minHeight: 96,
    padding: 0,
    margin: 0,
  },
  counter: {
    ...OttoTypography.captionSmall,
    color: OttoColors.textSoft,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});
