import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import Animation from "../ui/animation";
export const Menu = ({
  data,
  title,
  titleClassName,
  priceClassName,
  className,
}: {
  data: MenuProps[];
  title: string;
  titleClassName?: string;
  priceClassName?: string;
  className?: string;
}) => {
  return (
    <Animation className={cn("flex flex-col gap-4 py-5 px-5", className)}>
      <p
        className={cn(
          titleClassName,
          " 2xl:text-6xl md:text-6xl text-4xl font-bold text-[#488457]"
        )}
      >
        {title}
      </p>
      <div className="flex flex-col gap-5">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4"
          >
            <div className="w-full sm:w-auto">
              <p className="text-xl font-bold">{item.name}</p>
              <p className="text-sm max-w-prose">{parse(item.description)}</p>
            </div>
            <p
              className={cn(
                "text-[#D9864E] text-xl sm:text-2xl font-bold whitespace-nowrap",
                priceClassName
              )}
            >
              {item.price}
            </p>
          </div>
        ))}
      </div>
    </Animation>
  );
};

type MenuProps = {
  name: string;
  price: string;
  description: string;
};
