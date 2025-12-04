import { client } from "@/lib/sanity/client";

import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder, { SanityImageSource } from "@sanity/image-url";
import { Tilt } from "@/components/ui/tilt";
import { CalendarPlus2 } from "lucide-react";
import { ShareButtons } from "@/components/common/share-buttons";

const { projectId, dataset } = client.config();
const PODCAST_QUERY = `*[_type == "podcast" && slug.current == $slug][0]`;
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument>(PODCAST_QUERY, { slug });

  return {
    title: post?.title ? `${post.title} | Podcast` : "Podcast",
    description: post?.summary
      ? post?.summary
      : "Read this interesting podcast on Podcast",
    openGraph: {
      title: post?.title || "Podcast",
      description: post?.summary || "Read this interesting podcast on Podcast",
      images: post?.image
        ? [
            {
              url: urlFor(post.image)?.url(),
              width: 1280,
              height: 720,
              alt: post.title,
            },
          ]
        : [],
    },
  };
}

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const podcast = await client.fetch<SanityDocument>(PODCAST_QUERY, { slug });

  if (!podcast) {
    return (
      <div className="min-h-screen bg-gradient-to-br pt-10 from-orange-50/30 via-amber-50/20 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            Blog Not Found
          </h1>
          <p className="text-lg text-zinc-600">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br pt-10 ">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Tilt>
            <div className="relative">
              <div className="aspect-[7/8] relative overflow-hidden rounded-2xl shadow-2xl">
                {podcast.image && (
                  <Image
                    src={urlFor(podcast.image)?.url() || ""}
                    alt={podcast.title || "Podcast"}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>
          </Tilt>

          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 py-0.5 px-6 bg-white text-[#E78140] font-semibold rounded-full transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Буцах
                  </Link>
                </div>

                <ShareButtons />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
                {podcast.title || "Podcast"}
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            </div>

            {podcast.description && (
              <p className="text-lg lg:text-xl text-zinc-600 leading-relaxed">
                {podcast.description}
              </p>
            )}

            {podcast.url && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                {podcast.url.includes("youtube.com") ||
                podcast.url.includes("youtu.be") ? (
                  <iframe
                    src={
                      podcast.url.includes("youtube.com")
                        ? podcast.url.replace("watch?v=", "embed/")
                        : podcast.url.replace("youtu.be/", "youtube.com/embed/")
                    }
                    title={podcast.title || "Podcast"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <video
                    src={podcast.url}
                    controls
                    className="absolute inset-0 w-full h-full"
                  />
                )}
              </div>
            )}

            <div className="pt-4 flex gap-4">
              {/* <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Буцах
              </Link> */}
              <Link
                href={`/book-table?date=${podcast.eventDate}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-black font-semibold rounded-full transition-all duration-200"
              >
                <CalendarPlus2 color="#344054" size={20} />
                Захиалга өгөх
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
