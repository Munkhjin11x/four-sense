"use client";

import { Table } from "@/store/store";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "../ui";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiUpdateTableSeat } from "@/store/api";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Users, CheckCircle2, XCircle } from "lucide-react";

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "ordered":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge variant="success" className="text-xs">
            Available
          </Badge>
        );
      case "ordered":
        return (
          <Badge variant="error" className="text-xs">
            Ordered
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Table Management</h2>
          <p className="text-gray-600">
            Manage seat availability and reservations
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <XCircle className="h-4 w-4 text-red-600" />
            <span className="text-gray-600">Ordered</span>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {data?.map((item) => {
          const availableCount = item.seats.filter(
            (seat) => seat.status === "available"
          ).length;
          const orderedCount = item.seats.filter(
            (seat) => seat.status === "ordered"
          ).length;
          const totalSeats = item.seats.length;
          const occupancyRate = Math.round((orderedCount / totalSeats) * 100);

          return (
            <Card
              key={item._id.$oid}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {item.tableName} Table
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {totalSeats} seats • {occupancyRate}% occupied
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      occupancyRate > 50
                        ? "error"
                        : occupancyRate > 0
                        ? "warning"
                        : "success"
                    }
                    className="text-xs font-semibold"
                  >
                    {occupancyRate}%
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-800">
                      {availableCount}
                    </div>
                    <div className="text-xs text-green-600">Available</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-800">
                      {orderedCount}
                    </div>
                    <div className="text-xs text-red-600">Ordered</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-3">
                {/* Seats List */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {item.seats.map((seat) => (
                    <div
                      key={seat._id.$oid}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          disabled={
                            seat.status === "available" ||
                            (activeTable !== null &&
                              activeTable !== item._id.$oid)
                          }
                          checked={selectedSeats[item._id.$oid]?.includes(
                            seat._id.$oid
                          )}
                          onCheckedChange={(checked: boolean) =>
                            handleSeatSelect(
                              item._id.$oid,
                              seat._id.$oid,
                              checked
                            )
                          }
                        />
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(seat.status)}
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                              <span className="font-bold text-blue-700 text-sm">
                                {seat.title?.match(/\d+/)?.[0] ||
                                  seat.title?.substring(0, 2)}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">
                              {seat.title}
                            </span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(seat.status)}
                    </div>
                  ))}
                </div>

                {/* Update Button */}
                <Button
                  disabled={
                    activeTable !== item._id.$oid ||
                    !selectedSeats[item._id.$oid]?.length
                  }
                  onClick={() => handleUpdate(item.tableName, item._id.$oid)}
                  className="w-full mt-4"
                  variant={
                    selectedSeats[item._id.$oid]?.length ? "default" : "outline"
                  }
                >
                  {selectedSeats[item._id.$oid]?.length
                    ? `Update ${selectedSeats[item._id.$oid].length} seat(s)`
                    : "Select seats to update"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {(!data || data.length === 0) && (
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
      )}
    </div>
  );
};
