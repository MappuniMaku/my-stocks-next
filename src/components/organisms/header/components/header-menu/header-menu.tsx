'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Link, NavbarItem } from '@nextui-org/react';
import { IMenuItem } from '@types';

export interface IHeaderMenuProps {
  items: IMenuItem[];
}

export const HeaderMenu: FC<IHeaderMenuProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <>
      {items.map(({ text, link }, i) => (
        <NavbarItem key={i} isActive={pathname === link}>
          <Link color="foreground" href={link}>
            {text}
          </Link>
        </NavbarItem>
      ))}
    </>
  );
};
