import Svg, { Path } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

/** Apple mark exported from Figma Brand component */
export function AppleIcon({ size = 16, color = '#E0E2DF' }: IconProps) {
  const width = (10.3138 / 12.6667) * size;
  return (
    <Svg width={width} height={size} viewBox="0 0 10.3138 12.6667" fill="none">
      <Path
        d="M8.61378 6.7294C8.63158 8.64629 10.2954 9.28418 10.3138 9.2923C10.2997 9.33726 10.048 10.2013 9.43725 11.0938C8.90928 11.8655 8.36137 12.6343 7.49822 12.6502C6.65008 12.6658 6.37735 12.1473 5.40769 12.1473C4.43832 12.1473 4.13531 12.6343 3.33245 12.6658C2.49929 12.6974 1.86482 11.8314 1.33251 11.0626C0.244763 9.49002 -0.586502 6.61882 0.529678 4.68072C1.08417 3.71825 2.0751 3.10877 3.15065 3.09314C3.9688 3.07754 4.74101 3.64356 5.24118 3.64356C5.74103 3.64356 6.67943 2.96286 7.66597 3.06283C8.07897 3.08002 9.23828 3.22966 9.98267 4.31929C9.92269 4.35647 8.5994 5.12683 8.61378 6.7294V6.7294ZM7.01981 2.02242C7.46214 1.487 7.75986 0.741632 7.67864 0C7.04104 0.0256258 6.27006 0.424872 5.81273 0.960005C5.40287 1.43389 5.04393 2.19237 5.14078 2.91933C5.85145 2.97431 6.57745 2.55819 7.01981 2.02242Z"
        fill={color}
      />
    </Svg>
  );
}

/** Google mark exported from Figma Brand component */
export function GoogleIcon({ size = 16, color = '#E0E2DF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 11.9996 12.0001" fill="none">
      <Path
        d="M6.12207 4.90918V7.23283H9.41707C9.27238 7.98011 8.83819 8.61286 8.18699 9.03831L10.174 10.5492C11.3317 9.502 11.9996 7.96379 11.9996 6.13652C11.9996 5.71107 11.9607 5.30194 11.8883 4.90925L6.12207 4.90918Z"
        fill={color}
      />
      <Path
        d="M0.656728 3.31104C0.239308 4.11828 0 5.02921 0 6.0001C0 6.971 0.239308 7.88193 0.656728 8.68918C0.656728 8.69459 2.69388 7.14008 2.69388 7.14008C2.57143 6.78008 2.49905 6.39828 2.49905 6.00004C2.49905 5.60181 2.57143 5.22001 2.69388 4.86001L0.656728 3.31104Z"
        fill={color}
      />
      <Path
        d="M6.12191 2.3891C7.0236 2.3891 7.82507 2.69455 8.46515 3.28365L10.2184 1.56548C9.1553 0.594586 7.775 0 6.12191 0C3.72859 0 1.66367 1.34728 0.65625 3.31093L2.69334 4.86003C3.17754 3.44183 4.53007 2.3891 6.12191 2.3891Z"
        fill={color}
      />
      <Path
        d="M2.6907 7.14209L2.24256 7.47828L0.65625 8.68918C1.66367 10.6473 3.72847 12.0001 6.12178 12.0001C7.77481 12.0001 9.1607 11.4656 10.1737 10.5492L8.1867 9.03828C7.64124 9.39828 6.9455 9.61648 6.12178 9.61648C4.52995 9.61648 3.17747 8.56376 2.69321 7.14555L2.6907 7.14209Z"
        fill={color}
      />
    </Svg>
  );
}

/** Phone mark for SMS / phone-number login — matches brand icon size/style */
export function PhoneIcon({ size = 16, color = '#E0E2DF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M5.2 1.75H10.8C11.3 1.75 11.7 2.15 11.7 2.65V13.35C11.7 13.85 11.3 14.25 10.8 14.25H5.2C4.7 14.25 4.3 13.85 4.3 13.35V2.65C4.3 2.15 4.7 1.75 5.2 1.75Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <Path
        d="M7.2 12.35H8.8"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** Envelope mark for email entry toggle — matches brand icon size/style */
export function EmailIcon({ size = 16, color = '#E0E2DF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M2.5 3.5H13.5C13.7761 3.5 14 3.72386 14 4V12C14 12.2761 13.7761 12.5 13.5 12.5H2.5C2.22386 12.5 2 12.2761 2 12V4C2 3.72386 2.22386 3.5 2.5 3.5Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 4.5L8 9L13.5 4.5"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
