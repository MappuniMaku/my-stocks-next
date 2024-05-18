'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/db';
import { parseFormData } from '@/helpers';

interface IDeleteOperationFormValues {
  operationId: string;
}

export const deleteOperation = async (_: void, formData: FormData): Promise<void> => {
  const { operationId } = parseFormData<IDeleteOperationFormValues>(formData);

  try {
    await prisma.operation.delete({ where: { id: operationId } });
    revalidatePath('/portfolio');
  } catch (err) {
    console.error('Error in deleteOperation action', err);
  }
};
