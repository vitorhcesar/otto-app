import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AvatarPickerSheet } from '@/presentation/components/ui/avatar-picker-sheet';
import { RefreshIcon } from '@/presentation/components/ui/auth-icons';
import {
  DEFAULT_AVATARS,
  type IAvatarOption,
} from '@/presentation/constants/avatars';
import { OttoColors } from '@/presentation/constants/theme';

const ACTION_SIZE = 28;

export type ProfileAvatarControlProps = {
  avatar: IAvatarOption;
  onChange: (avatar: IAvatarOption) => void;
  size?: number;
  avatars?: IAvatarOption[];
};

/** Avatar + refresh badge + picker sheet — same control used in auth onboarding. */
export function ProfileAvatarControl({
  avatar,
  onChange,
  size = 112,
  avatars = DEFAULT_AVATARS,
}: ProfileAvatarControlProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <View style={{ width: size, height: size }}>
        <Image
          source={avatar.source}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: OttoColors.borderStrong,
          }}
          contentFit="cover"
          accessibilityLabel="Foto de perfil"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Trocar foto de perfil"
          style={styles.avatarAction}
          onPress={() => setPickerOpen(true)}
        >
          <RefreshIcon size={12} color={OttoColors.buttonFilledText} />
        </Pressable>
      </View>

      <AvatarPickerSheet
        visible={pickerOpen}
        selectedId={avatar.id}
        avatars={avatars}
        onClose={() => setPickerOpen(false)}
        onConfirm={onChange}
      />
    </>
  );
}

const styles = StyleSheet.create({
  avatarAction: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: ACTION_SIZE,
    height: ACTION_SIZE,
    borderRadius: ACTION_SIZE / 2,
    backgroundColor: OttoColors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
