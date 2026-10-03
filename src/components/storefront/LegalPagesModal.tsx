import React, { useState } from 'react';
import { X, FileText, Shield, Truck } from 'lucide-react';

interface LegalPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'cgv' | 'privacy' | 'shipping';
}

export const LegalPagesModal: React.FC<LegalPagesModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'cgv',
}) => {
  const [activeTab, setActiveTab] = useState<'cgv' | 'privacy' | 'shipping'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-stone-900" />
            <h2 className="text-base font-serif font-bold text-stone-900">
              Informations Légales & Conformité E-commerce
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md hover:bg-stone-200 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-stone-200 bg-stone-100/60 px-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('cgv')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'cgv'
                ? 'border-stone-900 text-stone-900 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Conditions Générales de Vente (CGV)</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'shipping'
                ? 'border-stone-900 text-stone-900 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Livraison & Retours</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'border-stone-900 text-stone-900 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Données Personnelles</span>
          </button>
        </div>

        {/* Content area */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-700 leading-relaxed">
          {activeTab === 'cgv' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">1. Objet et Champ d'Application</h3>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes conclues entre la société Atelier Maison (TPE immatriculée au Registre National des Entreprises de Tunisie) et tout acheteur particulier ou professionnel effectuant une commande sur le site.
              </p>

              <h3 className="text-sm font-bold text-stone-900">2. Prix et Disponibilité</h3>
              <p>
                Les prix de nos produits sont indiqués en Dinars Tunisiens (TND / DT) toutes taxes comprises (TTC), hors frais de transport. Les prix peuvent également être affichés en Euros ou Dollars à titre indicatif pour nos clients internationaux.
              </p>

              <h3 className="text-sm font-bold text-stone-900">3. Modalités de Paiement</h3>
              <p>
                • <strong>Paiement à la livraison (Cash on Delivery) :</strong> L'acheteur s'engage à remettre au livreur le montant exact en espèces à la réception de sa commande.<br />
                • <strong>Paiement en ligne :</strong> Sécurisé par passerelle bancaire agréée (Konnect, Flouci, SMT ClicToPay).
              </p>

              <h3 className="text-sm font-bold text-stone-900">4. Droit de Rétractation et Retours</h3>
              <p>
                Conformément à la législation relative au commerce électronique en Tunisie, le client dispose d'un délai de sept (7) jours ouvrables à compter de la livraison pour demander un échange ou le remboursement d'un article intact.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">1. Zones Desservies et Délais</h3>
              <p>
                Nous livrons sur l'intégralité du territoire tunisien (les 24 gouvernorats) via nos transporteurs partenaires : Aramex, Yalidine Express, First Delivery et Rapid-Poste. Les délais sont de 24h à 48h ouvrables sur le Grand Tunis, le Sahel et Sfax, et de 48h à 72h ouvrables pour le reste du pays.
              </p>

              <h3 className="text-sm font-bold text-stone-900">2. Frais d'Expédition</h3>
              <p>
                Les frais de port standard s'élèvent entre 6.00 et 8.00 DT selon le transporteur choisi. La livraison est <strong>gratuite à partir de 150.00 DT d'achats</strong>.
              </p>

              <h3 className="text-sm font-bold text-stone-900">3. Procédure d'Échange</h3>
              <p>
                Pour effectuer un échange de taille ou de produit, contactez notre service client par WhatsApp ou par e-mail. Le transporteur récupérera l'ancien article lors de la livraison de votre nouvelle pièce.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">1. Collecte des Données Personnelles</h3>
              <p>
                Les informations collectées lors de la commande (nom, adresse de livraison, numéro de téléphone tunisien) sont exclusivement destinées au traitement, à la facturation et à la livraison de vos colis par nos transporteurs agréés.
              </p>

              <h3 className="text-sm font-bold text-stone-900">2. Confidentialité & Sécurité</h3>
              <p>
                Vos données personnelles ne sont jamais vendues, louées ni cédées à des tiers à des fins publicitaires. Conformément à la législation tunisienne sur la protection des données personnelles, vous disposez d'un droit permanent d'accès, de rectification et de suppression de vos données en contactant notre délégué à la protection des données.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-md text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
