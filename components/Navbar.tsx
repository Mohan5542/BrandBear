
import React, { useState } from 'react';
import { Icons } from '../constants';
import { Category } from '../types';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  onCategorySelect: (category: Category) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartCount, onCategorySelect }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (category: Category) => {
    onCategorySelect(category);
    setIsMobileMenuOpen(false);
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="text-3xl font-heading font-black tracking-tighter text-white group-hover:text-purple-500 transition-colors">
              BRAND<span className="text-purple-500 group-hover:text-white">BEAR</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-bold tracking-widest">
            <button onClick={() => handleNavClick('All')} className="text-white hover:text-purple-400 transition-colors">NEW ARRIVALS</button>
            <button onClick={() => handleNavClick('Classic')} className="text-white hover:text-purple-400 transition-colors">CLASSIC</button>
            <button onClick={() => handleNavClick('Streetwear')} className="text-white hover:text-purple-400 transition-colors">STREETWEAR</button>
            <button onClick={() => document.getElementById('ethos')?.scrollIntoView({ behavior: 'smooth' })} className="text-white hover:text-purple-400 transition-colors">ABOUT</button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Icons.Search />
            </button>
            <button 
              onClick={onCartClick}
              className="relative p-2 text-zinc-400 hover:text-purple-400 transition-colors"
            >
              <Icons.ShoppingBag />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-zinc-400 hover:text-white transition-colors"
            >
              <Icons.Menu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col p-8">
          <div className="flex justify-between items-center mb-12">
            <div className="text-2xl font-heading font-black text-white">BRAND<span className="text-purple-500">BEAR</span></div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
              <Icons.X />
            </button>
          </div>
          <div className="flex flex-col space-y-8 text-3xl font-heading font-bold">
            <button onClick={() => handleNavClick('All')} className="text-left hover:text-purple-500 transition-colors">NEW ARRIVALS</button>
            <button onClick={() => handleNavClick('Classic')} className="text-left hover:text-purple-500 transition-colors">CLASSIC</button>
            <button onClick={() => handleNavClick('Streetwear')} className="text-left hover:text-purple-500 transition-colors">STREETWEAR</button>
            <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('ethos')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-left hover:text-purple-500 transition-colors">ABOUT</button>
          </div>
          <div className="mt-auto border-t border-zinc-800 pt-8">
            <p className="text-zinc-500 text-sm tracking-widest">EST. 2024</p>
          </div>
        </div>
      )}
    </nav>
  );
};
