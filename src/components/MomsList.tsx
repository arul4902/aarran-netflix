import React from 'react';
import { useStory } from '../context/StoryContext';
import { getAssetById } from '../data/mediaManifest';
import { SmartImage } from './SmartImage';
import { Heart, Trash2, Play } from 'lucide-react';

export const MomsList: React.FC = () => {
  const { favourites, toggleFavourite, setActiveModalMedia } = useStory();

  const favAssets = favourites.map((id) => getAssetById(id)).filter(Boolean);

  return (
    <section
      id="moms-list"
      style={{
        position: 'relative',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        backgroundColor: '#0f0f0f',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#E50914',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem'
              }}
            >
              <Heart size={12} fill="#E50914" />
              <span>SAVED BY MOM</span>
            </div>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                fontWeight: 700,
                color: '#FFFFFF'
              }}
            >
              My List ❤️
            </h2>
          </div>

          <span style={{ color: '#888', fontSize: '0.85rem' }}>
            {favAssets.length} Saved {favAssets.length === 1 ? 'Memory' : 'Memories'}
          </span>
        </div>

        {/* Empty State */}
        {favAssets.length === 0 ? (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              backgroundColor: '#161616',
              borderRadius: '6px',
              border: '1px dashed rgba(255,255,255,0.1)'
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: '#BBB'
              }}
            >
              “Mom could never choose just one anyway.”
            </p>
            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Tap the ❤️ icon on any photo or video card to build Mom’s personalized collection.
            </p>
          </div>
        ) : (
          /* Horizontal Favorites Shelf */
          <div
            className="hide-scrollbar"
            style={{
              display: 'flex',
              gap: '14px',
              overflowX: 'auto',
              paddingBottom: '1rem'
            }}
          >
            {favAssets.map((asset) => (
              <div
                key={asset!.id}
                onClick={() => setActiveModalMedia(asset!)}
                style={{
                  flex: '0 0 clamp(200px, 20vw, 260px)',
                  height: '180px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#1c1c1c',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.25s ease'
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
                  src={asset!.file}
                  alt={asset!.title}
                  focalX={asset!.focalX}
                  focalY={asset!.focalY}
                  fillCard={true}
                  blurBackgroundFallback={true}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.88) 0%, transparent 60%)',
                    zIndex: 3
                  }}
                />

                {/* Remove from list button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourite(asset!.id);
                  }}
                  title="Remove from My List"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(0,0,0,0.65)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    color: '#E50914',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                >
                  <Trash2 size={13} />
                </button>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '10px',
                    right: '10px',
                    zIndex: 5
                  }}
                >
                  <div style={{ fontSize: '0.85rem', color: '#FFF', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {asset!.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '1px' }}>
                    {asset!.archiveCode}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
