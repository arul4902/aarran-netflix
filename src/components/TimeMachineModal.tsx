import React, { useEffect, useState } from 'react';
import { getAssetById } from '../data/mediaManifest';
import { SmartImage } from './SmartImage';
import { RotateCcw, ArrowRight } from 'lucide-react';

interface TimeMachineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TimeMachineModal: React.FC<TimeMachineModalProps> = ({ isOpen, onClose }) => {
  const [rewindProgress, setRewindProgress] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const babyMemory = getAssetById('day-1')!;

  useEffect(() => {
    if (!isOpen) {
      setRewindProgress(0);
      setIsFinished(false);
      return;
    }

    const t1 = setTimeout(() => setRewindProgress(30), 400);
    const t2 = setTimeout(() => setRewindProgress(70), 900);
    const t3 = setTimeout(() => {
      setRewindProgress(100);
      setIsFinished(true);
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.96)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '640px', width: '100%' }}>
        {!isFinished ? (
          <div>
            <div
              style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 1.5rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(229,9,20,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E50914',
                animation: 'spinReverse 1s linear infinite'
              }}
            >
              <RotateCcw size={32} />
            </div>

            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '3rem',
                color: '#FFF',
                letterSpacing: '0.08em',
                marginBottom: '0.5rem'
              }}
            >
              REWINDING...
            </h3>

            <p style={{ color: '#888', fontSize: '0.9rem', fontFamily: 'monospace' }}>
              REVERSING TO EARLIEST CAPTURED ARCHIVE
            </p>
          </div>
        ) : (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            {/* Early Childhood photo */}
            <div
              style={{
                width: '280px',
                height: '350px',
                margin: '0 auto 2rem',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 0 50px rgba(229, 9, 20, 0.4)',
                border: '2px solid #E50914'
              }}
            >
              <SmartImage
                src={babyMemory.file}
                alt={babyMemory.title}
                focalX={babyMemory.focalX}
                focalY={babyMemory.focalY}
                fillCard={true}
                blurBackgroundFallback={true}
              />
            </div>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '2.4rem',
                fontStyle: 'italic',
                color: '#FFF',
                marginBottom: '1rem'
              }}
            >
              “Back to when he was this little. ❤️”
            </h3>

            <p style={{ color: '#BBB', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
              Day 1 in the world — where every milestone and adventure first started.
            </p>

            <button
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#E50914',
                color: '#FFF',
                border: 'none',
                borderRadius: '4px',
                padding: '0.85rem 2.2rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>RETURN TO PRESENT</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};
