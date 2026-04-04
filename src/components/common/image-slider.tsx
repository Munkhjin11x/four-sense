'use client';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import React, { useEffect, useState } from 'react';

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = 'up'
}: {
  images: string[];
  children?: React.ReactNode | ((imageIdx: number) => React.ReactNode);
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: 'up' | 'down';
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 === images.length ? 0 : prevIndex + 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    if (!images.length) {
      setLoadedImages([]);
      return;
    }

    let cancelled = false;

    const loadPromises = images.map(
      (src) =>
        new Promise<string | null>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => resolve(null);
          img.src = src;
        })
    );

    Promise.all(loadPromises).then((results) => {
      if (cancelled) return;
      const ok = results.filter((u): u is string => u != null);
      setLoadedImages(ok);
    });

    return () => {
      cancelled = true;
    };
  }, [images.join('|')]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    let interval: string | number | NodeJS.Timeout | undefined;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0] as const
      }
    },
    upExit: {
      opacity: 1,
      y: '-150%',
      transition: {
        duration: 1
      }
    },
    downExit: {
      opacity: 1,
      y: '150%',
      transition: {
        duration: 1
      }
    }
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn('relative flex h-full w-full items-center justify-center overflow-hidden', className)}
      style={{
        perspective: '1000px'
      }}
    >
      {areImagesLoaded && (typeof children === 'function' ? children(currentIndex) : children)}
      {areImagesLoaded && overlay && <div className={cn('absolute inset-0 z-40 bg-black/60', overlayClassName)} />}

      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            alt="background"
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === 'up' ? 'upExit' : 'downExit'}
            variants={slideVariants}
            className="image absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
      )}
    </div>
  );
};
