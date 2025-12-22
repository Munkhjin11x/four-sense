"use client";
import { Modal } from "./modal";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface PodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const PodcastModal = ({ isOpen, onClose, url }: PodcastModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Modal
      title="Podcast"
      isOpen={isOpen}
      onClose={onClose}
      className="sm:max-w-5xl"
      containerClassname="p-6"
    >
      {url && (
        <div className="space-y-4">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#E78140] to-[#D9864E]/90 backdrop-blur-sm">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-white/20" />
                  <Loader2 className="h-16 w-16 text-white animate-spin" />
                </div>
                <p className="mt-4 text-white font-medium text-lg animate-pulse">
                  Loading podcast...
                </p>
              </div>
            )}

            {/* Video Player */}
            {url.includes("youtube.com") || url.includes("youtu.be") ? (
              <iframe
                src={
                  url.includes("youtube.com")
                    ? url.replace("watch?v=", "embed/")
                    : url.replace("youtu.be/", "youtube.com/embed/")
                }
                title="Podcast"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleLoad}
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <video
                src={url}
                controls
                onLoadedData={handleLoad}
                className="absolute inset-0 w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
