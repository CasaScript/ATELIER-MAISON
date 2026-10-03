import React, { useState } from 'react';
import { FileText, Printer, ShieldCheck, CheckSquare, Key, Globe, Mail, Phone, ExternalLink, Download } from 'lucide-react';

export const DeliveryHandoverKit: React.FC = () => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    dns: true,
    ssl: true,
    theme: true,
    products: true,
    cod: true,
    shipping: true,
    cgv: true,
    responsive: true,
    whatsapp: true,
    adminAccess: true,
  });

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-8">
      {/* Header with Print action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full">
            Livrable Final · Remise des Clés
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Dossier de Remise Officiel & Documentation Client
          </h2>
          <p className="text-xs text-stone-500">
            Ce document récapitule l'ensemble des accès, configurations techniques et engagements de livraison de votre boutique Shopify.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs shrink-0 self-start sm:self-center"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimer / Exporter le Dossier (PDF)</span>
        </button>
      </div>

      {/* 1. Project Identification Slip */}
      <div className="p-6 bg-stone-50 rounded-xl border border-stone-200 space-y-4 text-xs">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <FileText className="w-4 h-4 text-amber-700" />
          <span>Fiche d'Identité du Projet E-commerce</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-stone-700">
          <div>
            <strong className="block text-stone-900 mb-0.5">Nom commercial de la boutique :</strong>
            <span>Atelier Maison (TPE Tunisie)</span>
          </div>

          <div>
            <strong className="block text-stone-900 mb-0.5">URL Boutique & Admin :</strong>
            <span className="font-mono text-stone-600">ateliermasion.myshopify.com/admin</span>
          </div>

          <div>
            <strong className="block text-stone-900 mb-0.5">Propriétaire & Administrateur :</strong>
            <span>Mohamed Khalil Jelassi</span>
          </div>

          <div>
            <strong className="block text-stone-900 mb-0.5">E-mail principal du compte :</strong>
            <span className="font-mono text-stone-600">mohamedkhaliljelassi00@gmail.com</span>
          </div>

          <div>
            <strong className="block text-stone-900 mb-0.5">Devise principale du magasin :</strong>
            <span className="font-mono text-emerald-800 font-bold">Dinar Tunisien (TND / DT)</span>
          </div>

          <div>
            <strong className="block text-stone-900 mb-0.5">Transporteurs paramétrés :</strong>
            <span>Aramex, Yalidine Express, First Delivery</span>
          </div>
        </div>
      </div>

      {/* 2. Access Credentials Transfer Protocol */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Key className="w-4 h-4 text-amber-700" />
          <span>Transfert de Propriété & Rôles des Accès</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2">
            <h4 className="font-bold text-stone-900">Compte Propriétaire (Store Owner)</h4>
            <p className="text-stone-600 leading-relaxed">
              Le compte propriétaire est transféré à 100% sur l'adresse e-mail du client. Vous détenez la pleine propriété de votre boutique, de vos données clients et du nom de domaine.
            </p>
            <div className="pt-2 text-[11px] text-stone-500">
              ✓ Aucun abonnement caché ou dépendance technique.
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2">
            <h4 className="font-bold text-stone-900">Sécurité & Authentification à 2 Facteurs</h4>
            <p className="text-stone-600 leading-relaxed">
              Nous recommandons d'activer l'authentification à deux facteurs (2FA par SMS ou application d'authentification) dès votre première connexion pour sécuriser votre chiffre d'affaires.
            </p>
            <div className="pt-2 text-[11px] text-stone-500">
              ✓ Chemin : <em>Compte Shopify &gt; Sécurité &gt; Authentification à deux facteurs</em>.
            </div>
          </div>
        </div>
      </div>

      {/* 3. Final Go-Live Quality Checklist */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Checklist de Contrôle Qualité Pré-Lancement</span>
          </div>
          <span className="text-xs font-mono text-stone-500">
            {Object.values(checklist).filter(Boolean).length}/10 points vérifiés
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {[
            { key: 'dns', label: 'Nom de domaine connecté & Certificat SSL actif (HTTPS)' },
            { key: 'theme', label: 'Thème Shopify personnalisé responsive (Mobile, Tablette, Bureau)' },
            { key: 'products', label: 'Catalogue initial intégré avec photos HD, prix en DT et stocks' },
            { key: 'cod', label: 'Paiement à la livraison (Cash on Delivery) configuré et testé' },
            { key: 'shipping', label: 'Frais de livraison par transporteur (Aramex/Yalidine) et seuil gratuit (150 DT)' },
            { key: 'cgv', label: 'Pages légales publiées (CGV, Données personnelles, Mentions légales)' },
            { key: 'responsive', label: 'Tunnel de commande testé sur smartphone avec validation du numéro de téléphone' },
            { key: 'whatsapp', label: 'Bouton de chat WhatsApp connecté au numéro marchand' },
            { key: 'adminAccess', label: 'Compte propriétaire transféré et e-mail de confirmation validé' },
            { key: 'ssl', label: 'Notifications e-mail transactionnelles personnalisées avec logo' },
          ].map((item) => (
            <label
              key={item.key}
              className={`p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-colors ${
                checklist[item.key]
                  ? 'bg-emerald-50/60 border-emerald-200 text-stone-900'
                  : 'bg-white border-stone-200 text-stone-600'
              }`}
            >
              <input
                type="checkbox"
                checked={!!checklist[item.key]}
                onChange={() => toggleCheck(item.key)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span className="leading-snug">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Support & Warranty Notice */}
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
        <strong className="block text-amber-900 font-bold">Garantie & Support Post-Lancement :</strong>
        <p>
          Conformément à notre contrat d'accompagnement TPE, vous bénéficiez d'une garantie technique de 30 jours après la mise en ligne pour répondre à vos questions et ajuster d'éventuels réglages.
        </p>
      </div>
    </div>
  );
};
