"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { FooterVideo } from "./footer";
import { FooterSection } from "./footer-section";
import useLoading from "@/hook/use-loading";
export const FooterParallax = () => {
  const { scrollYProgress } = useScroll();
  const loading = useLoading(4000);

  const footerY = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);
  if (loading) {
    return null;
  }
  return (
    <div className="relative mt-14 h-full">
      <motion.div
        className="sticky top-0 w-full overflow-hidden"
        style={{ y: footerY }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <FooterSection />
      </motion.div>

      <motion.div
        className="sticky top-0 w-full overflow-hidden"
        style={{ y: footerY }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <FooterVideo />
      </motion.div>
    </div>
  );
  return <div>Footer</div>;
};
