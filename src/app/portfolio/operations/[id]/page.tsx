import { redirectUnauthorizedUser } from '@/auth';
import { prisma } from '@/db';
import { isNotEmpty } from '@/helpers';
import { OperationForm } from '@organisms';

export default async function EditOperationPage({
  params: { id: operationId },
}: {
  params: { id: string };
}) {
  const userId = await redirectUnauthorizedUser();

  const operation = await prisma.operation.findFirst({ where: { id: operationId } });

  return (
    <>
      <h1 className="text-3xl font-semibold">Редактировать операцию</h1>
      <div className="mt-4">
        {isNotEmpty(operation) ? (
          <OperationForm userId={userId} operation={operation} />
        ) : (
          <p>Не удалось загрузить выбранную операцию</p>
        )}
      </div>
    </>
  );
}
