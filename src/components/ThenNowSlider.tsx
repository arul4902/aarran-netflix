import React, { useRef, useState } from 'react';
import { getAssetById } from '../data/mediaManifest';
import { MoveHorizontal } from 'lucide-react';

export const ThenNowSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const isDraggingRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const thenAsset = getAssetById('dino-baby')!; // 1.jpg baby in dino suit
  const nowAsset = getAssetById('real-eiffel')!; // To real Eiffel.jpeg

  const handlePointerDown = () => {
    isDraggingRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#0d0d0d',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#E50914',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            CHAPTER TRANSITION
          </span>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: 'clamp(3rem, 6.5vw, 5rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              lineHeight: 1,
              marginBottom: '0.5rem'
            }}
          >
            THEN → NOW
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              fontStyle: 'italic',
              color: '#B3B3B3'
            }}
          >
            “Different chapters. Same lil egg.” 🥚❤️
          </p>
          <p style={{ color: '#777', fontSize: '0.8rem', marginTop: '4px' }}>
            (Drag the slider to reveal how fast time moves)
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            position: 'relative',
            maxWidth: '840px',
            height: 'clamp(380px, 55vh, 520px)',
            margin: '0 auto',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
            border: '1px solid rgba(255,255,255,0.12)',
            userSelect: 'none',
            touchAction: 'none',
            cursor: 'ew-resize'
          }}
        >
          {/* NOW Image (Background layer) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <img
              src={nowAsset.file}
              alt="Now - Aarran"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: `${nowAsset.focalX} ${nowAsset.focalY}`
              }}
            />
            {/* Label NOW */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(0,0,0,0.75)',
                color: '#FFF',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.1em'
              }}
            >
              NOW
            </div>
          </div>

          {/* THEN Image (Clipped layer) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
            }}
          >
            <img
              src={thenAsset.file}
              alt="Then - Baby Aarran"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: `${thenAsset.focalX} ${thenAsset.focalY}`
              }}
            />
            {/* Label THEN */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(229,9,20,0.85)',
                color: '#FFF',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.1em'
              }}
            >
              THEN
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            onPointerDown={handlePointerDown}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              transform: 'translateX(-50%)',
              width: '4px',
              backgroundColor: '#FFFFFF',
              zIndex: 10,
              boxShadow: '0 0 15px rgba(0,0,0,0.8)',
              cursor: 'ew-resize',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#E50914',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(229,9,20,0.8)',
                border: '2px solid #FFF'
              }}
            >
              <MoveHorizontal size={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
