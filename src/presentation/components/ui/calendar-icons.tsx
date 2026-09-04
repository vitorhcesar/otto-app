import { useMemo } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import {
  CALENDAR_CHEVRON_DOWN_XML,
  CALENDAR_CHEVRON_LEFT_XML,
  CALENDAR_CHEVRON_RIGHT_XML,
} from '@/presentation/components/ui/calendar-icon-xml';

type IconProps = {
  size?: number;
  color?: string;
};

function tintFigmaIcon(xml: string, color: string) {
  return xml.replace(/#(?:E0E2DF|F5F5F4)/gi, color);
}

function FigmaIcon({
  xml,
  size,
  color,
}: {
  xml: string;
  size: number;
  color?: string;
}) {
  const tintedXml = useMemo(
    () => (color ? tintFigmaIcon(xml, color) : xml),
    [xml, color],
  );

  return (
    <View style={{ width: size, height: size, overflow: 'hidden' }}>
      <SvgXml xml={tintedXml} width={size} height={size} />
    </View>
  );
}

export function CalendarChevronLeftIcon({ size = 24, color }: IconProps) {
  return <FigmaIcon xml={CALENDAR_CHEVRON_LEFT_XML} size={size} color={color} />;
}

export function CalendarChevronRightIcon({ size = 24, color }: IconProps) {
  return (
    <FigmaIcon xml={CALENDAR_CHEVRON_RIGHT_XML} size={size} color={color} />
  );
}

export function CalendarChevronDownIcon({ size = 12, color }: IconProps) {
  return <FigmaIcon xml={CALENDAR_CHEVRON_DOWN_XML} size={size} color={color} />;
}
