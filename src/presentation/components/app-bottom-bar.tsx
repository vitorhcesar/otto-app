import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ActiveTabGlow,
  AiBarGlow,
} from "@/presentation/components/ui/active-tab-glow";
import {
  AiWaveIcon,
  HomeTabIcon,
  WalletTabIcon,
} from "@/presentation/components/ui/activities-icons";
import { GlassSurface } from "@/presentation/components/ui/glass-surface";
import { OttoColors, OttoTypography } from "@/presentation/constants/theme";

export type AppTabKey = "home" | "activities" | "community";

type AppBottomBarProps = {
  activeTab: AppTabKey;
  onTabPress: (tab: AppTabKey) => void;
  communityBadgeCount?: number;
};

export function AppBottomBar({
  activeTab,
  onTabPress,
  communityBadgeCount = 2,
}: AppBottomBarProps) {
  const insets = useSafeAreaInsets();

  const glowOffset =
    activeTab === "home"
      ? "15.5%"
      : activeTab === "activities"
        ? "57%"
        : "100%";

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <Pressable accessibilityRole="button">
        <GlassSurface style={styles.aiBar} contentStyle={styles.aiBarContent}>
          <AiBarGlow style={styles.aiGlowInBar} />
          <Text style={styles.aiPlaceholder}>Pergunte ao Otto IA</Text>
          <View style={styles.aiIconWrap}>
            <AiWaveIcon size={22} color={OttoColors.primarySoft} />
          </View>
        </GlassSurface>
      </Pressable>

      <View style={styles.navRow}>
        <GlassSurface
          style={styles.navPill}
          contentStyle={styles.navPillContent}
        >
          {/* Inside glass + overflow:hidden → glow cannot leave the pill */}
          <ActiveTabGlow
            style={[
              styles.glowInPill,
              {
                left: glowOffset,
                marginLeft: -48,
              },
            ]}
          />

          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === "home" }}
            onPress={() => onTabPress("home")}
            style={styles.navItem}
          >
            <HomeTabIcon
              size={24}
              color={
                activeTab === "home"
                  ? OttoColors.primarySoft
                  : OttoColors.textSoft
              }
            />
          </Pressable>

          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === "activities" }}
            onPress={() => onTabPress("activities")}
            style={styles.navItem}
          >
            <WalletTabIcon
              size={24}
              color={
                activeTab === "activities"
                  ? OttoColors.primarySoft
                  : OttoColors.textSoft
              }
            />
          </Pressable>

          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === "community" }}
            onPress={() => onTabPress("community")}
            style={styles.communityItem}
          >
            <View style={styles.avatarStack}>
              <Image
                source={require("@/assets/images/avatars/onca.png")}
                style={[styles.miniAvatar, styles.avatarFront]}
                contentFit="cover"
              />
              <Image
                source={require("@/assets/images/avatars/lhama.png")}
                style={[styles.miniAvatar, styles.avatarMid]}
                contentFit="cover"
              />
              <Image
                source={require("@/assets/images/avatars/akita.png")}
                style={[styles.miniAvatar, styles.avatarBack]}
                contentFit="cover"
              />
              {communityBadgeCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{communityBadgeCount}</Text>
                </View>
              ) : null}
            </View>
          </Pressable>
        </GlassSurface>

        <Pressable accessibilityRole="button">
          <GlassSurface
            style={styles.logoButton}
            contentStyle={styles.logoButtonContent}
          >
            <Image
              source={require("@/assets/images/auth/logo.png")}
              style={styles.logo}
              contentFit="contain"
            />
          </GlassSurface>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
    paddingHorizontal: 16,
    width: "100%",
  },
  aiBar: {
    borderRadius: 40,
  },
  aiBarContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 12,
    overflow: "hidden",
    position: "relative",
  },
  aiGlowInBar: {
    bottom: -20,
    zIndex: 0,
  },
  aiPlaceholder: {
    ...OttoTypography.bodySmall,
    color: OttoColors.textMid,
    zIndex: 1,
  },
  aiIconWrap: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  navPill: {
    flex: 1,
    borderRadius: 40,
  },
  navPillContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 12,
    overflow: "hidden",
    position: "relative",
  },
  glowInPill: {
    // Lower under the icon; clipped by pill overflow
    bottom: -37,
    zIndex: 0,
  },
  navItem: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  communityItem: {
    width: 42,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  avatarStack: {
    width: 34,
    height: 28,
    position: "relative",
  },
  miniAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: OttoColors.borderSoft,
    position: "absolute",
  },
  avatarFront: {
    left: 0,
    top: 0,
    zIndex: 3,
  },
  avatarMid: {
    left: 10,
    top: 0,
    zIndex: 2,
  },
  avatarBack: {
    left: 7,
    top: 8,
    zIndex: 1,
  },
  badge: {
    position: "absolute",
    right: -4,
    top: 10,
    minWidth: 14,
    height: 14,
    borderRadius: 999,
    backgroundColor: OttoColors.danger,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
    zIndex: 4,
  },
  badgeText: {
    ...OttoTypography.captionSmall,
    color: OttoColors.text,
    textAlign: "center",
  },
  logoButton: {
    width: 56,
    height: 56,
    borderRadius: 40,
  },
  logoButtonContent: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 28,
    height: 28,
  },
});
