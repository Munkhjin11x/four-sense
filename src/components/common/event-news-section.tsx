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

export const EventNewsSection = () => {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/sanity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: POSTS_QUERY }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events data");
        }

        const fetchedPosts = (await response.json()) as SanityDocument[];
        setPosts(fetchedPosts);
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
                foursenses Shifts EVENT
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
              <div className="flex justify-center items-center p-4">
                <div className="text-sm text-gray-500">Loading posts...</div>
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

export const EventCard = ({ data }: { data: SanityDocument }) => {
  const isPost = "isPost" in data;
  const { projectId, dataset } = client.config();

  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  const eventEnd =
    new Date(data.eventDate) < new Date() ? "Дууссан" : "Тун удахгүй";

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
      </div>
      <Image
        src={urlFor(data?.image)?.url() || ""}
        width={800}
        height={200}
        alt={isPost ? data.title || "" : ""}
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
        <div
          className={cn(
            "mt-1.5 grid grid-cols-2 gap-2",
            eventEnd === "Дууссан" && "grid-cols-1"
          )}
        >
          {eventEnd !== "Дууссан" && (
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
            href={`/event/${data.slug.current}`}
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
