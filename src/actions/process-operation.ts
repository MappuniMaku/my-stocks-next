'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { DEFAULT_CURRENCY } from '@/constants';
import { prisma } from '@/db';
import { flattenValidationErrors, isStringNotEmpty, requiredDate, requiredNumber } from '@/helpers';
import { IServerFormAction } from '@/hooks';
import { Operation } from '@prisma/client';

export interface IProcessOperationFormValues {
  date: string;
  amount: string;
  userId: string;
  operationId?: string;
}

export const processOperation: IServerFormAction<IProcessOperationFormValues> = async (values) => {
  const { date, amount, userId, operationId } = values;

  const validationResult = z
    .object({
      date: requiredDate().max(new Date(), { message: 'Дата не может быть в будущем' }),
      amount: requiredNumber().nonnegative(),
    })
    .safeParse({
      date: isStringNotEmpty(date) ? new Date(date) : undefined,
      amount: isStringNotEmpty(amount) ? Number(amount) : undefined,
    });

  if (!validationResult.success) {
    return {
      errors: flattenValidationErrors(validationResult.error),
    };
  }

  try {
    const isEditing = isStringNotEmpty(operationId);

    const payload: Omit<Operation, 'id'> = {
      date: new Date(date),
      amount: Number(amount),
      currency: DEFAULT_CURRENCY,
      userId,
    };

    if (isEditing) {
      await prisma.operation.update({ where: { id: operationId }, data: payload });
    } else {
      await prisma.operation.create({ data: payload });
    }
    revalidatePath('/portfolio');
  } catch (err) {
    console.error('Error in createOperation action', err);
  }

  redirect('/portfolio/operations');
};
