"use client";
import {
  ExploreSection,
  FooterSection,
  GreenSection,
  Home,
  InstagramNewsSection,
  Loader,
} from "@/components";
import { ParallaxSection } from "@/components/common/parallax-section";

import useLoading from "@/hook/use-loading";
// import dynamic from "next/dynamic";

// const Home = dynamic(
//   () => import("@/components/common/home").then((mod) => mod.Home),
//   { ssr: false }
// );
const HomePage = () => {
  const loading = useLoading(4000);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full">
      <Home />
      <GreenSection />
      <div>
        <ParallaxSection />
      </div>
      <ExploreSection />
      <InstagramNewsSection />
      <FooterSection />
    </div>
  );
};

export default HomePage;
