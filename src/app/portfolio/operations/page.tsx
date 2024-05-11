import { getCurrentUser, redirectUnauthorizedUser } from '@/auth';
import { prisma } from '@/db';
import { isArrayNotEmpty } from '@/helpers';
import { Button } from '@atoms';
import { Link } from '@nextui-org/react';
import { IUser } from '@types';

export default async function OperationsPage() {
  await redirectUnauthorizedUser();

  const user = (await getCurrentUser()) as IUser;
  const operations = await prisma.operation.findMany({ where: { userId: user.id } });

  return (
    <>
      <h1 className="text-3xl font-semibold">Операции</h1>
      <Button className="mt-4" color="primary" as={Link} href="/portfolio/operations/add">
        Добавить операцию
      </Button>
      <div className="mt-4">
        {isArrayNotEmpty(operations) ? (
          'Скоро здесь будет список операций...'
        ) : (
          <p className="text-medium">У вас пока нет операций</p>
        )}
      </div>
    </>
  );
}
