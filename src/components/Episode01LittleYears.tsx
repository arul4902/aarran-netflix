import React from 'react';
import { getAssetById } from '../data/mediaManifest';
import { SmartImage } from './SmartImage';
import { useStory } from '../context/StoryContext';
import { Film, Calendar, Eye } from 'lucide-react';

export const Episode01LittleYears: React.FC = () => {
  const { setActiveModalMedia } = useStory();

  const littleYearsAssets = [
    getAssetById('day-1')!,
    getAssetById('dino-baby')!,
    getAssetById('two-months')!,
    getAssetById('three-months')!,
    getAssetById('four-months')!,
    getAssetById('sleeping-tie')!,
    getAssetById('blanket-boat')!,
    getAssetById('little-krishna')!,
    getAssetById('little-radha')!,
    getAssetById('football-champion')!
  ].filter(Boolean);

  return (
    <section
      id="childhood"
      style={{
        position: 'relative',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        backgroundColor: '#0d0d0d',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="film-grain" />

      <div className="streaming-container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(229, 9, 20, 0.12)',
              border: '1px solid #E50914',
              borderRadius: '2px',
              padding: '3px 10px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#E50914',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
          >
            <Film size={12} />
            <span>EPISODE 01</span>
          </div>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              lineHeight: 1,
              marginBottom: '0.75rem'
            }}
          >
            THE LITTLE YEARS
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
              fontStyle: 'italic',
              color: '#B3B3B3',
              lineHeight: 1.4
            }}
          >
            “Before the memories became too many to count.”
          </p>
        </div>

        {/* Cinematic Filmstrip Scroller */}
        <div
          className="hide-scrollbar"
          style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            paddingBottom: '1.5rem',
            scrollSnapType: 'x mandatory'
          }}
        >
          {littleYearsAssets.map((asset, index) => (
            <div
              key={asset.id}
              onClick={() => setActiveModalMedia(asset)}
              style={{
                flex: '0 0 clamp(240px, 22vw, 300px)',
                scrollSnapAlign: 'start',
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: '#181818',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = '#E50914';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.85)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image Frame */}
              <div style={{ height: '320px', position: 'relative' }}>
                <SmartImage
                  src={asset.file}
                  alt={asset.title}
                  focalX={asset.focalX}
                  focalY={asset.focalY}
                  fillCard={true}
                  blurBackgroundFallback={true}
                />

                {/* Archive Code Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: '3px 7px',
                    borderRadius: '2px',
                    fontSize: '0.65rem',
                    fontFamily: 'monospace',
                    color: '#AAA',
                    letterSpacing: '0.08em',
                    zIndex: 5
                  }}
                >
                  {asset.archiveCode}
                </div>

                {/* Hover Quick View Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '1rem'
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#E50914',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '2px'
                      }}
                    >
                      {asset.tagline || 'ARCHIVED MEMORY'}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        lineHeight: 1.25,
                        marginBottom: '4px'
                      }}
                    >
                      {asset.title}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#B3B3B3', lineHeight: 1.3 }}>
                      {asset.caption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
