export const isNotEmpty = <T>(value: T | null | undefined): value is NonNullable<T> =>
  value !== null && value !== undefined;

export const isEmpty = <T>(value: T | null | undefined): value is null | undefined =>
  !isNotEmpty(value);

export const isStringNotEmpty = <T extends string>(
  value: T | undefined | null,
): value is NonNullable<T> => (value ?? '').trim() !== '';

export const isArrayNotEmpty = <T>(array: T[] | null | undefined): array is T[] =>
  Array.isArray(array) && array.length > 0;

export const parseFormData = <T>(formData: FormData) => Object.fromEntries(formData.entries()) as T;

export const getShortDateString = (date: Date): string => date.toISOString().split('T')[0];
