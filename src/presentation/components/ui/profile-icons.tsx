import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

/** Green verified check badge used in profile contact fields */
export function VerifiedBadgeIcon({
  size = 16,
  color = '#49dc14',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={8} r={7.25} fill={color} />
      <Path
        d="M4.8 8.2L6.9 10.2L11.2 5.8"
        stroke="#0A0B0A"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Trash can — delete account */
export function TrashIcon({ size = 16, color = '#767D73' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M3.5 4.5H12.5"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M6 4.5V3.2C6 2.8 6.3 2.5 6.7 2.5H9.3C9.7 2.5 10 2.8 10 3.2V4.5"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M4.5 4.5L5.2 12.3C5.25 12.8 5.7 13.2 6.2 13.2H9.8C10.3 13.2 10.75 12.8 10.8 12.3L11.5 4.5"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <Path
        d="M7 7V11"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M9 7V11"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
