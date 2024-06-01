'use server';

import { generateId } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/auth';
import { prisma } from '@/db';
import { flattenValidationErrors, getAuthFormSchema, isNotEmpty } from '@/helpers';
import { IServerFormAction } from '@/hooks';

export interface ISignUpFormValues {
  username: string;
  password: string;
}

export const signUp: IServerFormAction<ISignUpFormValues> = async (values) => {
  const { username, password } = values;

  const validationResult = getAuthFormSchema().safeParse({ username, password });

  if (!validationResult.success) {
    return {
      errors: flattenValidationErrors(validationResult.error),
    };
  }

  try {
    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    const existingUser = await prisma.user.findFirst({ where: { username } });
    if (isNotEmpty(existingUser)) {
      return {
        errors: {
          username: 'Такой пользователь уже существует',
        },
      };
    }

    await prisma.user.create({
      data: {
        id: userId,
        username,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  } catch (err) {
    console.error('Error in signUp action', err);
  }

  redirect('/portfolio');
};
