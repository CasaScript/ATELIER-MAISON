import React from 'react';
import { ShoppingBag, Sparkles, Store, Compass, Heart } from 'lucide-react';
import { Currency } from '../../types';

interface NavbarProps {
  currentView: 'storefront' | 'workshop';
  onNavigateView: (view: 'storefront' | 'workshop') => void;
  activeStorePage: 'home' | 'catalog' | 'about' | 'contact';
  onNavigateStorePage: (page: 'home' | 'catalog' | 'about' | 'contact') => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount?: number;
  onOpenWishlist?: () => void;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  onOpenThemeCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateView,
  activeStorePage,
  onNavigateStorePage,
  cartCount,
  onOpenCart,
  wishlistCount = 0,
  onOpenWishlist,
  currency,
  onCurrencyChange,
  onOpenThemeCustomizer,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      {/* Promotion top bar */}
      <div className="bg-stone-900 text-stone-300 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-3 mx-auto">
          <span>Livraison express offerte sur toute la Tunisie dès 150 DT d’achats</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="text-amber-300 font-medium">Paiement à la livraison disponible (Cash on Delivery)</span>
        </div>
      </div>

      {/* Main 3-zone header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Wordmark */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              onNavigateView('storefront');
              onNavigateStorePage('home');
            }}
            className="text-2xl font-serif font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap"
          >
            ATELIER MAISON
          </button>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean text with subtle underline) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {currentView === 'storefront' ? (
            <>
              <button
                onClick={() => onNavigateStorePage('home')}
                className={`py-1 transition-colors whitespace-nowrap ${
                  activeStorePage === 'home'
                    ? 'text-stone-950 font-semibold border-b-2 border-stone-900'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                Accueil
              </button>
              <button
                onClick={() => onNavigateStorePage('catalog')}
                className={`py-1 transition-colors whitespace-nowrap ${
                  activeStorePage === 'catalog'
                    ? 'text-stone-950 font-semibold border-b-2 border-stone-900'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                Catalogue & Créations
              </button>
              <button
                onClick={() => onNavigateStorePage('about')}
                className={`py-1 transition-colors whitespace-nowrap ${
                  activeStorePage === 'about'
                    ? 'text-stone-950 font-semibold border-b-2 border-stone-900'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                Notre Histoire
              </button>
              <button
                onClick={() => onNavigateStorePage('contact')}
                className={`py-1 transition-colors whitespace-nowrap ${
                  activeStorePage === 'contact'
                    ? 'text-stone-950 font-semibold border-b-2 border-stone-900'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                FAQ & Expédition Tunisie
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 text-stone-600 text-sm">
              <Compass className="w-4 h-4 text-stone-900" />
              <span className="font-semibold text-stone-900">Espace Cadrage & Accompagnement Shopify TPE</span>
            </div>
          )}
        </nav>

        {/* Zone 3: Actions (Currency, Cart, Mode Switcher) */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="flex items-center bg-stone-100 rounded-md p-0.5 text-xs font-medium text-stone-700">
            {(['TND', 'EUR', 'USD'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => onCurrencyChange(curr)}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  currency === curr
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'hover:text-stone-950'
                }`}
              >
                {curr === 'TND' ? 'DT' : curr}
              </button>
            ))}
          </div>

          {/* Theme Style Customizer Trigger */}
          {currentView === 'storefront' && (
            <button
              onClick={onOpenThemeCustomizer}
              title="Personnaliser les couleurs & le thème"
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}

          {/* Wishlist Button */}
          {currentView === 'storefront' && (
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-700 hover:text-rose-600 hover:bg-stone-100 rounded-md transition-colors flex items-center gap-1.5"
              aria-label="Voir mes favoris"
              title="Mes créations favorites"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-stone-700'}`} />
              {wishlistCount > 0 && (
                <span className="text-xs font-semibold tabular-nums text-stone-900">
                  {wishlistCount}
                </span>
              )}
            </button>
          )}

          {/* Cart Button */}
          {currentView === 'storefront' && (
            <button
              onClick={onOpenCart}
              className="relative p-2 text-stone-800 hover:text-stone-950 hover:bg-stone-100 rounded-md transition-colors flex items-center gap-1.5"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-semibold tabular-nums text-stone-900">
                {cartCount}
              </span>
            </button>
          )}

          {/* View Toggle: Storefront vs Workshop */}
          <button
            onClick={() => onNavigateView(currentView === 'storefront' ? 'workshop' : 'storefront')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${
              currentView === 'storefront'
                ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-xs'
                : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300'
            }`}
          >
            {currentView === 'storefront' ? (
              <>
                <Compass className="w-3.5 h-3.5" />
                <span>Espace Prestataire & Cadrage</span>
              </>
            ) : (
              <>
                <Store className="w-3.5 h-3.5" />
                <span>Voir la Boutique Shopify en Direct</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
