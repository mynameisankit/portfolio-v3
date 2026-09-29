'use client';
import { useEffect, useState } from 'react';

export function useIsPastFold() {
  const [isPastFold, setIsPastFold] = useState(false);

  useEffect(() => {
    const updateIsPastFold = () => {
      setIsPastFold(window.scrollY >= window.innerHeight);
    };

    updateIsPastFold();
    window.addEventListener('resize', updateIsPastFold);
    window.addEventListener('scroll', updateIsPastFold, { passive: true });

    return () => {
      window.removeEventListener('resize', updateIsPastFold);
      window.removeEventListener('scroll', updateIsPastFold);
    };
  }, []);

  return isPastFold;
}
