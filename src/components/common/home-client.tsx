"use client";
import {
  EventNewsSection,
  ExploreSection,
  GreenSection,
  Home,
  Loader,
} from "@/components";
import { FooterParallaxHome } from "@/components/common/footer-parallax-home";
import { NavbarHome } from "@/components/common/navbar";
import { ParallaxSection } from "@/components/common/parallax-section";

import useLoading from "@/hook/use-loading";
import { PodcastSection } from "./podcast-section";
import { CompimentsSection } from "./compiments";


const HomePageClient = () => {
  const loading = useLoading(4000);

  return (
    <div className="w-full h-full">
      {loading && <Loader />}
      <NavbarHome />
      <Home />
      {!loading && (
        <>
          <CompimentsSection />
          <EventNewsSection />

          <GreenSection />
          <div>
            <ParallaxSection />
          </div>
          <ExploreSection />
          <PodcastSection />
        </>
      )}
      <FooterParallaxHome />
    </div>
  );
};

export default HomePageClient;
