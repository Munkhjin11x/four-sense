import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";
import Image from "next/image";
import { TagIcon } from "@/icons/tag";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ToolMobileModal } from "./tool-mobile-modal";
import useScreenSize from "@/hook/use-screen";
export const Position = ({
  title,
  x,
  y,
  content,
}: {
  title?: string;
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
    img: string[];
    ingredients: string;
    by: string;
  };
}) => {
  const { width } = useScreenSize();
  const mobile = width < 768;
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <TooltipProvider>
        <Tooltip
          open={isOpen}
          onOpenChange={mobile ? setIsMobileOpen : setIsOpen}
        >
          <TooltipTrigger asChild>
            <div
              className="relative z-20 cursor-pointer"
              onClick={() => (mobile ? setIsMobileOpen(true) : setIsOpen(true))}
              onMouseEnter={() => (mobile ? "" : setIsOpen(true))}
              onMouseLeave={() => (mobile ? "" : setIsOpen(false))}
            >
              <div className="border-2 sm:border-4 w-fit rounded-full">
                <div className="border-[3px] size-1 sm:size-5 border-[#E78140] rounded-full bg-[#F9DAB2]" />
              </div>
              <p className="text-[#F9DAB2] hidden sm:block sm:text-xl absolute top-8 left-5 font-semibold sm:w-[140px]">
                {title}
              </p>
            </div>
          </TooltipTrigger>
          {content && (
            <TooltipContent
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              side="right"
              className="z-30 w-fit bg-white text-black  p-4 rounded-none !rounded-tr-[50px]"
            >
              <div className="space-y-2">
                <p className="text-lg text-[#667085]">{title}</p>
                <h3 className="text-2xl font-bold text-[#2F8653]">
                  {content.title}
                </h3>
                <p className="text-sm sm:text-xl max-w-[400px]">
                  {content.desc}
                </p>
                <div className="flex items-center gap-2">
                  <TagIcon />
                  <p className="text-sm sm:text-lg text-black">{content.tag}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 h-full">
                  <Swiper
                    spaceBetween={1}
                    slidesPerView={1}
                    className="w-[200px] h-[200px]"
                  >
                    {content.img.map((img, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          className=" size-[200px] object-cover rounded-br-lg rounded-tl-lg"
                          src={img}
                          alt={`Slide ${index}`}
                          width={200}
                          height={200}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="flex flex-col justify-between h-full">
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
                <div className="bg-[#2F8653] p-4 flex flex-col gap-2.5 font-semibold rounded-tl-[21px] rounded-br-[21px]">
                  <p className="text-sm sm:text-xl font-bold text-[#FFF] max-w-[400px]">
                    {content.ingredients}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-end">
                      <p className="text-base">ABV:</p>
                      <p className="text-4xl text-[#F1D5AD] font-bold">
                        {content.abv}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="text-base">Price:</p>
                      <p className="text-4xl text-[#F1D5AD] font-bold">
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
      <ToolMobileModal
        title={title || ""}
        content={content}
        isOpen={isMobileOpen}
        setIsOpen={mobile ? setIsMobileOpen : setIsOpen}
      />
    </div>
  );
};
