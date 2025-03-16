"use client";
import { Button, SeatsTableCard } from "@/components";
import { OrderListTable } from "@/components/dashboard/table-order-list";
import { Table, useOrderList, useTable } from "@/store/store";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const { data, refetch } = useTable();
  const { data: orderList } = useOrderList();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/admin/login");
    }
    setIsClient(true);
  }, []);

  const TabText = ["Order list", "Table Seats"];
  const [activeTab, setActiveTab] = useState("Order list");
  if (!isClient) return null;
  return (
    <div className=" w-full flex flex-col bg-white p-4 h-full">
      <div className="flex gap-2">
        {TabText.map((text) => (
          <Button
            variant="outline"
            className="w-fit"
            key={text}
            onClick={() => setActiveTab(text)}
          >
            {text}
          </Button>
        ))}
      </div>
      <div className="w-full h-full mt-4">
        {activeTab === "Order list" && (
          <OrderListTable data={orderList?.orders ?? []} />
        )}
        {activeTab === "Table Seats" && (
          <SeatsTableCard refetch={refetch} data={data as Table[]} />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
