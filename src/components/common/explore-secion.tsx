import Image from "next/image";
import { CDN_URL } from "@/constants/contant";

import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Animation from "../ui/animation";
import Marquee from "react-fast-marquee";

const font = localFont({
  src: "../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});
export const ExploreSection = () => {
  const scrollingImages = [...data, ...data];

  return (
    <div className="bg-[#F9D9B1] w-full h-full max-sm:px-5 flex justify-center mt-[80px]">
      <div className="w-full flex pb-2 flex-col items-center pt-24">
        <div className="flex flex-col gap-2 justify-center items-center w-full pb-10">
          <Animation>
            <p
              className={cn(
                "text-6xl text-center text-[#E78140] font-roba",
                font.className
              )}
            >
              EXPLORE OUR LATEST <br /> PHOTO
            </p>
          </Animation>
          <Animation className="max-w-[800px]">
            <p className="max-sm:text-sm text-xl text-[#E78140] text-center">
              Our {"bar's"} content is unique in that it innovates its menu and
              branding based on the four human senses, four elements, and four
              seasons.
            </p>
          </Animation>
        </div>
        <Animation>
          <div className="relative w-full overflow-hidden">
            <Marquee className="">
              {scrollingImages.map((e, i) => (
                <Image
                  key={i}
                  src={CDN_URL + e}
                  alt={e}
                  width={836}
                  height={0}
                  sizes="100vw"
                  className="object-cover mx-1 min-w-[836px] h-[600px]"
                />
              ))}
            </Marquee>
          </div>
        </Animation>
      </div>
    </div>
  );
};

const data = ["/images/room1.png", "/images/room2.png", "/images/room3.png"];
