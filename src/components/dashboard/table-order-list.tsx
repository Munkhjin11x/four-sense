import { Order } from "@/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const OrderListTable = ({ data }: { data: Order[] }) => {
  const headers = [
    {
      key: "orderId",
      label: "Order ID",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "orderDate",
      label: "Order Date",
    },
    {
      key: "tableName",
      label: "Table Name",
    },
    {
      key: "seats",
      label: "Seats",
    },
  ];
  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <p className="text-2xl font-bold">Order List</p>
      <Table>
        <TableHeader className="borderbg-slate-100 ">
          <TableRow className="text-[#475467] ">
            {headers.map((header) => (
              <TableHead className="py-4" key={header.key}>
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((order, indx) => (
            <TableRow key={indx}>
              <TableCell>{order._doc._id}</TableCell>
              <TableCell>{order._doc.name}</TableCell>
              <TableCell>{order._doc.phone}</TableCell>
              <TableCell>{order._doc.email}</TableCell>
              <TableCell>
                {new Date(order._doc.orderDate).toLocaleString()}
              </TableCell>
              <TableCell>{order._doc.tableName}</TableCell>

              <TableCell>
                {order.seats.map((seat) => seat.title).join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
