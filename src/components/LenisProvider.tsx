import React, { useEffect } from 'react';
import Lenis from 'lenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Force all reveal elements immediately
      document.querySelectorAll('.safety-reveal, [data-animate]').forEach((el) => {
        el.classList.add('safety-revealed');
      });
      return;
    }

    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis initialization skipped:', e);
    }

    // Safety-net pattern: force reveals if any element is still hidden after scroll or 1.5s
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('.safety-reveal').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
    }, 1500);

    return () => {
      clearTimeout(safetyTimer);
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
};
