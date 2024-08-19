import { Colors } from '@/constants/Colors';
import { hexToRGBA } from '@/utils/utils';
import { Pressable, PressableProps, Text } from 'react-native';
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
  txtClassName,
  ...rest
}: ButtonProps) {
  const baseStyle = 'w-full items-center';
  const baseTextStyle = 'font-semibold';

  const roundedStyle = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  }[rounded];
  const sizeStyle = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  }[size];

  const textVariantStyle = {
    solid: `text-white`,
    outline: `text-${color}-500`,
    light: `text-${color}-900`,
    shadow: `text-white`,
  }[variant];

  const solidAnimation = useSolidBackgroundAnimation(color);
  const lightAnimation = useLightBackgroundAnimation(color);

  const { handlePressIn, handlePressOut, animatedStyle } =
    variant === 'solid' ? solidAnimation : lightAnimation;

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={`${baseStyle} ${roundedStyle} ${sizeStyle} ${txtClassName}`}
      style={animatedStyle}
      {...rest}
    >
      <Text
        className={`${baseTextStyle} ${textVariantStyle}`}
        style={{ fontFamily: 'Nunito' }}
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
      [rgbaString, Colors[color][600]]
    );

    return {
      backgroundColor,
    };
  });

  return { handlePressIn, handlePressOut, animatedStyle };
}
