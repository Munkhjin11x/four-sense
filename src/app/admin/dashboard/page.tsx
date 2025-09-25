"use client";
import { Button, SeatsTableCard } from "@/components";
import OrderTable from "@/components/dashboard/table";

import { useSearchParamsWithDefaults } from "@/hook/use-search-params";
import { Table, useOrderList, useTable } from "@/store/store";
import { redirect } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// Client component that uses search params
const AdminDashboardContent = () => {
  const { data, refetch } = useTable();
  const { page, pageLimit } = useSearchParamsWithDefaults();
  const { data: orderList } = useOrderList({
    page: page,
    limit: pageLimit,
  });

  const TabText = ["Order list", "Table Seats"];
  const [activeTab, setActiveTab] = useState("Order list");

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
          <OrderTable
            invoices={orderList?.orders ?? []}
            page={page}
            pageCount={orderList?.pagination?.totalPages}
          />
        )}
        {activeTab === "Table Seats" && (
          <SeatsTableCard refetch={refetch} data={data as Table[]} />
        )}
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/admin/login");
    }
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
};

export default AdminPage;
