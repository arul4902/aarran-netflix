import React, { useState } from 'react';
import { getAssetById } from '../data/mediaManifest';
import { useStory } from '../context/StoryContext';
import { SmartImage } from './SmartImage';
import { Cake, Sparkles, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DecemberSpecial: React.FC = () => {
  const { setActiveModalMedia } = useStory();
  const [decemberMode, setDecemberMode] = useState<boolean>(false);
  const [wishModalOpen, setWishModalOpen] = useState<boolean>(false);
  const [candleLit, setCandleLit] = useState<boolean>(true);
  const [wishMade, setWishMade] = useState<boolean>(false);

  const bdayAsset = getAssetById('turns-5-spiderman')!;

  const handleMakeWish = () => {
    setWishModalOpen(true);
    setCandleLit(true);
    setWishMade(false);
  };

  const handleBlowCandle = () => {
    setCandleLit(false);
    setWishMade(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#E50914', '#FFFFFF', '#FF8C00']
    });
  };

  return (
    <section
      id="birthdays"
      style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: decemberMode ? '#0f0507' : '#0e0e0e',
        transition: 'background-color 0.8s ease',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      {/* Subtle Warm Particle Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, rgba(255, 215, 0, 0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      <div className="streaming-container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#FFD700',
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '20px',
              padding: '0.35rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
          >
            <Sparkles size={13} />
            <span>{decemberMode ? 'DECEMBER MODE ACTIVATED ✨' : 'SPECIAL CONNECTION'}</span>
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
            DECEMBER
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.3rem, 2.4vw, 1.8rem)',
              fontStyle: 'italic',
              color: '#E0E0E0',
              lineHeight: 1.4,
              marginBottom: '0.5rem'
            }}
          >
            “Our Birthday Month.”
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
              color: '#999999',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            One month. Two birthdays. Our story.
          </p>
        </div>

        {/* Dual Birthday Visual Cards merging into OUR BIRTHDAY MONTH */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            maxWidth: '920px',
            margin: '0 auto 3.5rem'
          }}
        >
          {/* Card 1: Yamini December */}
          <div
            style={{
              backgroundColor: '#181818',
              borderRadius: '6px',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✨</div>
            <span style={{ fontSize: '0.75rem', color: '#E50914', fontWeight: 700, letterSpacing: '0.15em' }}>
              MOM
            </span>
            <h3 style={{ fontSize: '1.6rem', color: '#FFF', fontWeight: 800, margin: '0.2rem 0' }}>
              YAMINI
            </h3>
            <span style={{ fontSize: '0.9rem', color: '#B3B3B3', fontFamily: 'monospace' }}>
              DECEMBER
            </span>
          </div>

          {/* Card 2: Aarran December */}
          <div
            style={{
              backgroundColor: '#181818',
              borderRadius: '6px',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎂</div>
            <span style={{ fontSize: '0.75rem', color: '#E50914', fontWeight: 700, letterSpacing: '0.15em' }}>
              SON
            </span>
            <h3 style={{ fontSize: '1.6rem', color: '#FFF', fontWeight: 800, margin: '0.2rem 0' }}>
              AARRAN
            </h3>
            <span style={{ fontSize: '0.9rem', color: '#B3B3B3', fontFamily: 'monospace' }}>
              DECEMBER
            </span>
          </div>
        </div>

        {/* Merged Banner: OUR BIRTHDAY MONTH ❤️ */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto 4rem',
            backgroundColor: 'rgba(229, 9, 20, 0.15)',
            border: '1px solid #E50914',
            borderRadius: '6px',
            padding: '1.25rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.2rem', color: '#FFF', fontWeight: 700, letterSpacing: '0.02em' }}>
              OUR BIRTHDAY MONTH ❤️
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#CCC', marginTop: '2px' }}>
              Shared celebrations, double the blessings every winter.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={() => setDecemberMode(!decemberMode)}
              style={{
                backgroundColor: decemberMode ? '#E50914' : 'rgba(255,255,255,0.1)',
                color: '#FFF',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {decemberMode ? '✨ Mode Active' : '✨ Toggle Lights'}
            </button>

            <button
              onClick={handleMakeWish}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1.2rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Cake size={16} />
              <span>MAKE A WISH</span>
            </button>
          </div>
        </div>

        {/* Spider-Man Birthday Photo Spotlight */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            backgroundColor: '#161616',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.85)'
          }}
        >
          <div
            onClick={() => setActiveModalMedia(bdayAsset)}
            style={{ height: '420px', cursor: 'pointer', position: 'relative' }}
          >
            <SmartImage
              src={bdayAsset.file}
              alt={bdayAsset.title}
              focalX={bdayAsset.focalX}
              focalY={bdayAsset.focalY}
              fillCard={true}
              blurBackgroundFallback={true}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 60%)',
                zIndex: 3
              }}
            />
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', zIndex: 5 }}>
              <span style={{ fontSize: '0.72rem', color: '#E50914', fontWeight: 700, letterSpacing: '0.1em' }}>
                DOCUMENTED MOMENT
              </span>
              <h3 style={{ fontSize: '1.3rem', color: '#FFF', fontWeight: 700, marginTop: '2px' }}>
                Aarran Turns 5
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#BBB', marginTop: '2px' }}>
                Blowing out the candles on his 5th Spider-Man birthday cake.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Birthday Wish Modal */}
      {wishModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '2.4rem',
                color: '#FFF',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}
            >
              MAKE A DECEMBER WISH
            </h3>

            {/* Candle Graphic */}
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '2rem 0',
                cursor: candleLit ? 'pointer' : 'default'
              }}
              onClick={candleLit ? handleBlowCandle : undefined}
            >
              {candleLit ? (
                <div style={{ animation: 'pulseGlow 1.5s infinite ease-in-out' }}>
                  <Flame size={48} color="#FFD700" fill="#FF8C00" />
                </div>
              ) : (
                <div style={{ color: '#666', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '8px' }}>
                  💨 (Extinguished)
                </div>
              )}
              {/* Candle Body */}
              <div
                style={{
                  width: '24px',
                  height: '75px',
                  backgroundColor: '#E50914',
                  borderRadius: '3px 3px 0 0',
                  border: '1px solid #FF4444'
                }}
              />
            </div>

            {candleLit ? (
              <div>
                <p style={{ color: '#CCC', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Close your eyes and make a wish for Aarran & Yamini.
                </p>
                <button
                  onClick={handleBlowCandle}
                  style={{
                    backgroundColor: '#E50914',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.75rem 2rem',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  CLICK TO BLOW OUT 🎂
                </button>
              </div>
            ) : (
              <div style={{ animation: 'fadeIn 0.5s ease' }}>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.6rem',
                    fontStyle: 'italic',
                    color: '#FFD700',
                    marginBottom: '1.5rem'
                  }}
                >
                  “Same month. Another year together.”
                </p>
                <button
                  onClick={() => setWishModalOpen(false)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#FFF',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '4px',
                    padding: '0.6rem 1.6rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
