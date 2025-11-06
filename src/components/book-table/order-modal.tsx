"use client";

import { Modal } from "../common/modal";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { Seat } from "./seat";
import { Button } from "../ui";
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { FormFieldDatePicker } from "../common/custom-calendar";
import { useMutation } from "@tanstack/react-query";
import { apiCreateOrder } from "@/store/api";
import { UseTurnstile, useTurnstileStore } from "@/hook/use-turnstile";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";

const font = localFont({
  src: "../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});

interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  date: Date;
}

export const OrderModal = ({
  isOpen,
  onClose,
  seats,
  tableName,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  seats: { $oid: string; seatNumber?: number }[];
  tableName: string;
  refetch: () => void;
}) => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const form = useForm<OrderFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      date: date ? new Date(date) : new Date(),
    },
  });

  const { mutate: createOrder, isPending } = useMutation<
    unknown,
    Error,
    {
      name: string;
      phone: string;
      email: string;
      tableName: string;
      seatIds: { $oid: string; seatNumber?: number }[];
      date: Date;
      turnstileToken: string;
      eventDate: number;
    }
  >({
    mutationFn: (data) =>
      apiCreateOrder({
        ...data,
        seatIds: data.seatIds.map((seat) => seat.$oid),
      }),

    onSuccess: () => {
      toast.success("Order placed successfully");
      form.reset();
      onClose();
      refetch();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Order placement failed");
    },
  });

  const { token } = useTurnstileStore();

  const onSubmit = (data: OrderFormData) => {
    if (!token) {
      toast.error("Please complete the CAPTCHA verification");
      return;
    }

    createOrder({
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      tableName: tableName,
      seatIds: seats,
      date: data.date,
      turnstileToken: token,
      eventDate: date ? 1 : 0,
    });
  };

  return (
    <Modal title={`${tableName} Table`} isOpen={isOpen} onClose={onClose}>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full gap-10"
        >
          <Input
            {...form.register("fullName", {
              required: "Full name is required",
            })}
            className={cn(
              font.className,
              "border-b rounded-none border-[#488457] placeholder:opacity-50 bg-transparent placeholder:text-[#488457] placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
            )}
            placeholder="FULL NAME"
          />
          {form.formState.errors.fullName && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.fullName.message}
            </span>
          )}

          <Input
            {...form.register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={cn(
              font.className,
              "border-b rounded-none border-[#488457] placeholder:opacity-50 bg-transparent placeholder:text-[#488457] placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
            )}
            placeholder="EMAIL ADDRESS"
          />
          {form.formState.errors.email && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.email.message}
            </span>
          )}

          <Input
            {...form.register("phone", {
              required: "Phone number is required",
            })}
            className={cn(
              font.className,
              "border-b rounded-none border-[#488457] placeholder:opacity-50 bg-transparent placeholder:text-[#488457] placeholder:text-2xl placeholder:font-semibold placeholder:font-roba"
            )}
            placeholder="PHONE NUMBER"
          />
          {form.formState.errors.phone && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.phone.message}
            </span>
          )}

          <FormFieldDatePicker
            control={form.control}
            name="date"
            label="Date"
            className="w-full"
          />

          <div
            key={`${tableName}-${seats.join("-")}`}
            className="flex border flex-wrap gap-6 py-5 border-[#488457] pb-10 rounded-lg px-4"
          >
            {seats.map((seat, index) => (
              <Seat
                key={`${tableName}-${seat.$oid}-${index}`}
                seatNumber={seat.seatNumber ?? index + 1}
                rotate="rotate-0"
              />
            ))}
          </div>
          {date && (
            <div className="text-sm text-gray-500">
              <p className="text-[#488457]">
                You are selected event date:{" "}
                {format(new Date(date), "yyyy-MM-dd HH:mm")}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label
              className={cn(
                font.className,
                "text-[#488457] text-sm font-semibold"
              )}
            >
              Please verify you&apos;re human:
            </label>
            <UseTurnstile className="w-full" />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="bg-[#E78140] hover:bg-[#E78140]/90 text-white rounded-none rounded-tl-3xl"
          >
            {isPending ? "Processing..." : "Order"}
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};
