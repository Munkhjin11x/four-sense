import { CDN_URL } from "@/constants/contant";
import { AboutIcon } from "@/icons";
import Image from "next/image";
import Animation from "../ui/animation";

export const OrangeSection = () => {
  return (
    <div
      className="h-screen relative flex w-full items-center z-0 justify-center bg-cover max-sm:px-5 px-20"
      style={{ backgroundImage: "url(/images/3.jpeg)" }}
    >
      <Animation>
        <div className="flex flex-col lg:flex-row justify-between w-full items-center gap-6 md:gap-12">
          <div className="flex flex-col lg:flex-row items-center lg:gap-10 w-full">
            <div className="flex flex-col gap-4">
              <div className="w-full max-w-[220px] relative text-white font-semibold gap-2 h-14 bg-no-repeat flex items-center justify-center">
                <Image
                  src={CDN_URL + "/images/bookmark2.svg"}
                  alt=""
                  width={0}
                  height={0}
                  className="w-full h-full absolute  inset-0 -z-10 "
                  sizes="100vw"
                />
                <AboutIcon color="white" />
                Our Mission
              </div>
              <div className=" text-white  rounded-lg max-sm:text-xs xl:text-lg leading-relaxed">
                <p>
                  Mongolian nomadic culture is a way of life that works in harmony
                  with nature, uses resources wisely, and is sustainable. We are
                  bringing this rich heritage into the modern service industry in
                  a creative way, staying true to the values of sustainable
                  development.
                </p>

                <ul className="space-y-2">
                  <li>• To embody the essence of nomadic culture,</li>
                  <li>
                    • To engage in environmentally friendly and sustainable
                    practices,
                  </li>
                  <li>• To be an innovator at the global level.</li>
                </ul>

                <p className="">
                  The first Mongolian{"nomadic culture"}-based sustainable bar is
                  not only a new approach to drinking culture but will also
                  promote modern responsible consumption by respecting the
                  environment and cultural heritage.
                </p>
              </div>
            </div>

          </div>
          <Image
            src={CDN_URL + "/images/group2.png"}
            alt=""
            className=" max-lg:size-[400px]"
            width={650}
            height={610}
          />
        </div>
      </Animation>
    </div>
  );
};
