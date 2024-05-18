import { FC } from 'react';
import { MdEdit } from 'react-icons/md';
import { prisma } from '@/db';
import { isArrayNotEmpty } from '@/helpers';
import { Button } from '@atoms';
import { Link } from '@nextui-org/react';
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
    <ul className="flex flex-col gap-6 text-medium">
      {operations.map(({ id, date, amount, currency }, i) => (
        <li key={id} className="flex flex-col gap-4 sm:flex-row">
          <span className="flex w-44 gap-2">
            <span className="font-semibold">{i + 1}.</span>
            <span className="flex flex-col gap-1">
              <span>
                <span className="font-medium">Дата:</span> {date.toLocaleDateString()}
              </span>
              <span>
                <span className="font-medium">Сумма:</span> {amount} {currency}
              </span>
            </span>
          </span>
          <span className="flex gap-2">
            <Button
              startContent={<MdEdit />}
              as={Link}
              href={`/portfolio/operations/${id}`}
              color="secondary"
            >
              Редактировать
            </Button>
            <DeleteOperationButton operationId={id} />
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-medium">У вас пока нет операций</p>
  );
};
