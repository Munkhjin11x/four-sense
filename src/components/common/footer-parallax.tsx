"use client";

import { FooterVideo } from "./footer";
import { FooterSection } from "./footer-section";
import { usePathname } from "next/navigation";

export const FooterParallax = () => {
  const data = [{ child: <FooterSection /> }, { child: <FooterVideo /> }];
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="relative h-full scroll-smooth">
      {data.map((item, ind) => (
        <div
          key={ind}
          className="sticky bottom-[0.01%]"
          style={{ zIndex: data.length - ind }}
        >
          {item.child}
        </div>
      ))}
    </div>
  );
};
