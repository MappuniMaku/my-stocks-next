import { FC } from 'react';
import { prisma } from '@/db';
import { isArrayNotEmpty } from '@/helpers';
import { DeleteOperationButton } from './components';

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
      {operations.map(({ id, date, amount, currency }, i) => (
        <li key={id} className="flex gap-2">
          <span className="font-semibold">{i + 1}.</span>
          <span className="flex flex-col gap-1">
            <span>
              <span className="font-medium">Дата:</span> {date.toLocaleDateString()}
            </span>
            <span>
              <span className="font-medium">Сумма:</span> {amount} {currency}
            </span>
          </span>
          <span className="ml-4 self-center">
            <DeleteOperationButton operationId={id} />
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-medium">У вас пока нет операций</p>
  );
};
