import { IProcessOperationFormValues } from '@/actions';
import { getShortDateString, isNotEmpty } from '@/helpers';
import { Operation } from '@prisma/client';

export const getDefaultValues = (
  userId: string,
  operation?: Operation,
): IProcessOperationFormValues => ({
  date: isNotEmpty(operation) ? getShortDateString(operation.date) : '',
  amount: isNotEmpty(operation) ? String(operation.amount) : '',
  userId,
  operationId: operation?.id,
});
