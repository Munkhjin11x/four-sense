"use client";

import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Input } from "@/components/ui/input";

function isSameCalendarDateAndTime(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate() &&
    a.getHours() === b.getHours() &&
    a.getMinutes() === b.getMinutes()
  );
}

function getHoursInRange(
  start: [number, number],
  end: [number, number]
): number[] {
  const startMin = start[0] * 60 + start[1];
  const endMin = end[0] * 60 + end[1];
  const hours = new Set<number>();
  for (let t = startMin; t <= endMin; t++) {
    hours.add(Math.floor(t / 60));
  }
  return [...hours].sort((a, b) => a - b);
}

function getMinutesForHour(
  hour: number,
  start: [number, number],
  end: [number, number]
): number[] {
  const startMin = start[0] * 60 + start[1];
  const endMin = end[0] * 60 + end[1];
  const out: number[] = [];
  for (let m = 0; m < 60; m++) {
    const t = hour * 60 + m;
    if (t >= startMin && t <= endMin) out.push(m);
  }
  return out;
}

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
    /**
     * When set, shows these times instead of a time input.
     * Each entry is [hour, minute] in local time on the chosen day.
     * Long lists render as a dropdown; short lists as buttons.
     */
    timeSlots?: ReadonlyArray<[number, number]>;
    /**
     * Hour + minute pickers for a continuous local-time window (preferred UX vs long lists).
     */
    timeRange?: { start: [number, number]; end: [number, number] };
  };

type TimeRangePickerProps = {
  name: string;
  field: { value: unknown; onChange: (v: Date | undefined) => void };
  baseForSlots: Date;
  range: { start: [number, number]; end: [number, number] };
  safeDate: (value: unknown) => Date | undefined;
};

const timeSelectTriggerClass = cn(
  "h-11 w-full rounded-xl border border-[#488457]/20 bg-white font-semibold tabular-nums text-[#1c2b22] shadow-sm",
  "focus:ring-2 focus:ring-[#488457]/15 focus:ring-offset-0",
  "data-[placeholder]:text-[#488457]/45"
);

