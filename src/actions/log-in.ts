'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/auth';
import { prisma } from '@/db';
import { flattenValidationErrors, getAuthFormSchema, isEmpty } from '@/helpers';

interface ILogInFormValues {
  username: string;
  password: string;
}

interface ILogInResult {
  errors?: Partial<Record<keyof ILogInFormValues, string>>;
}

export const logIn = async (_: ILogInResult, formData: FormData): Promise<ILogInResult> => {
  const { username, password } = Object.fromEntries(
    formData.entries(),
  ) as unknown as ILogInFormValues;

  const validationResult = getAuthFormSchema().safeParse({ username, password });

  if (!validationResult.success) {
    return {
      errors: flattenValidationErrors(validationResult.error),
    };
  }

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
  return redirect('/portfolio');
};
