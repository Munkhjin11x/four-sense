"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { YellowSection } from "./yellow-section";
import { OrangeSection } from "./orange-section";
import { TeamSection } from "./team-section";

export const ParallaxSection = () => {
  const { scrollYProgress } = useScroll();

  const yellowY = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);
  const orangeY = useTransform(scrollYProgress, [0, 1], ["-15%", "25%"]);
  const teamY = useTransform(scrollYProgress, [0, 1], ["-20%", "35%"]);

  return (
    <div className="relative mt-14 h-full">
      <motion.div
        className="sticky top-0 w-full overflow-hidden"
        style={{ y: yellowY }}
      >
        <YellowSection />
      </motion.div>
      <motion.div
        className="sticky top-0 w-full overflow-hidden"
        style={{ y: orangeY }}
      >
        <OrangeSection />
      </motion.div>
      <motion.div
        className="sticky top-0 w-full overflow-hidden"
        style={{ y: teamY }}
      >
        <TeamSection />
      </motion.div>
    </div>
  );
};
