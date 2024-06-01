import { ChangeEvent } from 'react';

export interface IMenuItem {
  text: string;
  link: string;
}

export type IInputChangeHandler<T> = (field: keyof T) => (e: ChangeEvent<HTMLInputElement>) => void;
