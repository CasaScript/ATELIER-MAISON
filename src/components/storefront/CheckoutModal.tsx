import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Banknote, AlertCircle, Info } from 'lucide-react';
import { CartItem, Carrier, Currency, Order, OrderCustomerInfo } from '../../types';
import { TUNISIAN_CARRIERS, TUNISIAN_GOVERNORATES } from '../../data/mockData';
import { formatPrice } from '../../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  appliedPromo: string | null;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  appliedPromo,
  onOrderCompleted,
}) => {
  const [customer, setCustomer] = useState<OrderCustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    governorate: 'tunis',
    postalCode: '',
    notes: '',
  });

  const [selectedCarrierId, setSelectedCarrierId] = useState<string>('aramex');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'konnect' | 'flouci' | 'card'>('cod');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Pricing math
  const subtotal = items.reduce((acc, item) => {
    const itemPrice = item.product.price + (item.selectedVariant?.priceDelta || 0);
    return acc + itemPrice * item.quantity;
  }, 0);

  const discount = appliedPromo === 'BIENVENUE10' ? subtotal * 0.1 : 0;
  const isFreeShipping = subtotal >= 150.0 || appliedPromo === 'LIVRAISON_GRATUITE';

  const selectedCarrier = TUNISIAN_CARRIERS.find((c) => c.id === selectedCarrierId) || TUNISIAN_CARRIERS[0];
  const shippingFee = isFreeShipping ? 0 : selectedCarrier.price;
  const total = subtotal - discount + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate phone number (crucial for Tunisian COD delivery)
    if (!customer.phone.trim() || customer.phone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Veuillez renseigner un numéro de téléphone tunisien valide (8 chiffres minimum) pour le livreur.');
      return;
    }

    if (!customer.fullName.trim() || !customer.address.trim() || !customer.city.trim()) {
      setErrorMessage('Veuillez remplir votre nom complet, adresse de livraison et ville.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `TN-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('fr-TN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        items,
        customer,
        carrier: selectedCarrier,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        subtotal,
        discount,
        shippingFee,
        total,
        currency,
        status: 'confirmed',
      };

      setIsProcessing(false);
      onOrderCompleted(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">
              Finaliser votre commande
            </h2>
            <p className="text-xs text-stone-500">
              Livraison sécurisée partout en Tunisie avec suivi en direct.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md hover:bg-stone-200 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Delivery details & payment selection */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-stone-200">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Coordonnées de livraison */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">1</span>
                <h3 className="text-sm font-semibold text-stone-900">Adresse de Livraison en Tunisie</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nom complet (Prénom & Nom) *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="ex: Mohamed Khalil Jelassi"
                    className="w-full bg-white border border-stone-300 rounded-md px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    N° Téléphone tunisien * (Pour le livreur)
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="ex: 98 123 456"
                    className="w-full bg-white border border-stone-300 rounded-md px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    E-mail (Confirmation & suivi)
                  </label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="ex: client@domaine.tn"
                    className="w-full bg-white border border-stone-300 rounded-md px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Adresse exacte (Rue, N° bâtiment, Étage) *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="ex: Résidence Les Jardins, Appartement B12, Avenue Habib Bourguiba"
                    className="w-full bg-white border border-stone-300 rounded-md px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Gouvernorat *
                  </label>
                  <select
                    value={customer.governorate}
                    onChange={(e) => setCustomer({ ...customer, governorate: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-md px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    {TUNISIAN_GOVERNORATES.map((gov) => (
                      <option key={gov.id} value={gov.id}>
                        {gov.name} ({gov.region})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Ville / Délégation *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="ex: La Marsa, Ennasr, Menzah..."
                    className="w-full bg-white border border-stone-300 rounded-md px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* 2. Choix du Transporteur */}
            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">2</span>
                <h3 className="text-sm font-semibold text-stone-900">Mode de Livraison</h3>
              </div>

              <div className="space-y-2">
                {TUNISIAN_CARRIERS.map((carrier) => {
                  const fee = isFreeShipping ? 0 : carrier.price;
                  return (
                    <label
                      key={carrier.id}
                      className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCarrierId === carrier.id
                          ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="carrier"
                          value={carrier.id}
                          checked={selectedCarrierId === carrier.id}
                          onChange={() => setSelectedCarrierId(carrier.id)}
                          className="mt-1 text-stone-900 focus:ring-stone-900"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{carrier.logo}</span>
                            <span className="text-xs font-semibold text-stone-900">{carrier.name}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">{carrier.estimatedDelivery} · {carrier.coverage}</p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-stone-900 tabular-nums">
                        {isFreeShipping ? 'Gratuit' : formatPrice(fee, currency)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. Moyen de Paiement */}
            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">3</span>
                <h3 className="text-sm font-semibold text-stone-900">Moyen de Paiement</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Cash on Delivery (COD) */}
                <label
                  className={`p-3 rounded-lg border cursor-pointer flex items-start gap-3 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-amber-700" />
                      <span className="text-xs font-bold text-stone-900">Paiement à la livraison</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Réglez en espèces au livreur après réception de votre colis. (Option N°1 en Tunisie)
                    </p>
                  </div>
                </label>

                {/* Konnect / Flouci / CB */}
                <label
                  className={`p-3 rounded-lg border cursor-pointer flex items-start gap-3 transition-all ${
                    paymentMethod === 'konnect'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="konnect"
                    checked={paymentMethod === 'konnect'}
                    onChange={() => setPaymentMethod('konnect')}
                    className="mt-1 text-stone-900 focus:ring-stone-900"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-stone-800" />
                      <span className="text-xs font-bold text-stone-900">Carte Bancaire / Konnect / Flouci</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Paiement en ligne sécurisé par Carte Bancaire tunisienne ou portefeuille électronique.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order summary and confirmation */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-stone-50 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-serif font-bold text-stone-900 pb-2 border-b border-stone-200">
                Récapitulatif de votre commande
              </h3>

              {/* Items summary list */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.featuredImage}
                      alt={item.product.title}
                      className="w-12 h-12 rounded object-cover bg-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-stone-900 truncate">{item.product.title}</p>
                      {item.selectedVariant && (
                        <p className="text-[11px] text-stone-500">{item.selectedVariant.name}</p>
                      )}
                      <p className="text-stone-500 text-[11px]">Qté : {item.quantity}</p>
                    </div>
                    <span className="font-mono font-medium text-stone-900 tabular-nums">
                      {formatPrice((item.product.price + (item.selectedVariant?.priceDelta || 0)) * item.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 pt-4 border-t border-stone-200 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span>Sous-total articles</span>
                  <span className="font-mono tabular-nums">{formatPrice(subtotal, currency)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>Réduction appliquée ({appliedPromo})</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discount, currency)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-stone-600">
                  <div className="flex items-center gap-1">
                    <span>Frais de port ({selectedCarrier.name})</span>
                  </div>
                  <span className="font-mono tabular-nums">
                    {isFreeShipping ? <span className="text-emerald-700 font-semibold">Gratuit</span> : formatPrice(shippingFee, currency)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-300">
                  <span>Total à payer</span>
                  <span className="font-mono tabular-nums text-lg text-amber-950">
                    {formatPrice(total, currency)}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 text-[11px] text-stone-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-amber-900">
                  <Info className="w-3.5 h-3.5" />
                  <span>Important pour la livraison en Tunisie :</span>
                </div>
                <p>Notre équipe ou le livreur d’Aramex / Yalidine vous appellera sur votre téléphone avant de se déplacer à votre adresse.</p>
              </div>
            </div>

            {/* Submit Action */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Validation de la commande en cours...</span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Confirmer la Commande · {formatPrice(total, currency)}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>Commande sécurisée et garantie sans surprise</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
