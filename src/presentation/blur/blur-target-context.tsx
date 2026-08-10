import { createContext, useContext, type ReactNode, type RefObject } from 'react';
import type { View } from 'react-native';

export type BlurTargetRef = RefObject<View | null>;

const BlurTargetContext = createContext<BlurTargetRef | null>(null);

export function BlurTargetProvider({
  value,
  children,
}: {
  value: BlurTargetRef;
  children: ReactNode;
}) {
  return (
    <BlurTargetContext.Provider value={value}>{children}</BlurTargetContext.Provider>
  );
}

export function useBlurTarget() {
  return useContext(BlurTargetContext);
}
