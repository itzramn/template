import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import { AuthAPI } from '@/api/auth.api';
import { SignInData } from '@/types/auth';

const AuthContext = createContext<{
  signIn: (credentials: SignInData) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  isBiometricAuth: boolean;
  setIsBiometricAuth: (value: boolean) => void;
}>({
  signIn: () => null,
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
  const [isBiometricAuth, setIsBiometricAuth] = useState(true);

  const auth = async (credentials: SignInData) => {
    try {
      const authAPI = new AuthAPI();
      const result = await authAPI.login(credentials);

      if (result.success) {
        setSession('xxx');
        router.replace('/');
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const biometricAuth = async () => {
    console.log('Iniciando autenticación biométrica');
    try {
      const result = await LocalAuthentication.authenticateAsync();
      console.log('Resultado de la autenticación biométrica:', result);
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
          console.log('Iniciando proceso de inicio de sesión');
          if (isBiometricAuth) {
            console.log('Intentando autenticación biométrica');
            await biometricAuth();
          } else {
            console.log('Intentando autenticación con credenciales');
            await auth(credentials);
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        isBiometricAuth,
        setIsBiometricAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
