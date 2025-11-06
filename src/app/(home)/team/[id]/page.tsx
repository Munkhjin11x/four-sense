import { client } from "@/lib/sanity/client";
import { PortableText, SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Tilt } from "@/components/ui/tilt";

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const TeamMemberPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let teamMember: SanityDocument | null = null;

  try {
    teamMember = await client.fetch<SanityDocument>(
      `*[_type == "staff" && _id == "${id}"][0]`
    );
  } catch (error) {
    console.error("Error fetching team member:", error);
    notFound();
  }

  if (!teamMember) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br pt-10 from-orange-50/30 via-amber-50/20 to-white">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Tilt>
            <div className="relative">
              <div className="aspect-[7/8] relative overflow-hidden rounded-2xl shadow-2xl">
                {teamMember.photo && (
                  <Image
                    src={urlFor(teamMember.photo)?.url() || ""}
                    alt={teamMember.name || "Team member"}
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
              {teamMember.role && (
                <div className="inline-block">
                  <span className="px-4 py-1.5 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                    {teamMember.role}
                  </span>
                </div>
              )}
              <h1 className="text-4xl lg:text-6xl font-bold text-zinc-900 tracking-tight">
                {teamMember.name || "Team Member"}
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            </div>

            {teamMember.position && (
              <p className="text-lg lg:text-xl text-zinc-600 leading-relaxed">
                {teamMember.position}
              </p>
            )}
            {Array.isArray(teamMember?.body) && teamMember.body.length > 0 && (
              <div className="container mx-auto">
                <div className="max-w-4xl mx-auto">
                  <div>
                    <PortableText
                      value={teamMember.body}
                      components={components}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberPage;
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
