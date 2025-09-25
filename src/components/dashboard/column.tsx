import { Order } from "@/store/store";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Order>[] = [
  {
    header: "Order ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Order Date",
    accessorKey: "orderDate",
  },
  {
    header: "Table Name",
    accessorKey: "tableName",
  },
  {
    header: "Seats",
    accessorKey: "seats",
    cell: ({ row }) => {
      return (
        row.original.seats?.map((seat) => seat.title).join(", ") || "No seats"
      );
    },
  },
];
