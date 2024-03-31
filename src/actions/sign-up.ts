'use server';

interface ISignUpResult {
  errors?: Partial<Record<'username' | 'password', string>>;
}

export const signUp = async (_: ISignUpResult, formData: FormData): Promise<ISignUpResult> => {
  console.log('signUp action called', formData);
  return {
    errors: {
      username: 'Такой пользователь уже существует',
      password: 'Слишком короткий пароль',
    },
  };
};
