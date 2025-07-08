'use client';

import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from 'aws-amplify/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type AuthUser = {
  username: string;
  email?: string;
  name?: string;
  image?: string;
  isAdmin: boolean;
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
      const session = await fetchAuthSession();

      if (!session.tokens) {
        setUser(undefined);
        return;
      }

      const { username } = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      const groups = session.tokens.accessToken.payload['cognito:groups'] as
        | string[]
        | undefined;

      const userData: AuthUser = {
        username,
        email: attributes.email,
        name: attributes.name,
        image: attributes.picture,
        isAdmin: groups?.includes('Admins') ?? false,
      };

      setUser(userData);
    } catch (error) {
      console.error('Error fetching user', error);
      setUser(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    setIsLoading(true);
    console.log('refreshing user');
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
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
