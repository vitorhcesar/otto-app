import { BlurView } from "expo-blur";
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
 * Tokens from Figma Otto Entregas — AI Assistant Launcher / Bottom Navigation.
 * Print 1: layout + fill. Print 2: Glass effect.
 */
const FigmaNavGlass = {
  radius: 40,
  paddingX: 24,
  paddingY: 12,
  fillFrom: "#121311",
  fillTo: "#387A16",
  fillOpacity: 0.15,
  glass: {
    lightAngle: -149,
    lightIntensity: 0.8,
    refraction: 100,
    depth: 81,
    dispersion: 42,
    frost: 35,
    splay: 100,
  },
} as const;

type GlassSurfaceProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  /** Icon-only circle (perfil) — sem padding 24/12 do Figma */
  padded?: boolean;
};

export function GlassSurface({
  children,
  style,
  contentStyle,
  padded = true,
}: GlassSurfaceProps) {
  const blurTarget = useBlurTarget();
  const canBlurAndroid = Platform.OS === "android" && blurTarget != null;
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== size.width || height !== size.height) {
      setSize({ width, height });
    }
  };

  return (
    <View style={[styles.base, style]} onLayout={onLayout}>
      {canBlurAndroid ? (
        <BlurView
          pointerEvents="none"
          blurTarget={blurTarget}
          blurMethod="dimezisBlurView"
          blurReductionFactor={1}
          intensity={FigmaNavGlass.glass.frost}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
      ) : Platform.OS === "ios" ? (
        <BlurView
          pointerEvents="none"
          intensity={FigmaNavGlass.glass.frost}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.fallback]}
        />
      )}

      {size.width > 0 ? (
        <FigmaGlassLayers width={size.width} height={size.height} />
      ) : null}

      <View
        style={[styles.content, padded ? styles.padded : null, contentStyle]}
      >
        {children}
      </View>
    </View>
  );
}

function FigmaGlassLayers({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const fillId = `fill${rawId}`;
  const rimId = `rim${rawId}`;
  const specId = `spec${rawId}`;
  const depthId = `depth${rawId}`;

  const radius = Math.min(FigmaNavGlass.radius, height / 2);
  const inset = 1.2;
  const light = FigmaNavGlass.glass.lightIntensity;
  const depthAlpha = (FigmaNavGlass.glass.depth / 100) * 0.28;

  return (
    <Svg
      pointerEvents="none"
      width={width}
      height={height}
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        <LinearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={FigmaNavGlass.fillFrom} />
          <Stop offset="1" stopColor={FigmaNavGlass.fillTo} />
        </LinearGradient>
        {/* Luz −149°: highlight no topo-esquerdo */}
        <LinearGradient id={specId} x1="0.12" y1="0" x2="0.88" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity={light * 0.42} />
          <Stop offset="0.28" stopColor="#FFFFFF" stopOpacity={light * 0.1} />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient id={rimId} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity={light * 0.55} />
          <Stop offset="0.38" stopColor="#FFFFFF" stopOpacity={light * 0.16} />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0.04} />
        </LinearGradient>
        <LinearGradient id={depthId} x1="0.5" y1="0.35" x2="0.5" y2="1">
          <Stop offset="0" stopColor="#000000" stopOpacity={0} />
          <Stop offset="1" stopColor="#000000" stopOpacity={depthAlpha} />
        </LinearGradient>
      </Defs>

      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={radius}
        fill={`url(#${fillId})`}
        opacity={FigmaNavGlass.fillOpacity}
      />
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={radius}
        fill={`url(#${depthId})`}
      />
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={radius}
        fill={`url(#${specId})`}
      />
      <Rect
        x={inset}
        y={inset}
        width={Math.max(0, width - inset * 2)}
        height={Math.max(0, height - inset * 2)}
        rx={Math.max(0, radius - inset)}
        fill="none"
        stroke={`url(#${rimId})`}
        strokeWidth={1.25}
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
  fallback: {
    backgroundColor: "rgba(18,19,17,0.72)",
  },
  content: {
    position: "relative",
    zIndex: 1,
    overflow: "hidden",
  },
  padded: {
    paddingHorizontal: FigmaNavGlass.paddingX,
    paddingVertical: FigmaNavGlass.paddingY,
  },
});
