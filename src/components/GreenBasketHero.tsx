import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Layers 
} from 'lucide-react';
import { Language } from '../types';
import { ALL_51_RESOURCES, CatalogueResource } from '../data/catalogue51';
import { computeParallaxOffsets } from '../utils/heroData';

interface GreenBasketHeroProps {
  currentLang: Language;
  onExploreClick: () => void;
  onCategoriesClick: () => void;
  onSelectResource?: (resource: CatalogueResource) => void;
  totalCount?: number;
}

export const GreenBasketHero: React.FC<GreenBasketHeroProps> = ({
  currentLang,
  onExploreClick,
  onCategoriesClick,
  totalCount = ALL_51_RESOURCES.length,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({
    bgX: 0,
    bgY: 0,
    mistX: 0,
    shelterX: 0,
    shelterY: 0,
    floatX: 0,
    floatY: 0,
  });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Mouse move handler for smooth multi-plane parallax depth
  useEffect(() => {
    if (isReducedMotion) return;

    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const offsets = computeParallaxOffsets(clientX, clientY, rect.width, rect.height);
        setMouseOffset(offsets);
      });
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (node) node.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  // Localized copy
  const eyebrowText = currentLang === 'mr' 
    ? 'सामुदायिक वन हक्क (CFR) बाजारपेठ' 
    : currentLang === 'hi'
    ? 'सामुदायिक वन अधिकार (CFR) बाजार'
    : 'COMMUNITY FOREST RESOURCE MARKETPLACE';

  const descText = currentLang === 'mr'
    ? `नाशिकमधील वन-संवर्धक ग्रामसभांकडून थेट गोळा केलेली ${totalCount} सत्यापित वन संसाधने, रानफळे, औषधी वनस्पती, बांबू आणि स्थानिक रोपे एक्सप्लोर करा.`
    : currentLang === 'hi'
    ? `नासिक की ग्राम सभाओं से सीधे प्राप्त ${totalCount} सत्यापित वन संसाधन, मौसमी फल, औषधीय पौधे और बांस उत्पाद देखें।`
    : `Discover ${totalCount} community-sourced forest resources, wild seasonal fruits, medicinal plants, bamboo crafts, and native saplings directly from forest-stewarding Gram Sabhas in Nashik.`;

  const primaryBtnText = currentLang === 'mr'
    ? `सर्व ${totalCount} संसाधने एक्सप्लोर करा`
    : currentLang === 'hi'
    ? `सभी ${totalCount} संसाधन देखें`
    : `Explore ${totalCount} Resources`;

  const secondaryBtnText = currentLang === 'mr'
    ? 'गट व श्रेण्या'
    : currentLang === 'hi'
    ? 'श्रेणियां देखें'
    : 'Browse Categories';

  return (
    <section 
      ref={containerRef}
      id="hero-section-root"
      aria-label="VanRozgar Living Forest Hero"
      className="relative w-full h-[calc(100svh-88px)] min-h-[580px] max-h-[1100px] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* ========================================================================= */}
      {/* 1. FULL-SCREEN CINEMATIC LIVING FOREST PHOTOGRAPHIC BACKGROUND             */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 bg-cover bg-[75%_center] md:bg-center scale-[1.04] transition-transform duration-300 ease-out"
        style={{ 
          backgroundImage: `url('/assets/hero/hero_forest_cinematic.jpg')`,
          transform: isReducedMotion 
            ? 'scale(1.02)' 
            : `scale(1.04) translate3d(${mouseOffset.bgX}px, ${mouseOffset.bgY}px, 0)`,
        }}
        role="img"
        aria-label="Cinematic golden hour sunrise over lush Western Ghats forest hills in Nashik, Maharashtra with traditional forest-produce collection shelter"
      />

      {/* ========================================================================= */}
      {/* 2. ATMOSPHERIC ROLLING MIST LAYER                                         */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 pointer-events-none select-none opacity-30 mix-blend-screen animate-hero-mist"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 60%, rgba(255, 255, 255, 0.4) 0%, rgba(220, 235, 210, 0.2) 40%, transparent 80%)`,
          transform: isReducedMotion ? 'none' : `translate3d(${mouseOffset.mistX}px, 0, 0)`,
        }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 3. GOLDEN SUNRISE LIGHT BEAM SHIMMER (Natural sunbeams, no flashing)      */}
      {/* ========================================================================= */}
      <div 
        className="absolute -top-1/4 right-0 w-[80%] h-[120%] pointer-events-none select-none animate-hero-sunbeam opacity-75"
        style={{
          background: 'radial-gradient(circle at 75% 20%, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.15) 30%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 4. SUBTLE SUNLIT POLLEN PARTICLES (Strictly NO butterflies, natural motes)*/}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[28%] right-[32%] w-1.5 h-1.5 rounded-full bg-amber-200/60 blur-[0.5px] animate-hero-pollen-1" />
        <div className="absolute top-[42%] right-[22%] w-2 h-2 rounded-full bg-amber-100/50 blur-[0.7px] animate-hero-pollen-2" />
        <div className="absolute top-[35%] right-[45%] w-1 h-1 rounded-full bg-emerald-200/50 blur-[0.4px] animate-hero-pollen-1" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[58%] right-[15%] w-1.5 h-1.5 rounded-full bg-amber-300/40 blur-[0.6px] animate-hero-pollen-2" style={{ animationDelay: '5s' }} />
      </div>

      {/* ========================================================================= */}
      {/* 5. MEASURED EDITORIAL CONTRAST SCRIM (WCAG AA 4.5:1+ contrast on left)    */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 pointer-events-none bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/60 to-black/15 md:to-transparent z-10"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 6. HERO CONTENT: EDITORIAL TYPOGRAPHY & CALLS TO ACTION (LEFT ALIGNED)     */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full flex-1 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center">
        <div className="max-w-2xl xl:max-w-3xl space-y-5 sm:space-y-6">
          
          {/* Eyebrow Label with botanical star mark */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-amber-200/90 drop-shadow-sm select-none">
            <span className="text-amber-300 text-sm" aria-hidden="true">✦</span>
            <span className="uppercase tracking-[0.2em] font-medium">{eyebrowText}</span>
          </div>

          {/* Dominant Editorial Headline (Playfair Display serif pairing) */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-bold text-white tracking-tight leading-[1.06] drop-shadow-lg text-balance select-none">
            <span className="block text-white">Forest Resources.</span>
            <span className="block italic font-normal text-[#C8E687] drop-shadow-md">
              Stronger Livelihoods.
            </span>
            <span className="block text-[#F5D49E] drop-shadow-md">
              Thriving Communities.
            </span>
          </h1>

          {/* Supporting Editorial Description */}
          <p className="text-[#E7E2D6] text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal drop-shadow-md">
            {descText}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
            {/* Primary CTA */}
            <button
              onClick={onExploreClick}
              className="bg-[#4E7A3A] hover:bg-[#3E622E] text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-black/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <span>{primaryBtnText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onCategoriesClick}
              className="bg-white/10 hover:bg-white/20 text-[#F7F2E8] border border-white/30 hover:border-white/60 backdrop-blur-md px-6 py-3.5 sm:px-7 sm:py-4 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.98] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/80"
            >
              <Layers className="w-4 h-4 text-amber-200" />
              <span>{secondaryBtnText}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. SCROLL-TO-EXPLORE INDICATOR                                            */}
      {/* ========================================================================= */}
      <div className="relative z-20 pb-5 sm:pb-7 flex flex-col items-center justify-center select-none">
        <button
          onClick={onExploreClick}
          aria-label="Scroll to discover forest resources"
          className="group flex flex-col items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-[0.25em] text-white/80 hover:text-white transition-colors cursor-pointer focus-visible:outline-hidden"
        >
          <span className="uppercase drop-shadow-sm">SCROLL TO EXPLORE</span>
          {/* Animated vertical indicator line */}
          <div className="w-px h-6 bg-white/30 overflow-hidden relative">
            <div className="w-full h-full bg-amber-300 animate-scroll-line" />
          </div>
        </button>
      </div>
    </section>
  );
};
