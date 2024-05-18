import { Suspense } from 'react';
import { redirectUnauthorizedUser } from '@/auth';
import { EditOperation } from '@organisms';

export default async function EditOperationPage({
  params: { id: operationId },
}: {
  params: { id: string };
}) {
  const userId = await redirectUnauthorizedUser();

  return (
    <>
      <h1 className="text-3xl font-semibold">Редактировать операцию</h1>
      <div className="mt-4">
        <Suspense fallback={<p>Загружаем операцию...</p>}>
          <EditOperation userId={userId} operationId={operationId} />
        </Suspense>
      </div>
    </>
  );
}
