import { FC } from 'react';
import { MdLogin } from 'react-icons/md';
import { getCurrentSession, getCurrentUser } from '@/auth';
import { isNotEmpty } from '@/helpers';
import { Button } from '@atoms';
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { AccountInfo, HeaderMenu, SidebarMenu } from './components';
import { menuItems } from './constants';

export const Header: FC = async () => {
  const user = await getCurrentUser((await getCurrentSession()).user);

  return (
    <Navbar isBordered>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            MyStocks
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <HeaderMenu items={menuItems} />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="h-fit">
          {isNotEmpty(user) ? (
            <AccountInfo user={user} />
          ) : (
            <Button
              as={Link}
              startContent={<MdLogin />}
              color="primary"
              href="/log-in"
              variant="flat"
            >
              Войти
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <SidebarMenu items={menuItems} />
    </Navbar>
  );
};
