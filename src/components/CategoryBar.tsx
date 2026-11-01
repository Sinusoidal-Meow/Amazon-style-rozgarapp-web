import React from 'react';
import { Category, Language, ProductListing } from '../types';
import { getLocalizedText, resolveAssetUrl } from '../utils/helpers';
import { Sparkles, Layers } from 'lucide-react';

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  products: ProductListing[];
  currentLang: Language;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  products,
  currentLang,
}) => {
  const getCategoryCount = (slug: string) => {
    if (slug === 'all') return products.length;
    return products.filter(
      (p) => p.categorySlug === slug || p.webCategory === slug
    ).length;
  };

  return (
    <div className="bg-white border-b border-stone-200 shadow-xs py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
        {/* All Items Button */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 shadow-xs ${
            selectedCategory === 'all'
              ? 'bg-emerald-800 text-white shadow-emerald-900/20'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Produce</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            selectedCategory === 'all' ? 'bg-emerald-950 text-emerald-200' : 'bg-stone-200 text-stone-600'
          }`}>
            {products.length}
          </span>
        </button>

        {/* Categories */}
        {categories.map((c) => {
          const isSelected = selectedCategory === c.slug;
          const count = getCategoryCount(c.slug);

          return (
            <button
              key={c.slug}
              onClick={() => onSelectCategory(c.slug)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 shadow-xs ${
                isSelected
                  ? 'bg-emerald-800 text-white shadow-emerald-900/20'
                  : 'bg-stone-50 text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200'
              }`}
            >
              {c.defaultIcon ? (
                <img
                  src={resolveAssetUrl(c.defaultIcon)}
                  alt=""
                  className="w-4 h-4 object-contain rounded-full"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              )}
              <span>{getLocalizedText(c.name, currentLang)}</span>
              {count > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-emerald-950 text-emerald-200' : 'bg-stone-200 text-stone-600'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
