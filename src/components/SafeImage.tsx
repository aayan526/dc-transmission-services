import React, { useState } from 'react';
import { Wrench, ShieldCheck } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  aspectClass?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle,
  aspectClass = 'aspect-video',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-900 via-neutral-900 to-zinc-950 border border-zinc-800 text-center overflow-hidden ${aspectClass} ${className}`}
        role="img"
        aria-label={alt || 'D C Transmission Services component'}
      >
        <div className="absolute inset-0 garage-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
            <Wrench className="w-6 h-6 stroke-[1.75]" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-zinc-200 uppercase">
            {fallbackTitle || alt || 'D C Transmission Facility'}
          </span>
          <span className="text-xs text-zinc-500 mt-1 max-w-[240px]">
            {fallbackSubtitle || 'Certified automatic transmission diagnostic bench'}
          </span>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-500/80 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tom Fisher Guarantee</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-zinc-950 ${aspectClass} ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-zinc-900/80 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-amber-500/40 border-t-amber-500 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
};
