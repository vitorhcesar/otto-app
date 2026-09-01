import Svg, { Circle, Path } from 'react-native-svg';

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

