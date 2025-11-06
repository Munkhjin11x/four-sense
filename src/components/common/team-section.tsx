"use client";
import { CDN_URL } from "@/constants/contant";
import Image from "next/image";
import { useEffect, useState } from "react";

import Animation from "../ui/animation";
import { VerifyIcon } from "@/icons/verify-icon";
import Marquee from "react-fast-marquee";
import { SanityDocument } from "next-sanity";
import { client } from "@/lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const STAFF_QUERY = `*[
  _type == "staff"
] | order(name asc){
  _id,
  name,
  photo,
  role,
  summary,
  bio
}`;

export const TeamSection = () => {
  const [staff, setStaff] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/sanity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: STAFF_QUERY }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch staff data");
        }

        const fetchedStaff = (await response.json()) as SanityDocument[];
        setStaff(fetchedStaff);
      } catch (err) {
        console.error("Error fetching posts:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load posts";

        if (errorMessage.includes("403") || errorMessage.includes("Forbidden"))
          setStaff([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div
      id="team"
      className="min-h-[120vh] flex flex-col w-full z-0 xl:bg-cover bg-center bg-no-repeat p-14"
      style={{
        backgroundImage: `url(${CDN_URL + "/images/team-photo-2.webp"})`,
      }}
    >
      <Animation className="flex flex-col flex-1 justify-between w-full  mx-auto">
        <div className="flex relative flex-col max-w-5xl justify-start mx-auto items-center w-full gap-6 md:gap-12 backdrop-blur-sm bg-black/20 rounded-lg p-6 md:p-8">
          <Image
            src={CDN_URL + "/images/team-member-logo.png"}
            alt="Team Logo"
            width={215}
            height={215}
          />
          <p className="text-white text-center max-w-5xl">
            Our expert mixologists craft cocktails that engage four senses of
            sight, sound, smell, and taste, using their fifth sense to create
            truly unique experiences for our guests, which allows us to meet
            your needs in the best way possible.
          </p>
        </div>

        <Marquee pauseOnHover className="flex gap-10  w-full max-w-full py-4">
          {loading ? (
            <TeamMemberCardSkeleton />
          ) : (
            staff.map((member) => (
              <TeamMemberCard key={member._id} data={member} />
            ))
          )}
        </Marquee>
      </Animation>

      {/* {selectedMember && (
        <TeamMemberModal
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          data={selectedMember}
        />
      )} */}
    </div>
  );
};

const TeamMemberCard = ({ data }: { data: SanityDocument }) => {
  const { projectId, dataset } = client.config();

  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;
  return (
    <Link
      href={`/team/${data._id}`}
      className="border backdrop-blur-sm hover:scale-110 transition-all duration-300 mx-2 bg-black/20 flex py-2 items-center px-3 rounded-sm  w-[300px]  gap-2 border-white"
    >
      <div className="relative rounded-full">
        <Image
          src={urlFor(data?.photo)?.url() || ""}
          alt="Team Member"
          width={100}
          height={100}
          className="object-cover  size-10 rounded-full"
        />
      </div>
      <div className="flex flex-col ">
        <div className="flex items-center gap-2">
          <p className="text-white text-lg font-semibold text-nowrap">
            {data.name}
          </p>
          <VerifyIcon color="#E78140" />
        </div>
        <p className="text-[#D0D5DD] text-md">{data.role}</p>
      </div>
    </Link>
  );
};

const TeamMemberCardSkeleton = () => {
  return (
    <div className="flex gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="border backdrop-blur-sm mx-5 bg-black/20 flex py-2 items-center px-3 rounded-sm max-w-[200px] w-full gap-2 border-white animate-pulse"
        >
          <div className="relative rounded-full">
            <Skeleton className="size-10 rounded-full bg-gray-500/40" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24 rounded bg-gray-500/40" />
              <Skeleton className="h-4 w-4 rounded-full bg-gray-500/40" />
            </div>
            <Skeleton className="h-4 w-16 rounded bg-gray-500/40" />
          </div>
        </div>
      ))}
    </div>
  );
};
