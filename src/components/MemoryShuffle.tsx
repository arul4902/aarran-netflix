import React, { useState } from 'react';
import { MEDIA_ASSETS } from '../data/mediaManifest';
import { useStory } from '../context/StoryContext';
import { SmartImage } from './SmartImage';
import { Shuffle, Heart, Play } from 'lucide-react';
import { MediaAsset } from '../types';

export const MemoryShuffle: React.FC = () => {
  const { isFavourite, toggleFavourite, setActiveModalMedia } = useStory();
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [shuffledItem, setShuffledItem] = useState<MediaAsset | null>(() => {
    const list = MEDIA_ASSETS.filter((a) => a.type !== 'audio');
    return list[Math.floor(Math.random() * list.length)];
  });

  const handleShuffle = () => {
    setIsShuffling(true);
    let count = 0;
    const list = MEDIA_ASSETS.filter((a) => a.type !== 'audio');

    const interval = setInterval(() => {
      count++;
      const randomItem = list[Math.floor(Math.random() * list.length)];
      setShuffledItem(randomItem);

      if (count > 8) {
        clearInterval(interval);
        setIsShuffling(false);
      }
    }, 120);
  };

  const isFav = shuffledItem ? isFavourite(shuffledItem.id) : false;

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
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
            <Shuffle size={13} />
            <span>INSTANT SURPRISE</span>
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
            SURPRISE ME ❤️
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              fontStyle: 'italic',
              color: '#B3B3B3',
              marginBottom: '1.5rem'
            }}
          >
            “Let fate pick an unforgettable fragment from the archive.”
          </p>

          <button
            onClick={handleShuffle}
            disabled={isShuffling}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              backgroundColor: '#E50914',
              color: '#FFF',
              border: 'none',
              borderRadius: '4px',
              padding: '0.85rem 2.2rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              cursor: isShuffling ? 'wait' : 'pointer',
              boxShadow: '0 8px 30px rgba(229, 9, 20, 0.45)',
              transition: 'all 0.2s ease'
            }}
          >
            <Shuffle size={18} />
            <span>{isShuffling ? 'SHUFFLING MEMORIES...' : 'ANOTHER MEMORY'}</span>
          </button>
        </div>

        {/* Shuffled Result Card */}
        {shuffledItem && (
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto',
              backgroundColor: '#161616',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
              border: '1px solid rgba(255,255,255,0.12)',
              position: 'relative'
            }}
          >
            <div
              onClick={() => setActiveModalMedia(shuffledItem)}
              style={{ height: '380px', position: 'relative', cursor: 'pointer' }}
            >
              <SmartImage
                key={shuffledItem.id}
                src={shuffledItem.file}
                alt={shuffledItem.title}
                focalX={shuffledItem.focalX}
                focalY={shuffledItem.focalY}
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

              {shuffledItem.type === 'video' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(229, 9, 20, 0.85)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    zIndex: 6
                  }}
                >
                  <Play size={18} fill="#FFF" />
                </div>
              )}

              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  zIndex: 5
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#E50914', fontWeight: 800, letterSpacing: '0.1em' }}>
                      {shuffledItem.archiveCode} • {shuffledItem.category}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: '#FFF', fontWeight: 700, marginTop: '2px' }}>
                      {shuffledItem.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#BBB', marginTop: '2px' }}>
                      {shuffledItem.caption}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavourite(shuffledItem.id);
                    }}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      border: isFav ? '1px solid #E50914' : '1px solid rgba(255,255,255,0.3)',
                      color: isFav ? '#E50914' : '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Heart size={18} fill={isFav ? '#E50914' : 'none'} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
