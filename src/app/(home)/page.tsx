import { genPageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import HomePageClient from "../../components/common/home-client";

export async function generateMetadata(): Promise<Metadata> {
  return genPageMetadata({
    title: "Four Senses",
    description:
      "Four Senses is the first Nomad-Ability bar that combines the traditional Mongolian nomadic culture with modern sustainable development principles.We based on the nomadic way of life and aims to create a new standard of environmentally-friendly and responsible service.",
  });
}

const HomePage = () => {
  return <HomePageClient />;
};

export default HomePage;
