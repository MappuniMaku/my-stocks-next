'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import { signUp } from '@/actions';
import { isNotEmpty } from '@/helpers';
import { Button, Input } from '@atoms';

export const SignUpForm: FC = () => {
  const [{ errors }, submit] = useFormState(signUp, {});

  return (
    <form action={submit} className="flex flex-col gap-5">
      <Input
        label="Имя пользователя"
        type="text"
        name="username"
        autoComplete="username"
        errorMessage={errors?.username}
        isInvalid={isNotEmpty(errors?.username)}
        isRequired
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        autoComplete="new-password"
        errorMessage={errors?.password}
        isInvalid={isNotEmpty(errors?.password)}
        isRequired
      />
      <Button type="submit">Зарегистрироваться</Button>
    </form>
  );
};
