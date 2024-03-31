'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import { signUp } from '@/actions';
import { Button, Input } from '@atoms';

export interface ISignUpFormProps {}

export const SignUpForm: FC<ISignUpFormProps> = () => {
  const [{ errors }, submit] = useFormState(signUp, {});

  return (
    <form action={submit} className="flex flex-col gap-4">
      <Input
        label="Имя пользователя"
        type="text"
        name="username"
        autoComplete="username"
        errorMessage={errors?.username}
        isInvalid={!!errors?.username}
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        autoComplete="new-password"
        errorMessage={errors?.password}
        isInvalid={!!errors?.password}
      />
      <Button type="submit">Зарегистрироваться</Button>
    </form>
  );
};
