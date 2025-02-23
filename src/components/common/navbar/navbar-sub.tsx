
import { Typography } from '@/components/ui';
import { NavSubPropsType } from './types';

import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';

export const NavbarSub = ({ subMenus, subNavTop }: NavSubPropsType) => {


  return (
    <div
      className={`fixed top-0 z-40 w-full max-w-[1824px] transition-all duration-300 max-xl:hidden max-lg:px-2 lg:px-8 ${subNavTop}`}
    >
      <div className="flex w-full gap-14 rounded-bl-xl rounded-br-xl border border-t-0 bg-white p-5 transition-all duration-300">
        <div className="w-full max-w-[156px]" />
        <div className="flex w-full flex-1 items-center gap-5">
          {subMenus.map(({ title, icon, href, img, comp }, index) => {
        
            return (
              <Link className="flex items-center gap-2" key={index} href={href}>
                {img && <Image alt="" className="w-6" sizes="100vw" src={img} width={0} height={0} />}
                {icon }
                <Typography component={comp} className={cn('font-bold text-primary', 'hover:text-primary')}>
                  {title}
                </Typography>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
