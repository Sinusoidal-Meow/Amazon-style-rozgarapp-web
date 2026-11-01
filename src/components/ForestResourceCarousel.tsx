import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { CatalogueResource } from '../data/catalogue51';
import { Language } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  Eye, 
  Plus, 
  RotateCcw,
  Calendar,
  Compass
} from 'lucide-react';

interface ForestResourceCarouselProps {
  resources: CatalogueResource[];
  currentLang: Language;
  onSelectResource: (resource: CatalogueResource) => void;
  onAddToCart: (resource: CatalogueResource) => void;
  selectedCategory: string;
  statusFilter: string;
  searchQuery: string;
  onResetFilters: () => void;
}

export const ForestResourceCarousel: React.FC<ForestResourceCarouselProps> = ({
  resources,
  currentLang,
  onSelectResource,
  onAddToCart,
  selectedCategory,
  statusFilter,
  searchQuery,
  onResetFilters,
}) => {
  // Current active index in the resources list
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation lock state to prevent rapid-click race conditions
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Autoplay state
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Touch & Swipe state
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Window width tracking for responsive motion parameters
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    return typeof window !== 'undefined' ? window.innerWidth : 1024;
  });

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Fallback image handling
  const [failedImageIds, setFailedImageIds] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImageIds((prev) => ({ ...prev, [id]: true }));
  };

  // Reset active index when filtered resources change
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory, statusFilter, searchQuery, resources.length]);

  // Window resize & reduced motion listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      }
    };
  }, []);

  // Safe navigation helpers
  const totalCount = resources.length;

  const handleNext = useCallback(() => {
    if (totalCount <= 1 || isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % totalCount);

    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 550);
  }, [totalCount, isAnimating]);

  const handlePrev = useCallback(() => {
    if (totalCount <= 1 || isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + totalCount) % totalCount);

    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 550);
  }, [totalCount, isAnimating]);

  const handleJumpToIndex = (index: number) => {
    if (index === activeIndex || isAnimating || index < 0 || index >= totalCount) return;
    setIsAnimating(true);
    setActiveIndex(index);

    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 550);
  };

  // Clean up animation timer
  useEffect(() => {
    return () => {
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    };
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying || isHovered || totalCount <= 1 || prefersReducedMotion) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, totalCount, prefersReducedMotion, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null) return;
    const delta = touchDeltaXRef.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  // Dynamic slot offsets to mount surrounding items
  const slotOffsets = useMemo(() => {
    if (totalCount <= 1) return [0];
    if (totalCount === 2) return [-1, 0, 1];
    if (totalCount <= 4) return [-1, 0, 1];
    return [-2, -1, 0, 1, 2];
  }, [totalCount]);

  // Spatial transform calculations matching the reference video
  const getSlotStyle = useCallback((slot: number) => {
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

    if (prefersReducedMotion) {
      // Accessible minimal transition when reduced motion is preferred
      const xDist = isMobile ? 220 : isTablet ? 290 : 360;
      return {
        transform: `translate3d(calc(-50% + ${slot * xDist}px), 0px, 0) scale(${slot === 0 ? 1 : 0.75})`,
        opacity: slot === 0 ? 1 : Math.abs(slot) === 1 ? 0.6 : 0,
        zIndex: slot === 0 ? 30 : Math.abs(slot) === 1 ? 20 : 10,
        pointerEvents: (slot === 0 ? 'auto' : Math.abs(slot) === 1 ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
        transition: 'transform 200ms ease, opacity 200ms ease',
      };
    }

    if (isMobile) {
      // Mobile screen responsive motion
      let xOffset = 0;
      let yOffset = 0;
      let scale = 1;
      let rotation = 0;
      let opacity = 1;
      let zIndex = 30;

      if (slot === 0) {
        xOffset = 0;
        yOffset = 0;
        scale = 1;
        rotation = 0;
        opacity = 1;
        zIndex = 30;
      } else if (slot === -1) {
        xOffset = -195;
        yOffset = 8;
        scale = 0.68;
        rotation = -2;
        opacity = 0.45;
        zIndex = 20;
      } else if (slot === 1) {
        xOffset = 195;
        yOffset = 8;
        scale = 0.68;
        rotation = 2;
        opacity = 0.45;
        zIndex = 20;
      } else if (slot < -1) {
        xOffset = -350;
        yOffset = 18;
        scale = 0.5;
        rotation = -3;
        opacity = 0;
        zIndex = 10;
      } else {
        xOffset = 350;
        yOffset = 18;
        scale = 0.5;
        rotation = 3;
        opacity = 0;
        zIndex = 10;
      }

      return {
        transform: `translate3d(calc(-50% + ${xOffset}px), ${yOffset}px, 0) scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        zIndex,
        pointerEvents: (slot === 0 ? 'auto' : Math.abs(slot) === 1 ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
        transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms cubic-bezier(0.22, 1, 0.36, 1)',
      };
    }

    if (isTablet) {
      // Tablet screen motion
      let xOffset = 0;
      let yOffset = 0;
      let scale = 1;
      let rotation = 0;
      let opacity = 1;
      let zIndex = 30;

      if (slot === 0) {
        xOffset = 0;
        yOffset = 0;
        scale = 1;
        rotation = 0;
        opacity = 1;
        zIndex = 30;
      } else if (slot === -1) {
        xOffset = -265;
        yOffset = 14;
        scale = 0.72;
        rotation = -2.8;
        opacity = 0.72;
        zIndex = 20;
      } else if (slot === 1) {
        xOffset = 265;
        yOffset = 14;
        scale = 0.72;
        rotation = 2.8;
        opacity = 0.72;
        zIndex = 20;
      } else if (slot < -1) {
        xOffset = -490;
        yOffset = 30;
        scale = 0.52;
        rotation = -5;
        opacity = 0;
        zIndex = 10;
      } else {
        xOffset = 490;
        yOffset = 30;
        scale = 0.52;
        rotation = 5;
        opacity = 0;
        zIndex = 10;
      }

      return {
        transform: `translate3d(calc(-50% + ${xOffset}px), ${yOffset}px, 0) scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        zIndex,
        pointerEvents: (slot === 0 ? 'auto' : Math.abs(slot) === 1 ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
        transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms cubic-bezier(0.22, 1, 0.36, 1)',
      };
    }

    // Full Desktop motion matching reference video
    let xOffset = 0;
    let yOffset = 0;
    let scale = 1;
    let rotation = 0;
    let opacity = 1;
    let zIndex = 30;

    if (slot === 0) {
      xOffset = 0;
      yOffset = 0;
      scale = 1;
      rotation = 0;
      opacity = 1;
      zIndex = 30;
    } else if (slot === -1) {
      xOffset = -330;
      yOffset = 16;
      scale = 0.74;
      rotation = -3.5;
      opacity = 0.75;
      zIndex = 20;
    } else if (slot === 1) {
      xOffset = 330;
      yOffset = 16;
      scale = 0.74;
      rotation = 3.5;
      opacity = 0.75;
      zIndex = 20;
    } else if (slot < -1) {
      xOffset = -620;
      yOffset = 40;
      scale = 0.54;
      rotation = -6;
      opacity = 0;
      zIndex = 10;
    } else {
      xOffset = 620;
      yOffset = 40;
      scale = 0.54;
      rotation = 6;
      opacity = 0;
      zIndex = 10;
    }

    return {
      transform: `translate3d(calc(-50% + ${xOffset}px), ${yOffset}px, 0) scale(${scale}) rotate(${rotation}deg)`,
      opacity,
      zIndex,
      pointerEvents: (slot === 0 ? 'auto' : Math.abs(slot) === 1 ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
      transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms cubic-bezier(0.22, 1, 0.36, 1)',
    };
  }, [windowWidth, prefersReducedMotion]);

  // Empty state handling
  if (totalCount === 0) {
    return (
      <div className="relative w-full rounded-[2.5rem] bg-[#F7F2E8] dark:bg-[#2E3E2B] border-[1.5px] border-[#E2D6BE] dark:border-[#3C4E38] shadow-lg p-12 sm:p-16 text-center text-[#3F4A36] dark:text-[#E9EFDC] space-y-4 transition-colors duration-200">
        <div className="w-16 h-16 rounded-full bg-[#DDE8C6] dark:bg-[#3A5233] text-[#4E7A3A] dark:text-[#8DB85A] flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black text-[#2F4A2A] dark:text-[#F4F7EA]">No matching forest resources</h3>
        <p className="text-sm text-[#7B6A55] dark:text-[#A9B49A] max-w-md mx-auto">
          No species match your active filters ({selectedCategory !== 'all' ? `Category: ${selectedCategory}` : ''}{' '}
          {statusFilter !== 'all' ? `Status: ${statusFilter}` : ''}{' '}
          {searchQuery ? `Search: "${searchQuery}"` : ''}).
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] rounded-full text-xs font-bold transition shadow-md cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  // Active resource reference
  const activeResource = resources[activeIndex];

  // Pagination dots generator
  const renderPaginationDots = () => {
    if (totalCount <= 7) {
      return (
        <div className="flex items-center gap-2">
          {resources.map((_, i) => (
            <button
              key={i}
              onClick={() => handleJumpToIndex(i)}
              aria-label={`Jump to resource ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === activeIndex
                  ? 'w-6 h-2 bg-[#4E7A3A] dark:bg-[#8DB85A] shadow-xs'
                  : 'w-2 h-2 bg-[#E2D6BE] hover:bg-[#d0c2a5] dark:bg-[#3C4E38] dark:hover:bg-[#4d6348]'
              }`}
            />
          ))}
        </div>
      );
    }

    const maxDots = 5;
    let startDot = Math.max(0, activeIndex - Math.floor(maxDots / 2));
    if (startDot + maxDots > totalCount) {
      startDot = Math.max(0, totalCount - maxDots);
    }
    const visibleDots = Array.from({ length: Math.min(maxDots, totalCount) }, (_, idx) => startDot + idx);

    return (
      <div className="flex items-center gap-2">
        {visibleDots.map((dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => handleJumpToIndex(dotIdx)}
            aria-label={`Jump to resource ${dotIdx + 1} of ${totalCount}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              dotIdx === activeIndex
                ? 'w-6 h-2 bg-[#4E7A3A] dark:bg-[#8DB85A] shadow-xs'
                : 'w-2 h-2 bg-[#E2D6BE] hover:bg-[#d0c2a5] dark:bg-[#3C4E38] dark:hover:bg-[#4d6348]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Centre-focused forest resource showcase carousel"
      className="relative w-full rounded-[2rem] sm:rounded-[2.75rem] bg-[#F7F2E8] dark:bg-[#2E3E2B] border-[1.5px] border-[#E2D6BE] dark:border-[#3C4E38] shadow-xl overflow-hidden p-4 sm:p-8 md:p-12 transition-all outline-hidden focus-visible:ring-2 focus-visible:ring-[#4E7A3A] dark:focus-visible:ring-[#8DB85A]"
    >
      {/* Background Soft Organic Ambient Blurs */}
      <div 
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/70 via-white/30 to-transparent dark:from-[#1C2619]/60 dark:via-[#1C2619]/20 dark:to-transparent pointer-events-none rounded-b-[2.75rem]" 
        aria-hidden="true"
      />
      <div 
        className="absolute -top-32 -right-32 w-80 h-80 bg-[#DDE8C6]/40 dark:bg-[#3A5233]/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#E2D6BE]/40 dark:bg-[#243222]/40 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Top Bar: Brand Kicker & Autoplay Controls */}
      <div className="relative z-30 flex items-center justify-between gap-4 pb-3 border-b border-[#E2D6BE] dark:border-[#3C4E38] text-[#3F4A36] dark:text-[#E9EFDC]">
        {/* Left: Brand kicker */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-extrabold tracking-tight text-[#4E7A3A] dark:text-[#8DB85A] uppercase font-mono">
            VanRozgar · CFR Collective
          </span>
          <span className="text-[#E2D6BE] dark:text-[#3C4E38] text-xs">/</span>
          <span className="text-xs text-[#7B6A55] dark:text-[#A9B49A] hidden sm:inline font-medium">
            14 Gram Sabhas · Nashik Commons
          </span>
        </div>

        {/* Right: Autoplay toggle & Tabular position counter */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            title={isAutoPlaying ? 'Pause automatic carousel playback' : 'Enable automatic carousel playback'}
            aria-label={isAutoPlaying ? 'Pause automatic playback' : 'Enable automatic playback'}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition cursor-pointer ${
              isAutoPlaying
                ? 'bg-[#4E7A3A] text-white border-[#4E7A3A] dark:bg-[#8DB85A] dark:text-[#1C2619] dark:border-[#8DB85A]'
                : 'bg-white text-[#5A3B22] border-[#E2D6BE] hover:bg-[#F2EBDC] dark:bg-[#1C2619] dark:text-[#D8B48A] dark:border-[#3C4E38] dark:hover:bg-[#2E3E2B]'
            }`}
          >
            {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span className="hidden sm:inline">{isAutoPlaying ? 'Playing' : 'Autoplay'}</span>
          </button>

          <span className="text-xs font-mono font-bold text-[#4E7A3A] dark:text-[#8DB85A] tabular-nums bg-white dark:bg-[#1C2619] px-2.5 py-1 rounded-md border border-[#E2D6BE] dark:border-[#3C4E38]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Prominent Centered Heading Inside Container */}
      <div className="relative z-30 pt-4 sm:pt-6 pb-2 text-center max-w-2xl mx-auto space-y-1">
        <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#2F4A2A] dark:text-[#F4F7EA]">
          {selectedCategory === 'all'
            ? (currentLang === 'mr' ? 'वन संसाधने व रानमेवा' : 'Forest Resources & Wild Produce')
            : activeResource.groupName}
        </h3>
        <p className="text-xs sm:text-sm text-[#7B6A55] dark:text-[#A9B49A] font-normal max-w-lg mx-auto">
          {currentLang === 'mr'
            ? 'वन हक्क कायदा २००६ अंतर्गत ग्रामसभांद्वारे शाश्वत संकलित'
            : 'Statutory community harvest stewarded under FRA 2006'}
        </p>
      </div>

      {/* Main Centre-Focused Product Stage with Arc Traversal Animation */}
      <div className="relative z-20 mt-2 sm:mt-4 mb-2 min-h-[530px] sm:min-h-[570px] md:min-h-[600px] flex items-start justify-center select-none overflow-hidden pb-4">
        
        {/* Left Arrow Navigation Button - Aligned with botanical image pedestal */}
        {totalCount > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous forest resource"
            className="absolute left-1 sm:left-3 md:left-5 top-[110px] sm:top-[130px] md:top-[145px] -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-[#E2D6BE] dark:border-[#3C4E38] hover:border-[#4E7A3A] dark:hover:border-[#8DB85A] bg-white dark:bg-[#1C2619] text-[#4E7A3A] dark:text-[#8DB85A] shadow-md hover:shadow-lg flex items-center justify-center transition-all cursor-pointer hover:scale-108 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#4E7A3A]"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
          </button>
        )}

        {/* Right Arrow Navigation Button - Aligned with botanical image pedestal */}
        {totalCount > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next forest resource"
            className="absolute right-1 sm:right-3 md:right-5 top-[110px] sm:top-[130px] md:top-[145px] -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-[#E2D6BE] dark:border-[#3C4E38] hover:border-[#4E7A3A] dark:hover:border-[#8DB85A] bg-white dark:bg-[#1C2619] text-[#4E7A3A] dark:text-[#8DB85A] shadow-md hover:shadow-lg flex items-center justify-center transition-all cursor-pointer hover:scale-108 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#4E7A3A]"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
          </button>
        )}

        {/* =========================================================================
            SLIDING PRODUCT CARDS (Continuous Spatial Traversal Along Arc)
           ========================================================================= */}
        {slotOffsets.map((slotOffset) => {
          const itemIndex = (activeIndex + slotOffset + totalCount * 10) % totalCount;
          const resource = resources[itemIndex];
          if (!resource) return null;

          const isCenter = slotOffset === 0;
          const isLeft = slotOffset === -1;
          const isRight = slotOffset === 1;
          const motionStyle = getSlotStyle(slotOffset);

          return (
            <div
              key={resource.id}
              style={motionStyle}
              onClick={() => {
                if (isLeft) handlePrev();
                else if (isRight) handleNext();
              }}
              className={`absolute top-1 sm:top-2 left-1/2 w-full max-w-[290px] sm:max-w-[340px] md:max-w-[370px] flex flex-col items-center will-change-transform ${
                isCenter ? 'cursor-default' : 'cursor-pointer hover:opacity-95'
              }`}
            >
              {/* Botanical Image Pedestal */}
              <div 
                onClick={(e) => {
                  if (isCenter) {
                    e.stopPropagation();
                    onSelectResource(resource);
                  }
                }}
                className={`group relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[290px] md:h-[290px] rounded-[1.75rem] sm:rounded-[2rem] bg-white dark:bg-[#1C2619] border-[1.5px] border-[#E2D6BE] dark:border-[#3C4E38] p-4 sm:p-6 shadow-xl flex items-center justify-center transition-all duration-300 ${
                  isCenter ? 'hover:shadow-2xl cursor-pointer hover:-translate-y-1' : 'shadow-md'
                }`}
              >
                {/* Botanical Artwork */}
                {resource.image && !failedImageIds[resource.id] ? (
                  <img
                    src={resource.image}
                    alt={`${resource.name} - ${resource.englishName}`}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(resource.id)}
                    className={`w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 pointer-events-none ${
                      isCenter ? 'group-hover:scale-105' : ''
                    }`}
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#DDE8C6] dark:bg-[#3A5233] flex flex-col items-center justify-center text-[#4E7A3A] dark:text-[#8DB85A] gap-1.5">
                    <span className="text-3xl sm:text-4xl">🌿</span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#7B6A55] dark:text-[#A9B49A]">
                      Botanical Profile
                    </span>
                  </div>
                )}

                {/* Toxic / Safety Warning Badge if not for eating */}
                {resource.isNotForEating && (
                  <div className="absolute top-3 left-3 right-3 bg-[#7F1D1D] text-rose-100 text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-lg border border-rose-500 flex items-center gap-1 shadow-md">
                    <AlertTriangle className="w-3 h-3 text-amber-300 shrink-0" />
                    <span>NON-EDIBLE · MEDICINAL / CRAFT USE</span>
                  </div>
                )}

                {/* Floating Circular Action Badge ("DETAILS" style) - Sits snugly inside pedestal corner */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectResource(resource);
                  }}
                  title={`View botanical details for ${resource.name}`}
                  aria-label={`View details for ${resource.name}`}
                  className={`absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] flex flex-col items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer border border-white/30 dark:border-[#3C4E38] group/scopri ${
                    isCenter 
                      ? 'opacity-100 scale-100 pointer-events-auto hover:scale-110 active:scale-95' 
                      : 'opacity-0 scale-75 pointer-events-none'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white dark:text-[#1C2619] transition-transform duration-300 group-hover/scopri:-translate-y-0.5" />
                  <span className="text-[8px] sm:text-[10px] font-bold tracking-wide mt-0.5 uppercase">
                    {currentLang === 'mr' ? 'तपशील' : 'Details'}
                  </span>
                </div>
              </div>

              {/* Product Information Block (Synchronized with current item data) */}
              <div className="w-full mt-3 sm:mt-3.5 text-center space-y-1">
                {/* Primary & Local Names */}
                <div>
                  <h4 
                    onClick={() => isCenter && onSelectResource(resource)}
                    className={`font-black text-[#2F4A2A] dark:text-[#F4F7EA] tracking-tight transition-all duration-300 ${
                      isCenter 
                        ? 'text-xl sm:text-2xl md:text-3xl cursor-pointer hover:text-[#4E7A3A] dark:hover:text-[#8DB85A]' 
                        : 'text-sm sm:text-base truncate max-w-[220px] mx-auto'
                    }`}
                  >
                    {resource.name}
                  </h4>
                  <p className={`font-semibold text-[#7B6A55] dark:text-[#A9B49A] transition-all duration-300 ${
                    isCenter ? 'text-xs sm:text-sm mt-0.5' : 'text-xs truncate max-w-[200px] mx-auto'
                  }`}>
                    {resource.englishName}
                  </p>
                </div>

                {/* Botanical Meta: Season & Uses (Full in center, cleanly hidden on sides) */}
                <div 
                  className={`flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#7B6A55] dark:text-[#A9B49A] font-medium transition-all duration-300 ${
                    isCenter ? 'opacity-100 max-h-8 py-0.5' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}
                >
                  <span>{resource.groupName}</span>
                  {resource.harvestSeason && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#4E7A3A] dark:text-[#8DB85A]" />
                        {resource.harvestSeason}
                      </span>
                    </>
                  )}
                  {resource.status === 'ready' && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 text-[#4E7A3A] dark:text-[#8DB85A] font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-[#4E7A3A] dark:text-[#8DB85A]" /> Ready
                      </span>
                    </>
                  )}
                  {resource.status === 'check_later' && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 text-[#A4551A] dark:text-[#F0A15A] font-semibold">
                        <Sparkles className="w-3 h-3 text-[#A4551A] dark:text-[#F0A15A]" /> Check Later
                      </span>
                    </>
                  )}
                </div>

                {/* Description Preview (Only on prominent center card - Guaranteed minimum height for consistent button baseline) */}
                <div className={`transition-all duration-300 ${
                  isCenter ? 'opacity-100 max-h-16' : 'opacity-0 max-h-0 overflow-hidden'
                }`}>
                  <p className="text-xs sm:text-sm text-[#3F4A36] dark:text-[#E9EFDC] max-w-md mx-auto line-clamp-2 min-h-[2.5rem] leading-relaxed px-2 font-normal">
                    {resource.description}
                  </p>
                </div>

                {/* Price Display: Compact on side cards, full styled action bar on center */}
                {isCenter ? (
                  <div className="pt-2 sm:pt-2.5 flex items-center justify-center gap-2 sm:gap-2.5 transition-all duration-300 flex-wrap sm:flex-nowrap">
                    {resource.priceEstimate ? (
                      <div className="text-left bg-white dark:bg-[#1C2619] px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#E2D6BE] dark:border-[#3C4E38] shadow-xs shrink-0">
                        <span className="text-[9px] text-[#7B6A55] dark:text-[#A9B49A] block leading-none font-medium">Estimated Trade</span>
                        <span className="text-base sm:text-lg font-black text-[#A4551A] dark:text-[#F0A15A] font-mono tabular-nums">
                          ₹{resource.priceEstimate}{' '}
                          <span className="text-[11px] font-normal text-[#7B6A55] dark:text-[#A9B49A]">
                            {resource.unit ? `/ ${resource.unit}` : ''}
                          </span>
                        </span>
                      </div>
                    ) : null}

                    {/* Primary Button */}
                    <button
                      onClick={() => onAddToCart(resource)}
                      aria-label={`Add ${resource.name} to basket`}
                      className="inline-flex items-center gap-1.5 px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-xl bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] text-xs sm:text-sm font-bold shadow-md transition cursor-pointer active:scale-95 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white dark:text-[#1C2619]" />
                      <span>{currentLang === 'mr' ? 'खरेदी करा' : 'Add to Basket'}</span>
                    </button>

                    {/* Outline Button */}
                    <button
                      onClick={() => onSelectResource(resource)}
                      aria-label={`View full botanical profile for ${resource.name}`}
                      className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border-[1.5px] border-[#5A3B22] text-[#5A3B22] hover:bg-[#5A3B22]/10 dark:border-[#D8B48A] dark:text-[#D8B48A] dark:hover:bg-[#D8B48A]/10 text-xs sm:text-sm font-semibold transition cursor-pointer shrink-0"
                    >
                      <span>{currentLang === 'mr' ? 'तपशील' : 'Profile'}</span>
                    </button>
                  </div>
                ) : (
                  /* Side Card Quiet Price Tag */
                  <div className="pt-0.5">
                    {resource.priceEstimate ? (
                      <span className="text-[11px] font-mono font-bold text-[#A4551A] dark:text-[#F0A15A] tabular-nums inline-block bg-white/70 dark:bg-[#1C2619]/70 px-2 py-0.5 rounded-md border border-[#E2D6BE] dark:border-[#3C4E38]">
                        ₹{resource.priceEstimate} {resource.unit ? `/ ${resource.unit}` : ''}
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#7B6A55] dark:text-[#A9B49A] italic">
                        {resource.groupName}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Pagination & Navigation Indicators - Clearly defined separate bottom zone */}
      <div className="relative z-30 mt-2 sm:mt-3 pt-4 sm:pt-5 border-t border-[#E2D6BE] dark:border-[#3C4E38] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7B6A55] dark:text-[#A9B49A]">
        {/* Left: Interactive Species Guide */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4E7A3A] dark:bg-[#8DB85A]" />
          <span>
            {currentLang === 'mr' ? 'पुढील व मागीलसाठी बाण किंवा स्वाइप वापरा' : 'Click arrows, swipe, or use keyboard ← / → to browse'}
          </span>
        </div>

        {/* Center: Pagination Dots */}
        <div className="flex items-center justify-center">
          {renderPaginationDots()}
        </div>

        {/* Right: Full Collection Counter */}
        <div className="font-mono text-[11px] font-semibold text-[#4E7A3A] dark:text-[#8DB85A] tabular-nums">
          {totalCount} {currentLang === 'mr' ? 'एकूण वन प्रजाती' : 'Verified Forest Species'}
        </div>
      </div>
    </div>
  );
};

export default ForestResourceCarousel;
