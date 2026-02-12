"use client";
import { CDN_URL } from "@/constants/contant";
import { Calendar, CalendarPlus2 } from "lucide-react";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Animation from "../ui/animation";
import { client } from "@/lib/sanity/client";
import { SanityDocument } from "next-sanity";
import imageUrlBuilder, { SanityImageSource } from "@sanity/image-url";
import { Badge, Button } from "../ui";
import { format } from "date-fns";
import { MarkerIcon } from "@/icons/marker-icon";
import { VerifyIcon } from "@/icons/verify-icon";
const font = localFont({
  src: "../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});

const POSTS_QUERY = `*[
  _type == "event"
  && defined(slug.current)
]|order(publishedAt desc)[0...10]{
  _id,
  title,
  slug,
  image,
  summary,
  eventDate
}`;

const BLOG_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...5]{
  _id,
  title,
  slug,
  tags,
  publishedAt,
  image,
  summary
}`;

export const EventNewsSection = () => {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Fetch both events and blogs in parallel
        const [eventResponse, blogResponse] = await Promise.all([
          fetch("/api/sanity", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: POSTS_QUERY }),
          }),
          fetch("/api/sanity", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: BLOG_QUERY }),
          })
        ]);

        if (!eventResponse.ok || !blogResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const fetchedEvents = (await eventResponse.json()) as SanityDocument[];
        const fetchedBlogs = (await blogResponse.json()) as SanityDocument[];

        const blogsWithFlag = fetchedBlogs.map(blog => ({ ...blog, isPost: true }));

        const mergedData = [...fetchedEvents, ...blogsWithFlag];

        setPosts(mergedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load posts";

        if (
          errorMessage.includes("403") ||
          errorMessage.includes("Forbidden")
        ) {
          setError("Authentication required - check your Sanity API token");
        } else {
          setError("Failed to load posts from Sanity");
        }
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex justify-center bg-white">
      <div className="bg-white h-full w-full max-w-[1740px] px-10  py-7">
        <div className="flex flex-col gap-7 w-full">
          <div>
            <Animation className="flex justify-between gap-2 max-md:flex-col max-md:items-start items-center">
              <p
                className={cn(
                  font.className,
                  "text-4xl text-[#E78140] font-roba"
                )}
              >
                foursenses Shifts EVENT and Blogs
              </p>
              <Link
                className="border max-md:w-full max-md:justify-center items-center hover:bg-[#F9DAB2]/20  text-center w-fit  gap-2 flex max-sm:text-sm max-sm:px-5 text-nowrap text-[#E78140] border-[#E78140] px-16 rounded-tl-full py-3"
                href="/event"
              >
                <CalendarPlus2 />
                Бүх event
              </Link>
            </Animation>
          </div>
          <Animation>
            {loading && (
              <div className="flex gap-4 overflow-x-auto w-full max-w-full pb-4">
                {[...Array(4)].map((_, i) => (
                  <EventCardSkeleton key={i} />
                ))}
              </div>
            )}
            {error && (
              <div className="mb-4">
                <div className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
                  {error}
                </div>
              </div>
            )}
            {!loading && (
              <div className="flex gap-4 overflow-x-auto  w-full max-w-full pb-4">
                {posts.map((item, i) => (
                  <EventCard key={i} data={item} />
                ))}
              </div>
            )}
          </Animation>
        </div>
      </div>
    </div>
  );
};

const EventCardSkeleton = () => {
  return (
    <div className="border min-w-[360px] max-w-[360px] rounded-md pb-2.5 bg-white animate-pulse">
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-2 mb-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="flex flex-col gap-1">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-2 w-16 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded-sm" />
      </div>
      <div className="w-[360px] h-[400px] bg-gray-200" />
      <div className="pt-3 px-2">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="flex items-center gap-2 justify-between mb-3">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export const EventCard = ({ data }: { data: SanityDocument }) => {
  const isPost = "isPost" in data;
  const { projectId, dataset } = client.config();

  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  const eventEnd = !isPost && data.eventDate
    ? new Date(data.eventDate) < new Date() ? "Дууссан" : "Тун удахгүй"
    : null;

  return (
    <div className="border min-w-[360px] max-w-[360px] rounded-md pb-2.5 bg-white">
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-2 mb-2">
          <Image
            src={CDN_URL + "/images/instagram/logo.svg"}
            width={32}
            height={32}
            alt=""
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <p className="text-[12px] font-semibold">Foursenses.ub</p>
              <VerifyIcon />
            </div>

            <span className="text-[10px]">Foursenses</span>
          </div>
        </div>
        {!isPost && eventEnd && (
          <Badge
            className={cn(
              "rounded-sm py-1.5 px-4",
              eventEnd === "Дууссан"
                ? "bg-gray-100 text-gray-800"
                : "bg-[#12B76A] text-white"
            )}
            variant="outline"
          >
            {eventEnd}
          </Badge>
        )}
        {isPost && data.tags && data.tags.length > 0 && (
          <Badge
            className="rounded-sm py-1.5 px-4 bg-blue-100 text-blue-800"
            variant="outline"
          >
            Мэдээ
          </Badge>
        )}
      </div>
      <Image
        src={urlFor(data?.image)?.url() || ""}
        width={800}
        height={200}
        alt={data.title || ""}
        className="object-cover w-[369px] h-[400px] "
      />
      <div className="pt-3 px-2 ">
        {isPost ? (
          <div>
            <p className="text-[#0095F6] font-bold pb-2">{data.title}</p>
            {data.summary && (
              <p className="text-sm text-gray-600 pb-2 line-clamp-3">
                {data.summary}
              </p>
            )}
            {data.publishedAt && (
              <p className="text-xs text-gray-400">
                {new Date(data.publishedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ) : (
          <p className="text-black text-xl font-bold truncate">{data.title}</p>
        )}
        {!isPost && data.eventDate && (
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Calendar color="#667085" />
              <p className="text-lg text-gray-400">
                {format(data.eventDate, "yyyy-MM-dd")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MarkerIcon />
              <p className="text-lg text-gray-400">Altan joloo tower B1</p>
            </div>
          </div>
        )}
        <div
          className={cn(
            "mt-1.5 grid grid-cols-2 gap-2",
            (isPost || eventEnd === "Дууссан") && "grid-cols-1"
          )}
        >
          {!isPost && eventEnd !== "Дууссан" && (
            <Link
              target="_blank"
              href={`/book-table?date=${data.eventDate}`}
              className="w-full"
            >
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 hover:bg-gray-100"
              >
                <CalendarPlus2 color="#344054" size={20} />
                Захиалга өгөх
              </Button>
            </Link>
          )}
          <Link
            target="_blank"
            href={isPost ? `/blog/${data.slug.current}` : `/event/${data.slug.current}`}
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full text-white hover:text-white hover:bg-[#D55421]/80 bg-[#D55421]"
            >
              Дэлгэрэнгүй
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
