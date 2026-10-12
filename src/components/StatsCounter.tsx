import React, { useState, useEffect, useRef } from 'react';
import { Star, Shield, Award, Wrench, DollarSign } from 'lucide-react';
import { SHOP_INFO } from '../data/shopData';

export const StatsCounter: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Counter values state
  const [yearsBusiness, setYearsBusiness] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [ratingVal, setRatingVal] = useState(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setYearsBusiness(50);
      setYearsExperience(45);
      setReviewsCount(139);
      setRatingVal(4.6);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 1200;
          const start = performance.now();

          const step = (timestamp: number) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setYearsBusiness(Math.floor(ease * 50));
            setYearsExperience(Math.floor(ease * 45));
            setReviewsCount(Math.floor(ease * 139));
            setRatingVal(parseFloat((ease * 4.6).toFixed(1)));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setYearsBusiness(50);
              setYearsExperience(45);
              setReviewsCount(139);
              setRatingVal(4.6);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Safety fallback: if not triggered within 2 seconds, force target values
    const fallback = setTimeout(() => {
      setYearsBusiness(50);
      setYearsExperience(45);
      setReviewsCount(139);
      setRatingVal(4.6);
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [hasAnimated]);

  const stats = [
    {
      icon: Award,
      value: `${yearsBusiness}+`,
      label: 'Years in Business',
      detail: 'Family-owned OKC landmark since 1970s',
    },
    {
      icon: Wrench,
      value: `${yearsExperience}+`,
      label: 'Years Experience',
      detail: 'Tom Fisher transmission rebuilding mastery',
    },
    {
      icon: Star,
      value: `${ratingVal.toFixed(1)} ★`,
      label: 'Customer Rating',
      detail: `Across ${reviewsCount} verified Google reviews`,
    },
    {
      icon: DollarSign,
      value: '$0',
      label: 'Road Test & Scan',
      detail: 'Zero diagnostic fee before any work starts',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-zinc-900 border-b border-zinc-800 py-8 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center px-4 ${
                  idx !== 0 ? 'pt-6 sm:pt-0' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-5 h-5 text-amber-400" />
                  <span className="font-mono text-3xl sm:text-4xl lg:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">
                  {stat.label}
                </span>
                <span className="text-xs text-zinc-400 mt-1 max-w-[200px] leading-snug">
                  {stat.detail}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
