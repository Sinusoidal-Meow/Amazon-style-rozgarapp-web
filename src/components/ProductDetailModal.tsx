import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Repeat, 
  ShoppingCart, 
  Phone, 
  Calendar, 
  Compass, 
  Info, 
  Trees, 
  Sparkles,
  Share2
} from 'lucide-react';
import { ProductListing, Language } from '../types';
import { formatINR, getLocalizedText, resolveAssetUrl } from '../utils/helpers';

interface ProductDetailModalProps {
  product: ProductListing;
  currentLang: Language;
  onClose: () => void;
  onAddToCart: (product: ProductListing, qty: number) => void;
  onOpenBarterModal: (product: ProductListing) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currentLang,
  onClose,
  onAddToCart,
  onOpenBarterModal,
}) => {
  const [qty, setQty] = useState(product.minOrderQuantity || 1);
  const [activeTab, setActiveTab] = useState<'provenance' | 'seller' | 'reviews'>('provenance');

  const isDiscounted = product.mrp && product.mrp > product.price;
  const discountPct = isDiscounted 
    ? Math.round(((product.mrp! - product.price) / product.mrp!) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-3.5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-800 text-emerald-200 font-semibold">
              {product.itemCode}
            </span>
            <span className="text-xs text-stone-300">
              Community Forest Resource (CFR) Verified Listing
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Product Image & Badges */}
            <div className="space-y-4">
              <div className="h-72 w-full rounded-2xl bg-radial from-stone-50 to-stone-100 flex items-center justify-center p-6 border border-stone-200 relative shadow-inner">
                <img
                  src={resolveAssetUrl(product.assets.illustration)}
                  alt={getLocalizedText(product.title, currentLang)}
                  className="max-h-60 max-w-60 object-contain drop-shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/products/forest.png';
                  }}
                />

                {product.verification.isVerified && (
                  <div className="absolute top-4 left-4 bg-emerald-700 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>CFR Title Holder Certified</span>
                  </div>
                )}
              </div>

              {/* Barter Info Card if available */}
              {product.barterWants && (
                <div className="bg-amber-50 border border-amber-300/80 rounded-xl p-4 text-xs text-amber-950 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-900 font-bold">
                    <Repeat className="w-4 h-4 text-amber-700" />
                    <span>Traditional Barter Exchange Welcome</span>
                  </div>
                  <p className="text-amber-900 leading-relaxed">
                    <strong>Producer Accepts:</strong> {product.barterWants}
                  </p>
                  <p className="text-[11px] text-amber-800 italic">
                    You can trade your own agricultural produce, seeds, or tools for this item without paying cash.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Details & Purchase Options */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{product.seller.village}, Taluka {product.seller.taluka || 'Nashik'}, {product.seller.district}</span>
                </div>
                
                <h1 className="text-2xl font-extrabold text-stone-900 leading-tight">
                  {getLocalizedText(product.title, currentLang)}
                </h1>

                {product.title.mr && currentLang !== 'mr' && (
                  <p className="text-sm font-semibold text-stone-600 mt-1">
                    {product.title.mr}
                  </p>
                )}

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span className="text-sm font-bold ml-1 text-stone-800">
                      {product.metrics.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-stone-400">·</span>
                  <span className="text-xs text-stone-600 font-medium">
                    {product.metrics.reviewCount} customer ratings
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Forest Direct
                  </span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-stone-900">
                    {formatINR(product.price)}
                  </span>
                  <span className="text-sm text-stone-600 font-semibold">
                    per {product.unit}
                  </span>

                  {isDiscounted && (
                    <span className="text-sm text-stone-400 line-through">
                      MRP {formatINR(product.mrp!)}
                    </span>
                  )}

                  {isDiscounted && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      {discountPct}% OFF
                    </span>
                  )}
                </div>

                {/* Fair Price Corridor Notice */}
                <div className="text-xs text-stone-600 flex items-center justify-between pt-2 border-t border-stone-200">
                  <span className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Fair Price Corridor:
                  </span>
                  <span className="font-bold text-stone-800">
                    ₹{product.fairPriceRange[0]} - ₹{product.fairPriceRange[1]} / {product.unit}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Counter & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-stone-700">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQty(Math.max(product.minOrderQuantity || 1, qty - 1))}
                      className="px-3 py-1.5 hover:bg-stone-100 font-bold text-stone-700 text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 font-bold text-stone-900 text-xs">
                      {qty} {product.unit}
                    </span>
                    <button
                      onClick={() => setQty(Math.min(product.quantityAvailable, qty + 1))}
                      className="px-3 py-1.5 hover:bg-stone-100 font-bold text-stone-700 text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-stone-500">
                    ({product.quantityAvailable} {product.unit} available)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {product.mode !== 'barter' && (
                    <button
                      onClick={() => {
                        onAddToCart(product, qty);
                        onClose();
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-extrabold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart ({formatINR(product.price * qty)})</span>
                    </button>
                  )}

                  {(product.mode === 'barter' || product.mode === 'both') && (
                    <button
                      onClick={() => {
                        onOpenBarterModal(product);
                      }}
                      className="w-full bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-extrabold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
                    >
                      <Repeat className="w-4 h-4 text-amber-300" />
                      <span>Propose Barter Trade</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Deep Provenance, Seller & Ecological Impact Tabs */}
          <div className="pt-6 border-t border-stone-200">
            <div className="flex border-b border-stone-200 gap-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('provenance')}
                className={`pb-2.5 transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'provenance'
                    ? 'border-b-2 border-emerald-700 text-emerald-800'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Trees className="w-4 h-4 text-emerald-600" />
                <span>Harvest Provenance & Ecological Guarantee</span>
              </button>

              <button
                onClick={() => setActiveTab('seller')}
                className={`pb-2.5 transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'seller'
                    ? 'border-b-2 border-emerald-700 text-emerald-800'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Gram Sabha Producer Details</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-emerald-700 text-emerald-800'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Star className="w-4 h-4 text-amber-500" />
                <span>Verified Buyer Reviews ({product.metrics.reviewCount})</span>
              </button>
            </div>

            <div className="py-4">
              {activeTab === 'provenance' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-stone-500 block font-medium">Source Forest Area</span>
                    <strong className="text-stone-900 block text-sm">{product.provenance.sourceArea}</strong>
                  </div>

                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-stone-500 block font-medium">Harvesting Method</span>
                    <strong className="text-stone-900 block text-sm">{product.provenance.collectionMethod}</strong>
                  </div>

                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-stone-500 block font-medium">Harvest Season</span>
                    <strong className="text-stone-900 block text-sm">{product.provenance.harvestSeason || 'Year-round'}</strong>
                  </div>

                  <div className="sm:col-span-2 md:col-span-3 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-emerald-950 text-xs">100% Sustainable Forest Resource Compliance</h4>
                      <p className="text-emerald-900 text-xs mt-0.5 leading-relaxed">
                        Harvested strictly under Community Forest Resource (CFR) rights recognized under the Forest Rights Act (FRA 2006). All seeds and regenerative tree tissues are protected to ensure zero forest depletion.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seller' && (
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-stone-900">{product.seller.name}</h3>
                      <p className="text-stone-600">
                        {product.seller.type === 'gramsabha' ? 'Authorized Gram Sabha CFR Management Committee' : 'Registered CFR Title Holder Family'}
                      </p>
                    </div>
                    {product.seller.sellerPhone && (
                      <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200 font-mono text-stone-800">
                        <Phone className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{product.seller.sellerPhone}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-200">
                    <div>
                      <span className="text-stone-500 block">Village:</span>
                      <strong className="text-stone-800">{product.seller.village}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Taluka:</span>
                      <strong className="text-stone-800">{product.seller.taluka || 'Deola / Dindori / Trimbakeshwar'}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">District:</span>
                      <strong className="text-stone-800">{product.seller.district}</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-stone-900">{product.metrics.rating.toFixed(1)} out of 5</span>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">Based on {product.metrics.reviewCount} verified forest purchases</p>
                    </div>
                  </div>

                  {/* Sample verified review */}
                  <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-800">Ayurvedic Practitioner, Nashik</span>
                      <span className="text-stone-400 text-[11px]">Verified Purchase</span>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-stone-700 leading-relaxed">
                      "Purity is unmatched compared to commercial market brands. The honey arrived completely unadulterated with pollen residue intact."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-100 flex items-center justify-between border-t border-stone-200">
          <div className="text-xs text-stone-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Fair Trade Direct to Nashik Gram Sabhas</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
