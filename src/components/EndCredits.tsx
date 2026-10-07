import React, { useState } from 'react';
import { AMonogram } from './AMonogram';
import { getAssetById } from '../data/mediaManifest';
import { SmartImage } from './SmartImage';

export const EndCredits: React.FC = () => {
  const [replayState, setReplayState] = useState<boolean>(false);

  const creditsItems = [
    { role: 'STARRING', name: 'Aarran' },
    { role: 'WITH', name: 'Yamini (Mom)' },
    { role: 'SPECIAL APPEARANCE', name: '🥚 The Lil Eggs' },
    {
      role: 'FEATURING',
      name: 'Childhood Memories • December Birthdays • Movie Nights • Travels • Too Many Memories To Count'
    },
    { role: 'ORIGINAL SOUNDTRACK', name: 'Never Grow Up — Taylor Swift' },
    { role: 'ARCHIVED BY', name: 'Mom ❤️' }
  ];

  const floatingPhotos = [
    getAssetById('day-1')!,
    getAssetById('6.JPG') || getAssetById('big-heart-hero')!,
    getAssetById('turns-5-spiderman')!,
    getAssetById('real-eiffel')!
  ];

  return (
    <section
      id="credits"
      style={{
        position: 'relative',
        paddingTop: '7rem',
        paddingBottom: '8rem',
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden'
      }}
    >
      <div className="streaming-container">
        {/* Credits Container */}
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          {/* Top Logo */}
          <div style={{ marginBottom: '2rem' }}>
            <AMonogram size={56} glow={true} />
            <h2
              style={{
                fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: '#FFF',
                letterSpacing: '0.1em',
                lineHeight: 1,
                marginTop: '0.75rem'
              }}
            >
              AARRAN
            </h2>
            <span
              style={{
                fontSize: '0.8rem',
                color: '#E50914',
                fontWeight: 800,
                letterSpacing: '0.25em',
                textTransform: 'uppercase'
              }}
            >
              A LIFE ORIGINAL
            </span>
          </div>

          {/* Credits Roles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', margin: '3rem 0' }}>
            {creditsItems.map((item, idx) => (
              <div key={idx}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#888888',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '0.35rem',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600
                  }}
                >
                  {item.role}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    lineHeight: 1.4
                  }}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>

          {/* Status Box */}
          <div
            style={{
              marginTop: '4rem',
              padding: '2rem',
              backgroundColor: '#111111',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div
              style={{
                fontSize: '0.85rem',
                color: '#46d369',
                fontWeight: 800,
                letterSpacing: '0.15em',
                marginBottom: '0.5rem'
              }}
            >
              SEASON ONE: CHILDHOOD COMPLETE ✓
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '2rem',
                color: '#FFFFFF',
                letterSpacing: '0.05em'
              }}
            >
              NEXT: TEEN • LOADING...
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.25rem',
                fontStyle: 'italic',
                color: '#B3B3B3',
                marginTop: '1rem'
              }}
            >
              “My purpose in life is him.”
            </p>
            <span style={{ fontSize: '0.85rem', color: '#E50914', fontWeight: 700, letterSpacing: '0.1em' }}>
              — YAMINI 🥚❤️🥚
            </span>
          </div>

          {/* Replay quote trigger */}
          <div style={{ marginTop: '3.5rem' }}>
            {!replayState ? (
              <button
                onClick={() => setReplayState(true)}
                style={{
                  backgroundColor: 'transparent',
                  color: '#888',
                  border: '1px solid #333',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                If life had a replay button...
              </button>
            ) : (
              <div
                style={{
                  backgroundColor: '#000',
                  padding: '2rem',
                  borderRadius: '8px',
                  border: '1px solid #E50914',
                  animation: 'fadeIn 0.6s ease'
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.4rem',
                    fontStyle: 'italic',
                    color: '#FFF',
                    lineHeight: 1.5,
                    marginBottom: '1rem'
                  }}
                >
                  “If life had a replay button… I’d watch these moments again.
                  <br />
                  But luckily… we kept them.”
                </p>
                <div style={{ color: '#E50914', fontWeight: 700, fontSize: '0.9rem' }}>
                  YAMINI × AARRAN
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
