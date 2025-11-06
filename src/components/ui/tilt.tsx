"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const Tilt = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      whileHover={{
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <div className="relative">{children}</div>
    </motion.div>
  );
};
