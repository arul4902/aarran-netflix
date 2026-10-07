import React, { useState } from 'react';
import { getAssetById } from '../data/mediaManifest';
import { useStory } from '../context/StoryContext';
import { SmartImage } from './SmartImage';
import confetti from 'canvas-confetti';

export const LilEggs: React.FC = () => {
  const { setActiveModalMedia } = useStory();
  const [eggCracked, setEggCracked] = useState<boolean>(false);
  const [eggAnimationClass, setEggAnimationClass] = useState<string>('');

  const funnyAssets = [
    getAssetById('mischief-mustache')!,
    getAssetById('lion-smile')!,
    getAssetById('feet-in-air')!,
    getAssetById('toddler-meltdown')!
  ].filter(Boolean);

  const handleCrackEgg = (e: React.MouseEvent) => {
    setEggAnimationClass('animate-shake');
    setTimeout(() => {
      setEggCracked(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#E50914', '#FFD700', '#FFFFFF', '#FFA07A']
      });
    }, 400);
  };

  return (
    <section
      id="lil-eggs"
      style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#121212',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container">
        {/* Animated Rolling Eggs Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              fontSize: '2.4rem',
              marginBottom: '1rem'
            }}
          >
            <span className="animate-egg-roll" style={{ display: 'inline-block' }}>
              🥚
            </span>
            <span style={{ color: '#E50914', fontSize: '1.6rem' }}>❤️</span>
            <span style={{ display: 'inline-block' }}>🥚</span>
          </div>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              lineHeight: 1,
              marginBottom: '1rem'
            }}
          >
            LIL EGGS
          </h2>

          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              fontStyle: 'italic',
              color: '#CCCCCC',
              lineHeight: 1.5,
              marginBottom: '2rem'
            }}
          >
            <p>“I used to call him my lil egg…”</p>
            <p>“Then he started calling me the same.”</p>
            <p style={{ color: '#FFFFFF', fontWeight: 600, marginTop: '0.5rem' }}>
              “Now we’re each other’s lil eggs.” 🥚❤️🥚
            </p>
          </div>

          {/* Interactive Feature: Crack the Egg */}
          <div style={{ margin: '1.5rem 0' }}>
            {!eggCracked ? (
              <button
                onClick={handleCrackEgg}
                className={eggAnimationClass}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1.8rem',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  borderRadius: '24px',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#E50914';
                  e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <span>CRACK THE EGG</span>
                <span style={{ fontSize: '1.2rem' }}>🥚</span>
              </button>
            ) : (
              <div
                style={{
                  display: 'inline-block',
                  padding: '0.8rem 2rem',
                  backgroundColor: 'rgba(229, 9, 20, 0.2)',
                  border: '1px solid #E50914',
                  borderRadius: '24px',
                  animation: 'fadeIn 0.4s ease'
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.3rem',
                    fontStyle: 'italic',
                    color: '#FFF',
                    fontWeight: 600
                  }}
                >
                  Mom ❤️ Aarran: “Each other’s lil eggs forever.”
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Playful & Candid Photo Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {funnyAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setActiveModalMedia(asset)}
              style={{
                height: '280px',
                position: 'relative',
                borderRadius: '6px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#1b1b1b',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.borderColor = '#E50914';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <SmartImage
                src={asset.file}
                alt={asset.title}
                focalX={asset.focalX}
                focalY={asset.focalY}
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
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  zIndex: 5
                }}
              >
                <div style={{ fontSize: '0.68rem', color: '#E50914', fontWeight: 700, letterSpacing: '0.08em' }}>
                  {asset.tagline}
                </div>
                <div style={{ fontSize: '0.92rem', color: '#FFF', fontWeight: 600 }}>
                  {asset.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px) rotate(-4deg); }
          40%, 80% { transform: translateX(6px) rotate(4deg); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </section>
  );
};
