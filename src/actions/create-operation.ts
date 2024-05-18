'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { DEFAULT_CURRENCY } from '@/constants/misc';
import { prisma } from '@/db';
import { flattenValidationErrors, isStringNotEmpty, requiredDate, requiredNumber } from '@/helpers';

interface ICreateOperationFormValues {
  date: string;
  amount: string;
  userid: string;
}

interface ICreateOperationResult {
  errors?: Partial<Record<keyof ICreateOperationFormValues, string>>;
}

export const createOperation = async (
  _: ICreateOperationResult,
  formData: FormData,
): Promise<ICreateOperationResult> => {
  const { date, amount, userid } = Object.fromEntries(
    formData.entries(),
  ) as unknown as ICreateOperationFormValues;

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
    await prisma.operation.create({
      data: {
        date: new Date(date),
        amount: Number(amount),
        currency: DEFAULT_CURRENCY,
        userId: userid,
      },
    });

    revalidatePath('/portfolio');
  } catch (err) {
    console.error('Error in createOperation action', err);
  }

  redirect('/portfolio/operations');
};
