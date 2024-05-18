'use client';

import { FC } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, IButtonProps } from '../button';

export const SubmitButton: FC<Omit<IButtonProps, 'type' | 'isLoading'>> = (props) => {
  const { pending } = useFormStatus();

  return <Button color="primary" {...props} type="submit" isLoading={pending} />;
};
