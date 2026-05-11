'use client';

import { fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import React, {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from 'react';

import { handleSignOut } from '@/dal/auth';
import { fetchMe } from '@/dal/users';
import { Me } from '@/types/api';

interface UserContextType {
  user?: Me;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Me>();
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        setUser(undefined);
        return;
      }

      const me = await fetchMe();
      setUser(me);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await handleSignOut();
    startTransition(() => {
      setUser(undefined);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          setUser(undefined);
          return;
        }
        const me = await fetchMe();
        setUser(me);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    const handleAuthEvent = async ({
      payload,
    }: {
      payload: { event: string };
    }) => {
      switch (payload.event) {
        case 'signedIn':
        case 'tokenRefresh': {
          await fetchUser();
          break;
        }
        case 'signedOut': {
          startTransition(() => {
            setUser(undefined);
            setIsLoading(false);
          });
          break;
        }
      }
    };

    const unsubscribe = Hub.listen('auth', handleAuthEvent);
    fetchUser();
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, refreshUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
