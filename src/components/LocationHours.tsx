import React from 'react';
import { MapPin, Clock, Phone, Navigation, ShieldCheck, Car, ExternalLink } from 'lucide-react';
import { SHOP_INFO } from '../data/shopData';
import { getShopOpenStatus } from '../utils/shopHours';

export const LocationHours: React.FC = () => {
  const shopStatus = getShopOpenStatus();

  // Encoded embed URL for 4737 SE 29th St, Oklahoma City, OK 73115
  const mapEmbedUrl = `https://maps.google.com/maps?q=4737+SE+29th+St+%235001,+Oklahoma+City,+OK+73115&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-16 sm:py-24 bg-zinc-900 border-b border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800 rounded text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Oklahoma City Shop Facility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Hours & Location
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 leading-relaxed">
            Conveniently located on SE 29th Street between Sunnylane Rd and Sooner Rd in the Del City / Oklahoma City corridor, just minutes from I-40, I-35, and Tinker Air Force Base.
          </p>
        </div>

        {/* 2-Column Layout: Hours & Details on Left, Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Hours Card & Directions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Live Status Card */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 space-y-4 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Shop Operating Hours
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold ${
                    shopStatus.isOpen
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      shopStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
                    }`}
                  />
                  {shopStatus.statusText}
                </span>
              </div>

              {/* Hours Table */}
              <div className="space-y-2 text-xs">
                {SHOP_INFO.scheduleDetails.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 border-b border-zinc-900 last:border-0"
                  >
                    <span className="font-semibold text-zinc-300">{item.day}</span>
                    <span
                      className={`font-mono font-medium ${
                        item.hours === 'Closed' ? 'text-zinc-400' : 'text-white'
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key drop note */}
              <div className="p-3 bg-zinc-900/80 rounded border border-zinc-800 text-xs text-zinc-400 flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Need early or after-hours drop-off?</strong> Use our secure overnight key drop slot located beside the front counter door.
                </span>
              </div>
            </div>

            {/* Address & Direct Actions */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Physical Address
                </span>
                <p className="text-base font-bold text-white">{SHOP_INFO.address}</p>
                <p className="text-xs text-zinc-400 mt-1">
                  SE 29th St industrial strip · Suite #5001 · Drive up to the main bay doors
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                </a>

                <a
                  href={SHOP_INFO.phoneRaw}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-bold text-xs rounded transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>(405) 677-7454</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Interactive Map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 shadow-xl flex-1 min-h-[380px] lg:min-h-[460px]">
              <iframe
                title="D C Transmission Services Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                className="w-full h-full min-h-[380px] lg:min-h-[460px] border-0 grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating map banner overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-lg flex items-center justify-between gap-4 pointer-events-auto">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-amber-400 text-zinc-950 font-black text-xs flex items-center justify-center">
                    DC
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      D C Transmission Services
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      4737 SE 29th St #5001, OKC
                    </span>
                  </div>
                </div>

                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 shrink-0"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
