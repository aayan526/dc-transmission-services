import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, ArrowUp } from 'lucide-react';
import { SHOP_INFO } from '../data/shopData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 text-xs">
      {/* Upper Footer: Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-amber-400 text-zinc-950 font-black text-sm flex items-center justify-center font-mono">
                DC
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                D C TRANSMISSION SERVICES
              </span>
            </div>

            <p className="text-zinc-400 leading-relaxed text-xs">
              Family-owned automatic transmission repair and complete bench rebuilds in Oklahoma City for over 50 years. Master rebuilder Tom Fisher brings 45+ years of hands-on expertise to every vehicle.
            </p>

            <div className="p-3 bg-zinc-900 border border-amber-500/30 rounded text-amber-300 font-semibold italic text-[11px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>&ldquo;{SHOP_INFO.motto}&rdquo;</span>
            </div>
          </div>

          {/* Service Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Core Services
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Automatic Transmission Rebuilds
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Fluid Flush & Filter Pan Drop
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Domestic Pickups & Foreign Imports
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  CV Joints, Half-Shafts & Axles
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Free Road Test & Computer Scan
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Transparent Written Estimates
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Nav (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Quick Links
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  About Tom Fisher
                </a>
              </li>
              <li>
                <a href="#diagnostics" className="hover:text-amber-400 transition-colors">
                  Symptom Checker
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  139 Google Reviews
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  Shop Map & Directions
                </a>
              </li>
              <li>
                <a href="#book" className="hover:text-amber-400 transition-colors">
                  Schedule Appointment
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  Emergency Towing Info
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Oklahoma City Facility
            </span>
            <div className="space-y-2 text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>4737 SE 29th St #5001, Oklahoma City, OK 73115</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href={SHOP_INFO.phoneRaw}
                  className="font-bold text-white hover:text-amber-400 transition-colors"
                >
                  (405) 677-7454
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Mon–Fri: 8:00 AM – 5:00 PM (Sat–Sun: Closed)</span>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-800 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Demo Disclaimer & Copyright Bar */}
      <div className="border-t border-zinc-800/80 bg-zinc-950 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-zinc-500 text-[11px]">
            © {new Date().getFullYear()} D C Transmission Services. All rights reserved. Del City & Oklahoma City, Oklahoma.
          </p>

          {/* Mandatory client disclaimer */}
          <div className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-400/90 font-medium text-[11px] tracking-wide">
            Design concept by Aayan Qasim — demo only, not the official site.
          </div>
        </div>
      </div>
    </footer>
  );
};
