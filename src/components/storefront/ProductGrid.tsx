import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, Star } from 'lucide-react';
import { Product, Currency } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface ProductGridProps {
  products: Product[];
  currency: Currency;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  onSelectProduct,
  onQuickAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories = ['all', 'Maroquinerie', 'Soins & Cosmétiques', 'Maison & Décoration'];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <section className="py-16 bg-white" id="collection-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Catalogue & Créations 2026
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
              Des pièces d'exception faites pour durer
            </h2>
            <p className="text-sm text-stone-500 mt-1.5">
              Production artisanale en petites séries. Stocks mis à jour en temps réel.
            </p>
          </div>

          {/* Category Filter Tabs (Interactive Segmented Control Buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'all' ? 'Toutes les créations' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isAdded = addedProductId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group cursor-pointer flex flex-col bg-stone-50/50 rounded-xl overflow-hidden border border-stone-200/80 hover:border-stone-400/80 hover:shadow-md transition-all duration-200"
              >
                {/* Product Image Slot */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={product.featuredImage}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Fallback container background already provided */}

                  {/* Overlay Quick Action Buttons on hover */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="p-2.5 bg-white text-stone-900 rounded-full shadow-md hover:bg-stone-100 transition-transform transform hover:scale-105"
                      title="Aperçu rapide"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`p-2.5 rounded-full shadow-md transition-transform transform hover:scale-105 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-900 text-white hover:bg-stone-800'
                      }`}
                      title="Ajouter au panier"
                    >
                      {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Stock notice indicator */}
                  {product.stockCount <= 10 && (
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                      Plus que {product.stockCount} en stock
                    </div>
                  )}
                </div>

                {/* Card Content & Metadata */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Unboxed Metadata with Typographic separator (Anti-Pill Rule) */}
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="uppercase tracking-wider font-medium text-[11px] text-amber-900">
                        {product.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{product.inStock ? 'Disponible' : 'Sur commande'}</span>
                    </div>

                    <h3 className="font-serif font-bold text-stone-900 text-lg group-hover:text-stone-700 transition-colors mt-1 leading-snug">
                      {product.title}
                    </h3>

                    {/* Star rating social proof */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 pt-0.5">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-stone-500 tabular-nums">
                        4.9 ({product.id === 'prod-1' ? 18 : product.id === 'prod-2' ? 24 : 14})
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Row: Price (Tabular Numerals) + Action Button */}
                  <div className="pt-3 border-t border-stone-200/70 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold font-mono tabular-nums text-stone-900">
                        {formatPrice(product.price, currency)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs font-mono tabular-nums text-stone-400 line-through">
                          {formatPrice(product.compareAtPrice, currency)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        isAdded
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-900 text-white hover:bg-stone-800'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Ajouté !</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Ajouter</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
