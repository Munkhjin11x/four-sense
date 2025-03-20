import React from "react";
import { Modal } from "../common/modal";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { TagIcon } from "@/icons/tag";
import "swiper/css";
import { Autoplay } from "swiper/modules";
export const ToolMobileModal = ({
  isOpen,
  setIsOpen,
  title,
  content,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}) => {
  return (
    <Modal
      className="sm:hidden"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="h-full">
        <div className="space-y-2 flex flex-col justify-between h-full">
          <p className="text-lg text-[#667085]">{title}</p>
          <h3 className="text-2xl font-bold text-[#2F8653]">{content.title}</h3>
          <p className="text-sm sm:text-xl max-w-[400px]">{content.desc}</p>
          <div className="flex items-center gap-2">
            <TagIcon />
            <p className="text-sm sm:text-lg text-black">{content.tag}</p>
          </div>
          <div className="grid  gap-2 h-full">
            <Swiper
              spaceBetween={1}
              slidesPerView={1}
              className="w-full"
              modules={[Autoplay]}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
            >
              {content.img.map((img: string, index: number) => (
                <SwiperSlide className="w-full" key={index}>
                  <Image
                    className="object-cover w-full h-[400px] rounded-br-lg rounded-tl-lg"
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
                <div key={flavor.name} className="flex items-center gap-2">
                  <span className="w-16">{flavor.name}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`size-3 md:size-4 rounded-full ${
                          i < flavor.value ? "bg-[#2F8653]" : "bg-[#D0D5DD]"
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
      </div>
    </Modal>
  );
};
