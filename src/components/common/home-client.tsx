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
import { PodcastSection } from "./podcast-section";
import Image from "next/image";

const HomePageClient = () => {
  const loading = useLoading(4000);

  return (
    <div className="w-full h-full">
      {loading && <Loader />}
      <NavbarHome />
      <Home />
      {!loading && (
        <>
          {/* Fixed Google Review on the right side */}
          <div className="fixed -right-7  w-fit top-1/2 -translate-y-1/2 z-50 hidden lg:block">
            <a
              href="https://www.google.com/search?sca_esv=433c76685208b106&sxsrf=AE3TifMPVBaIjlvz5F4MQXrVGVx93FG1sA:1765162674049&q=FourSenses+Nomad-Ability+Cocktail+Bar+Reviews&sa=X&ved=2ahUKEwihg6Gx_6yRAxW8qFYBHTlLDnIQ0bkNegQIShAE&biw=1792&bih=1270&dpr=2"
              target="_blank"
              rel="noopener noreferrer"
              className="block  w-full transition-transform hover:scale-105"
            >
              <Image
                src="/google-review.png"
                alt="Google Reviews"
                width={120}
                height={120}
                className="drop-shadow-lg bg-white rounded-t-xl p-2 -rotate-90"
              />
            </a>
          </div>

          <GreenSection />
          <div>
            <ParallaxSection />
          </div>
          <ExploreSection />
          <EventNewsSection />
          <InstagramNewsSection />
          <PodcastSection />
        </>
      )}
      <FooterParallaxHome />
    </div>
  );
};

export default HomePageClient;
