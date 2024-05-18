import { FC } from 'react';
import { prisma } from '@/db';
import { isNotEmpty } from '@/helpers';
import { OperationForm } from '../operation-form';

export interface IEditOperationProps {
  userId: string;
  operationId: string;
}

export const EditOperation: FC<IEditOperationProps> = async ({ userId, operationId }) => {
  const operation = await prisma.operation.findFirst({ where: { id: operationId } });

  return isNotEmpty(operation) ? (
    <OperationForm userId={userId} operation={operation} />
  ) : (
    <p>Не удалось загрузить выбранную операцию</p>
  );
};
