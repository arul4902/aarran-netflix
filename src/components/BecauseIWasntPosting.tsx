import React from 'react';
import { MEDIA_ASSETS } from '../data/mediaManifest';
import { useStory } from '../context/StoryContext';
import { SmartImage } from './SmartImage';

export const BecauseIWasntPosting: React.FC = () => {
  const { setActiveModalMedia } = useStory();
  const memoryStrip = MEDIA_ASSETS.slice(4, 14);

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '7rem',
        paddingBottom: '7rem',
        backgroundColor: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container">
        {/* Minimalist Story Arc */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem' }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#808080',
              marginBottom: '1.25rem'
            }}
          >
            THE ARCHIVE PURPOSE
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.8vw, 3rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#B3B3B3',
              lineHeight: 1.35,
              marginBottom: '1rem'
            }}
          >
            “I wasn’t very active on social media then.”
          </h2>

          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4.4vw, 3.6rem)',
              fontStyle: 'italic',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.25,
              marginBottom: '2.5rem'
            }}
          >
            “So many moments never became posts.”
          </h3>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
              color: '#E50914',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            They were still our story. And now they’re all here.
          </p>
        </div>

        {/* Cinematic Floating Strip */}
        <div
          className="hide-scrollbar"
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '1.5rem'
          }}
        >
          {memoryStrip.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalMedia(item)}
              style={{
                flex: '0 0 clamp(180px, 18vw, 240px)',
                height: '240px',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: '#141414',
                position: 'relative',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.borderColor = '#E50914';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <SmartImage
                src={item.file}
                alt={item.title}
                focalX={item.focalX}
                focalY={item.focalY}
                fillCard={true}
                blurBackgroundFallback={true}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 60%)',
                  zIndex: 3
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  right: '8px',
                  zIndex: 5
                }}
              >
                <span style={{ fontSize: '0.62rem', color: '#999', fontFamily: 'monospace' }}>
                  {item.archiveCode}
                </span>
                <div style={{ fontSize: '0.78rem', color: '#FFF', fontWeight: 600 }}>
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
