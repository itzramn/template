import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { SessionProvider } from '@/context/ctx';
import { ThemeProvider } from '@/context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    InterLight: require('../assets/fonts/Inter_18pt-Light.ttf'),
    InterMedium: require('../assets/fonts/Inter_18pt-Medium.ttf'),
    Inter: require('../assets/fonts/Inter_18pt-Regular.ttf'),
    InterSemiBold: require('../assets/fonts/Inter_18pt-SemiBold.ttf'),
    InterBold: require('../assets/fonts/Inter_18pt-Bold.ttf'),
    NunitoLight: require('../assets/fonts/Nunito-Light.ttf'),
    NunitoMedium: require('../assets/fonts/Nunito-Medium.ttf'),
    Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
    NunitoSemiBold: require('../assets/fonts/Nunito-SemiBold.ttf'),
    NunitoBold: require('../assets/fonts/Nunito-Bold.ttf'),
    QuicksandLight: require('../assets/fonts/Quicksand-Light.ttf'),
    QuicksandMedium: require('../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    QuicksandSemiBold: require('../assets/fonts/Quicksand-SemiBold.ttf'),
    QuicksandBold: require('../assets/fonts/Quicksand-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <SessionProvider>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
          </Stack>
        </SafeAreaProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
