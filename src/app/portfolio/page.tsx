import { redirectUnauthorizedUser } from '@/auth';

export default async function PortfolioPage() {
  await redirectUnauthorizedUser();

  return <h1 className="text-3xl font-semibold">Портфель</h1>;
}
