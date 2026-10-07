import React, { useState } from 'react';
import { Lock, Sparkles, Clock } from 'lucide-react';

export const NextSeasonTeaser: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const futureCards = [
    { id: 'f-1', title: 'NEXT CHAPTER', status: 'LOCKED', tooltip: '“Not filmed yet.”' },
    { id: 'f-2', title: 'ANOTHER ADVENTURE', status: 'LOCKED', tooltip: '“Still being lived.”' },
    { id: 'f-3', title: 'MORE MEMORIES', status: 'LOCKED', tooltip: '“Coming when life happens.”' }
  ];

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
        {/* Teaser Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <span
            style={{
              fontSize: '0.8rem',
              color: '#E50914',
              fontWeight: 800,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.75rem'
            }}
          >
            A LIFE ORIGINAL • UPCOMING
          </span>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: 'clamp(3rem, 6.5vw, 5.2rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              lineHeight: 1,
              marginBottom: '1rem'
            }}
          >
            THIS STORY ISN’T OVER.
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
              color: '#B3B3B3',
              marginBottom: '1.5rem'
            }}
          >
            AARRAN • NEXT SEASON: TEEN YEARS
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: 'rgba(229,9,20,0.1)',
              border: '1px solid rgba(229,9,20,0.4)',
              padding: '0.5rem 1.4rem',
              borderRadius: '20px',
              color: '#E50914',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.12em'
            }}
          >
            <Clock size={15} />
            <span>STATUS: LOADING... ●●○</span>
          </div>
        </div>

        {/* Secret Future Locked Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            maxWidth: '920px',
            margin: '0 auto 3rem'
          }}
        >
          {futureCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setActiveTooltip(card.id)}
              onMouseEnter={() => setActiveTooltip(card.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              style={{
                height: '200px',
                backgroundColor: '#141414',
                borderRadius: '6px',
                border: '1px dashed rgba(255,255,255,0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                textAlign: 'center',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: '#888'
                }}
              >
                <Lock size={20} />
              </div>

              <h3 style={{ fontSize: '1.1rem', color: '#FFF', fontWeight: 700, letterSpacing: '0.04em' }}>
                {card.title}
              </h3>

              <span style={{ fontSize: '0.72rem', color: '#E50914', fontWeight: 700, letterSpacing: '0.1em', marginTop: '4px' }}>
                {card.status}
              </span>

              {/* Tooltip on click or hover */}
              {activeTooltip === card.id && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0,0,0,0.92)',
                    border: '1px solid #E50914',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontStyle: 'italic',
                    color: '#FFF',
                    animation: 'fadeIn 0.2s ease'
                  }}
                >
                  {card.tooltip}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coming Soon statement */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '2.2rem',
              color: '#888',
              letterSpacing: '0.15em'
            }}
          >
            COMING SOON
          </div>
          <span style={{ fontSize: '0.78rem', color: '#555', letterSpacing: '0.08em' }}>
            No release date. Real life in progress.
          </span>
        </div>
      </div>
    </section>
  );
};
