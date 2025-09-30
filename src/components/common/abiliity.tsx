"use client";
import { DownloadIcon } from "@/icons";
import Image from "next/image";
import { Position } from "../food/tool";
import { Modal } from "./modal";
import { Button } from "../ui";
import { useState } from "react";
import Link from "next/link";

export const Ability = () => {
  const position = [
    {
      x: "75%",
      y: "39%",
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
        img: ["/images/team/4.jpg"],
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Nomi",
      },
    },
    {
      x: "85%",
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
        img: ["/images/team/4.jpg"],
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Nomi",
      },
    },
    {
      x: "39.8%",
      y: "34%",
      title: "Cocktails form KHANGAI",
      content: {
        title: "Wildflower",
        desc: "A cocktail as fresh and colorful as a wildflower mead-ow-fruity, floral, and full of life. Зэрлэг цэцэгсээр дүүрэн нуга шиг шинэлэг, өнгөлөг-жимслэг, цэцэгсийн анхилам үнэрт коктейль.",
        tag: "Food Pairing: Ceviche Salad, Yakitori Skewers",
        price: "40,0",
        abv: "18.32%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: ["/images/team/6.jpg", "/images/team/2.jpg"],
        ingredients:
          "Sour Whey, Curd Cordial, Vanil-la, Angostura Bitter, Onegin Vodka",
        by: "Spicy & Bobby",
      },
    },
    {
      x: "46%",
      y: "54%",
      content: {
        title: "Voila",
        desc: "“Volia!!! More than a cocktail!-it’s traditional culinary adventure in a glass.“Volia!!! Зүгээр ч нэг коктейль биш! Энэ бол хундага дүүрэн Монголын хоолны урлагийн адал явдал юм.",
        tag: "Food Pairing: Edamame, Nigiri, Rolls",
        price: "40,0",
        abv: "16.32%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: ["/images/team/1.jpg", "/images/team/3.jpg"],
        ingredients: "Red Cabbage Shim, Pineapple skin Seltzer",
        by: "Zorigoo & Boldoo",
      },
    },
    {
      x: "6%",
      y: "35%",
      title: "Cocktails form ALTAI",
      content: {
        title: "Tegri Eternal blue sky",
        desc: "Хамаг бүгдээр чамайг Харааж нулимж байвч, тэнгэр шиг бай! Хамгийн сайн хүмүүс гэж  Хашгирч ерөөж байвч, тэнгэр шиг бай! Тэвчээр барагдаж, нөхөд чинь орхивч Тэнгэр шиг бай, мөнхөд амгалан…Тэргэнд суулгаж, алтан титэм өмсгөвч Тэнгэр шиг бай, юу ч болоогүй юм шиг… Хамгийн хайртай хүн чинь хаяж одсон ч Хан тэнгэр нурчхаагүй цагт, бүү зов! Гүтгэж, доромжилж бахаа ганц хангавч Гүн тэнгэр хэмхрээгүй цагт, бүү ай О.Дашбалбар",
        tag: "Food Pairing: Rigatoni Pasta, Gyoza, Beef Donburi",
        price: "40,0",
        abv: "23.4%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: ["/images/team/3.jpg", "/images/team/1.jpg"],
        ingredients: "Shim, Mongolian thyme vodka",
        by: "Zorigoo & Boldoo",
      },
    },
    {
      x: "22%",
      y: "52%",
      content: {
        title: "Mountain whisper",
        desc: "Sip the serenity of the mountains-a drink that speaks to your soul Уулсын амгаланг шимнэ үү- таны сэтгэл рүү өнгийдөг ундаа.",
        tag: "Food Pairing: Ceviche Salad, Deep Fried Lasagna",
        price: "40,0",
        abv: "15.35%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: ["/images/team/6.jpg", "/images/team/2.jpg"],
        ingredients: "Local huckleberry juice, Maple, Whiskey",
        by: "Bobby & Boldoo",
      },
    },
    {
      x: "46%",
      y: "80%",
      title: "Cocktails form GOBI",
      content: {
        title: "White bird",
        desc: "A traditional delicacy reimagined as a liquid dish, full of surprises and the essence of the desert.Уламжлалт тансаг зоог, говийн охь амтыг хослуулсан гэнэтийн бэлэг мэт холимог ундаа.",
        tag: "Food Pairing: Spring Rolls, Horse meat Carpaccio",
        price: "40,0",
        abv: "12.77%",
        sweet: 2,
        sour: 2,
        herbal: 2,
        umami: 2,
        img: ["/images/team/4.jpg"],
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Nomi",
      },
    },
    {
      x: "62%",
      y: "82%",
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
        img: ["/images/team/3.jpg"],
        ingredients:
          "Molasses, Maraschino cherry, Aromatic bitter, Pecan wood smoke, Sweet potato smoked paprika whiskey",
        by: "Boldoo",
      },
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="relative bg-[url('/menu/bg.png')]  bg-cover bg-center  bg-no-repeat w-full">
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
            Autumn Menu
          </p>
          <Button
            variant={"ghost"}
            onClick={handleModal}
            className="border hidden gap-2 lg:flex max-sm:text-sm max-sm:px-5 text-nowrap text-white border-white px-10 rounded-tl-full py-3"
          >
            <DownloadIcon />
            BAR Menu
          </Button>
        </div>
      </div>
      <BarMenuModal isOpen={isOpen} onClose={handleModal} />
    </div>
  );
};
const BarMenuModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bar Menu">
      <div className="flex flex-col gap-4 items-center">
        <iframe
          src={"/menufall.pdf"}
          className=" h-[800px] w-full border-none sm:h-[700px]"
          title="Bar Menu"
        />
        <Link
          href={"/menufall.pdf"}
          target="_blank"
          download={"menufall.pdf"}
          className="border bg-[#F9DAB2] text-center w-fit hidden gap-2 lg:flex max-sm:text-sm max-sm:px-5 text-nowrap text-white border-white px-10 rounded-tl-full py-3"
        >
          <DownloadIcon />
          BAR Menu
        </Link>
      </div>
    </Modal>
  );
};
