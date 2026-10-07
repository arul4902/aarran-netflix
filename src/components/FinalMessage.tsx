import React from 'react';
import { getAssetById } from '../data/mediaManifest';
import { SmartImage } from './SmartImage';

export const FinalMessage: React.FC = () => {
  const childhood = getAssetById('day-1')!;
  const adventure = getAssetById('real-eiffel')!;
  const birthday = getAssetById('turns-5-spiderman')!;
  const current = getAssetById('kurti-pout')!;

  const emotionalSteps = [
    { quote: '“Through every version of you…”', asset: childhood },
    { quote: '“…every adventure…”', asset: adventure },
    { quote: '“…every birthday…”', asset: birthday },
    { quote: '“…and every chapter still ahead…”', asset: current }
  ];

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '7rem',
        paddingBottom: '7rem',
        backgroundColor: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div className="streaming-container">
        {/* 4-Stage Visual Sequence */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1080px',
            margin: '0 auto 4.5rem'
          }}
        >
          {emotionalSteps.map((step, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '240px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  backgroundColor: '#161616',
                  marginBottom: '1rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <SmartImage
                  src={step.asset.file}
                  alt={step.quote}
                  focalX={step.asset.focalX}
                  focalY={step.asset.focalY}
                  fillCard={true}
                  blurBackgroundFallback={true}
                />
              </div>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  color: '#CCCCCC',
                  lineHeight: 1.3
                }}
              >
                {step.quote}
              </p>
            </div>
          ))}
        </div>

        {/* Climax Statement */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
              fontStyle: 'italic',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '1.5rem'
            }}
          >
            “My purpose in life is him.”
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.1rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#E50914',
              fontWeight: 700
            }}
          >
            — YAMINI
          </p>

          <div style={{ fontSize: '1.4rem', marginTop: '1rem' }}>
            🥚❤️🥚
          </div>
        </div>
      </div>
    </section>
  );
};
