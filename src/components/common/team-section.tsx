"use client";
import { CDN_URL } from "@/constants/contant";
import {
  HelpIcon,
  HomeIcon,
  LeafIcon,
  RounderIcon,
  TriangleIcon,
  WavyIcon,
} from "@/icons";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TeamMemberModal } from "./team-member-modal";

const icons = [
  {
    icon: <WavyIcon />,
    x: "12%",
    y: "70%",
    name: " Mixologist: BOLD AMGALAN",
    image: "/images/team/3.jpg",
    description:
      "Bold is a talented mixologist at Four Senses Nomad-Ability Bar, known for his exceptional skills in balancing and creating unique flavors in every cocktail he crafts. With a sharp eye for detail and a deep understanding of ingredients, Bold consistently pushes the boundaries of mixology, designing innovative cocktails that surprise and delight guests. His vibe? Sarcastic, witty, and always keeping things interesting. Bold’s dry humor and quick comebacks add an unmistakable edge to his personality, but it’s his therapeutic approach to customer interaction that really stands out. Many describe him as a “mixology therapist,” someone who listens, makes you laugh, and always knows how to offer the perfect drink for whatever mood you’re in.",
  },
  {
    icon: <HomeIcon color="#D9864E" />,
    x: "26%",
    y: "70%",
    name: "Mixologist: SERJEE SHINEBAYAR",
    image: "/images/team/2.jpg",
    description:
      "Serjee is a talented young mixologist at Four Senses Nomad-Ability Bar, known for her incredible skill in crafting drinks that are as beautiful as they are flavorful. With a natural flair for both mixology and customer service, Serjee brings professionalism and passion to every cocktail she creates. Her vibe is undeniably spicy, adding a bold, confident energy to the bar that makes her stand out. This unique charm has earned her a reputation as one of the most exciting figures in Mongolia’s bar industry. Whether she's behind the bar or interacting with customers, Serjee’s combination of skill, confidence, and personality makes her a true star of the Mongolian bar scene.",
  },
  {
    icon: <TriangleIcon />,
    x: "42%",
    y: "70%",
    name: "Mixologist: ZORIGOO TUMENJARGAL",
    image: "/images/team/1.jpg",
    description:
      "Zorigoo is a talented mixologist at Four Senses Nomad-Ability Bar, known for his mastery of modern mixology and innovative cocktail creations. With a refined, minimalistic style, Zorigoo combines simplicity with precision, crafting drinks that not only taste amazing but also evoke a vibe before the first sip. His clever approach to mixology makes each cocktail a work of art, and his ability to engage with guests in a thoughtful, genuine way only enhances the experience. A true listener, Zorigoo’s attention to detail extends beyond just mixing ingredients – it’s about understanding the mood and creating the perfect drink to match. ",
  },
  {
    icon: <RounderIcon />,
    x: "57%",
    y: "70%",
    name: "Founder - Leader: ZAYA GANBAT",
    image: "/images/team/5.jpg",
    description:
      "Zaya is the founder and visionary leader of Four Senses Nomad-Ability Bar, a groundbreaking establishment in Mongolia that blends nomadic culture with sustainable, innovative practices in the bar industry. With years of experience as a skilled bartender and mixologist, Zaya is recognized not only for his craft but for his exceptional leadership within the Mongolian bar scene. Zaya’s expertise in creating memorable, culturally-rich drinking experiences is matched by his commitment to elevating the industry. He has transformed the bar culture in Mongolia, fostering a new wave of responsible and modern consumption while honoring the nation's cultural heritage and environmental sustainability. His leadership goes beyond just mixing drinks; he’s a true pioneer who inspires and guides others in the industry, ensuring that Four Senses remains a hub for creativity, passion, and excellence.",
  },
  {
    icon: <LeafIcon />,
    x: "72%",
    y: "70%",
    name: "Mixologist: NOMI DOV ",
    image: "/images/team/4.jpg",
    description:
      "Nomi is a rising star in the mixology world and a two-time Mongolian Champion in the prestigious Flor de Cana Challenge. Known for her passion for crafting innovative cocktails, Nomi is always seeking new ways to develop her skills and push the boundaries of what’s possible behind the bar. Her dedication to her craft is matched by her exceptional service and genuine love for making people smile. Nomi’s warm, welcoming nature and radiant smile create an inviting atmosphere for customers, ensuring that every visit is a memorable one. Whether she's mixing a new creation or perfecting a classic, her cocktails always leave a lasting impression – just like her personality.",
  },
  {
    icon: <HelpIcon />,
    x: "85%",
    y: "70%",
    name: "Head Mixologist: BOBBY PUREVDORJ ",
    image: "/images/team/6.jpg",
    description:
      "Bobby is the Head Mixologist at Four Senses Nomad-Ability Bar, where he brings a wealth of experience and expertise in mixology and the bar industry. With years of dedication to his craft, Bobby is renowned for his exceptional bartending skills and his ability to create memorable, innovative cocktails that delight guests every time. What truly sets Bobby apart is his outstanding communication skills and the fun, caring vibe he brings to every interaction. His ability to connect with customers and make them feel welcome has made him one of the most beloved figures in the Mongolian bar scene. With his warm personality and top-tier service, Bobby creates an atmosphere where both his team and customers feel valued and energized.",
  },
];

export const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState<{
    name: string;
    image: string;
    description: string;
  } | null>(null);

  const handleModal = useCallback((data: typeof selectedMember) => {
    setSelectedMember(data);
  }, []);

  return (
    <div
      id="team"
      className="h-screen relative flex w-full z-0 justify-center bg-cover p-14"
      style={{ backgroundImage: "url(/images/team-photo.png)" }}
    >
      <div className="flex flex-col justify-start items-center w-full gap-6 md:gap-12">
        <Image
          src={CDN_URL + "/images/team-member-logo.png"}
          alt="Team Logo"
          width={215}
          height={215}
        />
        <p className="text-white text-center max-w-3xl">
          Our expert mixologists craft cocktails that engage four senses of
          sight, sound, smell, and taste, using their fifth sense to create
          truly unique experiences for our guests, which allows us to meet your
          needs in the best way possible.
        </p>
      </div>
      {icons.map((item, index) => (
        <div
          key={index}
          onClick={() => handleModal(item)}
          className="absolute bg-white p-1 rounded-md border-4 border-[#3C9660] cursor-pointer"
          style={{ left: item.x, top: item.y }}
        >
          {item.icon}
        </div>
      ))}
      {selectedMember && (
        <TeamMemberModal
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          data={selectedMember}
        />
      )}
    </div>
  );
};
