import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  DEFAULT_AVATARS,
  type IAvatarOption,
} from "@/presentation/constants/avatars";
import { OttoColors, OttoTypography } from "@/presentation/constants/theme";

import { CloseIcon, RefreshIcon } from "./auth-icons";
import { Button } from "./button";

const SHEET_RADIUS = 24;
const PREVIEW_SIZE = 112;
const GRID_ITEM_SIZE = 80;
const ANIM_MS = 280;

export interface IAvatarPickerSheetProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (avatar: IAvatarOption) => void;
  /** Currently applied avatar id (opens sheet with this selected) */
  selectedId?: string;
  /** Override preset list — defaults to DEFAULT_AVATARS */
  avatars?: IAvatarOption[];
}

export function AvatarPickerSheet({
  visible,
  onClose,
  onConfirm,
  selectedId,
  avatars = DEFAULT_AVATARS,
}: IAvatarPickerSheetProps) {
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);
  const [mounted, setMounted] = useState(visible);
  const [draftId, setDraftId] = useState(
    selectedId && avatars.some((a) => a.id === selectedId)
      ? selectedId
      : avatars[0]?.id,
  );

  const draft = avatars.find((avatar) => avatar.id === draftId) ?? avatars[0];

  useEffect(() => {
    if (visible) {
      setMounted(true);
      const nextId =
        selectedId && avatars.some((a) => a.id === selectedId)
          ? selectedId
          : avatars[0]?.id;
      setDraftId(nextId);
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
  }, [visible, selectedId, avatars, progress]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.55,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - progress.value) * 420 }],
  }));

  function handleCyclePreview() {
    if (avatars.length < 2) {
      return;
    }

    const index = avatars.findIndex((avatar) => avatar.id === draftId);
    const next = avatars[(index + 1) % avatars.length];
    setDraftId(next.id);
  }

  function handleConfirm() {
    if (!draft) {
      return;
    }

    onConfirm(draft);
    onClose();
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
            <View style={styles.headerCopy}>
              <Text style={styles.title}>Escolher Avatar</Text>
              <Text style={styles.subtitle}>
                Selecione um avatar para o seu perfil
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fechar"
              hitSlop={12}
              style={styles.closeButton}
              onPress={onClose}
            >
              <CloseIcon size={20} color={OttoColors.text} />
            </Pressable>
          </View>

          <View style={styles.previewWrap}>
            <Image
              source={draft?.source}
              style={styles.preview}
              contentFit="cover"
              accessibilityLabel="Avatar selecionado"
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Próximo avatar"
              style={styles.previewAction}
              onPress={handleCyclePreview}
            >
              <RefreshIcon size={12} color={OttoColors.buttonFilledText} />
            </Pressable>
          </View>

          <View style={styles.grid}>
            {avatars.map((avatar) => {
              const isSelected = avatar.id === draftId;

              return (
                <Pressable
                  key={avatar.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={`Avatar ${avatar.id}`}
                  style={[
                    styles.gridItem,
                    isSelected && styles.gridItemSelected,
                  ]}
                  onPress={() => setDraftId(avatar.id)}
                >
                  <Image
                    source={avatar.source}
                    style={styles.gridImage}
                    contentFit="cover"
                  />
                </Pressable>
              );
            })}
          </View>

          <Button label="Definir" variant="filled" onPress={handleConfirm} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#000000",
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
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  title: {
    ...OttoTypography.h3,
    color: OttoColors.text,
  },
  subtitle: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -4,
  },
  previewWrap: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    alignSelf: "center",
    position: "relative",
  },
  preview: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    borderRadius: PREVIEW_SIZE / 2,
    backgroundColor: OttoColors.borderStrong,
  },
  previewAction: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: OttoColors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  gridItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE,
    borderRadius: GRID_ITEM_SIZE / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: OttoColors.neutralBlackSoft,
  },
  gridItemSelected: {
    borderWidth: 2,
    borderColor: OttoColors.text,
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
});
