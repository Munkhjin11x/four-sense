import Image from "next/image";
import { Input } from "../ui/input";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const FooterSection = () => {
  return (
    <div
      className="h-full flex w-full flex-col items-center bg-cover p-4 sm:p-10 justify-center"
      style={{ backgroundImage: "url(/images/footer.webp)" }}
    >
      <div className="flex flex-col gap-10 sm:gap-20 justify-start w-full max-w-[1740px] px-4 sm:px-10 mt-10 sm:mt-20">
        <Image
          src={"/images/footer-title.webp"}
          alt=""
          width={782}
          height={500}
          className=""
        />
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2">
            <Input
              className="border-b rounded-none border-[#488457] bg-transparent placeholder:text-[#488457] placeholder:text-lg sm:placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
              placeholder="FULL NAME"
            />
            <Input
              className="border-b rounded-none border-[#488457] bg-transparent placeholder:text-[#488457] placeholder:text-lg sm:placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
              placeholder="EMAIL ADDRESS"
            />
            <Input
              className="border-b rounded-none border-[#488457] bg-transparent placeholder:text-[#488457] placeholder:text-lg sm:placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
              placeholder="PHONE NUMBER"
            />
            <Input
              className="border-b rounded-none border-[#488457] bg-transparent placeholder:text-[#488457] placeholder:text-lg sm:placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
              placeholder="Message"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 sm:gap-0">
          <div className="text-[#E78140] text-base sm:text-xl flex flex-col gap-2">
            <p>Make a reservation: (+976)9660-9993</p>
            <p>info@foursenses.mn</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#E78140] text-base sm:text-xl">
              ALTAN JOLOO TOWER B1, Ulaanbaatar, Mongolia
            </p>
            <Link
              className="text-[#E78140] text-base sm:text-xl flex items-center gap-2"
              href="https://maps.app.goo.gl/mo7UawLVTtprHxiR8"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on map
              <ArrowUpRight />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 sm:gap-0">
          <div>
            <p className="text-[#E78140] text-base sm:text-xl">
              Monday to Wednesday: 7:30 PM –2:00 AM
            </p>
            <p className="text-[#E78140] text-base sm:text-xl">
              Thursday to Sunday: 8:00 PM – 4:00 AM
            </p>
          </div>
          <div className="flex gap-4 justify-center sm:justify-start">
            {links.map((e, i) => {
              return (
                <Link
                  className="border-2 border-[#E78140] flex items-center justify-center h-fit p-2 rounded-tl-2xl"
                  key={i}
                  href={e.href}
                >
                  <Image src={e.icon} alt="'" width={24} height={24} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
const links = [
  {
    icon: "/social/facebook.svg",
    href: "/",
  },
  {
    icon: "/social/instagram.svg",
    href: "/",
  },
  {
    icon: "/social/youtube.svg",
    href: "/",
  },
  {
    icon: "/social/spotify.svg",
    href: "/",
  },
];
