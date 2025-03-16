"use client";

import Image from "next/image";
import { Slider } from "../ui";
import { useEffect, useState } from "react";
import { CDN_URL } from "@/constants/contant";
export const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute h-screen flex flex-col items-center justify-between w-full bg-cover bg-center bg-no-repeat z-[1000000000]"
      style={{ backgroundImage: "url(/images/loading2.png)" }}
    >
      <div></div>
      <div className="w-full flex flex-col items-center">
        <Image
          src={CDN_URL + "/images/load-logo.png"}
          width={400}
          height={400}
          className="max-sm:size-[300px] object-contain"
          alt="Loading Logo"
        />

        <Slider value={[progress]} className="h-0.5 mt-24" />
      </div>
      <div className="flex flex-col pb-20 gap-2 items-center">
        <Image
          src={CDN_URL + "/images/bottom.png"}
          width={140}
          height={140}
          alt="Bottom Decoration"
        />
        <p className="text-[#E78140]">Nomad-Ability Bar</p>
      </div>
    </div>
  );
};
