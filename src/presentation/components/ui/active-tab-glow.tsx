import { Image } from 'expo-image';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

type ActiveTabGlowProps = {
  style?: StyleProp<ViewStyle>;
};

/**
 * Figma Group 1321314374 on Bottom Navigation Bar:
 * 44×44 at bottom -13px, glow artwork inset -55% (92.4px), clipped by the pill.
 */
export function ActiveTabGlow({ style }: ActiveTabGlowProps) {
  return (
    <View style={[styles.anchor, style]} pointerEvents="none">
      <Image
        source={require('@/assets/images/tabs/active-glow.png')}
        style={styles.glow}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  anchor: {
    position: 'absolute',
    width: 44,
    height: 44,
    bottom: -13,
    left: '50%',
    marginLeft: -22,
    zIndex: 0,
  },
  glow: {
    position: 'absolute',
    width: 92,
    height: 92,
    left: -24,
    top: -24,
    opacity: 0.95,
  },
});
