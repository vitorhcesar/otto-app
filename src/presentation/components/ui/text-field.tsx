import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { OttoColors, OttoTypography } from '@/presentation/constants/theme';

export type TextFieldProps = TextInputProps & {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function TextField({
  label,
  value,
  placeholder,
  containerStyle,
  onFocus,
  onBlur,
  style,
  placeholderTextColor = OttoColors.textSoft,
  ...rest
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value && String(value).length > 0);
  const showFloatingLabel = focused || hasValue;

  return (
    <View style={[styles.container, containerStyle]}>
      {showFloatingLabel ? (
        <View style={styles.labelRow} pointerEvents="none">
          <View style={styles.labelBackground}>
            <Text style={styles.floatingLabel}>{label}</Text>
          </View>
        </View>
      ) : null}

      <View
        style={[
          styles.inputShell,
          showFloatingLabel ? styles.inputShellActive : styles.inputShellIdle,
        ]}>
        <TextInput
          value={value}
          placeholder={showFloatingLabel ? undefined : (placeholder ?? label)}
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, style]}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    paddingVertical: 10,
    minHeight: 46,
    justifyContent: 'center',
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
    padding: 0,
    margin: 0,
  },
});
