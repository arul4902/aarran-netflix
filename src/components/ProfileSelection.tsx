import React from 'react';
import { PROFILES } from '../data/story';
import { getAssetById } from '../data/mediaManifest';
import { SmartImage } from './SmartImage';

interface ProfileSelectionProps {
  onSelectProfile: (profileId: string) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onSelectProfile }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#141414',
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        animation: 'fadeIn 0.7s ease'
      }}
    >
      <div style={{ maxWidth: '960px', width: '100%', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 500,
            color: '#FFFFFF',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}
        >
          Who’s Watching?
        </h1>
        <p
          style={{
            color: '#808080',
            fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
            marginBottom: '3.5rem',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          Choose a perspective to stream Aarran’s childhood archive
        </p>

        {/* Profiles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 'clamp(1rem, 3vw, 2.5rem)',
            maxWidth: '820px',
            margin: '0 auto',
            justifyItems: 'center'
          }}
        >
          {PROFILES.map((profile) => {
            const avatarAsset = getAssetById(profile.avatarAssetId);
            return (
              <button
                key={profile.id}
                onClick={() => onSelectProfile(profile.id)}
                className="group"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  outline: 'none',
                  textAlign: 'center',
                  transition: 'transform 0.25s ease'
                }}
              >
                {/* Profile Box */}
                <div
                  style={{
                    width: 'clamp(110px, 14vw, 155px)',
                    height: 'clamp(110px, 14vw, 155px)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '3px solid transparent',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)',
                    transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                    position: 'relative',
                    backgroundColor: '#1f1f1f'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FFFFFF';
                    e.currentTarget.style.transform = 'scale(1.06)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.7)';
                  }}
                >
                  {avatarAsset ? (
                    <SmartImage
                      src={avatarAsset.file}
                      alt={profile.name}
                      focalX={avatarAsset.focalX}
                      focalY={avatarAsset.focalY}
                      fillCard={true}
                      blurBackgroundFallback={false}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#E50914',
                        color: '#FFF',
                        fontSize: '2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {profile.name[0]}
                    </div>
                  )}

                  {profile.id === 'lil-eggs' && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '6px',
                        right: '6px',
                        background: 'rgba(0,0,0,0.7)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}
                    >
                      🥚
                    </div>
                  )}
                </div>

                {/* Profile Name */}
                <span
                  style={{
                    marginTop: '0.85rem',
                    color: '#808080',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                    fontWeight: 500,
                    transition: 'color 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#808080';
                  }}
                >
                  {profile.name}
                </span>

                <span
                  style={{
                    fontSize: '0.75rem',
                    color: '#555555',
                    marginTop: '2px'
                  }}
                >
                  {profile.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Manage Profiles / Subtitle */}
        <div style={{ marginTop: '4rem' }}>
          <button
            onClick={() => onSelectProfile('lil-eggs')}
            style={{
              padding: '0.65rem 1.8rem',
              backgroundColor: 'transparent',
              color: '#808080',
              border: '1px solid #404040',
              borderRadius: '2px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#808080';
              e.currentTarget.style.borderColor = '#404040';
            }}
          >
            STREAM ALL MEMORIES
          </button>
        </div>
      </div>
    </div>
  );
};
