import { DownloadIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";

export const Ability = () => {
  return (
    <div className="relative bg-[url('/menu/bg.png')]  bg-cover bg-center  bg-no-repeat w-full">
      {/* <Image
        src={"/menu/bg.png"}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-full  -z-10 "
      /> */}
      <div className="flex  flex-col gap-4 justify-center items-center">
        <Image
          src={"/menu/nomad.png"}
          alt=""
          width={1100}
          height={700}
          sizes="100vw"
          className="mt-24"
        />
        <div>
          <Image
            src={"/menu/mongolia.png"}
            alt=""
            width={1500}
            height={700}
            sizes="100vw"
            className=""
          />
        </div>

        <div className="pb-20 flex flex-col gap-2 items-center">
          <Image
            src={"/menu/logo.png"}
            alt=""
            width={180}
            height={700}
            sizes="100vw"
            className=""
          />
          <p className="text-[#F9DAB2] text-center text-2xl font-bold">
            Spring Menu
          </p>
          <Link
            className="border hidden gap-2 lg:flex max-sm:text-sm max-sm:px-5 text-nowrap text-white border-white px-10 rounded-tl-full py-3"
            href={"/bar-menu"}
          >
            <DownloadIcon />
            BAR Menu Download
          </Link>
        </div>
      </div>
    </div>
  );
};
