'use server';

import { generateId } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/auth';
import { prisma } from '@/db';
import { flattenValidationErrors, getAuthFormSchema, isNotEmpty } from '@/helpers';

type ISignUpFormFields = 'username' | 'password';

interface ISignUpResult {
  errors?: Partial<Record<ISignUpFormFields, string>>;
}

export const signUp = async (_: ISignUpResult, formData: FormData): Promise<ISignUpResult> => {
  const { username, password } = Object.fromEntries(formData.entries()) as Record<
    ISignUpFormFields,
    string
  >;

  const validationResult = getAuthFormSchema().safeParse({ username, password });

  if (!validationResult.success) {
    return {
      errors: flattenValidationErrors(validationResult.error),
    };
  }

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
  return redirect('/');
};
