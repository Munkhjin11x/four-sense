import React from "react";
import Animation from "../ui/animation";
import Image from "next/image";

export const MenuImage = () => {
  const data = ["/food/1.png", "/food/2.png", "/food/3.png"];
  const scrollingImages = [...data, ...data, ...data];
  return (
    <Animation>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex animate-scroll gap-1"
          style={{
            animation: "scroll 50s linear infinite",
            width: "fit-content",
          }}
        >
          {scrollingImages.map((e, i) => (
            <Image
              key={i}
              src={e}
              alt={e}
              width={836}
              height={0}
              sizes="100vw"
              className="object-cover min-w-[836px] h-[600px]"
            />
          ))}
        </div>
      </div>
    </Animation>
  );
};
