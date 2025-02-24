'use client'
import {
  ExploreSection,
  GreenSection,
  InstagramNewsSection,
  Loader,
  OrangeSection,
  TeamSection,
  YellowSection,
} from "@/components";

import useLoading from "@/hook/use-loading";
import dynamic from "next/dynamic";

const Home = dynamic(
  () => import('@/components/common/home').then((mod) => mod.Home),
  { ssr: false }
);
const HomePage = () => {
  const loading = useLoading(4000);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full">
      <Home />
      <GreenSection />
      <YellowSection />
      <OrangeSection />
      <TeamSection />
      <ExploreSection />
      <InstagramNewsSection/>
    </div>
  );
};

export default HomePage;
