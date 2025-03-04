"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { YellowSection } from "./yellow-section";
import { OrangeSection } from "./orange-section";
import { TeamSection } from "./team-section";

export const ParallaxSection = () => {
  const { scrollYProgress } = useScroll();

  const yellowY = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);
  const orangeY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const teamY = useTransform(scrollYProgress, [0, 10], ["10%", "20%"]);

  return (
    <div id="about" className="relative mt-14 h-full">
      <motion.div
        className="sticky top-0 w-full overflow-hidden"
        style={{ y: yellowY }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <YellowSection />
      </motion.div>
      <motion.div
        className="sticky top-0 w-full overflow-hidden"
        style={{ y: orangeY }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <OrangeSection />
      </motion.div>
      <motion.div
        className="sticky top-0 w-full overflow-hidden"
        style={{ y: teamY }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <TeamSection />
      </motion.div>
    </div>
  );
};
