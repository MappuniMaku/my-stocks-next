'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import { processOperation } from '@/actions';
import { getShortDateString, isNotEmpty } from '@/helpers';
import { useFormErrors } from '@/hooks';
import { Input, SubmitButton } from '@atoms';
import { Operation } from '@prisma/client';

export interface IOperationFormProps {
  userId: string;
  operation?: Operation;
}

export const OperationForm: FC<IOperationFormProps> = ({ userId, operation }) => {
  const [{ errors }, submit] = useFormState(processOperation, {});

  const { clearErrors, hasError, getErrorMessage } = useFormErrors(errors);

  const isEditing = isNotEmpty(operation);

  return (
    <form className="flex flex-col gap-5" action={submit} onChange={clearErrors}>
      <Input
        label="Дата"
        type="date"
        name="date"
        defaultValue={isEditing ? getShortDateString(operation.date) : undefined}
        errorMessage={getErrorMessage('date')}
        isInvalid={hasError('date')}
        isRequired
      />
      <Input
        label="Сумма"
        type="number"
        name="amount"
        defaultValue={isEditing ? String(operation.amount) : undefined}
        errorMessage={getErrorMessage('amount')}
        isInvalid={hasError('amount')}
        isRequired
      />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="operationId" value={operation?.id} />
      <SubmitButton>{isEditing ? 'Сохранить' : 'Добавить'}</SubmitButton>
    </form>
  );
};
