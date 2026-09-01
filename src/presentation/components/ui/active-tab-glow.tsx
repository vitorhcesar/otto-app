import { Image } from "expo-image";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

type ActiveTabGlowProps = {
  style?: StyleProp<ViewStyle>;
};

/**
 * Soft neon bloom under the active tab.
 * Lives inside the selected nav item; GlassSurface overflow clips it to the pill.
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
    width: 92,
    height: 92,
    bottom: -37,
    left: "50%",
    marginLeft: -46,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  glow: {
    width: 92,
    height: 92,
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
