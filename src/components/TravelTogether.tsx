import React from 'react';
import { getAssetById } from '../data/mediaManifest';
import { useStory } from '../context/StoryContext';
import { SmartImage } from './SmartImage';
import { Compass, MapPin, Play } from 'lucide-react';

export const TravelTogether: React.FC = () => {
  const { setActiveModalMedia } = useStory();

  const travelItems = [
    {
      asset: getAssetById('dupe-eiffel')!,
      stage: 'CHAPTER 01',
      title: 'The Replica Tower',
      caption: 'Before Paris: standing beside the red replica, imagining distant skies.'
    },
    {
      asset: getAssetById('real-eiffel')!,
      stage: 'CHAPTER 02',
      title: 'The Real Eiffel in Paris',
      caption: 'Dream realized: saluting proudly under the iconic arches of Paris.'
    },
    {
      asset: getAssetById('video-paris-surprise')!,
      stage: 'DOCUMENTED FILM',
      title: 'Paris Surprise Moment',
      caption: 'Pure emotion caught on film as the landmark unfolds before his eyes.'
    },
    {
      asset: getAssetById('video-beach-time')!,
      stage: 'COASTAL MEMORY',
      title: 'Ocean Waves & Sandy Shores',
      caption: 'Splashing in the tide, laughing as the sea breeze rolls in.'
    }
  ];

  return (
    <section
      id="adventures"
      style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#0d0d0d',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
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
            <Compass size={13} />
            <span>OUR ADVENTURES</span>
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
            PLACES WE WENT TOGETHER
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.3rem, 2.4vw, 1.8rem)',
              fontStyle: 'italic',
              color: '#CCCCCC',
              lineHeight: 1.4
            }}
          >
            “Different places. Same favourite company.”
          </p>
        </div>

        {/* Travel Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {travelItems.map((item, idx) => (
            <div
              key={item.asset.id}
              onClick={() => setActiveModalMedia(item.asset)}
              style={{
                backgroundColor: '#161616',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = '#E50914';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.85)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Media Thumbnail */}
              <div style={{ height: '340px', position: 'relative' }}>
                <SmartImage
                  src={item.asset.file}
                  alt={item.title}
                  focalX={item.asset.focalX}
                  focalY={item.asset.focalY}
                  fillCard={true}
                  blurBackgroundFallback={true}
                />

                {/* Video Play Icon overlay if video */}
                {item.asset.type === 'video' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(229, 9, 20, 0.85)',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                      zIndex: 10
                    }}
                  >
                    <Play size={16} fill="#FFF" />
                  </div>
                )}

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                    zIndex: 3
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '14px',
                    right: '14px',
                    zIndex: 5
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: '#E50914',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '3px'
                    }}
                  >
                    {item.stage}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', color: '#FFF', fontWeight: 700, lineHeight: 1.25 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#BBB', marginTop: '4px', lineHeight: 1.35 }}>
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
