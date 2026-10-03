import React from 'react';
import { CheckCircle2, Printer, ArrowRight, Package, MapPin, Phone, Truck } from 'lucide-react';
import { Order } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onNavigateWorkshop: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onNavigateWorkshop,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8 p-6 sm:p-8 space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-3 pb-6 border-b border-stone-200">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800">
              Commande Enregistrée avec Succès
            </span>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
              Merci pour votre confiance !
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Numéro de commande : <strong className="text-stone-900 font-mono text-sm">{order.id}</strong>
            </p>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200/80 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-stone-500 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-700" />
                Adresse de livraison :
              </span>
              <p className="font-semibold text-stone-900">{order.customer.fullName}</p>
              <p className="text-stone-600">{order.customer.address}, {order.customer.city} ({order.customer.governorate})</p>
              <p className="text-stone-600 flex items-center gap-1 font-mono">
                <Phone className="w-3 h-3 text-stone-400" /> {order.customer.phone}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-stone-500 font-medium flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-stone-700" />
                Transporteur & Paiement :
              </span>
              <p className="font-semibold text-stone-900">{order.carrier.name}</p>
              <p className="text-stone-600">Délai estimé : {order.carrier.estimatedDelivery}</p>
              <p className="text-amber-800 font-semibold mt-1">
                {order.paymentMethod === 'cod'
                  ? 'Paiement en espèces au livreur (Cash on Delivery)'
                  : 'Payé en ligne'}
              </p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="pt-3 border-t border-stone-200/80 space-y-2">
            <span className="text-stone-500 font-medium block">Articles commandés :</span>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="text-stone-800 truncate pr-2">
                  {item.quantity} × {item.product.title} {item.selectedVariant && `(${item.selectedVariant.name})`}
                </span>
                <span className="font-mono text-stone-900 font-semibold shrink-0 tabular-nums">
                  {formatPrice((item.product.price + (item.selectedVariant?.priceDelta || 0)) * item.quantity, order.currency)}
                </span>
              </div>
            ))}
          </div>

          {/* Total Breakdown */}
          <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-sm font-bold text-stone-900">
            <span>Total TTC :</span>
            <span className="font-mono text-base text-amber-950 tabular-nums">
              {formatPrice(order.total, order.currency)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer le Bon de Commande</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateWorkshop();
            }}
            className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Voir le Traitement dans l'Espace Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
