import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Trees, Info } from 'lucide-react';

interface OrbitItem {
  id: string;
  name: string;
  marathiName: string;
  category: string;
  image: string;
}

const ORBIT_RESOURCES: OrbitItem[] = [
  {
    id: 'fruit_mango',
    name: 'Wild Mango',
    marathiName: 'रान आंबा',
    category: 'Wild Fruit',
    image: '/assets/aistudio/fruit_mango_f125ab77.jpg',
  },
  {
    id: 'fruit_awla',
    name: 'Indian Amla',
    marathiName: 'आवळा',
    category: 'Ayurvedic Fruit',
    image: '/assets/aistudio/fruit_awla_e71b662a.jpg',
  },
  {
    id: 'bamboo',
    name: 'Bamboo Clump',
    marathiName: 'बांबू खांब',
    category: 'CFR Craft & Timber',
    image: '/assets/aistudio/bamboo_6c42a839.jpg',
  },
  {
    id: 'forest_babhul',
    name: 'Babhul Gum',
    marathiName: 'बाभूळ डिंक',
    category: 'Natural Tree Gum',
    image: '/assets/aistudio/forest_babhul_356294d7.jpg',
  },
  {
    id: 'flowers_moh',
    name: 'Mahua Flowers',
    marathiName: 'मोह फुले',
    category: 'Edible Forest Flower',
    image: '/assets/aistudio/flowers_moh_6e6f8d68.jpg',
  },
  {
    id: 'herb_behda',
    name: 'Behda',
    marathiName: 'बेहडा',
    category: 'Triphala Medicine',
    image: '/assets/aistudio/herb_behda_62555b05.jpg',
  },
  {
    id: 'fruit_sitaphal',
    name: 'Custard Apple',
    marathiName: 'सीताफळ',
    category: 'Seasonal Sweet Fruit',
    image: '/assets/aistudio/fruit_sitaphal_ee60681b.jpg',
  },
  {
    id: 'nuts_kaju',
    name: 'Wild Cashew',
    marathiName: 'रान काजू',
    category: 'Oilseed & Nut',
    image: '/assets/aistudio/nuts_kaju_3e05b92d.jpg',
  },
];

interface HeroOrbitCardProps {
  onSelectResource?: (resourceId: string) => void;
}

