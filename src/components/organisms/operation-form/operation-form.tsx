'use client';

import { FC } from 'react';
import { processOperation } from '@/actions';
import { getInputChangeHandler, isNotEmpty } from '@/helpers';
import { useFormErrors, useServerForm } from '@/hooks';
import { Input, SubmitButton } from '@atoms';
import { Operation } from '@prisma/client';
import { getDefaultValues } from './helpers';

export interface IOperationFormProps {
  userId: string;
  operation?: Operation;
}

export const OperationForm: FC<IOperationFormProps> = ({ userId, operation }) => {
  const { values, setValues, errors, submit } = useServerForm({
    action: processOperation,
    getDefaultValues: () => getDefaultValues(userId, operation),
  });
  const { clearErrors, hasError, getErrorMessage } = useFormErrors(errors);

  const { date, amount } = values;
  const isEditing = isNotEmpty(operation);

  const handleChange = getInputChangeHandler(setValues);

  return (
    <form className="flex flex-col gap-5" action={submit} onChange={clearErrors}>
      <Input
        label="Дата"
        type="date"
        value={date}
        errorMessage={getErrorMessage('date')}
        isInvalid={hasError('date')}
        isRequired
        onChange={handleChange('date')}
      />
      <Input
        label="Сумма"
        type="number"
        value={amount}
        errorMessage={getErrorMessage('amount')}
        isInvalid={hasError('amount')}
        isRequired
        onChange={handleChange('amount')}
      />
      <SubmitButton>{isEditing ? 'Сохранить' : 'Добавить'}</SubmitButton>
    </form>
  );
};
