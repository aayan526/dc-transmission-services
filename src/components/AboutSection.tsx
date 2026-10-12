import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Phone, MapPin, Wrench } from 'lucide-react';
import { SHOP_INFO, SHOP_IMAGES } from '../data/shopData';
import { SafeImage } from './SafeImage';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-zinc-950 border-b border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Real Facility & Tom Fisher Photography (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl">
              <SafeImage
                src={SHOP_IMAGES.about}
                alt="Tom Fisher and D C Transmission Services Facility in Oklahoma City"
                fallbackTitle="D C Transmission Shop"
                fallbackSubtitle="4737 SE 29th St #5001, Oklahoma City, OK"
                aspectClass="aspect-[4/3]"
                className="w-full h-full object-cover"
              />
              <div className="p-4 bg-zinc-900/95 border-t border-zinc-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Oklahoma City Heritage
                </span>
                <p className="text-xs text-zinc-300 mt-1">
                  Tom Fisher at the SE 29th St shop — family owned and operated for over half a century.
                </p>
              </div>
            </div>

            {/* Handshake guarantee card */}
            <div className="p-5 bg-zinc-900 border border-amber-500/30 rounded-lg">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>The Standing Handshake Guarantee</span>
              </div>
              <p className="text-sm font-semibold text-white mt-2 italic">
                &ldquo;{SHOP_INFO.motto}&rdquo;
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                We believe in earning our pay through honest diagnosis and precision mechanical execution. If we can’t resolve your transmission problem, you owe us nothing.
              </p>
            </div>
          </div>

          {/* Right Column: Story & Credentials (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs font-bold uppercase tracking-wider text-amber-400">
              <Award className="w-3.5 h-3.5" />
              <span>50+ Years Family-Owned In Oklahoma City</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Rebuilding Automatic Transmissions With Integrity Since the 1970s
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              When automatic transmissions were all 3-speed hydraulic units with vacuum modulators, Tom Fisher was already at the workbench tearing them down. Over 45 years later, through 4-speed overdrives, electronically controlled 6-speeds, and modern 8- and 10-speed computerized units, Tom and his team have maintained one steadfast principle: <strong className="text-white">tell the customer the truth</strong>.
            </p>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Dealerships and franchise chain shops often push customers toward expensive $5,000 to $8,000 whole-unit crate replacements because their techs aren’t trained to diagnose inside the case. At <strong className="text-white">D C Transmission Services</strong>, we rebuild right here in our Oklahoma City shop. If a simple pressure solenoid, valve body gasket, or external cooler line is all that’s needed, that’s exactly what we fix.
            </p>

            {/* Credential highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-zinc-900/60 rounded border border-zinc-800">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Master Rebuild Bench</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Complete in-house ultrasonic cleaning, precision clearance gauging, and dyno-quality reassembly.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/60 rounded border border-zinc-800">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Local Community Roots</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Proudly serving Oklahoma City, Del City, Midwest City, Tinker Air Force Base families, and surrounding counties.
                </p>
              </div>
            </div>

            {/* Direct Phone Call Box */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-zinc-800">
              <a
                href={SHOP_INFO.phoneRaw}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold uppercase tracking-wider text-xs rounded transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Speak Directly With Tom: (405) 677-7454</span>
              </a>

              <span className="text-xs text-zinc-400 text-center sm:text-left">
                No automated phone trees — talk to real transmission builders.
              </span>
            </div>
          </div>
        </div>

        {/* Brand Partners Strip (logos.jpg) */}
        <div className="mt-16 pt-12 border-t border-zinc-800">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Certified Components, Fluids & Domestic/Foreign Drivetrain Partners
            </span>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-6 flex flex-col items-center justify-center">
            <SafeImage
              src={SHOP_IMAGES.logos}
              alt="D C Transmission Services Brand Partners & Affiliations"
              fallbackTitle="Certified Automotive Component Brands"
              fallbackSubtitle="OEM parts suppliers, Sonnax valve bodies, Transtar, and factory fluid specifications"
              aspectClass="h-auto max-h-20 w-auto"
              className="max-h-16 w-auto object-contain brightness-95 contrast-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
