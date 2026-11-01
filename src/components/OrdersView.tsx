import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Order, Language } from '../types';
import { formatINR } from '../utils/helpers';

interface OrdersViewProps {
  orders: Order[];
  onConfirmReceipt: (orderId: string) => void;
  currentLang: Language;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onConfirmReceipt,
  currentLang,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((o) => o.status === filter || (filter === 'pickup' && o.deliveryType === 'pickup'));

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Delivered & Verified
          </span>
        );
      case 'in_transit':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300 animate-pulse">
            <Truck className="w-3.5 h-3.5 text-blue-700" /> Rural Transport In Transit
          </span>
        );
      case 'delivery_assigned':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-700" /> Driver Assigned
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-300">
            <Clock className="w-3.5 h-3.5 text-stone-500" /> Gram Sabha Approved
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-700/80 text-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
            <Truck className="w-3.5 h-3.5 text-amber-300" /> Nashik CFR Rural Dispatch & Tracking
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Orders & Delivery Logistics
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl">
            Track dispatches from tribal Gram Sabhas, driver pickups, and final delivery confirmations across Maharashtra.
          </p>
        </div>

        <div className="bg-stone-800/80 px-4 py-3 rounded-xl border border-stone-700 text-xs text-stone-300">
          <div className="font-bold text-white text-sm">Total Orders Recorded: {orders.length}</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Direct CFR Producer Remittance</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'in_transit', 'delivery_assigned', 'delivered'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition capitalize cursor-pointer ${
              filter === f
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 text-stone-500">
            <Package className="w-10 h-10 mx-auto text-stone-300 mb-2" />
            <p className="font-bold">No orders found in this category.</p>
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition space-y-4"
            >
              {/* Order Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
                    <Package className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                        {ord.id}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-stone-900 mt-0.5">
                      {ord.resourceTitle} ({ord.quantity} {ord.unit})
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(ord.status)}
                </div>
              </div>

              {/* Order Details Body */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-stone-50 p-4 rounded-xl text-xs border border-stone-100">
                <div>
                  <span className="text-stone-500 block text-[11px]">Producer / Gram Sabha</span>
                  <strong className="text-stone-900 block mt-0.5">{ord.sellerName}</strong>
                </div>

                <div>
                  <span className="text-stone-500 block text-[11px]">Buyer / Consignee</span>
                  <strong className="text-stone-900 block mt-0.5">{ord.buyerName}</strong>
                </div>

                <div>
                  <span className="text-stone-500 block text-[11px]">Fulfillment Type</span>
                  <strong className="text-stone-900 block mt-0.5 capitalize">
                    {ord.deliveryType === 'delivery' ? 'Forest Dispatch Delivery' : 'Village Pickup'}
                  </strong>
                </div>

                <div>
                  <span className="text-stone-500 block text-[11px]">Total Remittance</span>
                  <strong className="text-emerald-800 text-sm font-extrabold block mt-0.5">
                    {formatINR(ord.totalAmount)}
                  </strong>
                </div>
              </div>

              {/* Driver / Logistics section */}
              {ord.deliveryPartnerName && (
                <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="font-bold text-emerald-950">Assigned Driver: </span>
                      <span className="text-emerald-900 font-medium">{ord.deliveryPartnerName}</span>
                    </div>
                  </div>

                  {ord.deliveryPartnerPhone && (
                    <div className="flex items-center gap-1.5 text-stone-700 font-mono text-[11px]">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{ord.deliveryPartnerPhone}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-stone-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Gram Sabha CFR Handover Protection</span>
                </div>

                {ord.status !== 'delivered' && (
                  <button
                    onClick={() => onConfirmReceipt(ord.id)}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Confirm Handover Receipt</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
