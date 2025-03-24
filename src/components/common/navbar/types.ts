import { Dispatch, ElementType, JSX, SetStateAction } from "react";

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
  setSelectedItem: Dispatch<SetStateAction<string | null>>;
  setHamburgerOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem: string | null;
  toggleHamburger: () => void;
};

export type NavItemType = {
  title: string;
  show?: boolean;
  href?: string;
  icon?: JSX.Element;
  onClick?: (event: React.MouseEvent) => void;
};

export type HamburgerPropsType = {
  toggleHamburger: () => void;
  hamburgerOpen: boolean;
};
