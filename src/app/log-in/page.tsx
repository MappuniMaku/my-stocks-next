import { redirect } from 'next/navigation';
import { getCurrentSession } from '@/auth';
import { isNotEmpty } from '@/helpers';
import { Link } from '@nextui-org/react';
import { LogInForm } from '@organisms';

export default async function LogInPage() {
  const { user } = await getCurrentSession();

  if (isNotEmpty(user)) {
    redirect('/');
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-3xl font-semibold">Вход</h1>
      <LogInForm />
      <p className="mt-6">
        Еще не зарегистрированы? <Link href="/sign-up">Зарегистрироваться</Link>
      </p>
    </div>
  );
}
