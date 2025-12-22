import { Pagination } from "@/components/blog/pagination";
import { client } from "@/lib/sanity/client";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { PodcastList } from "@/components/common/podcast-list";

const font = localFont({
  src: "../../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});

interface EventsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const POSTS_QUERY = `*[
    _type == "podcast"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...5]{
    _id,
    title,
    slug,
    image,
    url,
    publishedAt,
  }`;

const TOTAL_POSTS_QUERY = `count(*[
    _type == "podcast"
    && defined(slug.current)
  ])`;

const EventsPage = async ({ searchParams }: EventsPageProps) => {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page, 10)
    : 1;

  const limit = 9;
  const skip = (page - 1) * limit;
  const posts = await client.fetch(POSTS_QUERY, { page, limit, skip });
  const total = await client.fetch(TOTAL_POSTS_QUERY);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-center bg-[#308653]  min-h-screen">
      <div className="w-full max-w-[1740px] px-6 md:px-10 py-10 pt-28">
        <div className="mb-12">
          <div className="flex justify-between items-center gap-4 max-md:flex-col max-md:items-start mb-4">
            <div className="flex items-center gap-3">
              <h1
                className={cn(
                  font.className,
                  "text-4xl md:text-5xl text-[#E78140] font-roba"
                )}
              >
                Foursenses Podcast
              </h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="bg-[#E78140] text-white px-4 py-2 rounded-full">
                {total} Podcast
              </span>
              <span className="bg-[#E78140] text-white px-4 py-2 rounded-full">
                Page {page} / {totalPages}
              </span>
            </div>
          </div>
          <div className="h-1 w-32 bg-[#E78140] rounded-full" />
        </div>

        <PodcastList posts={posts} />

        <div className="flex justify-center mt-8">
          <Pagination current={page} total={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
