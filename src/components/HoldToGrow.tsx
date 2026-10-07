import React, { useEffect, useRef, useState } from 'react';
import { getAssetById } from '../data/mediaManifest';
import { SmartImage } from './SmartImage';
import { Play, Sparkles } from 'lucide-react';

export const HoldToGrow: React.FC = () => {
  const [progress, setProgress] = useState<number>(0); // 0 to 100
  const isHoldingRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  const growthStages = [
    { threshold: 0, asset: getAssetById('day-1')!, label: 'Day 1 in the World' },
    { threshold: 25, asset: getAssetById('two-months')!, label: '2 Months Milestone' },
    { threshold: 50, asset: getAssetById('lion-smile')!, label: 'Smiling with First Teeth' },
    { threshold: 75, asset: getAssetById('turns-5-spiderman')!, label: 'Turning 5 in December' },
    { threshold: 95, asset: getAssetById('real-eiffel')!, label: 'Saluting at the Eiffel Tower' }
  ];

  const currentStage = growthStages.reduce((prev, curr) => {
    return progress >= curr.threshold ? curr : prev;
  }, growthStages[0]);

  const startHold = () => {
    isHoldingRef.current = true;
    const step = () => {
      if (!isHoldingRef.current) return;
      setProgress((prev) => {
        const next = Math.min(100, prev + 0.45);
        if (next < 100) {
          animationFrameRef.current = requestAnimationFrame(step);
        }
        return next;
      });
    };
    animationFrameRef.current = requestAnimationFrame(step);
  };

  const endHold = () => {
    isHoldingRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const reset = () => {
    setProgress(0);
  };

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
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#E50914',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            INTERACTIVE EXPERIENCE
          </span>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              lineHeight: 1,
              marginBottom: '0.5rem'
            }}
          >
            HOLD TO WATCH HIM GROW
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              fontStyle: 'italic',
              color: '#B3B3B3',
              marginBottom: '0.5rem'
            }}
          >
            “Press and hold to stream time in fast-forward.”
          </p>

          {progress >= 100 && (
            <p style={{ color: '#E50914', fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 600 }}>
              “Where did the time go?” ❤️
            </p>
          )}
        </div>

        {/* Growth Card Viewer */}
        <div
          style={{
            maxWidth: '620px',
            margin: '0 auto 2.5rem',
            backgroundColor: '#161616',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.85)',
            position: 'relative'
          }}
        >
          <div style={{ height: '420px', position: 'relative' }}>
            <SmartImage
              key={currentStage.asset.id}
              src={currentStage.asset.file}
              alt={currentStage.label}
              focalX={currentStage.asset.focalX}
              focalY={currentStage.asset.focalY}
              fillCard={true}
              blurBackgroundFallback={true}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 60%)',
                zIndex: 3
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                zIndex: 5
              }}
            >
              <span style={{ fontSize: '0.72rem', color: '#E50914', fontWeight: 800, letterSpacing: '0.1em' }}>
                CURRENT STAGE
              </span>
              <h3 style={{ fontSize: '1.25rem', color: '#FFF', fontWeight: 700 }}>
                {currentStage.label}
              </h3>
            </div>
          </div>

          {/* Progress Timeline Ribbon */}
          <div style={{ padding: '1rem 1.5rem', backgroundColor: '#1f1f1f' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#888',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                marginBottom: '6px'
              }}
            >
              <span style={{ color: progress < 40 ? '#FFF' : '#888' }}>LITTLE</span>
              <span style={{ color: progress >= 40 && progress < 85 ? '#FFF' : '#888' }}>GROWING</span>
              <span style={{ color: progress >= 85 ? '#E50914' : '#888' }}>NOW</span>
            </div>

            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: '#E50914',
                  transition: 'width 0.1s linear'
                }}
              />
            </div>
          </div>
        </div>

        {/* Hold Button Control */}
        <div style={{ textAlign: 'center' }}>
          <button
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            style={{
              padding: '1rem 3rem',
              backgroundColor: '#E50914',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '30px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              userSelect: 'none',
              touchAction: 'none',
              boxShadow: '0 8px 30px rgba(229, 9, 20, 0.5)',
              transform: isHoldingRef.current ? 'scale(0.96)' : 'scale(1)',
              transition: 'transform 0.15s ease'
            }}
          >
            HOLD TO WATCH HIM GROW ⏱
          </button>

          {progress > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={reset}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#777',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Reset to beginning
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
