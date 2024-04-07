'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import { logOut } from '@/actions';
import { Button } from '@atoms';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react';
import { IUser } from '@types';

export interface IAccountInfoProps {
  user: IUser;
}

export const AccountInfo: FC<IAccountInfoProps> = ({ user }) => {
  const [, logOutAction] = useFormState(logOut, undefined);

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User name={user.username} className="cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="log-out" className="p-0 data-[hover=true]:bg-transparent">
          <form action={logOutAction}>
            <Button type="submit" color="warning" fullWidth>
              Выйти
            </Button>
          </form>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
