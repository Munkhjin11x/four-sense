"use client";
import {
  ExploreSection,
  GreenSection,
  Home,
  InstagramNewsSection,
  Loader,
} from "@/components";
import { ParallaxSection } from "@/components/common/parallax-section";

import useLoading from "@/hook/use-loading";

const HomePage = () => {
  const loading = useLoading(4000);

  return (
    <div className="w-full h-full">
      {loading && <Loader />}
      <Home />
      {!loading && (
        <>
          <GreenSection />
          <div>
            <ParallaxSection />
          </div>
          <ExploreSection />
          <InstagramNewsSection />
        </>
      )}
    </div>
  );
};

export default HomePage;
