import React, { useState, useMemo, useEffect } from 'react';
import { ALL_51_RESOURCES, CATEGORY_GROUPS, CatalogueResource } from './data/catalogue51';
import gramSabhasData from '../data/gram-sabhas.json';
import ordersData from '../data/orders.json';

import { GramSabha, Order, Language, CartItem } from './types';

import { GreenBasketHeader } from './components/GreenBasketHeader';
import { GreenBasketHero } from './components/GreenBasketHero';
import { GreenBasketCommunityBanner } from './components/GreenBasketCommunityBanner';
import { BotanicalEditorialShowcase } from './components/BotanicalEditorialShowcase';
import { GreenBasketPromoBanner } from './components/GreenBasketPromoBanner';
import { GreenBasketBenefits } from './components/GreenBasketBenefits';
import { ForestResourceCarousel } from './components/ForestResourceCarousel';
import { GreenBasketDetailModal } from './components/GreenBasketDetailModal';
import { GreenBasketNewsletter } from './components/GreenBasketNewsletter';
import { GreenBasketFooter } from './components/GreenBasketFooter';
import { GramSabhasView } from './components/GramSabhasView';
import { CartDrawer } from './components/CartDrawer';

import { 
  Filter, 
  RotateCcw, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Package, 
  Layers, 
  Trees 
} from 'lucide-react';

