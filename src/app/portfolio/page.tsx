import { redirect } from 'next/navigation';
import { getCurrentSession } from '@/auth';
import { isEmpty } from '@/helpers';

export default async function PortfolioPage() {
  const { user } = await getCurrentSession();

  if (isEmpty(user)) {
    redirect('/log-in');
  }

  return <h1 className="mb-4 text-3xl font-semibold">Портфель</h1>;
}
