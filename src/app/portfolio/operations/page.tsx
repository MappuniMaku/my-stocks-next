import { redirectUnauthorizedUser } from '@/auth';
import { prisma } from '@/db';
import { isArrayNotEmpty } from '@/helpers';
import { Button } from '@atoms';
import { Link } from '@nextui-org/react';

export default async function OperationsPage() {
  const userId = await redirectUnauthorizedUser();

  const { operations } =
    (await prisma.user.findFirst({
      where: { id: userId },
      include: {
        operations: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    })) ?? {};

  return (
    <>
      <h1 className="text-3xl font-semibold">Операции</h1>
      <Button className="mt-4" color="primary" as={Link} href="/portfolio/operations/add">
        Добавить операцию
      </Button>
      <div className="mt-6">
        {isArrayNotEmpty(operations) ? (
          <ul className="flex flex-col gap-4 text-medium">
            {operations.map((operation, i) => (
              <li key={operation.id} className="flex gap-2">
                <span className="font-semibold">{i + 1}.</span>
                <span className="flex flex-col gap-1">
                  <span>
                    <span className="font-medium">Дата:</span> {operation.date.toLocaleDateString()}
                  </span>
                  <span>
                    <span className="font-medium">Сумма:</span> {operation.amount}{' '}
                    {operation.currency}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-medium">У вас пока нет операций</p>
        )}
      </div>
    </>
  );
}
