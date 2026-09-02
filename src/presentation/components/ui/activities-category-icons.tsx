import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";

import { CATEGORY_ICON_XML } from "@/presentation/components/ui/activities-category-icon-xml";
import { OttoColors } from "@/presentation/constants/theme";

const PARENT_GLYPH = "#212220";
const CLIP_FILL = /fill="(?:white|#fff(?:fff)?)"/gi;

function tintCategoryXml(xml: string, color: string) {
  return xml
    .replace(CLIP_FILL, 'fill="__CLIP__"')
    .replace(/stroke="#[^"]+"/gi, `stroke="${color}"`)
    .replace(/fill="#[^"]+"/gi, `fill="${color}"`)
    .replace(/fill="__CLIP__"/g, 'fill="white"');
}

function CategoryGlyph({
  iconKey,
  color,
  size = 12,
}: {
  iconKey: string;
  color?: string;
  size?: number;
}) {
  const xml = CATEGORY_ICON_XML[iconKey];
  const tinted = useMemo(
    () => (xml && color ? tintCategoryXml(xml, color) : xml),
    [xml, color],
  );

  if (!tinted) {
    return <View style={{ width: size, height: size }} />;
  }

  return (
    <View style={{ width: size, height: size, overflow: "hidden" }}>
      <SvgXml xml={tinted} width={size} height={size} />
    </View>
  );
}

export function CategoryChipIcon({
  iconKey,
  color,
  size = 12,
}: {
  iconKey: string;
  color: string;
  size?: number;
}) {
  return <CategoryGlyph iconKey={iconKey} color={color} size={size} />;
}

export function CategoryParentIcon({
  iconKey,
  color,
}: {
  iconKey: string;
  color: string;
}) {
  return (
    <View style={[styles.box, { backgroundColor: color }]}>
      <CategoryGlyph iconKey={iconKey} color={PARENT_GLYPH} size={12} />
    </View>
  );
}

export function CategoryChildIcon({
  iconKey,
  color,
}: {
  iconKey: string;
  color: string;
}) {
  return (
    <View style={[styles.box, styles.childBox]}>
      <CategoryGlyph iconKey={iconKey} color={color} size={12} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 24,
    height: 24,
    borderRadius: 8,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  childBox: {
    backgroundColor: OttoColors.borderSoft,
  },
});
