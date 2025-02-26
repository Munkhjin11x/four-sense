import { CDN_URL } from "@/constants/contant";
import { AboutIcon } from "@/icons";
import Image from "next/image";

export const YellowSection = () => {
  return (
    <div
      className="h-screen relative flex w-full items-center z-0 justify-center bg-cover px-20"
      style={{ backgroundImage: "url(/images/2.jpeg)" }}
    >
      <div className="flex flex-col lg:flex-row justify-between w-full items-center gap-6 md:gap-12">
        <div className="flex flex-col lg:flex-row items-center gap-10 w-full">
          <div className="w-full relative text-white gap-2 h-14 bg-no-repeat flex items-center justify-center ">
            <Image
              src={CDN_URL + "/images/bookmark.svg"}
              alt=""
              width={0}
              height={0}
              className="w-full h-full absolute  inset-0 -z-10 "
              sizes="100vw"
            />
            <AboutIcon color="white" />
            About Us
          </div>
          <p className="text-[#488457] max-sm:text-sm text-2xl max-w-[800px]">
            Four Senses is the first Nomad-Ability bar that combines the
            traditional Mongolian nomadic culture with modern sustainable
            development principles.We based on the {"nomadic way of life"} and
            aims to create a new standard of environmentally-friendly and
            responsible service.{" "}
          </p>
        </div>
        <Image
          src={CDN_URL + "/images/group.png"}
          alt=""
          width={650}
          height={610}
        />
      </div>
    </div>
  );
};
