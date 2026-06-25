import { create } from 'zustand';

export type TextSpeed = 'slow' | 'normal' | 'fast';

interface SettingsState {
  textSpeed: TextSpeed;
  bgmVolume: number;
  sfxVolume: number;
  voiceEnabled: boolean;
  voiceVolume: number;
  autoPlay: boolean;

  setTextSpeed: (speed: TextSpeed) => void;
  setBgmVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  setVoiceVolume: (volume: number) => void;
  setAutoPlay: (autoPlay: boolean) => void;
}

export const TEXT_SPEED_MS: Record<TextSpeed, number> = {
  slow: 70,
  normal: 30,
  fast: 15,
};

export const useSettingsStore = create<SettingsState>((set) => ({
  textSpeed: 'normal',
  bgmVolume: 0.7,
  sfxVolume: 0.8,
  voiceEnabled: true,
  voiceVolume: 0.8,
  autoPlay: false,

  setTextSpeed: (textSpeed) => set({ textSpeed }),
  setBgmVolume: (bgmVolume) => set({ bgmVolume: Math.max(0, Math.min(1, bgmVolume)) }),
  setSfxVolume: (sfxVolume) => set({ sfxVolume: Math.max(0, Math.min(1, sfxVolume)) }),
  setVoiceEnabled: (voiceEnabled) => set({ voiceEnabled }),
  setVoiceVolume: (voiceVolume) => set({ voiceVolume: Math.max(0, Math.min(1, voiceVolume)) }),
  setAutoPlay: (autoPlay) => set({ autoPlay }),
}));
