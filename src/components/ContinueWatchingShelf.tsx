import React, { useRef, useState } from 'react';
import { EPISODES } from '../data/story';
import { getAssetById } from '../data/mediaManifest';
import { SmartImage } from './SmartImage';
import { useStory } from '../context/StoryContext';
import { Play, Plus, Check, Heart, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { Episode } from '../types';

interface ContinueWatchingShelfProps {
  onSelectEpisode: (ep: Episode) => void;
  onOpenTeenModal: () => void;
}

export const ContinueWatchingShelf: React.FC<ContinueWatchingShelfProps> = ({
  onSelectEpisode,
  onOpenTeenModal
}) => {
  const { isFavourite, toggleFavourite, showToast } = useStory();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hoveredEpId, setHoveredEpId] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.75;
    scrollRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="episodes"
      style={{
        position: 'relative',
        paddingTop: '2.5rem',
        paddingBottom: '3rem',
        zIndex: 20
      }}
    >
      <div className="streaming-container">
        {/* Shelf Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem' }}>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.01em'
              }}
            >
              Continue Watching for Yamini
            </h2>
            <span
              style={{
                color: '#E50914',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              SEASON 1 ARCHIVE
            </span>
          </div>

          <div style={{ color: '#777', fontSize: '0.8rem' }}>
            9 Episodes Available
          </div>
        </div>

        {/* Shelf Scroll Container with Navigation Arrows */}
        <div style={{ position: 'relative' }}>
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 30,
              width: '42px',
              height: '80px',
              backgroundColor: 'rgba(0,0,0,0.7)',
              border: 'none',
              borderRadius: '0 4px 4px 0',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(4px)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.85)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)')}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 30,
              width: '42px',
              height: '80px',
              backgroundColor: 'rgba(0,0,0,0.7)',
              border: 'none',
              borderRadius: '4px 0 0 4px',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(4px)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.85)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)')}
          >
            <ChevronRight size={28} />
          </button>

          {/* Cards Track */}
          <div
            ref={scrollRef}
            className="hide-scrollbar"
            style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              paddingTop: '16px',
              paddingBottom: '20px',
              scrollSnapType: 'x mandatory'
            }}
          >
            {EPISODES.map((ep) => {
              const thumbnailAsset = getAssetById(ep.thumbnailAssetId);
              const isFav = thumbnailAsset ? isFavourite(thumbnailAsset.id) : false;
              const isLocked = ep.locked;

              return (
                <div
                  key={ep.id}
                  style={{
                    flex: '0 0 clamp(230px, 24vw, 290px)',
                    scrollSnapAlign: 'start',
                    position: 'relative'
                  }}
                  onMouseEnter={() => setHoveredEpId(ep.id)}
                  onMouseLeave={() => setHoveredEpId(null)}
                >
                  <div
                    className="streaming-card"
                    onClick={() => {
                      if (isLocked) {
                        onOpenTeenModal();
                      } else {
                        onSelectEpisode(ep);
                      }
                    }}
                    style={{
                      height: '175px',
                      cursor: 'pointer',
                      border: isLocked ? '1px dashed rgba(229, 9, 20, 0.5)' : '1px solid rgba(255,255,255,0.06)',
                      backgroundColor: '#1b1b1b'
                    }}
                  >
                    {/* Thumbnail Image */}
                    {thumbnailAsset && (
                      <SmartImage
                        src={thumbnailAsset.file}
                        alt={ep.title}
                        focalX={thumbnailAsset.focalX}
                        focalY={thumbnailAsset.focalY}
                        fillCard={true}
                        blurBackgroundFallback={true}
                      />
                    )}

                    {/* Locked EPISODE 09 TEEN UI */}
                    {isLocked && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(10, 10, 10, 0.88)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10,
                          padding: '1rem',
                          textAlign: 'center'
                        }}
                      >
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(229, 9, 20, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.5rem',
                            border: '1px solid #E50914'
                          }}
                        >
                          <Lock size={18} color="#E50914" />
                        </div>
                        <span
                          style={{
                            fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
                            fontSize: '1.4rem',
                            color: '#FFFFFF',
                            letterSpacing: '0.08em',
                            lineHeight: 1
                          }}
                        >
                          TEEN
                        </span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: '#E50914',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            marginTop: '2px'
                          }}
                        >
                          BUFFERING 99%
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay for card titles */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                        zIndex: 4
                      }}
                    />

                    {/* Top Episode Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        zIndex: 6,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: '#FFF',
                        letterSpacing: '0.06em'
                      }}
                    >
                      {ep.epNumber}
                    </div>

                    {/* Card Bottom Meta */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '10px',
                        right: '10px',
                        zIndex: 6
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.2,
                          marginBottom: '2px'
                        }}
                      >
                        {ep.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.72rem',
                          color: '#B3B3B3',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {ep.subtitle}
                      </p>
                    </div>

                    {/* Progress Bar (Netflix style red line) */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        backgroundColor: '#333333',
                        zIndex: 8
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${ep.progressPercent}%`,
                          backgroundColor: '#E50914'
                        }}
                      />
                    </div>
                  </div>

                  {/* Expanded Hover Action Panel */}
                  {hoveredEpId === ep.id && (
                    <div
                      className="glass-panel"
                      style={{
                        marginTop: '6px',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        animation: 'fadeIn 0.2s ease',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.85)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <button
                          onClick={() => {
                            if (isLocked) onOpenTeenModal();
                            else onSelectEpisode(ep);
                          }}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#FFFFFF',
                            border: 'none',
                            color: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Play size={14} fill="#000" />
                        </button>

                        {thumbnailAsset && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavourite(thumbnailAsset.id);
                            }}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              border: isFav ? '1px solid #E50914' : '1px solid rgba(255,255,255,0.3)',
                              color: isFav ? '#E50914' : '#FFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <Heart size={14} fill={isFav ? '#E50914' : 'none'} />
                          </button>
                        )}

                        <span style={{ fontSize: '0.72rem', color: '#46d369', fontWeight: 700, marginLeft: 'auto' }}>
                          {ep.duration}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: '#B3B3B3',
                          lineHeight: 1.35,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {ep.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
