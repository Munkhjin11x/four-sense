"use client";
import { CDN_URL } from "@/constants/contant";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Animation from "../ui/animation";
import { client } from "@/lib/sanity/client";
import { SanityDocument } from "next-sanity";
import imageUrlBuilder, { SanityImageSource } from "@sanity/image-url";
import { Button } from "../ui";
import { PodcastIcon } from "lucide-react";
import { PodcastModal } from "./podcast-modal";
const font = localFont({
  src: "../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});

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

export const PodcastSection = () => {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState("");

  const handleOpen = (url: string) => () => {
    setIsOpen(url);
  };
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
          throw new Error("Failed to fetch blog posts data");
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
    <div className="flex justify-center bg-white border-t-2 border-[#E78140]">
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
                Foursenses Podcast
              </p>
              <Link
                className="border max-md:w-full max-md:justify-center items-center hover:bg-[#F9DAB2]/20  text-center w-fit  gap-2 flex max-sm:text-sm max-sm:px-5 text-nowrap text-[#E78140] border-[#E78140] px-16 rounded-tl-full py-3"
                href="/podcast"
              >
                <PodcastIcon />
                Бүх podcast
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
                  <PodcastCard key={i} data={item} handleOpen={handleOpen} />
                ))}
              </div>
            )}
          </Animation>
        </div>
      </div>
      <PodcastModal
        isOpen={!!isOpen}
        onClose={() => setIsOpen("")}
        url={isOpen || ""}
      />
    </div>
  );
};

export const PodcastCard = ({
  data,
  handleOpen,
}: {
  data: SanityDocument;
  handleOpen: (url: string) => () => void;
}) => {
  const isPost = "isPost" in data;
  const { projectId, dataset } = client.config();

  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  return (
    <div className="border bg-white min-w-[360px] rounded-md pb-2.5">
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-2 mb-2">
          <Image
            src={CDN_URL + "/images/instagram/logo.svg"}
            width={32}
            height={32}
            alt=""
          />
          <div className="flex flex-col">
            <p className="text-[12px] font-semibold">Foursenses.ub</p>
            <span className="text-[10px]">Foursenses</span>
          </div>
        </div>
      </div>
      <Image
        src={urlFor(data?.image)?.url() || ""}
        width={800}
        height={200}
        alt={isPost ? data.title || "" : ""}
        className="object-cover w-[369px] h-[400px] "
      />
      <div className="pt-3 px-2 ">
        <p className="text-black font-bold">{data.title}</p>
        <div className="mt-1.5">
          <Button
            variant="outline"
            className="w-full hover:bg-gray-100"
            onClick={handleOpen(data.url)}
          >
            Үзэх
          </Button>
        </div>
      </div>
    </div>
  );
};
