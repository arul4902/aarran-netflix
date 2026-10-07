import React, { useEffect, useState } from 'react';
import { MEDIA_ASSETS } from '../data/mediaManifest';
import { useStory } from '../context/StoryContext';
import { SmartImage } from './SmartImage';
import { Shuffle, Sparkles } from 'lucide-react';

export const TooManyToChoose: React.FC = () => {
  const { setActiveModalMedia } = useStory();
  const [activeCycleIndex, setActiveCycleIndex] = useState<number>(0);
  const [isCycling, setIsCycling] = useState<boolean>(false);
  const [hasFinishedCycle, setHasFinishedCycle] = useState<boolean>(true);
  const [countDisplay, setCountDisplay] = useState<string>('TOO MANY TO COUNT');

  const photosOnly = MEDIA_ASSETS.filter((a) => a.type === 'image');

  const startRapidCycle = () => {
    setIsCycling(true);
    setHasFinishedCycle(false);
    let speed = 250;
    let count = 0;

    const interval = () => {
      count++;
      setActiveCycleIndex((prev) => (prev + 1) % photosOnly.length);
      setCountDisplay(`${count < 10 ? '0' + count : count} MEMORIES...`);

      if (count > 18) {
        setIsCycling(false);
        setHasFinishedCycle(true);
        setCountDisplay('TOO MANY TO COUNT.');
      } else {
        speed = Math.max(50, speed * 0.88);
        setTimeout(interval, speed);
      }
    };

    setTimeout(interval, speed);
  };

  const currentPhoto = photosOnly[activeCycleIndex] || photosOnly[0];

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container">
        {/* Intro Question */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <span
            style={{
              fontSize: '0.8rem',
              color: '#E50914',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            A MOTHER’S ARCHIVE
          </span>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              lineHeight: 1,
              marginBottom: '1rem'
            }}
          >
            “FAVOURITE MEMORY?”
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.3rem, 2.4vw, 1.8rem)',
              fontStyle: 'italic',
              color: '#B3B3B3',
              lineHeight: 1.4,
              marginBottom: '1.5rem'
            }}
          >
            “How do you choose one moment… when an entire childhood means everything?”
          </p>

          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: '#E50914',
              fontWeight: 700,
              letterSpacing: '0.15em',
              marginBottom: '1.5rem'
            }}
          >
            {countDisplay}
          </div>

          <button
            onClick={startRapidCycle}
            disabled={isCycling}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.6rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '24px',
              color: '#FFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: isCycling ? 'wait' : 'pointer'
            }}
          >
            <Shuffle size={14} />
            <span>{isCycling ? 'CYCLING MEMORIES...' : 'CYCLE MEMORIES AGAIN'}</span>
          </button>
        </div>

        {/* Rapid Cycle Spotlight or Mosaic */}
        {isCycling ? (
          <div
            style={{
              maxWidth: '540px',
              height: '380px',
              margin: '0 auto',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 0 50px rgba(229, 9, 20, 0.4)',
              border: '2px solid #E50914'
            }}
          >
            <SmartImage
              key={currentPhoto.id}
              src={currentPhoto.file}
              alt={currentPhoto.title}
              focalX={currentPhoto.focalX}
              focalY={currentPhoto.focalY}
              fillCard={true}
              blurBackgroundFallback={false}
              priority={true}
            />
          </div>
        ) : (
          /* Rich Mosaic of Many Memories */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '10px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            {photosOnly.slice(0, 16).map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveModalMedia(item)}
                style={{
                  height: idx % 3 === 0 ? '220px' : '150px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#181818',
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = '#E50914';
                  e.currentTarget.style.zIndex = '10';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.zIndex = '1';
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
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.4rem',
              fontStyle: 'italic',
              color: '#FFF'
            }}
          >
            “Favourite memory? <span style={{ color: '#E50914', fontWeight: 600 }}>Impossible.</span> Every single
            one is forever.”
          </p>
        </div>
      </div>
    </section>
  );
};
