import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { OttoColors, OttoTypography } from '@/presentation/constants/theme';

export type ContentDividerProps = {
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export function ContentDivider({ label = 'Ou', style }: ContentDividerProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: 245,
    alignSelf: 'center',
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: OttoColors.borderStrong,
  },
  label: {
    ...OttoTypography.caption,
    color: OttoColors.textSoft,
  },
});
