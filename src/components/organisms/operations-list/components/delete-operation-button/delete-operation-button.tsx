'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import { deleteOperation } from '@/actions';
import { SubmitButton } from '@atoms';

export interface IDeleteOperationButtonProps {
  operationId: string;
}

export const DeleteOperationButton: FC<IDeleteOperationButtonProps> = ({ operationId }) => {
  const [, submit] = useFormState(deleteOperation, undefined);

  return (
    <form action={submit}>
      <input type="hidden" name="operationId" value={operationId} />
      <SubmitButton color="danger">Удалить</SubmitButton>
    </form>
  );
};
