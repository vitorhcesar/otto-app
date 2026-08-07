import type { ImageSource } from 'expo-image';

export interface IAvatarOption {
  id: string;
  source: ImageSource;
}

/** Preset profile avatars — Metro requires static string literals in require() */
export const DEFAULT_AVATARS: IAvatarOption[] = [
  { id: 'avatar-1', source: require('@/assets/images/auth/avatar-1.png') },
  { id: 'avatar-2', source: require('@/assets/images/auth/avatar-2.png') },
  { id: 'avatar-3', source: require('@/assets/images/auth/avatar-3.png') },
  { id: 'avatar-4', source: require('@/assets/images/auth/avatar-4.png') },
  { id: 'avatar-5', source: require('@/assets/images/auth/avatar-5.png') },
  { id: 'avatar-6', source: require('@/assets/images/auth/avatar-6.png') },
  { id: 'avatar-7', source: require('@/assets/images/auth/avatar-7.png') },
  { id: 'avatar-8', source: require('@/assets/images/auth/avatar-8.png') },
];
