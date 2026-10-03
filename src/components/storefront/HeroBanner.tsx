import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onExploreCatalog: () => void;
  onExploreStory: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreCatalog, onExploreStory }) => {
  return (
    <section className="relative bg-stone-100 overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Collection Artisanale 2026 · Édition Limitée</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              La noblesse du cuir & des matières méditerranéennes.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Chaque pièce est méticuleusement conçue et façonnée à la main en Tunisie. Du cuir pleine fleur au tannage végétal jusqu’aux essences botaniques pures du Cap Bon.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-all shadow-sm hover:shadow flex items-center gap-2"
              >
                <span>Découvrir le Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreStory}
                className="px-6 py-3.5 bg-white text-stone-800 border border-stone-300 text-sm font-semibold rounded-lg hover:bg-stone-50 transition-colors"
              >
                Notre Atelier & Savoir-faire
              </button>
            </div>

            {/* Key Guarantees */}
            <div className="pt-6 border-t border-stone-200/70 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Paiement à la livraison sur toute la Tunisie</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Expédition suivie Aramex & Yalidine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                <span>Échange garanti sous 7 jours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 bg-stone-200">
              <img
                src="/src/assets/images/hero_artisan_leather_1790977959949.jpg"
                alt="Collection de maroquinerie artisanale de luxe en cuir tanné"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-3 bg-stone-900/60 backdrop-blur-md rounded-lg border border-white/10 text-xs flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Le Cabas Voyageur Pleine Fleur</p>
                  <p className="text-stone-300 text-[11px]">Façonné main · Tannage végétal naturel</p>
                </div>
                <span className="font-mono font-medium text-amber-300">185.00 DT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
