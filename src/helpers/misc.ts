export const isNotEmpty = <T>(value: T | null | undefined): value is NonNullable<T> =>
  value !== null && value !== undefined;

export const isEmpty = <T>(value: T | null | undefined): value is null | undefined =>
  !isNotEmpty(value);

export const isStringNotEmpty = <T extends string>(
  value: T | undefined | null,
): value is NonNullable<T> => (value ?? '').trim() !== '';

export const isArrayNotEmpty = <T>(array: T[] | null | undefined): array is T[] =>
  Array.isArray(array) && array.length > 0;
