import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import {
  BANK_BB_XML,
  BANK_C6_XML,
  BANK_CAIXA_MARK_XML,
  BANK_ITAU_XML,
  BANK_NUBANK_MARK_XML,
  BANK_SANTANDER_XML,
} from '@/presentation/components/ui/bank-logo-xml';

type LogoProps = {
  size?: number;
};

function CircularLogo({ xml, size }: { xml: string; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
      }}
    >
      <SvgXml xml={xml} width={size} height={size} />
    </View>
  );
}

function MarkLogo({
  xml,
  size,
  backgroundColor,
  markWidth,
  markHeight,
}: {
  xml: string;
  size: number;
  backgroundColor: string;
  markWidth: number;
  markHeight: number;
}) {
  const width = (markWidth / 20) * size;
  const height = (markHeight / 20) * size;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <SvgXml xml={xml} width={width} height={height} />
    </View>
  );
}

export function SantanderLogo({ size = 20 }: LogoProps) {
  return <CircularLogo xml={BANK_SANTANDER_XML} size={size} />;
}

export function BancoDoBrasilLogo({ size = 20 }: LogoProps) {
  return <CircularLogo xml={BANK_BB_XML} size={size} />;
}

export function NubankLogo({ size = 20 }: LogoProps) {
  return (
    <MarkLogo
      xml={BANK_NUBANK_MARK_XML}
      size={size}
      backgroundColor="#820AD1"
      markWidth={10.3566}
      markHeight={5.71364}
    />
  );
}

export function CaixaLogo({ size = 20 }: LogoProps) {
  return (
    <MarkLogo
      xml={BANK_CAIXA_MARK_XML}
      size={size}
      backgroundColor="#002C4D"
      markWidth={12.0259}
      markHeight={8.39172}
    />
  );
}

export function C6Logo({ size = 20 }: LogoProps) {
  return <CircularLogo xml={BANK_C6_XML} size={size} />;
}

export function ItauLogo({ size = 20 }: LogoProps) {
  return <CircularLogo xml={BANK_ITAU_XML} size={size} />;
}
