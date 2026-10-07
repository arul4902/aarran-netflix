import React, { useEffect, useState } from 'react';
import { Lock, RotateCcw, Sparkles } from 'lucide-react';

interface Episode09TeenProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Episode09TeenModal: React.FC<Episode09TeenProps> = ({ isOpen, onClose }) => {
  const [bufferPercent, setBufferPercent] = useState<number>(12);
  const [bufferFinished, setBufferFinished] = useState<boolean>(false);
  const [revealMessage, setRevealMessage] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setBufferPercent(12);
      setBufferFinished(false);
      setRevealMessage(false);
      return;
    }

    // Progression: 12% -> 27% -> 46% -> 68% -> 83% -> 99% STOP!
    const t1 = setTimeout(() => setBufferPercent(27), 700);
    const t2 = setTimeout(() => setBufferPercent(46), 1400);
    const t3 = setTimeout(() => setBufferPercent(68), 2100);
    const t4 = setTimeout(() => setBufferPercent(83), 2800);
    const t5 = setTimeout(() => {
      setBufferPercent(99);
      setBufferFinished(true);
    }, 3600);

    const t6 = setTimeout(() => {
      setRevealMessage(true);
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn 0.5s ease'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '640px', width: '100%' }}>
        {/* Monogram tag */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.8rem',
            color: '#E50914',
            fontWeight: 800,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}
        >
          AARRAN • SEASON TWO
        </div>

        <h2
          style={{
            fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            color: '#FFFFFF',
            letterSpacing: '0.04em',
            lineHeight: 1,
            marginBottom: '1.5rem'
          }}
        >
          EPISODE 09: TEEN
        </h2>

        {/* Buffering Indicator */}
        <div style={{ margin: '2rem 0' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1.5rem',
              borderRadius: '50%',
              border: '4px solid rgba(255,255,255,0.1)',
              borderTopColor: '#E50914',
              animation: 'bufferRotate 0.9s linear infinite'
            }}
          />

          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '1.6rem',
              color: '#FFFFFF',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}
          >
            BUFFERING {bufferPercent}%
          </div>

          <div
            style={{
              width: '280px',
              height: '4px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: '2px',
              margin: '1rem auto',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${bufferPercent}%`,
                backgroundColor: '#E50914',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Emotional Reveal when stopped at 99% */}
        {bufferFinished && !revealMessage && (
          <p
            style={{
              color: '#B3B3B3',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              animation: 'fadeIn 0.5s ease'
            }}
          >
            “Why isn’t it loading?”
          </p>
        )}

        {revealMessage && (
          <div style={{ animation: 'fadeIn 0.8s ease' }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)',
                fontStyle: 'italic',
                color: '#FFFFFF',
                lineHeight: 1.4,
                marginBottom: '1rem'
              }}
            >
              “Because this chapter hasn’t happened yet.” ❤️
            </p>

            <p
              style={{
                color: '#B3B3B3',
                fontSize: '1rem',
                lineHeight: 1.6,
                maxWidth: '480px',
                margin: '0 auto 2.5rem'
              }}
            >
              Some episodes can’t be streamed yet. They haven’t been filmed—they’re still being lived.
              <br />
              <strong style={{ color: '#E50914' }}>See you in the next season, Aarran.</strong>
            </p>

            <button
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#E50914',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                padding: '0.85rem 2.2rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.04em'
              }}
            >
              <RotateCcw size={16} />
              <span>RETURN TO CHILDHOOD</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
