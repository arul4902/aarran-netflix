import React, { useRef, useState } from 'react';
import { getAssetById } from '../data/mediaManifest';
import { useAudio } from '../context/AudioContext';
import { Film, Play, Pause, Clapperboard, X } from 'lucide-react';

export const MovieNights: React.FC = () => {
  const { duckAudio, unduckAudio } = useAudio();
  const [theatreMode, setTheatreMode] = useState<boolean>(false);
  const [isPlayingMovie, setIsPlayingMovie] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const movieAsset = getAssetById('video-movie-night')!;

  const handleStartMovieNight = () => {
    setTheatreMode(true);
    duckAudio();
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => setIsPlayingMovie(true)).catch(console.warn);
      }
    }, 400);
  };

  const handleCloseTheatre = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlayingMovie(false);
    setTheatreMode(false);
    unduckAudio();
  };

  return (
    <section
      id="favourites"
      style={{
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
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
            <Clapperboard size={13} />
            <span>SHARED PASSION</span>
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
            OUR FAVOURITE KIND OF NIGHT
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              fontStyle: 'italic',
              color: '#B3B3B3',
              lineHeight: 1.4
            }}
          >
            “Curled up under blankets, laughing together at our favourite stories.”
          </p>
        </div>

        {/* Cinema Ticket Card */}
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            backgroundColor: '#161616',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px dashed rgba(255,255,255,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
            position: 'relative'
          }}
        >
          {/* Ticket Header Bar */}
          <div
            style={{
              backgroundColor: '#1f1f1f',
              padding: '1rem 1.5rem',
              borderBottom: '1px dashed rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Film size={18} color="#E50914" />
              <span style={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.12em', color: '#FFF' }}>
                CINEMA PASS • ADMIT TWO
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#46d369', fontWeight: 700, fontFamily: 'monospace' }}>
              SEATS: MOM & AARRAN
            </span>
          </div>

          {/* Ticket Body Preview */}
          <div style={{ padding: '2.5rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#E50914', fontWeight: 800, letterSpacing: '0.2em' }}>
              NOW PLAYING
            </span>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                color: '#FFF',
                letterSpacing: '0.04em',
                margin: '0.3rem 0 1rem'
              }}
            >
              MOVIE NIGHT WITH MOM
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                color: '#BBB',
                maxWidth: '480px',
                margin: '0 auto 2rem',
                lineHeight: 1.5
              }}
            >
              An unmissable evening filled with snacks, cozy moments, and genuine laughter.
            </p>

            <button
              onClick={handleStartMovieNight}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: '#E50914',
                color: '#FFFFFF',
                padding: '0.85rem 2.5rem',
                borderRadius: '4px',
                border: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(229, 9, 20, 0.5)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FF1A24';
                e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#E50914';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Play size={18} fill="#FFF" />
              <span>START MOVIE NIGHT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Theatre Mode Fullscreen Letterbox Player */}
      {theatreMode && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.96)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '2rem',
              right: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: '#E50914', fontWeight: 800, letterSpacing: '0.1em' }}>
                PRIVATE SCREENING
              </span>
              <h4 style={{ fontSize: '1.2rem', color: '#FFF', fontWeight: 700 }}>
                Watching Together at Home
              </h4>
            </div>

            <button
              onClick={handleCloseTheatre}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Letterbox Cinema Frame */}
          <div
            style={{
              maxWidth: '900px',
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: '#000',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 0 50px rgba(229, 9, 20, 0.3)',
              position: 'relative'
            }}
          >
            <video
              ref={videoRef}
              src={movieAsset.file}
              controls
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onEnded={handleCloseTheatre}
            />
          </div>

          <p style={{ marginTop: '1.5rem', color: '#888', fontSize: '0.85rem' }}>
            Press Esc or close icon to exit screening
          </p>
        </div>
      )}
    </section>
  );
};