/** Shadcn Select (Radix): dropdown panel with scroll, not a native HTML select. */
function TimeRangePicker({
  name,
  field,
  baseForSlots,
  range,
  safeDate,
}: TimeRangePickerProps) {
  const { start, end } = range;
  const hours = getHoursInRange(start, end);
  if (hours.length === 0) return null;
  const current = safeDate(field.value);
  let hour = current ? current.getHours() : hours[0];
  if (!hours.includes(hour)) hour = hours[0];
  const minuteOptions = getMinutesForHour(hour, start, end);
  if (minuteOptions.length === 0) return null;
  let minute = current ? current.getMinutes() : minuteOptions[0];
  if (!minuteOptions.includes(minute)) minute = minuteOptions[0];

  const apply = (h: number, m: number) => {
    const next = new Date(baseForSlots);
    next.setHours(h, m, 0, 0);
    field.onChange(next);
  };

  const onHourChange = (value: string) => {
    const h = Number(value);
    const mins = getMinutesForHour(h, start, end);
    const m = mins.includes(minute) ? minute : mins[0];
    apply(h, m);
  };

  const selectContentClass = cn(
    "max-h-[min(280px,50vh)] border-[#488457]/15 bg-popover",
    "data-[state=open]:animate-in"
  );

  return (
    <div className="rounded-2xl border border-[#488457]/12 bg-gradient-to-b from-[#f7faf7] to-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-[#488457]/10 text-[#488457]">
          <Clock className="size-4" aria-hidden />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#488457]/60">
            Time
          </p>
          <p className="text-xs text-[#488457]/50">Hour and minute</p>
        </div>
      </div>

      <div className="flex items-end gap-2 sm:gap-3">
        <div className="min-w-0 flex-1 space-y-1.5">
          <Label
            htmlFor={`${name}-hour-trigger`}
            className="text-xs font-medium text-[#488457]/70"
          >
            Hour
          </Label>
          <Select
            value={String(hour)}
            onValueChange={onHourChange}
          >
            <SelectTrigger
              id={`${name}-hour-trigger`}
              aria-label="Hour"
              className={timeSelectTriggerClass}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" className={selectContentClass}>
              {hours.map((h) => (
                <SelectItem
                  key={h}
                  value={String(h)}
                  className="cursor-pointer font-medium tabular-nums focus:bg-[#488457]/10 focus:text-[#1c2b22]"
                >
                  {String(h).padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <span
          className="select-none pb-2.5 text-xl font-light text-[#488457]/35"
          aria-hidden
        >
          :
        </span>

        <div className="min-w-0 flex-1 space-y-1.5">
          <Label
            htmlFor={`${name}-minute-trigger`}
            className="text-xs font-medium text-[#488457]/70"
          >
            Minute
          </Label>
          <Select
            key={`${name}-minute-${hour}`}
            value={String(minute)}
            onValueChange={(v) => apply(hour, Number(v))}
          >
            <SelectTrigger
              id={`${name}-minute-trigger`}
              aria-label="Minute"
              className={timeSelectTriggerClass}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" className={selectContentClass}>
              {minuteOptions.map((m) => (
                <SelectItem
                  key={m}
                  value={String(m)}
                  className="cursor-pointer font-medium tabular-nums focus:bg-[#488457]/10 focus:text-[#1c2b22]"
                >
                  {String(m).padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export const FormFieldDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  disablePast = false,
  lockedDate,
  timeSlots,
  timeRange,
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
    const base = lockedDate ? new Date(lockedDate) : date;
    if (!base || !timeStr) return base;
    const [hours, minutes] = timeStr.split(":").map(Number);
    base.setHours(hours, minutes, 0, 0);
    return base;
  };

  const calendarDisabled = disablePast
    ? { before: getMongoliaTodayStart() }
    : undefined;

  const renderTimeRangePicker = (
    field: { value: unknown; onChange: (v: Date | undefined) => void },
    baseForSlots: Date | undefined,
    range: { start: [number, number]; end: [number, number] }
  ) => {
    if (!baseForSlots) return null;
    return (
      <TimeRangePicker
        name={name}
        field={field}
        baseForSlots={baseForSlots}
        range={range}
        safeDate={safeDate}
      />
    );
  };

  const renderTimeSlots = (
    field: { value: unknown; onChange: (v: Date | undefined) => void },
    baseForSlots: Date | undefined
  ) => {
    if (!timeSlots || !baseForSlots || timeSlots.length === 0) return null;

    const current = safeDate(field.value);
    const useSelect = timeSlots.length > 18;

    const applySlot = (hour: number, minute: number) => {
      const slot = new Date(baseForSlots);
      slot.setHours(hour, minute, 0, 0);
      field.onChange(slot);
    };

    if (useSelect) {
      const selectedValue =
        current &&
        timeSlots.some(([h, m]) => {
          const slot = new Date(baseForSlots);
          slot.setHours(h, m, 0, 0);
          return isSameCalendarDateAndTime(current, slot);
        })
          ? format(current, "HH:mm")
          : "";

      return (
        <select
          aria-label="Time"
          value={selectedValue}
          onChange={(e) => {
            const v = e.target.value;
            if (!v) return;
            const [h, m] = v.split(":").map(Number);
            applySlot(h, m);
          }}
          className={cn(
            "w-full rounded-lg border border-[#488457]/35 bg-white px-3 py-2.5 text-sm font-semibold text-[#1c2b22] shadow-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#488457]/25"
          )}
        >
          <option value="">Choose time</option>
          {timeSlots.map(([hour, minute]) => {
            const slot = new Date(baseForSlots);
            slot.setHours(hour, minute, 0, 0);
            const v = format(slot, "HH:mm");
            return (
              <option key={v} value={v}>
                {v}
              </option>
            );
          })}
        </select>
      );
    }

    return (
      <div
        className="max-h-52 overflow-y-auto overflow-x-hidden pr-1 [-webkit-overflow-scrolling:touch]"
        role="group"
        aria-label="Time"
      >
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {timeSlots.map(([hour, minute]) => {
            const slot = new Date(baseForSlots);
            slot.setHours(hour, minute, 0, 0);
            const selected =
              current && isSameCalendarDateAndTime(current, slot);
            return (
              <Button
                key={`${hour}-${minute}`}
                type="button"
                variant={selected ? "default" : "outline"}
                size="sm"
                className={cn(
                  "min-w-0 shrink font-semibold tabular-nums",
                  selected &&
                    "bg-[#488457] text-white hover:bg-[#488457] hover:text-white"
                )}
                onClick={() => applySlot(hour, minute)}
              >
                {format(slot, "HH:mm")}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  // Time-only mode when date is locked
  if (lockedDate) {
    return (
      <FormField
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <FormItem className="w-full">
            {!timeRange && (
              <FormLabel className="text-xs text-[#488457]/60">
                {label ?? "TIME"}
              </FormLabel>
            )}
            <FormControl>
              {timeRange ? (
                renderTimeRangePicker(field, lockedDate, timeRange)
              ) : timeSlots ? (
                renderTimeSlots(field, lockedDate)
              ) : (
                <Input
                  type="time"
                  value={
                    field.value ? format(safeDate(field.value)!, "HH:mm") : ""
                  }
                  onChange={(e) => {
                    const updated = parseTime(
                      safeDate(field.value),
                      e.target.value
                    );
                    field.onChange(updated || undefined);
                  }}
                  min={
                    disablePast && isMongoliaToday(lockedDate)
                      ? getMongoliaNowTimeString()
                      : undefined
                  }
                  className="border-0 border-b border-[#488457] rounded-none bg-transparent text-[#488457] text-xl font-semibold focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                />
              )}
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
      render={({ field }) => {
        const baseForSlots = safeDate(field.value);
        return (
          <FormItem className="w-full">
            <FormLabel className="text-sm">
              {label ? label : "Date and Time"}
            </FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    type="button"
                    variant="outline"
                    className={cn(
                      "h-auto min-h-12 w-full justify-start rounded-xl border border-[#488457]/20 bg-white px-4 py-3 text-left font-normal shadow-sm transition-[border-color,box-shadow] hover:border-[#488457]/35 hover:bg-[#fafbf9]",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4 shrink-0 text-[#488457]/70" />
                    {field.value ? (
                      <span className="font-medium text-[#1c2b22]">
                        {formatDateTime(safeDate(field.value))}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Pick a date and time
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[min(calc(100vw-1.5rem),22rem)] p-4 sm:w-auto sm:min-w-[20rem]"
                  align="start"
                >
                  <div className="space-y-5">
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
                      disabled={calendarDisabled}
                    />
                    <div className="flex flex-col gap-2">
                      {timeRange ? (
                        baseForSlots ? (
                          renderTimeRangePicker(field, baseForSlots, timeRange)
                        ) : (
                          <p className="rounded-xl border border-dashed border-[#488457]/25 bg-[#f7faf7]/80 px-3 py-4 text-center text-sm text-[#488457]/70">
                            Pick a date above, then set the time.
                          </p>
                        )
                      ) : timeSlots ? (
                        baseForSlots ? (
                          renderTimeSlots(field, baseForSlots)
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Pick a date first, then choose a time.
                          </p>
                        )
                      ) : (
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
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
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
