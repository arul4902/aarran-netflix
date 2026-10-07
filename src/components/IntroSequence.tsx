import React, { useEffect, useState } from 'react';
import { AMonogram } from './AMonogram';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Step 0: Warm light & "Some memories were never posted." (0s - 1.8s)
    // Step 1: "But they were never forgotten." (1.8s - 3.4s)
    // Step 2: "YAMINI PRESENTS" (3.4s - 4.6s)
    // Step 3: Red line forms 'A' Monogram + "AARRAN" + "AN ORIGINAL STORY BY MOM" (4.6s - 6.5s)
    // Step 4: Fade to black & complete (6.8s)

    const t1 = setTimeout(() => setStep(1), 1800);
    const t2 = setTimeout(() => setStep(2), 3400);
    const t3 = setTimeout(() => setStep(3), 4600);
    const t4 = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onComplete, 700);
    }, 6600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(onComplete, 400);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden'
      }}
    >
      {/* Tiny Warm Light Glow */}
      <div
        style={{
          position: 'absolute',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.28) 0%, rgba(255, 140, 50, 0.12) 35%, transparent 70%)',
          filter: 'blur(50px)',
          transform: step >= 3 ? 'scale(1.8)' : 'scale(1)',
          transition: 'transform 1.8s ease, opacity 1s ease',
          opacity: step === 0 ? 0.6 : step >= 3 ? 0.9 : 0.4,
          pointerEvents: 'none'
        }}
      />

      {/* Light streaks behind monogram */}
      {step >= 3 && (
        <div
          style={{
            position: 'absolute',
            width: '100vw',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(229, 9, 20, 0.8) 50%, transparent 100%)',
            boxShadow: '0 0 25px #E50914',
            animation: 'pulseGlow 2s infinite ease-in-out',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Content Container */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '2rem' }}>
        {step === 0 && (
          <div
            style={{
              animation: 'fadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)',
              fontStyle: 'italic',
              color: '#F0F0F0',
              letterSpacing: '0.04em'
            }}
          >
            “Some memories were never posted.”
          </div>
        )}

        {step === 1 && (
          <div
            style={{
              animation: 'fadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)',
              fontStyle: 'italic',
              color: '#FFFFFF',
              letterSpacing: '0.04em'
            }}
          >
            “But they were never forgotten.”
          </div>
        )}

        {step === 2 && (
          <div
            style={{
              animation: 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)',
              fontWeight: 700,
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: '#B3B3B3'
            }}
          >
            YAMINI PRESENTS
          </div>
        )}

        {step >= 3 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Cinematic A Monogram */}
            <div style={{ transform: 'scale(1.35)', marginBottom: '1.25rem' }}>
              <AMonogram size={78} glow={true} animated={true} />
            </div>

            <h1
              style={{
                fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                letterSpacing: '0.12em',
                color: '#FFFFFF',
                lineHeight: 1,
                marginBottom: '0.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.8)'
              }}
            >
              AARRAN
            </h1>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#E50914',
                fontWeight: 600
              }}
            >
              AN ORIGINAL STORY BY MOM
            </p>
          </div>
        )}
      </div>

      {/* Skip Intro Button */}
      <button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '2.5rem',
          padding: '0.6rem 1.4rem',
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          color: '#B3B3B3',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '4px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          zIndex: 20
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#FFFFFF';
          e.currentTarget.style.borderColor = '#FFFFFF';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#B3B3B3';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
        }}
      >
        SKIP INTRO
      </button>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
