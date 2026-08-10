import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import type { ReactNode } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useBlurTarget } from '@/presentation/blur/blur-target-context';

type GlassSurfaceProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  /** Soft green border like Otto nav glass */
  tint?: 'nav' | 'neutral';
};

/**
 * Liquid glass when available (iOS 26+).
 * Android: BlurView + blurTarget (SDK 55+ API). Without blurTarget, frosted fallback.
 */
export function GlassSurface({
  children,
  style,
  contentStyle,
  tint = 'nav',
}: GlassSurfaceProps) {
  const blurTarget = useBlurTarget();
  const borderColor =
    tint === 'nav' ? 'rgba(149,255,82,0.22)' : 'rgba(245,245,244,0.08)';
  const overlayColor =
    tint === 'nav' ? 'rgba(18,19,17,0.22)' : 'rgba(18,19,17,0.36)';

  if (isLiquidGlassAvailable()) {
    return (
      <GlassView
        style={[styles.base, { borderColor }, style]}
        glassEffectStyle="regular"
        tintColor="rgba(56,122,22,0.35)"
        colorScheme="dark"
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </GlassView>
    );
  }

  const canBlurAndroid = Platform.OS === 'android' && blurTarget != null;

  return (
    <View style={[styles.base, styles.fallbackShell, { borderColor }, style]}>
      {canBlurAndroid ? (
        <BlurView
          blurTarget={blurTarget}
          blurMethod="dimezisBlurView"
          intensity={95}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
      ) : Platform.OS === 'ios' ? (
        <BlurView intensity={55} tint="dark" style={StyleSheet.absoluteFill} />
      ) : (
        <View
          style={[StyleSheet.absoluteFill, styles.androidOpaqueFallback]}
        />
      )}
      <View
        pointerEvents="none"
        style={[styles.tintOverlay, { backgroundColor: overlayColor }]}
      />
      <View pointerEvents="none" style={styles.glossHighlight} />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth + 0.5,
  },
  fallbackShell: {
    backgroundColor: 'rgba(18,19,17,0.12)',
  },
  androidOpaqueFallback: {
    backgroundColor: 'rgba(18,19,17,0.72)',
  },
  tintOverlay: {
    ...StyleSheet.absoluteFill,
  },
  glossHighlight: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: '42%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'rgba(245,245,244,0.08)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
