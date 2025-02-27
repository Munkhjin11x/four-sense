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
          alt="Loading Logo"
        />

        <Slider value={[progress]} className="h-0.5 mt-24" />
      </div>

      <Image
        src={CDN_URL + "/images/bottom.png"}
        width={200}
        height={200}
        alt="Bottom Decoration"
        className="pb-20"
      />
    </div>
  );
};
