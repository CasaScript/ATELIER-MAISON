import React from 'react';
import { Sparkles, Shield, HeartHandshake, Compass } from 'lucide-react';

interface AboutPageProps {
  onBackToCatalog: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToCatalog }) => {
  return (
    <div className="py-16 sm:py-20 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-3 py-1 rounded-full">
            Notre Atelier & Savoir-faire
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight">
            L'excellence de la tradition artisanale, l'exigence du design contemporain.
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Fondée en Tunisie avec la passion des matières vivantes, Atelier Maison rassemble des maîtres maroquiniers, céramistes et formulateurs botaniques autour d'une ambition commune : créer des objets intemporels empreints de sens.
          </p>
        </div>

        {/* Big Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-200">
            <img
              src="/src/assets/images/hero_artisan_leather_1790977959949.jpg"
              alt="Artisan maroquinier dans son atelier"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Des matières premières locales d'une pureté rare
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Nous sélectionnons rigoureusement nos matières premières auprès de partenaires éthiques. Nos cuirs sont tannés végétalement sans chrome à partir d'extraits d'écorces de mimosa et de châtaignier. Nos huiles botaniques proviennent des oliveraies et figueraies bio du Sahel et du Cap Bon.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 text-amber-900 rounded-lg shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900">Tannage Végétal Respectueux</h3>
                  <p className="text-xs text-stone-500">Un cuir qui respire, développe une patine d'or avec le temps et respecte l'artisan et l'environnement.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 text-amber-900 rounded-lg shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900">Économie Circulaire & Locale</h3>
                  <p className="text-xs text-stone-500">Chaque achat soutient directement l’emploi artisanal tunisien et perpétue un patrimoine millénaire.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-stone-200">
          <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2">
            <span className="text-2xl">🌿</span>
            <h3 className="text-sm font-bold text-stone-900">Transparence Totale</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Aucun intermédiaire opaque. Nos ateliers sont ouverts aux visites et nos fiches produits détaillent l'exacte composition de chaque pièce.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2">
            <span className="text-2xl">⏳</span>
            <h3 className="text-sm font-bold text-stone-900">Durabilité & Réparabilité</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Nous concevons des objets faits pour durer des décennies. Toutes nos coutures et pièces métalliques sont garanties 2 ans.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2">
            <span className="text-2xl">📦</span>
            <h3 className="text-sm font-bold text-stone-900">Emballage Éco-conçu</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Cartons 100% recyclés et pochons en coton brut non teinté réutilisables pour protéger vos pièces durant l’expédition.
            </p>
          </div>
        </div>

        {/* Back CTA */}
        <div className="text-center pt-8">
          <button
            onClick={onBackToCatalog}
            className="px-6 py-3 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
          >
            Découvrir nos créations artisanales
          </button>
        </div>
      </div>
    </div>
  );
};
