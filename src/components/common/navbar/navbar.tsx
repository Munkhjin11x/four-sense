"use client";
import { useEffect, useState } from "react";

import { NavbarItemsMobile } from "./navbar-item-mobile";
import { cn } from "@/lib/utils";

import { useNavbarConfig } from "./nav-data";

import Link from "next/link";
import { AboutIcon, BarIcon, HelpIcon, HomeIcon, TeamIcon } from "@/icons";
import Image from "next/image";

export const Navbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number>();
  const listNavItems = useNavbarConfig();

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navTop, setNavTop] = useState("top-5");
  const [navTopBorder, setNavTopBorder] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setNavTop("xl:-top-[102px]");
      } else {
        if (scrollTop > 10) {
          if (openIndex) {
            setNavTop("xl:top-0");
            setNavTopBorder(
              "xl:rounded-tr-none xl:rounded-tl-none xl:border-t-0"
            );
          } else {
            setNavTopBorder("");
            setNavTop("xl:top-5");
          }
        } else {
          setNavTop("top-5");
          setNavTopBorder("");
        }
      }
      setLastScrollTop(scrollTop <= 10 ? 10 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, openIndex]);

  return (
    <div className=" flex w-full flex-col items-center">
      <div
        className={cn(
          `fixed z-50 w-full transition-all duration-300 max-lg:px-2 lg:px-8 ${navTop}`
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-6 rounded-xl  bg-transparent p-3",
            openIndex && "xl:rounded-bl-none xl:rounded-br-none",
            navTopBorder
          )}
        >
          <div className="flex items-center gap-14">
            <Link
              href={"/"}
              aria-label="motfx logo go to home page"
              onClick={() => {
                setOpenIndex(undefined);
              }}
            >
              <Image
                src={"/navbar/logo.png"}
                alt="logo"
                width={200}
                height={50}
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {data.map((e, i) => (
              <Link className="group flex gap-3" key={i} href={e.href}>
                <div
                  className={cn(
                    0 === i ? "text-[#2F8652]" : "text-[#D9864E]",
                    " gap-2 flex items-center "
                  )}
                >
                  <div className="size-6">{e.icon}</div>
                  <p>{e.title}</p>
                </div>
              </Link>
            ))}
            <Link
              href={""}
              className="border text-[#D9864E] hover:bg-[#D9864E]/50 border-[#D9864E] px-10 rounded-tl-full py-2"
            >
              BOOK A TABLE
            </Link>
          </div>
        </div>
      </div>

      {hamburgerOpen && (
        <NavbarItemsMobile
          list={listNavItems}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          setHamburgerOpen={setHamburgerOpen}
        />
      )}
    </div>
  );
};

const data = [
  {
    title: "Home",
    href: "/feature",
    icon: <HomeIcon />,
  },
  {
    title: "About",
    href: "/pricing",
    icon: <AboutIcon />,
  },
  {
    title: "Team",
    href: "/pricing",
    icon: <TeamIcon />,
  },
  {
    title: "Bar Menu",
    href: "/blog",
    icon: <BarIcon />,
  },
  {
    title: "Concats",
    href: "/Concats",
    icon: <HelpIcon />,
  },
];
