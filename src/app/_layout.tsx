import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
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

function RootNavigator() {
  const { isLoading, isAuthenticated } = useAuthSession();

  if (isLoading) {
    return <HomeLoading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: OttoColors.background },
      }}
    >
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="home" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login-email" />
        <Stack.Screen name="login-email-whatsapp" />
        <Stack.Screen name="login-email-code" />
        <Stack.Screen name="login-email-profile" />
        <Stack.Screen name="login-email-data" />
        <Stack.Screen name="login-password" />
        <Stack.Screen name="explore" />
      </Stack.Protected>
    </Stack>
  );
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
        <RootNavigator />
      </AuthSessionProvider>
    </AuthDraftProvider>
  );
}
