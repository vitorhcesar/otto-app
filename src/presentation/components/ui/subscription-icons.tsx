import Svg, { Path } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

/** Outline ghost used in the subscription empty state */
export function GhostIcon({ size = 20, color = '#767D73' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M4 8.2C4 5.1 6.5 2.6 10 2.6C13.5 2.6 16 5.1 16 8.2V16.4L14.2 14.8L12.1 16.4L10 14.8L7.9 16.4L5.8 14.8L4 16.4V8.2Z"
        stroke={color}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
      <Path
        d="M7.4 8.4C7.4 8.9 7.8 9.3 8.3 9.3C8.8 9.3 9.2 8.9 9.2 8.4C9.2 7.9 8.8 7.5 8.3 7.5C7.8 7.5 7.4 7.9 7.4 8.4Z"
        fill={color}
      />
      <Path
        d="M10.8 8.4C10.8 8.9 11.2 9.3 11.7 9.3C12.2 9.3 12.6 8.9 12.6 8.4C12.6 7.9 12.2 7.5 11.7 7.5C11.2 7.5 10.8 7.9 10.8 8.4Z"
        fill={color}
      />
    </Svg>
  );
}
