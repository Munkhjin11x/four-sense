"use client";

import { FooterVideo } from "./footer";
import { FooterSection } from "./footer-section";

export const FooterParallax = () => {
  const data = [{ child: <FooterSection /> }, { child: <FooterVideo /> }];

  return (
    <div className="relative h-full scroll-smooth">
      {data.map((item, ind) => (
        <div
          key={ind}
          className="sticky bottom-[1%]"
          style={{ zIndex: data.length - ind }}
        >
          {item.child}
        </div>
      ))}
    </div>
  );
};
