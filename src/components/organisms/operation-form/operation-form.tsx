'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import { createOperation } from '@/actions';
import { useFormErrors } from '@/hooks';
import { DatePicker, Input, SubmitButton } from '@atoms';

export interface IOperationFormProps {
  userId: string;
}

export const OperationForm: FC<IOperationFormProps> = ({ userId }) => {
  const [{ errors }, submit] = useFormState(createOperation, {});

  const { clearErrors, hasError, getErrorMessage } = useFormErrors(errors);

  return (
    <form className="flex flex-col gap-5" action={submit} onChange={clearErrors}>
      <DatePicker
        label="Дата"
        name="date"
        errorMessage={getErrorMessage('date')}
        isInvalid={hasError('date')}
        isRequired
      />
      <Input
        label="Сумма"
        type="number"
        name="amount"
        errorMessage={getErrorMessage('amount')}
        isInvalid={hasError('amount')}
        isRequired
      />
      <input type="hidden" name="userid" value={userId} />
      <SubmitButton>Добавить</SubmitButton>
    </form>
  );
};
