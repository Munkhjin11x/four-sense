"use client";
import { DownloadIcon } from "@/icons";
import { useState } from "react";
import Link from "next/link";

export const Ability = () => {
  const [activeTab, setActiveTab] = useState<"fall" | "spring">("fall");

  const menuData = {
    fall: {
      pdf: "/menufall.pdf",
      label: "Fall Menu",
    },
    spring: {
      pdf: "/menu-spring.pdf",
      label: "Spring Menu",
    },
  };

  const currentMenu = menuData[activeTab];

  return (
    <div className="relative bg-[url('/menu/bg.png')] bg-cover bg-center bg-no-repeat w-full min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      <div className="relative z-10 flex mt-10 flex-col items-center w-full py-12 md:py-20 px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F9DAB2] mb-3 drop-shadow-lg">
            Bar Menu
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light">
            Explore our seasonal cocktail collection
          </p>
        </div>

        {/* Menu Card Container */}
        <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Tabs Section */}
          <div className="bg-gradient-to-r from-[#F9DAB2]/90 via-[#F9DAB2] to-[#F9DAB2]/90 px-6 py-5">
            <div className="flex gap-3 justify-center items-center flex-wrap">
              {(["fall", "spring"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-8 py-3 rounded-full font-semibold text-lg
                    transition-all duration-300 transform
                    ${activeTab === tab
                      ? "bg-[#308653] text-white shadow-xl scale-105 ring-4 ring-white/30"
                      : "bg-white/30 text-[#308653] hover:bg-white/50 hover:scale-102 shadow-md"
                    }
                  `}
                >
                  {menuData[tab].label}
                </button>
              ))}
            </div>
          </div>

          {/* PDF Viewer Section */}
          <div className="p-4 md:p-8 bg-white/5">
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 bg-white">
              <iframe
                src={currentMenu.pdf}
                className="w-full h-[500px] md:h-[700px] lg:h-[850px]"
                title={currentMenu.label}
              />
            </div>
          </div>

          {/* Footer Section with Download */}
          <div className="bg-gradient-to-r from-[#F9DAB2]/90 via-[#F9DAB2] to-[#F9DAB2]/90 px-6 py-6 flex justify-center">
            <Link
              href={currentMenu.pdf}
              target="_blank"
              className="
                group relative flex items-center gap-3 
                px-10 py-4 rounded-full
                bg-[#308653] text-white font-semibold text-lg
                shadow-xl hover:shadow-2xl
                transform hover:scale-105 hover:-translate-y-0.5
                transition-all duration-300
                ring-4 ring-white/30 hover:ring-white/50
              "
            >
              <DownloadIcon />
              <span>Download {currentMenu.label}</span>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-white/60 text-sm mt-8 text-center max-w-2xl">
          Our menu changes with the seasons to bring you the freshest flavors and innovative cocktails
        </p>
      </div>
    </div>
  );
};
