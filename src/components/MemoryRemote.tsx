import React, { useState } from 'react';
import { useStory } from '../context/StoryContext';
import { MEDIA_ASSETS } from '../data/mediaManifest';
import {
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Heart,
  Tv,
  X
} from 'lucide-react';

interface MemoryRemoteProps {
  onPlayMemory: () => void;
}

export const MemoryRemote: React.FC<MemoryRemoteProps> = ({ onPlayMemory }) => {
  const {
    activeModalMedia,
    setActiveModalMedia,
    toggleFavourite,
    isFavourite,
    incrementEasterEgg,
    showToast
  } = useStory();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const mediaList = MEDIA_ASSETS.filter((m) => m.type !== 'audio');

  const handleNext = () => {
    const curIdx = activeModalMedia
      ? mediaList.findIndex((m) => m.id === activeModalMedia.id)
      : 0;
    const nextIdx = (curIdx + 1) % mediaList.length;
    setActiveModalMedia(mediaList[nextIdx]);
  };

  const handlePrev = () => {
    const curIdx = activeModalMedia
      ? mediaList.findIndex((m) => m.id === activeModalMedia.id)
      : 0;
    const prevIdx = (curIdx - 1 + mediaList.length) % mediaList.length;
    setActiveModalMedia(mediaList[prevIdx]);
  };

  const handleScrollUp = () => {
    window.scrollBy({ top: -window.innerHeight * 0.7, behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
  };

  const handleEgg = () => {
    incrementEasterEgg();
    showToast('🥚 Lil egg activated from the Memory Remote!');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '48px',
        right: '24px',
        zIndex: 850
      }}
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          title="Streaming Memory Remote"
          style={{
            backgroundColor: '#1f1f1f',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#FFFFFF',
            borderRadius: '50px',
            padding: '0.6rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.8rem',
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#E50914';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Tv size={16} color="#E50914" />
          <span className="hidden sm:inline">REMOTE</span>
        </button>
      ) : (
        /* Expanded Streaming Remote Pad */
        <div
          style={{
            width: '180px',
            backgroundColor: '#181818',
            borderRadius: '24px',
            padding: '1.2rem 1rem',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.95), 0 0 15px rgba(229,9,20,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {/* Remote Header */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            <span
              style={{
                fontSize: '0.65rem',
                color: '#E50914',
                fontWeight: 800,
                letterSpacing: '0.1em'
              }}
            >
              AARRAN REMOTE
            </span>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          </div>

          {/* D-Pad */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 38px)',
              gridTemplateRows: 'repeat(3, 38px)',
              gap: '4px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1rem'
            }}
          >
            {/* Top */}
            <div />
            <button
              onClick={handleScrollUp}
              title="Scroll Up"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#262626',
                border: 'none',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ArrowUp size={15} />
            </button>
            <div />

            {/* Left */}
            <button
              onClick={handlePrev}
              title="Previous Memory"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#262626',
                border: 'none',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Center: Play */}
            <button
              onClick={onPlayMemory}
              title="Open / Play Memory"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#E50914',
                border: 'none',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(229,9,20,0.6)'
              }}
            >
              <Play size={14} fill="#FFF" />
            </button>

            {/* Right */}
            <button
              onClick={handleNext}
              title="Next Memory"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#262626',
                border: 'none',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Bottom */}
            <div />
            <button
              onClick={handleScrollDown}
              title="Scroll Down"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#262626',
                border: 'none',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ArrowDown size={15} />
            </button>
            <div />
          </div>

          {/* Quick Action Row: Heart & Egg */}
          <div style={{ display: 'flex', gap: '0.6rem', width: '100%', justifyContent: 'center' }}>
            <button
              onClick={() => {
                if (activeModalMedia) {
                  toggleFavourite(activeModalMedia.id);
                } else {
                  toggleFavourite(mediaList[0].id);
                }
              }}
              title="Add to Mom’s List"
              style={{
                flex: 1,
                padding: '0.45rem',
                backgroundColor: '#262626',
                border: 'none',
                borderRadius: '6px',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Heart size={14} fill={activeModalMedia && isFavourite(activeModalMedia.id) ? '#E50914' : 'none'} color="#E50914" />
            </button>

            <button
              onClick={handleEgg}
              title="Lil Egg Easter Egg"
              style={{
                flex: 1,
                padding: '0.45rem',
                backgroundColor: '#262626',
                border: 'none',
                borderRadius: '6px',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              🥚
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
