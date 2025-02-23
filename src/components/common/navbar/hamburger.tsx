

import { Button } from '@/components/ui';
import { HamburgerPropsType } from './types';

export const Hamburger = ({ toggleHamburger, hamburgerOpen }: HamburgerPropsType) => {
  return (
    <Button

      variant="outline"
      size="icon"
      className="flex justify-center px-2 xl:hidden"
      aria-label="hamburger menu"
      onClick={toggleHamburger}
    >

    </Button>
  );
};
