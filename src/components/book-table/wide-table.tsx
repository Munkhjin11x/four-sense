import { cn } from "@/lib/utils";

export const WideTable = ({
  title,
  width,
  height,
}: {
  title: string;
  width: number;
  height: number;
}) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={cn(
        "border bg-white sm:w-[200px] relative rounded-xl hover:bg-[#FBEAD9] hover:border-[#E36C2C] flex justify-center px-14 items-center border-[#00000066]"
      )}
    >
      <p className="text-[#E36C2C] text-lg text-center font-bold">{title}</p>
    </div>
  );
};
