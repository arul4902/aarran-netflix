import React, { useEffect, useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { SmartImage } from './SmartImage';

interface PressPlayExperienceProps {
  onComplete: () => void;
}

export const PressPlayExperience: React.FC<PressPlayExperienceProps> = ({ onComplete }) => {
  const { startAudio } = useAudio();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);

  const montageSlides = [
    {
      img: '/assets/Day 1.jpg',
      quote: '“Once upon a time…”',
      sub: 'December 2016',
      focalX: '50%',
      focalY: '35%'
    },
    {
      img: '/assets/1.jpg',
      quote: '“…he was this little.”',
      sub: 'Tiny feet, giant love',
      focalX: '50%',
      focalY: '38%'
    },
    {
      img: '/assets/6.JPG',
      quote: '“And somehow…”',
      sub: 'Every heartbeat was for him',
      focalX: '50%',
      focalY: '38%'
    },
    {
      img: '/assets/To real Eiffel.jpeg',
      quote: '“…time pressed fast-forward.”',
      sub: 'Growing into the world',
      focalX: '50%',
      focalY: '45%'
    },
    {
      img: '/assets/Kurti.JPG',
      quote: '“Somewhere between raising him…”',
      sub: '“…he became my whole world.”',
      focalX: '50%',
      focalY: '30%'
    }
  ];

  const handlePressPlay = () => {
    setHasStarted(true);
    startAudio();
  };

  useEffect(() => {
    if (!hasStarted) return;

    // Montage timer progression
    const timers = [
      setTimeout(() => setStage(1), 1600),
      setTimeout(() => setStage(2), 3200),
      setTimeout(() => setStage(3), 4800),
      setTimeout(() => setStage(4), 6400),
      setTimeout(() => {
        onComplete();
      }, 8200)
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [hasStarted, onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 8500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {!hasStarted ? (
        /* Prompt Screen: READY TO WATCH HIM GROW? */
        <div
          style={{
            textAlign: 'center',
            padding: '2.5rem',
            maxWidth: '680px',
            animation: 'fadeIn 0.8s ease'
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#E50914',
              fontWeight: 700,
              marginBottom: '1rem'
            }}
          >
            A LIFE ORIGINAL
          </div>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: 'clamp(2.4rem, 6vw, 4.6rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              lineHeight: 1.08,
              marginBottom: '1.25rem'
            }}
          >
            READY TO WATCH HIM GROW?
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              fontStyle: 'italic',
              color: '#B3B3B3',
              marginBottom: '3rem',
              lineHeight: 1.4
            }}
          >
            “A mother’s archive of the moments that shaped her universe.”
          </p>

          <button
            onClick={handlePressPlay}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.85rem',
              padding: '1rem 2.8rem',
              backgroundColor: '#E50914',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(229, 9, 20, 0.45)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FF1A24';
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(229, 9, 20, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#E50914';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(229, 9, 20, 0.45)';
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>▶</span>
            <span>PRESS PLAY</span>
          </button>

          <div style={{ marginTop: '2.5rem' }}>
            <button
              onClick={onComplete}
              style={{
                background: 'none',
                border: 'none',
                color: '#666666',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                textDecoration: 'underline'
              }}
            >
              Skip montage directly to home
            </button>
          </div>
        </div>
      ) : (
        /* Cinematic Opening Montage */
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {montageSlides.map((slide, idx) => {
            if (idx !== stage) return null;
            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  inset: 0,
                  animation: 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Full-bleed background with smooth slow zoom */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    animation: 'zoomInSlow 2s ease-out forwards'
                  }}
                >
                  <SmartImage
                    src={slide.img}
                    alt="Childhood memory"
                    focalX={slide.focalX}
                    focalY={slide.focalY}
                    fillCard={true}
                    blurBackgroundFallback={true}
                    priority={true}
                  />
                </div>

                {/* Cinematic Vignette Overlays */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 90%)',
                    zIndex: 3
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, transparent 60%)',
                    zIndex: 3
                  }}
                />

                {/* Centered Emotional Typography */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90%',
                    maxWidth: '850px',
                    textAlign: 'center',
                    zIndex: 5
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      lineHeight: 1.25,
                      textShadow: '0 4px 30px rgba(0,0,0,0.95)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {slide.quote}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
                      color: '#E50914',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {slide.sub}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Skip Montage in corner */}
          <button
            onClick={onComplete}
            style={{
              position: 'absolute',
              top: '2.5rem',
              right: '2.5rem',
              zIndex: 10,
              padding: '0.5rem 1.2rem',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: '#AAAAAA',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '4px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            SKIP MONTAGE
          </button>
        </div>
      )}

      <style>{`
        @keyframes zoomInSlow {
          0% { transform: scale(1); }
          100% { transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
};
