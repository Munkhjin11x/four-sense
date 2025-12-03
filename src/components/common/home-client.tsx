"use client";
import {
  EventNewsSection,
  ExploreSection,
  GreenSection,
  Home,
  InstagramNewsSection,
  Loader,
} from "@/components";
import { FooterParallaxHome } from "@/components/common/footer-parallax-home";
import { NavbarHome } from "@/components/common/navbar";
import { ParallaxSection } from "@/components/common/parallax-section";

import useLoading from "@/hook/use-loading";

const HomePageClient = () => {
  const loading = useLoading(4000);

  return (
    <div className="w-full h-full">
      {loading && <Loader />}
      <NavbarHome />
      <Home />
      {!loading && (
        <>
          <GreenSection />
          <div>
            <ParallaxSection />
          </div>
          <ExploreSection />
          <EventNewsSection />
          <InstagramNewsSection />
        </>
      )}
      <FooterParallaxHome />
    </div>
  );
};

export default HomePageClient;
