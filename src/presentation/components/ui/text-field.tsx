import { useState, type ReactNode } from 'react';
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
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  trailing?: ReactNode;
};

export function TextField({
  label,
  value,
  placeholder,
  error,
  containerStyle,
  trailing,
  onFocus,
  onBlur,
  style,
  placeholderTextColor = OttoColors.textSoft,
  ...rest
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value && String(value).length > 0);
  const showFloatingLabel = focused || hasValue;
  const hasError = Boolean(error);

  return (
    <View style={[styles.container, containerStyle]}>
      {showFloatingLabel ? (
        <View style={styles.labelRow} pointerEvents="none">
          <View style={styles.labelBackground}>
            <Text style={[styles.floatingLabel, hasError && styles.floatingLabelError]}>
              {label}
            </Text>
          </View>
        </View>
      ) : null}

      <View
        style={[
          styles.inputShell,
          showFloatingLabel ? styles.inputShellActive : styles.inputShellIdle,
          hasError && styles.inputShellError,
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
        {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
      </View>

      {hasError ? <Text style={styles.errorHint}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    position: 'relative',
    gap: 10,
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
  floatingLabelError: {
    color: OttoColors.errorSoft,
  },
  inputShell: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  inputShellIdle: {
    borderColor: OttoColors.borderSoft,
  },
  inputShellActive: {
    borderColor: OttoColors.borderStrong,
  },
  inputShellError: {
    borderColor: OttoColors.error,
  },
  input: {
    ...OttoTypography.body,
    color: OttoColors.text,
    padding: 0,
    margin: 0,
    flex: 1,
  },
  trailing: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorHint: {
    ...OttoTypography.caption,
    color: OttoColors.errorSoft,
  },
});
