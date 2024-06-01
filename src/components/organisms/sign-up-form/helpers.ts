import { ISignUpFormValues } from '@/actions';

export const getDefaultValues = (): ISignUpFormValues => ({
  username: '',
  password: '',
});
