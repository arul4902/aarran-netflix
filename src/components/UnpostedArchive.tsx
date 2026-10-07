import React from 'react';
import { MEDIA_ASSETS } from '../data/mediaManifest';
import { useStory } from '../context/StoryContext';
import { SmartImage } from './SmartImage';
import { Shield, Sparkles } from 'lucide-react';

interface UnpostedArchiveProps {
  onOpenVault: () => void;
}

export const UnpostedArchive: React.FC<UnpostedArchiveProps> = ({ onOpenVault }) => {
  const { setActiveModalMedia } = useStory();
  const sampleVault = MEDIA_ASSETS.slice(0, 8);

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#0a0a0a',
        overflow: 'hidden'
      }}
    >
      <div className="streaming-container">
        {/* Cinematic Intro Quote */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem' }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)',
              fontStyle: 'italic',
              color: '#B3B3B3',
              lineHeight: 1.35,
              marginBottom: '0.8rem'
            }}
          >
            “Not everything made it to social media.”
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.8vw, 3rem)',
              fontStyle: 'italic',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.25,
              marginBottom: '2rem'
            }}
          >
            “But everything made it into my heart.”
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'rgba(229, 9, 20, 0.12)',
              border: '1px solid #E50914',
              borderRadius: '20px',
              padding: '0.4rem 1.2rem',
              color: '#E50914',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}
          >
            <Shield size={14} />
            <span>THE UNPOSTED ARCHIVE</span>
          </div>
        </div>

        {/* Vault Grid Preview */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem'
          }}
        >
          {sampleVault.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalMedia(item)}
              style={{
                height: '180px',
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#181818',
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
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 60%)',
                  zIndex: 3
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  zIndex: 5,
                  fontSize: '0.62rem',
                  fontFamily: 'monospace',
                  color: '#999',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  padding: '2px 5px',
                  borderRadius: '2px'
                }}
              >
                {item.archiveCode}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  right: '8px',
                  zIndex: 5
                }}
              >
                <div style={{ fontSize: '0.78rem', color: '#FFF', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onOpenVault}
            style={{
              padding: '0.85rem 2.4rem',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '2px solid #E50914',
              borderRadius: '4px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(229, 9, 20, 0.25)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E50914';
              e.currentTarget.style.boxShadow = '0 0 35px rgba(229, 9, 20, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(229, 9, 20, 0.25)';
            }}
          >
            EXPLORE FULL VAULT (27 ARTIFACTS)
          </button>
        </div>
      </div>
    </section>
  );
};
