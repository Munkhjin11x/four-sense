'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url';
import { SanityDocument } from 'next-sanity';
import { X } from 'lucide-react';
import { ImagesSlider } from './image-slider';

import { motion, AnimatePresence } from 'framer-motion';

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

export const Ad = ({ ads }: { ads: SanityDocument[] }) => {
  const [show, setShow] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(timeout);
  }, []);

  if (!ads.length) return null;

  const images = ads.map((ad) => urlFor(ad.image)?.url() || '').filter(Boolean);
  const currentAd = ads[currentIdx] as SanityDocument & { link?: string; title?: string };


  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '110%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-2 left-2 z-50 hidden sm:block"
        >
          <div className="relative size-[300px] overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] xl:h-[380px] xl:w-[320px]">
            {/* Close button */}
            <button
              id="ad-banner-button-close"
              onClick={() => setShow(false)}
              className="absolute right-2.5 top-2.5 z-[60] flex size-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-all hover:bg-black/60"
            >
              <X className="size-3.5 text-white" />
            </button>

            <ImagesSlider
              images={images}
              overlay={false}
              className="size-full"
              autoplay={true}
            >
              {(imageIdx: number) => {
                if (imageIdx !== currentIdx) setCurrentIdx(imageIdx);
                return null;
              }}
            </ImagesSlider>

            <div className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 z-50 p-4">
              {currentAd.title && (
                <p className="mb-2.5 line-clamp-2 text-sm font-semibold leading-snug text-white drop-shadow">
                  {currentAd.title}
                </p>
              )}

              {images.length > 1 && (
                <div className="mt-3 flex justify-center gap-1.5">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
