import React, { useEffect, useState } from 'react';

export const TimelineRibbon: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const milestones = [
    { label: 'CHILDHOOD', threshold: 10, href: '#childhood' },
    { label: 'MOM & ME', threshold: 35, href: '#mom-and-me' },
    { label: 'ADVENTURES', threshold: 60, href: '#adventures' },
    { label: 'NOW', threshold: 85, href: '#credits' },
    { label: 'TEEN', threshold: 100, href: '#episodes', isOpen: true }
  ];

  return (
    <div
      className="hidden md:flex"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 800,
        backgroundColor: 'rgba(12, 12, 12, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        height: '34px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(1rem, 3vw, 2.5rem)',
          fontSize: '0.68rem',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          letterSpacing: '0.12em'
        }}
      >
        {milestones.map((m, idx) => {
          const isPassed = scrollProgress >= m.threshold;
          const isTeen = m.label === 'TEEN';

          return (
            <React.Fragment key={m.label}>
              <a
                href={m.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  textDecoration: 'none',
                  color: isPassed && !isTeen ? '#FFFFFF' : isTeen ? '#E50914' : '#666666',
                  transition: 'color 0.25s ease'
                }}
              >
                {/* Node icon: filled ● vs unfilled ○ for TEEN */}
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: isTeen
                      ? 'transparent'
                      : isPassed
                      ? '#E50914'
                      : '#444444',
                    border: isTeen
                      ? '1.5px solid #E50914'
                      : isPassed
                      ? '1px solid #FF3333'
                      : '1px solid #555555'
                  }}
                />
                <span>{m.label}</span>
              </a>

              {idx < milestones.length - 1 && (
                <div
                  style={{
                    width: 'clamp(20px, 4vw, 50px)',
                    height: '1px',
                    backgroundColor: isPassed ? '#E50914' : 'rgba(255,255,255,0.12)',
                    transition: 'background-color 0.3s ease'
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
