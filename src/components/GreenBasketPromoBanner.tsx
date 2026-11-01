import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface GreenBasketPromoBannerProps {
  onActionClick: () => void;
}

export const GreenBasketPromoBanner: React.FC<GreenBasketPromoBannerProps> = ({
  onActionClick,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-[#EFE8D8] dark:bg-[#2E3E2B] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E2D6BE] dark:border-[#3C4E38] shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-200">
        {/* Ambient glow */}
        <div className="absolute -left-10 top-0 w-72 h-72 bg-[#DDE8C6]/50 dark:bg-[#3A5233]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#DDE8C6] dark:bg-[#3A5233] text-[#2F4A2A] dark:text-[#DDE8C6] px-3 py-1 rounded-full text-xs font-bold border border-[#E2D6BE] dark:border-[#3C4E38]">
            <Sparkles className="w-3.5 h-3.5 text-[#A4551A] dark:text-[#F0A15A]" />
            <span>COMMUNITY FOREST HARVEST · NASHIK COMMONS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#2F4A2A] dark:text-[#F4F7EA] tracking-tight leading-tight">
            Discover the Richness of <br className="hidden sm:inline" />
            <span className="text-[#4E7A3A] dark:text-[#8DB85A]">Authentic Forest Resources</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#3F4A36] dark:text-[#E9EFDC] leading-relaxed font-normal">
            Support rural tribal autonomy and native Western Ghats biodiversity. From wild forest honey and gum karaya to high-value saplings and Triphala ingredients—100% of proceeds go directly to Gram Sabha Community Funds.
          </p>

          <div className="pt-2">
            <button
              onClick={onActionClick}
              className="bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore All 52 Resources</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Feature Display */}
        <div className="relative flex items-center justify-center shrink-0">
          <div className="bg-[#DDE8C6] dark:bg-[#1C2619] rounded-2xl p-4 shadow-md border border-[#E2D6BE] dark:border-[#3C4E38] relative">
            <img
              src="/assets/aistudio/fruit_chinch_eb3a6c56.jpg"
              alt="Forest Produce"
              className="w-44 h-44 sm:w-52 sm:h-52 object-contain drop-shadow-sm"
            />

            {/* Circular badge */}
            <div className="absolute -bottom-3 -right-3 bg-[#5A3B22] text-[#F7F2E8] dark:bg-[#3A5233] dark:text-[#DDE8C6] text-center rounded-full w-20 h-20 sm:w-22 sm:h-22 p-2 flex flex-col items-center justify-center shadow-lg border-2 border-white dark:border-[#3C4E38] pointer-events-none">
              <span className="text-[10px] sm:text-[11px] font-black uppercase leading-tight">
                ETHICAL HARVEST
              </span>
              <span className="text-[9px] font-bold text-[#DDE8C6] mt-0.5">
                FRA 2006
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
