'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import { logIn } from '@/actions';
import { useFormErrors } from '@/hooks';
import { Input, SubmitButton } from '@atoms';

export const LogInForm: FC = () => {
  const [{ errors }, submit] = useFormState(logIn, {});

  const { clearErrors, hasError, getErrorMessage } = useFormErrors(errors);

  return (
    <form className="flex flex-col gap-5" action={submit} onChange={clearErrors}>
      <Input
        label="Имя пользователя"
        type="text"
        name="username"
        autoComplete="username"
        errorMessage={getErrorMessage('username')}
        isInvalid={hasError('username')}
        isRequired
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        autoComplete="password"
        errorMessage={getErrorMessage('password')}
        isInvalid={hasError('password')}
        isRequired
      />
      <SubmitButton>Войти</SubmitButton>
    </form>
  );
};
