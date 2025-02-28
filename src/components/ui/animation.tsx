"use client";

import { Variants, motion } from "framer-motion";
import { cn } from "@/lib/utils";
export const scrollAnimation: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: ({ duration = 3 } = {}) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration,
    },
  }),
};

export interface AnimationProps extends CommonProps {
  viewPortAmount?: number;
  variants?: Variants;
}

function Animation({
  children,
  className,
  variants = scrollAnimation,
  viewPortAmount = 0.15,
  ...props
}: AnimationProps) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      variants={variants}
      viewport={{ once: true, amount: viewPortAmount }}
      className={cn(className, "w-full")}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default Animation;

import { CSSProperties, ReactNode } from "react";

export interface CommonProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export type WithProps = CommonProps;
