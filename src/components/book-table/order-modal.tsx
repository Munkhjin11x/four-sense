"use client";
import { useState } from "react";
import { Modal } from "../common/modal";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { Seat } from "./seat";
import { Button } from "../ui";
import { toast } from "sonner";

import { FormProvider, useForm } from "react-hook-form";
import { FormFieldDatePicker } from "../common/custom-calendar";

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
  const form = useForm();
  const { control } = useForm();
  const [selectedTime, setSelectedTime] = useState("");
  const handleOrder = () => {
    toast.success("Order placed successfully");
    onClose();
  };
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
        <Input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="border-b border-[#488457] bg-transparent text-[#488457] text-2xl font-semibold placeholder:text-[#488457]"
          placeholder="SELECT TIME"
        />
        <FormProvider {...form}>
          <FormFieldDatePicker
            control={control}
            name="date"
            label="Date"
            className="w-full"
          />
        </FormProvider>

        <div
          key={tableName}
          className="flex border  gap-2 py-5 border-[#488457]  pb-10 rounded-lg px-4"
        >
          {seats.map((seat) => (
            <Seat key={seat} seatNumber={seat + 1} rotate="rotate-0" />
          ))}
        </div>
        <Button
          onClick={handleOrder}
          className="bg-[#E78140] hover:bg-[#E78140]/90 text-white rounded-none rounded-tl-3xl"
        >
          Order
        </Button>
      </div>
    </Modal>
  );
};
