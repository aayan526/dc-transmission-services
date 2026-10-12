import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquareQuote, ThumbsUp, Filter } from 'lucide-react';
import { REVIEWS_LIST, SHOP_INFO } from '../data/shopData';

export const TestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'truck' | 'car' | 'diagnostic'>('all');

  const filteredReviews = REVIEWS_LIST.filter((review) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'truck') {
      return (
        review.vehicle.includes('Silverado') ||
        review.vehicle.includes('F-150') ||
        review.vehicle.includes('Ram') ||
        review.vehicle.includes('Yukon')
      );
    }
    if (activeFilter === 'car') {
      return review.vehicle.includes('Camry') || review.vehicle.includes('Odyssey');
    }
    if (activeFilter === 'diagnostic') {
      return (
        review.serviceType.includes('Solenoid') ||
        review.serviceType.includes('CV Axle') ||
        review.highlight.includes('honest') ||
        review.highlight.includes('Saved')
      );
    }
    return true;
  });

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-zinc-900 border-b border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with 4.6 Stars Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800 rounded text-xs font-bold uppercase tracking-wider text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Real Stories From Oklahoma Drivers
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              139 verified Google reviews with an average 4.6-star rating. Here is why drivers across Oklahoma City trust Tom Fisher when other shops say “replace the whole unit.”
            </p>
          </div>

          {/* Social Proof Aggregate Card */}
          <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-lg flex items-center gap-5 shrink-0">
            <div className="text-center pr-5 border-r border-zinc-800">
              <span className="text-3xl font-extrabold text-white font-mono tabular-nums">4.6</span>
              <div className="flex items-center gap-0.5 text-amber-400 my-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < 4 || i === 4 ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-zinc-400">Google Rating</span>
            </div>
            <div className="space-y-1 text-xs">
              <span className="font-bold text-white block">139 Verified Reviews</span>
              <span className="text-zinc-400 block">50+ Years in Del City & OKC</span>
              <span className="text-amber-400 font-medium block">100% Free Road Tests</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 pb-6 overflow-x-auto">
          <span className="text-xs font-bold uppercase text-zinc-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeFilter === 'all'
                ? 'bg-amber-400 text-zinc-950'
                : 'bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800'
            }`}
          >
            All Reviews ({REVIEWS_LIST.length})
          </button>
          <button
            onClick={() => setActiveFilter('truck')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeFilter === 'truck'
                ? 'bg-amber-400 text-zinc-950'
                : 'bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800'
            }`}
          >
            Trucks, Diesels & Towing
          </button>
          <button
            onClick={() => setActiveFilter('car')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeFilter === 'car'
                ? 'bg-amber-400 text-zinc-950'
                : 'bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800'
            }`}
          >
            Family Sedans & Vans
          </button>
          <button
            onClick={() => setActiveFilter('diagnostic')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeFilter === 'diagnostic'
                ? 'bg-amber-400 text-zinc-950'
                : 'bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800'
            }`}
          >
            Dealership Second Opinions
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-lg p-6 flex flex-col justify-between transition-colors shadow-sm"
            >
              <div className="space-y-4">
                {/* Header: Stars & Date */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-400">{rev.date}</span>
                </div>

                {/* Highlight Quote */}
                <p className="text-sm font-bold text-white leading-snug">
                  &ldquo;{rev.highlight}&rdquo;
                </p>

                {/* Full Body */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {rev.content}
                </p>
              </div>

              {/* Author and Vehicle Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{rev.author}</span>
                  <span className="text-[11px] text-zinc-400">{rev.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90 font-medium">
                  <CheckCircle className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="line-clamp-1">{rev.vehicle}</span>
                </div>
                <span className="text-[11px] text-zinc-400 block line-clamp-1">
                  Service: {rev.serviceType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
