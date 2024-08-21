import { useContext, createContext, type PropsWithChildren } from 'react';
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
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
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
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      setSession('xxx');
      router.replace('/');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: async (credentials: SignInData) => {
          //Se validara que el usuario tenga activado la opcion de
          //datos biometricos, si no se le pedira que ingrese sus datos
          // if (credentials.email === '' || credentials.password === '') {
          //   biometricAuth();
          // } else {
          //   await auth(credentials);
          // }
          await auth(credentials);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
