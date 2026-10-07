import React from 'react';
import { STORY_DATA } from '../data/story';
import { X, Heart, Calendar, Film, Compass, Shield } from 'lucide-react';
import { AMonogram } from './AMonogram';

interface StoryInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryInfoModal: React.FC<StoryInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        zIndex: 99950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      <div
        style={{
          backgroundColor: '#181818',
          borderRadius: '8px',
          maxWidth: '620px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.95)',
          position: 'relative',
          padding: '2.5rem'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
          <AMonogram size={38} glow={true} />
          <div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
                fontSize: '2rem',
                color: '#FFF',
                letterSpacing: '0.06em',
                lineHeight: 1
              }}
            >
              YAMINI × AARRAN
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#E50914', fontWeight: 700, letterSpacing: '0.1em' }}>
              A MOTHER’S ARCHIVE
            </span>
          </div>
        </div>

        {/* Core Emotional Statement */}
        <div
          style={{
            backgroundColor: 'rgba(229,9,20,0.12)',
            borderLeft: '3px solid #E50914',
            padding: '1.25rem',
            borderRadius: '0 6px 6px 0',
            marginBottom: '2rem'
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.5rem',
              fontStyle: 'italic',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.3
            }}
          >
            “{STORY_DATA.coreQuote}”
          </p>
          <span style={{ fontSize: '0.75rem', color: '#B3B3B3', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px', display: 'block' }}>
            — {STORY_DATA.mother} to her son {STORY_DATA.son}
          </span>
        </div>

        {/* Story Facts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Calendar size={18} color="#E50914" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                December Special Connection
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#AAA', marginTop: '2px', lineHeight: 1.4 }}>
                Yamini and Aarran both celebrate their birthdays in December. One winter month, two
                milestones, one shared story.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Heart size={18} color="#E50914" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                “Lil Egg” Inside Joke 🥚❤️
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#AAA', marginTop: '2px', lineHeight: 1.4 }}>
                Yamini used to call Aarran “My lil egg”. In time, he started calling her the same. Now:
                “We are each other’s lil eggs.”
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Film size={18} color="#E50914" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                Things They Love Together
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#AAA', marginTop: '2px', lineHeight: 1.4 }}>
                Watching movies together at home and travelling across oceans — from replica towers to
                the top of Paris.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Shield size={18} color="#E50914" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 700 }}>
                The Unposted Archive
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#AAA', marginTop: '2px', lineHeight: 1.4 }}>
                “I couldn’t post every moment then. So I’m keeping them all here now. Not everything
                made it to social media, but everything made it into my heart.”
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.85rem',
              padding: '0.65rem 2rem',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            CLOSE ARCHIVE DETAILS
          </button>
        </div>
      </div>
    </div>
  );
};
