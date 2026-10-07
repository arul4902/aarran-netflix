import React from 'react';
import { Film, Compass, Cake, Heart, Sparkles } from 'lucide-react';

export const TheLittleThings: React.FC = () => {
  const littleThings = [
    { label: 'Movie nights 🎬', target: '#favourites', desc: 'Curling up to our favorite stories' },
    { label: 'Travelling together ✈️', target: '#adventures', desc: 'From replica Eiffel to real Paris' },
    { label: 'December birthdays 🎂', target: '#birthdays', desc: 'One winter month, two celebrations' },
    { label: '“Lil egg” 🥚', target: '#lil-eggs', desc: 'Each other’s inside joke forever' },
    { label: 'Mom & son ❤️', target: '#mom-and-me', desc: '“My purpose in life is him”' }
  ];

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        backgroundColor: '#0d0d0d',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container" style={{ textAlign: 'center' }}>
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
          CORE HIGHLIGHTS
        </span>

        <h2
          style={{
            fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
            fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
            color: '#FFFFFF',
            letterSpacing: '0.04em',
            lineHeight: 1,
            marginBottom: '1rem'
          }}
        >
          THE LITTLE THINGS
        </h2>

        {/* Floating Tag Cards */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            maxWidth: '840px',
            margin: '2rem auto 3rem'
          }}
        >
          {littleThings.map((thing, idx) => (
            <a
              key={idx}
              href={thing.target}
              style={{
                textDecoration: 'none',
                backgroundColor: '#181818',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '30px',
                padding: '0.75rem 1.6rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                color: '#FFF',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.92rem',
                fontWeight: 600,
                boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#E50914';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#181818';
              }}
            >
              <span>{thing.label}</span>
            </a>
          ))}
        </div>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.3rem, 2.4vw, 1.8rem)',
            fontStyle: 'italic',
            color: '#E0E0E0',
            maxWidth: '620px',
            margin: '0 auto',
            lineHeight: 1.4
          }}
        >
          “Maybe the little things were actually the big things.”
        </p>
      </div>
    </section>
  );
};
