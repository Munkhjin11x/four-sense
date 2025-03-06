import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";
import Image from "next/image";

export const Position = ({
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
    img: string;
    ingredients: string;
    by: string;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPosition = () => {
    const xPos = x.includes("%") ? x : x;
    const yPos = y.includes("%") ? y : y;

    return { left: xPos, top: yPos };
  };

  return (
    <div className="absolute" style={getPosition()}>
      <TooltipProvider>
        <Tooltip open={isOpen} onOpenChange={setIsOpen}>
          <TooltipTrigger asChild>
            <div
              className="relative z-30 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => !isMobile && setIsOpen(true)}
              onMouseLeave={() => !isMobile && setIsOpen(false)}
            >
              <div className="border-4 w-fit rounded-full">
                <div className="border-[3px] size-5 border-[#E78140] rounded-full bg-[#F9DAB2]" />
              </div>
              <p
                className={`text-[#F9DAB2] ${
                  isMobile ? "text-base" : "text-xl"
                } absolute top-8 left-5 font-semibold ${
                  isMobile ? "w-[100px]" : "w-[140px]"
                }`}
              >
                {title}
              </p>
            </div>
          </TooltipTrigger>
          {content && (
            <TooltipContent
              side={isMobile ? "bottom" : "right"}
              sideOffset={isMobile ? 5 : 0}
              className="z-30 w-fit bg-white text-black p-4 rounded-none !rounded-tr-[50px] max-w-[95vw] md:max-w-[500px]"
            >
              <div className="space-y-2">
                <p className="text-lg text-[#667085]">{title}</p>
                <h3 className="text-2xl font-bold text-[#2F8653]">
                  {content.title}
                </h3>
                <p className="text-xl max-w-full">{content.desc}</p>
                <p className="text-lg text-black">{content.tag}</p>
                <div className="flex justify-between text-sm">
                  <span>ABV: {content.abv}</span>
                  <span>Price: ₮{content.price}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
                  <Image
                    className="w-full h-auto md:size-[200px] object-cover rounded-br-lg rounded-tl-lg"
                    src={content.img}
                    alt=""
                    width={200}
                    height={200}
                  />
                  <div className="flex flex-col gap-2 justify-between h-full">
                    <div className="flex items-center gap-2">
                      <p>By</p>
                      <p className="bg-[#2F8653] py-2 px-3 text-white font-semibold rounded-tl-xl rounded-br-xl">
                        {content.by}
                      </p>
                    </div>
                    {[
                      { name: "Sweet", value: content.sweet },
                      { name: "Sour", value: content.sour },
                      { name: "Herbal", value: content.herbal },
                      { name: "Umami", value: content.umami },
                    ].map((flavor) => (
                      <div
                        key={flavor.name}
                        className="flex items-center gap-2"
                      >
                        <span className="w-16">{flavor.name}</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`size-3 md:size-4 rounded-full ${
                                i < flavor.value
                                  ? "bg-[#2F8653]"
                                  : "bg-[#D0D5DD]"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#2F8653] p-3 md:p-4 flex flex-col gap-2 font-semibold rounded-tl-[21px] rounded-br-[21px]">
                  <p className="text-lg md:text-xl font-bold text-[#FFF] max-w-full">
                    {content.ingredients}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
                    <div className="flex items-end">
                      <p className="text-sm md:text-base">ABV:</p>
                      <p className="text-2xl md:text-4xl text-[#F1D5AD] font-bold">
                        {content.abv}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="text-sm md:text-base">Price:</p>
                      <p className="text-2xl md:text-4xl text-[#F1D5AD] font-bold">
                        {content.price}
                      </p>
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
