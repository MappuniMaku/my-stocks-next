'use client';

import { FC } from 'react';
import { signUp } from '@/actions';
import { getInputChangeHandler } from '@/helpers';
import { useFormErrors, useServerForm } from '@/hooks';
import { Input, SubmitButton } from '@atoms';
import { getDefaultValues } from './helpers';

export const SignUpForm: FC = () => {
  const { values, setValues, errors, submit } = useServerForm({
    action: signUp,
    getDefaultValues: getDefaultValues,
  });
  const { clearErrors, hasError, getErrorMessage } = useFormErrors(errors);

  const { username, password } = values;

  const handleChange = getInputChangeHandler(setValues);

  return (
    <form className="flex flex-col gap-5" action={submit} onChange={clearErrors}>
      <Input
        label="Имя пользователя"
        type="text"
        value={username}
        autoComplete="username"
        errorMessage={getErrorMessage('username')}
        isInvalid={hasError('username')}
        isRequired
        onChange={handleChange('username')}
      />
      <Input
        label="Пароль"
        type="password"
        value={password}
        autoComplete="new-password"
        errorMessage={getErrorMessage('password')}
        isInvalid={hasError('password')}
        isRequired
        onChange={handleChange('password')}
      />
      <SubmitButton>Зарегистрироваться</SubmitButton>
    </form>
  );
};
