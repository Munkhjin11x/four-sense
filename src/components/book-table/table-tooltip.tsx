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
}: {
  all: boolean;
  tableId: string;
  seats: {
    title: string;
    image: string;
    status: string;
    x: string;
    y: string;
    rotate: string;
  }[];
  children: React.ReactNode;
  selectedSeats: { [key: string]: number[] };
  setSelectedSeats: (seats: { [key: string]: number[] }) => void;

  handleOrder: (tableId: string) => void;
}) => {
  const handleSelectAll = () => {
    const allSeatIndices = seats
      .map((_, index) => index)
      .filter((index) => seats[index].status !== "unavailable");

    setSelectedSeats({
      ...selectedSeats,
      [tableId]: allSeatIndices,
    });
  };

  if (all) {
    return <>{children}</>;
  }
  return (
    <>
      <TooltipProvider>
        <Tooltip open={selectedSeats[tableId]?.length > 0}>
          <TooltipTrigger asChild>
            <div> {children}</div>
          </TooltipTrigger>
          {selectedSeats && (
            <TooltipContent className="bg-white p-2 rounded shadow-lg w-48">
              <XIcon
                onClick={() =>
                  setSelectedSeats({ ...selectedSeats, [tableId]: [] })
                }
                className="absolute top-2 right-2"
              />
              <div className="flex flex-col gap-2]">
                <h4 className="font-bold">Table {tableId}</h4>
                {seats.map((seat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      id={`seat-${tableId}-${index}`}
                      className="cursor-pointer size-4"
                      checked={selectedSeats[tableId]?.includes(index)}
                      disabled={seat.status === "unavailable"}
                      onCheckedChange={(checked) => {
                        const newSelected = checked
                          ? [...(selectedSeats[tableId] || []), index]
                          : selectedSeats[tableId]?.filter(
                              (i) => i !== index
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
                <div className="flex items-center gap-2">
                  <Checkbox
                    onClick={handleSelectAll}
                    id={`seat-${tableId}-all`}
                    className="size-4"
                  />
                  <label htmlFor={`seat-${tableId}-all`} className="text-sm">
                    {`Order table ${tableId}.`}
                  </label>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOrder(tableId)}
                  className="mt-2 w-full border-[#E78140] text-[#E78140] rounded-none rounded-tl-3xl flex items-center justify-center"
                >
                  <CalendarIcon /> Order
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
