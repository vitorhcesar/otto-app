import { Image } from "expo-image";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

type ActiveTabGlowProps = {
  style?: StyleProp<ViewStyle>;
};

/**
 * Soft neon bloom under the active tab.
 * Must live inside GlassSurface so overflow:hidden keeps it in the pill.
 */
export function ActiveTabGlow({ style }: ActiveTabGlowProps) {
  return (
    <View style={[styles.anchor, style]} pointerEvents="none">
      <Image
        source={require("@/assets/images/tabs/active-glow.png")}
        style={styles.glow}
        contentFit="contain"
      />
    </View>
  );
}

type AiBarGlowProps = {
  style?: StyleProp<ViewStyle>;
};

export function AiBarGlow({ style }: AiBarGlowProps) {
  return (
    <View style={[styles.aiAnchor, style]} pointerEvents="none">
      <Image
        source={require("@/assets/images/tabs/ai-bar-glow.png")}
        style={styles.aiGlow}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  anchor: {
    position: "absolute",
    width: 96,
    height: 72,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  glow: {
    width: 96,
    height: 96,
    opacity: 0.95,
  },
  aiAnchor: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  aiGlow: {
    width: 200,
    height: 48,
    opacity: 0.7,
  },
});
