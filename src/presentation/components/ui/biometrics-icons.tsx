import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

/** Face-grid / biometric glyph matching the Biometria settings design */
export function BiometricsFaceIcon({
  size = 20,
  color = '#CBCECA',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Rect
        x={4}
        y={3.5}
        width={12}
        height={13}
        rx={3}
        stroke={color}
        strokeWidth={1.35}
      />
      <Path
        d="M7.2 8.2C7.2 7.5 7.7 7 8.4 7C9.1 7 9.6 7.5 9.6 8.2"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M10.4 8.2C10.4 7.5 10.9 7 11.6 7C12.3 7 12.8 7.5 12.8 8.2"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M7.5 12.2C8.2 13.1 9.1 13.6 10 13.6C10.9 13.6 11.8 13.1 12.5 12.2"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M4 7H2.8"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M4 10H2.8"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M17.2 7H16"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M17.2 10H16"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function BiometricsFingerprintIcon({
  size = 20,
  color = '#CBCECA',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 3.5C7.5 3.5 5.5 5.5 5.5 8V11.5"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <Path
        d="M14.5 8C14.5 5.5 12.5 3.5 10 3.5"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <Path
        d="M7 8.2C7 6.5 8.3 5.2 10 5.2C11.7 5.2 13 6.5 13 8.2V12"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <Path
        d="M10 7C9.2 7 8.5 7.7 8.5 8.5V14.2"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <Path
        d="M11.5 8.8V13.5"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <Path
        d="M6.2 12.5C6.8 14.8 8.3 16.2 10 16.2C11.4 16.2 12.6 15.3 13.3 13.8"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <Circle cx={10} cy={9.2} r={0.7} fill={color} />
    </Svg>
  );
}
