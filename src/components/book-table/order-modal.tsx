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
import { useEffect, useMemo } from "react";
import {
  toMongoliaISOString,
  isMongoliaPast,
} from "@/lib/date-utils";
import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

const font = localFont({
  src: "../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});

function InlineAlert({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-2xl border border-red-200/80 bg-red-50/90 p-3.5 text-sm leading-snug text-red-800 shadow-sm sm:p-4"
    >
      <AlertTriangle
        className="mt-0.5 size-4 shrink-0 text-red-600"
        aria-hidden
      />
      <div className="min-w-0 flex-1 font-medium">{children}</div>
    </div>
  );
}

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
  preselectedDate,
}: {
  isOpen: boolean;
  onClose: () => void;
  seats: { $oid: string; seatNumber?: number }[];
  tableName: string;
  refetch: () => void;
  preselectedDate?: Date;
}) => {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  // Handle URL-encoded date string (+ becomes space in URL params)
  const parsedDate = useMemo(() => {
    const date = dateParam ? dateParam.replace(/ /g, "+") : null;
    return date ? new Date(date) : new Date();
  }, [dateParam]);

  // Only use URL date if valid and not in the past (Mongolia timezone)
  const isValidDate =
    dateParam &&
    !isNaN(parsedDate.getTime()) &&
    !isMongoliaPast(parsedDate);

  const form = useForm<OrderFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      date: preselectedDate ?? new Date(),
    },
  });

  useEffect(() => {
    if (isValidDate) {
      form.setValue("date", parsedDate);
    } else if (preselectedDate) {
      form.setValue("date", preselectedDate);
    }
  }, [dateParam, isValidDate, parsedDate, preselectedDate, form]);

  const { mutate: createOrder, isPending } = useMutation<
    unknown,
    Error,
    {
      name: string;
      phone: string;
      email: string;
      tableName: string;
      seatIds: { $oid: string; seatNumber?: number }[];
      date: string;
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

  /** Restaurant time (Mongolia): no orders between 12:00 AM and 12:00 PM (midnight–noon; hours 0–11 in Asia/Ulaanbaatar). */
  const isBlockedTime = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Ulaanbaatar",
      hour: "numeric",
      hour12: false,
    });
    const hours = parseInt(formatter.format(date), 10);
    return hours < 12;
  };

  /** 9:00 PM–11:59 PM in the user's local timezone (device clock only — not the chosen reservation time). */
  const isLocalNightHours = (date: Date) => date.getHours() >= 21;

  const selectedDate = form.watch("date");
  const isMongoliaBlockedSelected = selectedDate
    ? isBlockedTime(selectedDate)
    : false;
  /** Cannot place orders while device clock is between 9 PM and 11:59 PM local. */
  const isOrderingClosedNow = isLocalNightHours(new Date());
  const isTimeBlocked = isMongoliaBlockedSelected || isOrderingClosedNow;
  const isPastDateTime = selectedDate ? isMongoliaPast(selectedDate) : false;

  const seatRowKey = useMemo(
    () => seats.map((s) => s.$oid).join("-"),
    [seats]
  );

  const inputClass = cn(
    font.className,
    "min-h-12 w-full rounded-xl border border-[#488457]/20 bg-white px-4 py-3 text-base text-[#1c2b22] shadow-sm transition-[border-color,box-shadow] placeholder:font-semibold placeholder:text-[#488457]/45 sm:min-h-11 sm:text-sm",
    "focus-visible:border-[#488457]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#488457]/15"
  );

  const onSubmit = (data: OrderFormData) => {
    if (!token) {
      toast.error("Please complete the CAPTCHA verification");
      return;
    }

    if (!seats || seats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    if (isMongoliaPast(data.date)) {
      toast.error("Cannot place orders for past dates or times");
      return;
    }

    if (isBlockedTime(data.date)) {
      toast.error(
        "Orders are not accepted between 12:00 AM and 12:00 PM (restaurant time)"
      );
      return;
    }
    if (isLocalNightHours(new Date())) {
      toast.error(
        "Ordering is not available between 9:00 PM and 11:59 PM in your local time"
      );
      return;
    }

    createOrder({
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      tableName: tableName,
      seatIds: seats,
      date: toMongoliaISOString(data.date),
      turnstileToken: token,
      eventDate: dateParam ? 1 : 0,
    });
  };

  return (
    <Modal
      title={`${tableName} · Table booking`}
      isOpen={isOpen}
      onClose={onClose}
      className="w-[calc(100%-1rem)] max-w-[min(100%-1rem,26rem)] sm:max-w-xl md:max-w-[min(42rem,calc(100vw-2rem))]"
      containerClassname="px-4 pb-6 pt-2 sm:px-6 sm:pb-8 sm:pt-3"
    >
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full min-w-0 flex-col gap-6 sm:gap-8"
        >
          <section
            className="rounded-2xl border border-[#488457]/12 bg-gradient-to-b from-[#f7faf7] to-white p-4 shadow-sm sm:p-5"
            aria-labelledby="order-contact-heading"
          >
            <h2
              id="order-contact-heading"
              className={cn(
                font.className,
                "mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#488457]/70"
              )}
            >
              Your details
            </h2>
            <div className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Input
                  id="order-full-name"
                  autoComplete="name"
                  {...form.register("fullName", {
                    required: "Full name is required",
                  })}
                  className={inputClass}
                  placeholder="Full name"
                  aria-invalid={!!form.formState.errors.fullName}
                />
                {form.formState.errors.fullName && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Input
                  id="order-email"
                  type="email"
                  autoComplete="email"
                  {...form.register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={inputClass}
                  placeholder="Email address"
                  aria-invalid={!!form.formState.errors.email}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Input
                  id="order-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  {...form.register("phone", {
                    required: "Phone number is required",
                  })}
                  className={inputClass}
                  placeholder="Phone number"
                  aria-invalid={!!form.formState.errors.phone}
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section
            className="rounded-2xl border border-[#488457]/12 bg-white p-4 shadow-sm sm:p-5"
            aria-labelledby="order-datetime-heading"
          >
            <h2
              id="order-datetime-heading"
              className={cn(
                font.className,
                "mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#488457]/70"
              )}
            >
              Date &amp; time
            </h2>
            {preselectedDate && !isValidDate ? (
              <div className="flex flex-col gap-5">
                <div className="rounded-xl border border-[#488457]/15 bg-[#f7faf7] px-4 py-3">
                  <p
                    className={cn(
                      font.className,
                      "text-[10px] font-semibold uppercase tracking-widest text-[#488457]/55"
                    )}
                  >
                    Date
                  </p>
                  <p
                    className={cn(
                      font.className,
                      "mt-1 text-lg font-semibold leading-snug text-[#488457] sm:text-xl"
                    )}
                  >
                    {preselectedDate.toLocaleDateString("en-CA", {
                      timeZone: "Asia/Ulaanbaatar",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <FormFieldDatePicker
                  control={form.control}
                  name="date"
                  label="Time"
                  className="w-full"
                  disablePast
                  lockedDate={preselectedDate}
                />
              </div>
            ) : (
              <FormFieldDatePicker
                control={form.control}
                name="date"
                label="Date & time"
                className="w-full"
                disablePast
              />
            )}

            <div className="mt-4 flex flex-col gap-3">
              {isPastDateTime && (
                <InlineAlert>
                  This date and time has already passed. Please choose a future
                  date and time.
                </InlineAlert>
              )}
              {isOrderingClosedNow && !isPastDateTime && (
                <InlineAlert>
                  Ordering is not available between 9:00 PM and 11:59 PM in
                  your local time. Please try again after midnight.
                </InlineAlert>
              )}
              {isMongoliaBlockedSelected &&
                !isPastDateTime &&
                !isOrderingClosedNow && (
                  <InlineAlert>
                    Orders cannot be placed between 12:00 AM and 12:00 PM
                    (restaurant time). Please pick a different time.
                  </InlineAlert>
                )}
            </div>
          </section>

          <section
            className="rounded-2xl border border-[#488457]/12 bg-[#fafbf9] p-4 sm:p-5"
            aria-labelledby="order-seats-heading"
          >
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2
                id="order-seats-heading"
                className={cn(
                  font.className,
                  "text-xs font-semibold uppercase tracking-[0.2em] text-[#488457]/70"
                )}
              >
                Selected seats
              </h2>
              <span
                className={cn(
                  font.className,
                  "text-sm font-semibold text-[#488457]"
                )}
              >
                {seats.length} seat{seats.length === 1 ? "" : "s"}
              </span>
            </div>
            <div
              key={`${tableName}-${seatRowKey}`}
              className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-5 md:grid-cols-5"
            >
              {seats.map((seat, index) => (
                <div
                  key={`${tableName}-${seat.$oid}-${index}`}
                  className="flex justify-center"
                >
                  <Seat
                    seatNumber={seat.seatNumber ?? index + 1}
                    rotate="rotate-0"
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="flex w-full min-w-0 flex-col gap-4 border-t border-[#488457]/15 pt-2 sm:gap-5">
            <div className="w-full min-w-0 space-y-2">
              <p
                className={cn(
                  font.className,
                  "text-sm font-semibold text-[#488457]"
                )}
              >
                Verification
              </p>
              <p className="text-xs text-[#488457]/65 sm:text-sm">
                Complete the check below to confirm you&apos;re human.
              </p>
              <div className="flex w-full min-w-0 justify-center overflow-x-auto [-webkit-overflow-scrolling:touch] rounded-xl border border-[#488457]/10 bg-white p-3 sm:p-4">
                <UseTurnstile className="w-full min-w-[min(100%,300px)] shrink-0" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending || !token || isTimeBlocked || isPastDateTime}
              size="lg"
              className="h-12 w-full min-h-12 shrink-0 rounded-xl bg-[#E78140] text-base font-semibold text-white shadow-md transition hover:bg-[#d97335] hover:shadow-lg disabled:opacity-60 sm:h-11 sm:min-h-11 sm:text-sm"
            >
              {isPending ? "Processing…" : "Confirm booking"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};
