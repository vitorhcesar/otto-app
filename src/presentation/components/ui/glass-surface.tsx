import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { useId, type ReactNode } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { useBlurTarget } from '@/presentation/blur/blur-target-context';

type GlassSurfaceProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  tint?: 'nav' | 'neutral';
};

/**
 * Figma "Bottom Navigation Glass" (pill):
 * blur radius 35 + fill gradient from rgba(18,19,17,0.15) toward a faint olive.
 * The green stop in Figma sits past 100%, so the capsule stays dark — never a green fill.
 *
 * Outer View owns overflow + radius so iOS GlassView cannot leak the tab glow
 * (native glass views often ignore overflow:hidden on themselves).
 */
export function GlassSurface({
  children,
  style,
  contentStyle,
  tint = 'nav',
}: GlassSurfaceProps) {
  const blurTarget = useBlurTarget();
  const borderColor =
    tint === 'nav' ? 'rgba(245,245,244,0.14)' : 'rgba(245,245,244,0.08)';
  const useLiquidGlass = isLiquidGlassAvailable();
  const canBlurAndroid = Platform.OS === 'android' && blurTarget != null;

  return (
    <View style={[styles.base, { borderColor }, style]}>
      {useLiquidGlass ? (
        <GlassView
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          glassEffectStyle="regular"
          colorScheme="dark"
          tintColor="rgba(18,19,17,0.28)"
        />
      ) : canBlurAndroid ? (
        <BlurView
          pointerEvents="none"
          blurTarget={blurTarget}
          blurMethod="dimezisBlurView"
          intensity={55}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
      ) : Platform.OS === 'ios' ? (
        <BlurView
          pointerEvents="none"
          intensity={40}
          tint="systemThinMaterialDark"
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.androidOpaqueFallback]}
        />
      )}

      {useLiquidGlass ? null : (
        <View pointerEvents="none" style={styles.darkScrim} />
      )}
      <FigmaNavFill />
      <View pointerEvents="none" style={styles.specular} />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

function FigmaNavFill() {
  const rawId = useId();
  const gradientId = `navFill${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0.17857" stopColor="#121311" stopOpacity={0.15} />
            <Stop offset="1" stopColor="#295114" stopOpacity={0.15} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${gradientId})`} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth + 0.35,
    backgroundColor: 'rgba(18,19,17,0.22)',
  },
  androidOpaqueFallback: {
    backgroundColor: 'rgba(18,19,17,0.78)',
  },
  darkScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18,19,17,0.28)',
  },
  specular: {
    position: 'absolute',
    top: 0,
    left: 14,
    right: 14,
    height: '36%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'rgba(245,245,244,0.05)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
