import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native-safe-area-context';

type ThemedSafeAreaViewProps = {
  children: React.ReactNode;
  txtClassName?: string;
};

export default function ThemedSafeAreaView({
  children,
  txtClassName = '',
}: ThemedSafeAreaViewProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const tailwindClass = `bg-${backgroundColor}`;

  return (
    <SafeAreaView className={`${tailwindClass} ${txtClassName}`}>
      {children}
    </SafeAreaView>
  );
}
