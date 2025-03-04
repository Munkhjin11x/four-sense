import Image from "next/image";
import { Menu } from "./menu";

export const MenuSection = () => {
  return (
    <div className="w-full h-screen  grid grid-cols-2">
      <Menu title="MEALS" data={data} />
      <div className="w-full h-full">
        <Image
          className="w-full"
          src={"/food/1.png"}
          alt="menu-section"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};
const data = [
  {
    name: "EDAMAME",
    price: "15,0",
    description:
      ' "It\'s more than just a snack, it\'s a burst of flavor and protein." <br> "Энэ бол зугээр нэг зууш биш, харин амт болон уургийн тэсрэлт юм." ',
  },
];
