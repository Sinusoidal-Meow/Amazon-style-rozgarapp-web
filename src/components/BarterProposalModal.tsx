import React, { useState } from 'react';
import { 
  X, 
  Repeat, 
  CheckCircle2, 
  ArrowRightLeft, 
  ShieldCheck, 
  Package, 
  Sparkles 
} from 'lucide-react';
import { ProductListing, Language, TradeRequest } from '../types';
import { getLocalizedText, resolveAssetUrl } from '../utils/helpers';

interface BarterProposalModalProps {
  product: ProductListing;
  currentLang: Language;
  onClose: () => void;
  onSubmitTrade: (request: Partial<TradeRequest>) => void;
}

export const BarterProposalModal: React.FC<BarterProposalModalProps> = ({
  product,
  currentLang,
  onClose,
  onSubmitTrade,
}) => {
  const [requestedQty, setRequestedQty] = useState(product.minOrderQuantity || 1);
  const [offeredResource, setOfferedResource] = useState('');
  const [offeredQty, setOfferedQty] = useState(2);
  const [offeredUnit, setOfferedUnit] = useState('baskets');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offeredResource.trim()) return;

    onSubmitTrade({
      listingId: product.id,
      resourceTitle: getLocalizedText(product.title, 'en'),
      sellerGramSabhaId: product.seller.gramSabhaId || 'gs-nashik',
      sellerGramSabhaName: product.seller.name,
      requestedQuantity: requestedQty,
      unit: product.unit,
      isBarter: true,
      offeredResource: offeredResource,
      offeredQuantity: offeredQty,
      reason: reason || 'Traditional CFR village resource exchange proposal',
      status: 'pending',
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Repeat className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="font-bold text-base">Propose Barter Exchange (वस्तुविनिमय)</h2>
              <p className="text-xs text-emerald-200">Non-monetary forest & agricultural trade</p>
            </div>
          </div>
          <button onClick={onClose} className="text-emerald-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Barter Proposal Dispatched!</h3>
            <p className="text-stone-600 text-xs max-w-sm mx-auto leading-relaxed">
              Your barter offer of <strong>{offeredQty} {offeredUnit} of {offeredResource}</strong> for <strong>{requestedQty} {product.unit} of {getLocalizedText(product.title, currentLang)}</strong> has been forwarded to the Gram Sabha Secretary.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
            {/* Target Item summary */}
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <img
                src={resolveAssetUrl(product.assets.illustration)}
                alt=""
                className="w-12 h-12 object-contain"
              />
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  Target Forest Item
                </span>
                <h4 className="font-bold text-stone-900 text-sm">
                  {getLocalizedText(product.title, currentLang)}
                </h4>
                <p className="text-stone-500 text-[11px]">
                  Seller: {product.seller.name} · {product.seller.village}
                </p>
              </div>
            </div>

            {/* Seller wants notification */}
            {product.barterWants && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Gram Sabha Preferred Barter Wants:</span>
                </div>
                <p className="text-stone-700 font-medium">"{product.barterWants}"</p>
              </div>
            )}

            {/* Requested Quantity */}
            <div className="space-y-1.5">
              <label className="font-bold text-stone-800 block">
                Quantity You Want to Receive ({product.unit}):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={product.minOrderQuantity || 1}
                  max={product.quantityAvailable}
                  value={requestedQty}
                  onChange={(e) => setRequestedQty(Number(e.target.value))}
                  className="w-24 px-3 py-2 border border-stone-300 rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
                <span className="text-stone-500 font-medium">
                  {product.unit} (Max available: {product.quantityAvailable})
                </span>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4 space-y-4">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-sm">
                <ArrowRightLeft className="w-4 h-4 text-emerald-700" />
                <span>What Will You Offer in Exchange?</span>
              </div>

              {/* Offered Resource */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 block">
                  Commodity / Produce / Tool Offered:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bamboo Storage Baskets, Dried Mahua, Grain, Sisal Rope..."
                  value={offeredResource}
                  onChange={(e) => setOfferedResource(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              {/* Offered Quantity & Unit */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 block">Offered Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={offeredQty}
                    onChange={(e) => setOfferedQty(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 block">Unit:</label>
                  <select
                    value={offeredUnit}
                    onChange={(e) => setOfferedUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                  >
                    <option value="baskets">baskets / टोपली</option>
                    <option value="kg">kg / किलो</option>
                    <option value="quintal">quintal / क्विंटल</option>
                    <option value="bundles">bundles / बंडल</option>
                    <option value="saplings">saplings / रोपे</option>
                    <option value="pieces">pieces / नग</option>
                  </select>
                </div>
              </div>

              {/* Message to Gram Sabha */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 block">
                  Message / Condition Details (Optional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention quality, season, or logistics pickup preference..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* CFR Barter Policy Note */}
            <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-600 flex items-start gap-2 border border-stone-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Barter trade transactions are recorded by the Gram Sabha CFR Management Committee. Once the Secretary approves, local transport or village exchange pickup is assigned.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-300 rounded-lg font-semibold text-stone-700 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Repeat className="w-4 h-4 text-amber-300" />
                <span>Transmit Barter Offer</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
