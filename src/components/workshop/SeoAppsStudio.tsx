import React, { useState } from 'react';
import { Search, Globe, CheckCircle2, Star, MessageSquare, Zap, Mail, ArrowUpRight, HelpCircle } from 'lucide-react';
import { SHOPIFY_ESSENTIAL_APPS } from '../../data/mockData';

export const SeoAppsStudio: React.FC = () => {
  const [seoTitle, setSeoTitle] = useState('Atelier Maison | Maroquinerie & Décoration Artisanale en Tunisie');
  const [seoDescription, setSeoDescription] = useState('Découvrez notre boutique d’artisanat d’art et de maroquinerie en cuir véritable. Confectionné à la main en Tunisie. Livraison express 24h-48h et paiement à la livraison.');
  const [seoSlug, setSeoSlug] = useState('ateliermasion.tn');

  const titleLength = seoTitle.length;
  const descLength = seoDescription.length;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3 pb-6 border-b border-stone-200">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full">
          Jalon 4 · Référencement Google & Applications
        </span>
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          SEO Naturel & Applications Essentielles
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Pour attirer des visiteurs qualifiés sans dépendre uniquement de la publicité payante (Facebook Ads), nous optimisons vos balises Google et configurons les applications clés indispensables à une TPE.
        </p>
      </div>

      {/* 1. Google SERP Simulator */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-amber-700" />
          <h3 className="text-lg font-serif font-bold text-stone-900">
            Simulateur de Résultat Google (SERP Preview)
          </h3>
        </div>

        {/* Live Preview Box */}
        <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <Globe className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-700">https://{seoSlug}</span>
          </div>

          <h4 className="text-base sm:text-lg text-blue-700 font-medium hover:underline cursor-pointer leading-snug line-clamp-1">
            {seoTitle || 'Titre de votre page sur Google'}
          </h4>

          <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
            {seoDescription || 'Renseignez une méta-description persuasive pour donner envie aux clients de cliquer.'}
          </p>
        </div>

        {/* Interactive Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-stone-800">Balise Titre SEO (Meta Title)</label>
              <span className={`text-[11px] font-mono tabular-nums ${titleLength > 60 ? 'text-amber-600 font-bold' : 'text-emerald-700'}`}>
                {titleLength}/60 car. {titleLength <= 60 ? '(Parfait)' : '(Trop long)'}
              </span>
            </div>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-md p-2.5 text-stone-900 focus:ring-1 focus:ring-stone-900"
            />
            <p className="text-[11px] text-stone-500">
              Astuce : Incluez le mot-clé principal ("artisanat tunisie", "maroquinerie") et le nom de votre marque.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-stone-800">Méta-description</label>
              <span className={`text-[11px] font-mono tabular-nums ${descLength > 160 ? 'text-amber-600 font-bold' : 'text-emerald-700'}`}>
                {descLength}/160 car. {descLength <= 160 ? '(Optimal)' : '(Risque d’être tronqué)'}
              </span>
            </div>
            <textarea
              rows={3}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-md p-2 text-stone-900 focus:ring-1 focus:ring-stone-900 leading-relaxed"
            />
            <p className="text-[11px] text-stone-500">
              Mentionnez vos atouts de réassurance : "Livraison rapide en Tunisie", "Paiement à la livraison".
            </p>
          </div>
        </div>
      </div>

      {/* 2. Essential Shopify Apps Ecosystem */}
      <div className="space-y-4 pt-6 border-t border-stone-200">
        <div>
          <h3 className="text-lg font-serif font-bold text-stone-900">
            Les 4 Applications Indispensables pour une TPE sur Shopify
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Sélectionnées pour leur plan gratuit généreux et leur impact direct sur la conversion et la réassurance en Tunisie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {SHOPIFY_ESSENTIAL_APPS.map((app) => (
            <div key={app.id} className="p-5 bg-stone-50/70 rounded-xl border border-stone-200 space-y-3 text-xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-wide">
                      {app.category}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 mt-0.5">{app.name}</h4>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded shrink-0">
                    {app.pricing}
                  </span>
                </div>

                <p className="text-stone-600 leading-relaxed">
                  {app.description}
                </p>

                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-950 text-[11px] leading-relaxed">
                  <strong>🎯 Valeur pour votre TPE :</strong> {app.whyEssentialForTPE}
                </div>
              </div>

              {/* Step checklist */}
              <div className="pt-3 border-t border-stone-200 space-y-1.5">
                <span className="text-[11px] font-semibold text-stone-700 block">
                  Guide d'installation ({app.setupMinutes} min) :
                </span>
                <ul className="space-y-1 text-[11px] text-stone-600">
                  {app.setupGuide.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-stone-700 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
