import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavbarItemMobilePropsType } from "./types";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const NavbarItemsMobile = ({
  list,
  openIndex,
  setSelectedItem,
  selectedItem,
}: NavbarItemMobilePropsType) => {
  return (
    <div
      className={cn(
        "fixed z-50 w-full max-lg:px-2 lg:px-8 xl:hidden",
        openIndex ? "bg-white/70 backdrop-blur-md backdrop-filter" : "mt-[99px]"
      )}
    >
      <Accordion type="single" className="rounded-xl border bg-white">
        {list
          .filter((item) => item.title !== "Team")
          .map(({ title, icon, href, onClick }, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="last:border-none"
            >
              <AccordionTrigger className="px-3">
                {href ? (
                  <Link
                    href={href}
                    onClick={() => {
                      setSelectedItem(title);
                    }}
                    className={cn(
                      selectedItem == title && "text-[#2F8652]",
                      "flex items-center gap-2 group-hover:text-[#2F8652]"
                    )}
                  >
                    {icon}
                    {title}
                  </Link>
                ) : (
                  <div
                    className="flex items-center gap-2 p-0 hover:bg-transparent"
                    onClick={onClick}
                  >
                    {icon}
                    {title}
                  </div>
                )}
              </AccordionTrigger>
            </AccordionItem>
          ))}
        <AccordionItem value="book-a-table">
          <AccordionTrigger className="px-3">
            <Link
              href={"/book-table"}
              className="border  lg:flex w-full max-sm:text-sm max-sm:px-5 text-nowrap text-[#D9864E] hover:bg-[#D9864E]/50 border-[#D9864E] px-10 rounded-tl-full py-2"
            >
              BOOK A TABLE
            </Link>
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
