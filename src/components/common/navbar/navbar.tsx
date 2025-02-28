"use client";
import { useEffect, useState } from "react";
import { NavbarItemsMobile } from "./navbar-item-mobile";
import { cn } from "@/lib/utils";
import { useNavbarConfig } from "./nav-data";
import Link from "next/link";
import {
  AboutIcon,
  BarIcon,
  HelpIcon,
  HomeIcon,
  TeamIcon,
  VolumeIcon,
} from "@/icons";
import Image from "next/image";
import useLoading from "@/hook/use-loading";
import useBackgroundAudio from "@/hook/use-sound";
export const Navbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number>();
  const listNavItems = useNavbarConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const loading = useLoading(4000);
  const { play, pause } = useBackgroundAudio("/backsound.mp3");
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navTop, setNavTop] = useState("top-5");
  const [navTopBorder, setNavTopBorder] = useState("");

  const handleScroll = () => {
    const offset = window.pageYOffset;
    setIsScrolled(offset > 0);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            setNavTop("xl:top-0");
          }
        } else {
          setNavTop("top-0");
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

  if (loading) {
    return null;
  }

  return (
    <div className=" flex w-full flex-col items-center">
      <div
        className={cn(
          `fixed z-50 w-full transition-all duration-300  ${navTop}`
        )}
      >
        <div
          className={cn(
            isScrolled ? "!bg-white border" : "bg-transparent",
            "flex items-center justify-between  gap-6 rounded-br-[45px]  p-3",
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
              <Link
                className="group flex gap-3"
                key={i}
                href={e.href}
                onClick={e.onClick}
              >
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
            <div onClick={toggleAudio} className="flex gap-3">
              <div className="size-6">
                <VolumeIcon />
              </div>
              <p className="text-[#D9864E]"> Volume</p>
            </div>
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
    href: "#home",
    icon: <HomeIcon />,
  },
  {
    title: "About",
    href: "#about",
    icon: <AboutIcon />,
  },
  {
    title: "Team",
    href: "#team",
    icon: <TeamIcon />,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      document.getElementById("team")?.scrollIntoView({ behavior: "smooth" });
    },
  },
  {
    title: "Bar Menu",
    href: "#bar-menu",
    icon: <BarIcon />,
  },
  {
    title: "Concats",
    href: "#contact",
    icon: <HelpIcon />,
  },
];
