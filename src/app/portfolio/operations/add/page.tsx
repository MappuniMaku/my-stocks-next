import { redirectUnauthorizedUser } from '@/auth';
import { OperationForm } from '@organisms';

export default async function AddOperationPage() {
  const userId = await redirectUnauthorizedUser();

  return (
    <>
      <h1 className="text-3xl font-semibold">Добавить операцию</h1>
      <div className="mt-4">
        <OperationForm userId={userId} />
      </div>
    </>
  );
}
