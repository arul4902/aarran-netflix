import React from 'react';
import { getAssetById } from '../data/mediaManifest';
import { SmartImage } from './SmartImage';
import { Play } from 'lucide-react';

interface CinematicPauseScreenProps {
  isOpen: boolean;
  onResume: () => void;
}

export const CinematicPauseScreen: React.FC<CinematicPauseScreenProps> = ({ isOpen, onResume }) => {
  if (!isOpen) return null;

  const pauseAsset = getAssetById('kurti-pout')!;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.92)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn 0.4s ease'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '580px', width: '100%' }}>
        {/* Memory frame */}
        <div
          style={{
            width: '260px',
            height: '340px',
            margin: '0 auto 2rem',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          <SmartImage
            src={pauseAsset.file}
            alt={pauseAsset.title}
            focalX={pauseAsset.focalX}
            focalY={pauseAsset.focalY}
            fillCard={true}
            blurBackgroundFallback={true}
          />
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.8rem',
            color: '#E50914',
            fontWeight: 800,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}
        >
          PAUSED
        </div>

        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '2.5rem',
            color: '#FFF',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}
        >
          AARRAN — SEASON ONE
        </h3>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.4rem',
            fontStyle: 'italic',
            color: '#CCC',
            marginBottom: '2rem'
          }}
        >
          “Some moments deserve a little longer.”
        </p>

        <button
          onClick={onResume}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: 'none',
            borderRadius: '4px',
            padding: '0.8rem 2.2rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
        >
          <Play size={18} fill="#000" />
          <span>RESUME STORY</span>
        </button>
      </div>
    </div>
  );
};
