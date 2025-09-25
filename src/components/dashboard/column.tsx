import { Order } from "@/store/store";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Calendar, User, Phone, Mail, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

export const columns: ColumnDef<Order>[] = [
  {
    header: () => (
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-gray-700">Order ID</span>
      </div>
    ),
    accessorKey: "id",
    size: 100,
    maxSize: 120,
    minSize: 80,
    cell: ({ row }) => (
      <div className="font-mono text-xs sm:text-sm bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
        #{row.original.id}
      </div>
    ),
  },
  {
    header: () => (
      <div className="flex items-center space-x-2">
        <User className="h-4 w-4 text-gray-500" />
        <span className="font-semibold text-gray-700">Name</span>
      </div>
    ),
    accessorKey: "name",
    size: 180,
    maxSize: 220,
    minSize: 120,
    cell: ({ row }) => (
      <div className="flex items-center space-x-2 min-w-0">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
        </div>
        <span className="font-medium text-gray-900 truncate text-sm sm:text-base">
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    header: () => (
      <div className="flex items-center space-x-2">
        <Phone className="h-4 w-4 text-gray-500" />
        <span className="font-semibold text-gray-700 hidden sm:inline">
          Phone
        </span>
        <span className="font-semibold text-gray-700 sm:hidden">Tel</span>
      </div>
    ),
    accessorKey: "phone",
    size: 140,
    maxSize: 160,
    minSize: 100,
    cell: ({ row }) => (
      <div className="text-xs sm:text-sm text-gray-600 font-mono whitespace-nowrap">
        {row.original.phone}
      </div>
    ),
  },
  {
    header: () => (
      <div className="flex items-center space-x-2">
        <Mail className="h-4 w-4 text-gray-500" />
        <span className="font-semibold text-gray-700">Email</span>
      </div>
    ),
    accessorKey: "email",
    size: 200,
    maxSize: 250,
    minSize: 150,
    cell: ({ row }) => (
      <div
        className="text-sm text-blue-600 hover:underline cursor-pointer max-w-[200px] truncate"
        title={row.original.email}
      >
        {row.original.email}
      </div>
    ),
  },
  {
    header: () => (
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-gray-500" />
        <span className="font-semibold text-gray-700 hidden sm:inline">
          Order Date
        </span>
        <span className="font-semibold text-gray-700 sm:hidden">Date</span>
      </div>
    ),
    accessorKey: "orderDate",
    size: 120,
    maxSize: 150,
    minSize: 100,
    cell: ({ row }) => {
      const date = new Date(row.original.orderDate);
      return (
        <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
          <div className="font-medium">{format(date, "MMM dd")}</div>
          <div className="text-xs text-gray-400 hidden sm:block">
            {format(date, "hh:mm a")}
          </div>
        </div>
      );
    },
  },
  {
    header: () => (
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4 text-gray-500" />
        <span className="font-semibold text-gray-700">Table</span>
      </div>
    ),
    accessorKey: "tableName",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-medium">
        {row.original.tableName} Table
      </Badge>
    ),
  },
  {
    header: () => (
      <div className="flex items-center space-x-2">
        <Users className="h-4 w-4 text-gray-500" />
        <span className="font-semibold text-gray-700">Seats</span>
      </div>
    ),
    accessorKey: "seats",
    cell: ({ row }) => {
      const seats = row.original.seats;

      if (!seats || seats.length === 0) {
        return <Badge variant="secondary">No seats</Badge>;
      }

      // Limit displayed badges (e.g. show only 3, rest as "+X more")
      const visibleSeats = seats.slice(0, 3);
      const extraSeats = seats.length - visibleSeats.length;

      return (
        <div className="flex flex-wrap gap-1">
          {visibleSeats.map((seat, index) => (
            <Badge
              key={index}
              variant="outline"
              className="rounded-full border-gray-300 bg-gray-50 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-100"
            >
              {seat.TableSeats.title}
            </Badge>
          ))}

          {extraSeats > 0 && (
            <Badge
              variant="secondary"
              className="rounded-full px-2 py-0.5 text-xs text-gray-600"
              title={seats
                .slice(3)
                .map((s) => s.TableSeats.title)
                .join(", ")}
            >
              +{extraSeats} more
            </Badge>
          )}
        </div>
      );
    },
  },
];
