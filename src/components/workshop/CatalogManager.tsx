import React, { useState } from 'react';
import { Plus, Download, Edit3, Trash2, CheckCircle2, Package, Tag, FileSpreadsheet, Sparkles } from 'lucide-react';
import { Product, Currency } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface CatalogManagerProps {
  products: Product[];
  currency: Currency;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export const CatalogManager: React.FC<CatalogManagerProps> = ({
  products,
  currency,
  onAddProduct,
  onDeleteProduct,
}) => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  // New product state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Maroquinerie',
    price: 95.0,
    compareAtPrice: 120.0,
    shortDescription: '',
    description: '',
    stockCount: 15,
    materials: 'Matières premières artisanales tunisiennes',
    dimensions: 'Taille standard',
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const handle = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title: formData.title,
      handle,
      category: formData.category,
      price: Number(formData.price),
      compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
      featuredImage: '/src/assets/images/hero_artisan_leather_1790977959949.jpg',
      gallery: ['/src/assets/images/hero_artisan_leather_1790977959949.jpg'],
      shortDescription: formData.shortDescription || 'Création artisanale confectionnée à la main en Tunisie.',
      description: formData.description || 'Pièce originale réalisée avec des matières rigoureusement sélectionnées.',
      features: ['Fait main en Tunisie', 'Savoir-faire artisanal', 'Garantie 2 ans'],
      materials: formData.materials,
      dimensions: formData.dimensions,
      inStock: true,
      stockCount: Number(formData.stockCount),
      seo: {
        title: `${formData.title} | Atelier Pro`,
        description: formData.shortDescription || 'Achetez votre création artisanale en Tunisie avec paiement à la livraison.',
        keywords: ['artisanat tunisie', 'fait main']
      }
    };

    onAddProduct(newProd);
    setShowAddForm(false);
    setFormData({
      title: '',
      category: 'Maroquinerie',
      price: 95.0,
      compareAtPrice: 120.0,
      shortDescription: '',
      description: '',
      stockCount: 15,
      materials: 'Matières premières artisanales tunisiennes',
      dimensions: 'Taille standard',
    });
  };

  // Shopify official CSV generator
  const handleExportShopifyCSV = () => {
    const headers = [
      'Handle',
      'Title',
      'Body (HTML)',
      'Vendor',
      'Type',
      'Tags',
      'Published',
      'Option1 Name',
      'Option1 Value',
      'Variant SKU',
      'Variant Price',
      'Variant Compare At Price',
      'Variant Inventory Tracker',
      'Variant Inventory Qty',
      'Variant Requires Shipping',
      'Variant Taxable',
      'Image Src'
    ];

    const rows = products.map((p) => [
      `"${p.handle}"`,
      `"${p.title.replace(/"/g, '""')}"`,
      `"<p>${(p.description || '').replace(/"/g, '""')}</p>"`,
      `"Atelier Maison"`,
      `"${p.category}"`,
      `"${p.category}, Fait main, Tunisie, Artisanat"`,
      `"TRUE"`,
      `"Title"`,
      `"Default Title"`,
      `"${p.handle.toUpperCase()}-01"`,
      `"${p.price.toFixed(2)}"`,
      `"${p.compareAtPrice ? p.compareAtPrice.toFixed(2) : ''}"`,
      `"shopify"`,
      `"${p.stockCount}"`,
      `"TRUE"`,
      `"TRUE"`,
      `"${window.location.origin}${p.featuredImage}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'shopify_catalogue_export_tpe.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full">
            Jalon 2 · Catalogue & Fiches Produits
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Gestion du Catalogue & Export Shopify Officiel
          </h2>
          <p className="text-xs text-stone-500">
            Gérez vos fiches produits, variantes et exportez le fichier CSV normalisé prêt à être importé en 1 clic dans l'admin Shopify.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportShopifyCSV}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exporter CSV Shopify (Officiel)</span>
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter une Fiche Produit</span>
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Fichier <strong>shopify_catalogue_export_tpe.csv</strong> téléchargé ! Vous pouvez l'importer directement dans <em>Shopify Admin &gt; Produits &gt; Importer</em>.</span>
        </div>
      )}

      {/* Add Product Form Modal / Collapsible */}
      {showAddForm && (
        <form onSubmit={handleCreateProduct} className="p-6 bg-stone-50 rounded-xl border border-stone-300 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-700" />
              <span>Créer une nouvelle fiche produit</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-stone-400 hover:text-stone-600 font-bold"
            >
              Annuler
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="font-semibold text-stone-700 block mb-1">Titre du produit *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="ex: Sac Bandoulière Cuir Sauvage"
                className="w-full bg-white border border-stone-300 rounded-md p-2 focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Catégorie *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-md p-2 focus:ring-1 focus:ring-stone-900"
              >
                <option value="Maroquinerie">Maroquinerie</option>
                <option value="Soins & Cosmétiques">Soins & Cosmétiques</option>
                <option value="Maison & Décoration">Maison & Décoration</option>
                <option value="Artisanat d'art">Artisanat d'art</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Prix de vente (DT) *</label>
              <input
                type="number"
                step="0.5"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-white border border-stone-300 rounded-md p-2 font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Prix barré d'origine (DT)</label>
              <input
                type="number"
                step="0.5"
                value={formData.compareAtPrice}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                className="w-full bg-white border border-stone-300 rounded-md p-2 font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Stock initial disponible *</label>
              <input
                type="number"
                required
                value={formData.stockCount}
                onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                className="w-full bg-white border border-stone-300 rounded-md p-2 font-mono"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="font-semibold text-stone-700 block mb-1">Description courte d'accroche *</label>
              <input
                type="text"
                required
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="ex: Cuir pleine fleur tannage végétal, conçu et cousu main."
                className="w-full bg-white border border-stone-300 rounded-md p-2"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="font-semibold text-stone-700 block mb-1">Description complète et histoire</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Racontez la fabrication, les finitions et les conseils d'utilisation..."
                className="w-full bg-white border border-stone-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-stone-300 rounded-md text-stone-700 hover:bg-stone-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-stone-900 text-white rounded-md font-semibold hover:bg-stone-800"
            >
              Enregistrer la fiche produit
            </button>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto rounded-xl border border-stone-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
            <tr>
              <th className="p-3.5">Produit</th>
              <th className="p-3.5">Catégorie</th>
              <th className="p-3.5">Prix (DT)</th>
              <th className="p-3.5">Stock</th>
              <th className="p-3.5">Variantes</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                <td className="p-3.5 flex items-center gap-3">
                  <img
                    src={p.featuredImage}
                    alt={p.title}
                    className="w-10 h-10 rounded object-cover bg-stone-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="font-semibold text-stone-900 block truncate max-w-xs">{p.title}</span>
                    <span className="text-[11px] text-stone-400 font-mono">{p.handle}</span>
                  </div>
                </td>
                <td className="p-3.5 text-stone-600">{p.category}</td>
                <td className="p-3.5 font-mono font-semibold tabular-nums text-stone-900">
                  {formatPrice(p.price, currency)}
                </td>
                <td className="p-3.5">
                  <span className={`font-mono font-medium tabular-nums ${p.stockCount <= 5 ? 'text-amber-800 font-bold' : 'text-emerald-700'}`}>
                    {p.stockCount} unités
                  </span>
                </td>
                <td className="p-3.5 text-stone-500">
                  {p.variants ? `${p.variants.items.length} options (${p.variants.optionName})` : 'Produit unique'}
                </td>
                <td className="p-3.5 text-right">
                  <button
                    onClick={() => onDeleteProduct(p.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 rounded transition-colors"
                    title="Supprimer du catalogue"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
