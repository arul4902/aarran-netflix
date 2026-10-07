import React from 'react';
import { useStory } from '../context/StoryContext';
import { X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SecretEasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretEasterEggModal: React.FC<SecretEasterEggModalProps> = ({ isOpen, onClose }) => {
  const { easterEggCount } = useStory();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      <div
        style={{
          backgroundColor: '#161616',
          borderRadius: '12px',
          padding: '2.5rem',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid #E50914',
          boxShadow: '0 20px 60px rgba(229,9,20,0.4)',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#888',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          {easterEggCount >= 2 ? '🥚❤️🥚' : '🥚'}
        </div>

        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '2rem',
            color: '#FFF',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}
        >
          {easterEggCount >= 2 ? 'LIL EGGS COMPLETED!' : 'SECRET LIL EGG FOUND!'}
        </h3>

        {easterEggCount >= 2 ? (
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: '#FFD700',
                marginBottom: '1rem'
              }}
            >
              “Each other’s lil eggs. 🥚❤️🥚”
            </p>
            <p style={{ color: '#BBB', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              You discovered both hidden eggs in the archive. The bond between Yamini and Aarran is
              forever unbroken.
            </p>
          </div>
        ) : (
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.3rem',
                fontStyle: 'italic',
                color: '#FFF',
                marginBottom: '1rem'
              }}
            >
              “You found the first lil egg.”
            </p>
            <p style={{ color: '#BBB', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              There’s another one hidden somewhere further down in the archive footer...
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            backgroundColor: '#E50914',
            color: '#FFF',
            border: 'none',
            borderRadius: '4px',
            padding: '0.65rem 1.8rem',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          CONTINUE STREAMING
        </button>
      </div>
    </div>
  );
};
