import React, { useEffect, useRef } from 'react';
import { MediaAsset } from '../types';
import { MEDIA_ASSETS } from '../data/mediaManifest';
import { useStory } from '../context/StoryContext';
import { useAudio } from '../context/AudioContext';
import { X, ChevronLeft, ChevronRight, Heart, Volume2, VolumeX } from 'lucide-react';

interface MemoryPlayerModalProps {
  media: MediaAsset | null;
  onClose: () => void;
}

export const MemoryPlayerModal: React.FC<MemoryPlayerModalProps> = ({ media, onClose }) => {
  const { isFavourite, toggleFavourite, setActiveModalMedia } = useStory();
  const { duckAudio, unduckAudio } = useAudio();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playlist = MEDIA_ASSETS.filter((m) => m.type !== 'audio');
  const currentIndex = media ? playlist.findIndex((m) => m.id === media.id) : -1;

  useEffect(() => {
    if (media && media.type === 'video') {
      duckAudio();
    } else {
      unduckAudio();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!media) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unduckAudio();
    };
  }, [media]);

  if (!media) return null;

  const isFav = isFavourite(media.id);

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < playlist.length - 1) {
      setActiveModalMedia(playlist[currentIndex + 1]);
    } else {
      setActiveModalMedia(playlist[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveModalMedia(playlist[currentIndex - 1]);
    } else {
      setActiveModalMedia(playlist[playlist.length - 1]);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 99990,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: '1.4rem',
              color: '#FFFFFF',
              letterSpacing: '0.08em'
            }}
          >
            AARRAN
          </span>
          <span style={{ color: '#666' }}>•</span>
          <span
            style={{
              color: '#E50914',
              fontSize: '0.75rem',
              fontWeight: 800,
              fontFamily: 'monospace',
              letterSpacing: '0.1em'
            }}
          >
            {media.archiveCode}
          </span>
          <span style={{ color: '#999', fontSize: '0.8rem' }}>
            ({currentIndex + 1} of {playlist.length})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => toggleFavourite(media.id)}
            title={isFav ? 'In Mom’s List' : 'Add to Mom’s List'}
            style={{
              background: 'none',
              border: 'none',
              color: isFav ? '#E50914' : '#FFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem'
            }}
          >
            <Heart size={20} fill={isFav ? '#E50914' : 'none'} />
            <span className="hidden sm:inline">{isFav ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={onClose}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
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
      </div>

      {/* Main Center Viewport with Left/Right Navigation */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          margin: '1rem 0'
        }}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.65)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={26} />
        </button>

        {/* Media Frame */}
        <div
          style={{
            maxWidth: '90vw',
            maxHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          {media.type === 'video' ? (
            <video
              ref={videoRef}
              src={media.file}
              controls
              autoPlay
              playsInline
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.9)'
              }}
            />
          ) : (
            <img
              src={media.file}
              alt={media.title}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.9)'
              }}
            />
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.65)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronRight size={26} />
        </button>
      </div>

      {/* Bottom Information Panel */}
      <div
        style={{
          maxWidth: '780px',
          width: '100%',
          margin: '0 auto',
          textAlign: 'center',
          zIndex: 10
        }}
      >
        <span
          style={{
            fontSize: '0.72rem',
            color: '#E50914',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}
        >
          {media.category} • {media.tagline || 'ARCHIVED ARTIFACT'}
        </span>
        <h3 style={{ fontSize: '1.25rem', color: '#FFF', fontWeight: 700, margin: '2px 0 4px' }}>
          {media.title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#B3B3B3', lineHeight: 1.4 }}>
          {media.caption}
        </p>
      </div>
    </div>
  );
};
