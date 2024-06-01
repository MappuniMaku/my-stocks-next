'use client';

import { FC } from 'react';
import { MdDelete } from 'react-icons/md';
import { deleteOperation } from '@/actions';
import { useServerForm } from '@/hooks';
import { SubmitButton } from '@atoms';
import { getDefaultValues } from './helpers';

export interface IDeleteOperationButtonProps {
  operationId: string;
}

export const DeleteOperationButton: FC<IDeleteOperationButtonProps> = ({ operationId }) => {
  const { submit } = useServerForm({
    action: deleteOperation,
    getDefaultValues: () => getDefaultValues(operationId),
  });

  return (
    <form action={submit}>
      <SubmitButton color="danger" startContent={<MdDelete />}>
        Удалить
      </SubmitButton>
    </form>
  );
};
