import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, type ReactNode } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AuthDraftProvider } from '@/presentation/auth/auth-draft-context';
import {
  AuthSessionProvider,
  useAuthSession,
} from '@/presentation/auth/auth-session-context';
import { AnimatedSplashOverlay } from '@/presentation/components/animated-icon';
import { OttoColors } from '@/presentation/constants/theme';
import { HomeLoading } from '@/presentation/pages/HomePage';

SplashScreen.preventAutoHideAsync();

const AUTH_SCREENS = new Set([
  'index',
  'login-email',
  'login-email-whatsapp',
  'login-email-code',
  'login-email-profile',
  'login-email-data',
  'login-password',
]);

function AuthGate({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthSession();
  const segments = useSegments();
  const router = useRouter();
  const root = segments[0] ?? 'index';

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const onAuthScreen = AUTH_SCREENS.has(root) || root === 'explore';
    const onApp = root === '(tabs)' || root === 'home';

    if (isAuthenticated && onAuthScreen) {
      router.replace('/(tabs)/activities');
      return;
    }

    if (!isAuthenticated && onApp) {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, root, router]);

  if (isLoading) {
    return <HomeLoading />;
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthDraftProvider>
      <AuthSessionProvider>
        <StatusBar style="light" />
        <AnimatedSplashOverlay />
        <AuthGate>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: OttoColors.background },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="login-email" />
            <Stack.Screen name="login-email-whatsapp" />
            <Stack.Screen name="login-email-code" />
            <Stack.Screen name="login-email-profile" />
            <Stack.Screen name="login-email-data" />
            <Stack.Screen name="login-password" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="home" />
            <Stack.Screen name="explore" />
          </Stack>
        </AuthGate>
      </AuthSessionProvider>
    </AuthDraftProvider>
  );
}
