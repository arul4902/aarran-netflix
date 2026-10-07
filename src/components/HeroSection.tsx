import React, { useState } from 'react';
import { Play, Info, Heart, Volume2, VolumeX } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { useAudio } from '../context/AudioContext';
import { getAssetById } from '../data/mediaManifest';
import { STORY_DATA } from '../data/story';

interface HeroSectionProps {
  onPlayStory: () => void;
  onOpenMoreInfo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onPlayStory, onOpenMoreInfo }) => {
  const { momPov, isFavourite, toggleFavourite } = useStory();
  const { isPlaying, isMuted, togglePlay, toggleMute } = useAudio();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // Best high-res hero asset: 6.JPG (Denim dungarees with giant red heart)
  const heroAsset = getAssetById('big-heart-hero')!;
  const isFav = isFavourite(heroAsset.id);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '88vh',
        height: '92vh',
        maxHeight: '1080px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#141414'
      }}
    >
      {/* Background High-Res Image with Slow Subtle Ambient Zoom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        <img
          src={heroAsset.file}
          alt="Aarran - My Purpose Is Him"
          loading="eager"
          decoding="sync"
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 32%',
            transform: imageLoaded ? 'scale(1)' : 'scale(1.05)',
            transition: 'transform 8s ease-out, opacity 0.8s ease',
            opacity: imageLoaded ? 1 : 0
          }}
        />

        {/* Netflix-Style Gradients */}
        {/* Left-to-Right Dark Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(20,20,20,0.96) 0%, rgba(20,20,20,0.85) 35%, rgba(20,20,20,0.45) 65%, rgba(20,20,20,0.05) 100%)',
            zIndex: 2
          }}
        />

        {/* Bottom Fade to #141414 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '35vh',
            background: 'linear-gradient(0deg, #141414 0%, rgba(20,20,20,0.85) 45%, transparent 100%)',
            zIndex: 2
          }}
        />

        {/* Top Vignette for Navbar contrast */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '15vh',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
            zIndex: 2
          }}
        />
      </div>

      {/* Hero Foreground Content */}
      <div
        className="streaming-container"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '94vw',
          width: '100%',
          paddingTop: '4rem'
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          {/* Label: A ORIGINAL */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              marginBottom: '0.85rem'
            }}
          >
            <span
              style={{
                fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
                color: '#E50914',
                fontSize: '1.4rem',
                letterSpacing: '0.15em',
                lineHeight: 1
              }}
            >
              A
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.35em',
                color: 'rgba(255,255,255,0.75)',
                textTransform: 'uppercase'
              }}
            >
              ORIGINAL ARCHIVE
            </span>
          </div>

          {/* Large Title: MY PURPOSE IS HIM. */}
          <h1
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: 'clamp(3.4rem, 8vw, 6.5rem)',
              lineHeight: 0.96,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.9)',
              marginBottom: '1rem'
            }}
          >
            MY PURPOSE
            <br />
            IS HIM.
          </h1>

          {/* Subtitle / Metadata */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              fontSize: '0.85rem',
              color: '#46d369',
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              marginBottom: '0.85rem'
            }}
          >
            <span>99% Match</span>
            <span style={{ color: '#999', fontWeight: 400 }}>•</span>
            <span
              style={{
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '1px 6px',
                borderRadius: '2px',
                fontSize: '0.7rem',
                color: '#CCC'
              }}
            >
              HD • ULTRA 4K
            </span>
            <span style={{ color: '#999', fontWeight: 400 }}>•</span>
            <span style={{ color: '#B3B3B3', fontWeight: 500 }}>
              Mother & Son • Memories • Forever
            </span>
          </div>

          {/* Dedication and Supporting copy */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
              color: '#E0E0E0',
              lineHeight: 1.5,
              marginBottom: '0.5rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}
          >
            “{STORY_DATA.subQuote}”
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#E50914',
              fontWeight: 700,
              marginBottom: '1.8rem'
            }}
          >
            {STORY_DATA.mother} × {STORY_DATA.son}
          </p>

          {/* Mom's POV annotation if enabled */}
          {momPov && (
            <div
              style={{
                backgroundColor: 'rgba(229, 9, 20, 0.15)',
                borderLeft: '3px solid #E50914',
                padding: '0.65rem 1rem',
                marginBottom: '1.5rem',
                borderRadius: '0 4px 4px 0'
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '1.15rem',
                  color: '#FFD4D4',
                  margin: 0
                }}
              >
                “My purpose in life is him. Each other’s lil eggs.” 🥚❤️
              </p>
            </div>
          )}

          {/* Buttons: ▶ PLAY STORY and ⓘ MORE INFO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onPlayStory}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem 2rem',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                borderRadius: '4px',
                border: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.6)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)';
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Play size={20} fill="#000000" />
              <span>PLAY STORY</span>
            </button>

            <button
              onClick={onOpenMoreInfo}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem 1.8rem',
                backgroundColor: 'rgba(109, 109, 110, 0.7)',
                color: '#FFFFFF',
                borderRadius: '4px',
                border: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(109, 109, 110, 0.45)';
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(109, 109, 110, 0.7)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Info size={20} />
              <span>MORE INFO</span>
            </button>

            {/* Favorite button */}
            <button
              onClick={() => toggleFavourite(heroAsset.id)}
              title={isFav ? 'In Mom’s List' : 'Add to Mom’s List'}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                border: isFav ? '2px solid #E50914' : '1px solid rgba(255,255,255,0.3)',
                color: isFav ? '#E50914' : '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart size={20} fill={isFav ? '#E50914' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Sound indicator in bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '10vh',
          right: '4vw',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem'
        }}
      >
        <button
          onClick={toggleMute}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <span
          style={{
            backgroundColor: 'rgba(51, 51, 51, 0.6)',
            borderLeft: '3px solid #DCDCDC',
            padding: '4px 10px',
            fontSize: '0.8rem',
            color: '#DCDCDC',
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif"
          }}
        >
          10+ SEASONS
        </span>
      </div>
    </section>
  );
};
