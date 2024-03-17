'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { Link, NavbarMenu, NavbarMenuItem } from '@nextui-org/react';
import { IMenuItem } from '@types';

export interface ISidebarMenuProps {
  items: IMenuItem[];
}

export const SidebarMenu: FC<ISidebarMenuProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <NavbarMenu>
      {items.map(({ text, link }, i) => (
        <NavbarMenuItem key={i} isActive={link === pathname}>
          <Link className="w-full" href={link}>
            {text}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
};
