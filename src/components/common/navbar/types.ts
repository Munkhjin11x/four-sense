import { Dispatch, ElementType, SetStateAction } from 'react';

export type NavbarItemPropsType = {
  text: string;
  isOpen: boolean;
  handleClickNavItem: () => void;
  show?: boolean;
  comp?: ElementType;
};
export type NavSubPropsType = {
  subMenus: SubMenuType[];
  subNavTop: string;
};

export type SubMenuType = {
  title: string;
  href: string;
  icon?: JSX.Element;
  hiddenLanguages?: string[];
  img?: string;
  comp?: ElementType;
};

export type NavbarItemMobilePropsType = {
  list: NavItemType[];
  openIndex?: number;
  setOpenIndex: Dispatch<SetStateAction<number | undefined>>;
  setHamburgerOpen: Dispatch<SetStateAction<boolean>>;
};

export type NavItemType = {
  title: string;
  show?: boolean;
  subMenus: SubMenuType[];
};

export type HamburgerPropsType = {
  toggleHamburger: () => void;
  hamburgerOpen: boolean;
};
