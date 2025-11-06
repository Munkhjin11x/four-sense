import { client } from "@/lib/sanity/client";
import { cn } from "@/lib/utils";
import { PortableText, SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Tilt } from "@/components/ui/tilt";
import { ShareButtons } from "@/components/common/share-buttons";

const { projectId, dataset } = client.config();
const BLOG_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
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
  const post = await client.fetch<SanityDocument>(BLOG_QUERY, { slug });

  return {
    title: post?.title ? `${post.title} | My Blog` : "My Blog",
    description: post?.summary
      ? post?.summary
      : "Read this interesting post on My Blog",
    openGraph: {
      title: post?.title || "My Blog",
      description: post?.summary || "Read this interesting post on My Blog",
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

  const blog = await client.fetch<SanityDocument>(BLOG_QUERY, { slug });

  if (!blog) {
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
                {blog.image && (
                  <Image
                    src={urlFor(blog.image)?.url() || ""}
                    alt={blog.title || "Blog"}
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
                {blog.title && (
                  <div className="inline-block">
                    <span className="px-4 py-1.5 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                      Blog Post
                    </span>
                  </div>
                )}
                <ShareButtons />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
                {blog.title || "Blog"}
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            </div>

            {blog.description && (
              <p className="text-lg lg:text-xl text-zinc-600 leading-relaxed">
                {blog.description}
              </p>
            )}
            {Array.isArray(blog?.body) && blog.body.length > 0 && (
              <div
                className="prose prose-white max-w-none
                prose-headings:font-bold prose-headings:text-zinc-900
                prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-6
                prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-5
                prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4
                prose-p:text-zinc-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-orange-600 hover:prose-a:text-orange-700 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-zinc-900 prose-strong:font-semibold
                prose-ul:my-4 prose-ol:my-4
                prose-li:text-white prose-li:mb-1
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6"
              >
                <PortableText value={blog.body} components={components} />
              </div>
            )}
            <div className="pt-4">
              <Link
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
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

const components = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt: string } }) => {
      const imageUrl = value?.asset ? urlFor(value.asset)?.url() : null;
      if (!imageUrl) return null;
      return (
        <div className="my-8 relative group">
          <div className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 group-hover:shadow-2xl">
            <Image
              priority
              src={imageUrl}
              alt={value.alt || "Team member image"}
              width={1280}
              height={720}
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {value.alt && (
            <p className="mt-3 text-center text-sm text-zinc-500 italic">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
    table: ({
      value,
    }: {
      value: { rows: { cells: string[]; _key: string }[] };
    }) => {
      return (
        <div className="my-8 overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <tbody>
                {value?.rows?.map((row, rowIndex) => (
                  <tr
                    key={row?._key}
                    className={cn(
                      "transition-colors",
                      rowIndex === 0 && "bg-zinc-900 text-white font-semibold",
                      rowIndex !== 0 && rowIndex % 2 === 0 && "bg-white",
                      rowIndex !== 0 && rowIndex % 2 !== 0 && "bg-zinc-50",
                      rowIndex !== 0 && "hover:bg-orange-50/50"
                    )}
                  >
                    {row?.cells?.map((cell: string, index: number) => (
                      <td
                        key={index}
                        className={cn(
                          "border-b border-zinc-200 px-4 py-3 text-left",
                          rowIndex === 0 && "border-b-zinc-700"
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    },
  },
};
