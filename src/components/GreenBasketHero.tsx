import React from 'react';
import { 
  ArrowRight, 
  Trees, 
  Sparkles, 
  Droplet,
  HeartHandshake,
  Layers
} from 'lucide-react';
import { Language } from '../types';
import { HeroOrbitCard } from './HeroOrbitCard';

interface GreenBasketHeroProps {
  currentLang: Language;
  onExploreClick: () => void;
  onCategoriesClick: () => void;
}

export const GreenBasketHero: React.FC<GreenBasketHeroProps> = ({
  currentLang,
  onExploreClick,
  onCategoriesClick,
}) => {
  return (
    <section className="relative bg-[#F7F2E8] dark:bg-[#1C2619] py-12 md:py-16 lg:py-20 px-4 overflow-hidden border-b border-[#E2D6BE] dark:border-[#3C4E38] transition-colors duration-200">
      {/* Subtle organic ambient glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#DDE8C6]/60 dark:bg-[#3A5233]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#E2D6BE]/50 dark:bg-[#2E3E2B]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Heading, Description, CTA, Trust Badges */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tag chip */}
          <div className="inline-flex items-center gap-2 bg-[#DDE8C6] dark:bg-[#3A5233] text-[#2F4A2A] dark:text-[#DDE8C6] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#E2D6BE] dark:border-[#3C4E38] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A4551A] dark:text-[#F0A15A]" />
            <span>Community Forest Resource (CFR) Marketplace</span>
          </div>

          {/* Dominant Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-[#2F4A2A] dark:text-[#F4F7EA]">
            Forest Resources.<br />
            <span className="text-[#4E7A3A] dark:text-[#8DB85A]">Stronger Livelihoods.</span><br />
            <span className="text-[#5A3B22] dark:text-[#D8B48A]">Thriving Communities.</span>
          </h1>

          {/* Description */}
          <p className="text-[#3F4A36] dark:text-[#E9EFDC] text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed font-normal">
            Discover 52 community-sourced forest resources, wild seasonal fruits, medicinal plants, bamboo crafts, and native saplings directly from forest-stewarding Gram Sabhas in Nashik.
          </p>

          {/* Primary & Outline CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:text-[#1C2619] dark:hover:bg-[#9EC86B] font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer group hover:scale-[1.02]"
            >
              <span>Explore 52 Resources</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onCategoriesClick}
              className="border-[1.5px] border-[#5A3B22] text-[#5A3B22] hover:bg-[#5A3B22]/10 dark:border-[#D8B48A] dark:text-[#D8B48A] dark:hover:bg-[#D8B48A]/10 font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition cursor-pointer flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Browse Categories</span>
            </button>
          </div>

          {/* 3 Compact Trust / Sustainability Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#E2D6BE] dark:border-[#3C4E38]">
            <div className="flex items-center gap-3 bg-white/70 dark:bg-[#2E3E2B]/80 p-3 rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38]">
              <div className="w-10 h-10 rounded-full bg-[#DDE8C6] dark:bg-[#3A5233] flex items-center justify-center shrink-0">
                <Trees className="w-5 h-5 text-[#4E7A3A] dark:text-[#8DB85A]" />
              </div>
              <div className="text-xs">
                <strong className="block text-[#2F4A2A] dark:text-[#F4F7EA] font-bold">100% Community</strong>
                <span className="text-[#7B6A55] dark:text-[#A9B49A] text-[11px]">FRA 2006 Rights</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/70 dark:bg-[#2E3E2B]/80 p-3 rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38]">
              <div className="w-10 h-10 rounded-full bg-[#DDE8C6] dark:bg-[#3A5233] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-[#5A3B22] dark:text-[#D8B48A]" />
              </div>
              <div className="text-xs">
                <strong className="block text-[#2F4A2A] dark:text-[#F4F7EA] font-bold">Direct Rural Benefit</strong>
                <span className="text-[#7B6A55] dark:text-[#A9B49A] text-[11px]">Fair Gram Sabha Trade</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/70 dark:bg-[#2E3E2B]/80 p-3 rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38]">
              <div className="w-10 h-10 rounded-full bg-[#DDE8C6] dark:bg-[#3A5233] flex items-center justify-center shrink-0">
                <Droplet className="w-5 h-5 text-[#A4551A] dark:text-[#F0A15A]" />
              </div>
              <div className="text-xs">
                <strong className="block text-[#2F4A2A] dark:text-[#F4F7EA] font-bold">2,019 Ha Protected</strong>
                <span className="text-[#7B6A55] dark:text-[#A9B49A] text-[11px]">Watershed Stewardship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Orbital Forest Resource Showcase */}
        <div className="lg:col-span-5 flex justify-center">
          <HeroOrbitCard onSelectResource={() => onExploreClick()} />
        </div>
      </div>
    </section>
  );
};
