'use client'
import { motion, useTransform, useScroll } from "framer-motion";
import { GreenSection } from "./green-section";
import { YellowSection } from "./yellow-section";
import { OrangeSection } from "./orange-section";
import { TeamSection } from "./team-section";
import { useEffect } from "react";

export const ParallaxSection = () => {
  const { scrollYProgress } = useScroll();

  const greenY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const yellowY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const orangeY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const teamY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      console.log(latest); 
    });
    return () => unsubscribe();
  }, [scrollYProgress]);
  return (
    <div className="relative" style={{ height: "200vh" }}>
      <motion.div style={{ y: greenY }}>
        <GreenSection  />
      </motion.div>
      <motion.div style={{ y: yellowY }}>
        <YellowSection  />
      </motion.div>
      <motion.div style={{ y: orangeY }}>
        <OrangeSection  />
      </motion.div>
      <motion.div style={{ y: teamY }}>
        <TeamSection  />
      </motion.div>
    </div>
  );
};