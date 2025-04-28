import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import * as cognitoActions from '@/app/lib/cognito-actions';
import { render, screen } from '@/tests/utils';

import { UserMenu } from './user-menu';

vi.mock('@/app/lib/cognito-actions', async () => {
  return {
    handleSignOut: vi.fn(),
  };
});

describe('UserMenu', () => {
  it('renders username', () => {
    render(
      <UserMenu
        user={{
          username: 'testuser',
          email: '',
          name: '',
          image: '',
          isAdmin: false,
        }}
      />,
    );

    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('signs out', async () => {
    render(
      <UserMenu
        user={{
          username: 'testuser',
          email: '',
          name: '',
          image: '',
          isAdmin: false,
        }}
      />,
    );

    await userEvent.click(screen.getByText('testuser'));

    await userEvent.click(screen.getByRole('menuitem', { name: /sign out/i }));

    expect(cognitoActions.handleSignOut).toHaveBeenCalled();
  });
});
