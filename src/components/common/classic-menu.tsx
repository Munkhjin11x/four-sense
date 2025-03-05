import Image from "next/image";
import { Menu } from "../food/menu";

export const ClassicMenu = () => {
  return (
    <div className="w-full grid h-full grid-cols-1 md:grid-cols-2">
      <div>
        <Menu titleClassName="!text-[#D9864E]" title="Highballs" data={data} />
        <Menu titleClassName="!text-[#D9864E]" title="Classics" data={data} />
      </div>
      <div className="w-full h-full">
        <Image
          className="w-full h-full"
          src={"/food/3.png"}
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
      '"It\'s more than just a snack, it\'s a burst of flavor and protein." <br> "Энэ бол зугээр нэг зууш биш, харин амт болон уургийн тэсрэлт юм." ',
  },
  {
    name: "SPRING ROLL",
    price: "15,0",
    description:
      '"Fresh, light, and full of flavor - spring rolls are the ultimate snack."<br> "Шинэхэн, хенген, амтлаг - spring roll бол туйлын сайхан зууш юм."',
  },
  {
    name: "GYOZA",
    price: "15,0",
    description:
      '"A well-made gyoza is like a little pocket of deliciousness."<br> "Сайн хийсэн гиоза бол бяцхан савлагаанд багтаасан амтны цуглуулга юм."',
  },
  {
    name: "TEMPURA EBI",
    price: "15,0",
    description:
      '"Crispy tempura, sweet shrimp - a perfect pair!"<br> "Шаржигнасан темпура, амтлаг сам хорхой - тегс хослол!" ',
  },
  {
    name: "YAKITORI SCEWERS",
    price: "15,0",
    description:
      '"The simplicity of yakitori makes every bite a savory delight."<br> "Якиторигийн элдэв маяггуй байдал нь хазалт бурийг илуу тааламжтай болгодог." ',
  },
];
