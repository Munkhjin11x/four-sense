

import { ElementType } from 'react';
import { SubMenuType } from './types';
import { HomeIcon } from '@/icons';

interface NavbarItem {
  title: string;
  subMenus: SubMenuType[];
  comp?: ElementType;
}

type UseNavbarConfigReturnType = NavbarItem[];

export const useNavbarConfig = (): UseNavbarConfigReturnType => {
  // const t = useTranslations('navbar');

  // const locale = useLocale();

  

  return [
    {
      title: ('trading.title'),
      subMenus: [
        { title: ('trading.accounts.accounts'), href: '/trading-accounts', icon:<HomeIcon/>  },
        { title: ('trading.conditions.deposit'), href: '/deposit',  },
        {
          title: ('trading.conditions.withdraw'),
          href: '/withdraw',
      
        },
        { title: ('trading.accounts.vipProgram'), href: '/loyalty-program', },
        { title: ('trading.conditions.security'), href: '/security'  }
      ]
    },
   
  ];
};
