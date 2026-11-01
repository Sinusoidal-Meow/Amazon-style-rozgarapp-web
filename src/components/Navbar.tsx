import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  MapPin, 
  Globe, 
  Repeat, 
  Package, 
  Trees, 
  FileText, 
  ShieldCheck, 
  User, 
  ChevronDown, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { Category, Language, DemoUser } from '../types';
import { getLocalizedText } from '../utils/helpers';

interface NavbarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentUser: DemoUser;
  demoUsers: DemoUser[];
  onSelectUser: (user: DemoUser) => void;
  activeTab: 'catalog' | 'barter' | 'gramsabhas' | 'orders' | 'schemes' | 'restricted';
  onSelectTab: (tab: 'catalog' | 'barter' | 'gramsabhas' | 'orders' | 'schemes' | 'restricted') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  currentLang,
  onLanguageChange,
  cartCount,
  onOpenCart,
  currentUser,
  demoUsers,
  onSelectUser,
  activeTab,
  onSelectTab,
}) => {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-white shadow-md">
      {/* Top Banner */}
      <div className="bg-emerald-900/90 text-emerald-100 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-emerald-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide">
            <Sparkles className="w-3 h-3 text-amber-300" /> CFR CERTIFIED
          </span>
          <span className="hidden sm:inline">
            Direct forest produce from 14 Gram Sabhas in Nashik · 2,019 Ha Protected Canopy · Fair Community Pricing
          </span>
          <span className="sm:hidden">
            Nashik CFR Produce · Direct from 14 Gram Sabhas
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          {/* Demo Role Switcher Trigger */}
          <button
            onClick={() => setShowRoleModal(true)}
            className="flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-800/80 px-2.5 py-1 rounded text-stone-200 transition border border-emerald-700/60"
            title="Switch demo account"
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-emerald-100 max-w-[140px] truncate">
              {currentUser.name.replace(' (Demo)', '')}
            </span>
            <span className="text-[10px] bg-emerald-700/80 uppercase px-1 rounded text-stone-200">
              {currentUser.role}
            </span>
            <ChevronDown className="w-3 h-3 text-emerald-300" />
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1 hover:text-white px-2 py-0.5 rounded transition"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold uppercase">{currentLang}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-1 w-36 bg-white text-stone-800 rounded-lg shadow-xl border border-stone-200 py-1.5 z-50">
                <button
                  onClick={() => { onLanguageChange('en'); setShowLangDropdown(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-stone-100 ${currentLang === 'en' ? 'font-bold text-emerald-700 bg-emerald-50' : ''}`}
                >
                  English (EN)
                  {currentLang === 'en' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
                <button
                  onClick={() => { onLanguageChange('mr'); setShowLangDropdown(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-stone-100 ${currentLang === 'mr' ? 'font-bold text-emerald-700 bg-emerald-50' : ''}`}
                >
                  मराठी (MR)
                  {currentLang === 'mr' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
                <button
                  onClick={() => { onLanguageChange('hi'); setShowLangDropdown(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-stone-100 ${currentLang === 'hi' ? 'font-bold text-emerald-700 bg-emerald-50' : ''}`}
                >
                  हिंदी (HI)
                  {currentLang === 'hi' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar (Amazon Style) */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onSelectTab('catalog')}
          className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-600 p-1 flex items-center justify-center shadow-md border border-emerald-500 overflow-hidden">
            <img 
              src="/assets/brand/vanmitra-logo-original.jpg" 
              alt="VanRozgar Logo" 
              className="w-full h-full object-cover rounded"
              onError={(e) => {
                // Fallback to stylized icon if image fails
                (e.target as HTMLElement).style.display = 'none';
              }} 
            />
            <Trees className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition">
                Van<span className="text-amber-400">Rozgar</span>
              </span>
              <span className="text-xs bg-emerald-800 text-emerald-200 font-bold px-1.5 py-0.5 rounded">
                वनरोजगार
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-medium">Nashik CFR Tribal Marketplace</p>
          </div>
        </div>

        {/* Location Dispatch Badge (Amazon deliver-to style) */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 text-stone-300 hover:text-white rounded hover:outline hover:outline-1 hover:outline-stone-500 cursor-pointer">
          <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs leading-tight">
            <span className="text-stone-400 text-[11px] block">Dispatches from</span>
            <span className="font-bold text-white block">Nashik Dist, MH</span>
          </div>
        </div>

        {/* Search Bar (Amazon Style) */}
        <div className="flex-1 max-w-2xl mx-2">
          <div className="flex rounded-md overflow-hidden bg-white shadow-inner focus-within:ring-2 focus-within:ring-amber-400">
            {/* Category Dropdown */}
            <div className="hidden md:block bg-stone-100 border-r border-stone-300 text-stone-700 text-xs">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  onSelectCategory(e.target.value);
                  if (activeTab !== 'catalog') onSelectTab('catalog');
                }}
                className="h-full px-3 py-2 bg-transparent text-stone-800 font-medium cursor-pointer focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {getLocalizedText(c.name, currentLang)}
                  </option>
                ))}
              </select>
            </div>

            {/* Input field */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={
                  currentLang === 'mr' 
                    ? 'मध, बांबू टोपली, हिरडा, औषधी, गाव किंवा कोड शोधा...' 
                    : 'Search wild honey, bamboo, herbs, tamarind, village...'
                }
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (activeTab !== 'catalog') onSelectTab('catalog');
                }}
                className="w-full h-full px-3 py-2 text-stone-900 text-sm focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Submit Button */}
            <button
              onClick={() => {
                if (activeTab !== 'catalog') onSelectTab('catalog');
              }}
              className="bg-amber-500 hover:bg-amber-600 px-4 text-stone-900 transition flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-5 h-5 font-bold" />
            </button>
          </div>
        </div>

        {/* Right Action Icons: Barter Hub, Orders, Cart */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Barter Hub Button */}
          <button
            onClick={() => onSelectTab('barter')}
            className={`flex flex-col items-center px-2 py-1 rounded text-xs transition ${
              activeTab === 'barter' ? 'text-amber-400 bg-stone-800 font-bold' : 'text-stone-300 hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Barter Hub</span>
          </button>

          {/* Orders Button */}
          <button
            onClick={() => onSelectTab('orders')}
            className={`flex flex-col items-center px-2 py-1 rounded text-xs transition ${
              activeTab === 'orders' ? 'text-amber-400 bg-stone-800 font-bold' : 'text-stone-300 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Orders</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-2 rounded-md transition shadow relative ml-1"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-xs font-extrabold">Cart</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Strip */}
      <nav className="bg-stone-800 text-stone-300 text-xs px-4 py-1.5 border-t border-stone-700/80 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-4 whitespace-nowrap">
          <button
            onClick={() => onSelectTab('catalog')}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 ${
              activeTab === 'catalog' ? 'bg-emerald-700 text-white font-bold' : 'hover:bg-stone-700 text-stone-200'
            }`}
          >
            <Trees className="w-3.5 h-3.5 text-emerald-400" />
            <span>Marketplace Catalog</span>
          </button>

          <button
            onClick={() => onSelectTab('barter')}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 ${
              activeTab === 'barter' ? 'bg-amber-600 text-white font-bold' : 'hover:bg-stone-700 text-stone-200'
            }`}
          >
            <Repeat className="w-3.5 h-3.5 text-amber-300" />
            <span>🤝 Barter & Direct Trade</span>
          </button>

          <button
            onClick={() => onSelectTab('gramsabhas')}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 ${
              activeTab === 'gramsabhas' ? 'bg-emerald-700 text-white font-bold' : 'hover:bg-stone-700 text-stone-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>14 Nashik Gram Sabhas (Raah Report)</span>
          </button>

          <button
            onClick={() => onSelectTab('orders')}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-emerald-700 text-white font-bold' : 'hover:bg-stone-700 text-stone-200'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-emerald-400" />
            <span>Order Logistics</span>
          </button>

          <button
            onClick={() => onSelectTab('schemes')}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 ${
              activeTab === 'schemes' ? 'bg-emerald-700 text-white font-bold' : 'hover:bg-stone-700 text-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Govt Schemes & Livelihood Ideas</span>
          </button>

          <button
            onClick={() => onSelectTab('restricted')}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 ${
              activeTab === 'restricted' ? 'bg-rose-900/80 text-rose-200 font-bold' : 'hover:bg-stone-700 text-rose-300'
            }`}
          >
            <span>⚠️ Restricted Forest Items</span>
          </button>
        </div>
      </nav>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white text-stone-900 rounded-2xl max-w-md w-full shadow-2xl p-6 border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-lg text-stone-900">Switch Demo Account</h3>
              </div>
              <button 
                onClick={() => setShowRoleModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 my-3">
              Select an account to test different stakeholder views (Gram Sabha Secretary, CFR Villager, Ethical Buyer, or Platform Admin):
            </p>

            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {demoUsers.map((u, i) => {
                const isSelected = u.phone === currentUser.phone && u.name === currentUser.name;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      onSelectUser(u);
                      setShowRoleModal(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold shadow-sm'
                        : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{u.name.replace(' (Demo)', '')}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold bg-stone-200 text-stone-700">
                          {u.role}
                        </span>
                      </div>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        {u.village ? `Village: ${u.village} (${u.taluka || 'Nashik'})` : u.businessName || u.phone}
                      </p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-semibold hover:bg-stone-900"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
