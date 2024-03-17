import { FC } from 'react';
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { HeaderMenu, SidebarMenu } from './components';
import { menuItems } from './constants';

export const Header: FC = () => (
  <Navbar isBordered>
    <NavbarContent>
      <NavbarMenuToggle className="sm:hidden" />
      <NavbarBrand>
        <Link className="font-bold text-inherit" href="/">
          MyStocks
        </Link>
      </NavbarBrand>
    </NavbarContent>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <HeaderMenu items={menuItems} />
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem>
        <Button as={Link} color="primary" href="/login" variant="flat">
          Войти
        </Button>
      </NavbarItem>
    </NavbarContent>
    <SidebarMenu items={menuItems} />
  </Navbar>
);
