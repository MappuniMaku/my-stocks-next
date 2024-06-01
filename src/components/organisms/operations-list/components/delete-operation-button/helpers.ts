import { IDeleteOperationFormValues } from '@/actions';

export const getDefaultValues = (operationId: string): IDeleteOperationFormValues => ({
  operationId,
});
