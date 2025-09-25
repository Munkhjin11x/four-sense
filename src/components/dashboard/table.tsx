import { Order } from "@/store/store";
import DataTable from "../ui/data-table";
import { columns } from "./column";

interface TOrderListTableProps {
  invoices: Order[] | undefined;
  page: number;
  totalRows?: number;
  pageCount?: number;
}

export default function OrderTable({
  invoices,
  pageCount,
}: TOrderListTableProps) {
  return (
    <>
      {invoices && (
        <DataTable
          columns={columns}
          data={invoices}
          pageCount={pageCount || 0}
        />
      )}
    </>
  );
}
