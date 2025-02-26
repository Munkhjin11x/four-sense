import Image from "next/image";
import { CDN_URL } from "@/constants/contant";
export const ExploreSection = () => {
  return (
    <div className="bg-[#F9D9B1] w-full h-full flex justify-center mt-[80px]">
      <div className="w-full flex flex-col items-center pt-24">
        <div className="flex flex-col gap-2 items-center w-full pb-10">
          <Image
            src={CDN_URL + "/images/explore.png"}
            width={495}
            height={0}
            alt=""
          />
          <p className="text-xl text-[#E78140] max-w-[800px] text-center">
            Our {"bar's"} content is unique in that it innovates its menu and
            branding based on the four human senses, four elements, and four
            seasons.
          </p>
        </div>
        <div className="flex overflow-x-auto">
          {data.map((e, i) => (
            <Image
              key={i}
              src={CDN_URL + e}
              alt={e}
              width={836}
              height={0}
              sizes="100vw"
              className="object-cover  "
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const data = ["/images/room1.png", "/images/room2.png", "/images/room3.png"];
