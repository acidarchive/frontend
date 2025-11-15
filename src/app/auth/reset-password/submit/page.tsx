import { SubmitResetPassword } from '@/features/auth';

export default function Page() {
  return (
    <>
      <h2 className="mb-10 text-center text-2xl/9 font-bold">
        Please enter your email to get confirmation code.
      </h2>
      <SubmitResetPassword />
    </>
  );
}
