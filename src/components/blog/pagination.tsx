import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";

export const Pagination = async ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(total);
      } else if (current >= total - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = total - 3; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(current - 1);
        pages.push(current);
        pages.push(current + 1);
        pages.push("...");
        pages.push(total);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center">
      <div className="flex bg-white items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
        {/* Previous Button */}
        <Link
          href={current > 1 ? `/blog?page=${current - 1}` : "#"}
          className={cn(
            "transition-all",
            current === 1 && "pointer-events-none opacity-50"
          )}
        >
          <Button
            variant="outline"
            size="sm"
            disabled={current === 1}
            className="h-9 px-3 border-[#E78140] text-[#E78140] hover:bg-[#E78140] hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Өмнөх
          </Button>
        </Link>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-1 text-gray-500"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === current;

            return (
              <Link key={pageNum} href={`/blog?page=${pageNum}`}>
                <button
                  className={cn(
                    "min-w-[36px] h-9 px-3 rounded-md text-sm font-medium transition-all",
                    isActive
                      ? "bg-[#E78140] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {pageNum}
                </button>
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        <Link
          href={current < total ? `/blog?page=${current + 1}` : "#"}
          className={cn(
            "transition-all",
            current === total && "pointer-events-none opacity-50"
          )}
        >
          <Button
            variant="outline"
            size="sm"
            disabled={current === total}
            className="h-9 px-3 border-[#E78140] text-[#E78140] hover:bg-[#E78140] hover:text-white transition-colors"
          >
            Дараах
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
