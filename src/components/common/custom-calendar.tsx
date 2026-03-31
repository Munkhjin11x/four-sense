import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  getMongoliaTodayStart,
  getMongoliaNowTimeString,
  isMongoliaToday,
} from "@/lib/date-utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, Control } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component

type FormFieldDatePickerWithRangeProps<T extends FieldValues> =
  CustomFormFieldType<T> & {
    label?: string;
    /** When true, disables past dates and past times (Mongolia timezone) */
    disablePast?: boolean;
    /**
     * When provided, the calendar is hidden and the date is locked to this value.
     * Only the time picker is shown, allowing the user to pick a time on the locked date.
     */
    lockedDate?: Date;
  };

export const FormFieldDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  disablePast = false,
  lockedDate,
}: FormFieldDatePickerWithRangeProps<T>) => {
  const safeDate = (value: unknown): Date | undefined =>
    value instanceof Date || typeof value === "string"
      ? new Date(value)
      : undefined;

  const formatDateTime = (date: Date | undefined): string => {
    if (!date) return "Pick a date and time";
    return format(date, "LLL dd, y HH:mm");
  };

  const parseTime = (
    date: Date | undefined,
    timeStr: string
  ): Date | undefined => {
    // When the date is locked, always apply time on top of the locked date
    const base = lockedDate ? new Date(lockedDate) : date;
    if (!base || !timeStr) return base;
    const [hours, minutes] = timeStr.split(":").map(Number);
    base.setHours(hours, minutes, 0, 0);
    return base;
  };

  // Time-only mode when date is locked
  if (lockedDate) {
    return (
      <FormField
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-xs text-[#488457]/60">{label ?? "TIME"}</FormLabel>
            <FormControl>
              <Input
                type="time"
                value={field.value ? format(safeDate(field.value)!, "HH:mm") : ""}
                onChange={(e) => {
                  const updated = parseTime(safeDate(field.value), e.target.value);
                  field.onChange(updated || undefined);
                }}
                min={
                  disablePast && isMongoliaToday(lockedDate)
                    ? getMongoliaNowTimeString()
                    : undefined
                }
                className="border-0 border-b border-[#488457] rounded-none bg-transparent text-[#488457] text-xl font-semibold focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm">
            {label ? label : "Date and Time"}
          </FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start px-2 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2" />
                  {field.value ? (
                    formatDateTime(safeDate(field.value))
                  ) : (
                    <p>Pick a date and time</p>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3" align="start">
                <div className="space-y-4">
                  <Calendar
                    mode="single"
                    defaultMonth={safeDate(field.value) || undefined}
                    selected={safeDate(field.value) || undefined}
                    onSelect={(selectedDate: Date | undefined) => {
                      if (selectedDate) {
                        const currentTime = safeDate(field.value);
                        if (currentTime) {
                          selectedDate.setHours(
                            currentTime.getHours(),
                            currentTime.getMinutes()
                          );
                        }
                        field.onChange(selectedDate);
                      }
                    }}
                    numberOfMonths={1}
                    disabled={
                      disablePast ? { before: getMongoliaTodayStart() } : undefined
                    }
                  />
                  <div className="flex flex-col gap-2">
                    <FormLabel className="text-sm">Time</FormLabel>
                    <Input
                      type="time"
                      value={
                        field.value
                          ? format(safeDate(field.value)!, "HH:mm")
                          : ""
                      }
                      onChange={(e) => {
                        const timeStr = e.target.value;
                        const updatedDate = parseTime(
                          safeDate(field.value),
                          timeStr
                        );
                        field.onChange(updatedDate || undefined);
                      }}
                      min={
                        disablePast &&
                        field.value &&
                        isMongoliaToday(safeDate(field.value)!)
                          ? getMongoliaNowTimeString()
                          : undefined
                      }
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type CustomFormFieldType<T extends FieldValues> = {
  control: Control<T>;
  name: string;
  isLoading?: boolean;
  label?: string;
  className?: string;
  placeholder?: string;
};
