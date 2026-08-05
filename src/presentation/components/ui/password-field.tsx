import { useState } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { EyeClosedIcon, EyeOpenIcon } from '@/presentation/components/ui/eye-icons';
import { TextField, type TextFieldProps } from '@/presentation/components/ui/text-field';

export type PasswordFieldProps = Omit<TextFieldProps, 'secureTextEntry' | 'trailing'> & {
  containerStyle?: StyleProp<ViewStyle>;
  /** When true, starts with the open-eye (visible) state — Figma confirm field idle */
  defaultVisible?: boolean;
};

export function PasswordField({
  defaultVisible = false,
  ...rest
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(defaultVisible);

  return (
    <TextField
      {...rest}
      secureTextEntry={!visible}
      autoCapitalize="none"
      autoCorrect={false}
      textContentType="password"
      trailing={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
          hitSlop={8}
          onPress={() => setVisible((current) => !current)}>
          {visible ? <EyeOpenIcon size={16} /> : <EyeClosedIcon size={16} />}
        </Pressable>
      }
    />
  );
}
