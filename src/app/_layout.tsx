import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import {
  DarkTheme,
  Stack,
  ThemeProvider,
  type Theme,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { AuthDraftProvider } from '@/presentation/auth/auth-draft-context';
import {
  AuthSessionProvider,
  useAuthSession,
} from '@/presentation/auth/auth-session-context';
import { AnimatedSplashOverlay } from '@/presentation/components/animated-icon';
import { OttoColors } from '@/presentation/constants/theme';
import { HomeLoading } from '@/presentation/pages/HomePage';

SplashScreen.preventAutoHideAsync();

const OttoNavigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: OttoColors.background,
    card: OttoColors.background,
    border: OttoColors.borderSoft,
    primary: OttoColors.primary,
    text: OttoColors.text,
  },
};

function RootNavigator() {
  const { isLoading, isAuthenticated } = useAuthSession();

  if (isLoading) {
    return <HomeLoading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: styles.screen,
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
    return <View style={styles.root} />;
  }

  return (
    <View style={styles.root}>
      <ThemeProvider value={OttoNavigationTheme}>
        <AuthDraftProvider>
          <AuthSessionProvider>
            <StatusBar style="light" />
            <AnimatedSplashOverlay />
            <RootNavigator />
          </AuthSessionProvider>
        </AuthDraftProvider>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: OttoColors.background,
  },
  screen: {
    backgroundColor: OttoColors.background,
  },
});
