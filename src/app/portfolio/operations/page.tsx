import { redirectUnauthorizedUser } from '@/auth';

export default async function OperationsPage() {
  await redirectUnauthorizedUser();

  return <h1 className="text-3xl font-semibold">Операции</h1>;
}
