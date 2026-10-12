import React, { useState } from 'react';
import { AlertTriangle, Wrench, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { SYMPTOMS_GUIDE } from '../data/shopData';

interface SymptomCheckerProps {
  onBookWithSymptom: (symptomTitle: string) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onBookWithSymptom }) => {
  const [selectedId, setSelectedId] = useState(SYMPTOMS_GUIDE[0].id);

  const selectedItem = SYMPTOMS_GUIDE.find((s) => s.id === selectedId) || SYMPTOMS_GUIDE[0];

  return (
    <section id="diagnostics" className="py-16 sm:py-24 bg-zinc-900 border-b border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800 rounded text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Garage Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Transmission Warning Signs & Symptom Checker
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 leading-relaxed">
            Is your car acting strange on the highway or clunking into gear? Select your symptom below to see the mechanical cause and Tom Fisher’s recommended action before serious damage occurs.
          </p>
        </div>

        {/* 2-Column Mechanical Diagnostic Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Symptom Selectors (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              Select What You Are Experiencing:
            </span>
            {SYMPTOMS_GUIDE.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-zinc-950 border-amber-400 text-white shadow-lg shadow-amber-500/5'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        isSelected ? 'bg-amber-400 ring-4 ring-amber-400/20' : 'bg-zinc-600'
                      }`}
                    />
                    <span className="text-sm font-bold">{item.title}</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-amber-400 translate-x-1' : 'text-zinc-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Diagnostic Analysis Panel (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-lg p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Diagnostic Analysis
              </span>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                {selectedItem.severity}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">
                {selectedItem.title}
              </h3>
              <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            {/* Mechanics insight */}
            <div className="p-4 bg-zinc-900/80 rounded border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span>Probable Mechanical Cause:</span>
              </div>
              <p className="text-sm text-zinc-200">
                {selectedItem.possibleCauses}
              </p>
            </div>

            {/* Recommended Action */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Tom Fisher’s Recommendation:
              </span>
              <div className="flex items-start gap-2.5 text-sm text-amber-300 font-semibold bg-amber-500/10 p-3 rounded border border-amber-500/20">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{selectedItem.recommendedService}</span>
              </div>
            </div>

            {/* Direct Action */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Covered by our $0 Free Road Test</span>
              </div>

              <button
                onClick={() => onBookWithSymptom(selectedItem.title)}
                className="w-full sm:w-auto px-5 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Schedule Diagnostic for this Symptom
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
