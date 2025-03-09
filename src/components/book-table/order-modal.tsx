import React, { useState } from "react";
import { Modal } from "../common/modal";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { Seat } from "./seat";
import { Button } from "../ui";
const font = localFont({
  src: "../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});

export const OrderModal = ({
  isOpen,
  onClose,
  seats,
  tableName,
}: {
  isOpen: boolean;
  onClose: () => void;
  seats: number[];
  tableName: string;
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(seats);
  return (
    <Modal title={`${tableName} Table `} isOpen={isOpen} onClose={onClose}>
      <div className="grid w-full gap-10">
        <Input
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className={cn(
            font.className,
            "border-b rounded-none border-[#488457] placeholder:opacity-50 bg-transparent placeholder:text-[#488457] placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
          )}
          placeholder="FULL NAME"
        />
        <Input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={cn(
            font.className,
            "border-b rounded-none border-[#488457] placeholder:opacity-50  bg-transparent placeholder:text-[#488457] placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
          )}
          placeholder="EMAIL ADDRESS"
        />
        <Input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={cn(
            font.className,
            "border-b rounded-none border-[#488457] placeholder:opacity-50  bg-transparent placeholder:text-[#488457] placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
          )}
          placeholder="PHONE NUMBER"
        />

        <div
          key={tableName}
          className="flex border  gap-2 py-5 border-[#488457]  pb-10 rounded-lg px-4"
        >
          {seats.map((seat) => (
            <Seat key={seat} seatNumber={seat + 1} rotate="rotate-0" />
          ))}
        </div>
        <Button
          onClick={onClose}
          className="bg-[#E78140] hover:bg-[#E78140]/90 text-white rounded-none rounded-tl-3xl"
        >
          Order
        </Button>
      </div>
    </Modal>
  );
};
