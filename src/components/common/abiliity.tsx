"use client";
import { DownloadIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";

export const Ability = () => {
  const position = [
    {
      x: "20%",
      y: "30%",
      title: "Cocktails form HERE-E TAL",
      content: {
        title: "OH-RUM (urum)",
        desc: "This cocktial,inspired by the Mongolia nomad break-fast of fesh cream (urum),Blends smoky, savory fla-vors. Pronounce its name very fast,and leam a Mongo-lian word",
        tag: "Food Pairing: Spring Rolls, Horse meat Carpaccio",
        price: "40,000",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
      },
    },
    {
      x: "60%",
      y: "50%",
      title: "Cocktails form KHANGAI",
      content: {
        title: "OH-RUM (urum)",
        desc: "This cocktial,inspired by the Mongolia nomad break-fast of fesh cream (urum),Blends smoky, savory fla-vors. Pronounce its name very fast,and leam a Mongo-lian word",
        tag: "Food Pairing: Spring Rolls, Horse meat Carpaccio",
        price: "40,000",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
      },
    },
    {
      x: "40%",
      y: "50%",
      title: "Cocktails form ALTAI",
      content: {
        title: "OH-RUM (urum)",
        desc: "This cocktial,inspired by the Mongolia nomad break-fast of fesh cream (urum),Blends smoky, savory fla-vors. Pronounce its name very fast,and leam a Mongo-lian word",
        tag: "Food Pairing: Spring Rolls, Horse meat Carpaccio",
        price: "40,000",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
      },
    },
    {
      x: "80%",
      y: "50%",
      title: "Cocktails form GOBI",
      content: {
        title: "OH-RUM (urum)",
        desc: "This cocktial,inspired by the Mongolia nomad break-fast of fesh cream (urum),Blends smoky, savory fla-vors. Pronounce its name very fast,and leam a Mongo-lian word",
        tag: "Food Pairing: Spring Rolls, Horse meat Carpaccio",
        price: "40,000",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
      },
    },
  ];
  return (
    <div className="relative bg-[url('/menu/bg.png')]  bg-cover bg-center  bg-no-repeat w-full">
      {/* <Image
        src={"/menu/bg.png"}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-full  -z-10 "
      /> */}

      <div className="flex  flex-col gap-4 justify-center items-center">
        <Image
          src={"/menu/nomad.png"}
          alt=""
          width={1100}
          height={700}
          sizes="100vw"
          className="mt-24"
        />
        <div className="relative">
          <Image
            src={"/menu/mongolia.png"}
            alt=""
            width={1500}
            height={700}
            sizes="100vw"
            className=""
          />
          {position.map((item, index) => (
            <Position key={index} {...item} />
          ))}
        </div>

        <div className="pb-20 flex flex-col gap-2 items-center">
          <Image
            src={"/menu/logo.png"}
            alt=""
            width={180}
            height={700}
            sizes="100vw"
            className=""
          />
          <p className="text-[#F9DAB2] text-center text-2xl font-bold">
            Spring Menu
          </p>
          <Link
            className="border hidden gap-2 lg:flex max-sm:text-sm max-sm:px-5 text-nowrap text-white border-white px-10 rounded-tl-full py-3"
            href={"/bar-menu"}
          >
            <DownloadIcon />
            BAR Menu Download
          </Link>
        </div>
      </div>
    </div>
  );
};
const Position = ({
  title,
  x,
  y,
  content,
}: {
  title: string;
  x: string;
  y: string;
  content?: {
    title: string;
    desc: string;
    tag: string;
    price: string;
    abv: string;
    sweet: number;
    sour: number;
    herbal: number;
    umami: number;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <TooltipProvider>
        <Tooltip open={isOpen} onOpenChange={setIsOpen}>
          <TooltipTrigger asChild>
            <div
              className="relative z-50 cursor-pointer"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="border-4 w-fit rounded-full">
                <div className="border-[3px] size-5 border-[#E78140] rounded-full bg-[#F9DAB2]" />
              </div>
              <p className="text-[#F9DAB2] text-xl absolute top-8 left-5 font-semibold w-[140px]">
                {title}
              </p>
            </div>
          </TooltipTrigger>
          {content && (
            <TooltipContent
              side="right"
              className="z-[9999] w-[300px] bg-[#2B5B3E] text-white p-4 rounded-lg"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#4F9D6E]">
                  {content.title}
                </h3>
                <p className="text-sm">{content.desc}</p>
                <p className="text-sm text-[#4F9D6E]">{content.tag}</p>
                <div className="flex justify-between text-sm">
                  <span>ABV: {content.abv}</span>
                  <span>Price: ₮{content.price}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-16">Sweet</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < content.sweet ? "bg-[#4F9D6E]" : "bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-16">Sour</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < content.sour ? "bg-[#4F9D6E]" : "bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-16">Herbal</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < content.herbal ? "bg-[#4F9D6E]" : "bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-16">Umami</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < content.umami ? "bg-[#4F9D6E]" : "bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
