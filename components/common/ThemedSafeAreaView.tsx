import { type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  txtClassName?: string;
};

export function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor,
  txtClassName = '',
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return (
    <SafeAreaView
      className={txtClassName}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
