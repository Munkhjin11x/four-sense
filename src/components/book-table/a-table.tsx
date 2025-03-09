import React from "react";

export const ATable = ({ title }: { title: string }) => {
  return (
    <div className="rounded-full relative size-[56px] hover:bg-[#FBEAD9] hover:border-[#E36C2C] flex items-center justify-center bg-white text-white border border-[#00000066]">
      <p className="text-[#E36C2C] text-lg text-center font-bold"> {title}</p>
    </div>
  );
};
