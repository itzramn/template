/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';

/**
 * Custom hook to get the color based on the theme.
 * @param props - The props to get the color from. Used to override the default color and get custom colors.
 * @param colorName - The color name to get from the theme. Used to get the default color from Colors.ts
 * @returns The color based on the theme in the props or the default color from Colors.ts
 */

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
