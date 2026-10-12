import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Clock, MapPin, Calendar, ShieldCheck } from 'lucide-react';
import { SHOP_INFO, SHOP_IMAGES } from '../data/shopData';
import { getShopOpenStatus } from '../utils/shopHours';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopStatus, setShopStatus] = useState(getShopOpenStatus());
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Update status every 60s
    const timer = setInterval(() => {
      setShopStatus(getShopOpenStatus());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#about' },
    { label: 'Diagnostic Tool', href: '#diagnostics' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location & Hours', href: '#location' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-zinc-950 border-b border-zinc-800 text-xs text-zinc-300 py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>4737 SE 29th St #5001, Oklahoma City, OK 73115</span>
            </span>
            <span className="text-zinc-600 hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{SHOP_INFO.hours}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium ${
              shopStatus.isOpen ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' : 'bg-zinc-800/80 text-zinc-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${shopStatus.isOpen ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
              {shopStatus.statusText}
            </span>
            <a
              href={SHOP_INFO.phoneRaw}
              className="flex items-center gap-1.5 font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              <span>(405) 677-7454</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Top Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/90 shadow-xl py-3'
            : 'bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark / Logo */}
          <a
            href="#"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
            aria-label="D C Transmission Services Home"
          >
            {!logoFailed ? (
              <img
                src={SHOP_IMAGES.logo}
                alt="D C Transmission Services Logo"
                className="h-9 sm:h-11 w-auto object-contain brightness-110 drop-shadow"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded bg-amber-500 text-zinc-950 font-black text-lg flex items-center justify-center font-mono">
                  DC
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-white leading-tight">
                    D C TRANSMISSION
                  </span>
                  <span className="text-[10px] tracking-widest text-amber-400 font-semibold uppercase">
                    Oklahoma City
                  </span>
                </div>
              </div>
            )}
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Phone call pill on small/medium screens */}
            <a
              href={SHOP_INFO.phoneRaw}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-zinc-200 bg-zinc-900 border border-zinc-700/80 rounded hover:bg-zinc-800 transition-colors"
              aria-label="Call D C Transmission Services"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">(405) 677-7454</span>
              <span className="sm:hidden">Call</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded transition-all duration-150 shadow-md shadow-amber-500/10 cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Free Road Test</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded border border-zinc-800 transition-colors cursor-pointer"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-zinc-950 flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          {/* Header row in mobile overlay: Clean brand and prominent close button */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-amber-500 text-zinc-950 font-black text-sm flex items-center justify-center font-mono">
                DC
              </div>
              <span className="font-extrabold text-sm text-white tracking-wide">
                D C TRANSMISSION SERVICES
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-300 hover:text-white rounded bg-zinc-900 border border-zinc-700/80 cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6 text-amber-400" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="w-full text-left py-3 px-3 rounded-lg text-lg font-bold text-zinc-200 hover:text-amber-400 hover:bg-zinc-900/80 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Quick Actions in Menu */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-amber-400 text-zinc-950 font-bold uppercase tracking-wider text-sm rounded shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Road Test</span>
              </button>

              <a
                href={SHOP_INFO.phoneRaw}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-zinc-900 border border-amber-500/40 text-amber-400 font-bold text-sm rounded hover:bg-zinc-800"
              >
                <Phone className="w-4 h-4" />
                <span>Call Tom Fisher: (405) 677-7454</span>
              </a>
            </div>

            {/* Shop badge & details */}
            <div className="p-4 bg-zinc-900/60 rounded border border-zinc-800/80 space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{SHOP_INFO.motto}</span>
              </div>
              <p className="text-zinc-400">{SHOP_INFO.address}</p>
              <p className="text-amber-400/90 font-medium">{shopStatus.statusText}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
