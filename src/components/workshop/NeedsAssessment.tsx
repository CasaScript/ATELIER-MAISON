import React, { useState } from 'react';
import { Compass, CheckCircle2, Layout, ArrowRight, Sparkles, Navigation, Layers, ShieldCheck } from 'lucide-react';

export const NeedsAssessment: React.FC = () => {
  const [sector, setSector] = useState('artisanat');
  const [catalogSize, setCatalogSize] = useState('15-50');
  const [targetMarket, setTargetMarket] = useState('tunisia-export');
  const [averageBasket, setAverageBasket] = useState('100-200');

  return (
    <div className="space-y-8">
      {/* Strategic Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full">
            Jalon 1 · Conseil & Cadrage Stratégique
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Analyse des Besoins & Profil de votre TPE
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Pour garantir un lancement réussi sans dépenses superflues, nous personnalisons l’architecture technique et commerciale de votre boutique Shopify selon vos spécificités.
          </p>
        </div>

        {/* Diagnostic Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-stone-200">
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-2">
              1. Secteur d'activité & Typologie de produits :
            </label>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {[
                { id: 'artisanat', label: 'Artisanat d’art, Céramique & Déco', desc: 'Mise en valeur visuelle et textures' },
                { id: 'mode', label: 'Maroquinerie, Chaussures & Textile', desc: 'Gestion des variantes (couleur, taille)' },
                { id: 'cosmetiques', label: 'Soins naturels, Huiles & Parfumerie', desc: 'Réassurance ingrédients et routine' },
                { id: 'terroir', label: 'Épicerie fine & Produits du terroir tunisien', desc: 'Packs et commandes régulières' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSector(item.id)}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    sector === item.id
                      ? 'border-stone-900 bg-stone-50 font-semibold ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <p className="text-stone-900">{item.label}</p>
                  <p className="text-[11px] text-stone-500 font-normal">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-800 block mb-2">
              2. Taille du catalogue initial :
            </label>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {[
                { id: '1-10', label: '1 à 10 produits phares (Focus Mono/Micro collection)', desc: 'Idéal pour démarrer vite et tester la demande' },
                { id: '15-50', label: '15 à 50 références avec variantes (Gamme standard TPE)', desc: 'Structure optimale par collections thématiques' },
                { id: '50+', label: 'Plus de 50 références', desc: 'Nécessite des filtres avancés et recherche instantanée' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCatalogSize(item.id)}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    catalogSize === item.id
                      ? 'border-stone-900 bg-stone-50 font-semibold ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <p className="text-stone-900">{item.label}</p>
                  <p className="text-[11px] text-stone-500 font-normal">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-800 block mb-2">
              3. Marché cible & Devises :
            </label>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {[
                { id: 'tunisia-only', label: 'Marché Local Tunisien à 100% (DT)', desc: 'Focus Cash on Delivery (COD) et transporteurs express' },
                { id: 'tunisia-export', label: 'Tunisie (DT) + Export / Diaspora (EUR / USD)', desc: 'Multi-devises automatique avec paiements CB internationaux' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTargetMarket(item.id)}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    targetMarket === item.id
                      ? 'border-stone-900 bg-stone-50 font-semibold ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <p className="text-stone-900">{item.label}</p>
                  <p className="text-[11px] text-stone-500 font-normal">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-800 block mb-2">
              4. Panier moyen envisagé :
            </label>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {[
                { id: '30-70', label: 'Moins de 70 DT', desc: 'Volume important, seuil de livraison offerte conseillé à 90 DT' },
                { id: '100-200', label: 'Entre 100 DT et 200 DT', desc: 'Panier idéal pour amortir les frais de livraison (8 DT)' },
                { id: '200+', label: 'Plus de 200 DT (Haut de gamme / Pièces d’exception)', desc: 'Livraison offerte par défaut et packaging premium' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAverageBasket(item.id)}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    averageBasket === item.id
                      ? 'border-stone-900 bg-stone-50 font-semibold ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <p className="text-stone-900">{item.label}</p>
                  <p className="text-[11px] text-stone-500 font-normal">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Site Architecture & Wireframe */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full">
            Recommandation d'Arborescence & Navigation
          </span>
          <h3 className="text-xl font-serif font-bold text-stone-900">
            Structure Optimisée du Site & Parcours Client TPE
          </h3>
          <p className="text-xs sm:text-sm text-stone-600">
            Architecture conçue pour maximiser le taux de conversion sur mobile (85% du trafic e-commerce en Tunisie).
          </p>
        </div>

        {/* Tree Map Visual Representation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
          {/* Column 1: Header & Entry */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <Navigation className="w-4 h-4 text-amber-700" />
              <span>1. Navigation Principale</span>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-600 pl-2 border-l-2 border-amber-300">
              <li><strong>Accueil :</strong> Bannière Hero + Collections phares</li>
              <li><strong>Boutique :</strong> Catalogue avec filtres par catégorie</li>
              <li><strong>Notre Histoire :</strong> Storytelling atelier & savoir-faire</li>
              <li><strong>FAQ & Expédition :</strong> Réassurance délais et livraison</li>
              <li><strong>Devise :</strong> Sélecteur DT / EUR / USD</li>
            </ul>
          </div>

          {/* Column 2: Homepage Hierarchy */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <Layout className="w-4 h-4 text-amber-700" />
              <span>2. Page d'Accueil (5 Blocs)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-600 pl-2 border-l-2 border-amber-300">
              <li>1. Bandeau promo (Livraison offerte dès 150 DT)</li>
              <li>2. Hero visuel avec appel à l'action immédiat</li>
              <li>3. Grille de 6 produits best-sellers</li>
              <li>4. Encadré "Savoir-faire artisanal"</li>
              <li>5. Témoignages & widget avis clients</li>
            </ul>
          </div>

          {/* Column 3: High Conversion PDP */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>3. Fiche Produit (PDP)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-600 pl-2 border-l-2 border-amber-300">
              <li>• Galerie HD avec zoom et photos portées</li>
              <li>• Sélecteur clair de variantes (couleurs, formats)</li>
              <li>• Bouton d'achat visible sans scroller</li>
              <li>• Rappel : "Livraison 24h-48h par Aramex/Yalidine"</li>
              <li>• Mention : "Paiement en espèces à la livraison"</li>
            </ul>
          </div>

          {/* Column 4: Frictionless Checkout */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>4. Tunnel de Commande</span>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-600 pl-2 border-l-2 border-amber-300">
              <li>• Tiroir panier (Cart Drawer) avec jauge livraison</li>
              <li>• Formulaire simplifié (Nom, Téléphone, Gouvernorat)</li>
              <li>• Choix du transporteur transparent</li>
              <li>• Option Cash on Delivery (COD) mise en avant</li>
              <li>• Confirmation instantanée par SMS / E-mail</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
