"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useCallback, useState } from "react";
import { CDN_URL } from "@/constants/contant";
import useLoading from "@/hook/use-loading";

export const Home = () => {
  const { scrollXProgress } = useScroll();
  const [, setVideoLoaded] = useState(false);
  const loading = useLoading(4050);

  const smoothConfig = { stiffness: 50, damping: 30, mass: 1.2 };
  const smoothConfigLogo = { stiffness: 20, damping: 20, mass: 2 };

  const yBigMouth = useSpring(
    useTransform(
      scrollXProgress,
      [0, 1],
      !loading ? ["40%", "5%"] : ["0%", "0%"]
    ),
    smoothConfig
  );
  const yLogo = useSpring(
    useTransform(
      scrollXProgress,
      [0, 1],
      !loading ? ["160%", "-30%"] : ["0%", "0%"]
    ),
    smoothConfigLogo
  );
  const yLittle = useSpring(
    useTransform(
      scrollXProgress,
      [0, 1],
      !loading ? ["10%", "25%"] : ["0%", "0%"]
    ),
    smoothConfig
  );
  const handleLoading = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <div className=" relative w-full overflow-hidden">
      <video
        preload="none"
        className="absolute -z-10 h-full w-full object-cover"
        autoPlay
        playsInline
        loop
        muted
        onLoadedData={handleLoading}
      >
        <source src={CDN_URL + "/home/sky.webm"} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="relative h-full">
        <motion.div style={{ y: yBigMouth }} className="w-full">
          <Image
            src={CDN_URL + "/home/big-mounth.png"}
            alt="Big Mouth"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full"
          />
        </motion.div>

        <motion.div
          style={{ y: yLogo }}
          className="absolute top-1/2 left-[38%] flex justify-center -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src={"/home/logo.webp"}
            alt="Logo"
            width={480}
            height={480}
            sizes="100vw"
          />
        </motion.div>

        <motion.div style={{ y: yLittle }} className="absolute top-0 w-full">
          <Image
            src={CDN_URL + "/home/little.png"}
            alt="Little"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full"
          />
        </motion.div>
      </div>
    </div>
  );
};
