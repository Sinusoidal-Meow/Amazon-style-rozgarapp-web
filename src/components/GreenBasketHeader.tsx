import React, { useState } from 'react';
import { 
  Trees, 
  Search, 
  ShoppingCart, 
  Globe, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Check, 
  Leaf
} from 'lucide-react';
import { Language } from '../types';
import { useTheme } from '../context/ThemeContext';

interface GreenBasketHeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
}

export const GreenBasketHeader: React.FC<GreenBasketHeaderProps> = ({
  currentLang,
  onLanguageChange,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onNavigateSection,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-[#F7F2E8]/95 dark:bg-[#1C2619]/95 backdrop-blur-md border-b border-[#E2D6BE] dark:border-[#3C4E38] text-[#3F4A36] dark:text-[#E9EFDC] transition-colors duration-200">
      {/* A. Top slim announcement bar */}
      <div className="bg-[#EAE2D2] dark:bg-[#151E13] text-[#5A3B22] dark:text-[#A9B49A] text-[11px] sm:text-xs py-1.5 px-4 border-b border-[#E2D6BE] dark:border-[#3C4E38]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* 3 compact items with natural accents */}
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-[#4E7A3A] dark:text-[#8DB85A]">🌿</span>
            <span>Community Forest Resources (FRA 2006)</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 font-medium">
            <span className="text-[#A4551A] dark:text-[#F0A15A]">🌱</span>
            <span>Sustainable Tribal Commons Harvest</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-1.5 font-medium">
              <span className="text-[#4E7A3A] dark:text-[#8DB85A]">🤝</span>
              <span>14 Verified Gram Sabhas</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-[#F7F2E8] dark:bg-[#2E3E2B] px-2 py-0.5 rounded-full border border-[#E2D6BE] dark:border-[#3C4E38] text-[11px]">
              <Globe className="w-3 h-3 text-[#4E7A3A] dark:text-[#8DB85A]" />
              <button
                onClick={() => onLanguageChange('en')}
                className={`hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] px-1 font-bold ${
                  currentLang === 'en' 
                    ? 'text-[#4E7A3A] dark:text-[#8DB85A]' 
                    : 'text-[#7B6A55] dark:text-[#A9B49A]'
                }`}
              >
                EN
              </button>
              <span className="text-[#E2D6BE] dark:text-[#3C4E38]">|</span>
              <button
                onClick={() => onLanguageChange('mr')}
                className={`hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] px-1 font-bold ${
                  currentLang === 'mr' 
                    ? 'text-[#4E7A3A] dark:text-[#8DB85A]' 
                    : 'text-[#7B6A55] dark:text-[#A9B49A]'
                }`}
              >
                मराठी
              </button>
              <span className="text-[#E2D6BE] dark:text-[#3C4E38]">|</span>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] px-1 font-bold ${
                  currentLang === 'hi' 
                    ? 'text-[#4E7A3A] dark:text-[#8DB85A]' 
                    : 'text-[#7B6A55] dark:text-[#A9B49A]'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* B. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo & Brand Wordmark */}
        <div 
          onClick={() => onNavigateSection('hero')} 
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-[#4E7A3A] dark:bg-[#8DB85A] p-1.5 flex items-center justify-center shadow-sm border border-[#E2D6BE] dark:border-[#3C4E38] overflow-hidden">
            <img
              src="/assets/brand/vanmitra-logo-original.jpg"
              alt="VanRozgar"
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <Trees className="w-6 h-6 text-white dark:text-[#1C2619]" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-[#2F4A2A] dark:text-[#F4F7EA] transition">
                Van<span className="text-[#4E7A3A] dark:text-[#8DB85A]">Rozgar</span>
              </span>
              <span className="text-[10px] font-bold bg-[#DDE8C6] dark:bg-[#3A5233] text-[#2F4A2A] dark:text-[#DDE8C6] px-1.5 py-0.2 rounded border border-[#E2D6BE] dark:border-[#3C4E38]">
                वनरोजगार
              </span>
            </div>
            <p className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A] font-medium tracking-wide">
              Forest Resource Marketplace
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#3F4A36] dark:text-[#E9EFDC]">
          <button
            onClick={() => onNavigateSection('hero')}
            className={`hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer relative py-1 ${
              activeSection === 'hero' ? 'text-[#4E7A3A] dark:text-[#8DB85A] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4E7A3A] dark:after:bg-[#8DB85A]' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigateSection('catalogue')}
            className={`hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer relative py-1 ${
              activeSection === 'catalogue' ? 'text-[#4E7A3A] dark:text-[#8DB85A] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4E7A3A] dark:after:bg-[#8DB85A]' : ''
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => onNavigateSection('categories')}
            className={`hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer relative py-1 ${
              activeSection === 'categories' ? 'text-[#4E7A3A] dark:text-[#8DB85A] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4E7A3A] dark:after:bg-[#8DB85A]' : ''
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => onNavigateSection('community')}
            className={`hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer relative py-1 ${
              activeSection === 'community' ? 'text-[#4E7A3A] dark:text-[#8DB85A] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4E7A3A] dark:after:bg-[#8DB85A]' : ''
            }`}
          >
            14 Gram Sabhas
          </button>
          <button
            onClick={() => onNavigateSection('benefits')}
            className={`hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer relative py-1 ${
              activeSection === 'benefits' ? 'text-[#4E7A3A] dark:text-[#8DB85A] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4E7A3A] dark:after:bg-[#8DB85A]' : ''
            }`}
          >
            Why Choose Us?
          </button>
          <button
            onClick={() => onNavigateSection('about')}
            className={`hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] transition cursor-pointer relative py-1 ${
              activeSection === 'about' ? 'text-[#4E7A3A] dark:text-[#8DB85A] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4E7A3A] dark:after:bg-[#8DB85A]' : ''
            }`}
          >
            About
          </button>
        </nav>

        {/* Right Search, Theme Toggle, Cart & Mobile Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-white dark:bg-[#2E3E2B] border border-[#E2D6BE] dark:border-[#3C4E38] rounded-full px-3 py-1.5 text-xs text-[#3F4A36] dark:text-[#E9EFDC] focus-within:border-[#4E7A3A] dark:focus-within:border-[#8DB85A] focus-within:ring-1 focus-within:ring-[#4E7A3A] dark:focus-within:ring-[#8DB85A] transition w-32 sm:w-52">
              <Search className="w-3.5 h-3.5 text-[#4E7A3A] dark:text-[#8DB85A] shrink-0 mr-1.5" />
              <input
                type="text"
                placeholder={currentLang === 'mr' ? 'संसाधने शोधा...' : 'Search resources...'}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-xs text-[#3F4A36] dark:text-[#E9EFDC] placeholder-[#7B6A55] dark:placeholder-[#A9B49A]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-[#7B6A55] dark:text-[#A9B49A] hover:text-[#2F4A2A] dark:hover:text-white text-xs font-bold px-1"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Theme Toggle Button (Light/Dark System Override) */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="w-9 h-9 rounded-full bg-white dark:bg-[#2E3E2B] border border-[#E2D6BE] dark:border-[#3C4E38] text-[#5A3B22] dark:text-[#D8B48A] hover:bg-[#F2EBDC] dark:hover:bg-[#3A5233] flex items-center justify-center transition shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4E7A3A]"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#F0A15A]" />
            ) : (
              <Moon className="w-4 h-4 text-[#5A3B22]" />
            )}
          </button>

          {/* Cart / Basket Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="View shopping cart"
            className="flex items-center gap-2 bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] font-bold px-3.5 py-1.5 rounded-full transition shadow-sm text-xs cursor-pointer relative"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#A4551A] text-white dark:bg-[#F0A15A] dark:text-[#1C2619] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-extrabold text-xs">Cart</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-white dark:bg-[#2E3E2B] border border-[#E2D6BE] dark:border-[#3C4E38] text-[#3F4A36] dark:text-[#E9EFDC] hover:text-[#2F4A2A] dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F2E8] dark:bg-[#1C2619] border-b border-[#E2D6BE] dark:border-[#3C4E38] px-4 py-4 space-y-3 text-sm font-semibold">
          <button
            onClick={() => { onNavigateSection('hero'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-[#3F4A36] dark:text-[#E9EFDC] hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] border-b border-[#E2D6BE] dark:border-[#3C4E38]"
          >
            Home
          </button>
          <button
            onClick={() => { onNavigateSection('catalogue'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-[#3F4A36] dark:text-[#E9EFDC] hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] border-b border-[#E2D6BE] dark:border-[#3C4E38]"
          >
            Marketplace (51 Resources)
          </button>
          <button
            onClick={() => { onNavigateSection('categories'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-[#3F4A36] dark:text-[#E9EFDC] hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] border-b border-[#E2D6BE] dark:border-[#3C4E38]"
          >
            Categories
          </button>
          <button
            onClick={() => { onNavigateSection('community'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-[#3F4A36] dark:text-[#E9EFDC] hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] border-b border-[#E2D6BE] dark:border-[#3C4E38]"
          >
            14 Nashik Gram Sabhas
          </button>
          <button
            onClick={() => { onNavigateSection('benefits'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-[#3F4A36] dark:text-[#E9EFDC] hover:text-[#4E7A3A] dark:hover:text-[#8DB85A] border-b border-[#E2D6BE] dark:border-[#3C4E38]"
          >
            Why Choose Us?
          </button>
          <button
            onClick={() => { onNavigateSection('about'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-[#3F4A36] dark:text-[#E9EFDC] hover:text-[#4E7A3A] dark:hover:text-[#8DB85A]"
          >
            About VanRozgar
          </button>
        </div>
      )}
    </header>
  );
};
