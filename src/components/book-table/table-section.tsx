/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DjTable } from "./dj-table";
import { WideTable } from "./wide-table";
import { ATable } from "./a-table";
import Image from "next/image";
import { Button } from "../ui";

import { Seat } from "./seat";
import useScreenSize from "@/hook/use-screen";
import { Key, useState } from "react";
import SeatTooltip from "./table-tooltip";
import { OrderModal } from "./order-modal";
import Animation from "../ui/animation";
import { CalendarIcon } from "@/icons/calendar-icon";
import { useTable } from "@/store/store";
import { Phone } from "lucide-react";
import { ComingSoonModal } from "./cominsoon-modal";
import { cn } from "@/lib/utils";

export const TableSection = () => {
  const { width } = useScreenSize();
  const [selectedSeats, setSelectedSeats] = useState<{
    [key: string]: string[];
  }>({});

  const [isOpen, setIsOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [all, setAll] = useState(false);
  const [orderingTableId, setOrderingTableId] = useState<string | null>(null);

  const { data: tables, isLoading, refetch } = useTable();

  const mapSeatData = (existingTables: any, newData: any) => {
    return existingTables.map((table: { id: any; seats: any[] }) => {
      const newTableData = newData?.find(
        (newTable: { tableName: any }) => newTable.tableName === table.id
      );
      if (newTableData) {
        return {
          ...table,
          seats:
            table.seats?.map((seat, index) => {
              const newSeatData = newTableData.seats[index];
              return newSeatData
                ? {
                    ...seat,
                    status: newSeatData.status,
                    _id: newSeatData._id,
                  }
                : seat;
            }) || [],
        };
      }
      return table;
    });
  };

  const updatedData = mapSeatData(width > 1580 ? data2 : data, tables);

  const nonSelectableTables = [
    "dj-left",
    "dj-right",
    "mixologist",
    "not-selected",
  ];

  const handleSeatSelect = (tableId: any, seatId: any) => {
    if (nonSelectableTables.includes(tableId)) {
      return;
    }
    setSelectedSeats((prev) => {
      const tableSeats = prev[tableId] || [];
      // Handle both object format {$oid: "string"} and direct string format
      const seatIdString =
        typeof seatId === "object" && seatId?.$oid ? seatId.$oid : seatId;

      if (tableSeats.includes(seatIdString)) {
        return {
          ...prev,
          [tableId]: tableSeats.filter((id) => id !== seatIdString),
        };
      }
      return {
        ...prev,
        [tableId]: [...tableSeats, seatIdString],
      };
    });
  };
  // const currentData = width > 1580 ? data2 : data;

  // const handleSelectAll = () => {
  //   setAll(true);
  //   const allSeatsSelected = {};

  //   currentData.forEach((table) => {
  //     if (table.seats && table.seats.length > 0) {
  //       (allSeatsSelected as { [key: string]: string[] })[table.id] =
  //         Array.from({ length: table.seats.length }, (_, index) =>
  //           index.toString()
  //         );
  //     }
  //   });

  //   setSelectedSeats(allSeatsSelected);
  //   setIsOpen(true);
  // };

  const handleComingSoon = () => {
    setIsComingSoonOpen((prev) => !prev);
  };

  const handleOrder = (tableId: string) => {
    // Only open modal if seats are selected for this table
    const tableSeats = selectedSeats[tableId];
    if (!tableSeats || tableSeats.length === 0) {
      return;
    }
    setOrderingTableId(tableId);
    setIsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full">
        <div className="flex justify-center items-center h-full flex-col gap-10">
          <Image src={"/home/logo.webp"} alt="" width={200} height={300} />
          <p className="text-white text-2xl font-bold animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[url('/menu/bg.png')] min-h-screen flex flex-col justify-between items-center bg-cover bg-center bg-no-repeat w-full">
      <Animation className="w-full flex justify-center items-center">
        <Image
          src="/menu/nomad.png"
          alt="Nomad"
          width={1100}
          height={700}
          sizes="100vw"
          className="mt-24 w-full max-w-[1100px]"
        />
      </Animation>
      <div className="flex flex-col justify-between h-full gap-24 items-center w-full">
        <Animation>
          <div className="flex justify-center relative items-center w-full h-[500px]">
            <div className="relative  w-full h-full max-2xl:overflow-auto">
              {(width > 1580 ? updatedData : updatedData).map(
                (item: {
                  id: Key | null | undefined;
                  x: any;
                  y: any;
                  seats: any[];
                  children: any;
                  notRenderedSeat?: boolean;
                }) => (
                  <div
                    key={item.id}
                    className="absolute"
                    style={{ left: item.x, top: item.y }}
                  >
                    <div className="relative cursor-pointer">
                      <SeatTooltip
                        all={all}
                        handleOrder={handleOrder}
                        setSelectedSeats={setSelectedSeats}
                        selectedSeats={selectedSeats}
                        tableId={item.id as string}
                        seats={item.seats || []}
                      >
                        <div
                          className={cn(
                            item.notRenderedSeat
                              ? item.seats?.[0].status === "ordered"
                                ? "opacity-50"
                                : ""
                              : ""
                          )}
                          onClick={() =>
                            handleSeatSelect(
                              item.id as string,
                              item.seats?.[0]?._id.$oid
                            )
                          }
                        >
                          {item.children}
                        </div>
                        {item.seats?.map((seat, i) => (
                          <div
                            key={i}
                            style={{ left: seat.x, top: seat.y }}
                            className="absolute"
                          >
                            <div
                              onClick={() =>
                                handleSeatSelect(item.id as string, seat._id)
                              }
                              className={`cursor-pointer ${
                                item.notRenderedSeat
                                  ? "hidden"
                                  : selectedSeats[item.id as string]?.includes(
                                        seat._id?.$oid || seat._id
                                      ) || seat.status === "ordered"
                                    ? "opacity-50"
                                    : ""
                              }`}
                            >
                              <Seat seatNumber={i + 1} rotate={seat.rotate} />
                            </div>
                          </div>
                        ))}
                      </SeatTooltip>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </Animation>

        <div className="flex flex-col mb-24 gap-3 max-w-[300px] justify-center items-center w-full">
          <Button
            onClick={handleComingSoon}
            variant="ghost"
            className="w-full border text-xl flex gap-2 items-center hover:bg-white/50 text-white rounded-tl-3xl"
          >
            <CalendarIcon color="white" /> Organizing events
          </Button>
          <Button
            variant="ghost"
            className="w-full border flex gap-2 text-xl hover:bg-white/50 text-white rounded-tl-3xl"
          >
            <Phone />
            88071190
          </Button>
        </div>
        <ComingSoonModal isOpen={isComingSoonOpen} onClose={handleComingSoon} />
      </div>
      <OrderModal
        refetch={refetch}
        tableName={all ? " Organizing events" : orderingTableId || ""}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedSeats({});
          setAll(false);
          setOrderingTableId(null);
        }}
        seats={(() => {
          if (all) {
            return Object.values(selectedSeats)
              .flat()
              .map((seat) => ({ $oid: seat.toString() }));
          }

          // Use the specific table being ordered, not just the first key
          const tableName = orderingTableId;
          if (!tableName) return [];

          const tableData = updatedData.find(
            (table: any) => table.id === tableName
          );
          const selectedSeatIds = selectedSeats[tableName] || [];

          return selectedSeatIds.map((seatId) => {
            const seatIndex =
              tableData?.seats?.findIndex(
                (seat: any) => seat._id?.$oid === seatId || seat._id === seatId
              ) ?? -1;
            return {
              $oid: seatId.toString(),
              seatNumber: seatIndex + 1,
            };
          });
        })()}
      />
    </div>
  );
};

const data = [
  {
    id: "dj-left",
    x: "5%",
    y: "30%",
    children: <DjTable />,
  },
  {
    id: "mixologist",
    x: "270px",
    y: "45%",
    children: <WideTable title="Mixologist" width={85} height={225} />,
  },
  {
    id: "c1",
    x: "400px",
    y: "53%",
    children: <WideTable title="c1" width={180} height={96} />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "ordered",
        x: "10%",
        y: "105%",
        rotate: "rotate-0",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "40%",
        y: "105%",
        rotate: "rotate-0",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "70%",
        y: "105%",
        rotate: "rotate-0",
      },
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "ordered",
        x: "10%",
        y: "-40%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "ordered",
        x: "40%",
        y: "-40%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "ordered",
        x: "70%",
        y: "-40%",
        rotate: "rotate-180",
      },
    ],
  },
  {
    id: "c2",
    x: "590px",
    y: "50%",
    children: <WideTable title="c2" width={180} height={96} />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "ordered",
        x: "10%",
        y: "-40%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "ordered",
        x: "40%",
        y: "-40%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "ordered",
        x: "70%",
        y: "-40%",
        rotate: "rotate-180",
      },
    ],
  },
  {
    id: "c3",
    x: "780px",
    y: "51.5%",
    children: <WideTable title="c3" width={180} height={96} />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "10%",
        y: "105%",
        rotate: "rotate-0",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "40%",
        y: "105%",
        rotate: "rotate-0",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "70%",
        y: "105%",
        rotate: "rotate-0",
      },
    ],
  },
  {
    id: "c4",
    x: "970px",
    y: "41.5%",
    children: <WideTable title="c4" width={60} height={180} />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "40%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "10%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "70%",
        rotate: "-rotate-90",
      },
    ],
  },
  {
    id: "b1",
    x: "1210px",
    y: "5%",
    children: <ATable title="B1" />,
    notRenderedSeat: true,
    seats: [
      {
        title: "B Table",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
    ],
  },
  {
    id: "b2",
    x: "1340px",
    y: "0%",
    notRenderedSeat: true,
    children: <ATable title="B2" />,
    seats: [
      {
        title: "B Table",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
    ],
  },
  {
    id: "b3",
    x: "1470px",
    y: "0%",
    children: <ATable title="B3" />,
    notRenderedSeat: true,
    seats: [
      {
        title: "B Table",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
    ],
  },
  {
    id: "b4",
    x: "1600px",
    y: "0%",
    children: <ATable title="B4" />,
    notRenderedSeat: true,
    seats: [
      {
        title: "B Table",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
    ],
  },
  {
    id: "a1",
    x: "1210px",
    y: "35%",
    children: <ATable title="a1" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "-70%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-80%",
        y: "25%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "110%",
        rotate: "rotate-0",
      },
    ],
  },

  {
    id: "a2",
    x: "1210px",
    y: "75%",
    children: <ATable title="a2" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "-70%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-80%",
        y: "25%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "110%",
        rotate: "rotate-0",
      },
    ],
  },
  {
    id: "a3",
    x: "1450px",
    y: "24%",
    children: <ATable title="a3" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "-70%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-80%",
        y: "25%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "110%",
        rotate: "rotate-0",
      },
    ],
  },
  {
    id: "a4",
    x: "1450px",
    y: "62%",
    children: <ATable title="a4" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "-70%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-80%",
        y: "25%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "110%",
        rotate: "rotate-0",
      },
    ],
  },
  {
    id: "a5",
    x: "1450px",
    y: "100%",
    children: <ATable title="a5" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "-70%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-80%",
        y: "25%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "110%",
        rotate: "rotate-0",
      },
    ],
  },
  {
    id: "long-table",
    x: "1700px",
    y: "30%",
    children: <DjTable title="Long Table" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "8%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "23%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "38%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "53%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 5",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "68%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 6",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "83%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 7",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "8%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 8",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "23%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 9",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "38%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 10",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "53%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 11",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "68%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 12",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "83%",
        rotate: "-rotate-90",
      },
    ],
  },
];

