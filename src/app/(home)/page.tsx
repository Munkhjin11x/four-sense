import { ExploreSection, GreenSection, Loader, OrangeSection, TeamSection, YellowSection } from "@/components";

import { Home } from "@/components";

const HomePage = () => {
  <Loader />
  return (
    <div className="w-full  h-full ">
      {" "}
      <Home/>
      <GreenSection/>
      <YellowSection/>
      <OrangeSection/>
      <TeamSection/>
      <ExploreSection/>
    </div>
  );
};

export default HomePage;