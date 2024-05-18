'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import { signUp } from '@/actions';
import { useFormErrors } from '@/hooks';
import { Input, SubmitButton } from '@atoms';

export const SignUpForm: FC = () => {
  const [{ errors }, submit] = useFormState(signUp, {});

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
        autoComplete="new-password"
        errorMessage={getErrorMessage('password')}
        isInvalid={hasError('password')}
        isRequired
      />
      <SubmitButton>Зарегистрироваться</SubmitButton>
    </form>
  );
};
