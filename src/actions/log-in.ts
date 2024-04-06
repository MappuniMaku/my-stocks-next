'use server';

interface ILogInResult {
  errors?: Partial<Record<'username' | 'password', string>>;
}

export const logIn = async (_: ILogInResult, formData: FormData): Promise<ILogInResult> => {
  console.log('logIn action called', formData);
  return {
    errors: {
      username: 'Пользователь с таким именем не найден',
      password: 'Неверный пароль',
    },
  };
};
