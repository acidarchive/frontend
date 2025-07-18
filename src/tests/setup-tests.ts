import { createContext, createElement } from 'react';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('aws-amplify/auth', () => ({
  fetchAuthSession: vi.fn(async () => ({
    tokens: {
      accessToken: {
        payload: {
          'cognito:groups': ['Users'],
        },
      },
    },
  })),
  fetchUserAttributes: vi.fn(async () => ({
    email: 'test@example.com',
    name: 'Test User',
    picture: 'https://example.com/avatar.jpg',
  })),
  getCurrentUser: vi.fn(async () => ({
    username: 'testuser',
  })),
}));

vi.mock('@/context/user-context', () => {
  const mockUser = {
    username: 'testuser',
    email: 'test@example.com',
    name: 'Test User',
    image: 'https://example.com/avatar.jpg',
    isAdmin: false,
  };

  const mockContextValue = {
    user: mockUser,
    isLoading: false,
    setUser: vi.fn(),
    refreshUser: vi.fn(),
  };

  const UserContext = createContext(mockContextValue);

  const UserProvider = ({ children }: { children: React.ReactNode }) => {
    return createElement(
      UserContext.Provider,
      { value: mockContextValue },
      children,
    );
  };

  return {
    UserProvider,
    useUser: () => mockContextValue,
    __esModule: true,
  };
});
