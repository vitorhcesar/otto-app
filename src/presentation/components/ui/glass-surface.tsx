import { BlurView } from "expo-blur";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { useId, useState, type ReactNode } from "react";
import {
  Platform,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

import { useBlurTarget } from "@/presentation/blur/blur-target-context";

/**
 * Figma 111:8278 / 111:8279 — Gradient/Navigation Bar Background + Glass.
 *
 * Fill: 17.857% rgba(18,19,17,0.15) → 154.46% rgba(56,122,22,0.15)
 * Glass: frost 35. Sem Stroke no Figma — o filete é a refração do Glass
 * (amostrada no PNG: topo ~rgba(255,255,255,0.28), base ~rgba(214,232,196,0.40)).
 */
const FigmaNavGlass = {
  radius: 40,
  paddingX: 24,
  paddingY: 12,
  frost: 35,
  rimWidth: 1,
} as const;

type GlassSurfaceProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  padded?: boolean;
};

export function GlassSurface({
  children,
  style,
  contentStyle,
  padded = true,
}: GlassSurfaceProps) {
  const blurTarget = useBlurTarget();
  const useLiquidGlass = isLiquidGlassAvailable();
  const canBlurAndroid = Platform.OS === "android" && blurTarget != null;
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== size.width || height !== size.height) {
      setSize({ width, height });
    }
  };

  const shape: StyleProp<ViewStyle> = [
    StyleSheet.absoluteFill,
    styles.glassShape,
  ];

  return (
    <View style={[styles.base, style]} onLayout={onLayout}>
      {useLiquidGlass ? (
        <GlassView
          pointerEvents="none"
          style={shape}
          glassEffectStyle="clear"
          colorScheme="dark"
        />
      ) : canBlurAndroid ? (
        <BlurView
          pointerEvents="none"
          blurTarget={blurTarget}
          blurMethod="dimezisBlurView"
          blurReductionFactor={1}
          intensity={FigmaNavGlass.frost}
          tint="dark"
          style={shape}
        />
      ) : Platform.OS === "ios" ? (
        <BlurView
          pointerEvents="none"
          intensity={FigmaNavGlass.frost}
          tint="dark"
          style={shape}
        />
      ) : (
        <View pointerEvents="none" style={[shape, styles.fallback]} />
      )}

      {size.width > 0 ? (
        <FigmaGlassChrome width={size.width} height={size.height} />
      ) : null}

      <View
        style={[styles.content, padded ? styles.padded : null, contentStyle]}
      >
        {children}
      </View>
    </View>
  );
}

function FigmaGlassChrome({ width, height }: { width: number; height: number }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const fillId = `fill${uid}`;
  const rimId = `rim${uid}`;
  const radius = Math.min(FigmaNavGlass.radius, height / 2);
  const stroke = FigmaNavGlass.rimWidth;
  const inset = stroke / 2;

  return (
    <Svg
      pointerEvents="none"
      width={width}
      height={height}
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        <LinearGradient id={fillId} x1="0" y1="0.17857" x2="0" y2="1.5446">
          <Stop offset="0" stopColor="rgb(18,19,17)" stopOpacity={0.15} />
          <Stop offset="1" stopColor="rgb(56,122,22)" stopOpacity={0.15} />
        </LinearGradient>
        <LinearGradient id={rimId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="rgb(255,255,255)" stopOpacity={0.28} />
          <Stop offset="0.18" stopColor="rgb(232,237,228)" stopOpacity={0.08} />
          <Stop offset="0.5" stopColor="rgb(212,224,204)" stopOpacity={0.14} />
          <Stop offset="0.82" stopColor="rgb(212,232,200)" stopOpacity={0.1} />
          <Stop offset="1" stopColor="rgb(214,232,196)" stopOpacity={0.4} />
        </LinearGradient>
      </Defs>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={radius}
        fill={`url(#${fillId})`}
      />
      <Rect
        x={inset}
        y={inset}
        width={width - stroke}
        height={height - stroke}
        rx={Math.max(0, radius - inset)}
        fill="none"
        stroke={`url(#${rimId})`}
        strokeWidth={stroke}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
    borderRadius: FigmaNavGlass.radius,
    backgroundColor: "transparent",
  },
  glassShape: {
    borderRadius: FigmaNavGlass.radius,
  },
  fallback: {
    backgroundColor: "rgba(13,17,11,0.82)",
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
  padded: {
    paddingHorizontal: FigmaNavGlass.paddingX,
    paddingVertical: FigmaNavGlass.paddingY,
  },
});
