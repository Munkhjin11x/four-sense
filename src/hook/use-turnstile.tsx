import { useCallback } from "react";
import Turnstile from "react-turnstile";
import { create } from "zustand";
import { cn } from "@/lib/utils";

export const useTurnstileStore = create<{
  token: string;
  setToken: (token: string) => void;
}>((set) => ({
  token: "",
  setToken: (token) => set({ token }),
}));

export const UseTurnstile = ({ className }: { className?: string }) => {
  const { setToken } = useTurnstileStore();

  const handleTokenUpdate = useCallback(
    (token: string) => {
      setToken(token);
    },
    [setToken]
  );

  return (
    <Turnstile
      sitekey="0x4AAAAAAB4B7J8B5z06f06B"
      className={cn("!w-full rounded-md", className)}
      size="flexible"
      theme="light"
      onVerify={handleTokenUpdate}
    />
  );
};
