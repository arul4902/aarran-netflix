import React, { useState } from 'react';
import { getAssetById } from '../data/mediaManifest';
import { useStory } from '../context/StoryContext';
import { SmartImage } from './SmartImage';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

export const MomAndMe: React.FC = () => {
  const { momPov, setActiveModalMedia } = useStory();
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const momAndMeMoments = [
    {
      asset: getAssetById('big-heart-hero')!,
      caption: 'The foundation of everything.',
      note: '“You held my hand before you could take your first step.”'
    },
    {
      asset: getAssetById('kurti-pout')!,
      caption: 'Little traditions, timeless smiles.',
      note: '“Every playful pout made me laugh harder than anyone else.”'
    },
    {
      asset: getAssetById('turns-5-spiderman')!,
      caption: 'Watching him make his 5th December wish.',
      note: '“My wish was always the same: your joy.”'
    },
    {
      asset: getAssetById('real-eiffel')!,
      caption: 'Seeing the world through his wonder.',
      note: '“Standing under Paris skies, remembering when you fit in my arms.”'
    }
  ];

  const current = momAndMeMoments[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % momAndMeMoments.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + momAndMeMoments.length) % momAndMeMoments.length);
  };

  return (
    <section
      id="mom-and-me"
      style={{
        position: 'relative',
        minHeight: '85vh',
        backgroundColor: '#0c0c0c',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Emotional Typography */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#E50914',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              <Heart size={14} fill="#E50914" />
              <span>CHAPTER 02 • MOM & ME</span>
            </div>

            <h2
              style={{
                fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
                fontSize: 'clamp(3rem, 6vw, 5.2rem)',
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                lineHeight: 0.95,
                marginBottom: '1.5rem'
              }}
            >
              MY PURPOSE
              <br />
              IS HIM.
            </h2>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.25rem, 2.2vw, 1.7rem)',
                fontStyle: 'italic',
                color: '#CCCCCC',
                lineHeight: 1.45,
                marginBottom: '1.8rem'
              }}
            >
              “A thousand little memories.
              <br />
              One reason behind all of them.”
            </p>

            {/* Active Moment Note */}
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderLeft: '3px solid #E50914',
                padding: '1rem 1.25rem',
                borderRadius: '0 4px 4px 0',
                marginBottom: '2rem'
              }}
            >
              <p style={{ color: '#E5E5E5', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '0.3rem' }}>
                {current.note}
              </p>
              <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                — {current.caption}
              </span>
            </div>

            {/* Crossfade Selector Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={handlePrev}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#1f1f1f',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E50914')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1f1f1f')}
              >
                <ChevronLeft size={20} />
              </button>

              <div style={{ display: 'flex', gap: '6px' }}>
                {momAndMeMoments.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    style={{
                      width: i === activeIdx ? '28px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: i === activeIdx ? '#E50914' : 'rgba(255,255,255,0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#1f1f1f',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E50914')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1f1f1f')}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Portrait Frame */}
          <div>
            <div
              onClick={() => setActiveModalMedia(current.asset)}
              style={{
                position: 'relative',
                height: 'clamp(400px, 55vh, 560px)',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#181818',
                boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer'
              }}
            >
              <SmartImage
                key={current.asset.id}
                src={current.asset.file}
                alt={current.asset.title}
                focalX={current.asset.focalX}
                focalY={current.asset.focalY}
                fillCard={true}
                blurBackgroundFallback={true}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 60%)',
                  zIndex: 3
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  zIndex: 5
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#E50914', fontWeight: 700, letterSpacing: '0.1em' }}>
                  YAMINI × AARRAN
                </span>
                <h3 style={{ fontSize: '1.25rem', color: '#FFF', fontWeight: 700, marginTop: '2px' }}>
                  {current.asset.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
