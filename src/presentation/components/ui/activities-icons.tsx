import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export function BackChevronIcon({ size = 24, color = '#F5F5F4' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.5 6.5L9 12L14.5 17.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PlusIcon({ size = 24, color = '#0A0B0A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6V18"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
      <Path
        d="M6 12H18"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SearchIcon({ size = 16, color = '#767D73' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx={7} cy={7} r={5} stroke={color} strokeWidth={1.25} />
      <Path
        d="M11.2 11.2L14 14"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function FilterSlidersIcon({ size = 24, color = '#F5F5F4' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7H20" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M4 12H20" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M4 17H20" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={9} cy={7} r={2} fill={color} />
      <Circle cx={15} cy={12} r={2} fill={color} />
      <Circle cx={11} cy={17} r={2} fill={color} />
    </Svg>
  );
}

export function IncomeArrowIcon({ size = 12, color = '#63E29F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M8.5 3.5L3.5 8.5"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
      <Path
        d="M3.5 4.5V8.5H7.5"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ExpenseArrowIcon({ size = 12, color = '#FF6B6B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M3.5 8.5L8.5 3.5"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
      <Path
        d="M8.5 7.5V3.5H4.5"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function HomeTabIcon({ size = 24, color = '#767D73' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.5 10.5L12 4.5L19.5 10.5V19C19.5 19.5523 19.0523 20 18.5 20H5.5C4.94772 20 4.5 19.5523 4.5 19V10.5Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M10 20V14H14V20"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function WalletTabIcon({ size = 24, color = '#95FF52' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3.5}
        y={6.5}
        width={17}
        height={12}
        rx={2.5}
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M3.5 10H20.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Circle cx={16.5} cy={14.5} r={1} fill={color} />
    </Svg>
  );
}

export function AiWaveIcon({ size = 24, color = '#95FF52' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12V12.01"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M9 8V16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M13 5V19"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M17 9V15"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M21 11V13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
