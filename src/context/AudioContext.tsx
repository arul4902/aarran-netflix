import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { STORY_DATA } from '../data/story';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  hasInteracted: boolean;
  startAudio: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (val: number) => void;
  duckAudio: () => void;
  unduckAudio: () => void;
  seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.65);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(290);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const isDuckedRef = useRef<boolean>(false);
  const targetVolumeRef = useRef<number>(0.65);

  useEffect(() => {
    const audio = new Audio(STORY_DATA.soundtrack.file);
    audio.loop = true;
    audio.volume = 0.65;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const startAudio = () => {
    setHasInteracted(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Audio play request handled:', e);
      });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(console.warn);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    targetVolumeRef.current = clamped;
    setVolumeState(clamped);
    if (audioRef.current && !isDuckedRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  const duckAudio = () => {
    if (!audioRef.current) return;
    isDuckedRef.current = true;
    // Smooth volume duck to 12%
    let cur = audioRef.current.volume;
    const step = () => {
      if (!isDuckedRef.current) return;
      cur = Math.max(0.1, cur - 0.08);
      if (audioRef.current) audioRef.current.volume = cur;
      if (cur > 0.12) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const unduckAudio = () => {
    if (!audioRef.current) return;
    isDuckedRef.current = false;
    // Smooth restore
    let cur = audioRef.current.volume;
    const target = targetVolumeRef.current;
    const step = () => {
      if (isDuckedRef.current) return;
      cur = Math.min(target, cur + 0.08);
      if (audioRef.current) audioRef.current.volume = cur;
      if (cur < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        currentTime,
        duration,
        hasInteracted,
        startAudio,
        togglePlay,
        toggleMute,
        setVolume,
        duckAudio,
        unduckAudio,
        seek
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within an AudioProvider');
  return ctx;
};
