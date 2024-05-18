'use client';

import { FC } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, IButtonProps } from '@atoms';

export const SubmitButton: FC<Omit<IButtonProps, 'type' | 'isLoading'>> = (props) => {
  const { pending } = useFormStatus();

  return <Button {...props} type="submit" isLoading={pending} />;
};
