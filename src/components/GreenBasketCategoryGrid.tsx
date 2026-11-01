import React, { useMemo, useState } from 'react';
import { CATEGORY_GROUPS, ALL_51_RESOURCES, CatalogueResource } from '../data/catalogue51';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import { Language } from '../types';

interface GreenBasketCategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  onSelectResource?: (resource: CatalogueResource) => void;
  currentLang: Language;
}

export const GreenBasketCategoryGrid: React.FC<GreenBasketCategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectResource,
  currentLang,
}) => {
  // Category representative images from the verified assets
  const categoryImages: { [key: string]: string } = {
    bamboo: '/assets/aistudio/bamboo_6c42a839.jpg',
    fruit: '/assets/aistudio/fruit_sitaphal_ee60681b.jpg',
    nuts_seeds: '/assets/aistudio/nuts_bibba_9d3d9f5b.jpg',
    flowers: '/assets/aistudio/flowers_moh_6e6f8d68.jpg',
    medicine_herbs: '/assets/aistudio/herb_behda_62555b05.jpg',
    forest_produce: '/assets/aistudio/forest_shendari_9affd0b0.jpg',
    timber_trees: '/assets/aistudio/timber_shivan_bc4d59be.jpg',
    shade_sacred_trees: '/assets/aistudio/shade_peepal_246e31fd.jpg',
    not_sure_yet: '/assets/aistudio/shade_shirish_b31c1e19.jpg',
  };

  // Map category resources from the verified source of truth
  const categoryResourcesMap = useMemo(() => {
    const map: Record<string, CatalogueResource[]> = {};
    CATEGORY_GROUPS.filter((c) => c.id !== 'all').forEach((cat) => {
      map[cat.id] = ALL_51_RESOURCES.filter((r) => r.category === cat.id);
    });
    return map;
  }, []);

  // Track expanded card for touch/mobile devices
  const [expandedCatId, setExpandedCatId] = useState<string | null>(null);

  const totalSpeciesCount = useMemo(() => {
    return ALL_51_RESOURCES.length;
  }, []);

  return (
    <section 
      id="categories-section" 
      aria-label="Shop by forest resource category"
      className="max-w-7xl mx-auto px-4 py-10 transition-colors duration-200"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#2F4A2A] dark:text-[#F4F7EA] tracking-tight">
              Shop by Category
            </h2>
            <span className="hidden sm:inline text-xs text-[#7B6A55] dark:text-[#A9B49A] font-medium ml-2 bg-white/60 dark:bg-[#2E3E2B] px-2.5 py-0.5 rounded-full border border-[#E2D6BE] dark:border-[#3C4E38]">
              {CATEGORY_GROUPS.length - 1} Forest Groups · {totalSpeciesCount} Total Species
            </span>
          </div>
          <p className="text-xs text-[#7B6A55] dark:text-[#A9B49A] flex items-center gap-1.5 pt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-[#4E7A3A] dark:text-[#8DB85A]" />
            <span>
              {currentLang === 'mr' 
                ? 'वनसंपदा पाहण्यासाठी कार्डवर होव्हर करा. संपूर्ण यादीसाठी श्रेणी निवडा.' 
                : 'Hover over any category to preview botanical specimens. Click to browse full collection.'}
            </span>
          </p>
        </div>

        <button
          onClick={() => onSelectCategory('all')}
          className="group self-start sm:self-center text-xs sm:text-sm font-bold text-[#4E7A3A] dark:text-[#8DB85A] hover:text-[#3E622E] dark:hover:text-[#9EC86B] flex items-center gap-1.5 cursor-pointer transition py-1.5 px-3 rounded-xl border border-[#E2D6BE] dark:border-[#3C4E38] bg-white dark:bg-[#2E3E2B] hover:shadow-xs"
        >
          <span>View all ({totalSpeciesCount})</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Grid of Restored Category Cards with Subtle Specimen Reveal */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4.5">
        {CATEGORY_GROUPS.filter((c) => c.id !== 'all').map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const mainImg = categoryImages[cat.id];
          const allCatResources = categoryResourcesMap[cat.id] || [];
          
          // Up to 3 emerging specimen preview cards (excluding the main image if possible, or top items)
          const previewResources = allCatResources.slice(0, 3);
          const categoryTitle = currentLang === 'mr' ? cat.marathiName : cat.name;
          const isExpanded = expandedCatId === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => {
                // Toggle preview for touch devices, or select category
                if (window.innerWidth < 640) {
                  setExpandedCatId(isExpanded ? null : cat.id);
                } else {
                  onSelectCategory(cat.id);
                }
              }}
              className={`group relative rounded-2xl p-3.5 sm:p-4 transition-all duration-300 cursor-pointer flex flex-col items-center text-center border shadow-xs select-none hover:-translate-y-1 hover:shadow-md ${
                isSelected
                  ? 'bg-[#DDE8C6] border-[#4E7A3A] ring-2 ring-[#4E7A3A] dark:bg-[#3A5233] dark:border-[#8DB85A] dark:ring-2 dark:ring-[#8DB85A] shadow-sm'
                  : 'bg-white hover:bg-[#FDFBF7] border-[#E2D6BE] hover:border-[#4E7A3A] dark:bg-[#2E3E2B] dark:hover:bg-[#344831] dark:border-[#3C4E38] dark:hover:border-[#8DB85A]'
              }`}
            >
              {/* Selected corner dot */}
              {isSelected && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#4E7A3A] dark:bg-[#8DB85A] shadow-xs z-20" />
              )}

              {/* Main Illustration Area with Subtle Fan-out Previews */}
              <div className="relative w-full aspect-square max-w-[120px] sm:max-w-[130px] my-1 flex items-center justify-center">
                
                {/* Emerging Specimen 1 (Left fan) */}
                {previewResources[0] && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectResource?.(previewResources[0]);
                    }}
                    title={`View ${previewResources[0].name} (${previewResources[0].englishName})`}
                    className={`absolute z-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white dark:bg-[#1C2619] border border-[#E2D6BE] dark:border-[#3C4E38] shadow-md p-1 overflow-hidden transition-all duration-300 ease-out cursor-pointer hover:scale-110 hover:border-[#4E7A3A] dark:hover:border-[#8DB85A] hover:z-30 ${
                      isExpanded
                        ? '-translate-x-10 -translate-y-9 -rotate-12 opacity-100 pointer-events-auto scale-95'
                        : 'opacity-0 scale-75 -translate-x-1/2 -translate-y-1/2 group-hover:-translate-x-10 group-hover:-translate-y-9 group-hover:-rotate-12 group-hover:opacity-100 group-hover:scale-95 group-hover:pointer-events-auto'
                    }`}
                  >
                    <img
                      src={previewResources[0].image || '/assets/products/forest.png'}
                      alt={previewResources[0].name}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>
                )}

                {/* Emerging Specimen 2 (Center-top fan) */}
                {previewResources[1] && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectResource?.(previewResources[1]);
                    }}
                    title={`View ${previewResources[1].name} (${previewResources[1].englishName})`}
                    className={`absolute z-0 w-13 h-13 sm:w-15 sm:h-15 rounded-xl bg-white dark:bg-[#1C2619] border border-[#E2D6BE] dark:border-[#3C4E38] shadow-md p-1 overflow-hidden transition-all duration-300 ease-out cursor-pointer hover:scale-110 hover:border-[#4E7A3A] dark:hover:border-[#8DB85A] hover:z-30 ${
                      isExpanded
                        ? '-translate-x-1/2 -translate-y-12 rotate-0 opacity-100 pointer-events-auto scale-100'
                        : 'opacity-0 scale-75 -translate-x-1/2 -translate-y-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-12 group-hover:rotate-0 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
                    }`}
                  >
                    <img
                      src={previewResources[1].image || '/assets/products/forest.png'}
                      alt={previewResources[1].name}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>
                )}

                {/* Emerging Specimen 3 (Right fan) */}
                {previewResources[2] && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectResource?.(previewResources[2]);
                    }}
                    title={`View ${previewResources[2].name} (${previewResources[2].englishName})`}
                    className={`absolute z-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white dark:bg-[#1C2619] border border-[#E2D6BE] dark:border-[#3C4E38] shadow-md p-1 overflow-hidden transition-all duration-300 ease-out cursor-pointer hover:scale-110 hover:border-[#4E7A3A] dark:hover:border-[#8DB85A] hover:z-30 ${
                      isExpanded
                        ? 'translate-x-2 -translate-y-9 rotate-12 opacity-100 pointer-events-auto scale-95'
                        : 'opacity-0 scale-75 -translate-x-1/2 -translate-y-1/2 group-hover:translate-x-2 group-hover:-translate-y-9 group-hover:rotate-12 group-hover:opacity-100 group-hover:scale-95 group-hover:pointer-events-auto'
                    }`}
                  >
                    <img
                      src={previewResources[2].image || '/assets/products/forest.png'}
                      alt={previewResources[2].name}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>
                )}

                {/* The Primary Category Botanical Illustration (Foreground, 100% visible) */}
                <div className="relative z-10 w-22 h-22 sm:w-26 sm:h-26 bg-[#DDE8C6] dark:bg-[#1C2619] rounded-2xl p-2 flex items-center justify-center shadow-inner border border-[#E2D6BE] dark:border-[#3C4E38] overflow-hidden transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-0.5">
                  {mainImg ? (
                    <img
                      src={mainImg}
                      alt={cat.name}
                      className="w-full h-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-106 pointer-events-none"
                    />
                  ) : (
                    <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                      {cat.icon}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Count */}
              <div className="mt-2.5 space-y-0.5">
                <h3 className="font-extrabold text-xs sm:text-sm text-[#2F4A2A] dark:text-[#F4F7EA] group-hover:text-[#4E7A3A] dark:group-hover:text-[#8DB85A] transition-colors line-clamp-1">
                  {categoryTitle}
                </h3>
                <span className="text-[11px] text-[#7B6A55] dark:text-[#A9B49A] font-medium block">
                  {cat.count} {currentLang === 'mr' ? 'प्रजाती' : 'items'}
                </span>
              </div>

              {/* Browse Category Link Action */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCategory(cat.id);
                }}
                className={`mt-2.5 py-1 px-2.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-[#4E7A3A] text-white dark:bg-[#8DB85A] dark:text-[#1C2619]'
                    : 'text-[#4E7A3A] dark:text-[#8DB85A] hover:bg-[#DDE8C6]/50 dark:hover:bg-[#3A5233]/40'
                }`}
              >
                <span>{currentLang === 'mr' ? 'ब्राउझ करा' : 'Browse'}</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GreenBasketCategoryGrid;
