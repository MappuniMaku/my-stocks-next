import { useEffect, useState } from 'react';
import { isNotEmpty } from '@/helpers';

export interface IUseFormErrorsResult<T> {
  displayedErrors?: T;
  clearErrors: () => void;
  hasError: (key: keyof T) => boolean;
  getErrorMessage: (key: keyof T) => string | undefined;
}

export function useFormErrors<T extends Record<string, string>>(
  errors: T | undefined,
): IUseFormErrorsResult<T> {
  const [displayedErrors, setDisplayedErrors] = useState<T>();

  const clearErrors = () => {
    setDisplayedErrors(undefined);
  };

  const hasError: IUseFormErrorsResult<T>['hasError'] = (key) => {
    return isNotEmpty(displayedErrors?.[key]);
  };

  const getErrorMessage: IUseFormErrorsResult<T>['getErrorMessage'] = (key) => {
    return displayedErrors?.[key];
  };

  useEffect(() => {
    setDisplayedErrors(errors);
  }, [errors]);

  return {
    displayedErrors,
    clearErrors,
    hasError,
    getErrorMessage,
  };
}
