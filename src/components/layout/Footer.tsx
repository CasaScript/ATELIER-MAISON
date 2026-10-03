import React from 'react';
import { ShieldCheck, Truck, CreditCard, Clock } from 'lucide-react';

interface FooterProps {
  onOpenLegalModal: (tab: 'cgv' | 'privacy' | 'shipping') => void;
  onNavigatePage: (page: 'home' | 'catalog' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal, onNavigatePage }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      {/* Trust & Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Livraison 24h à 48h</h4>
              <p className="text-xs text-stone-400 mt-1">Partenaires officiels Aramex, Yalidine & First Delivery sur les 24 gouvernorats.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Paiement à la Livraison</h4>
              <p className="text-xs text-stone-400 mt-1">Réglez en espèces directement auprès du livreur à la réception de votre colis.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Qualité Artisanale 100%</h4>
              <p className="text-xs text-stone-400 mt-1">Matières premières nobles sélectionnées et confection soignée en atelier.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Support WhatsApp 7j/7</h4>
              <p className="text-xs text-stone-400 mt-1">Équipe réactive basée à Tunis pour vous conseiller et suivre votre colis.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Overview */}
        <div className="space-y-4">
          <span className="text-xl font-serif font-bold text-white tracking-wide block">
            ATELIER MAISON
          </span>
          <p className="text-xs leading-relaxed text-stone-400">
            Maison d’artisanat d’art et de création contemporaine. Nous valorisons les matières nobles et le savoir-faire méditerranéen à travers des pièces durables et élégantes.
          </p>
          <div className="text-xs text-stone-500 space-y-1">
            <p>Atelier & Showroom : La Marsa, Tunis</p>
            <p>Tél / WhatsApp : +216 71 000 000</p>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li>
              <button onClick={() => onNavigatePage('home')} className="hover:text-white transition-colors">
                Accueil
              </button>
            </li>
            <li>
              <button onClick={() => onNavigatePage('catalog')} className="hover:text-white transition-colors">
                Catalogue complet
              </button>
            </li>
            <li>
              <button onClick={() => onNavigatePage('about')} className="hover:text-white transition-colors">
                Histoire & Savoir-faire
              </button>
            </li>
            <li>
              <button onClick={() => onNavigatePage('contact')} className="hover:text-white transition-colors">
                FAQ & Expédition Tunisie
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care & Legal */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-4">
            Informations Légales
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li>
              <button onClick={() => onOpenLegalModal('cgv')} className="hover:text-white transition-colors">
                Conditions Générales de Vente (CGV)
              </button>
            </li>
            <li>
              <button onClick={() => onOpenLegalModal('privacy')} className="hover:text-white transition-colors">
                Politique de Confidentialité
              </button>
            </li>
            <li>
              <button onClick={() => onOpenLegalModal('shipping')} className="hover:text-white transition-colors">
                Politique de Livraison & Retours
              </button>
            </li>
            <li>
              <span className="text-stone-500">Registre du Commerce & Matricule Fiscal conforme</span>
            </li>
          </ul>
        </div>

        {/* Newsletter / Club */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-4">
            Cercle Privilège & 10% Offerts
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed mb-3">
            Inscrivez-vous pour recevoir nos nouvelles créations en avant-première et bénéficier de 10% avec le code <strong className="text-amber-300">BIENVENUE10</strong>.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Merci ! Votre code BIENVENUE10 est désormais actif pour votre première commande.');
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              required
              placeholder="votre.email@domaine.tn"
              className="bg-stone-800 border border-stone-700 rounded-md px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400 flex-1"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-amber-400 text-stone-950 font-semibold text-xs rounded-md hover:bg-amber-300 transition-colors whitespace-nowrap"
            >
              Rejoindre
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <p>© 2026 Atelier Maison. Boutique propulsée par Shopify · Développé avec excellence pour TPE.</p>
        <div className="flex items-center gap-4">
          <span>Paiement Sécurisé : Cash on Delivery · Konnect · Flouci · ClicToPay</span>
        </div>
      </div>
    </footer>
  );
};
