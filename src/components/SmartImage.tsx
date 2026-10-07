import React, { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  focalX?: string;
  focalY?: string;
  className?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'video' | 'auto';
  fillCard?: boolean;
  blurBackgroundFallback?: boolean;
  priority?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  focalX = '50%',
  focalY = '50%',
  className = '',
  aspectRatio = 'auto',
  fillCard = true,
  blurBackgroundFallback = true,
  priority = false
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'landscape':
        return 'aspect-[16/9]';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-[16/9]';
      default:
        return '';
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: fillCard ? '100%' : 'auto',
        backgroundColor: '#111111'
      }}
      className={`${getAspectClass()} ${className}`}
    >
      {/* Blurred background duplicate for portrait photos in wide cards */}
      {blurBackgroundFallback && (
        <div
          style={{
            position: 'absolute',
            inset: -15,
            backgroundImage: `url("${src}")`,
            backgroundSize: 'cover',
            backgroundPosition: `${focalX} ${focalY}`,
            filter: 'blur(22px) brightness(0.28)',
            transform: 'scale(1.15)',
            opacity: loaded ? 0.9 : 0,
            transition: 'opacity 0.6s ease'
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Image with focal positioning to protect faces and interactions */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          objectFit: blurBackgroundFallback ? 'contain' : 'cover',
          objectPosition: `${focalX} ${focalY}`,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s ease',
          zIndex: 2
        }}
      />

      {/* Loading Skeleton */}
      {!loaded && !error && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #181818 0%, #252525 50%, #181818 100%)',
            backgroundSize: '200% 100%',
            animation: 'pulseGlow 2s infinite ease-in-out',
            zIndex: 1
          }}
        />
      )}
    </div>
  );
};
