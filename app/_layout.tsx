import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SessionProvider } from '@/context/ctx';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
    QuicksandRegular: require('../assets/fonts/Quicksand-Regular.ttf'),
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </ThemeProvider>
  );
}
