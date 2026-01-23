// Mock for aws-amplify/auth in Storybook
export const fetchAuthSession = async () => ({
  tokens: {
    accessToken: {
      payload: {
        'cognito:groups': [],
      },
    },
  },
});

export const getCurrentUser = async () => ({
  username: 'testuser',
});

export const fetchUserAttributes = async () => ({
  email: 'test@email.com',
  name: 'Test User',
  picture: 'https://placehold.co/100',
});

export const signOut = async () => {};
export const signIn = async () => ({ nextStep: { signInStep: 'DONE' } });
export const signUp = async () => ({});
export const confirmSignUp = async () => ({});
export const resendSignUpCode = async () => ({});
export const resetPassword = async () => ({});
export const confirmResetPassword = async () => ({});
export const updatePassword = async () => ({});
export const updateUserAttributes = async () => ({});
