import Svg, { G, Path } from 'react-native-svg';

type BrazilFlagProps = {
  width?: number;
  height?: number;
};

/** Brazil flag composed from Figma Flags/BR vector layers */
export function BrazilFlag({ width = 16, height = 11 }: BrazilFlagProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 15.8973 10.5982" fill="none">
      <Path d="M0 0H15.8973V10.5982H0V0Z" fill="#009B3A" />
      <G transform="translate(1.567, 0.598)">
        <Path d="M6.3806 0L12.7302 4.69171L6.3806 9.38032L0 4.69171L6.3806 0Z" fill="#FEDF00" />
      </G>
      <G transform="translate(5.458, 2.807)">
        <Path
          d="M2.4915 4.983C3.86752 4.983 4.983 3.86752 4.983 2.4915C4.983 1.11548 3.86752 0 2.4915 0C1.11548 0 0 1.11548 0 2.4915C0 3.86752 1.11548 4.983 2.4915 4.983Z"
          fill="white"
        />
      </G>
      <G transform="translate(5.448, 2.795)">
        <Path
          d="M1.24265 2.33966C0.811907 2.33966 0.393558 2.40473 0 2.52559C0.0185933 3.886 1.12489 4.983 2.4884 4.983C3.3313 4.983 4.07813 4.56155 4.52747 3.92009C3.75584 2.95943 2.56897 2.33966 1.24265 2.33966V2.33966ZM4.93032 2.96873C4.95821 2.81379 4.9768 2.65574 4.9768 2.4915C4.9768 1.1156 3.86121 0 2.4853 0C1.45957 0 0.579491 0.622876 0.19523 1.50606C0.533008 1.43788 0.880082 1.40069 1.23645 1.40069C2.68673 1.40379 3.99446 2.00498 4.93032 2.96873V2.96873Z"
          fill="#002776"
        />
      </G>
    </Svg>
  );
}
