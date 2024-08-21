import { Colors } from '@/constants/Colors';
import { hexToRGBA } from '@/utils/utils';
import { Pressable, PressableProps, Text, StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type ColorNames = keyof Omit<typeof Colors, 'light' | 'dark'>;

type ButtonProps = PressableProps & {
  children: React.ReactNode;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  color?: ColorNames;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'light';
  txtClassName?: string;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Button({
  children,
  rounded = '2xl',
  color = 'primary',
  size = 'md',
  variant = 'solid',
  txtClassName = '',
  ...rest
}: ButtonProps) {
  const solidAnimation = useSolidBackgroundAnimation(color);
  const lightAnimation = useLightBackgroundAnimation(color);

  const { handlePressIn, handlePressOut, animatedStyle } =
    variant === 'solid' ? solidAnimation : lightAnimation;

  const borderRadiusStyle = getBorderRadiusStyle(rounded);
  const paddingStyle = getPaddingStyle(size);
  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={txtClassName}
      style={[styles.base, borderRadiusStyle, paddingStyle, animatedStyle]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          variant === 'solid' && styles.solidText,
          variant === 'light' && { color: Colors[color][900] },
          { fontFamily: 'Nunito' },
        ]}
      >
        {children}
      </Text>
    </AnimatedPressable>
  );
}

function useSolidBackgroundAnimation(color: ColorNames) {
  const animatedColor = useSharedValue(0);
  const handlePressIn = () => {
    animatedColor.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    animatedColor.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedColor.value,
      [0, 1],
      [Colors[color][500], Colors[color][600]]
    );

    return {
      backgroundColor,
    };
  });

  return { handlePressIn, handlePressOut, animatedStyle };
}

function useLightBackgroundAnimation(color: ColorNames) {
  const animatedColor = useSharedValue(0);

  const handlePressIn = () => {
    animatedColor.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    animatedColor.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  };

  const rgbaString = hexToRGBA(Colors[color][500], 0.3);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedColor.value,
      [0, 1],
      [rgbaString, Colors[color][500]]
    );

    return {
      backgroundColor,
    };
  });

  return { handlePressIn, handlePressOut, animatedStyle };
}

function getBorderRadiusStyle(
  rounded: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
) {
  switch (rounded) {
    case 'sm':
      return { borderRadius: 2 };
    case 'md':
      return { borderRadius: 6 };
    case 'lg':
      return { borderRadius: 8 };
    case 'xl':
      return { borderRadius: 12 };
    case '2xl':
      return { borderRadius: 16 };
    case 'full':
      return { borderRadius: 9999 };
    default:
      return {};
  }
}

function getPaddingStyle(size: 'sm' | 'md' | 'lg') {
  switch (size) {
    case 'sm':
      return { padding: 8 };
    case 'md':
      return { padding: 16 };
    case 'lg':
      return { padding: 24 };
    default:
      return {};
  }
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    color: '#fff', // Default color for solid variant
  },
  solidText: {
    color: '#fff',
  },
});
