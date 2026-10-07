import React, { useState } from 'react';
import { MEDIA_ASSETS } from '../data/mediaManifest';
import { Camera, Sparkles, RefreshCw } from 'lucide-react';

export const DigitalPolaroid: React.FC = () => {
  const photos = MEDIA_ASSETS.filter((a) => a.type === 'image');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isDeveloped, setIsDeveloped] = useState<boolean>(false);
  const [isDeveloping, setIsDeveloping] = useState<boolean>(false);

  const currentPhoto = photos[currentIdx] || photos[0];

  const handleDevelop = () => {
    if (isDeveloped || isDeveloping) return;
    setIsDeveloping(true);
    setTimeout(() => {
      setIsDeveloping(false);
      setIsDeveloped(true);
    }, 1800);
  };

  const handleNextPhoto = () => {
    setIsDeveloped(false);
    setIsDeveloping(false);
    const nextIdx = Math.floor(Math.random() * photos.length);
    setCurrentIdx(nextIdx);
  };

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#0c0c0c',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#E50914',
              backgroundColor: 'rgba(229, 9, 20, 0.1)',
              border: '1px solid rgba(229, 9, 20, 0.3)',
              borderRadius: '20px',
              padding: '0.35rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
          >
            <Camera size={13} />
            <span>INSTANT MEMORY</span>
          </div>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: 'clamp(3rem, 6.5vw, 5rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              lineHeight: 1,
              marginBottom: '0.75rem'
            }}
          >
            DEVELOP A MEMORY
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              fontStyle: 'italic',
              color: '#B3B3B3'
            }}
          >
            “Tap the film frame to bring the colors back to life.”
          </p>
        </div>

        {/* Polaroid Physical Frame */}
        <div
          onClick={handleDevelop}
          style={{
            maxWidth: '360px',
            margin: '0 auto 2.5rem',
            backgroundColor: '#FAFAFA',
            padding: '16px 16px 36px 16px',
            borderRadius: '4px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 10px rgba(255,255,255,0.1)',
            cursor: !isDeveloped ? 'pointer' : 'default',
            transform: 'rotate(-1.5deg)',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(-1.5deg) scale(1)')}
        >
          {/* Photo Slot */}
          <div
            style={{
              width: '100%',
              height: '380px',
              backgroundColor: '#111',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <img
              src={currentPhoto.file}
              alt={currentPhoto.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: `${currentPhoto.focalX} ${currentPhoto.focalY}`,
                filter: isDeveloped
                  ? 'none'
                  : isDeveloping
                  ? 'contrast(0.7) brightness(0.7) blur(4px) grayscale(0.5)'
                  : 'contrast(0.2) brightness(0.15) blur(16px) grayscale(1)',
                opacity: isDeveloped ? 1 : isDeveloping ? 0.7 : 0.35,
                transition: 'filter 1.8s ease, opacity 1.8s ease'
              }}
            />

            {!isDeveloped && !isDeveloping && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  textAlign: 'center',
                  padding: '1rem'
                }}
              >
                <Camera size={32} style={{ marginBottom: '8px', opacity: 0.6 }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>TAP TO DEVELOP</span>
              </div>
            )}

            {isDeveloping && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E50914',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em'
                }}
              >
                DEVELOPING...
              </div>
            )}
          </div>

          {/* Polaroid Caption bottom */}
          <div style={{ marginTop: '14px', textAlign: 'center' }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.15rem',
                fontStyle: 'italic',
                color: '#1a1a1a',
                fontWeight: 700
              }}
            >
              {isDeveloped ? currentPhoto.title : 'Yamini × Aarran Archive'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ textAlign: 'center' }}>
          {isDeveloped && (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              <div style={{ color: '#46d369', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem' }}>
                MEMORY DEVELOPED ✓
              </div>
              <button
                onClick={handleNextPhoto}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#E50914',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.65rem 1.6rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={14} />
                <span>DEVELOP ANOTHER MEMORY</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
