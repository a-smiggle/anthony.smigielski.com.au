import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import Supabase from './Supabase';

interface UserContextValue {
  session: Session | boolean;
  user?: User;
}
export const UserContext = createContext<UserContextValue>({
  session: false,
  user: undefined,
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};

export const RequireAuth = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
};

export const AuthRedirect = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const current = window.sessionStorage.getItem('currentPath');
      router.push(current ?? '/');
    }
  }, [user, router]);
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const session = Supabase.auth.session();
    setSession(session ?? false);
    setUser(session?.user ?? undefined);
    const { data: authListener } = Supabase.auth.onAuthStateChange(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      async (event, session) => {
        setSession(session ?? false);
        setUser(session?.user ?? undefined);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const AuthUser = () => {
  const { user } = useUser();
  return user;
};

export default AuthUser;
