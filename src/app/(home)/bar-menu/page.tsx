import {
  Ability,
  ClassicMenu,
  MenuSection,
  RollsSection,
  ZeroMenu,
  ShimMenu,
  WineMenu,
  MenuImage,
} from "@/components";

const BarMenuPage = () => {
  return (
    <div>
      <Ability />
      <MenuSection />
      <RollsSection />
      <ClassicMenu />
      <ZeroMenu />
      <ShimMenu />
      <WineMenu />
      <MenuImage />
    </div>
  );
};

export default BarMenuPage;
