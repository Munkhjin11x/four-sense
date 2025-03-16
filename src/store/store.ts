import { useQuery } from "@tanstack/react-query";
import { apiOrderList, apiTables } from "./api";

export const useTable = () => {
  return useQuery({ queryKey: ["tables"], queryFn: apiTables });
};

export const useOrderList = () => {
  return useQuery<OrderList>({
    queryKey: ["order-list"],
    queryFn: apiOrderList,
  });
};

export type OrderList = {
  orders: Order[];
};

export type Order = {
  _doc: {
    _id: string;
    name: string;
    phone: string;
    email: string;
    orderStatus: string;
    orderDate: string;
    tableName: string;
    orderTotal: number;
  };
  seats: Seat[];
};

export type Table = {
  _id: string;
  tableName: string;
  tableStatus: string;
  seats: Seat[];
};

type Seat = {
  _id: string;
  title: string;
  status: string;
};
