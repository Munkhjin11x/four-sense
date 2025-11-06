"use client";
import { useState, useEffect } from "react";

export const useLoadingHome = (delay: number = 0) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
};
