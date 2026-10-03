import React, { useState } from 'react';
import { X, Check, Shield, Truck, RotateCcw, ShoppingBag, Star, Sparkles, Heart, Share2, Link2 } from 'lucide-react';
import { Product, ProductVariant, Currency } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { DEFAULT_PRODUCT_REVIEWS } from '../../data/mockReviews';
import { ProductReviewsSection } from './ProductReviewsSection';

interface ProductDetailModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, selectedVariant?: ProductVariant, quantity?: number) => void;
  wishlist?: string[];
  onToggleWishlist?: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  wishlist: externalWishlist,
  onToggleWishlist: onToggleWishlistProp,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.items[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(product.featuredImage);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'materials' | 'shipping' | 'reviews'>('desc');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Local state for wishlist with localStorage persistence
  const [localWishlist, setLocalWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_shopify_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlistToast, setWishlistToast] = useState<{ message: string; isAdded: boolean } | null>(null);

  const effectiveWishlist = externalWishlist !== undefined ? externalWishlist : localWishlist;
  const isWishlisted = product ? effectiveWishlist.includes(product.id) : false;

  const handleToggleWishlist = () => {
    if (!product) return;
    const willAdd = !isWishlisted;

    if (onToggleWishlistProp) {
      onToggleWishlistProp(product.id);
    } else {
      setLocalWishlist((prev) => {
        const next = willAdd ? [...prev, product.id] : prev.filter((id) => id !== product.id);
        try {
          localStorage.setItem('atelier_shopify_wishlist', JSON.stringify(next));
        } catch (e) {
          console.error(e);
        }
        return next;
      });
    }

    setWishlistToast({
      message: willAdd
        ? `« ${product.title} » a été ajouté à vos favoris !`
        : `« ${product.title} » a été retiré de vos favoris`,
      isAdded: willAdd,
    });

    setTimeout(() => {
      setWishlistToast(null);
    }, 2800);
  };

  const productReviews = product.reviews || DEFAULT_PRODUCT_REVIEWS[product.id] || DEFAULT_PRODUCT_REVIEWS['prod-1'] || [];

  const averageRating = productReviews.length > 0
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : 5.0;

  const currentPrice = product.price + (selectedVariant?.priceDelta || 0);

  // Share state
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#${product.handle}`
    : `https://ateliermasion.tn/#${product.handle}`;
  const shareText = `Découvrez « ${product.title} » façonné artisanalement chez Atelier Maison (${formatPrice(currentPrice, currency)})`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2400);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors bg-white/80 backdrop-blur-xs border border-stone-200/60 shadow-xs"
          aria-label="Fermer la fiche produit"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Gallery & Guarantees (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-stone-50 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200">
            <div className="space-y-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-200 border border-stone-200/80 shadow-xs">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Wishlist Button on Image */}
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-xs shadow-md border border-stone-200/80 text-stone-700 hover:text-rose-600 transition-all transform active:scale-90"
                  title={isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
                  aria-label={isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-stone-700 hover:text-rose-500'
                    }`}
                  />
                </button>
              </div>

              {/* Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === img
                          ? 'border-stone-900 ring-2 ring-stone-900/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Guarantees in modal */}
            <div className="mt-6 pt-6 border-t border-stone-200/80 space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-stone-700 shrink-0" />
                <span>Livraison Aramex / Yalidine 24h-48h partout en Tunisie</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-stone-700 shrink-0" />
                <span>Option Paiement à la Livraison (Espèces au livreur)</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-stone-700 shrink-0" />
                <span>Satisfait ou échangé sous 7 jours ouvrables</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Tabs (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Stock */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="uppercase tracking-wider font-semibold text-amber-900">
                  {product.category}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {product.stockCount > 0 ? `En stock (${product.stockCount} dispo)` : 'Sur commande'}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
                {product.title}
              </h2>

              {/* Star Rating Summary Bar */}
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className="flex items-center gap-2 group text-left hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(averageRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-900 font-mono tabular-nums">
                  {averageRating.toFixed(1)}/5
                </span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-xs text-stone-600 group-hover:text-stone-900 group-hover:underline">
                  {productReviews.length} avis clients vérifiés
                </span>
              </button>

              {/* Price Row (Tabular Numerals) */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-bold font-mono tabular-nums text-stone-900">
                  {formatPrice(currentPrice, currency)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm font-mono tabular-nums text-stone-400 line-through">
                    {formatPrice(product.compareAtPrice, currency)}
                  </span>
                )}
                <span className="text-xs text-stone-500">TTC</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Variant Selector (if any) */}
              {product.variants && (
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <label className="text-xs font-semibold text-stone-800 block">
                    {product.variants.optionName} : <span className="font-normal text-stone-600">{selectedVariant?.name}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.items.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
                          selectedVariant?.id === v.id
                            ? 'border-stone-900 bg-stone-900 text-white font-medium shadow-xs'
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {v.name} {v.priceDelta > 0 && `(+${formatPrice(v.priceDelta, currency)})`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Contiguous Add To Cart Button */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-stone-700 hover:bg-stone-200 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-mono font-bold text-stone-900 min-w-8 text-center tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-3 py-2 text-stone-700 hover:bg-stone-200 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm ${
                      isSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-900 text-white hover:bg-stone-800'
                    }`}
                  >
                    {isSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Ajouté au panier !</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Ajouter au Panier · {formatPrice(currentPrice * quantity, currency)}</span>
                      </>
                    )}
                  </button>

                  {/* Bouton Ajouter aux favoris */}
                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    className={`py-3 px-3.5 rounded-lg border transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-xs ${
                      isWishlisted
                        ? 'border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-400'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                    title={isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
                    aria-label={isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'text-stone-600 hover:text-rose-500 hover:scale-105'
                      }`}
                    />
                    <span className="hidden sm:inline text-xs font-semibold">
                      {isWishlisted ? 'Favori' : 'Favoris'}
                    </span>
                  </button>
                </div>

                {/* Wishlist Feedback Toast */}
                {wishlistToast && (
                  <div
                    className={`p-2.5 rounded-lg text-xs flex items-center justify-between gap-2 animate-fadeIn transition-all ${
                      wishlistToast.isAdded
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : 'bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          wishlistToast.isAdded ? 'fill-rose-500 text-rose-500' : 'text-stone-500'
                        }`}
                      />
                      <span className="font-medium">{wishlistToast.message}</span>
                    </div>
                    <span className="text-[11px] font-mono text-stone-500">
                      {effectiveWishlist.length} favori{effectiveWishlist.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}

                {/* Share Toggle & Social Icons Tray */}
                <div className="pt-2 border-t border-stone-200/70">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setIsShareOpen(!isShareOpen)}
                      className={`flex items-center gap-1.5 text-xs transition-colors py-1.5 px-2.5 rounded-lg border ${
                        isShareOpen
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-stone-50 text-stone-700 hover:text-stone-900 hover:bg-stone-100 border-stone-200'
                      }`}
                      title="Partager cette création"
                      aria-label="Partager ce produit"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="font-semibold">Partager</span>
                    </button>

                    {isShareOpen && (
                      <span className="text-[11px] text-stone-500 animate-fadeIn">
                        Partager cette création sur :
                      </span>
                    )}
                  </div>

                  {/* Social Share Icons List */}
                  {isShareOpen && (
                    <div className="mt-2.5 p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex flex-wrap items-center gap-2 animate-fadeIn shadow-xs">
                      {/* WhatsApp */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} : ${shareUrl}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold transition-all shadow-xs"
                        title="Partager sur WhatsApp"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        <span>WhatsApp</span>
                      </a>

                      {/* Facebook */}
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold transition-all shadow-xs"
                        title="Partager sur Facebook"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span>Facebook</span>
                      </a>

                      {/* Twitter / X */}
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-xs"
                        title="Partager sur Twitter / X"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span>Twitter (X)</span>
                      </a>

                      {/* Copier le lien */}
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-semibold transition-all shadow-xs"
                        title="Copier le lien"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Lien copié !</span>
                          </>
                        ) : (
                          <>
                            <Link2 className="w-3.5 h-3.5 text-stone-500" />
                            <span>Copier le lien</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Informational & Reviews Tabs */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex border-b border-stone-200 text-xs font-medium overflow-x-auto gap-4">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-2.5 transition-colors whitespace-nowrap ${
                    activeTab === 'desc'
                      ? 'border-b-2 border-stone-900 text-stone-900 font-bold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`pb-2.5 transition-colors whitespace-nowrap ${
                    activeTab === 'materials'
                      ? 'border-b-2 border-stone-900 text-stone-900 font-bold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Caractéristiques
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2.5 transition-colors whitespace-nowrap ${
                    activeTab === 'shipping'
                      ? 'border-b-2 border-stone-900 text-stone-900 font-bold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Livraison Tunisie
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-stone-900 text-stone-900 font-bold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>Avis Clients ({productReviews.length})</span>
                </button>
              </div>

              <div className="pt-4 text-xs text-stone-600 leading-relaxed min-h-32">
                {activeTab === 'desc' && (
                  <p>{product.description}</p>
                )}

                {activeTab === 'materials' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.materials && <li><strong>Matières :</strong> {product.materials}</li>}
                    {product.dimensions && <li><strong>Dimensions :</strong> {product.dimensions}</li>}
                    {product.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-1.5">
                    <p>• Expédié sous 24h ouvrées depuis notre atelier à Tunis.</p>
                    <p>• Transporteurs partenaires : <strong>Aramex</strong>, <strong>Yalidine Express</strong>, <strong>First Delivery</strong>.</p>
                    <p>• Frais de livraison forfaitaires : 7.00 à 8.00 DT (Gratuit dès 150 DT d’achats).</p>
                    <p>• Vous pouvez régler en espèces directement au livreur lors de la livraison.</p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <ProductReviewsSection
                    productId={product.id}
                    productTitle={product.title}
                    initialReviews={productReviews}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
