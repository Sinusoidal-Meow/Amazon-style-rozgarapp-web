import React, { useState } from 'react';
import { ALL_51_RESOURCES, CatalogueResource } from '../data/catalogue51';
import { Language } from '../types';
import { ArrowRight, Sparkles, ExternalLink, Info } from 'lucide-react';

interface BotanicalEditorialShowcaseProps {
  currentLang: Language;
  onViewAll: () => void;
  onSelectResource: (resource: CatalogueResource) => void;
  totalCount?: number;
}

export const BotanicalEditorialShowcase: React.FC<BotanicalEditorialShowcaseProps> = ({
  currentLang,
  onViewAll,
  onSelectResource,
  totalCount = 51,
}) => {
  const [hoveredSpecimen, setHoveredSpecimen] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Curated representative specimens from actual dataset
  const centralSpecimen = ALL_51_RESOURCES.find((r) => r.id === 'bamboo') || ALL_51_RESOURCES[0];
  const specimenLowerLeft1 = ALL_51_RESOURCES.find((r) => r.id === 'fruit_karvand') || ALL_51_RESOURCES[1];
  const specimenLowerLeft2 = ALL_51_RESOURCES.find((r) => r.id === 'herb_behda') || ALL_51_RESOURCES[4];
  const specimenUpperRight1 = ALL_51_RESOURCES.find((r) => r.id === 'flowers_moh') || ALL_51_RESOURCES[3];
  const specimenUpperRight2 = ALL_51_RESOURCES.find((r) => r.id === 'fruit_awla') || ALL_51_RESOURCES[2];

  const handleTriggerViewAll = () => {
    onViewAll();
  };

  return (
    <section 
      id="categories-section" 
      aria-label="Botanical Editorial Showcase"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 transition-colors duration-300"
    >
      {/* Editorial Grid / Asymmetric Composition inspired by Reference Image 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Editorial Heading, Description, View All CTA, Lower Capsules */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-8 lg:space-y-12 z-10">
          {/* Main Editorial Typography */}
          <div className="space-y-4">
            {/* Top Star Motif & Kicker */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#4E7A3A] dark:text-[#8DB85A]">
                {currentLang === 'mr' ? 'वनसंसाधन संग्रह' : 'Botanical Collection'}
              </span>
              {/* Botanical 8-point Asterism */}
              <svg 
                className="w-6 h-6 text-[#2F4A2A] dark:text-[#F4F7EA] opacity-80" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z" />
                <path d="M12 4L13.2 9.5L18.7 10.7L13.2 11.9L12 17.4L10.8 11.9L5.3 10.7L10.8 9.5L12 4Z" opacity="0.4" />
              </svg>
            </div>

            {/* Three-Line Editorial Headline */}
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-[#2F4A2A] dark:text-[#F4F7EA] leading-[1.08] tracking-tight text-balance">
              {currentLang === 'mr' ? (
                <>
                  <span className="block">वनसंपदा.</span>
                  <span className="block italic font-normal">सामुदायिक वारसा.</span>
                  <span className="block">सजीव जंगले.</span>
                </>
              ) : (
                <>
                  <span className="block">Forest Resources.</span>
                  <span className="block italic font-normal">Community Heritage.</span>
                  <span className="block">Living Forests.</span>
                </>
              )}
            </h2>

            {/* Short Supporting Editorial Description */}
            <p className="text-sm sm:text-base text-[#7B6A55] dark:text-[#A9B49A] leading-relaxed max-w-md pt-1">
              {currentLang === 'mr'
                ? 'सामुदायिक वन हक्क (FRA 2006) अंतर्गत नाशिकच्या ग्रामसभांद्वारे संवर्धित हंगामी रानफळे, औषधी वनस्पती, बांबू आणि पारंपारिक वनोपजाचा समृद्ध खजिना.'
                : 'Explore the botanical wealth of community forests — from seasonal fruits and medicinal plants to bamboo, traditional produce and native trees.'}
            </p>

            {/* View All (51) Button (Replaces "Get Started" in exact reference position) */}
            <div className="pt-2">
              <button
                onClick={handleTriggerViewAll}
                disabled={isTransitioning}
                className={`group inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-sm cursor-pointer ${
                  isTransitioning
                    ? 'scale-95 opacity-80'
                    : 'hover:scale-[1.02] hover:shadow-md'
                } bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619]`}
                aria-label={`View all ${totalCount} forest resources`}
              >
                <span>
                  {currentLang === 'mr'
                    ? `सर्व संसाधने पहा (${totalCount})`
                    : `View All (${totalCount})`}
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

          {/* Lower-Left Asymmetrical Capsule Images (Matching Reference Image 1) */}
          <div className="hidden sm:flex items-end gap-4 pt-4 lg:pt-8">
            {/* Capsule 1: Wild Karvand / Forest Berries */}
            <div 
              onClick={() => onSelectResource(specimenLowerLeft1)}
              onMouseEnter={() => setHoveredSpecimen(specimenLowerLeft1.name)}
              onMouseLeave={() => setHoveredSpecimen(null)}
              className="relative w-28 sm:w-32 h-44 sm:h-52 rounded-[60px] overflow-hidden border border-[#E2D6BE] dark:border-[#3C4E38] shadow-md group cursor-pointer animate-float-slow bg-[#EAE2D2] dark:bg-[#243222] transition-all duration-300 hover:scale-105 hover:shadow-xl"
              title={`${specimenLowerLeft1.name} (${specimenLowerLeft1.englishName})`}
            >
              <img
                src={specimenLowerLeft1.image}
                alt={specimenLowerLeft1.englishName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-[11px] font-bold text-white leading-tight">
                  {specimenLowerLeft1.name}
                </span>
              </div>
            </div>

            {/* Capsule 2: Behda / Medicinal Roots */}
            <div 
              onClick={() => onSelectResource(specimenLowerLeft2)}
              onMouseEnter={() => setHoveredSpecimen(specimenLowerLeft2.name)}
              onMouseLeave={() => setHoveredSpecimen(null)}
              className="relative w-32 sm:w-36 h-40 sm:h-48 rounded-t-full rounded-b-[40px] overflow-hidden border border-[#E2D6BE] dark:border-[#3C4E38] shadow-md group cursor-pointer animate-float-gentle bg-[#EAE2D2] dark:bg-[#243222] transition-all duration-300 hover:scale-105 hover:shadow-xl"
              title={`${specimenLowerLeft2.name} (${specimenLowerLeft2.englishName})`}
            >
              <img
                src={specimenLowerLeft2.image}
                alt={specimenLowerLeft2.englishName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-[11px] font-bold text-white leading-tight">
                  {specimenLowerLeft2.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTRE COLUMN: Curved Arc Header & Grand Central Botanical Capsule Frame */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative my-4 lg:my-0">
          
          {/* Curved Text Treatment Above Main Illustration (Matching Reference Image 1) */}
          <div className="w-64 sm:w-80 h-16 sm:h-20 -mb-4 sm:-mb-6 z-20 pointer-events-none select-none">
            <svg 
              viewBox="0 0 320 100" 
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              <path
                id="botanical-arc-path"
                d="M 30,90 A 130,130 0 0,1 290,90"
                fill="none"
              />
              <text className="font-editorial text-[17px] sm:text-[19px] fill-[#2F4A2A] dark:fill-[#F4F7EA] tracking-[0.28em] font-medium opacity-90">
                <textPath href="#botanical-arc-path" startOffset="50%" textAnchor="middle">
                  {currentLang === 'mr' ? 'वनस्पती · वृक्ष · निसर्ग' : 'Plant · Tree · Nature'}
                </textPath>
              </text>
            </svg>
          </div>

          {/* Grand Vertical Arch / Capsule Frame (Visual Focal Point) */}
          <div 
            onClick={() => onSelectResource(centralSpecimen)}
            className="group relative w-64 sm:w-72 md:w-80 h-[380px] sm:h-[460px] md:h-[520px] rounded-[160px] overflow-hidden border-2 border-[#E2D6BE] dark:border-[#3C4E38] shadow-2xl bg-[#EAE2D2] dark:bg-[#243222] cursor-pointer transition-all duration-500 hover:shadow-3xl hover:border-[#4E7A3A] dark:hover:border-[#8DB85A]"
          >
            {/* Focal Resource Image */}
            <img
              src={centralSpecimen.image}
              alt={centralSpecimen.englishName}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              referrerPolicy="no-referrer"
            />

            {/* Subtle Lighting Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

            {/* Interactive Focal Tag at bottom */}
            <div className="absolute bottom-6 inset-x-0 px-6 flex flex-col items-center text-center text-white space-y-1 transform transition-transform duration-300 group-hover:-translate-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#F4F7EA]">
                {centralSpecimen.groupName} · Specimen #01
              </span>
              <h3 className="font-editorial text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                {centralSpecimen.name}
              </h3>
              <p className="text-xs text-white/80 line-clamp-1">
                {centralSpecimen.englishName} · {centralSpecimen.harvestSeason}
              </p>
              <span className="text-[11px] font-semibold text-[#DDE8C6] pt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>View Botanical Specimen</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Delicate Botanical Ring Indicator */}
          <div className="mt-4 flex items-center gap-2 text-xs text-[#7B6A55] dark:text-[#A9B49A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E7A3A] dark:bg-[#8DB85A]" />
            <span className="font-medium tracking-wide">
              {centralSpecimen.englishName} · Nashik Gram Sabha Harvest
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Upper Asymmetric Capsules, Star Motif, Supporting Text */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-8 lg:space-y-12 z-10">
          
          {/* Upper Right Asymmetrical Capsule Images (Matching Reference Image 1) */}
          <div className="flex items-start justify-end lg:justify-start gap-4">
            {/* Capsule 3: Moha Flowers / Forest Bloom (Taller Arch) */}
            <div 
              onClick={() => onSelectResource(specimenUpperRight1)}
              onMouseEnter={() => setHoveredSpecimen(specimenUpperRight1.name)}
              onMouseLeave={() => setHoveredSpecimen(null)}
              className="relative w-28 sm:w-32 h-44 sm:h-52 rounded-t-full rounded-b-[40px] overflow-hidden border border-[#E2D6BE] dark:border-[#3C4E38] shadow-md group cursor-pointer animate-float-slow bg-[#EAE2D2] dark:bg-[#243222] transition-all duration-300 hover:scale-105 hover:shadow-xl"
              title={`${specimenUpperRight1.name} (${specimenUpperRight1.englishName})`}
            >
              <img
                src={specimenUpperRight1.image}
                alt={specimenUpperRight1.englishName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-[11px] font-bold text-white leading-tight">
                  {specimenUpperRight1.name}
                </span>
              </div>
            </div>

            {/* Capsule 4: Awla / Dense Green Foliage (Staggered Offset) */}
            <div 
              onClick={() => onSelectResource(specimenUpperRight2)}
              onMouseEnter={() => setHoveredSpecimen(specimenUpperRight2.name)}
              onMouseLeave={() => setHoveredSpecimen(null)}
              className="relative w-28 sm:w-32 h-40 sm:h-48 rounded-[60px] overflow-hidden border border-[#E2D6BE] dark:border-[#3C4E38] shadow-md group cursor-pointer animate-float-gentle bg-[#EAE2D2] dark:bg-[#243222] transition-all duration-300 hover:scale-105 hover:shadow-xl mt-6"
              title={`${specimenUpperRight2.name} (${specimenUpperRight2.englishName})`}
            >
              <img
                src={specimenUpperRight2.image}
                alt={specimenUpperRight2.englishName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-[11px] font-bold text-white leading-tight">
                  {specimenUpperRight2.name}
                </span>
              </div>
            </div>
          </div>

          {/* Right Supporting Content (Matching Reference Image 1) */}
          <div className="space-y-6 pt-2">
            {/* Secondary Star Motif */}
            <div className="flex justify-start">
              <svg 
                className="w-7 h-7 text-[#2F4A2A] dark:text-[#F4F7EA] opacity-80" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z" />
              </svg>
            </div>

            {/* Short Supporting Paragraph */}
            <p className="text-xs sm:text-sm text-[#7B6A55] dark:text-[#A9B49A] leading-relaxed">
              {currentLang === 'mr'
                ? 'स्थानिक आदिवासी समूहांच्या पारंपारिक ज्ञानाने समृद्ध असलेली ही परिसंस्था केवळ कच्चा माल नसून शाश्वत उपजीविका व निसर्ग संरक्षणाचा पाया आहे.'
                : 'Livelihoods rooted in forest stewardship. Sustainable harvesting governed by Gram Sabhas under FRA 2006, preserving biodiversity across Nashik.'}
            </p>

            {/* Elegant Secondary Triad Heading (Matching Reference 1: "Trave Explore Discover") */}
            <div className="font-editorial text-3xl sm:text-4xl text-[#2F4A2A] dark:text-[#F4F7EA] leading-tight space-y-1">
              <div className="block">{currentLang === 'mr' ? 'शोध घ्या' : 'Explore'}</div>
              <div className="block italic font-normal text-[#4E7A3A] dark:text-[#8DB85A]">
                {currentLang === 'mr' ? 'संवर्धन करा' : 'Preserve'}
              </div>
              <div className="block">{currentLang === 'mr' ? 'अनुभव घ्या' : 'Discover'}</div>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Hover Indicator for Touch/Desktop feedback */}
      {hoveredSpecimen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#2F4A2A]/90 dark:bg-[#1C2619]/90 text-white backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold shadow-xl border border-white/20 animate-fade-in pointer-events-none">
          Click to view {hoveredSpecimen} details
        </div>
      )}
    </section>
  );
};

export default BotanicalEditorialShowcase;
