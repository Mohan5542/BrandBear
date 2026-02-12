
import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { StylistAssistant } from './components/StylistAssistant';
import { Cart } from './components/Cart';
import { PRODUCTS, Icons } from './constants';
import { Product, CartItem, Category } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sizeError, setSizeError] = useState(false);

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const addToCart = (product: Product) => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === selectedSize);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === selectedSize) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize }];
    });
    
    setIsCartOpen(true);
    setSelectedProduct(null);
    setSelectedSize('');
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const handleCategorySelect = (category: Category) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cart.length} 
        onCategorySelect={handleCategorySelect}
      />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-heading font-black tracking-tighter leading-none">
            DEFINING <span className="text-purple-600 italic">ELITE</span> <br />
            STREETWEAR.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
            BrandBear merging timeless classic tailoring with the raw energy of modern street culture.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 active:scale-95"
            >
              SHOP COLLECTION
            </button>
            <button 
              onClick={() => document.getElementById('ethos')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-white/20 px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all active:scale-95"
            >
              OUR STORY
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 text-xs tracking-widest text-zinc-500 hidden md:flex items-center gap-4">
          <span className="w-12 h-[1px] bg-zinc-700" />
          EST. MMXXIV
        </div>
      </section>

      {/* Collection Controls */}
      <section id="collection" className="py-24 max-w-7xl mx-auto px-4 w-full scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-heading font-black uppercase tracking-tighter">The Collection</h2>
            <div className="flex flex-wrap gap-4">
              {(['All', 'Classic', 'Streetwear'] as Category[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-full text-xs font-black tracking-widest transition-all ${
                    activeCategory === cat 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-zinc-500 text-sm tracking-widest uppercase">Curated Drop / Season 01</p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="group relative flex flex-col bg-zinc-900/40 rounded-3xl overflow-hidden border border-zinc-800/50 hover:border-purple-500/50 transition-all duration-700 animate-fade-in"
            >
              <div 
                className="aspect-[3/4] overflow-hidden cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-light text-zinc-400 font-heading">{formatPrice(product.price)}</span>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="flex items-center gap-2 text-xs font-bold tracking-widest text-purple-500 hover:text-white transition-colors"
                  >
                    DETAILS <Icons.ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Ethos */}
      <section id="ethos" className="py-40 bg-zinc-950 border-y border-zinc-900 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
          <div className="inline-block p-4 bg-purple-600/10 rounded-full animate-pulse">
            <Icons.Sparkles />
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black leading-none tracking-tighter uppercase">
            Designed for those who lead, <br /> crafted for those who demand <span className="text-purple-500">excellence</span>.
          </h2>
          <p className="text-zinc-500 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            BrandBear is the physical manifestation of duality. High-precision luxury tailoring meets the raw, unfiltered aesthetic of the street.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left">
          <div className="space-y-8">
            <div className="text-4xl font-heading font-black tracking-tighter text-white">
              BRAND<span className="text-purple-500">BEAR</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              The international destination for premium classic refinement and avant-garde streetwear.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Shop</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><button onClick={() => handleCategorySelect('Classic')} className="hover:text-purple-400 transition-colors">Classic</button></li>
              <li><button onClick={() => handleCategorySelect('Streetwear')} className="hover:text-purple-400 transition-colors">Streetwear</button></li>
              <li><button className="hover:text-purple-400 transition-colors">New Drops</button></li>
              <li><button className="hover:text-purple-400 transition-colors">Accessories</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Service</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><button className="hover:text-purple-400 transition-colors">Shipping</button></li>
              <li><button className="hover:text-purple-400 transition-colors">Returns</button></li>
              <li><button className="hover:text-purple-400 transition-colors">Tracking</button></li>
              <li><button className="hover:text-purple-400 transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-zinc-500 text-xs mb-6">Join the Bear Club for early access to limited collections.</p>
            <form className="flex gap-0 border-b border-zinc-800 pb-2 group focus-within:border-purple-500 transition-colors">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="bg-transparent text-white text-xs w-full focus:outline-none py-2"
                required
              />
              <button type="submit" className="text-white hover:text-purple-500 px-2 transition-colors">
                <Icons.ArrowRight />
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-24 pt-8 border-t border-zinc-900 text-center text-zinc-700 text-[10px] tracking-widest uppercase">
          &copy; 2024 BRANDBEAR. GLOBAL APPAREL LOGISTICS.
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-zinc-900 border border-purple-500/10 w-full max-w-5xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(124,58,237,0.15)] max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-6 right-6 z-10 p-3 bg-black/40 rounded-full text-white hover:bg-purple-600 transition-all hover:scale-110"
            >
              <Icons.X />
            </button>
            
            <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-10 md:p-16 flex-1 flex flex-col justify-center">
              <div className="mb-10">
                <span className="text-purple-500 font-black tracking-[0.2em] text-[10px] uppercase mb-4 block">
                  BRANDBEAR / {selectedProduct.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 uppercase tracking-tight">
                  {selectedProduct.name}
                </h2>
                <p className="text-3xl font-light text-zinc-300 mb-8 font-heading">{formatPrice(selectedProduct.price)}</p>
                <p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-md font-light">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white text-[10px] font-black uppercase tracking-widest">Select Size</h4>
                  {sizeError && <span className="text-red-500 text-[10px] font-bold animate-pulse">SIZE REQUIRED</span>}
                </div>
                <div className="flex flex-wrap gap-4">
                  {selectedProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      className={`w-14 h-14 rounded-2xl text-xs font-black transition-all border ${
                        selectedSize === size 
                          ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/40' 
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full bg-white text-black py-5 rounded-2xl font-black text-xs tracking-widest hover:bg-purple-600 hover:text-white transition-all transform active:scale-95 uppercase shadow-xl"
                >
                  ADD TO BAG
                </button>
                <div className="flex items-center justify-center gap-3 text-zinc-600 text-[9px] font-black tracking-[0.3em] uppercase">
                  <Icons.Sparkles /> SECURE WORLDWIDE SHIPPING
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlays */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
      />
      
      <StylistAssistant />
    </div>
  );
};

export default App;
