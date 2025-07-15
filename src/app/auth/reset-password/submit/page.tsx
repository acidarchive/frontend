import { AuthLayout } from '@/components/layouts/auth-layout';
import { SubmitPasswordResetForm } from '@/components/organisms/auth/submit-password-reset-form';

export default function SubmitPasswordReset() {
  return (
    <AuthLayout>
      <h2 className="mb-10 text-center text-2xl/9 font-bold">
        Please enter your email to get confirmation code.
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SubmitPasswordResetForm />
      </div>
    </AuthLayout>
  );
}
