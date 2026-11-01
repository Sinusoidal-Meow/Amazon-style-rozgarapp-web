import React from 'react';
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  Repeat, 
  ShoppingCart, 
  ShieldCheck, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { ProductListing, Language } from '../types';
import { formatINR, getLocalizedText, resolveAssetUrl } from '../utils/helpers';

interface ProductCardProps {
  product: ProductListing;
  currentLang: Language;
  onSelect: (product: ProductListing) => void;
  onAddToCart: (product: ProductListing, e: React.MouseEvent) => void;
  onOpenBarterModal: (product: ProductListing, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currentLang,
  onSelect,
  onAddToCart,
  onOpenBarterModal,
}) => {
  const isDiscounted = product.mrp && product.mrp > product.price;
  const discountPct = isDiscounted 
    ? Math.round(((product.mrp! - product.price) / product.mrp!) * 100)
    : 0;

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-xl border border-stone-200/90 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Header Tags */}
      <div className="p-3.5 pb-0 flex items-start justify-between gap-2 z-10">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
            {product.itemCode}
          </span>
          {product.verification.isVerified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>CFR Verified</span>
            </span>
          )}
        </div>

        {/* Mode Tag */}
        {product.mode === 'barter' ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            <Repeat className="w-3 h-3 text-amber-700" /> Barter Only
          </span>
        ) : product.mode === 'both' ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            <Repeat className="w-3 h-3 text-blue-600" /> Cash & Barter
          </span>
        ) : null}
      </div>

      {/* Product Image Stage */}
      <div className="relative h-44 w-full p-4 flex items-center justify-center bg-radial from-stone-50 to-stone-100/60 overflow-hidden">
        <img
          src={resolveAssetUrl(product.assets.illustration)}
          alt={getLocalizedText(product.title, currentLang)}
          className="max-h-36 max-w-36 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/products/forest.png';
          }}
        />

        {/* Available Quantity indicator */}
        <div className="absolute bottom-2 left-3 text-[11px] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-stone-600 font-medium shadow-2xs border border-stone-200">
          Stock: <span className="text-emerald-800 font-bold">{product.quantityAvailable} {product.unit}</span>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-3.5 pt-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Provenance */}
          <div className="flex items-center gap-1 text-[11px] text-stone-500 mb-1">
            <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
            <span className="truncate font-medium">
              {product.seller.village}, {product.seller.district}
            </span>
            {product.seller.type === 'gramsabha' && (
              <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1 rounded font-bold">
                Gram Sabha
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-emerald-800 transition">
            {getLocalizedText(product.title, currentLang)}
          </h3>

          {/* Secondary Title (Marathi/English subtitle) */}
          {currentLang === 'en' && product.title.mr && (
            <p className="text-xs text-stone-500 font-medium mt-0.5">
              {product.title.mr}
            </p>
          )}

          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="text-xs font-bold ml-1 text-stone-800">
                {product.metrics.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-stone-400 text-xs">·</span>
            <span className="text-[11px] text-stone-500">
              {product.metrics.reviewCount} reviews
            </span>
          </div>

          {/* Barter wants snippet if exists */}
          {product.barterWants && (
            <div className="mt-2.5 p-2 bg-amber-50/70 border border-amber-200/80 rounded-lg text-[11px] text-amber-950">
              <span className="font-bold text-amber-900">🤝 Barter Wanted:</span>{' '}
              <span className="line-clamp-1">{product.barterWants}</span>
            </div>
          )}
        </div>

        {/* Pricing & Actions */}
        <div className="mt-3.5 pt-3 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-stone-900">
                {formatINR(product.price)}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                / {product.unit}
              </span>

              {isDiscounted && (
                <span className="text-xs text-stone-400 line-through">
                  {formatINR(product.mrp!)}
                </span>
              )}
            </div>

            {isDiscounted && (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                {discountPct}% OFF
              </span>
            )}
          </div>

          {/* Fair Price Corridor Benchmark */}
          <div className="text-[10px] text-stone-500 flex items-center justify-between mb-3 bg-stone-50 px-2 py-1 rounded">
            <span>Fair Price Band:</span>
            <span className="font-semibold text-stone-700">
              ₹{product.fairPriceRange[0]} - ₹{product.fairPriceRange[1]}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {product.mode !== 'barter' ? (
              <button
                onClick={(e) => onAddToCart(product, e)}
                className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold py-1.5 px-2 rounded-lg text-xs flex items-center justify-center gap-1 transition shadow-xs"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-stone-100 text-stone-400 font-medium py-1.5 px-2 rounded-lg text-xs flex items-center justify-center"
              >
                Cash Disabled
              </button>
            )}

            {(product.mode === 'barter' || product.mode === 'both') ? (
              <button
                onClick={(e) => onOpenBarterModal(product, e)}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-1.5 px-2 rounded-lg text-xs flex items-center justify-center gap-1 transition shadow-xs"
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>Barter Swap</span>
              </button>
            ) : (
              <button
                onClick={() => onSelect(product)}
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-1.5 px-2 rounded-lg text-xs flex items-center justify-center gap-1 transition"
              >
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
