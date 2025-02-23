import {
  HelpIcon,
  HomeIcon,
  LeafIcon,
  RounderIcon,
  TriangleIcon,
  WavyIcon,
} from "@/icons";
import Image from "next/image";
import React from "react";

export const TeamSection = () => {
  return (
    <div
      className="h-screen relative flex w-full z-0 justify-center bg-cover p-14"
      style={{ backgroundImage: "url(/images/team-photo.png)" }}
    >
      <div className="flex flex-col  justify-start items-center w-full  gap-6 md:gap-12">
        <Image
          src={"/images/team-member-logo.png"}
          alt=""
          width={215}
          height={215}
        />
        <p className="text-white text-center max-w-[9A00px]">
          Our expert mixologists craft cocktails that engage four senses of
          sight, sound, smell, and taste, using their fifth sense to create
          truly unique experiences for our guests, which allows us to meet your
          needs in the best way possible. 
        </p>
      </div>
      {icons.map((item, index) => (
        <div
          key={index}
          className="absolute bg-white p-1 rounded-md border-4 border-[#3C9660]"
          style={{ left: item.x, top: item.y }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};
const icons = [
  {
    icon: <WavyIcon />,
    x: "12%",
    y: "65%",
  },
  {
    icon: <HomeIcon color="#D9864E" />,
    x: "26%",
    y: "65%",
  },
  {
    icon: <TriangleIcon />,
    x: "42%",
    y: "65%",
  },
  {
    icon: <RounderIcon />,
    x: "57%",
    y: "65%",
  },
  {
    icon: <LeafIcon />,
    x: "72%",
    y: "65%",
  },
  {
    icon: <HelpIcon />,
    x: "85%",
    y: "65%",
  },
];
