import { useRef, useCallback, useEffect } from 'react';
import { Howl } from 'howler';
import { useSettingsStore } from '../stores';

export function useBgm() {
  const bgmRef = useRef<Howl | null>(null);
  const bgmVolume = useSettingsStore((s) => s.bgmVolume);

  const play = useCallback((src: string) => {
    if (bgmRef.current) {
      bgmRef.current.fade(bgmRef.current.volume(), 0, 500);
      setTimeout(() => bgmRef.current?.stop(), 500);
    }
    bgmRef.current = new Howl({
      src: [src],
      loop: true,
      volume: 0,
    });
    bgmRef.current.play();
    bgmRef.current.fade(0, bgmVolume, 1000);
  }, [bgmVolume]);

  const stop = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.fade(bgmRef.current.volume(), 0, 500);
      setTimeout(() => {
        bgmRef.current?.stop();
        bgmRef.current = null;
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume(bgmVolume);
    }
  }, [bgmVolume]);

  return { play, stop };
}

export function useSfx() {
  const sfxVolume = useSettingsStore((s) => s.sfxVolume);

  const play = useCallback((src: string) => {
    const sfx = new Howl({ src: [src], volume: sfxVolume });
    sfx.play();
  }, [sfxVolume]);

  return { play };
}
