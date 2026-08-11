import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export function SettingsChevronIcon({ size = 16, color = '#CBCECA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M6.5 3.5L11 8L6.5 12.5"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SettingsEditIcon({ size = 16, color = '#F5F5F4' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M9.2 3.4L12.6 6.8"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M3.2 12.2L3.8 9.1L10.5 2.4C10.9 2 11.5 2 11.9 2.4L13.6 4.1C14 4.5 14 5.1 13.6 5.5L6.9 12.2L3.2 12.2Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SettingsRocketIcon({ size = 16, color = '#CBCECA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M9.8 2.4C11.6 2.1 13.2 2.8 13.8 4.4C12.2 5 10.4 6.4 9.2 8.2L7.8 7.8L7.4 6.4C9.2 5.2 10.6 3.4 11.2 1.8"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.2 8.8L4.2 13.4L8.8 11.4"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.4 10.2C4.6 10.8 3.8 12 3.4 13"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
      />
      <Circle cx={10.6} cy={5.4} r={0.9} fill={color} />
    </Svg>
  );
}

export function SettingsStarIcon({ size = 16, color = '#CBCECA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 2.2L9.6 5.8L13.5 6.2L10.6 8.8L11.4 12.7L8 10.8L4.6 12.7L5.4 8.8L2.5 6.2L6.4 5.8L8 2.2Z"
        stroke={color}
        strokeWidth={1.15}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SettingsProfileIcon({ size = 16, color = '#CBCECA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={5.5} r={2.4} stroke={color} strokeWidth={1.2} />
      <Path
        d="M3.5 13.2C3.8 10.8 5.5 9.4 8 9.4C10.5 9.4 12.2 10.8 12.5 13.2"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SettingsSlidersIcon({ size = 16, color = '#CBCECA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M2.5 4.5H13.5" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M2.5 8H13.5" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M2.5 11.5H13.5" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <Circle cx={5.5} cy={4.5} r={1.35} fill={color} />
      <Circle cx={10.5} cy={8} r={1.35} fill={color} />
      <Circle cx={7} cy={11.5} r={1.35} fill={color} />
    </Svg>
  );
}

export function SettingsCardIcon({ size = 16, color = '#CBCECA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Rect
        x={1.75}
        y={4}
        width={12.5}
        height={8}
        rx={1.5}
        stroke={color}
        strokeWidth={1.2}
      />
      <Path d="M1.75 6.75H14.25" stroke={color} strokeWidth={1.2} />
      <Path d="M4 10H6.5" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M8 10H9" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

export function SettingsKeyIcon({ size = 16, color = '#CBCECA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx={6} cy={6} r={3.1} stroke={color} strokeWidth={1.2} />
      <Path
        d="M8.2 8.2L13.2 13.2"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M11.4 11.4L13 13"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M12.2 10.2L13.4 11.4"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SettingsPasswordIcon({ size = 16, color = '#CBCECA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Rect
        x={2}
        y={5.5}
        width={9}
        height={7}
        rx={1.4}
        stroke={color}
        strokeWidth={1.2}
      />
      <Circle cx={4.6} cy={9} r={0.7} fill={color} />
      <Circle cx={6.5} cy={9} r={0.7} fill={color} />
      <Circle cx={8.4} cy={9} r={0.7} fill={color} />
      <Path
        d="M11 8.5H13.2C13.7 8.5 14.1 8.9 14.1 9.4V11.6"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SettingsBiometricsIcon({ size = 16, color = '#CBCECA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M3.5 5.2V4.2C3.5 3.3 4.2 2.6 5.1 2.6H6.2"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
      />
      <Path
        d="M10.8 2.6H11.9C12.8 2.6 13.5 3.3 13.5 4.2V5.2"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
      />
      <Path
        d="M13.5 10.8V11.9C13.5 12.8 12.8 13.5 11.9 13.5H10.8"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
      />
      <Path
        d="M6.2 13.5H5.1C4.2 13.5 3.5 12.8 3.5 11.9V10.8"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
      />
      <Rect x={5.4} y={5.4} width={2} height={2} rx={0.35} stroke={color} strokeWidth={1} />
      <Rect x={8.6} y={5.4} width={2} height={2} rx={0.35} stroke={color} strokeWidth={1} />
      <Rect x={5.4} y={8.6} width={2} height={2} rx={0.35} stroke={color} strokeWidth={1} />
      <Rect x={8.6} y={8.6} width={2} height={2} rx={0.35} stroke={color} strokeWidth={1} />
    </Svg>
  );
}

export function SettingsReportIcon({ size = 16, color = '#CBCECA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4 3.5H10.2L13 6.3V13C13 13.3 12.8 13.5 12.5 13.5H4C3.7 13.5 3.5 13.3 3.5 13V4C3.5 3.7 3.7 3.5 4 3.5Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <Path d="M10 3.5V6.5H13" stroke={color} strokeWidth={1.2} strokeLinejoin="round" />
      <Path d="M6 9.5H10.5" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <Path
        d="M11.8 2.2L12.6 3.8"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SettingsSupportIcon({ size = 16, color = '#CBCECA' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4.2 7.2C3.4 6.2 3.2 4.8 4 3.8C5.1 2.4 7.1 2.2 8.5 3.2C9.9 2.2 11.9 2.4 13 3.8C13.8 4.8 13.6 6.2 12.8 7.2"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
      />
      <Path
        d="M3.5 9.4C4.2 11.8 6 13.4 8.5 13.4C11 13.4 12.8 11.8 13.5 9.4"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
      />
      <Path
        d="M5.2 9.6C5.6 10.4 6.4 11 8.5 11C10.6 11 11.4 10.4 11.8 9.6"
        stroke={color}
        strokeWidth={1.15}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SettingsLogoutIcon({ size = 16, color = '#F5F5F4' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M7 3H4.5C3.7 3 3 3.7 3 4.5V11.5C3 12.3 3.7 13 4.5 13H7"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M7 8H13.2"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M10.8 5.5L13.5 8L10.8 10.5"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
