'use client';

import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { fetchMe } from '@/dal/users';

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
};

interface UserContextType {
  user?: AuthUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | undefined>>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const [session, { username }, attributes] = await Promise.all([
        fetchAuthSession(),
        getCurrentUser(),
        fetchUserAttributes(),
      ]);

      if (!session.tokens) {
        setUser(undefined);
        return;
      }

      const me = await fetchMe();

      if (!attributes.sub || !attributes.email || !me.avatar_url) {
        console.error('Missing required user attributes');
        setUser(undefined);
        return;
      }

      const userData: AuthUser = {
        id: attributes.sub,
        username,
        email: attributes.email,
        avatar: me.avatar_url,
      };

      setUser(userData);
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
