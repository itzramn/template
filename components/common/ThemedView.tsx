import { useThemeColor } from '@/hooks/useThemeColor';
import { View } from 'react-native';

type ThemedViewProps = {
  children: React.ReactNode;
  txtClassName?: string;
};

export default function ThemedView({
  children,
  txtClassName = '',
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const tailwindClass = `bg-${backgroundColor}`;

  return <View className={`${tailwindClass} ${txtClassName}`}>{children}</View>;
}
