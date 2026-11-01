import React, { useState } from 'react';
import { 
  Repeat, 
  ArrowRightLeft, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle, 
  ShieldCheck, 
  MessageSquare,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { TradeRequest, DemoUser, Language } from '../types';

interface BarterHubViewProps {
  tradeRequests: TradeRequest[];
  onUpdateStatus: (requestId: string, newStatus: TradeRequest['status'], counterOffer?: any) => void;
  currentUser: DemoUser;
  currentLang: Language;
}

export const BarterHubView: React.FC<BarterHubViewProps> = ({
  tradeRequests,
  onUpdateStatus,
  currentUser,
  currentLang,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [counterNote, setCounterNote] = useState<{ [id: string]: string }>({});
  const [counterQty, setCounterQty] = useState<{ [id: string]: number }>({});
  const [activeCounterId, setActiveCounterId] = useState<string | null>(null);

  const filtered = filterStatus === 'all'
    ? tradeRequests
    : tradeRequests.filter((r) => r.status === filterStatus);

  const isSecretary = currentUser.role === 'gramsabha';

  const getStatusBadge = (status: TradeRequest['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Approved
          </span>
        );
      case 'countered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-700" /> Countered
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-700" /> Declined
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-300">
            <Clock className="w-3.5 h-3.5 text-stone-500" /> Under Review
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
            <Repeat className="w-3.5 h-3.5 text-amber-400" /> Traditional Village Barter Exchange (वस्तुविनिमय)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Barter Trade Desk & Counter-Offers
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            In Nashik tribal communities, Community Forest Rights entitle families to trade raw honey, medicinal roots, bamboo baskets, and grain with neighboring villages without cash dependency.
          </p>
        </div>

        {/* User Role Reminder */}
        <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 text-xs space-y-1.5 shrink-0">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <UserCheck className="w-4 h-4" />
            <span>Active Perspective:</span>
          </div>
          <div className="font-semibold text-white">{currentUser.name}</div>
          <div className="text-[11px] text-stone-400 capitalize">Role: {currentUser.role}</div>
          {isSecretary ? (
            <p className="text-[10px] text-emerald-300 font-medium pt-1">
              ✓ You have Secretary rights to approve or counter trade proposals below.
            </p>
          ) : (
            <p className="text-[10px] text-stone-400 italic pt-1">
              Switch to a Gram Sabha demo account to simulate approving/countering trades.
            </p>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'pending', 'approved', 'countered', 'rejected'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition capitalize cursor-pointer ${
              filterStatus === s
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {s} ({s === 'all' ? tradeRequests.length : tradeRequests.filter(r => r.status === s).length})
          </button>
        ))}
      </div>

      {/* Trade Requests List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 text-stone-500">
            <Repeat className="w-10 h-10 mx-auto text-stone-300 mb-2" />
            <p className="font-bold">No trade requests match this filter.</p>
          </div>
        ) : (
          filtered.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                    {req.id}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    Requested on {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>{getStatusBadge(req.status)}</div>
              </div>

              {/* Trade Exchange Representation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-stone-50 p-4 rounded-xl border border-stone-200/80 text-xs">
                {/* Desired Item */}
                <div className="space-y-1">
                  <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider block">
                    Buyer Wants
                  </span>
                  <strong className="text-sm font-extrabold text-stone-900 block">
                    {req.requestedQuantity} {req.unit} of {req.resourceTitle}
                  </strong>
                  <span className="text-stone-500 text-[11px] block">
                    From: {req.sellerGramSabhaName}
                  </span>
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center justify-center text-amber-600">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shadow-xs">
                    <ArrowRightLeft className="w-5 h-5" />
                  </div>
                </div>

                {/* Offered Barter */}
                <div className="space-y-1 md:text-right">
                  <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider block">
                    Offered in Barter
                  </span>
                  <strong className="text-sm font-extrabold text-emerald-800 block">
                    {req.offeredQuantity} {req.offeredResource}
                  </strong>
                  <span className="text-stone-500 text-[11px] block">
                    Offered by: {req.buyerName} {req.buyerVillage ? `(${req.buyerVillage})` : ''}
                  </span>
                </div>
              </div>

              {/* Reason / Message */}
              {req.reason && (
                <div className="text-xs text-stone-600 bg-stone-50/50 p-3 rounded-lg border border-stone-100 flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Message:</strong> "{req.reason}"
                  </span>
                </div>
              )}

              {/* Counter offer details if present */}
              {req.counterOffer && (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <ArrowRightLeft className="w-3.5 h-3.5" /> Gram Sabha Counter-Offer:
                  </div>
                  <p>
                    Requested Adjustment: <strong>{req.counterOffer.quantity} {req.unit}</strong> at adjusted benchmark of ₹{req.counterOffer.pricePerUnit}/{req.unit}.
                  </p>
                  <p className="text-amber-800 italic">"{req.counterOffer.note}"</p>
                </div>
              )}

              {/* Gram Sabha Action Controls */}
              {isSecretary && req.status === 'pending' && (
                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-end gap-2">
                  <button
                    onClick={() => onUpdateStatus(req.id, 'rejected')}
                    className="px-4 py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-bold transition"
                  >
                    Decline Barter
                  </button>

                  <button
                    onClick={() => setActiveCounterId(activeCounterId === req.id ? null : req.id)}
                    className="px-4 py-2 border border-amber-400 text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg text-xs font-bold transition"
                  >
                    Propose Counter-Offer
                  </button>

                  <button
                    onClick={() => onUpdateStatus(req.id, 'approved')}
                    className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition shadow-xs"
                  >
                    Accept & Confirm Barter
                  </button>
                </div>
              )}

              {/* Active Counter-Offer Input Form */}
              {activeCounterId === req.id && (
                <div className="mt-3 p-4 bg-amber-50/80 rounded-xl border border-amber-300 space-y-3 text-xs">
                  <h4 className="font-bold text-amber-950">Specify Counter-Offer Terms:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-stone-700 font-semibold block mb-1">Adjusted Quantity ({req.unit}):</label>
                      <input
                        type="number"
                        min="1"
                        defaultValue={req.requestedQuantity}
                        onChange={(e) => setCounterQty({ ...counterQty, [req.id]: Number(e.target.value) })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-stone-700 font-semibold block mb-1">Secretary Note to Proposer:</label>
                      <input
                        type="text"
                        placeholder="e.g. Please add 2 more bamboo baskets due to seasonal demand..."
                        onChange={(e) => setCounterNote({ ...counterNote, [req.id]: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveCounterId(null)}
                      className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 rounded text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        onUpdateStatus(req.id, 'countered', {
                          quantity: counterQty[req.id] || req.requestedQuantity,
                          pricePerUnit: 0,
                          note: counterNote[req.id] || 'Counter proposal submitted by Gram Sabha secretary',
                        });
                        setActiveCounterId(null);
                      }}
                      className="px-4 py-1.5 bg-amber-700 text-white rounded font-bold text-xs hover:bg-amber-800"
                    >
                      Send Counter-Offer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
