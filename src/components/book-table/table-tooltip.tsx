/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { XIcon } from "lucide-react";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";
import { Checkbox } from "../ui/checkbox";
import { CalendarIcon } from "@/icons/calendar-icon";

const SeatTooltip = ({
  tableId,
  seats,
  children,
  selectedSeats,
  setSelectedSeats,
  handleOrder,
  all,
  notRenderedSeat,
}: {
  all: boolean;
  tableId: string;
  seats: {
    _id: { $oid: string };
    title: string;
    image: string;
    status: string;
    x: string;
    y: string;
    rotate: string;
  }[];
  children: React.ReactNode;
  selectedSeats: any;
  setSelectedSeats: any;
  handleOrder: (tableId: string) => void;
  notRenderedSeat?: boolean;
}) => {
  const handleSelectAll = () => {
    const allSeatIndices = seats
      .map((_, index) => index)
      .filter((index) => seats[index].status !== "ordered");

    setSelectedSeats({
      ...selectedSeats,
      [tableId]: allSeatIndices.map((index) => seats[index]._id?.$oid),
    });
  };

  if (all) {
    return <>{children}</>;
  }

  if (notRenderedSeat) {
    const isSelected = selectedSeats[tableId]?.length > 0;
    const isOrdered = seats[0]?.status === "ordered";

    return (
      <>
        <TooltipProvider>
          <Tooltip open={isSelected}>
            <TooltipTrigger asChild>
              <div className="cursor-pointer">{children}</div>
            </TooltipTrigger>
            {isSelected && (
              <TooltipContent className="bg-white p-2 rounded shadow-lg w-48">
                <XIcon
                  onClick={() =>
                    setSelectedSeats({ ...selectedSeats, [tableId]: [] })
                  }
                  className="absolute top-2 right-2 cursor-pointer"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold">Table {tableId}</h4>
                  {isOrdered ? (
                    <p className="text-sm text-red-500">Table is fully booked</p>
                  ) : (
                    <p className="text-sm text-red-500">Capacity: 4 people</p>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOrder(tableId)}
                    disabled={isOrdered}
                    className="mt-2 w-full border-[#E78140] text-[#E78140] rounded-none rounded-tl-3xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CalendarIcon /> {isOrdered ? "Not Available" : "Order"}
                  </Button>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </>
    );
  }

  const availableSeats = seats.filter((seat) => seat.status !== "ordered");
  const hasAvailableSeats = availableSeats.length > 0;
  const hasSelectedSeats = selectedSeats[tableId]?.length > 0;

  return (
    <>
      <TooltipProvider>
        <Tooltip open={hasSelectedSeats}>
          <TooltipTrigger asChild>
            <div className="cursor-pointer">{children}</div>
          </TooltipTrigger>
          {selectedSeats && (
            <TooltipContent className="bg-white p-2 rounded shadow-lg w-48">
              <XIcon
                onClick={() =>
                  setSelectedSeats({ ...selectedSeats, [tableId]: [] })
                }
                className="absolute top-2 right-2 cursor-pointer"
              />
              <div className="flex flex-col gap-2]">
                <h4 className="font-bold">Table {tableId}</h4>
                {!hasAvailableSeats && (
                  <p className="text-sm text-red-500 mb-2">All seats are booked</p>
                )}
                {seats.map((seat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      id={`seat-${tableId}-${index}`}
                      className="cursor-pointer size-4"
                      checked={selectedSeats[tableId]?.includes(seat._id?.$oid)}
                      disabled={seat.status === "ordered"}
                      onCheckedChange={(checked) => {
                        const newSelected = checked
                          ? [...(selectedSeats[tableId] || []), seat._id?.$oid]
                          : selectedSeats[tableId]?.filter(
                            (id: string) => id !== seat._id?.$oid
                          ) || [];
                        setSelectedSeats({
                          ...selectedSeats,
                          [tableId]: newSelected,
                        });
                      }}
                    />
                    <label
                      htmlFor={`seat-${tableId}-${index}`}
                      className="text-sm"
                    >
                      {`${tableId}-${index + 1} chair`}
                    </label>
                  </div>
                ))}
                {hasAvailableSeats && (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onClick={handleSelectAll}
                      id={`seat-${tableId}-all`}
                      className="size-4"
                      checked={
                        selectedSeats[tableId]?.length === availableSeats.length
                      }
                    />
                    <label htmlFor={`seat-${tableId}-all`} className="text-sm">
                      {`Order table ${tableId}.`}
                    </label>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOrder(tableId)}
                  disabled={!hasAvailableSeats || !hasSelectedSeats}
                  className="mt-2 w-full border-[#E78140] text-[#E78140] rounded-none rounded-tl-3xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CalendarIcon /> {hasAvailableSeats ? "Order" : "Not Available"}
                </Button>
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default SeatTooltip;
