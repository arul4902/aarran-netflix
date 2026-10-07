import React, { createContext, useContext, useEffect, useState } from 'react';
import { MediaAsset, MediaCategory, Episode } from '../types';

interface StoryContextType {
  currentProfile: string | null;
  setCurrentProfile: (id: string | null) => void;
  momPov: boolean;
  setMomPov: React.Dispatch<React.SetStateAction<boolean>>;
  favourites: string[];
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  activeModalMedia: MediaAsset | null;
  setActiveModalMedia: (media: MediaAsset | null) => void;
  activeEpisodeModal: Episode | null;
  setActiveEpisodeModal: (ep: Episode | null) => void;
  timeMachineActive: boolean;
  setTimeMachineActive: (active: boolean) => void;
  easterEggCount: number;
  incrementEasterEgg: () => void;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: MediaCategory;
  setSelectedCategory: (cat: MediaCategory) => void;
  hasPassedIntro: boolean;
  setHasPassedIntro: (passed: boolean) => void;
  hasPassedPlayGate: boolean;
  setHasPassedPlayGate: (passed: boolean) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

const FAV_STORAGE_KEY = 'yamini_aarran_favs_v1';

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState<string | null>(null);
  const [hasPassedIntro, setHasPassedIntro] = useState<boolean>(false);
  const [hasPassedPlayGate, setHasPassedPlayGate] = useState<boolean>(false);
  const [momPov, setMomPov] = useState<boolean>(false);
  const [activeModalMedia, setActiveModalMedia] = useState<MediaAsset | null>(null);
  const [activeEpisodeModal, setActiveEpisodeModal] = useState<Episode | null>(null);
  const [timeMachineActive, setTimeMachineActive] = useState<boolean>(false);
  const [easterEggCount, setEasterEggCount] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>('ALL');

  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAV_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['big-heart-hero', 'turns-5-spiderman', 'kurti-pout'];
    } catch {
      return ['big-heart-hero', 'turns-5-spiderman', 'kurti-pout'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favourites));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [favourites]);

  const toggleFavourite = (id: string) => {
    setFavourites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from Mom’s List');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Added to Mom’s List ❤️');
        return [...prev, id];
      }
    });
  };

  const isFavourite = (id: string) => favourites.includes(id);

  const incrementEasterEgg = () => {
    setEasterEggCount((prev) => Math.min(2, prev + 1));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  return (
    <StoryContext.Provider
      value={{
        currentProfile,
        setCurrentProfile,
        momPov,
        setMomPov,
        favourites,
        toggleFavourite,
        isFavourite,
        activeModalMedia,
        setActiveModalMedia,
        activeEpisodeModal,
        setActiveEpisodeModal,
        timeMachineActive,
        setTimeMachineActive,
        easterEggCount,
        incrementEasterEgg,
        isPaused,
        setIsPaused,
        toastMessage,
        showToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        hasPassedIntro,
        setHasPassedIntro,
        hasPassedPlayGate,
        setHasPassedPlayGate
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error('useStory must be used within StoryProvider');
  return ctx;
};
