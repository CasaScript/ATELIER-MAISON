import React from 'react';
import { X, Check, Palette, Type, Layout } from 'lucide-react';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePalette: string;
  onSelectPalette: (palette: string) => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
  activePalette,
  onSelectPalette,
}) => {
  if (!isOpen) return null;

  const palettes = [
    {
      id: 'terracotta',
      name: 'Terre Cuite & Lin Naturel',
      desc: 'Idéal pour l’artisanat, la céramique et la maroquinerie authentique.',
      colors: ['#78350f', '#fef3c7', '#1c1917']
    },
    {
      id: 'minimalist',
      name: 'Atelier Minimaliste Noir & Craie',
      desc: 'Lignes architecturales épurées, design contemporain et maroquinerie haut de gamme.',
      colors: ['#18181b', '#f4f4f5', '#71717a']
    },
    {
      id: 'olive',
      name: 'Botanique Olive & Ambre',
      desc: 'Recommandé pour les cosmétiques naturels, huiles de beauté et soins bio.',
      colors: ['#065f46', '#ecfdf5', '#92400e']
    },
    {
      id: 'indigo',
      name: 'Bleu Méditerranée & Sable',
      desc: 'Évocation des côtes tunisiennes (Sidi Bou Saïd, Cap Bon) et du linge de maison.',
      colors: ['#1e3a8a', '#eff6ff', '#b45309']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-700" />
            <h3 className="text-base font-serif font-bold text-stone-900">
              Personnalisation de l'Identité Visuelle
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          Testez différentes ambiances de marque pour votre boutique Shopify. Vos couleurs et typographies sont harmonisées instantanément.
        </p>

        <div className="space-y-3">
          {palettes.map((p) => {
            const isSelected = activePalette === p.id;
            return (
              <div
                key={p.id}
                onClick={() => onSelectPalette(p.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">{p.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <p className="text-[11px] text-stone-500 leading-tight">{p.desc}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                  {p.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
        >
          Appliquer & Fermer
        </button>
      </div>
    </div>
  );
};
