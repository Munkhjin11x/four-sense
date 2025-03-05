import { cn } from "@/lib/utils";
import Animation from "../ui/animation";

export const Rolls = ({
  title,
  data,
  titleClassName,
}: {
  title: string;
  data: RollProps[];
  titleClassName?: string;
}) => {
  return (
    <Animation className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p
          className={cn(
            titleClassName,
            "text-3xl md:text-4xl lg:text-6xl font-bold text-[#488457]"
          )}
        >
          {title}
        </p>
        <div className="flex flex-col">
          {data.map((item, index) => (
            <div className="flex gap-2" key={index}>
              <p className="text-[#488457] text-base md:text-lg lg:text-xl">
                {item.pcs}
              </p>
              <p className="text-[#D9864E] text-lg md:text-xl lg:text-2xl font-bold">
                {item.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        {data.map((item, index) => (
          <div
            className="flex justify-between text-sm md:text-base lg:text-lg"
            key={index}
          >
            <p>{item.name}</p>
            <p>{item.name2}</p>
          </div>
        ))}
      </div>
    </Animation>
  );
};

type RollProps = {
  name: string;
  name2: string;
  price?: string;
  pcs?: string;
};
