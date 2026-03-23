"use client";
import { CDN_URL } from "@/constants/contant";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

import Animation from "../ui/animation";
import { VerifyIcon } from "@/icons/verify-icon";
import Marquee from "react-fast-marquee";
import { SanityDocument } from "next-sanity";
import { client } from "@/lib/sanity/client";
import imageUrlBuilder, { SanityImageSource } from "@sanity/image-url";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const CAROUSEL_INTERVAL_MS = 5000;

const font = localFont({
  src: "../../fonts/roba/Roba-Regular.otf",
  style: "normal",
  weight: "200",
});

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

const TEAM_PHOTO_QUERY = `*[
  _type == "teamPhoto"
] | order(publishedAt desc){
  _id,
  image,
  publishedAt,
}`;

const DEFAULT_BACKGROUNDS = [
  CDN_URL + "/images/team-photo-2.webp",
  CDN_URL + "/images/team-photo.png",
];

export const TeamSection = () => {
  const [staff, setStaff] = useState<SanityDocument[]>([]);
  const [teamPhotos, setTeamPhotos] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBgIndex, setActiveBgIndex] = useState(0);

  const { projectId, dataset } = client.config();

  const backgroundImages = useMemo(() => {
    if (teamPhotos.length > 0 && projectId && dataset) {
      const builder = imageUrlBuilder({ projectId, dataset });
      return teamPhotos
        .map((p) => builder.image(p?.image as SanityImageSource)?.url())
        .filter((url): url is string => !!url);
    }
    return DEFAULT_BACKGROUNDS;
  }, [teamPhotos, projectId, dataset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [staffRes, photosRes] = await Promise.all([
          fetch("/api/sanity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: STAFF_QUERY }),
          }),
          fetch("/api/sanity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: TEAM_PHOTO_QUERY }),
          }),
        ]);

        if (staffRes.ok) {
          const fetchedStaff = (await staffRes.json()) as SanityDocument[];
          setStaff(fetchedStaff);
        }
        if (photosRes.ok) {
          const fetchedPhotos = (await photosRes.json()) as SanityDocument[];
          setTeamPhotos(fetchedPhotos);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load";
        if (errorMessage.includes("403") || errorMessage.includes("Forbidden")) {
          setStaff([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (backgroundImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveBgIndex((i) => (i + 1) % backgroundImages.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div
      id="team"
      className="min-h-[120vh] flex flex-col w-full z-0 relative overflow-hidden"
    >
      {/* Background carousel */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((url, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 xl:bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
              index === activeBgIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/20 z-[5]" />
      </div>
      <Animation className="relative z-10 flex flex-col flex-1 justify-end w-full mx-auto">
        <div className="">
          <div className="flex relative flex-col max-lg:hidden max-w-5xl justify-start mx-auto items-center w-full gap-2 backdrop-blur-sm bg-black/20 rounded-lg p-4">
            <p
              className={cn('text-white text-center  text-lg',
                font.className
              )}
            >
              Team  Member
            </p>
            <p className="text-white text-center max-w-5xl">
              Our expert mixologists craft cocktails that engage four senses of
              sight, sound, smell, and taste, using their fifth sense to create
              truly unique experiences for our guests, which allows us to meet
              your needs in the best way possible.
            </p>
          </div>
        </div>
        <Marquee pauseOnHover className="flex gap-10  w-full py-4">
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
