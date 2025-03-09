"use client";
import { CDN_URL } from "@/constants/contant";
import Image from "next/image";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Animation from "../ui/animation";
import useLoading from "@/hook/use-loading";
const font = localFont({
  src: "../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});

export const FooterVideo = () => {
  const loading = useLoading(4000);

  if (loading) {
    return null;
  }

  return (
    <div className="w-full relative md:h-screen">
      <div className="absolute inset-0 h-full -z-10 bg-black/40" />
      <video
        preload="none"
        className="w-full  absolute inset-0 h-full -z-20 object-cover"
        autoPlay
        playsInline
        loop
        muted
      >
        <source src={CDN_URL + "/home/footer-.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-full h-full flex flex-col items-center justify-between gap-5 p-4">
        <Animation viewPortAmount={1} className="w-full text-center">
          <p
            className={cn(
              font.className,
              "text-white text-3xl mt-24 sm:text-5xl md:text-7xl lg:text-9xl"
            )}
          >
            WELCOME TO FOURSENSES
          </p>
        </Animation>
        <Animation viewPortAmount={1} className="flex justify-center">
          <Image
            src={"/navbar/footer-logo.png"}
            alt="Big Mouth"
            width={400}
            height={400}
            sizes="(max-width: 640px) 200px, (max-width: 768px) 300px, 400px"
            className="w-[200px] sm:w-[300px] md:w-[400px] h-auto"
          />
        </Animation>
        <Animation viewPortAmount={1}>
          <div className="flex flex-col pb-5 gap-3 md:gap-5 items-center">
            <div className="flex flex-wrap justify-center gap-4 md:gap-10 px-2">
              {links.map((e, i) => (
                <Link
                  className="text-white text-sm sm:text-base md:text-xl font-semibold hover:opacity-80 transition-opacity"
                  key={i}
                  href={e.href}
                >
                  {e.title}
                </Link>
              ))}
            </div>
            <Image
              src={"/navbar/footer.png"}
              alt="Big Mouth"
              width={200}
              height={200}
              sizes="(max-width: 640px) 100px, (max-width: 768px) 150px, 200px"
              className="w-[100px] sm:w-[150px] md:w-[200px] h-auto"
            />
            <p className="text-white text-sm sm:text-base md:text-xl font-semibold">
              ©2021 Nomad-Ability Bar
            </p>
          </div>
        </Animation>
      </div>
    </div>
  );
};
const links = [
  {
    title: "Privacy Policy ",
    href: "#",
  },
  {
    title: "Terms & Conditions",
    href: "#",
  },
  {
    title: " Cookie Policy",
    href: "#",
  },
];
