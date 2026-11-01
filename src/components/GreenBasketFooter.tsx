import React from 'react';
import { Trees, Sparkles } from 'lucide-react';

interface GreenBasketFooterProps {
  onNavigateSection: (sectionId: string) => void;
  onSelectCategory: (catId: string) => void;
}

export const GreenBasketFooter: React.FC<GreenBasketFooterProps> = ({
  onNavigateSection,
  onSelectCategory,
}) => {
  return (
    <footer className="bg-[#EAE2D2] dark:bg-[#151E13] text-[#3F4A36] dark:text-[#E9EFDC] border-t border-[#E2D6BE] dark:border-[#3C4E38] text-xs mt-16 transition-colors duration-200">
      {/* Main 4-column layout */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Brand & Identity */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4E7A3A] dark:bg-[#8DB85A] p-1 flex items-center justify-center text-white dark:text-[#1C2619] shadow-xs">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-lg text-[#2F4A2A] dark:text-[#F4F7EA] tracking-tight">
                Van<span className="text-[#4E7A3A] dark:text-[#8DB85A]">Rozgar</span>
              </span>
              <span className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A] block font-medium">
                वनरोजगार · Nashik Forest Commons
              </span>
            </div>
          </div>

          <p className="text-[#7B6A55] dark:text-[#A9B49A] text-[11px] leading-relaxed">
            Community Forest Resource (CFR) Marketplace connecting 14 tribal Gram Sabhas in Nashik District, Maharashtra with conscious buyers and ethical barter networks.
          </p>

          <div className="pt-2 text-[10px] text-[#7B6A55] dark:text-[#A9B49A] font-medium">
            Version 1 · Master Image Catalogue of 52 Forest Species
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] text-xs uppercase tracking-wider mb-3">
            Marketplace Navigation
          </h4>
          <ul className="space-y-2 text-[#7B6A55] dark:text-[#A9B49A] text-xs font-medium">
            <li>
              <button onClick={() => onNavigateSection('hero')} className="hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer">
                Home / Overview
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('catalogue')} className="hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer">
                Complete Resource Catalogue (52)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('categories')} className="hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer">
                Browse by Category
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('community')} className="hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer">
                14 Nashik Gram Sabhas
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('benefits')} className="hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer">
                Why Choose Us?
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Resource Categories */}
        <div>
          <h4 className="font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] text-xs uppercase tracking-wider mb-3">
            Resource Categories
          </h4>
          <ul className="space-y-2 text-[#7B6A55] dark:text-[#A9B49A] text-xs font-medium">
            <li>
              <button onClick={() => onSelectCategory('fruit')} className="hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer">
                Wild Forest Fruits (10)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('medicine_herbs')} className="hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer">
                Ayurvedic Medicine & Herbs (7)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('timber_trees')} className="hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer">
                Timber Tree Saplings (10)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('forest_produce')} className="hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer">
                Gums, Dyes & Forest Produce (4)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('shade_sacred_trees')} className="hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer">
                Shade & Sacred Trees (5)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('nuts_seeds')} className="hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer">
                Nuts & Oil Seeds (4)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Statutory Framework & Legal */}
        <div className="space-y-2.5">
          <h4 className="font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] text-xs uppercase tracking-wider mb-3">
            Statutory Transparency
          </h4>
          <p className="text-[#7B6A55] dark:text-[#A9B49A] text-[11px] leading-relaxed">
            Recognized under Section 3(1)(c) of the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006 (FRA) & PESA Act 1996.
          </p>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#2E3E2B] text-[#3F4A36] dark:text-[#E9EFDC] border border-[#E2D6BE] dark:border-[#3C4E38] text-[10px] space-y-1 shadow-xs">
            <div><strong>Baseline Source:</strong> Raah Foundation Ecological Baseline</div>
            <div><strong>Protected Area:</strong> 2,019 Ha CFR canopy</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#E2D6BE] dark:bg-[#0E150D] py-4 px-4 border-t border-[#D5C7AB] dark:border-[#3C4E38] text-[#5A3B22] dark:text-[#A9B49A] text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 VanRozgar Marketplace. Sourced from 14 Tribal Gram Sabhas in Nashik, Maharashtra.
          </span>
          <span className="flex items-center gap-1.5 text-[#5A3B22] dark:text-[#D8B48A] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#A4551A] dark:text-[#F0A15A]" />
            <span>Ethical Forest Resource Discovery Platform</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
