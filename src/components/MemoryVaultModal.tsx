import React, { useState } from 'react';
import { MEDIA_ASSETS } from '../data/mediaManifest';
import { MediaCategory, MediaAsset } from '../types';
import { useStory } from '../context/StoryContext';
import { SmartImage } from './SmartImage';
import { X, Search, Play, Filter, Shield } from 'lucide-react';

interface MemoryVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemoryVaultModal: React.FC<MemoryVaultModalProps> = ({ isOpen, onClose }) => {
  const { setActiveModalMedia } = useStory();
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [query, setQuery] = useState<string>('');

  if (!isOpen) return null;

  const categories = [
    { id: 'ALL', label: 'ALL MEMORIES' },
    { id: 'EARLY_MEMORIES', label: 'THE LITTLE YEARS' },
    { id: 'PORTRAIT', label: 'PORTRAITS' },
    { id: 'BIRTHDAY', label: 'BIRTHDAYS' },
    { id: 'TRAVEL', label: 'TRAVEL' },
    { id: 'CANDID', label: 'CANDID & FUNNY' },
    { id: 'VIDEOS', label: 'ORIGINAL FILMS' }
  ];

  const filteredAssets = MEDIA_ASSETS.filter((item) => {
    if (item.type === 'audio') return false;
    const matchesCategory =
      activeTab === 'ALL'
        ? true
        : activeTab === 'VIDEOS'
        ? item.type === 'video'
        : item.category === activeTab;

    const matchesQuery = query
      ? item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.caption?.toLowerCase().includes(query.toLowerCase()) ||
        item.archiveCode.toLowerCase().includes(query.toLowerCase())
      : true;

    return matchesCategory && matchesQuery;
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0c0c0c',
        zIndex: 99900,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      {/* Top Header */}
      <div
        style={{
          padding: '1.25rem 2rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: '#121212'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Shield size={22} color="#E50914" />
          <div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.6rem',
                color: '#FFF',
                letterSpacing: '0.06em',
                lineHeight: 1
              }}
            >
              AARRAN’S MEMORY VAULT
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#888' }}>
              The complete unposted childhood archive ({MEDIA_ASSETS.length - 1} artifacts)
            </span>
          </div>
        </div>

        {/* Search input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={16}
              color="#888"
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Filter vault..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                backgroundColor: '#1c1c1c',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '4px',
                color: '#FFF',
                padding: '0.45rem 0.8rem 0.45rem 2.2rem',
                fontSize: '0.85rem',
                outline: 'none',
                width: '220px'
              }}
            />
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.8rem 2rem',
          backgroundColor: '#101010',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          overflowX: 'auto'
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '20px',
              border: activeTab === cat.id ? '1px solid #E50914' : '1px solid rgba(255,255,255,0.1)',
              backgroundColor: activeTab === cat.id ? 'rgba(229, 9, 20, 0.15)' : 'transparent',
              color: activeTab === cat.id ? '#FFF' : '#888',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filteredAssets.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveModalMedia(item);
                onClose();
              }}
              style={{
                height: '220px',
                position: 'relative',
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: '#161616',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#E50914';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.85)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <SmartImage
                src={item.file}
                alt={item.title}
                focalX={item.focalX}
                focalY={item.focalY}
                fillCard={true}
                blurBackgroundFallback={true}
              />

              {item.type === 'video' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(229, 9, 20, 0.85)',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    zIndex: 6
                  }}
                >
                  <Play size={12} fill="#FFF" />
                </div>
              )}

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.88) 0%, transparent 60%)',
                  zIndex: 3
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  zIndex: 5,
                  fontSize: '0.62rem',
                  fontFamily: 'monospace',
                  color: '#999',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  padding: '2px 5px',
                  borderRadius: '2px'
                }}
              >
                {item.archiveCode}
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  zIndex: 5
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#FFF', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#AAA', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
