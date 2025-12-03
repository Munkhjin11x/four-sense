import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiApproveOrder,
  apiCancelOrder,
  apiOrderList,
  apiTables,
} from "./api";
import { toast } from "sonner";

export const useTable = () => {
  return useQuery<Table[]>({ queryKey: ["tables"], queryFn: apiTables });
};

export const useOrderList = (params?: { page?: number; limit?: number }) => {
  return useQuery<OrderList>({
    queryKey: ["order-list", params?.page, params?.limit],
    queryFn: () => apiOrderList(params),
  });
};

export const useApproveOrder = (refetch: () => void) => {
  return useMutation<Order, unknown, { orderId: number }>({
    mutationFn: (data: { orderId: number }) =>
      apiApproveOrder(data) as Promise<Order>,
    onSuccess: () => {
      toast.success("Order approved");

      refetch();
    },
    onError: () => {
      toast.error("Failed to approve order");
    },
  });
};

export const useCancelOrder = (refetch: () => void) => {
  return useMutation<Order, unknown, { orderId: number }>({
    mutationFn: (data: { orderId: number }) =>
      apiCancelOrder(data) as Promise<Order>,
    onSuccess: () => {
      toast.success("Order cancelled");
      refetch();
    },
    onError: () => {
      toast.error("Failed to cancel order");
    },
  });
};

export type Table = {
  _id: { $oid: string };
  tableId: { $oid: string };
  tableName: string;
  tableStatus?: string;
  seats: Seat2[];
  __v: { $numberInt: string };
};
export type Seat2 = {
  _id: { $oid: string };
  title: string;
  status: string;
};

export type OrderList = {
  orders: Order[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    totalCustomers: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

export type Order = {
  id: number;
  eventDate: number;
  tableId: number;
  tableName: string;
  name: string;
  phone: string;
  email: string;
  orderDate: string;
  status: "pending" | "approved" | "cancelled";
  seats?: Seat[];
};

export type Seat = {
  OrderSeats: {
    id: number;
    orderId: number;
    seatId: number;
  };
  TableSeats: {
    id: number;
    tableId: number;
    tableName: string;
    title: string;
    status: string;
    createdAt: string;
  };
};
