
import { Typography } from '@/components/ui';
import { NavbarItemPropsType } from './types';

import { cn } from '@/lib/utils';

export const NavbarItem = ({ text, handleClickNavItem, isOpen, comp }: NavbarItemPropsType) => {
  return (
    <div className="flex cursor-pointer items-center gap-1" onClick={handleClickNavItem}>
      <div className="flex items-center gap-2">
        <Typography
          className={cn(`text-nowrap hover:text-primary`, isOpen && 'font-bold text-primary')}
          component={comp}
        >
          {text}
        </Typography>
      </div>
   
    </div>
  );
};