export const App: React.FC = () => {
  const gramSabhas = gramSabhasData as unknown as GramSabha[];

  // App page title
  useEffect(() => {
    document.title = 'VanRozgar — Community Forest Rights & Botanical Marketplace';
  }, []);

  // Smooth scroll helper to Discover Forest Resources section with sticky header offset
  const handleScrollToDiscoverResources = () => {
    const el = document.getElementById('discover-forest-resources') || document.getElementById('catalogue-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation & State
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ready' | 'check_later' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals & Cart
  const [selectedResource, setSelectedResource] = useState<CatalogueResource | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showGramSabhasModal, setShowGramSabhasModal] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (resource: CatalogueResource) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === resource.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === resource.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          product: {
            id: resource.id,
            title: { en: resource.englishName, mr: resource.name },
            price: resource.priceEstimate || 100,
            unit: resource.unit || 'unit',
            seller: { name: 'Nashik CFR Collective', village: 'Nashik' },
            assets: { illustration: resource.image || '/assets/products/forest.png' },
          } as any,
          quantity: 1,
          mode: 'buy',
        },
      ];
    });
    showToast(`Added "${resource.name} (${resource.englishName})" to cart`);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as any[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Section navigation helper
  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'community') {
      setShowGramSabhasModal(true);
      return;
    }
    const el = document.getElementById(
      sectionId === 'catalogue' ? 'discover-forest-resources' :
      sectionId === 'categories' ? 'categories-section' :
      sectionId === 'benefits' ? 'benefits-section' :
      sectionId === 'about' ? 'about-section' : 'hero-section'
    );
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Category select with smooth scroll to catalogue
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    const catalogueEl = document.getElementById('discover-forest-resources') || document.getElementById('catalogue-section');
    if (catalogueEl) {
      catalogueEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic status counts calculated directly from source dataset
  const statusCounts = useMemo(() => {
    let ready = 0;
    let check_later = 0;
    let pending = 0;
    ALL_51_RESOURCES.forEach((r) => {
      if (r.status === 'ready') ready++;
      else if (r.status === 'check_later') check_later++;
      else if (r.status === 'pending') pending++;
    });
    return { ready, check_later, pending, total: ALL_51_RESOURCES.length };
  }, []);

  // Filtered resources calculation
  const filteredResources = useMemo(() => {
    return ALL_51_RESOURCES.filter((res) => {
      const matchesCategory =
        selectedCategory === 'all' || res.category === selectedCategory;

      const matchesStatus =
        statusFilter === 'all' || res.status === statusFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        res.name.toLowerCase().includes(q) ||
        res.englishName.toLowerCase().includes(q) ||
        res.groupName.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        (res.checkNote && res.checkNote.toLowerCase().includes(q)) ||
        (res.uses && res.uses.some((u) => u.toLowerCase().includes(q)));

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, statusFilter, searchQuery]);

  const totalCartUnits = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F7F2E8] dark:bg-[#1C2619] text-[#3F4A36] dark:text-[#E9EFDC] flex flex-col font-sans transition-colors duration-200 selection:bg-[#DDE8C6] selection:text-[#2F4A2A] dark:selection:bg-[#3A5233] dark:selection:text-[#DDE8C6]">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#F7F2E8] dark:bg-[#2E3E2B] text-[#2F4A2A] dark:text-[#F4F7EA] px-5 py-3 rounded-2xl shadow-2xl border border-[#4E7A3A] dark:border-[#8DB85A] flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-[#A4551A] dark:text-[#F0A15A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* A & B. Header (Top Announcement Bar + Main Navbar) */}
      <GreenBasketHeader
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartUnits}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
      />

      <main className="flex-1 space-y-6">
        {/* C. Hero Section */}
        <div id="hero-section">
          <GreenBasketHero
            currentLang={currentLang}
            onExploreClick={() => handleNavigateSection('catalogue')}
            onCategoriesClick={() => handleNavigateSection('categories')}
          />
        </div>

        {/* D. Community Feature Banner ("From Forest Communities To Your Marketplace") */}
        <GreenBasketCommunityBanner
          onLearnMore={() => setShowGramSabhasModal(true)}
        />

        {/* BOTANICAL EDITORIAL SHOWCASE (Introductory Category Section) */}
        <BotanicalEditorialShowcase
          currentLang={currentLang}
          onViewAll={handleScrollToDiscoverResources}
          onSelectResource={(r) => setSelectedResource(r)}
          totalCount={ALL_51_RESOURCES.length}
        />

        {/* Informative Featured-Resource Promotional Banner */}
        <GreenBasketPromoBanner
          onActionClick={handleScrollToDiscoverResources}
        />

        {/* Benefits Section ("Why Choose Us?") */}
        <GreenBasketBenefits />

        {/* Centre-Focused Product Carousel ("Discover Forest Resources") */}
        <section 
          id="discover-forest-resources" 
          className="max-w-7xl mx-auto px-4 py-10 space-y-6 scroll-mt-24 sm:scroll-mt-28"
        >
          {/* Invisible anchor for any legacy #catalogue-section links */}
          <span id="catalogue-section" className="block relative -top-28 pointer-events-none" aria-hidden="true" />
              {/* Main Section Heading - Centered near top */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                {/* Dynamic Status Badges */}
                <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                  <span className="bg-[#DDE8C6] text-[#2F4A2A] dark:bg-[#3A5233] dark:text-[#DDE8C6] px-3 py-1 rounded-full border border-[#E2D6BE] dark:border-[#3C4E38] shadow-xs">
                    {statusCounts.ready} {currentLang === 'mr' ? 'उपलब्ध (Ready)' : 'Ready'}
                  </span>
                  <span className="bg-white dark:bg-[#2E3E2B] text-[#A4551A] dark:text-[#F0A15A] px-3 py-1 rounded-full border border-[#E2D6BE] dark:border-[#3C4E38] shadow-xs">
                    {statusCounts.check_later} {currentLang === 'mr' ? 'तपासणी बाकी' : 'Check Later'}
                  </span>
                  <span className="bg-white dark:bg-[#2E3E2B] text-[#7B6A55] dark:text-[#A9B49A] px-3 py-1 rounded-full border border-[#E2D6BE] dark:border-[#3C4E38] shadow-xs">
                    {statusCounts.pending} {currentLang === 'mr' ? 'चित्र प्रलंबित' : 'Pending'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2F4A2A] dark:text-[#F4F7EA] tracking-tight">
                    {currentLang === 'mr' ? 'वन संसाधने शोधा' : 'Discover Forest Resources'}
                  </h2>
                  <p className="text-sm sm:text-base text-[#7B6A55] dark:text-[#A9B49A] max-w-2xl mx-auto leading-relaxed">
                    {currentLang === 'mr' 
                      ? 'वनरोजगारच्या समुदाय संसाधन सूचीतील वनौषधी, फळे आणि पारंपारिक वनोपज एक्सप्लोर करा.' 
                      : "Explore botanical resources and traditional forest produce from VanRozgar's community resource catalogue."}
                  </p>
                </div>
              </div>

              {/* Filtering Toolbar */}
              <div className="bg-[#EFE8D8] dark:bg-[#2E3E2B] rounded-2xl p-4 border border-[#E2D6BE] dark:border-[#3C4E38] shadow-sm flex flex-wrap items-center justify-between gap-4">
                {/* Category selection pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-3xl scrollbar-none text-xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3.5 py-1.5 rounded-full font-bold transition whitespace-nowrap cursor-pointer border ${
                      selectedCategory === 'all'
                        ? 'bg-[#4E7A3A] text-white shadow-xs border-[#4E7A3A] dark:bg-[#8DB85A] dark:text-[#1C2619] dark:border-[#8DB85A]'
                        : 'bg-white dark:bg-[#1C2619] text-[#3F4A36] dark:text-[#E9EFDC] border-[#E2D6BE] dark:border-[#3C4E38] hover:bg-[#DDE8C6]/50 dark:hover:bg-[#3A5233]'
                    }`}
                  >
                    All ({statusCounts.total})
                  </button>
                  {CATEGORY_GROUPS.filter((c) => c.id !== 'all').map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-full font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                        selectedCategory === cat.id
                          ? 'bg-[#4E7A3A] text-white shadow-xs border-[#4E7A3A] dark:bg-[#8DB85A] dark:text-[#1C2619] dark:border-[#8DB85A]'
                          : 'bg-white dark:bg-[#1C2619] text-[#3F4A36] dark:text-[#E9EFDC] border-[#E2D6BE] dark:border-[#3C4E38] hover:bg-[#DDE8C6]/50 dark:hover:bg-[#3A5233]'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{currentLang === 'mr' ? cat.marathiName : cat.name}</span>
                      <span className="text-[10px] opacity-75">({cat.count})</span>
                    </button>
                  ))}
                </div>

                {/* Secondary Filter & Reset */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 bg-white dark:bg-[#1C2619] px-3 py-1.5 rounded-xl border border-[#E2D6BE] dark:border-[#3C4E38] shadow-inner">
                    <span className="text-[#7B6A55] dark:text-[#A9B49A] font-medium text-[11px]">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="bg-transparent text-[#2F4A2A] dark:text-[#F4F7EA] font-bold focus:outline-none cursor-pointer text-xs"
                    >
                      <option value="all" className="bg-[#F7F2E8] dark:bg-[#1C2619] text-[#3F4A36] dark:text-[#E9EFDC]">All Statuses ({statusCounts.total})</option>
                      <option value="ready" className="bg-[#F7F2E8] dark:bg-[#1C2619] text-[#3F4A36] dark:text-[#E9EFDC]">Ready ({statusCounts.ready})</option>
                      <option value="check_later" className="bg-[#F7F2E8] dark:bg-[#1C2619] text-[#3F4A36] dark:text-[#E9EFDC]">Check Later ({statusCounts.check_later})</option>
                      <option value="pending" className="bg-[#F7F2E8] dark:bg-[#1C2619] text-[#3F4A36] dark:text-[#E9EFDC]">Image Pending ({statusCounts.pending})</option>
                    </select>
                  </div>

                  {(selectedCategory !== 'all' || statusFilter !== 'all' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setStatusFilter('all');
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-1 text-[#A4551A] hover:text-[#7B6A55] dark:text-[#F0A15A] dark:hover:text-[#D8B48A] transition font-bold cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Results Summary */}
              <div className="text-xs text-[#7B6A55] dark:text-[#A9B49A] font-medium flex items-center justify-between px-1">
                <span>
                  Showing <strong>{filteredResources.length}</strong> of {statusCounts.total} verified forest resources
                </span>
                {searchQuery && (
                  <span>Matching search: "<strong>{searchQuery}</strong>"</span>
                )}
              </div>

              {/* Horizontal Product Carousel */}
              <ForestResourceCarousel
                resources={filteredResources}
                currentLang={currentLang}
                onSelectResource={(r) => setSelectedResource(r)}
                onAddToCart={(r) => handleAddToCart(r)}
                selectedCategory={selectedCategory}
                statusFilter={statusFilter}
                searchQuery={searchQuery}
                onResetFilters={() => {
                  setSelectedCategory('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
              />
            </section>

            {/* J. Newsletter Section */}
            <GreenBasketNewsletter />

            {/* About Section Anchor */}
            <section id="about-section" className="max-w-7xl mx-auto px-4 py-8">
              <div className="bg-[#EFE8D8] dark:bg-[#2E3E2B] rounded-3xl p-6 sm:p-8 border border-[#E2D6BE] dark:border-[#3C4E38] text-[#3F4A36] dark:text-[#E9EFDC] space-y-3">
                <div className="flex items-center gap-2 text-[#4E7A3A] dark:text-[#8DB85A] font-bold text-xs uppercase tracking-wider">
                  <Trees className="w-4 h-4" />
                  <span>ABOUT VANROZGAR &amp; COMMONS STEWARDSHIP</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#2F4A2A] dark:text-[#F4F7EA]">
                  Direct Trade Powered by FRA 2006
                </h3>
                <p className="text-xs sm:text-sm text-[#7B6A55] dark:text-[#A9B49A] leading-relaxed max-w-3xl">
                  Under Section 3(1)(c) of the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006, Gram Sabhas hold statutory rights of ownership, access to collect, use, and dispose of minor forest produce. VanRozgar establishes transparent marketplace connections to empower forest stewards.
                </p>
              </div>
            </section>
          </main>

          {/* Footer */}
          <GreenBasketFooter
            onNavigateSection={handleNavigateSection}
            onSelectCategory={handleSelectCategory}
          />

      {/* ========================================================================= */}
      {/* GLOBAL MODALS: Resource Details, Gram Sabhas Directory & Cart Drawer      */}
      {/* ========================================================================= */}
      {selectedResource && (
        <GreenBasketDetailModal
          resource={selectedResource}
          currentLang={currentLang}
          onClose={() => setSelectedResource(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showGramSabhasModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowGramSabhasModal(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-[#F7F2E8] dark:bg-[#2E3E2B] text-[#3F4A36] dark:text-[#E9EFDC] rounded-3xl max-w-4xl w-full border border-[#E2D6BE] dark:border-[#3C4E38] p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E2D6BE] dark:border-[#3C4E38] mb-6">
              <div>
                <h3 className="text-xl font-black text-[#2F4A2A] dark:text-[#F4F7EA]">14 Stewarding Gram Sabhas</h3>
                <p className="text-xs text-[#7B6A55] dark:text-[#A9B49A]">Nashik District, Maharashtra · Verified Community Forest Rights (CFR)</p>
              </div>
              <button
                onClick={() => setShowGramSabhasModal(false)}
                className="px-3 py-1.5 bg-white dark:bg-[#1C2619] hover:bg-[#DDE8C6] dark:hover:bg-[#3A5233] text-[#3F4A36] dark:text-[#E9EFDC] border border-[#E2D6BE] dark:border-[#3C4E38] rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
            <GramSabhasView
              gramSabhas={gramSabhas}
              currentLang={currentLang}
              onFilterByVillage={() => {}}
            />
          </div>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        currentLang={currentLang}
        onOrderPlaced={(order) => {
          showToast(`Order #${order.id} submitted! Gram Sabhas notified.`);
          setCart([]);
          setIsCartOpen(false);
        }}
      />
    </div>
  );
};

export default App;
