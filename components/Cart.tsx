
import React, { useState } from 'react';
import { Icons } from '../constants';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, size: string) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert("This is a demo. In a live environment, you would be redirected to our secure payment processor.");
      setIsCheckingOut(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-zinc-950 shadow-2xl border-l border-zinc-900">
          <div className="h-full flex flex-col">
            <div className="px-8 py-10 border-b border-zinc-900 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-heading font-black text-white uppercase tracking-tight">Your Bag</h2>
                <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-1">CURATED SELECTION ({items.length})</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-900 rounded-full transition-colors text-zinc-400 hover:text-white">
                <Icons.X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-6 text-center">
                  <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center">
                    <Icons.ShoppingBag />
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-white uppercase tracking-widest text-xs">The bag is empty</p>
                    <p className="text-xs max-w-[200px] leading-relaxed">Discover our latest drops in Classic and Streetwear.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="text-purple-500 text-xs font-black tracking-widest uppercase border-b border-purple-500 pb-1 hover:text-white hover:border-white transition-all"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 group animate-fade-in">
                    <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-black text-white uppercase tracking-wider leading-tight">{item.name}</h3>
                        <p className="text-xs font-heading font-light text-zinc-300">{formatPrice(item.price)}</p>
                      </div>
                      <div className="mt-2 flex gap-2">
                         <span className="text-[9px] font-black text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded uppercase tracking-widest">SIZE {item.selectedSize}</span>
                         <span className="text-[9px] font-black text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded uppercase tracking-widest">QTY {item.quantity}</span>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <button 
                          onClick={() => onRemove(item.id, item.selectedSize)}
                          className="text-zinc-700 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="px-8 py-10 bg-zinc-900/50 border-t border-zinc-900 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-black text-zinc-500 uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-white">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-white uppercase tracking-tight">
                    <span>Subtotal</span>
                    <span className="font-heading font-light">{formatPrice(total)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 text-white font-black text-xs tracking-[0.2em] py-5 rounded-2xl transition-all shadow-2xl shadow-purple-900/20 uppercase active:scale-95"
                >
                  {isCheckingOut ? 'PROCESSING...' : 'PROCEED TO CHECKOUT'}
                </button>
                
                <div className="flex items-center justify-center gap-4 grayscale opacity-30">
                  <div className="text-[8px] font-black">VISA</div>
                  <div className="text-[8px] font-black">AMEX</div>
                  <div className="text-[8px] font-black">PAYPAL</div>
                  <div className="text-[8px] font-black">UPI</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
