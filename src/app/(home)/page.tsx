'use client'
import {
  ExploreSection,
  GreenSection,
  Loader,
  OrangeSection,
  TeamSection,
  YellowSection,
} from "@/components";
import { Home } from "@/components";
import useLoading from "@/hook/use-loading";

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
    </div>
  );
};

export default HomePage;
