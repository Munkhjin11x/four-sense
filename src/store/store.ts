import { useQuery } from "@tanstack/react-query";
import { apiOrderList, apiTables } from "./api";

export const useTable = () => {
  return useQuery<Table[]>({ queryKey: ["tables"], queryFn: apiTables });
};

export const useOrderList = (params?: { page?: number; limit?: number }) => {
  return useQuery<OrderList>({
    queryKey: ["order-list", params?.page, params?.limit],
    queryFn: () => apiOrderList(params),
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
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

export type Order = {
  id: number;
  tableId: number;
  tableName: string;
  name: string;
  phone: string;
  email: string;
  orderDate: string;
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
