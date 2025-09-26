import { Order, useApproveOrder, useCancelOrder } from "@/store/store";
import DataTable from "../ui/data-table";
import { columns } from "./column";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, Calendar } from "lucide-react";
import { AreYouSureModal } from "../ui/are-you-sure-modal";
import { useState } from "react";

interface TOrderListTableProps {
  invoices: Order[] | undefined;
  page: number;
  totalRows?: number;
  pageCount?: number;
  refetch: () => void;
}

export default function OrderTable({
  invoices,
  pageCount,
  refetch,
}: TOrderListTableProps) {
  const totalOrders = invoices?.length || 0;
  const totalCustomers = invoices
    ? new Set(invoices.map((order) => order.email)).size
    : 0;
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: approveOrder } = useApproveOrder(refetch);
  const { mutate: cancelOrder } = useCancelOrder(refetch);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<"approve" | "cancel" | null>(
    null
  );

  const handleApprove = (orderId: number) => () => {
    console.log("approveOrder", orderId);
    setIsOpen(true);
    setSelectedOrderId(orderId);
    setActionType("approve");
  };

  const handleCancel = (orderId: number) => () => {
    setIsOpen(true);
    setSelectedOrderId(orderId);
    setActionType("cancel");
  };

  const confirmAction = () => {
    if (selectedOrderId !== null && actionType) {
      if (actionType === "approve") {
        approveOrder({ orderId: selectedOrderId });
      } else {
        cancelOrder({ orderId: selectedOrderId });
      }
    }
    setIsOpen(false);
    setSelectedOrderId(null);
    setActionType(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {totalOrders}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">
                  Unique Customers
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {totalCustomers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                All Orders
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Complete list of customer orders and reservations
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          {invoices && invoices.length > 0 ? (
            <DataTable
              columns={columns(handleApprove, handleCancel)}
              data={invoices}
              pageCount={pageCount || 0}
              className="border-none"
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <Calendar className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 text-center">
                There are no orders to display at the moment.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <AreYouSureModal
        title={actionType === "approve" ? "Approve" : "Cancel"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onApproval={confirmAction}
      />
    </div>
  );
}
