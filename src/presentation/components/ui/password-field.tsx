import { useState } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { EyeClosedIcon, EyeOpenIcon } from '@/presentation/components/ui/eye-icons';
import { TextField, type TextFieldProps } from '@/presentation/components/ui/text-field';

export type PasswordFieldProps = Omit<TextFieldProps, 'secureTextEntry'> & {
  containerStyle?: StyleProp<ViewStyle>;
  /** When true, starts with the open-eye (visible) state — Figma confirm field idle */
  defaultVisible?: boolean;
  /** When false, hides the visibility toggle. Custom `trailing` still renders. */
  showToggle?: boolean;
};

export function PasswordField({
  defaultVisible = false,
  showToggle = true,
  trailing,
  ...rest
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(defaultVisible);

  const toggle = showToggle ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
      hitSlop={8}
      onPress={() => setVisible((current) => !current)}>
      {visible ? <EyeOpenIcon size={16} /> : <EyeClosedIcon size={16} />}
    </Pressable>
  ) : null;

  return (
    <TextField
      autoCapitalize="none"
      autoCorrect={false}
      textContentType="password"
      {...rest}
      secureTextEntry={!visible}
      trailing={trailing ?? toggle}
    />
  );
}
