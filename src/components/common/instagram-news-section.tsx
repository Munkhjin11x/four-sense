import { CDN_URL } from "@/constants/contant";
import { BookMarkIcon, CommentIcon, HeartIcon, ShareIcon } from "@/icons";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import Animation from "../ui/animation";
const font = localFont({
  src: "../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});
export const InstagramNewsSection = () => {
  return (
    <div className="flex justify-center bg-white">
      <div className="bg-white h-full w-full max-w-[1740px] px-10  py-7">
        <div className="flex flex-col gap-7 w-full">
          <div>
            <Animation>
              <p
                className={cn(
                  font.className,
                  "text-4xl text-[#E78140] font-roba"
                )}
              >
                INSTAGRAM NEWS @FOURSENSES
              </p>
            </Animation>
          </div>
          <Animation>
            <div className="flex gap-7 overflow-x-auto w-full max-w-full pb-4">
              {data.map((e, i) => (
                <InstragramCard key={i} data={e} />
              ))}
            </div>
          </Animation>
        </div>
      </div>
    </div>
  );
};

const InstragramCard = ({ data }: { data: InstagramType }) => {
  return (
    <div className="border min-w-[360px] rounded-md pb-2.5">
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-2 mb-2">
          <Image
            src={CDN_URL + "/images/instagram/logo.svg"}
            width={32}
            height={32}
            alt=""
          />
          <div>
            <p className="text-[12px] font-semibold">Foursenses.ub</p>
            <span className="text-[10px]">Foursenses</span>
          </div>
        </div>
        <Link
          href={""}
          className="py-1.5 px-3 text-white rounded-sm bg-[#0095F6]"
        >
          View profile
        </Link>
      </div>
      <Image
        src={CDN_URL + data.img}
        width={800}
        height={200}
        alt=""
        className="object-cover w-[369px] h-[400px] "
      />
      <div className="pt-3 px-2 ">
        <p className="text-[#0095F6] font-bold  pb-2">View more on Instagram</p>
        <hr />
        <div className="mt-1.5">
          <div className="flex justify-between">
            <div className="flex">
              <HeartIcon />
              <CommentIcon />
              <ShareIcon />
            </div>
            <BookMarkIcon />
          </div>
          <div className="mt-1.5">
            <p className="font-semibold">868,570 likes</p>
            <p className="font-semibold">instagram</p>
          </div>
        </div>
      </div>
    </div>
  );
};
type InstagramType = {
  img: string;
};
const data = [
  {
    img: "/images/instagram/1.jpeg",
  },
  {
    img: "/images/instagram/2.jpeg",
  },
  {
    img: "/images/instagram/3.jpeg",
  },
  {
    img: "/images/instagram/4.jpeg",
  },
  {
    img: "/images/instagram/5.jpeg",
  },
];
