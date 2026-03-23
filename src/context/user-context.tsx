'use client';

import { fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { set } from 'zod/v3';

import { fetchMe } from '@/dal/users';
import { Me } from '@/types/api';

interface UserContextType {
  user?: Me;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<Me | undefined>>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Me>();
  const [isLoading, setIsLoading] = useState(true);

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

  const refreshUser = async () => {
    setIsLoading(true);
    await fetchUser();
  };

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
        case 'tokenRefresh': {
          fetchUser();
          break;
        }
        case 'signedOut': {
          setUser(undefined);
          setIsLoading(false);
          break;
        }
      }
    });

    fetchUser();

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, refreshUser }}>
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
