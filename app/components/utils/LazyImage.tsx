'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '../../lib/utils';

interface LazyImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  showLoadingAnimation?: boolean;
  aspectRatio?: string;
  containerClassName?: string;
}

/**
 * LazyImage component
 * Enhances Next.js Image with loading states and animations
 */
const LazyImage = ({
  src,
  alt,
  width,
  height,
  className,
  showLoadingAnimation = true,
  aspectRatio,
  containerClassName,
  ...props
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    // Set up intersection observer to detect when image is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    const element = document.getElementById(`lazy-img-${alt?.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [alt]);

  // Only set the image source when it's in view
  useEffect(() => {
    if (isInView && typeof src === 'string') {
      setImgSrc(src);
    }
  }, [isInView, src]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div 
      id={`lazy-img-${alt?.replace(/\s+/g, '-').toLowerCase()}`}
      className={cn(
        'relative overflow-hidden',
        aspectRatio || 'aspect-4/3',
        containerClassName
      )}
    >
      {/* Placeholder/Skeleton */}
      {isLoading && showLoadingAnimation && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Actual Image */}
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'transition-opacity duration-500',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          onLoad={handleImageLoad}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
