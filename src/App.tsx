import React, { useState } from 'react';
import { useStory } from './context/StoryContext';
import { useAudio } from './context/AudioContext';
import { IntroSequence } from './components/IntroSequence';
import { ProfileSelection } from './components/ProfileSelection';
import { PressPlayExperience } from './components/PressPlayExperience';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ContinueWatchingShelf } from './components/ContinueWatchingShelf';
import { Episode01LittleYears } from './components/Episode01LittleYears';
import { UnpostedArchive } from './components/UnpostedArchive';
import { MomAndMe } from './components/MomAndMe';
import { LilEggs } from './components/LilEggs';
import { DecemberSpecial } from './components/DecemberSpecial';
import { MovieNights } from './components/MovieNights';
import { TravelTogether } from './components/TravelTogether';
import { TooManyToChoose } from './components/TooManyToChoose';
import { BecauseIWasntPosting } from './components/BecauseIWasntPosting';
import { ThenNowSlider } from './components/ThenNowSlider';
import { HoldToGrow } from './components/HoldToGrow';
import { DigitalPolaroid } from './components/DigitalPolaroid';
import { MemoryShuffle } from './components/MemoryShuffle';
import { MomsList } from './components/MomsList';
import { TheLittleThings } from './components/TheLittleThings';
import { NextSeasonTeaser } from './components/NextSeasonTeaser';
import { FinalMessage } from './components/FinalMessage';
import { EndCredits } from './components/EndCredits';
import { Footer } from './components/Footer';

import { MemoryPlayerModal } from './components/MemoryPlayerModal';
import { Episode09TeenModal } from './components/Episode09Teen';
import { StoryInfoModal } from './components/StoryInfoModal';
import { MemoryVaultModal } from './components/MemoryVaultModal';
import { TimeMachineModal } from './components/TimeMachineModal';
import { SecretEasterEggModal } from './components/SecretEasterEggModal';
import { CinematicPauseScreen } from './components/CinematicPauseScreen';
import { TimelineRibbon } from './components/TimelineRibbon';
import { MemoryRemote } from './components/MemoryRemote';
import { getAssetById } from './data/mediaManifest';
import { Episode } from './types';

export const AppContent: React.FC = () => {
  const {
    hasPassedIntro,
    setHasPassedIntro,
    currentProfile,
    setCurrentProfile,
    hasPassedPlayGate,
    setHasPassedPlayGate,
    activeModalMedia,
    setActiveModalMedia,
    activeEpisodeModal,
    setActiveEpisodeModal,
    timeMachineActive,
    setTimeMachineActive,
    easterEggCount,
    isPaused,
    setIsPaused,
    toastMessage,
    showToast
  } = useStory();

  const [teenModalOpen, setTeenModalOpen] = useState<boolean>(false);
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
  const [vaultModalOpen, setVaultModalOpen] = useState<boolean>(false);
  const [easterEggModalOpen, setEasterEggModalOpen] = useState<boolean>(false);

  // 1. Initial Cinematic Intro
  if (!hasPassedIntro) {
    return <IntroSequence onComplete={() => setHasPassedIntro(true)} />;
  }

  // 2. Who's Watching Profile Picker
  if (!currentProfile) {
    return (
      <ProfileSelection
        onSelectProfile={(profileId) => {
          setCurrentProfile(profileId);
        }}
      />
    );
  }

  // 3. Press Play On His Childhood Gate (Montage & Audio Unlock)
  if (!hasPassedPlayGate) {
    return <PressPlayExperience onComplete={() => setHasPassedPlayGate(true)} />;
  }

  const handleSelectEpisode = (ep: Episode) => {
    const asset = getAssetById(ep.thumbnailAssetId);
    if (asset) {
      setActiveModalMedia(asset);
    }
  };

  const handlePlayStoryHero = () => {
    // Open hero video or high-res moment
    const heroAsset = getAssetById('big-heart-hero');
    if (heroAsset) setActiveModalMedia(heroAsset);
  };

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: '#FFFFFF' }}>
      {/* Top Navbar */}
      <Navbar
        onOpenTimeMachine={() => setTimeMachineActive(true)}
      />

      {/* Main Streaming Sections */}
      <main>
        <HeroSection
          onPlayStory={handlePlayStoryHero}
          onOpenMoreInfo={() => setInfoModalOpen(true)}
        />

        <ContinueWatchingShelf
          onSelectEpisode={handleSelectEpisode}
          onOpenTeenModal={() => setTeenModalOpen(true)}
        />

        <Episode01LittleYears />

        <UnpostedArchive onOpenVault={() => setVaultModalOpen(true)} />

        <MomAndMe />

        <LilEggs />

        <DecemberSpecial />

        <MovieNights />

        <TravelTogether />

        <TooManyToChoose />

        <BecauseIWasntPosting />

        <ThenNowSlider />

        <HoldToGrow />

        <DigitalPolaroid />

        <MemoryShuffle />

        <MomsList />

        <TheLittleThings />

        <NextSeasonTeaser />

        <FinalMessage />

        <EndCredits />
      </main>

      {/* Footer */}
      <Footer
        onOpenVault={() => setVaultModalOpen(true)}
        onOpenEasterEggModal={() => setEasterEggModalOpen(true)}
      />

      {/* Desktop Sticky Progress Ribbon */}
      <TimelineRibbon />

      {/* Floating Streaming Remote */}
      <MemoryRemote onPlayMemory={handlePlayStoryHero} />

      {/* Modals & Overlays */}
      <MemoryPlayerModal
        media={activeModalMedia}
        onClose={() => setActiveModalMedia(null)}
      />

      <Episode09TeenModal
        isOpen={teenModalOpen}
        onClose={() => setTeenModalOpen(false)}
      />

      <StoryInfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
      />

      <MemoryVaultModal
        isOpen={vaultModalOpen}
        onClose={() => setVaultModalOpen(false)}
      />

      <TimeMachineModal
        isOpen={timeMachineActive}
        onClose={() => setTimeMachineActive(false)}
      />

      <SecretEasterEggModal
        isOpen={easterEggModalOpen}
        onClose={() => setEasterEggModalOpen(false)}
      />

      <CinematicPauseScreen
        isOpen={isPaused}
        onResume={() => setIsPaused(false)}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1f1f1f',
            border: '1px solid #E50914',
            color: '#FFFFFF',
            padding: '0.65rem 1.6rem',
            borderRadius: '24px',
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: '0 10px 30px rgba(0,0,0,0.85)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
