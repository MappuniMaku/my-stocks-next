import { FC } from 'react';
import { Button as NextUIButton, ButtonProps } from '@nextui-org/react';

export type IButtonProps = ButtonProps;

export const Button: FC<IButtonProps> = (props) => <NextUIButton {...props} />;
