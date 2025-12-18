import { InstragramCard } from "@/components";
import { Pagination } from "@/components/blog/pagination";
import { client } from "@/lib/sanity/client";
import { SanityDocument } from "next-sanity";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const font = localFont({
  src: "../../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc) [($page - 1) * $limit...$page * $limit]{
    _id,
    title,
    slug,
    tags,
    publishedAt,
    image,
    summary
  }`;

const TOTAL_POSTS_QUERY = `count(*[
    _type == "post"
    && defined(slug.current)
  ])`;

const BlogsPage = async ({ searchParams }: BlogPageProps) => {
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
    <div className="flex justify-center bg-[#308653] min-h-screen">
      <div className="w-full max-w-[1740px] px-6 md:px-10  pt-28">
        <div className="mb-12">
          <div className="flex justify-between items-center gap-4 max-md:flex-col max-md:items-start mb-4">
            <div className="flex items-center gap-3">
              <h1
                className={cn(
                  font.className,
                  "text-4xl md:text-5xl text-[#E78140] font-roba"
                )}
              >
                Foursenses Blog
              </h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="bg-[#E78140] text-white px-4 py-2 rounded-full">
                {total} Нийтлэл
              </span>
              <span className="bg-[#E78140] text-white px-4 py-2 rounded-full">
                Хуудас {page} / {totalPages}
              </span>
            </div>
          </div>
          <div className="h-1 w-32 bg-[#E78140] rounded-full" />
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {posts.map((post: SanityDocument) => (
              <div key={post._id} className="flex justify-center w-full">
                <InstragramCard data={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
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

export default BlogsPage;
