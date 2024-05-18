'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import { MdLogout } from 'react-icons/md';
import { logOut } from '@/actions';
import { SubmitButton } from '@atoms';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User as UserComponent,
} from '@nextui-org/react';
import { User } from '@prisma/client';

export interface IAccountInfoProps {
  user: User;
}

export const AccountInfo: FC<IAccountInfoProps> = ({ user }) => {
  const [, logOutAction] = useFormState(logOut, undefined);

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <UserComponent name={user.username} className="cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="log-out" className="p-0 data-[hover=true]:bg-transparent">
          <form action={logOutAction}>
            <SubmitButton startContent={<MdLogout />} color="warning" fullWidth>
              Выйти
            </SubmitButton>
          </form>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
