import { redirectUnauthorizedUser } from '@/auth';

export default async function AddOperationPage() {
  await redirectUnauthorizedUser();

  return <h1 className="text-3xl font-semibold">Добавить операцию</h1>;
}
