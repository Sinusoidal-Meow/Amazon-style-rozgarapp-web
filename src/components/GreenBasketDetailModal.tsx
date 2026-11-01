import React from 'react';
import { CatalogueResource } from '../data/catalogue51';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Calendar, 
  HelpCircle,
  ShoppingCart
} from 'lucide-react';
import { Language } from '../types';

interface GreenBasketDetailModalProps {
  resource: CatalogueResource;
  currentLang: Language;
  onClose: () => void;
  onAddToCart?: (resource: CatalogueResource) => void;
}

export const GreenBasketDetailModal: React.FC<GreenBasketDetailModalProps> = ({
  resource,
  currentLang,
  onClose,
  onAddToCart,
}) => {
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F7F2E8] dark:bg-[#2E3E2B] text-[#3F4A36] dark:text-[#E9EFDC] rounded-3xl max-w-2xl w-full border border-[#E2D6BE] dark:border-[#3C4E38] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col transition-colors duration-200"
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#EAE2D2] dark:bg-[#1C2619] border-b border-[#E2D6BE] dark:border-[#3C4E38] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#DDE8C6] dark:bg-[#3A5233] text-[#2F4A2A] dark:text-[#DDE8C6] border border-[#E2D6BE] dark:border-[#3C4E38]">
              {resource.groupName}
            </span>
            <span className="text-xs text-[#7B6A55] dark:text-[#A9B49A] font-medium">
              VanRozgar Master Catalogue Entry
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close details dialog"
            className="p-1 rounded-lg text-[#7B6A55] hover:text-[#2F4A2A] dark:text-[#A9B49A] dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#2E3E2B] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Safety Alert (Bibba & Gunj Vel) */}
          {resource.isNotForEating && (
            <div className="p-4 bg-[#7F1D1D]/90 border-2 border-rose-500 rounded-2xl text-rose-100 space-y-1 shadow-md">
              <div className="flex items-center gap-2 font-black text-sm text-white">
                <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
                <span>CRITICAL SAFETY NOTICE: NOT FOR EATING</span>
              </div>
              <p className="text-xs text-rose-200 leading-relaxed font-medium">
                {resource.safetyWarning}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Left: Botanical Illustration Card */}
            <div className="space-y-3">
              <div className="w-full aspect-square bg-[#DDE8C6] dark:bg-[#1C2619] rounded-2xl p-6 flex items-center justify-center shadow-inner border border-[#E2D6BE] dark:border-[#3C4E38]">
                {resource.image ? (
                  <img
                    src={resource.image}
                    alt={resource.name}
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#4E7A3A] dark:text-[#8DB85A] text-center">
                    <div className="w-20 h-20 rounded-full bg-white dark:bg-[#2E3E2B] flex items-center justify-center mb-3 border border-[#E2D6BE] dark:border-[#3C4E38]">
                      <Layers className="w-10 h-10 text-[#4E7A3A] dark:text-[#8DB85A]" />
                    </div>
                    <span className="font-extrabold text-sm text-[#2F4A2A] dark:text-[#F4F7EA]">Botanical Specimen</span>
                    <span className="text-xs text-[#7B6A55] dark:text-[#A9B49A] font-medium mt-1">Pending Confirmation</span>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-[#7B6A55] dark:text-[#A9B49A] bg-white dark:bg-[#1C2619] p-3 rounded-xl border border-[#E2D6BE] dark:border-[#3C4E38] space-y-1">
                <div className="flex justify-between">
                  <span>Image Style:</span>
                  <strong className="text-[#2F4A2A] dark:text-[#F4F7EA]">Botanical Resource</strong>
                </div>
                <div className="flex justify-between">
                  <span>Pedestal Surface:</span>
                  <strong className="text-[#4E7A3A] dark:text-[#8DB85A]">#DDE8C6 Pista / Natural</strong>
                </div>
              </div>
            </div>

            {/* Right: Details & Metadata */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] leading-tight">
                  {resource.name}
                </h2>
                <p className="text-sm font-bold text-[#4E7A3A] dark:text-[#8DB85A] mt-0.5">
                  {resource.englishName}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                {resource.status === 'ready' && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#DDE8C6] dark:bg-[#3A5233] text-[#2F4A2A] dark:text-[#DDE8C6] border border-[#E2D6BE] dark:border-[#3C4E38]">
                    <CheckCircle2 className="w-4 h-4 text-[#4E7A3A] dark:text-[#8DB85A]" /> Ready for Cataloguing
                  </span>
                )}
                {resource.status === 'check_later' && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#F7F2E8] dark:bg-[#1C2619] text-[#A4551A] dark:text-[#F0A15A] border border-[#E2D6BE] dark:border-[#3C4E38]">
                    <Sparkles className="w-4 h-4 text-[#A4551A] dark:text-[#F0A15A]" /> Check Later
                  </span>
                )}
                {resource.status === 'pending' && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#F7F2E8] dark:bg-[#1C2619] text-[#7B6A55] dark:text-[#A9B49A] border border-[#E2D6BE] dark:border-[#3C4E38]">
                    <HelpCircle className="w-4 h-4 text-[#7B6A55] dark:text-[#A9B49A]" /> Pending Botanical Image
                  </span>
                )}
              </div>

              {/* Price if available */}
              {resource.priceEstimate && (
                <div className="p-3 bg-white dark:bg-[#1C2619] rounded-xl border border-[#E2D6BE] dark:border-[#3C4E38] flex items-baseline justify-between shadow-xs">
                  <span className="text-xs text-[#7B6A55] dark:text-[#A9B49A] font-semibold">Community Baseline Price:</span>
                  <span className="text-lg font-black text-[#A4551A] dark:text-[#F0A15A] font-mono tabular-nums">
                    ₹{resource.priceEstimate} <span className="text-xs text-[#7B6A55] dark:text-[#A9B49A] font-normal">/ {resource.unit}</span>
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#7B6A55] dark:text-[#A9B49A] uppercase tracking-wider block">
                  Botanical Description:
                </span>
                <p className="text-xs sm:text-sm text-[#3F4A36] dark:text-[#E9EFDC] leading-relaxed bg-white dark:bg-[#1C2619] p-3 rounded-xl border border-[#E2D6BE] dark:border-[#3C4E38]">
                  {resource.description}
                </p>
              </div>

              {/* Identification Notes if any */}
              {resource.checkNote && (
                <div className="p-3 bg-[#F7F2E8] dark:bg-[#1C2619] rounded-xl border border-[#E2D6BE] dark:border-[#3C4E38] text-xs space-y-1 text-[#A4551A] dark:text-[#F0A15A]">
                  <strong className="block font-bold">Catalogue Note / Verification Check:</strong>
                  <p className="leading-relaxed text-[11px] italic">"{resource.checkNote}"</p>
                </div>
              )}

              {/* Uses Chips */}
              {resource.uses && resource.uses.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#7B6A55] dark:text-[#A9B49A] uppercase tracking-wider block">
                    Traditional & Commercial Uses:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resource.uses.map((use, idx) => (
                      <span key={idx} className="text-[11px] bg-[#DDE8C6] dark:bg-[#3A5233] text-[#2F4A2A] dark:text-[#DDE8C6] px-2.5 py-0.5 rounded-md font-medium border border-[#E2D6BE] dark:border-[#3C4E38]">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Harvest Season */}
              {resource.harvestSeason && (
                <div className="flex items-center gap-2 text-xs text-[#7B6A55] dark:text-[#A9B49A]">
                  <Calendar className="w-4 h-4 text-[#4E7A3A] dark:text-[#8DB85A]" />
                  <span>Harvest Season: <strong className="text-[#2F4A2A] dark:text-[#F4F7EA]">{resource.harvestSeason}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#EAE2D2] dark:bg-[#1C2619] border-t border-[#E2D6BE] dark:border-[#3C4E38] flex items-center justify-between">
          <div className="text-xs text-[#7B6A55] dark:text-[#A9B49A] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4E7A3A] dark:text-[#8DB85A]" />
            <span>Nashik Community Forest Resource Commons</span>
          </div>

          <div className="flex items-center gap-3">
            {onAddToCart && (
              <button
                onClick={() => {
                  onAddToCart(resource);
                  onClose();
                }}
                className="bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Basket</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="border-[1.5px] border-[#5A3B22] text-[#5A3B22] hover:bg-[#5A3B22]/10 dark:border-[#D8B48A] dark:text-[#D8B48A] dark:hover:bg-[#D8B48A]/10 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
