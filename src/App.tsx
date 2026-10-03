/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/storefront/HeroBanner';
import { ProductGrid } from './components/storefront/ProductGrid';
import { ProductDetailModal } from './components/storefront/ProductDetailModal';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CheckoutModal } from './components/storefront/CheckoutModal';
import { OrderSuccessModal } from './components/storefront/OrderSuccessModal';
import { AboutPage } from './components/storefront/AboutPage';
import { ContactFaqPage } from './components/storefront/ContactFaqPage';
import { LegalPagesModal } from './components/storefront/LegalPagesModal';
import { ThemeCustomizerModal } from './components/storefront/ThemeCustomizerModal';

// Workshop Components
import { ProjectRoadmap } from './components/workshop/ProjectRoadmap';
import { NeedsAssessment } from './components/workshop/NeedsAssessment';
import { ThemeSelector } from './components/workshop/ThemeSelector';
import { CatalogManager } from './components/workshop/CatalogManager';
import { TunisiaEcomConfig } from './components/workshop/TunisiaEcomConfig';
import { SeoAppsStudio } from './components/workshop/SeoAppsStudio';
import { AdminTraining } from './components/workshop/AdminTraining';
import { DeliveryHandoverKit } from './components/workshop/DeliveryHandoverKit';

import { INITIAL_PRODUCTS, PROJECT_MILESTONES } from './data/mockData';
import { Product, ProductVariant, CartItem, Order, Currency, ProjectMilestone } from './types';
import { Compass, Store, Sparkles, FileText, CheckCircle2, Layers, BookOpen, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState<'storefront' | 'workshop'>('storefront');
  const [activeStorePage, setActiveStorePage] = useState<'home' | 'catalog' | 'about' | 'contact'>('home');
  const [activeWorkshopTab, setActiveWorkshopTab] = useState<string>('roadmap');

  // E-commerce state
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      selectedVariant: INITIAL_PRODUCTS[0].variants?.items[0],
      quantity: 1,
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string | null>('BIENVENUE10');
  const [currency, setCurrency] = useState<Currency>('TND');

  // Theme & Customization state
  const [selectedThemeId, setSelectedThemeId] = useState<string>('craft');
  const [activePalette, setActivePalette] = useState<string>('terracotta');
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<'cgv' | 'privacy' | 'shipping' | null>(null);

  // Project Milestones state
  const [milestones, setMilestones] = useState<ProjectMilestone[]>(PROJECT_MILESTONES);

  // Wishlist state with localStorage persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_shopify_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1'];
    } catch {
      return ['prod-1'];
    }
  });

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem('atelier_shopify_wishlist', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Cart operations
  const handleAddToCart = (product: Product, selectedVariant?: ProductVariant, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (i) => i.product.id === product.id && i.selectedVariant?.id === selectedVariant?.id
      );
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { product, selectedVariant, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
    } else {
      setCartItems((prev) => {
        const copy = [...prev];
        copy[index].quantity = newQty;
        return copy;
      });
    }
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplyPromo = (code: string) => {
    if (code === 'BIENVENUE10') {
      setAppliedPromo('BIENVENUE10');
      return { success: true, message: 'Code BIENVENUE10 appliqué avec succès (-10%) !' };
    } else if (code === 'LIVRAISON_GRATUITE') {
      setAppliedPromo('LIVRAISON_GRATUITE');
      return { success: true, message: 'Code appliqué : Livraison 100% offerte !' };
    }
    return { success: false, message: 'Code promo non reconnu ou expiré.' };
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const handleOrderCompleted = (order: Order) => {
    setCompletedOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const handleToggleMilestone = (id: number) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className={`min-h-screen flex flex-col bg-stone-50 selection:bg-stone-900 selection:text-white ${
      activePalette === 'minimalist' ? 'palette-minimalist' : ''
    }`}>
      {/* Top Header */}
      <Navbar
        currentView={currentView}
        onNavigateView={(v) => setCurrentView(v)}
        activeStorePage={activeStorePage}
        onNavigateStorePage={(p) => setActiveStorePage(p)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => {
          setCurrentView('storefront');
          setActiveStorePage('catalog');
          setTimeout(() => {
            const el = document.getElementById('collection-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        currency={currency}
        onCurrencyChange={(c) => setCurrency(c)}
        onOpenThemeCustomizer={() => setIsThemeCustomizerOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {currentView === 'storefront' ? (
          /* ================= MODE 1: BOUTIQUE EN DIRECT (STOREFRONT) ================= */
          <div>
            {activeStorePage === 'home' && (
              <>
                <HeroBanner
                  onExploreCatalog={() => {
                    const el = document.getElementById('collection-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onExploreStory={() => setActiveStorePage('about')}
                />

                <ProductGrid
                  products={products}
                  currency={currency}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onQuickAddToCart={(p) => handleAddToCart(p, p.variants?.items[0], 1)}
                />

                {/* Editorial Craftsmanship Strip */}
                <section className="py-16 bg-stone-100 border-t border-stone-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 font-mono">01. Confection Locale</span>
                        <h3 className="font-serif font-bold text-stone-900 text-lg">Façonné dans nos ateliers à Tunis</h3>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Chaque création soutient les artisans maîtres maroquiniers et céramistes tunisiens dans le respect des traditions.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 font-mono">02. Paiement Sans Risque</span>
                        <h3 className="font-serif font-bold text-stone-900 text-lg">Paiement à la livraison (Espèces)</h3>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Commandez sereinement : inspectez votre colis et réglez directement au livreur d'Aramex ou Yalidine.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 font-mono">03. Expédition Suivie</span>
                        <h3 className="font-serif font-bold text-stone-900 text-lg">Livraison express 24h-48h</h3>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Suivi par SMS et notification d’arrivée sur les 24 gouvernorats tunisiens avec emballage protecteur.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeStorePage === 'catalog' && (
              <ProductGrid
                products={products}
                currency={currency}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onQuickAddToCart={(p) => handleAddToCart(p, p.variants?.items[0], 1)}
              />
            )}

            {activeStorePage === 'about' && (
              <AboutPage onBackToCatalog={() => setActiveStorePage('catalog')} />
            )}

            {activeStorePage === 'contact' && (
              <ContactFaqPage />
            )}
          </div>
        ) : (
          /* ================= MODE 2: ESPACE CADRAGE & PRESTATAIRE SHOPIFY ================= */
          <div className="py-10 bg-stone-100/60 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Workshop Navigation Header */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full">
                      Accompagnement Shopify Pro TPE
                    </span>
                    <span className="text-xs text-stone-500 font-mono">Dossier #TN-SHOP-2026</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-2">
                    Espace Projet & Cadrage de votre Boutique Shopify
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                    Plateforme complète d'accompagnement : diagnostic de votre offre, arborescence, intégration du catalogue, transporteurs tunisiens (Aramex, Yalidine), paiements et formation.
                  </p>
                </div>

                <button
                  onClick={() => setCurrentView('storefront')}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 self-start md:self-center shadow-xs"
                >
                  <Store className="w-4 h-4" />
                  <span>Tester la Boutique en Direct</span>
                </button>
              </div>

              {/* Module Tabs Navigation */}
              <div className="flex gap-2 overflow-x-auto pb-2 border-b border-stone-200">
                {[
                  { id: 'roadmap', label: '1. Feuille de Route & Jalons', icon: Compass },
                  { id: 'cadrage', label: '2. Conseil & Arborescence', icon: Layers },
                  { id: 'themes', label: '3. Choix du Thème', icon: Sparkles },
                  { id: 'catalog', label: '4. Catalogue & Export CSV', icon: FileText },
                  { id: 'ecommerce', label: '5. Paiements & Transporteurs TN', icon: ShieldCheck },
                  { id: 'seo', label: '6. SEO Google & Apps', icon: Zap },
                  { id: 'training', label: '7. Formation Admin Shopify', icon: BookOpen },
                  { id: 'handover', label: '8. Remise des Accès & Clés', icon: CheckCircle2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveWorkshopTab(tab.id)}
                      className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                        activeWorkshopTab === tab.id
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-50 border border-stone-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Workshop Module View */}
              {activeWorkshopTab === 'roadmap' && (
                <ProjectRoadmap
                  milestones={milestones}
                  onToggleMilestone={handleToggleMilestone}
                  onSelectTab={(tabId) => setActiveWorkshopTab(tabId)}
                />
              )}

              {activeWorkshopTab === 'cadrage' && (
                <NeedsAssessment />
              )}

              {activeWorkshopTab === 'themes' && (
                <ThemeSelector
                  selectedThemeId={selectedThemeId}
                  onSelectTheme={(tId) => setSelectedThemeId(tId)}
                  onPreviewStorefront={() => setCurrentView('storefront')}
                />
              )}

              {activeWorkshopTab === 'catalog' && (
                <CatalogManager
                  products={products}
                  currency={currency}
                  onAddProduct={handleAddProduct}
                  onDeleteProduct={handleDeleteProduct}
                />
              )}

              {activeWorkshopTab === 'ecommerce' && (
                <TunisiaEcomConfig />
              )}

              {activeWorkshopTab === 'seo' && (
                <SeoAppsStudio />
              )}

              {activeWorkshopTab === 'training' && (
                <AdminTraining />
              )}

              {activeWorkshopTab === 'handover' && (
                <DeliveryHandoverKit />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenLegalModal={(tab) => setLegalModalTab(tab)}
        onNavigatePage={(page) => {
          setCurrentView('storefront');
          setActiveStorePage(page);
        }}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        currency={currency}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, v, q) => handleAddToCart(p, v, q)}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        appliedPromo={appliedPromo}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Confirmation / Success Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onNavigateWorkshop={() => {
          setCompletedOrder(null);
          setCurrentView('workshop');
          setActiveWorkshopTab('training');
        }}
      />

      {/* Legal Pages Modal (CGV, Shipping, Privacy) */}
      <LegalPagesModal
        isOpen={legalModalTab !== null}
        onClose={() => setLegalModalTab(null)}
        defaultTab={legalModalTab || 'cgv'}
      />

      {/* Theme Style Customizer Modal */}
      <ThemeCustomizerModal
        isOpen={isThemeCustomizerOpen}
        onClose={() => setIsThemeCustomizerOpen(false)}
        activePalette={activePalette}
        onSelectPalette={(pal) => setActivePalette(pal)}
      />
    </div>
  );
}
