'use client';
import { useEffect, useRef, useState } from 'react';
import { connectPixelHero, type HeroStatus } from './pixelHeroController.utils';

export function usePixelHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controller = useRef<ReturnType<typeof connectPixelHero>>(null);
  const [status, setStatus] = useState<HeroStatus>({
    isRunning: false,
    generation: 0,
    isReducedMotion: false,
  });
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const connection = connectPixelHero(canvasRef.current, setStatus);
    controller.current = connection;

    return () => {
      connection?.dispose();
      controller.current = null;
    };
  }, []);

  return {
    canvasRef,
    ...status,
    run: () => controller.current?.run(),
    reset: () => controller.current?.reset(),
  };
}
