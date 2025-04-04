import type { Metadata } from "next";

import "../globals.css";
import { cn } from "@/lib/utils";
import fonts from "@/constants/fonts";
import { Toaster } from "sonner";
import { QueryProvider } from "@/hook/provider";
export const metadata: Metadata = {
  title: "Four Sense",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>{`${metadata.title}`}</title>
        <meta content={`${metadata.description}`} name="description" />
        <meta property="og:type" content={"website"} />
        <meta property="og:site_name" content={"Four Sense"} />
        <meta property="og:description" content={`${metadata.description}`} />
        <meta property="og:title" content={`${metadata.title}`} />
        <meta
          property="og:image"
          content={"https://four-sense.vercel.app/cover.jpg"}
        />
        <meta property="og:url" content="https://four-sense.vercel.app" />
        <meta property="fb:app_id" content="your_fb_app_id_here" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@F2aldi" />
        <meta name="twitter:title" content={`${metadata.title}`} />
        <meta name="twitter:description" content={`${metadata.description}`} />
        <meta
          name="twitter:image"
          content={"https://four-sense.vercel.app/cover.jpg"}
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/logo.png"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body suppressHydrationWarning className={cn(fonts.className, "")}>
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
