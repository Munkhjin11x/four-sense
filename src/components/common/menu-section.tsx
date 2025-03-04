import Image from "next/image";
import { Menu } from "./menu";

export const MenuSection = () => {
  return (
    <div className="w-full grid grid-cols-2">
      <Menu title="MEALS" data={data} />
      <div className="w-full h-full">
        <Image
          className="w-full h-full"
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
  {
    name: "HORSE MEAT CARPACCIO",
    price: "15,0",
    description:
      '"Tender, lean, and flavorful - horse meat carpaccio is a true delicacy!"<br> "Зеелен, нимгэн, амтлаг - адууны махан карпачио жинхэнэ амттан!"',
  },
  {
    name: "LAMB CHOPS",
    price: "15,0",
    description:
      '"The rich taste of lamb chops is the true definition of indulgence."<br> "Хонины хавирганы баялаг амт нь верийгее эрхлуулж буй жинхэне илерхийлел юм."',
  },
  {
    name: "BEEF DONBURI",
    price: "15,0",
    description:
      '"Tender sirloin steak and savory sauce, all over a bed of african jollof rice."<br> "Африкийн жоллоф будаан дээр дэвссэн зеелен ухрийн мах болон баялаг амттай соус."',
  },
  {
    name: "LAMB HEAD",
    price: "15,0",
    description:
      '"Order, and you\'ll see and taste modern Mongolian cuisine"<br> "Та захиал, Монгол ундэсний орчин уеийн хоолыг еерийн нудээр харж бас амтал"',
  },
  {
    name: "DEEP FRIED LASAGNA",
    price: "15,0",
    description:
      '"Take your lasagne to the next level-a classic into a crispy, cheesy masterpiece."<br> "Сонгодог бутээлийг шаржигнуур, бяслагтай гайхамшигт бутээл болгон хувиргав."',
  },
  {
    name: "CEVICHE SALAD",
    price: "15,0",
    description:
      '"Popular Peru salat meets the precision of Japanese sashimi artistry."<br> "Перу улсын алдарт саладыг япон улсын сашими арга барилыг хослуулан',
  },
];