export const HeroOrbitCard: React.FC<HeroOrbitCardProps> = ({ onSelectResource }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef(false);
  const angleRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [activeItem, setActiveItem] = useState<OrbitItem | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 420, height: 420 });

  // Monitor user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Measure container dimensions for responsive orbit radii
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateDimensions = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        setDimensions({ width: rect.width, height: rect.height || rect.width });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  // Orbit Geometry Parameters
  // Subtle diagonal tilt: -8 degrees
  const TILT_RAD = (-8 * Math.PI) / 180;
  const cosTilt = Math.cos(TILT_RAD);
  const sinTilt = Math.sin(TILT_RAD);

  // Scaled radii based on container width & height to fill the expanded box elegantly
  const isMobile = dimensions.width < 400;
  const isTablet = dimensions.width >= 400 && dimensions.width < 490;

  const radiusX = Math.round(dimensions.width * (isMobile ? 0.375 : isTablet ? 0.385 : 0.385));
  const radiusY = Math.round(dimensions.height * (isMobile ? 0.17 : isTablet ? 0.19 : 0.205));
  const itemSize = isMobile ? 66 : isTablet ? 78 : Math.min(96, Math.max(84, Math.round(dimensions.width * 0.168)));
  const DURATION_SECONDS = 30; // ~30s for smooth, elegant revolution

  // Animation Loop via requestAnimationFrame
  useEffect(() => {
    const totalItems = ORBIT_RESOURCES.length;
    const baseAngles = ORBIT_RESOURCES.map((_, i) => (2 * Math.PI * i) / totalItems);

    const updatePositions = () => {
      const currentGlobalAngle = angleRef.current;

      itemsRef.current.forEach((el, index) => {
        if (!el) return;

        // Current item parametric angle
        const theta = currentGlobalAngle + baseAngles[index];

        // Elliptical coordinate before tilt
        const xRaw = radiusX * Math.cos(theta);
        const yRaw = radiusY * Math.sin(theta);

        // Apply -8 degree tilt rotation
        const x = xRaw * cosTilt - yRaw * sinTilt;
        const y = xRaw * sinTilt + yRaw * cosTilt;

        // Depth calculation: sin(theta) > 0 is the front arc (bottom of screen)
        // normalized depth t in [0, 1] where 1 is closest (front), 0 is furthest (back)
        const depthNorm = (Math.sin(theta) + 1) / 2;

        // Scale: from 0.76 (back) to 1.10 (front)
        const scale = 0.76 + 0.34 * depthNorm;

        // Opacity: from 0.68 (back) to 1.0 (front)
        const opacity = 0.68 + 0.32 * depthNorm;

        // Z-Index: central badge is at z-index: 12
        // Items in front arc (depthNorm > 0.48) have z-index 20-25
        // Items in back arc (depthNorm <= 0.48) have z-index 4-8
        const zIndex = depthNorm > 0.48 ? 20 + Math.round(depthNorm * 5) : 4 + Math.round(depthNorm * 4);

        // Directly update DOM transform to avoid React re-renders every 16ms
        // Counter-rotate the image container by +8deg so it stays upright!
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.zIndex = `${zIndex}`;
        el.style.opacity = `${opacity}`;
      });
    };

    if (prefersReducedMotion) {
      // Just render static positions once
      updatePositions();
      return;
    }

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      // Only advance angle if not hovered
      if (!isHoveredRef.current) {
        angleRef.current = (angleRef.current + (2 * Math.PI / DURATION_SECONDS) * delta) % (2 * Math.PI);
        updatePositions();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
      lastTimeRef.current = null;
    };
  }, [radiusX, radiusY, cosTilt, sinTilt, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg lg:max-w-[530px] xl:max-w-[560px] aspect-square bg-gradient-to-br from-[#0B2818] via-[#071D12] to-[#05180E] rounded-3xl p-5 sm:p-6 border border-[#1A4331] shadow-2xl flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-[#1A4331]/30 via-transparent to-transparent pointer-events-none" />

      {/* Top Header: Card Title & Sourced Count */}
      <div className="w-full flex items-center justify-between text-xs sm:text-sm relative z-30 pb-1">
        <div className="flex items-center gap-1.5 font-bold text-[#F4F7F5]">
          <Sparkles className="w-4 h-4 text-[#9BE22D]" />
          <span>Nashik Forest Commons</span>
        </div>
        <span className="bg-[#1A4331]/80 text-[#9BE22D] px-2.5 py-1 rounded-full text-[11px] font-extrabold border border-[#2D765C]/60 tracking-wide">
          51 Sourced Species
        </span>
      </div>

      {/* Main Orbit Stage Area */}
      <div
        className="relative flex-1 flex items-center justify-center my-auto w-full"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          setActiveItem(null);
        }}
      >
        {/* Subtle Elliptical Orbital Path (SVG with -8deg rotation) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{
            transform: 'rotate(-8deg)',
            transformOrigin: '50% 50%',
          }}
        >
          {/* Subtle Outer Path Guide */}
          <ellipse
            cx="50%"
            cy="50%"
            rx={radiusX}
            ry={radiusY}
            fill="none"
            className="stroke-[#4E7A3A]/30 dark:stroke-[#8DB85A]/40"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* Understated solid guide line */}
          <ellipse
            cx="50%"
            cy="50%"
            rx={radiusX}
            ry={radiusY}
            fill="none"
            className="stroke-[#5A3B22]/20 dark:stroke-[#D8B48A]/30"
            strokeWidth="0.75"
          />

          {/* Subtle orbital node dots */}
          <circle cx={`calc(50% - ${radiusX}px)`} cy="50%" r="2.5" className="fill-[#4E7A3A] dark:fill-[#8DB85A]" fillOpacity="0.6" />
          <circle cx={`calc(50% + ${radiusX}px)`} cy="50%" r="2.5" className="fill-[#4E7A3A] dark:fill-[#8DB85A]" fillOpacity="0.6" />
        </svg>

        {/* Central Community-Harvest Element (Stable Anchor, Z-Index: 12) */}
        <div
          className="relative z-12 w-32 h-32 sm:w-36 sm:h-36 lg:w-[150px] lg:h-[150px] rounded-full bg-white dark:bg-[#2E3E2B] border-2 border-[#4E7A3A] dark:border-[#8DB85A] text-center flex flex-col items-center justify-center p-3 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105 group"
          style={{
            boxShadow: '0 8px 30px rgba(78, 122, 58, 0.15)',
          }}
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#DDE8C6] dark:bg-[#3A5233] flex items-center justify-center mb-1 text-[#4E7A3A] dark:text-[#8DB85A] border border-[#E2D6BE] dark:border-[#3C4E38]">
            <Trees className="w-3.5 h-3.5" />
          </div>

          <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-[#4E7A3A] dark:text-[#8DB85A] uppercase leading-none">
            100% FOREST
          </span>

          <span className="text-[11px] sm:text-[13px] font-black text-[#2F4A2A] dark:text-[#F4F7EA] leading-tight my-1 tracking-tight">
            COMMUNITY<br />HARVEST
          </span>

          <span className="text-[9px] sm:text-[10px] font-bold text-[#5A3B22] dark:text-[#D8B48A] tracking-wider uppercase leading-none">
            ETHICAL TRADE
          </span>

          {/* Subtle pulse ring around the badge */}
          <div className="absolute -inset-1 rounded-full border border-[#4E7A3A]/25 dark:border-[#8DB85A]/25 animate-pulse pointer-events-none" />
        </div>

        {/* 8 Orbiting Forest Resource Items */}
        {ORBIT_RESOURCES.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            onMouseEnter={() => {
              isHoveredRef.current = true;
              setActiveItem(item);
            }}
            onMouseLeave={() => {
              setActiveItem(null);
            }}
            onClick={() => onSelectResource?.(item.id)}
            className="absolute top-1/2 left-1/2 cursor-pointer transition-shadow duration-200 group"
            style={{
              width: `${itemSize}px`,
              height: `${itemSize}px`,
              marginLeft: `-${itemSize / 2}px`,
              marginTop: `-${itemSize / 2}px`,
              willChange: 'transform, opacity',
            }}
            title={`${item.name} (${item.marathiName}) - ${item.category}`}
          >
            {/* Rounded square container with #DDE8C6 pista background in light and #2E3E2B in dark */}
            <div
              className={`w-full h-full rounded-2xl bg-[#DDE8C6] dark:bg-[#2E3E2B] p-1.5 sm:p-2 border transition-all duration-200 flex flex-col items-center justify-center shadow-md overflow-hidden ${
                activeItem?.id === item.id
                  ? 'border-[#4E7A3A] dark:border-[#8DB85A] ring-2 ring-[#4E7A3A] dark:ring-[#8DB85A] scale-105'
                  : 'border-[#E2D6BE] dark:border-[#3C4E38] hover:border-[#4E7A3A] dark:hover:border-[#8DB85A]'
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain pointer-events-none drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
                loading="eager"
              />
            </div>

            {/* Floating Resource Tooltip on Hover */}
            {activeItem?.id === item.id && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white/95 dark:bg-[#1C2619]/95 text-[#2F4A2A] dark:text-[#F4F7EA] px-2.5 py-1.5 rounded-xl border border-[#E2D6BE] dark:border-[#3C4E38] shadow-xl text-center whitespace-nowrap z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="text-[11px] font-black text-[#2F4A2A] dark:text-[#F4F7EA] leading-tight">
                  {item.name} <span className="text-[#4E7A3A] dark:text-[#8DB85A] font-semibold">({item.marathiName})</span>
                </div>
                <div className="text-[9px] text-[#7B6A55] dark:text-[#A9B49A] mt-0.5 font-medium">
                  {item.category}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Footer Info Line */}
      <div className="w-full text-center text-[10px] text-[#7B6A55] dark:text-[#A9B49A] pt-2 border-t border-[#E2D6BE] dark:border-[#3C4E38] relative z-30 flex items-center justify-between">
        <span className="flex items-center gap-1 text-[#4E7A3A] dark:text-[#8DB85A] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4E7A3A] dark:bg-[#8DB85A] animate-ping" />
          <span>Interactive Resource Orbit</span>
        </span>
        <span className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A]">
          Hover to pause & inspect species
        </span>
      </div>
    </div>
  );
};
