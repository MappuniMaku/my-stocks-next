import { Dispatch, SetStateAction, useState } from 'react';
import { useFormState } from 'react-dom';

export interface IServerFormErrors<T> {
  errors?: Partial<Record<keyof T, string>>;
}

export interface IUseServerFormResult<T> extends IServerFormErrors<T> {
  values: T;
  setValues: Dispatch<SetStateAction<T>>;
  submit: () => void;
}

export type IServerFormAction<T> = (values: T) => Promise<IServerFormErrors<T>>;

export const useServerForm = <T>({
  action,
  getDefaultValues,
}: {
  action: IServerFormAction<T>;
  getDefaultValues: () => T;
}): IUseServerFormResult<T> => {
  const [values, setValues] = useState(getDefaultValues);

  const [{ errors }, submit] = useFormState(action.bind(null, values), {});

  return {
    errors,
    values,
    setValues,
    submit,
  };
};
