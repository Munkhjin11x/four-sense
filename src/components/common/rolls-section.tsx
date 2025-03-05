import Image from "next/image";
import { Rolls } from "../food";
import Animation from "../ui/animation";

export const RollsSection = () => {
  return (
    <div className="w-full grid h-full grid-cols-1 md:grid-cols-2">
      <div className="w-full h-full">
        <Image
          className="w-full h-full"
          src={"/food/2.png"}
          alt="menu-section"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <Rolls title="SPRING ROLLS" data={data} />
        <Rolls title="Rolls" data={data} />
        <Animation>
          <p className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#D9864E]">
            Nikkei Style
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-black font-semibold">
            Break tradition.Blend global flavors intro sushi,
          </p>
        </Animation>

        <Animation className="flex justify-end items-end h-full">
          <Image
            src={"/menu/green.png"}
            alt="menu-section"
            width={646}
            height={516}
            className="w-full max-w-[646px] h-auto"
          />
        </Animation>
      </div>
    </div>
  );
};

const data = [
  {
    name: "SPRING ROLL",
    price: "35,0",
    pcs: "10pcs",
    name2: "Tiger prawn nigiri",
  },
  {
    name: "SPRING ROLL",
    price: "55,0",
    pcs: "10pcs",
    name2: "Tiger prawn nigiri",
  },
  {
    name: "SPRING ROLL",
    name2: "Tiger prawn nigiri",
  },
];
