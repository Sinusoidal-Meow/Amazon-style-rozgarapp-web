import React from 'react';
import { CatalogueResource } from '../data/catalogue51';
import { 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Eye, 
  Sparkles, 
  ShoppingCart,
  Layers
} from 'lucide-react';
import { Language } from '../types';

interface GreenBasketProductCardProps {
  resource: CatalogueResource;
  currentLang: Language;
  onSelect: (resource: CatalogueResource) => void;
  onQuickAdd?: (resource: CatalogueResource, e: React.MouseEvent) => void;
}

export const GreenBasketProductCard: React.FC<GreenBasketProductCardProps> = ({
  resource,
  currentLang,
  onSelect,
  onQuickAdd,
}) => {
  return (
    <div
      onClick={() => onSelect(resource)}
      className="group relative bg-white hover:bg-[#F7F2E8] dark:bg-[#2E3E2B] dark:hover:bg-[#344831] rounded-3xl border border-[#E2D6BE] hover:border-[#4E7A3A] dark:border-[#3C4E38] dark:hover:border-[#8DB85A] p-4 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 cursor-pointer select-none h-full"
    >
      {/* Top Header Tag Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Category Chip */}
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#DDE8C6] text-[#2F4A2A] dark:bg-[#3A5233] dark:text-[#DDE8C6] border border-[#E2D6BE] dark:border-[#3C4E38] uppercase tracking-wider">
            {resource.groupName}
          </span>

          {/* Availability Status Badge */}
          {resource.status === 'ready' && !resource.isNotForEating && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#4E7A3A] dark:text-[#8DB85A] bg-[#DDE8C6]/50 dark:bg-[#3A5233]/60 px-2 py-0.5 rounded-full border border-[#E2D6BE] dark:border-[#3C4E38]">
              <CheckCircle2 className="w-3 h-3 text-[#4E7A3A] dark:text-[#8DB85A]" /> Ready
            </span>
          )}
          {resource.status === 'check_later' && (
            <span 
              className="inline-flex items-center gap-1 text-[10px] font-bold text-[#A4551A] dark:text-[#F0A15A] bg-[#F7F2E8] dark:bg-[#1C2619] px-2 py-0.5 rounded-full border border-[#E2D6BE] dark:border-[#3C4E38]" 
              title={resource.checkNote}
            >
              <Sparkles className="w-3 h-3 text-[#A4551A] dark:text-[#F0A15A]" /> Check Later
            </span>
          )}
          {resource.status === 'pending' && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7B6A55] dark:text-[#A9B49A] bg-[#F7F2E8] dark:bg-[#1C2619] px-2 py-0.5 rounded-full border border-[#E2D6BE] dark:border-[#3C4E38]">
              <HelpCircle className="w-3 h-3 text-[#7B6A55] dark:text-[#A9B49A]" /> Pending
            </span>
          )}
        </div>

        {/* Safety Warning Badge */}
        {resource.isNotForEating && (
          <div className="mb-2.5 bg-[#7F1D1D] text-rose-100 text-[10px] font-bold px-2.5 py-1 rounded-xl border border-rose-500 flex items-center gap-1.5 shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>NON-EDIBLE · MEDICINAL / CRAFT USE ONLY</span>
          </div>
        )}

        {/* Botanical Image Showcase on Pista Pedestal #DDE8C6 in Light and #1C2619 in Dark */}
        <div className="relative w-full aspect-square bg-[#DDE8C6] dark:bg-[#1C2619] rounded-2xl p-4 flex items-center justify-center overflow-hidden mb-3.5 shadow-inner border border-[#E2D6BE] dark:border-[#3C4E38]">
          {resource.image ? (
            <img
              src={resource.image}
              alt={`${resource.name} - ${resource.englishName}`}
              className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-106"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-[#4E7A3A] dark:text-[#8DB85A] text-center p-2">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-[#2E3E2B] flex items-center justify-center mb-2 border border-[#E2D6BE] dark:border-[#3C4E38]">
                <Layers className="w-8 h-8 text-[#4E7A3A] dark:text-[#8DB85A]" />
              </div>
              <span className="text-xs font-bold text-[#2F4A2A] dark:text-[#F4F7EA]">Botanical Specimen</span>
              <span className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A] font-medium">Pending Confirmation</span>
            </div>
          )}

          {/* Subtle CFR Harvest Verification Stamp */}
          <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-[#2E3E2B]/90 backdrop-blur-xs text-[9px] font-bold text-[#2F4A2A] dark:text-[#F4F7EA] border border-[#E2D6BE] dark:border-[#3C4E38] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E7A3A] dark:bg-[#8DB85A]" />
            <span>CFR Harvest</span>
          </div>
        </div>

        {/* Resource Botanical & Market Details */}
        <div className="space-y-1">
          {/* Main Title & Price Header */}
          <div className="flex items-baseline justify-between gap-1.5">
            <h3 className="font-black text-base sm:text-lg text-[#2F4A2A] dark:text-[#F4F7EA] group-hover:text-[#4E7A3A] dark:group-hover:text-[#8DB85A] transition leading-snug truncate">
              {resource.name}
            </h3>
            {resource.priceEstimate && (
              <span className="text-sm sm:text-base font-black text-[#A4551A] dark:text-[#F0A15A] font-mono shrink-0 tabular-nums">
                ₹{resource.priceEstimate}
                <span className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A] font-normal">/{resource.unit?.split(' ')[0]}</span>
              </span>
            )}
          </div>

          {/* Alternative / English Name */}
          <p className="text-xs font-semibold text-[#7B6A55] dark:text-[#A9B49A] truncate">
            {resource.englishName}
          </p>

          {/* Short Botanical & Usage Description */}
          <p className="text-[11px] sm:text-xs text-[#3F4A36] dark:text-[#E9EFDC] leading-relaxed line-clamp-2 min-h-[2.5rem] font-normal">
            {resource.description}
          </p>

          {/* Check Note if available */}
          {resource.checkNote && (
            <p className="text-[10px] text-[#A4551A] dark:text-[#F0A15A] bg-[#F7F2E8] dark:bg-[#1C2619] px-2 py-1 rounded-lg border border-[#E2D6BE] dark:border-[#3C4E38] line-clamp-1 italic">
              Note: {resource.checkNote}
            </p>
          )}
        </div>
      </div>

      {/* Action Footer: View Details & Quick Add */}
      <div className="pt-3 border-t border-[#E2D6BE] dark:border-[#3C4E38] mt-3 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(resource);
          }}
          className="flex-1 bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </button>

        {onQuickAdd && !resource.isNotForEating && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(resource, e);
            }}
            title="Quick add to basket"
            aria-label={`Add ${resource.name} to basket`}
            className="w-9 h-9 rounded-xl border border-[#5A3B22] text-[#5A3B22] hover:bg-[#5A3B22]/10 dark:border-[#D8B48A] dark:text-[#D8B48A] dark:hover:bg-[#D8B48A]/10 flex items-center justify-center transition cursor-pointer shadow-xs active:scale-95 shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
