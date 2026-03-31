"use client";

import { Table } from "@/store/store";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "../ui";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiUpdateTableSeat } from "@/store/api";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Users, CheckCircle2, XCircle, Unlock, Info } from "lucide-react";
import { Tables } from "./column";

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

  const { mutate: updateTableSeat, isPending } = useMutation<
    void,
    Error,
    { tableName: string; seatIds: string[] }
  >({
    mutationFn: apiUpdateTableSeat,
    onSuccess: () => {
      toast.success("Seats released — marked as available");
      setActiveTable(null);
      setSelectedSeats({});
      refetch();
    },
    onError: () => {
      toast.error("Failed to release seats");
    },
  });

  const handleSeatSelect = (
    tableId: string,
    seatId: string,
    checked: boolean
  ) => {
    setActiveTable(tableId);
    setSelectedSeats((prev) => {
      const current = prev[tableId] || [];
      return {
        ...prev,
        [tableId]: checked
          ? [...current, seatId]
          : current.filter((id) => id !== seatId),
      };
    });
  };

  const handleSelectAllOrdered = (tableId: string, orderedSeatIds: string[]) => {
    setActiveTable(tableId);
    setSelectedSeats((prev) => {
      const current = prev[tableId] || [];
      const allSelected = orderedSeatIds.every((id) => current.includes(id));
      return {
        ...prev,
        [tableId]: allSelected ? [] : orderedSeatIds,
      };
    });
  };

  const handleRelease = (tableName: string, tableId: string) => {
    const seats = selectedSeats[tableId];
    if (!seats?.length) return;
    updateTableSeat({ tableName, seatIds: seats });
  };

  if (!data || data.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tables found
          </h3>
          <p className="text-gray-600 text-center">
            There are no tables configured yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Table Management</h2>
          <p className="text-gray-600 text-sm mt-1">
            Check any <span className="font-semibold text-red-600">ordered</span> seat and press{" "}
            <span className="font-semibold text-green-700">&ldquo;Release&rdquo;</span> to mark it as available again.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm shrink-0">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-gray-600">Ordered</span>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
        <Info className="h-4 w-4 mt-0.5 shrink-0 text-blue-500" />
        <p>
          Seats are automatically marked <strong>Ordered</strong> when a customer places a booking.
          Use this panel to manually release seats back to <strong>Available</strong> if a booking was cancelled or a mistake was made.
        </p>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((item) => {
          const orderedSeats = item.seats.filter((s) => s.status === "ordered");
          const availableSeats = item.seats.filter((s) => s.status === "available");
          const totalSeats = item.seats.length;
          const orderedCount = orderedSeats.length;
          const occupancyRate = totalSeats > 0 ? Math.round((orderedCount / totalSeats) * 100) : 0;

          const tableSelectedSeats = selectedSeats[item._id.$oid] || [];
          const orderedSeatIds = orderedSeats.map((s) => s._id.$oid);
          const allOrderedSelected =
            orderedSeatIds.length > 0 &&
            orderedSeatIds.every((id) => tableSelectedSeats.includes(id));
          const isActiveTable = activeTable === item._id.$oid;

          return (
            <Card
              key={item._id.$oid}
              className={`border shadow-md hover:shadow-lg transition-all duration-300 ${
                isActiveTable && tableSelectedSeats.length > 0
                  ? "border-orange-300 ring-1 ring-orange-200"
                  : "border-gray-100"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold text-gray-900">
                        {Tables[item.tableName as keyof typeof Tables] ?? item.tableName}
                      </CardTitle>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {totalSeats} seats total
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      occupancyRate > 50 ? "error" : occupancyRate > 0 ? "warning" : "success"
                    }
                    className="text-xs font-semibold"
                  >
                    {occupancyRate}% occupied
                  </Badge>
                </div>

                {/* Occupancy bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{availableSeats.length} available</span>
                    <span>{orderedCount} ordered</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400 rounded-full transition-all duration-300"
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-3">
                {/* Ordered seats section — checkable */}
                {orderedSeats.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                        Ordered seats
                      </p>
                      <button
                        onClick={() =>
                          handleSelectAllOrdered(item._id.$oid, orderedSeatIds)
                        }
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {allOrderedSelected ? "Deselect all" : "Select all"}
                      </button>
                    </div>
                    <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                      {orderedSeats.map((seat) => {
                        const isChecked = tableSelectedSeats.includes(seat._id.$oid);
                        const isDisabled =
                          activeTable !== null &&
                          activeTable !== item._id.$oid;
                        return (
                          <label
                            key={seat._id.$oid}
                            className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
                              isChecked
                                ? "bg-orange-50 border-orange-300"
                                : "bg-red-50 border-red-100 hover:bg-red-100"
                            } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Checkbox
                                disabled={isDisabled}
                                checked={isChecked}
                                onCheckedChange={(checked: boolean) =>
                                  handleSeatSelect(item._id.$oid, seat._id.$oid, checked)
                                }
                              />
                              <XCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                              <span className="text-sm font-medium text-gray-800">
                                {seat.title}
                              </span>
                            </div>
                            {isChecked && (
                              <span className="text-xs text-orange-600 font-medium">
                                Will release
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Available seats section — read-only */}
                {availableSeats.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                      Available seats
                    </p>
                    <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                      {availableSeats.map((seat) => (
                        <div
                          key={seat._id.$oid}
                          className="flex items-center gap-2.5 p-2.5 bg-green-50 border border-green-100 rounded-lg"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                          <span className="text-sm text-gray-700">{seat.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {orderedSeats.length === 0 && (
                  <div className="text-center py-3 text-sm text-green-700 bg-green-50 rounded-lg">
                    All seats are available
                  </div>
                )}

                {/* Release button */}
                <Button
                  disabled={
                    !isActiveTable ||
                    !tableSelectedSeats.length ||
                    isPending
                  }
                  onClick={() => handleRelease(item.tableName, item._id.$oid)}
                  className={`w-full mt-2 gap-2 ${
                    tableSelectedSeats.length
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : ""
                  }`}
                  variant={tableSelectedSeats.length ? "default" : "outline"}
                >
                  <Unlock className="h-4 w-4" />
                  {tableSelectedSeats.length
                    ? `Release ${tableSelectedSeats.length} seat${tableSelectedSeats.length > 1 ? "s" : ""} → Available`
                    : "Select ordered seats to release"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
