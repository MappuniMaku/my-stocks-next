import { z, ZodDate, ZodError, ZodNumber, ZodString } from 'zod';
import { ERROR_MESSAGES } from '@/constants';

export const flattenValidationErrors = <T extends string>(
  errors: ZodError<Partial<Record<T, string[]>>>,
): Partial<Record<T, string>> =>
  (Object.keys(errors.formErrors.fieldErrors) as T[]).reduce(
    (acc, key) => ({
      ...acc,
      [key]: errors.formErrors.fieldErrors[key]?.[0],
    }),
    {} as Partial<Record<T, string>>,
  );

export const getAuthFormSchema = () =>
  z.object({
    username: z
      .string()
      .min(3, 'Минимум 3 символа')
      .max(30, 'Не более 30 символов')
      .regex(/^[a-zA-Z0-9]+$/, 'Только латинские буквы и цифры'),
    password: z.string().min(6, 'Минимум 6 символов').max(255, 'Слишком длинное значение'),
  });

export const requiredDate = (): ZodDate => z.date({ required_error: ERROR_MESSAGES.required });

export const requiredNumber = (): ZodNumber =>
  z.number({ required_error: ERROR_MESSAGES.required });

export const requiredString = (): ZodString =>
  z.string({ required_error: ERROR_MESSAGES.required });
