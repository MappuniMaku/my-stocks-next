'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/auth';
import { prisma } from '@/db';
import { flattenValidationErrors, getAuthFormSchema, isEmpty } from '@/helpers';
import { IServerFormAction } from '@/hooks';

export interface ILogInFormValues {
  username: string;
  password: string;
}

export const logIn: IServerFormAction<ILogInFormValues> = async (values) => {
  const { username, password } = values;

  const validationResult = getAuthFormSchema().safeParse({ username, password });

  if (!validationResult.success) {
    return {
      errors: flattenValidationErrors(validationResult.error),
    };
  }

  try {
    const existingUser = await prisma.user.findFirst({ where: { username } });
    if (isEmpty(existingUser)) {
      return {
        errors: {
          username: 'Пользователь с таким именем не найден',
        },
      };
    }

    const validPassword = await new Argon2id().verify(existingUser.hashedPassword, password);
    if (!validPassword) {
      return {
        errors: {
          password: 'Неверный пароль',
        },
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  } catch (err) {
    console.error('Error in logIn action', err);
  }

  redirect('/portfolio');
};
