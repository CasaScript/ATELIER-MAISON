import React, { useState } from 'react';
import { Banknote, CreditCard, Truck, ShieldAlert, CheckCircle2, ChevronRight, Copy, Check, ExternalLink } from 'lucide-react';
import { TUNISIAN_CARRIERS, TUNISIAN_GOVERNORATES } from '../../data/mockData';

export const TunisiaEcomConfig: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3 pb-6 border-b border-stone-200">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full">
          Jalon 3 · Paiements & Transporteurs en Tunisie
        </span>
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          Configuration E-commerce Spécifique Tunisie & International
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Le succès d'une boutique Shopify en Tunisie repose sur deux piliers majeurs : un flux de <strong>Paiement à la livraison (COD)</strong> parfaitement maîtrisé et l'intégration des <strong>transporteurs express nationaux</strong>.
        </p>
      </div>

      {/* 1. Cash on Delivery (COD) Setup Guide */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl">
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              1. Paramétrage du Paiement à la Livraison (Cash on Delivery)
            </h3>
            <p className="text-xs text-stone-500">
              Représente plus de 75% du chiffre d’affaires e-commerce en Tunisie.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Step by step in Shopify */}
          <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
            <h4 className="font-bold text-stone-900 text-sm">Procédure dans l'Admin Shopify :</h4>
            <ol className="space-y-2 list-decimal list-inside text-stone-700 leading-relaxed">
              <li>Rendez-vous dans <strong>Paramètres</strong> &gt; <strong>Paiements</strong>.</li>
              <li>Faites défiler jusqu'à <strong>Modes de paiement manuels</strong>.</li>
              <li>Cliquez sur <strong>Ajouter un mode de paiement manuel</strong> puis sélectionnez <strong>Cash on Delivery (COD)</strong>.</li>
              <li>Copiez-collez les instructions personnalisées ci-contre pour vos clients.</li>
              <li>Cliquez sur <strong>Activer</strong>.</li>
            </ol>

            <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-amber-900 text-[11px] space-y-1">
              <strong>💡 Conseil Anti-Colis Refusés :</strong>
              <p>Appelez ou envoyez un message WhatsApp de courtoisie dans les 2h suivant la commande pour confirmer l'adresse exacte. Cela fait chuter le taux de retour de 35% à moins de 6%.</p>
            </div>
          </div>

          {/* Ready-to-use customer instruction copy-paste */}
          <div className="p-5 bg-stone-900 text-stone-300 rounded-xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-amber-400">Texte d'instructions à coller dans Shopify</span>
              <button
                onClick={() => handleCopy(
                  "Réglez en espèces directement auprès du livreur à la réception de votre colis. Notre transporteur partenaire vous contactera par téléphone avant la livraison pour convenir de l'horaire. Prévoyez l'appoint si possible.",
                  'cod-text'
                )}
                className="flex items-center gap-1 text-[11px] text-stone-300 hover:text-white transition-colors"
              >
                {copiedKey === 'cod-text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'cod-text' ? 'Copié !' : 'Copier le texte'}</span>
              </button>
            </div>

            <div className="bg-stone-950 p-3.5 rounded-lg border border-stone-800 font-mono text-[11px] text-stone-300 leading-relaxed">
              "Réglez en espèces directement auprès du livreur à la réception de votre colis. Notre transporteur partenaire vous contactera par téléphone avant la livraison pour convenir de l'horaire. Prévoyez l'appoint si possible."
            </div>

            <p className="text-[11px] text-stone-400">
              Ce texte rassure l'acheteur et lui rappelle qu'il sera contacté au préalable par téléphone avant le passage du livreur.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Online Payment Gateways Matrix (Tunisia & Export) */}
      <div className="space-y-4 pt-6 border-t border-stone-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              2. Passerelles de Paiement par Carte Bancaire en Tunisie
            </h3>
            <p className="text-xs text-stone-500">
              Pour encaisser les paiements instantanés des cartes bancaires nationales et internationales.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Konnect */}
          <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-sm">Konnect Network</h4>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">Recommandé</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Plugin officiel disponible pour Shopify. Accepte les cartes bancaires tunisiennes (GIE Monétique), e-dinar, et cartes internationales Visa/Mastercard.
            </p>
            <div className="pt-2 border-t border-stone-100 text-[11px] space-y-1 text-stone-500">
              <p>• Commission : ~2% à 3% par transaction</p>
              <p>• Reversement : Direct sur compte bancaire tunisien</p>
            </div>
          </div>

          {/* Flouci */}
          <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-sm">Flouci</h4>
              <span className="text-[11px] bg-stone-100 text-stone-700 font-semibold px-2 py-0.5 rounded">Mobile-First</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Portefeuille mobile et passerelle de paiement très populaire auprès des jeunes actifs tunisiens. Intégration via API ou lien de paiement.
            </p>
            <div className="pt-2 border-t border-stone-100 text-[11px] space-y-1 text-stone-500">
              <p>• Commission : ~1.5% + frais fixes minimes</p>
              <p>• Virement instantané sur compte Flouci / RIB</p>
            </div>
          </div>

          {/* ClicToPay (SMT) */}
          <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-sm">ClicToPay (SMT)</h4>
              <span className="text-[11px] bg-stone-100 text-stone-700 font-semibold px-2 py-0.5 rounded">Banques Classiques</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              La solution monétique interbancaire historique de la Société Monétique Tunisie. Idéal si vous avez déjà un contrat VAD avec votre banque.
            </p>
            <div className="pt-2 border-t border-stone-100 text-[11px] space-y-1 text-stone-500">
              <p>• Contrat commerçant avec agence bancaire (BIAT, Attijari, etc.)</p>
              <p>• Nécessite un matricule fiscal et RNE</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tunisian Carriers Matrix */}
      <div className="space-y-4 pt-6 border-t border-stone-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              3. Transporteurs Tunisiens & Tarifs d'Expédition
            </h3>
            <p className="text-xs text-stone-500">
              Comparatif des partenaires de livraison recommandés pour TPE.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5">Transporteur</th>
                <th className="p-3.5">Délais moyens</th>
                <th className="p-3.5">Tarif Colis Standard</th>
                <th className="p-3.5">Reversement COD (Espèces)</th>
                <th className="p-3.5">Points Forts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {TUNISIAN_CARRIERS.map((c) => (
                <tr key={c.id} className="hover:bg-stone-50/50">
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{c.logo}</span>
                      <strong className="text-stone-900">{c.name}</strong>
                    </div>
                  </td>
                  <td className="p-3.5 text-stone-600">{c.estimatedDelivery}</td>
                  <td className="p-3.5 font-mono font-bold text-stone-900 tabular-nums">
                    {c.price.toFixed(2)} DT
                  </td>
                  <td className="p-3.5 text-stone-600">Hebdomadaire (par virement bancaire)</td>
                  <td className="p-3.5 text-stone-500 text-[11px] max-w-xs">{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
