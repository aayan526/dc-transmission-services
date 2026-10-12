import React, { useState, useEffect } from 'react';
import { Phone, Calendar, ShieldCheck, ChevronLeft, ChevronRight, Award, CheckCircle2 } from 'lucide-react';
import { SHOP_INFO, HERO_SLIDES } from '../data/shopData';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative bg-zinc-950 pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-zinc-800/80 overflow-hidden">
      {/* Background industrial grid pattern */}
      <div className="absolute inset-0 garage-grid opacity-25 pointer-events-none" />

      {/* Subtle safety amber ambient gradient */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Copy & Conversion Triggers (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tom Fisher Motto Trust Card */}
            <div className="inline-flex items-center gap-2.5 py-1.5 px-3 bg-zinc-900 border border-amber-500/30 rounded text-xs font-semibold text-amber-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Tom’s Ironclad Guarantee: &ldquo;{SHOP_INFO.motto}&rdquo;</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white leading-[1.12]">
              Automatic Transmission Repair & Rebuild Specialists in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
                Oklahoma City
              </span>
            </h1>

            {/* Sub-headline / Concrete Value Proposition */}
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
              Family-owned for over 50 years on SE 29th Street. Owner Tom Fisher brings 45+ years of hands-on rebuilding mastery to every transmission. We perform genuine multi-point road tests and computer scans — with zero charge to find out what is wrong.
            </p>

            {/* Reassurance Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm font-semibold text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Free Road Test & Diagnostic Scan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Domestic Trucks, SUVs & Foreign Imports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Written Upfront Estimates — Never Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Comprehensive Rebuild Warranties Available</span>
              </div>
            </div>

            {/* Primary Action Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-zinc-950 font-bold uppercase tracking-wider text-sm rounded shadow-lg shadow-amber-500/10 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Road Test</span>
              </button>

              <a
                href={SHOP_INFO.phoneRaw}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700/80 font-bold text-sm rounded transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Tom: (405) 677-7454</span>
              </a>
            </div>

            {/* Secondary Trust Signpost */}
            <div className="flex items-center gap-4 pt-1 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5 font-medium">
                <Award className="w-4 h-4 text-amber-500" />
                <span>4737 SE 29th St #5001, Oklahoma City</span>
              </div>
              <span className="text-zinc-600">·</span>
              <span>Mon–Fri 8am–5pm</span>
              <span className="text-zinc-600">·</span>
              <span className="text-amber-400/90 font-medium">Walk-ins Welcome</span>
            </div>
          </div>

          {/* Right Column: Real Photo Slider (5 cols on desktop) */}
          <div
            className="lg:col-span-5 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Frame with industrial border */}
            <div className="relative rounded-lg overflow-hidden border border-zinc-700/80 bg-zinc-900 shadow-2xl">
              {/* Top Slider Header Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-2.5 py-1 bg-zinc-950/90 backdrop-blur-sm border border-zinc-800 rounded text-[11px] font-semibold text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Verified Shop Photo {currentSlide + 1} of {HERO_SLIDES.length}</span>
              </div>

              {/* Slider Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                {HERO_SLIDES.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <SafeImage
                      src={slide.image}
                      alt={slide.title}
                      fallbackTitle={slide.title}
                      fallbackSubtitle={slide.caption}
                      aspectClass="h-full w-full"
                      className="object-cover h-full w-full"
                    />
                    {/* Contrast Gradient for Caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  </div>
                ))}
              </div>

              {/* Slide Caption Box */}
              <div className="relative z-20 p-4 bg-zinc-900 border-t border-zinc-800/80">
                <p className="text-sm font-bold text-white tracking-wide">
                  {HERO_SLIDES[currentSlide].title}
                </p>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {HERO_SLIDES[currentSlide].caption}
                </p>

                {/* Slider Controls */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800/60">
                  {/* Dots indicator */}
                  <div className="flex items-center gap-1.5">
                    {HERO_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          idx === currentSlide ? 'w-6 bg-amber-400' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Prev / Next buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Garage Trust Tag */}
            <div className="mt-3 p-3 bg-zinc-900/80 border border-zinc-800 rounded text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
              <span className="font-semibold text-amber-400">Shop Hours:</span>
              <span>Mon–Fri 8:00 AM – 5:00 PM</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300">Oklahoma City, OK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
