"use client";
import { cn } from "@/lib/utils";
import { Table } from "@/store/store";
import { Button } from "../ui";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiUpdateTableSeat } from "@/store/api";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";

export const SeatsTableCard = ({
  data,
  refetch,
}: {
  data: Table[] | undefined;
  refetch: () => void;
}) => {
  const [selectedSeats, setSelectedSeats] = useState<Record<string, string[]>>(
    {}
  );
  const [activeTable, setActiveTable] = useState<string | null>(null);

  const { mutate: updateTableSeat } = useMutation<
    void,
    Error,
    { tableName: string; seatIds: string[] }
  >({
    mutationFn: apiUpdateTableSeat,
    onSuccess: () => {
      toast.success("Table seats updated");
      setActiveTable(null);
      refetch();
    },
    onError: () => {
      toast.error("Failed to update table seat");
    },
  });

  const handleSeatSelect = (
    tableId: string,
    seatId: string,
    checked: boolean
  ) => {
    setActiveTable(tableId);

    setSelectedSeats((prev) => {
      const currentSeats = prev[tableId] || [];

      return {
        ...prev,
        [tableId]: checked
          ? [...currentSeats, seatId]
          : currentSeats.filter((id) => id !== seatId),
      };
    });
  };

  const handleUpdate = (tableName: string, tableId: string) => {
    if (!selectedSeats[tableId]?.length) return;

    updateTableSeat({
      tableName,
      seatIds: selectedSeats[tableId],
    });

    setSelectedSeats((prev) => ({
      ...prev,
      [tableId]: [],
    }));
  };

  return (
    <div className="flex flex-col gap-4 w-full shadow-sm bg-white h-full p-6">
      <h1 className="text-2xl font-semibold">Table Seats</h1>
      <div className="grid grid-cols-3 gap-4">
        {data?.map((item) => (
          <div key={item._id.$oid} className="border rounded-lg">
            <div className="flex justify-between border-b p-4">
              <p>Table name</p>
              <h1 className="font-semibold">{item.tableName} Table</h1>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {item.seats.map((seat) => (
                <div className="flex justify-between gap-2" key={seat._id.$oid}>
                  <h1>{seat.title}</h1>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      disabled={
                        seat.status === "available" ||
                        (activeTable !== null && activeTable !== item._id.$oid)
                      }
                      checked={selectedSeats[item._id.$oid]?.includes(
                        seat._id.$oid
                      )}
                      onCheckedChange={(checked: boolean) =>
                        handleSeatSelect(item._id.$oid, seat._id.$oid, checked)
                      }
                    />
                    <p
                      className={cn(
                        "flex items-center gap-2",
                        seat.status === "available"
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      {seat.status}
                    </p>
                  </div>
                </div>
              ))}
              <Button
                disabled={
                  activeTable !== item._id.$oid ||
                  !selectedSeats[item._id.$oid]?.length
                }
                onClick={() => handleUpdate(item.tableName, item._id.$oid)}
                variant="outline"
              >
                Update
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
