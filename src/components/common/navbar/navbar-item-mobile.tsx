import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { NavbarItemMobilePropsType } from './types';
import { cn } from '@/lib/utils';


import Image from 'next/image';

import Link from 'next/link';
import { Typography } from '@/components/ui';

export function NavbarItemsMobile({ list, openIndex, setOpenIndex, setHamburgerOpen }: NavbarItemMobilePropsType) {



  return (
    <div
      className={cn(
        'fixed z-50 w-full max-lg:px-2 lg:px-8 xl:hidden',
        openIndex ? 'bg-white/70 backdrop-blur-md backdrop-filter' : 'mt-[80px] sm:mt-[99px]'
      )}
    >
      <Accordion type="single" className="rounded-xl border bg-white">
        {list.map(({ title, subMenus }, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="last:border-none">
            <AccordionTrigger className="px-3" >
              <div className="flex items-center gap-2">{title}</div>
            </AccordionTrigger>
            <AccordionContent>
              {subMenus.map(({ title, href, icon, img }, index) => {
          
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setOpenIndex(undefined);
                      setHamburgerOpen(false);
                    }}
                  >
                    <Link href={href}>
                      <div className="flex gap-2 py-4 pl-4">
                        {icon}
                        {img && <Image alt="" className="w-6" sizes="100vw" src={img} width={0} height={0} />}
                        <Typography>{title}</Typography>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value="lang" className="last:border-none">
    
   
        </AccordionItem>
      </Accordion>
    </div>
  );
}
