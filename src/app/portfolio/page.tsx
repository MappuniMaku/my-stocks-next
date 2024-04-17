import { redirectUnauthorizedUser } from '@/auth';

export default async function PortfolioPage() {
  await redirectUnauthorizedUser();

  return <h1 className="mb-4 text-3xl font-semibold">Портфель</h1>;
}
