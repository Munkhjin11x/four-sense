"use client";

import { useState } from "react";
import { SanityDocument } from "next-sanity";
import { PodcastCard } from "./podcast-section";
import { PodcastModal } from "./podcast-modal";
import { AnnouncementIcon } from "@/icons/announcement-icon";

export function PodcastList({ posts }: { posts: SanityDocument[] }) {
  const [isOpen, setIsOpen] = useState<string>("");

  const handleOpen = (url: string) => () => {
    setIsOpen(url);
  };

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-gray-400 mb-4 w-16 h-16">
          <AnnouncementIcon />
        </div>
        <p className="text-xl text-gray-500">Нийтлэл олдсонгүй</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-6 mb-12">
        {posts.map((post) => (
          <div key={post._id} className="flex justify-center">
            <PodcastCard data={post} handleOpen={handleOpen} />
          </div>
        ))}
      </div>
      <PodcastModal
        isOpen={!!isOpen}
        onClose={() => setIsOpen("")}
        url={isOpen || ""}
      />
    </>
  );
}

