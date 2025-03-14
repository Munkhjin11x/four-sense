"use client";
import { DownloadIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { Position } from "../food/tool";

export const Ability = () => {
  const position = [
    {
      x: "74%",
      y: "40%",
      title: "Cocktails form HERE-E TAL",
      content: {
        title: "OH-RUM (urum)",
        desc: "A blend of flavors that roams freely like heher-e tal perfect for those  who love to live without  limits",
        tag: "Food Pairing: Beef Donburi, Lamb Chops, Rolls,Nigirit",
        price: "40,0",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: "/images/team/4.jpg",
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Nomi",
      },
    },
    {
      x: "86%",
      y: "50%",
      content: {
        title: "OH-RUM (urum)",
        desc: "A blend of flavors that roams freely like heher-e tal perfect for those  who love to live without  limits",
        tag: "Food Pairing: Beef Donburi, Lamb Chops, Rolls,Nigirit",
        price: "40,0",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: "/images/team/4.jpg",
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Nomi",
      },
    },
    {
      x: "38%",
      y: "34%",
      title: "Cocktails form KHANGAI",
      content: {
        title: "OH-RUM (urum)",
        desc: "This cocktial,inspired by the Mongolia nomad break-fast of fesh cream (urum),Blends smoky, savory fla-vors. Pronounce its name very fast,and leam a Mongo-lian word",
        tag: "Food Pairing: Spring Rolls, Horse meat Carpaccio",
        price: "40,0",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: "/images/team/3.jpg",
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Boldoo",
      },
    },
    {
      x: "45%",
      y: "54%",
      content: {
        title: "OH-RUM (urum)",
        desc: "This cocktial,inspired by the Mongolia nomad break-fast of fesh cream (urum),Blends smoky, savory fla-vors. Pronounce its name very fast,and leam a Mongo-lian word",
        tag: "Food Pairing: Spring Rolls, Horse meat Carpaccio",
        price: "40,0",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: "/images/team/3.jpg",
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Boldoo",
      },
    },
    {
      x: "6%",
      y: "34%",
      title: "Cocktails form ALTAI",
      content: {
        title: "OH-RUM (urum)",
        desc: "This cocktial,inspired by the Mongolia nomad break-fast of fesh cream (urum),Blends smoky, savory fla-vors. Pronounce its name very fast,and leam a Mongo-lian word",
        tag: "Food Pairing: Spring Rolls, Horse meat Carpaccio",
        price: "40,0",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: "/images/team/3.jpg",
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Boldoo",
      },
    },
    {
      x: "21%",
      y: "54%",
      content: {
        title: "OH-RUM (urum)",
        desc: "This cocktial,inspired by the Mongolia nomad break-fast of fesh cream (urum),Blends smoky, savory fla-vors. Pronounce its name very fast,and leam a Mongo-lian word",
        tag: "Food Pairing: Spring Rolls, Horse meat Carpaccio",
        price: "40,0",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: "/images/team/3.jpg",
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Boldoo",
      },
    },
    {
      x: "50%",
      y: "80%",
      title: "Cocktails form GOBI",
      content: {
        title: "OH-RUM (urum)",
        desc: "This cocktial,inspired by the Mongolia nomad break-fast of fesh cream (urum),Blends smoky, savory fla-vors. Pronounce its name very fast,and leam a Mongo-lian word",
        tag: "Food Pairing: Spring Rolls, Horse meat Carpaccio",
        price: "40,0",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: "/images/team/3.jpg",
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Boldoo",
      },
    },
    {
      x: "62%",
      y: "80%",
      content: {
        title: "OH-RUM (urum)",
        desc: "This cocktial,inspired by the Mongolia nomad break-fast of fesh cream (urum),Blends smoky, savory fla-vors. Pronounce its name very fast,and leam a Mongo-lian word",
        tag: "Food Pairing: Spring Rolls, Horse meat Carpaccio",
        price: "40,0",
        abv: "16.38%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: "/images/team/3.jpg",
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Boldoo",
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
            href={"/menu.pdf"}
            className="border hidden gap-2 lg:flex max-sm:text-sm max-sm:px-5 text-nowrap text-white border-white px-10 rounded-tl-full py-3"
            target="_blank"
            download={"menu.pdf"}
          >
            <DownloadIcon />
            BAR Menu Download
          </Link>
        </div>
      </div>
    </div>
  );
};
