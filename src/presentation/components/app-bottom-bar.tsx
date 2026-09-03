import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ActiveTabGlow } from "@/presentation/components/ui/active-tab-glow";
import {
  AiAskGlyph,
  HomeTabGlyph,
  OttoMarkGlyph,
  WalletTabGlyph,
} from "@/presentation/components/ui/figma-tab-icons";
import { GlassSurface } from "@/presentation/components/ui/glass-surface";
import { OttoColors, OttoTypography } from "@/presentation/constants/theme";

export type AppTabKey = "home" | "activities" | "community";

type AppBottomBarProps = {
  activeTab: AppTabKey;
  onTabPress: (tab: AppTabKey) => void;
  onSettingsPress?: () => void;
  communityBadgeCount?: number;
};

const INACTIVE_ICON = OttoColors.buttonFilled;
const ACTIVE_ICON = OttoColors.primarySoft;

export function AppBottomBar({
  activeTab,
  onTabPress,
  onSettingsPress,
  communityBadgeCount = 2,
}: AppBottomBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Pergunte ao Otto IA"
      >
        <GlassSurface
          padded={false}
          style={styles.aiBar}
          contentStyle={styles.aiBarContent}
        >
          <Text style={styles.aiPlaceholder}>Pergunte ao Otto IA</Text>
          <View style={styles.aiIconWrap}>
            <AiAskGlyph size={24} color={ACTIVE_ICON} />
          </View>
        </GlassSurface>
      </Pressable>

      <View style={styles.navRow}>
        <GlassSurface
          padded={false}
          style={styles.navPill}
          contentStyle={styles.navPillContent}
        >
          <Pressable
            accessibilityRole="tab"
            accessibilityLabel="Home"
            accessibilityState={{ selected: activeTab === "home" }}
            hitSlop={10}
            onPress={() => onTabPress("home")}
            style={styles.navItem}
          >
            {activeTab === "home" ? <ActiveTabGlow /> : null}
            <HomeTabGlyph
              size={24}
              color={activeTab === "home" ? ACTIVE_ICON : INACTIVE_ICON}
            />
          </Pressable>

          <Pressable
            accessibilityRole="tab"
            accessibilityLabel="Atividades"
            accessibilityState={{ selected: activeTab === "activities" }}
            hitSlop={10}
            onPress={() => onTabPress("activities")}
            style={styles.navItem}
          >
            {activeTab === "activities" ? <ActiveTabGlow /> : null}
            <WalletTabGlyph
              size={24}
              color={activeTab === "activities" ? ACTIVE_ICON : INACTIVE_ICON}
            />
          </Pressable>

          <Pressable
            accessibilityRole="tab"
            accessibilityLabel="Comunidade"
            accessibilityState={{ selected: activeTab === "community" }}
            hitSlop={10}
            onPress={() => onTabPress("community")}
            style={styles.communityItem}
          >
            {activeTab === "community" ? <ActiveTabGlow /> : null}
            <View style={styles.avatarStack}>
              <View style={[styles.miniAvatar, styles.avatarTopLeft]}>
                <Image
                  source={require("@/assets/images/avatars/onca.png")}
                  style={styles.miniAvatarImage}
                  contentFit="cover"
                />
              </View>
              <View style={[styles.miniAvatar, styles.avatarTopRight]}>
                <Image
                  source={require("@/assets/images/avatars/lhama.png")}
                  style={styles.miniAvatarImage}
                  contentFit="cover"
                />
              </View>
              <View style={[styles.miniAvatar, styles.avatarBottom]}>
                <Image
                  source={require("@/assets/images/avatars/akita.png")}
                  style={styles.miniAvatarImage}
                  contentFit="cover"
                />
              </View>
              {communityBadgeCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{communityBadgeCount}</Text>
                </View>
              ) : null}
            </View>
          </Pressable>
        </GlassSurface>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Perfil e configurações"
          onPress={onSettingsPress}
        >
          <GlassSurface
            padded={false}
            style={styles.logoButton}
            contentStyle={styles.logoButtonContent}
          >
            <OttoMarkGlyph />
          </GlassSurface>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
    width: "100%",
    minWidth: 280,
    maxWidth: 340,
    alignSelf: "center",
  },
  aiBar: {
    height: 48,
    width: "100%",
  },
  aiBarContent: {
    height: 48,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  aiPlaceholder: {
    ...OttoTypography.bodySmall,
    lineHeight: 22.4,
    color: OttoColors.textMid,
    zIndex: 1,
  },
  aiIconWrap: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    zIndex: 1,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  navPill: {
    flex: 1,
    height: 56,
  },
  navPillContent: {
    height: 56,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  navItem: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  communityItem: {
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  avatarStack: {
    width: 34,
    height: 32,
    position: "relative",
  },
  miniAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0.25,
    borderColor: OttoColors.borderSoft,
    position: "absolute",
    backgroundColor: OttoColors.surface,
  },
  miniAvatarImage: {
    width: 45,
    height: 67,
    position: "absolute",
    left: -7,
    top: -15,
  },
  avatarTopLeft: {
    left: 0,
    top: 0,
    zIndex: 3,
  },
  avatarTopRight: {
    left: 12,
    top: 0,
    zIndex: 2,
  },
  avatarBottom: {
    left: 7,
    top: 12,
    zIndex: 1,
  },
  badge: {
    position: "absolute",
    left: 25,
    top: 14,
    minWidth: 16,
    height: 16,
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
    width: 12,
  },
  logoButton: {
    width: 56,
    height: 56,
  },
  logoButtonContent: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
});
