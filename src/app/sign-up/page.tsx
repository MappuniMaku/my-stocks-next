import { redirect } from 'next/navigation';
import { getCurrentSession } from '@/auth';
import { isNotEmpty } from '@/helpers';
import { SignUpForm } from '@organisms';

export default async function SignUpPage() {
  const { user } = await getCurrentSession();

  if (isNotEmpty(user)) {
    redirect('/');
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-3xl font-semibold">Регистрация</h1>
      <SignUpForm />
    </div>
  );
}
