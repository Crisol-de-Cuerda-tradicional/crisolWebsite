import { useMenuToggle } from '@hooks';
import { ReactNode, useMemo, createContext, JSX } from 'react';

type MenuContextProps = {
  showMenu: boolean;
  toggleMenu: () => void;
};

export const MenuContext = createContext<MenuContextProps>({
  showMenu: false,
  toggleMenu: () => {},
});

export const MenuContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { showMenu, toggleMenu } = useMenuToggle();

  const props = useMemo(() => ({ showMenu, toggleMenu }), [showMenu, toggleMenu]);

  return <MenuContext.Provider value={props}>{children}</MenuContext.Provider>;
};
