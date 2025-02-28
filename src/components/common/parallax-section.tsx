"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { YellowSection } from "./yellow-section";
import { OrangeSection } from "./orange-section";
import { TeamSection } from "./team-section";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export const ParallaxSection = () => {
  const { scrollYProgress } = useScroll();
  const path = usePathname();
  console.log(path);

  const yellowY = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);
  const orangeY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const teamY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const scrollToTeam = () => {
    document.getElementById("team")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (window.location.hash === "#team") {
      scrollToTeam();
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#team") {
        scrollToTeam();
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div id="about" className="relative mt-14 h-full">
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
        id="team"
        className="sticky top-0 w-full overflow-hidden"
        style={{ y: teamY }}
      >
        <TeamSection />
      </motion.div>
    </div>
  );
};