const data2 = [
  {
    id: "dj-left",
    x: "5%",
    y: "30%",
    children: <DjTable />,
  },
  {
    id: "mixologist",
    x: "15%",
    y: "45%",
    children: <WideTable title="Mixologist" width={85} height={225} />,
  },
  {
    id: "c1",
    x: "22%",
    y: "53%",
    children: <WideTable title="c1" width={180} height={96} />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "10%",
        y: "105%",
        rotate: "rotate-0",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "40%",
        y: "105%",
        rotate: "rotate-0",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "70%",
        y: "105%",
        rotate: "rotate-0",
      },
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "ordered",
        x: "10%",
        y: "-40%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "ordered",
        x: "40%",
        y: "-40%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "ordered",
        x: "70%",
        y: "-40%",
        rotate: "rotate-180",
      },
    ],
  },
  {
    id: "c2",
    x: "32.5%",
    y: "50%",
    children: <WideTable title="c2" width={180} height={96} />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "ordered",
        x: "10%",
        y: "-40%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "ordered",
        x: "40%",
        y: "-40%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "ordered",
        x: "70%",
        y: "-40%",
        rotate: "rotate-180",
      },
    ],
  },
  {
    id: "c3",
    x: "43.5%",
    y: "51.5%",
    children: <WideTable title="c3" width={180} height={96} />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "10%",
        y: "105%",
        rotate: "rotate-0",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "40%",
        y: "105%",
        rotate: "rotate-0",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "70%",
        y: "105%",
        rotate: "rotate-0",
      },
    ],
  },
  {
    id: "c4",
    x: "54%",
    y: "41.5%",
    children: <WideTable title="c4" width={60} height={180} />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "40%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "10%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "70%",
        rotate: "-rotate-90",
      },
    ],
  },
  {
    id: "b1",
    x: "64%",
    y: "5%",
    children: <ATable title="B1" />,
    notRenderedSeat: true,
    seats: [
      {
        title: "B Table",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
    ],
  },
  {
    id: "b2",
    x: "72%",
    y: "0%",
    notRenderedSeat: true,
    children: <ATable title="B2" />,
    seats: [
      {
        title: "B Table",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
    ],
  },
  {
    id: "b3",
    x: "82%",
    y: "0%",
    children: <ATable title="B3" />,
    notRenderedSeat: true,
    seats: [
      {
        title: "B Table",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
    ],
  },
  {
    id: "b4",
    x: "88%",
    y: "0%",
    children: <ATable title="B4" />,
    notRenderedSeat: true,
    seats: [
      {
        title: "B Table",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
    ],
  },
  {
    id: "a1",
    x: "78%",
    y: "28%",
    children: <ATable title="A1" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "-70%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-80%",
        y: "25%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "110%",
        rotate: "rotate-0",
      },
    ],
  },
  {
    id: "a2",
    x: "78%",
    y: "68%",
    children: <ATable title="a2" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "-70%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-80%",
        y: "25%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "110%",
        rotate: "rotate-0",
      },
    ],
  },
  {
    id: "a3",
    x: "78%",
    y: "105%",
    children: <ATable title="a3" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "-70%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-80%",
        y: "25%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "110%",
        rotate: "rotate-0",
      },
    ],
  },
  {
    id: "a4",
    x: "68%",
    y: "50%",
    children: <ATable title="a4" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "-70%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-80%",
        y: "25%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "110%",
        rotate: "rotate-0",
      },
    ],
  },
  {
    id: "a5",
    x: "68%",
    y: "86%",
    children: <ATable title="a5" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "110%",
        y: "25%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "-70%",
        rotate: "rotate-180",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-80%",
        y: "25%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "12%",
        y: "110%",
        rotate: "rotate-0",
      },
    ],
  },
  {
    id: "long-table",
    x: "90%",
    y: "30%",
    children: <DjTable title="Long Table" />,
    seats: [
      {
        title: "Seat 1",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "8%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 2",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "23%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 3",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "38%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 4",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "53%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 5",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "68%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 6",
        image: "/table/seat.png",
        status: "available",
        x: "-35%",
        y: "83%",
        rotate: "rotate-90",
      },
      {
        title: "Seat 7",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "8%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 8",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "23%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 9",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "38%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 10",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "53%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 11",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "68%",
        rotate: "-rotate-90",
      },
      {
        title: "Seat 12",
        image: "/table/seat.png",
        status: "available",
        x: "100%",
        y: "83%",
        rotate: "-rotate-90",
      },
    ],
  },
];
