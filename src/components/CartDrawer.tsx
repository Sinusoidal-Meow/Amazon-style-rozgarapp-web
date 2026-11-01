import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CartItem, Language, Order } from '../types';
import { formatINR, getLocalizedText, resolveAssetUrl } from '../utils/helpers';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currentLang: Language;
  onOrderPlaced: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  currentLang,
  onOrderPlaced,
}) => {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryType === 'delivery' ? (subtotal > 1500 ? 0 : 90) : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const firstItem = cart[0];
    const newOrder: Order = {
      id: `ord-nashik-${Date.now().toString().slice(-5)}`,
      requestId: `req-${Date.now().toString().slice(-4)}`,
      listingId: firstItem.product.id,
      resourceTitle: `${firstItem.product.title.en}${cart.length > 1 ? ` + ${cart.length - 1} other items` : ''}`,
      buyerName: 'Demo Buyer (Self)',
      sellerName: firstItem.product.seller.name,
      sellerGramSabhaId: firstItem.product.seller.gramSabhaId || 'gs-nashik',
      quantity: firstItem.quantity,
      unit: firstItem.product.unit,
      totalAmount: grandTotal,
      isBarter: false,
      deliveryType: deliveryType,
      status: 'approved',
      deliveryFee: deliveryFee,
      createdAt: new Date().toISOString(),
      handoverConfirmed: false,
      receivedConfirmed: false,
    };

    onOrderPlaced(newOrder);
    setOrderSuccess(newOrder);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-2xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[#F7F2E8] dark:bg-[#2E3E2B] text-[#3F4A36] dark:text-[#E9EFDC] border-l border-[#E2D6BE] dark:border-[#3C4E38] h-full shadow-2xl flex flex-col justify-between transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-[#EAE2D2] dark:bg-[#1C2619] text-[#2F4A2A] dark:text-[#F4F7EA] flex items-center justify-between border-b border-[#E2D6BE] dark:border-[#3C4E38]">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#4E7A3A] dark:text-[#8DB85A]" />
            <h2 className="font-extrabold text-base">Your Forest Basket ({cart.reduce((a, b) => a + b.quantity, 0)} items)</h2>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close cart drawer"
            className="text-[#7B6A55] hover:text-[#2F4A2A] dark:text-[#A9B49A] dark:hover:text-white p-1 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderSuccess ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-[#DDE8C6] text-[#4E7A3A] dark:bg-[#3A5233] dark:text-[#8DB85A] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA]">Order Placed Successfully!</h3>
            <p className="text-xs text-[#7B6A55] dark:text-[#A9B49A] leading-relaxed">
              Order ID <span className="font-mono font-bold text-[#4E7A3A] dark:text-[#8DB85A]">{orderSuccess.id}</span> has been dispatched to Gram Sabha CFR fulfillment coordinator.
            </p>
            <div className="bg-white dark:bg-[#1C2619] border border-[#E2D6BE] dark:border-[#3C4E38] rounded-xl p-3 text-xs text-[#3F4A36] dark:text-[#E9EFDC] space-y-1 text-left">
              <div><strong>Fulfillment Mode:</strong> {deliveryType === 'delivery' ? 'Forest Dispatch Delivery' : 'Village Gram Sabha Pickup'}</div>
              <div><strong>Amount Payable:</strong> <span className="text-[#A4551A] dark:text-[#F0A15A] font-bold">{formatINR(orderSuccess.totalAmount)}</span></div>
              <div><strong>Status:</strong> <span className="text-[#4E7A3A] dark:text-[#8DB85A] font-bold uppercase">Approved / Dispatch Queued</span></div>
            </div>
            <button
              onClick={() => {
                setOrderSuccess(null);
                onClose();
              }}
              className="w-full py-2.5 bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
            >
              Back to Catalogue
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="p-8 text-center space-y-3 my-auto">
            <div className="w-16 h-16 bg-[#DDE8C6] dark:bg-[#3A5233] text-[#4E7A3A] dark:text-[#8DB85A] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-[#2F4A2A] dark:text-[#F4F7EA] text-base">Your basket is empty</h3>
            <p className="text-xs text-[#7B6A55] dark:text-[#A9B49A] max-w-xs mx-auto">
              Explore 52 verified minor forest produce items harvested sustainably across Nashik tribal areas.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2 bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Browse Forest Resources
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="p-4 overflow-y-auto flex-1 space-y-3 divide-y divide-[#E2D6BE] dark:divide-[#3C4E38]">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3 items-start">
                  <div className="w-16 h-16 bg-[#DDE8C6] dark:bg-[#1C2619] rounded-xl p-1 border border-[#E2D6BE] dark:border-[#3C4E38] shrink-0 flex items-center justify-center">
                    <img
                      src={resolveAssetUrl(item.product.assets.illustration)}
                      alt=""
                      className="max-h-14 max-w-14 object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-[#2F4A2A] dark:text-[#F4F7EA] truncate">
                      {getLocalizedText(item.product.title, currentLang)}
                    </h4>
                    <p className="text-[11px] text-[#7B6A55] dark:text-[#A9B49A]">
                      {item.product.seller.village} · <span className="text-[#A4551A] dark:text-[#F0A15A] font-semibold">{formatINR(item.product.price)}/{item.product.unit}</span>
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Qty changer */}
                      <div className="flex items-center border border-[#E2D6BE] dark:border-[#3C4E38] rounded-md overflow-hidden bg-white dark:bg-[#1C2619] text-xs">
                        <button
                          onClick={() => onUpdateQty(item.product.id, -1)}
                          className="px-2 py-0.5 hover:bg-[#F2EBDC] dark:hover:bg-[#2E3E2B] text-[#3F4A36] dark:text-[#E9EFDC] font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold text-[#2F4A2A] dark:text-[#F4F7EA]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, 1)}
                          className="px-2 py-0.5 hover:bg-[#F2EBDC] dark:hover:bg-[#2E3E2B] text-[#3F4A36] dark:text-[#E9EFDC] font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-xs text-[#A4551A] dark:text-[#F0A15A] tabular-nums">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#7B6A55] hover:text-rose-600 dark:text-[#A9B49A] dark:hover:text-rose-400 transition cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Method & Summary */}
            <div className="p-4 bg-[#EAE2D2] dark:bg-[#1C2619] border-t border-[#E2D6BE] dark:border-[#3C4E38] space-y-3">
              {/* Delivery method selector */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#7B6A55] dark:text-[#A9B49A] uppercase tracking-wider block">
                  Fulfillment Option
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      deliveryType === 'delivery'
                        ? 'border-[#4E7A3A] bg-[#DDE8C6] text-[#2F4A2A] dark:border-[#8DB85A] dark:bg-[#3A5233] dark:text-[#DDE8C6] font-bold'
                        : 'border-[#E2D6BE] bg-white text-[#3F4A36] hover:bg-[#F2EBDC] dark:border-[#3C4E38] dark:bg-[#2E3E2B] dark:text-[#E9EFDC] dark:hover:bg-[#344831]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Truck className="w-3.5 h-3.5 text-[#4E7A3A] dark:text-[#8DB85A]" />
                      <span>Rural Dispatch</span>
                    </div>
                    <span className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A] block">
                      {subtotal > 1500 ? 'FREE above ₹1,500' : '₹90 delivery fee'}
                    </span>
                  </button>

                  <button
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      deliveryType === 'pickup'
                        ? 'border-[#4E7A3A] bg-[#DDE8C6] text-[#2F4A2A] dark:border-[#8DB85A] dark:bg-[#3A5233] dark:text-[#DDE8C6] font-bold'
                        : 'border-[#E2D6BE] bg-white text-[#3F4A36] hover:bg-[#F2EBDC] dark:border-[#3C4E38] dark:bg-[#2E3E2B] dark:text-[#E9EFDC] dark:hover:bg-[#344831]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#4E7A3A] dark:text-[#8DB85A]" />
                      <span>Village Pickup</span>
                    </div>
                    <span className="text-[10px] text-[#4E7A3A] dark:text-[#8DB85A] font-bold block">
                      FREE at Gram Sabha
                    </span>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1 text-xs pt-2 border-t border-[#E2D6BE] dark:border-[#3C4E38]">
                <div className="flex justify-between text-[#7B6A55] dark:text-[#A9B49A]">
                  <span>Produce Subtotal:</span>
                  <span className="font-semibold text-[#2F4A2A] dark:text-[#F4F7EA] font-mono tabular-nums">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#7B6A55] dark:text-[#A9B49A]">
                  <span>Fulfillment:</span>
                  <span className="font-semibold text-[#2F4A2A] dark:text-[#F4F7EA] font-mono tabular-nums">
                    {deliveryFee === 0 ? <span className="text-[#4E7A3A] dark:text-[#8DB85A] font-bold">FREE</span> : formatINR(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#4E7A3A] dark:text-[#8DB85A] font-medium">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#A4551A] dark:text-[#F0A15A]" /> 100% Direct Tribal Benefit:
                  </span>
                  <span className="font-mono tabular-nums">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] pt-2 border-t border-[#E2D6BE] dark:border-[#3C4E38]">
                  <span>Total Amount:</span>
                  {/* Prices use Orange tokens #A4551A in Light, #F0A15A in Dark */}
                  <span className="text-base text-[#A4551A] dark:text-[#F0A15A] font-mono tabular-nums">{formatINR(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button: Light uses #4E7A3A with white text, Dark uses #8DB85A with #1C2619 text */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] font-extrabold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                <span>Proceed to Buy ({formatINR(grandTotal)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
