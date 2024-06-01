'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/db';
import { IServerFormAction } from '@/hooks';

export interface IDeleteOperationFormValues {
  operationId: string;
}

export const deleteOperation: IServerFormAction<IDeleteOperationFormValues> = async (values) => {
  const { operationId } = values;

  try {
    await prisma.operation.delete({ where: { id: operationId } });
    revalidatePath('/portfolio');
  } catch (err) {
    console.error('Error in deleteOperation action', err);
  }

  return {};
};
