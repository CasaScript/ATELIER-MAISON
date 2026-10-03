import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { CartItem, Currency } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onOpenCheckout: () => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  // Subtotal in TND
  const subtotal = items.reduce((acc, item) => {
    const itemPrice = item.product.price + (item.selectedVariant?.priceDelta || 0);
    return acc + itemPrice * item.quantity;
  }, 0);

  // Free shipping threshold in TND
  const freeThreshold = 150.0;
  const remainingForFreeShipping = Math.max(0, freeThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput.trim().toUpperCase());
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-base font-serif font-bold text-stone-900">
                Mon Panier ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md hover:bg-stone-200 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="p-4 bg-amber-50/70 border-b border-amber-200/60 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-stone-700 font-medium mb-1.5">
                Plus que <strong className="text-amber-900 font-mono tabular-nums">{formatPrice(remainingForFreeShipping, currency)}</strong> pour bénéficier de la <span className="text-amber-800 font-semibold">livraison offerte</span> en Tunisie !
              </p>
            ) : (
              <p className="text-emerald-800 font-semibold flex items-center gap-1.5 mb-1.5">
                <span>🎉 Félicitations ! Votre commande est éligible à la livraison offerte.</span>
              </p>
            )}
            <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-stone-900">Votre panier est vide</h3>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Découvrez nos collections artisanales et ajoutez vos créations préférées.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-md hover:bg-stone-800 transition-colors"
                >
                  Explorer la boutique
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const itemPrice = item.product.price + (item.selectedVariant?.priceDelta || 0);

                return (
                  <div
                    key={`${item.product.id}-${item.selectedVariant?.id || 'default'}`}
                    className="flex gap-4 p-3 bg-stone-50/80 rounded-xl border border-stone-200/80"
                  >
                    <img
                      src={item.product.featuredImage}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-lg bg-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-serif font-bold text-stone-900 line-clamp-1">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-stone-400 hover:text-red-600 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedVariant && (
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            {item.selectedVariant.name}
                          </p>
                        )}

                        <span className="text-xs font-mono font-bold text-stone-900 tabular-nums block mt-1">
                          {formatPrice(itemPrice, currency)}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 pt-2">
                        <div className="flex items-center border border-stone-300 rounded bg-white text-xs">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 font-mono font-bold tabular-nums text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer (Subtotal, Promo & Checkout CTA) */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
              {/* Promo code form */}
              <div className="space-y-1.5">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code appliqué : <strong>{appliedPromo}</strong></span>
                    </div>
                    <button
                      onClick={onRemovePromo}
                      className="text-emerald-700 hover:text-emerald-900 font-semibold underline text-[11px]"
                    >
                      Retirer
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Code promo (ex: BIENVENUE10)"
                      className="flex-1 bg-white border border-stone-300 rounded-md px-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-200 text-stone-800 text-xs font-semibold rounded-md hover:bg-stone-300 transition-colors"
                    >
                      Appliquer
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.isError ? 'text-red-600' : 'text-emerald-700'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Subtotal calculation */}
              <div className="space-y-1.5 pt-2 border-t border-stone-200 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span>Sous-total articles</span>
                  <span className="font-mono tabular-nums">{formatPrice(subtotal, currency)}</span>
                </div>
                {appliedPromo === 'BIENVENUE10' && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>Réduction Bienvenue (-10%)</span>
                    <span className="font-mono tabular-nums">-{formatPrice(subtotal * 0.1, currency)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-stone-600">
                  <span>Livraison Tunisie</span>
                  <span>Calculée au paiement</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                  <span>Total estimé</span>
                  <span className="font-mono tabular-nums text-base">
                    {formatPrice(appliedPromo === 'BIENVENUE10' ? subtotal * 0.9 : subtotal, currency)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 px-4 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
              >
                <span>Procéder au Paiement</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                <span>Paiement sécurisé ou Paiement à la livraison</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
