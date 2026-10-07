import React, { useState } from 'react';
import { AMonogram } from './AMonogram';
import { useStory } from '../context/StoryContext';

interface FooterProps {
  onOpenVault: () => void;
  onOpenEasterEggModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVault, onOpenEasterEggModal }) => {
  const { incrementEasterEgg, easterEggCount, showToast } = useStory();
  const [egg2Found, setEgg2Found] = useState<boolean>(false);

  const handleEgg2Click = () => {
    setEgg2Found(true);
    incrementEasterEgg();
    showToast('🥚 Second lil egg found! “Each other’s lil eggs.” 🥚❤️🥚');
    setTimeout(() => {
      onOpenEasterEggModal();
    }, 600);
  };

  return (
    <footer
      style={{
        backgroundColor: '#0c0c0c',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="streaming-container">
        {/* Top Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2.5rem' }}>
          <AMonogram size={32} glow={false} />
          <div>
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.4rem',
                color: '#FFF',
                letterSpacing: '0.08em',
                lineHeight: 1
              }}
            >
              AARRAN
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '0.65rem',
                color: '#E50914',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
            >
              YAMINI’S PERSONAL ARCHIVE
            </span>
          </div>
        </div>

        {/* Links Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}
        >
          <div>
            <h5 style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.85rem' }}>
              Archive
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <a href="#hero" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Hero Home
                </a>
              </li>
              <li>
                <a href="#episodes" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Episode Shelf
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenVault}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#888',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left'
                  }}
                >
                  The Unposted Vault
                </button>
              </li>
              <li>
                <a href="#moms-list" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Mom’s List ❤️
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.85rem' }}>
              Chapters
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <a href="#childhood" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
                  The Little Years
                </a>
              </li>
              <li>
                <a href="#mom-and-me" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Mom & Me
                </a>
              </li>
              <li>
                <a href="#lil-eggs" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Lil Eggs 🥚
                </a>
              </li>
              <li>
                <a href="#birthdays" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
                  December Special
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.85rem' }}>
              Adventures
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <a href="#adventures" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Paris & Beyond
                </a>
              </li>
              <li>
                <a href="#favourites" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Movie Nights
                </a>
              </li>
              <li>
                <a href="#credits" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
                  End Credits
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.85rem' }}>
              Dedication
            </h5>
            <p style={{ color: '#777', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Dedicated from Yamini to her beloved son Aarran.
              <br />
              <strong style={{ color: '#FFF' }}>“My purpose in life is him.”</strong>
            </p>
          </div>
        </div>

        {/* Bottom Bar with Secret Easter Egg #2 */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            color: '#555',
            fontSize: '0.75rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} YAMINI × AARRAN • ALL MEMORIES PRESERVED WITH LOVE
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Archived by Mom ❤️</span>
            {/* Secret Easter Egg #2 */}
            <button
              onClick={handleEgg2Click}
              title="Another curious egg..."
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                opacity: egg2Found || easterEggCount >= 2 ? 0.9 : 0.35,
                transform: egg2Found ? 'scale(1.3)' : 'scale(1)',
                transition: 'all 0.3s ease',
                padding: '2px'
              }}
            >
              🥚
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
