import React, { useState } from 'react';
import { Wrench, Shield, Check, ArrowRight, AlertCircle, Phone, Calendar, Info } from 'lucide-react';
import { SERVICES_LIST, SHOP_INFO } from '../data/shopData';
import { ServiceItem } from '../types';
import { SafeImage } from './SafeImage';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-16 sm:py-24 bg-zinc-950 border-b border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs font-bold uppercase tracking-wider text-amber-400">
            <Wrench className="w-3.5 h-3.5" />
            <span>In-House Precision Auto Repair</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Specialized Automatic Transmission Services
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            From minor solenoid replacements and preventative fluid maintenance to full ground-up bench rebuilds. We diagnose with honesty before we ever quote.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/50 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/5"
            >
              {/* Photo Area */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                <SafeImage
                  src={service.image}
                  alt={service.altText}
                  fallbackTitle={service.title}
                  aspectClass="h-full w-full"
                  className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase bg-zinc-950/90 border border-zinc-700 text-amber-400 rounded">
                    {service.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Warning symptoms bullet list */}
                  <div className="mt-4 pt-4 border-t border-zinc-800/80">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                      Common Warning Signs:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {service.symptoms.slice(0, 3).map((symptom, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500/80 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center gap-2">
                  <button
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Service</span>
                  </button>

                  <button
                    onClick={() => setActiveModalService(service)}
                    className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold rounded border border-zinc-700 transition-colors cursor-pointer"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Road Test Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-zinc-900 border border-amber-500/30 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Shield className="w-4 h-4" />
              <span>Tom’s Free Diagnostic Policy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Not sure what’s wrong with your car? Don’t pay for guesswork.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              Drive in to 4737 SE 29th St or book a slot. We take your vehicle on a free road test, scan computer trouble codes, and tell you straight what it needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => onSelectServiceForBooking('free-road-test-diagnostics')}
              className="py-3 px-5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded shadow transition-colors cursor-pointer"
            >
              Book Free Road Test
            </button>
            <a
              href={SHOP_INFO.phoneRaw}
              className="py-3 px-5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded border border-zinc-700 text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>(405) 677-7454</span>
            </a>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {activeModalService.badge}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {activeModalService.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded bg-zinc-800 cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {activeModalService.fullDesc}
            </p>

            {/* Inclusions */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                What’s Included In This Service:
              </h4>
              <ul className="space-y-2">
                {activeModalService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-200">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warranty / Guarantee info */}
            <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-300 flex items-center gap-3">
              <Shield className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Warranty & Guarantee:</span>
                <span>{activeModalService.warrantyInfo}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const sId = activeModalService.id;
                  setActiveModalService(null);
                  onSelectServiceForBooking(sId);
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded cursor-pointer"
              >
                Schedule Appointment For This Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
