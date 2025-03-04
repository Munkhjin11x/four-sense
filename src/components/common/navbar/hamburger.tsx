import { Button } from "@/components/ui";
import { HamburgerPropsType } from "./types";
import { HamburgerIcon } from "@/icons/navbar/hamburger-icon";
import { XIcon } from "lucide-react";

export const Hamburger = ({
  toggleHamburger,
  hamburgerOpen,
}: HamburgerPropsType) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="flex justify-center border-[#D9864E] px-2 xl:hidden"
      aria-label="hamburger menu"
      onClick={toggleHamburger}
    >
      {hamburgerOpen && <XIcon />}
      {!hamburgerOpen && <HamburgerIcon />}
    </Button>
  );
};
