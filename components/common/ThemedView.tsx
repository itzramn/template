import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  txtClassName?: string;
};

export function ThemedView({
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
    <View
      className={txtClassName}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
