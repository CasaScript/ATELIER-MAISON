import React, { useState } from 'react';
import { Check, Sparkles, Zap, ExternalLink, ShieldCheck } from 'lucide-react';
import { SHOPIFY_THEMES } from '../../data/mockData';
import { ShopifyTheme } from '../../types';

interface ThemeSelectorProps {
  selectedThemeId: string;
  onSelectTheme: (themeId: string) => void;
  onPreviewStorefront: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedThemeId,
  onSelectTheme,
  onPreviewStorefront,
}) => {
  const [activeTheme, setActiveTheme] = useState<ShopifyTheme>(
    SHOPIFY_THEMES.find((t) => t.id === selectedThemeId) || SHOPIFY_THEMES[0]
  );

  const handleSelect = (t: ShopifyTheme) => {
    setActiveTheme(t);
    onSelectTheme(t.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-8">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full">
          Recommandation & Benchmark des Thèmes Shopify
        </span>
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          Sélection du Thème Optimal pour votre Activité
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Pour une TPE, nous préconisons des thèmes ultra-légers (Online Store 2.0). Ils vous évitent d'acheter un thème commercial à 350$ souvent ralenti par des scripts inutiles, tout en garantissant un score Google supérieur à 95/100.
        </p>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SHOPIFY_THEMES.map((theme) => {
          const isSelected = selectedThemeId === theme.id;
          return (
            <div
              key={theme.id}
              onClick={() => handleSelect(theme)}
              className={`p-6 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-stone-900 bg-stone-50/80 shadow-md ring-2 ring-stone-900/10'
                  : 'border-stone-200 hover:border-stone-300 bg-white'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {theme.badge && (
                      <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                        {theme.badge}
                      </span>
                    )}
                    <h3 className="text-lg font-serif font-bold text-stone-900">
                      {theme.name}
                    </h3>
                  </div>

                  {/* Performance Speed Badge */}
                  <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md text-xs font-mono font-bold tabular-nums shrink-0">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{theme.speedScore}/100</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {theme.description}
                </p>

                <div className="space-y-1.5 text-xs text-stone-700 pt-2 border-t border-stone-200/70">
                  <p><strong>Idéal pour :</strong> {theme.bestFor}</p>
                  <p><strong>Coût licence :</strong> <span className="font-semibold text-emerald-800">{theme.price}</span></p>
                </div>

                {/* Key features list */}
                <ul className="space-y-1 text-xs text-stone-600 pt-2 border-t border-stone-200/70">
                  {theme.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-stone-800 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selection button */}
              <div className="pt-6 mt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(theme);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Thème Actif sur la Boutique</span>
                    </>
                  ) : (
                    <span>Activer ce thème</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(theme);
                    onPreviewStorefront();
                  }}
                  className="text-xs text-stone-600 hover:text-stone-900 underline font-medium"
                >
                  Tester en direct
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
