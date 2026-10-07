import React, { useEffect, useState } from 'react';
import { AMonogram } from './AMonogram';
import { useStory } from '../context/StoryContext';
import { useAudio } from '../context/AudioContext';
import { PROFILES } from '../data/story';
import { getAssetById } from '../data/mediaManifest';
import { Search, Volume2, VolumeX, Heart, Sparkles, User, RotateCcw } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenShuffle?: () => void;
  onOpenTimeMachine?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTimeMachine }) => {
  const {
    currentProfile,
    setCurrentProfile,
    momPov,
    setMomPov,
    favourites,
    incrementEasterEgg,
    searchQuery,
    setSearchQuery,
    showToast
  } = useStory();

  const { isPlaying, isMuted, togglePlay, toggleMute } = useAudio();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [eggClicked, setEggClicked] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeProfile = PROFILES.find((p) => p.id === currentProfile) || PROFILES[0];
  const avatarAsset = getAssetById(activeProfile.avatarAssetId);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Childhood', href: '#childhood' },
    { label: 'Mom & Me', href: '#mom-and-me' },
    { label: 'Adventures', href: '#adventures' },
    { label: 'Birthdays', href: '#birthdays' },
    { label: 'Our Favourites', href: '#favourites' },
    { label: 'Episodes', href: '#episodes' }
  ];

  const handleEgg1Click = () => {
    if (!eggClicked) {
      setEggClicked(true);
      incrementEasterEgg();
      showToast('🥚 You found the first lil egg! There’s another one hidden below...');
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? '#141414' : 'transparent',
        backgroundImage: isScrolled
          ? 'none'
          : 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 65%, transparent 100%)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent'
      }}
    >
      <div
        className="streaming-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
          gap: '1.25rem'
        }}
      >
        {/* Left Section: Monogram + Nav items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a
            href="#hero"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none'
            }}
          >
            <AMonogram size={34} glow={true} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
                  fontSize: '1.35rem',
                  letterSpacing: '0.12em',
                  color: '#FFFFFF',
                  lineHeight: 1
                }}
              >
                AARRAN
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.55rem',
                  letterSpacing: '0.22em',
                  color: '#E50914',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              >
                A Mother’s Archive
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.25rem'
            }}
            className="md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: '#B3B3B3',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.01em'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#B3B3B3')}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Section: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Rewind Time Machine Button */}
          {onOpenTimeMachine && (
            <button
              onClick={onOpenTimeMachine}
              title="Time Machine (Rewind)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#B3B3B3',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '20px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = '#B3B3B3';
              }}
            >
              <RotateCcw size={13} color="#E50914" />
              <span className="hidden sm:inline">REWIND</span>
            </button>
          )}

          {/* Mom POV Toggle */}
          <button
            onClick={() => {
              setMomPov((prev) => !prev);
              showToast(!momPov ? 'Mom’s POV Enabled ❤️' : 'Standard View Enabled');
            }}
            title="Toggle Mom’s Perspective"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: momPov ? 'rgba(229, 9, 20, 0.2)' : 'transparent',
              color: momPov ? '#FFFFFF' : '#888888',
              border: momPov ? '1px solid #E50914' : '1px solid rgba(255,255,255,0.15)',
              borderRadius: '20px',
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              transition: 'all 0.25s ease'
            }}
          >
            <Sparkles size={13} color={momPov ? '#E50914' : '#888888'} />
            <span className="hidden sm:inline">MOM’S POV</span>
          </button>

          {/* Search Bar / Input */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {searchOpen ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search memories, trips, cakes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    border: '1px solid #E50914',
                    borderRadius: '4px',
                    color: '#FFF',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.82rem',
                    outline: 'none',
                    width: 'clamp(150px, 22vw, 240px)',
                    fontFamily: "'Inter', sans-serif"
                  }}
                  onBlur={() => {
                    if (!searchQuery) setSearchOpen(false);
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                title="Search Archive"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {/* Audio Soundtrack Mini-Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <button
              onClick={togglePlay}
              title={isPlaying ? 'Pause Never Grow Up' : 'Play Never Grow Up'}
              style={{
                background: 'none',
                border: 'none',
                color: isPlaying ? '#E50914' : '#888888',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s ease'
              }}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Favourites count badge */}
          <a
            href="#moms-list"
            title="Mom’s List"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: favourites.length > 0 ? '#E50914' : '#666',
              position: 'relative',
              padding: '6px'
            }}
          >
            <Heart size={18} fill={favourites.length > 0 ? '#E50914' : 'none'} />
            {favourites.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '1px',
                  right: '0px',
                  backgroundColor: '#FFFFFF',
                  color: '#000',
                  borderRadius: '10px',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  padding: '1px 4px',
                  lineHeight: 1
                }}
              >
                {favourites.length}
              </span>
            )}
          </a>

          {/* Secret Easter Egg #1 hidden in Navbar! */}
          <button
            onClick={handleEgg1Click}
            title="A curious little spot..."
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.85rem',
              opacity: eggClicked ? 0.9 : 0.35,
              transform: eggClicked ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.3s ease',
              padding: '4px'
            }}
          >
            🥚
          </button>

          {/* Profile Avatar & Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1.5px solid rgba(255,255,255,0.3)',
                background: '#222',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {avatarAsset ? (
                <img
                  src={avatarAsset.file}
                  alt={activeProfile.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <User size={16} color="#FFF" />
              )}
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div
                className="glass-dropdown"
                style={{
                  position: 'absolute',
                  top: '42px',
                  right: 0,
                  width: '180px',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                  zIndex: 2000
                }}
              >
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: '#777',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.4rem 0.6rem'
                  }}
                >
                  Switch Perspective
                </div>
                {PROFILES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCurrentProfile(p.id);
                      setProfileDropdownOpen(false);
                      showToast(`Switched to ${p.name}`);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.5rem 0.6rem',
                      background: 'none',
                      border: 'none',
                      color: p.id === currentProfile ? '#E50914' : '#DDD',
                      fontSize: '0.82rem',
                      fontFamily: "'Inter', sans-serif",
                      cursor: 'pointer',
                      borderRadius: '4px',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
