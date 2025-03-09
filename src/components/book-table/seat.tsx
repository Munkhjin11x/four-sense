import { cn } from "@/lib/utils";

export const Seat = ({
  seatNumber,
  rotate,
}: {
  seatNumber: number;
  rotate: string;
}) => {
  return (
    <div
      className={cn("relative flex items-center justify-center group", rotate)}
    >
      <div className="relative w-10 h-8 bg-white group-hover:bg-[#FBEAD9] group-hover:border-[#E36C2C] rounded-lg z-30  flex items-center justify-center border-2 border-[#00000066]">
        <p className={cn("text-sm font-bold text-black", rotate)}>
          {seatNumber}
        </p>
        <div className="w-7 h-5 bg-white group-hover:bg-[#FBEAD9] group-hover:border-[#E36C2C] rounded-b-lg mx-auto border-l-2 border-t-2 border-r-2 border-b-2 border-[#00000066] absolute top-7"></div>
      </div>
    </div>
  );
};
