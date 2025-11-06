import { EventCard } from "@/components";
import { Pagination } from "@/components/blog/pagination";
import { client } from "@/lib/sanity/client";
import { SanityDocument } from "next-sanity";
import { AnnouncementIcon } from "@/icons/announcement-icon";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const font = localFont({
  src: "../../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});

interface EventsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const EVENTS_QUERY = `*[
    _type == "event"
    && defined(slug.current)
  ]|order(publishedAt desc) [($page - 1) * $limit...$page * $limit]{
   _id,
  title,
  slug,
  image,
  summary,
  eventDate
  }`;

const TOTAL_EVENTS_QUERY = `count(*[
    _type == "event"
    && defined(slug.current)
  ])`;

const EventsPage = async ({ searchParams }: EventsPageProps) => {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page, 10)
    : 1;

  const limit = 9;
  const skip = (page - 1) * limit;
  const events = await client.fetch(EVENTS_QUERY, { page, limit, skip });
  const total = await client.fetch(TOTAL_EVENTS_QUERY);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-center bg-white min-h-screen">
      <div className="w-full max-w-[1740px] px-6 md:px-10 py-10 md:py-16">
        <div className="mb-12">
          <div className="flex justify-between items-center gap-4 max-md:flex-col max-md:items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 text-[#E78140]">
                <AnnouncementIcon />
              </div>
              <h1
                className={cn(
                  font.className,
                  "text-4xl md:text-5xl text-[#E78140] font-roba"
                )}
              >
                Foursenses Event
              </h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="bg-[#E78140]/10 px-4 py-2 rounded-full">
                {total} Нийтлэл
              </span>
              <span className="bg-[#E78140]/10 px-4 py-2 rounded-full">
                Хуудас {page} / {totalPages}
              </span>
            </div>
          </div>
          <div className="h-1 w-32 bg-[#E78140] rounded-full" />
        </div>

        {events.length > 0 ? (
          <div className="flex flex-wrap gap-6 mb-12">
            {events.map((event: SanityDocument) => (
              <div key={event._id} className="flex justify-center">
                <EventCard data={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-gray-400 mb-4 w-16 h-16">
              <AnnouncementIcon />
            </div>
            <p className="text-xl text-gray-500">Нийтлэл олдсонгүй</p>
          </div>
        )}

        {/* Pagination */}
        {/* {totalPages > 1 && ( */}
        <div className="flex justify-center mt-8">
          <Pagination current={page} total={totalPages} />
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default EventsPage;
