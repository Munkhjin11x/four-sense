import Image from "next/image";
import { Modal } from "./modal";
import { cn } from "@/lib/utils";

export const TeamMemberModal = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name: string;
    image: string;
    description: string;
  };
}) => {
  return (
    <Modal containerClassname="py-2" title="" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <p
          className={cn("font-semibold text-2xl text-[#F0B381] tracking-wide")}
        >
          {data.name}
        </p>
        <Image
          className="h-[400px] rounded-lg object-cover"
          src={data.image}
          alt={data.name}
          width={500}
          height={200}
        />
        <div>
          <p className="text-lg  text-[#488457] bg-[]  ">{data.description}</p>
        </div>
      </div>
    </Modal>
  );
};
