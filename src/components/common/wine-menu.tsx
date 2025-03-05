import { cn } from "@/lib/utils";
import { Menu } from "../food";
import localFont from "next/font/local";

const font = localFont({
  src: "../../fonts/roba/Roba-Regular.otf",
  weight: "400",
  style: "normal",
});
export const WineMenu = () => {
  return (
    <div
      className="bg-cover bg-center flex flex-col gap-14 items-center bg-no-repeat px-16"
      style={{ backgroundImage: "url(/menu/bg-yellow.png)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-full pt-14">
        <Menu
          priceClassName="text-[#E7813F]"
          titleClassName="!text-[#E7813F]"
          title="Shim Menu"
          data={data}
        />
        <Menu
          priceClassName="text-[#E7813F]"
          titleClassName="!text-[#E7813F]"
          title="Wine menu"
          data={data2}
        />
      </div>
      <div className="max-w-[1100px] pb-[100px]">
        <p
          className={cn(
            font.className,
            "text-center text-2xl font-bold text-[#E7813F]"
          )}
        >
          Welcome to FOURSENSES, where every cocktail is a journey through
          sight, smell, hearing, and taste. Nestled in the heart of the city,
          our bar is a sanctuary for those seeking to immerse themselves in a
          world of sensory delights
        </p>
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
const data2 = [
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
];
