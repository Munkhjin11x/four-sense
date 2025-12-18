import { CDN_URL } from "@/constants/contant";
import Image from "next/image";
import Animation from "../ui/animation";

export const GreenSection = () => {
  return (
    <div className="h-screen relative flex w-full max-sm:px-5 items-center z-0 justify-center bg-cover">
      <Image
        src={CDN_URL + "/images/1.jpeg"}
        alt=""
        width={0}
        height={0}
        className="w-full h-full object-cover absolute inset-0 -z-10 "
        sizes="100vw"
      />
      <Animation>
        <div className=" w-full flex flex-col gap-6 items-center justify-center">
          <div className=" relative flex justify-center  z-50 w-full">
            <video
              preload="none"
              className="rounded-tr-[50px] max-w-[1224px]  rounded-bl-[50px] max-sm:h-[400px]  h-[670px]  w-full object-cover"
              autoPlay
              playsInline
              loop
              muted
            >
              <source src={CDN_URL + "/home/new.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Image
              src={CDN_URL + "/images/welcome.png"}
              alt=""
              width={1000}
              height={0}
              className=" absolute top-1/2 left-1/2 flex justify-center -translate-x-1/2 -translate-y-1/2"
              sizes="100vw"
            />
            <div className="absolute max-xl:hidden -z-10 max-sm:hidden  w-full 2xl:max-w-[1300px] top-1/2 max-sm:left-[39%] left-[41%] items-center flex justify-center -translate-x-1/2 -translate-y-1/2 ">
              <Image
                src={CDN_URL + "/images/arrow.png"}
                alt=""
                width={0}
                height={0}
                className="w-full h-full"
                sizes="100vw"
              />

              <Image
                src={CDN_URL + "/images/frame.png"}
                alt=""
                width={0}
                height={0}
                className="w-full object-cover"
                sizes="100vw"
              />
            </div>
          </div>
          <p className="text-white text-center text-2xl max-w-[1000px]">
            Welcome to FOURSENSES, where every cocktail is a journey through
            sight, smell, hearing, and taste. Nestled in the heart of the city,
            our bar is a sanctuary for those seeking to immerse themselves in a
            world of sensory delights
          </p>
        </div>
      </Animation>
    </div>
  );
};
