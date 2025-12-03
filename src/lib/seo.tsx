import { Metadata } from "next";

import { siteMetadata } from "@/lib/siteMetadata";
import { getPathname } from "./actions";

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
}

export async function genPageMetadata({
  title,
  description,
}: PageSEOProps): Promise<Metadata> {
  const pathname = await getPathname();
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: "./",
      siteName: title,
      images: [
        {
          url: siteMetadata.socialBanner,
          width: 600,
          height: 630,
          alt: `${title} social preview`,
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}${pathname}`,
      types: {
        "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
