import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemeContextType = {
  theme: ColorSchemeName;
  changeTheme: (theme: ColorSchemeName) => Promise<void>;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ColorSchemeName>(undefined);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          const newTheme = savedTheme as ColorSchemeName;
          setTheme(newTheme);
          Appearance.setColorScheme(newTheme);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadTheme();
  }, []);

  const changeTheme = async (newTheme: ColorSchemeName) => {
    setTheme(newTheme);
    Appearance.setColorScheme(newTheme);
    try {
      if (!newTheme) {
        await AsyncStorage.removeItem('theme');
      } else {
        await AsyncStorage.setItem('theme', newTheme);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
