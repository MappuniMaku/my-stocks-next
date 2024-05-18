import { FC } from 'react';
import { prisma } from '@/db';
import { isArrayNotEmpty } from '@/helpers';

export interface IOperationsListProps {
  userId: string;
}

export const OperationsList: FC<IOperationsListProps> = async ({ userId }) => {
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

  return isArrayNotEmpty(operations) ? (
    <ul className="flex flex-col gap-4 text-medium">
      {operations.map((operation, i) => (
        <li key={operation.id} className="flex gap-2">
          <span className="font-semibold">{i + 1}.</span>
          <span className="flex flex-col gap-1">
            <span>
              <span className="font-medium">Дата:</span> {operation.date.toLocaleDateString()}
            </span>
            <span>
              <span className="font-medium">Сумма:</span> {operation.amount} {operation.currency}
            </span>
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-medium">У вас пока нет операций</p>
  );
};
