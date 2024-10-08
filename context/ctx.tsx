import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import { AuthAPI } from '@/api/auth.api';
import { SignInData } from '@/types/auth';

const AuthContext = createContext<{
  signIn: (credentials: SignInData) => void;
  biometricAuth: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  isBiometricAuth: boolean;
  setIsBiometricAuth: (value: boolean) => void;
}>({
  signIn: () => null,
  biometricAuth: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  isBiometricAuth: false,
  setIsBiometricAuth: () => null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [isBiometricAuth, setIsBiometricAuth] = useState(false);

  useEffect(() => {
    const loadBiometric = async () => {
      try {
        const savedBiometric = await AsyncStorage.getItem('isBiometricAuth');
        if (savedBiometric) {
          setIsBiometricAuth(savedBiometric === 'true');
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadBiometric();
  }, []);

  const saveBiometric = async (value: boolean) => {
    setIsBiometricAuth(value);
    try {
      if (!value) {
        await AsyncStorage.removeItem('isBiometricAuth');
      } else {
        await AsyncStorage.setItem('isBiometricAuth', value.toString());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const auth = async (credentials: SignInData) => {
    try {
      const authAPI = new AuthAPI();
      const result = await authAPI.login(credentials);
      if (result.success) {
        if (result.data) {
          setSession(result.data);
          router.replace('/');
        }
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setSession('xxx');
        router.replace('/');
      } else {
        console.log('La autenticación biométrica falló');
      }
    } catch (error) {
      console.log('Error en la autenticación biométrica:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: async (credentials: SignInData) => {
          await auth(credentials);
        },
        biometricAuth: async () => {
          await handleBiometricAuth();
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        isBiometricAuth,
        setIsBiometricAuth: saveBiometric,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
