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
  };

export const FormFieldDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  disablePast = false,
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
    if (!date || !timeStr) return date;
    const [hours, minutes] = timeStr.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);
    return newDate;
  };

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
