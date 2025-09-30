"use client";
import {
  Button,
  SeatsTableCard,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components";
import OrderTable from "@/components/dashboard/table";
import {
  CalendarIcon,
  UsersIcon,
  TableIcon,
  CheckCircleIcon,
} from "lucide-react";

import { useSearchParamsWithDefaults } from "@/hook/use-search-params";
import { Table, useOrderList, useTable } from "@/store/store";
import { redirect } from "next/navigation";
import { useEffect, useState, Suspense, useCallback } from "react";
import Image from "next/image";

const AdminDashboardContent = () => {
  const { data, refetch } = useTable();
  const { page, pageLimit } = useSearchParamsWithDefaults();
  const { data: orderList, refetch: refetchOrderList } = useOrderList({
    page: page,
    limit: pageLimit,
  });

  const TabText = ["Order list", "Table Seats"];
  const [activeTab, setActiveTab] = useState("Order list");

  const recall = useCallback(() => {
    refetchOrderList();
    refetch();
  }, [refetchOrderList, refetch]);

  const totalOrders = orderList?.orders?.length || 0;
  const totalTables = data?.length || 0;
  const orderedSeats =
    data?.reduce(
      (acc, table) =>
        acc + table.seats.filter((seat) => seat.status === "ordered").length,
      0
    ) || 0;
  const availableSeats =
    data?.reduce(
      (acc, table) =>
        acc + table.seats.filter((seat) => seat.status === "available").length,
      0
    ) || 0;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: CalendarIcon,
      description: "Orders this month",
      color: "bg-blue-500",
    },
    {
      title: "Total Tables",
      value: totalTables,
      icon: TableIcon,
      description: "Available tables",
      color: "bg-purple-500",
    },
    {
      title: "Ordered Seats",
      value: orderedSeats,
      icon: UsersIcon,
      description: "Currently ordered",
      color: "bg-orange-500",
    },
    {
      title: "Available Seats",
      value: availableSeats,
      icon: CheckCircleIcon,
      description: "Ready for booking",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9D9B1]">
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center space-y-2">
          <Image src={"/navbar/logo.png"} alt="logo" width={240} height={50} />
          <p className="text-sm text-gray-600 mt-1">
            Welcome back! Here&apos;s what&apos;s happening at your restaurant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-md bg-white">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Management
                </CardTitle>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-lg space-x-1">
                {TabText.map((text) => (
                  <Button
                    key={text}
                    variant={activeTab === text ? "default" : "ghost"}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === text
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab(text)}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="min-h-[650px]">
              {activeTab === "Order list" && (
                <OrderTable
                  refetch={recall}
                  invoices={orderList?.orders ?? []}
                  page={page}
                  pageCount={orderList?.pagination?.totalPages}
                />
              )}
              {activeTab === "Table Seats" && (
                <SeatsTableCard refetch={refetch} data={data as Table[]} />
              )}
            </div>
          </CardContent>
        </Card>
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
