import React from 'react';
import { Trees, ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface GreenBasketCommunityBannerProps {
  onLearnMore: () => void;
}

export const GreenBasketCommunityBanner: React.FC<GreenBasketCommunityBannerProps> = ({
  onLearnMore,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-[#EFE8D8] dark:bg-[#2E3E2B] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E2D6BE] dark:border-[#3C4E38] shadow-lg relative overflow-hidden transition-colors duration-200">
        {/* Decorative corner ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#DDE8C6]/50 dark:bg-[#3A5233]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left: Forest Steward / Harvester Visual Card */}
          <div className="md:col-span-4 flex items-center justify-center">
            <div className="relative w-full max-w-xs bg-white dark:bg-[#1C2619] rounded-2xl p-4 border border-[#E2D6BE] dark:border-[#3C4E38] text-center shadow-md">
              <div className="bg-[#DDE8C6] dark:bg-[#3A5233] rounded-xl p-3 mb-3 flex items-center justify-center shadow-inner">
                <img
                  src="/assets/aistudio/nuts_kaju_3e05b92d.jpg"
                  alt="Forest Harvest"
                  className="w-40 h-40 object-contain drop-shadow-sm"
                />
              </div>
              <span className="text-xs font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] block">
                Tribal Forest Stewards
              </span>
              <p className="text-[11px] text-[#7B6A55] dark:text-[#A9B49A] mt-0.5">
                Katkari, Mahadeo Koli & Warli collectors in Nashik district
              </p>
            </div>
          </div>

          {/* Center: Community Narrative & CTA */}
          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#4E7A3A] dark:text-[#8DB85A] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#A4551A] dark:text-[#F0A15A]" />
              <span>WELCOME TO VANROZGAR</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] leading-tight">
              From Forest Communities <br />
              <span className="text-[#4E7A3A] dark:text-[#8DB85A]">To Your Marketplace</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#3F4A36] dark:text-[#E9EFDC] leading-relaxed font-normal">
              We connect conscious buyers directly with 14 tribal Gram Sabhas in Nashik. Every forest fruit, medicinal bark, raw honey comb, and sapling is collected using non-destructive traditional methods recognized under the Forest Rights Act (FRA 2006).
            </p>

            <button
              onClick={onLearnMore}
              className="bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-sm cursor-pointer group"
            >
              <span>Explore 14 Gram Sabhas</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: 3 Genuine Baseline Stats */}
          <div className="md:col-span-3 space-y-3">
            <div className="bg-white/80 dark:bg-[#1C2619]/80 backdrop-blur-xs p-4 rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38] space-y-1 shadow-xs">
              <div className="flex items-center gap-2 text-[#4E7A3A] dark:text-[#8DB85A]">
                <MapPin className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black text-[#2F4A2A] dark:text-[#F4F7EA]">14+</span>
              </div>
              <strong className="text-xs text-[#2F4A2A] dark:text-[#F4F7EA] block font-bold">
                Local Gram Sabhas
              </strong>
              <p className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A]">
                Deola, Dindori & Trimbakeshwar
              </p>
            </div>

            <div className="bg-white/80 dark:bg-[#1C2619]/80 backdrop-blur-xs p-4 rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38] space-y-1 shadow-xs">
              <div className="flex items-center gap-2 text-[#5A3B22] dark:text-[#D8B48A]">
                <Trees className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black text-[#2F4A2A] dark:text-[#F4F7EA]">52</span>
              </div>
              <strong className="text-xs text-[#2F4A2A] dark:text-[#F4F7EA] block font-bold">
                Forest Resources
              </strong>
              <p className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A]">
                Documented in master catalogue
              </p>
            </div>

            <div className="bg-white/80 dark:bg-[#1C2619]/80 backdrop-blur-xs p-4 rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38] space-y-1 shadow-xs">
              <div className="flex items-center gap-2 text-[#A4551A] dark:text-[#F0A15A]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black text-[#2F4A2A] dark:text-[#F4F7EA]">2,019 Ha</span>
              </div>
              <strong className="text-xs text-[#2F4A2A] dark:text-[#F4F7EA] block font-bold">
                Protected CFR Canopy
              </strong>
              <p className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A]">
                Raah Foundation certified baseline
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
