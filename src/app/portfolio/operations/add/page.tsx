import { getCurrentUser, redirectUnauthorizedUser } from '@/auth';
import { OperationForm } from '@organisms';
import { IUser } from '@types';

export default async function AddOperationPage() {
  await redirectUnauthorizedUser();

  const user = (await getCurrentUser()) as IUser;

  return (
    <>
      <h1 className="text-3xl font-semibold">Добавить операцию</h1>
      <div className="mt-4">
        <OperationForm userId={user.id} />
      </div>
    </>
  );
}
