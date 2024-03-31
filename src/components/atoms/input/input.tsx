import { FC } from 'react';
import { Input as NextUIInput, InputProps } from '@nextui-org/react';

export type IInputProps = InputProps;

export const Input: FC<IInputProps> = (props) => <NextUIInput {...props} />;
