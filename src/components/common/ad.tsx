'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url';
import { SanityDocument } from 'next-sanity';
import Link from 'next/link';
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
    const timeout = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (!ads.length) return null;

  const images = ads.map((ad) => urlFor(ad.image)?.url() || '').filter(Boolean);
  const currentAd = ads[currentIdx] as SanityDocument & { link?: string; title?: string };


  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="ad-banner"
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '110%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-0 left-0 z-50"
        >
          <div className="relative size-[300px] overflow-hidden rounded-t-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] xl:h-[380px] xl:w-[380px]">
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

            <div className="absolute -bottom-2 left-0 right-0 z-50 flex flex-col gap-3 p-4 items-center">
              {currentAd.title && (
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-white drop-shadow">
                  {currentAd.title}
                </p>
              )}

              {images.length > 1 && (
                <div className="flex justify-center gap-1.5">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                        }`}
                    />
                  ))}
                </div>
              )}

              <Link
                href="/bar-menu"
                className="pointer-events-auto w-full max-w-32 rounded-tl-3xl text-[#E36C2C] bg-white py-2.5 text-center text-sm font-semibold  shadow-md transition hover:bg-white/95"
              >
                Read More
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
