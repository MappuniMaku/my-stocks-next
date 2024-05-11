'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import { createOperation } from '@/actions';
import { isNotEmpty } from '@/helpers';
import { Button, DatePicker, Input } from '@atoms';

export interface IOperationFormProps {
  userId: string;
}

export const OperationForm: FC<IOperationFormProps> = ({ userId }) => {
  const [{ errors }, submit] = useFormState(createOperation, {});

  return (
    <form action={submit} className="flex flex-col gap-5">
      <DatePicker
        label="Дата"
        name="date"
        errorMessage={errors?.date}
        isInvalid={isNotEmpty(errors?.date)}
        isRequired
      />
      <Input
        label="Сумма"
        type="number"
        name="amount"
        errorMessage={errors?.amount}
        isInvalid={isNotEmpty(errors?.amount)}
        isRequired
      />
      <input name="userid" value={userId} hidden readOnly />
      <Button type="submit">Добавить</Button>
    </form>
  );
};
