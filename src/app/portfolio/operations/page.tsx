import { redirectUnauthorizedUser } from '@/auth';

export default async function OperationsPage() {
  await redirectUnauthorizedUser();

  return <h1 className="mb-4 text-3xl font-semibold">Операции</h1>;
}
