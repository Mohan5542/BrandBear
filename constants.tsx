
import React from 'react';
import { Product } from './types';

export const BRAND_COLORS = {
  primary: '#7c3aed', // Vibrant Purple
  secondary: '#000000', // Deep Black
  accent: '#ffffff', // Pure White
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Velvet Blazer',
    price: 18999,
    category: 'Classic',
    description: 'A premium tailored blazer in deep midnight black velvet. Perfect for high-end evening events.',
    image: 'https://files.catbox.moe/zf90y5.png',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Cyber-Punk Oversized Hoodie',
    price: 8499,
    category: 'Streetwear',
    description: 'Heavyweight cotton hoodie with neon purple accents and reflective BrandBear branding.',
    image: 'https://picsum.photos/seed/bb2/800/1000',
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: '3',
    name: 'Elysian Tailored Trousers',
    price: 12499,
    category: 'Classic',
    description: 'Sharp, slim-fit trousers crafted from premium wool blend. Timeless elegance.',
    image: 'https://picsum.photos/seed/bb3/800/1000',
    sizes: ['30', '32', '34', '36']
  },
  {
    id: '4',
    name: 'Stealth Cargo Joggers',
    price: 6999,
    category: 'Streetwear',
    description: 'Multi-pocket tactical joggers in matte black with purple drawstring details.',
    image: 'https://picsum.photos/seed/bb4/800/1000',
    sizes: ['S', 'M', 'L']
  },
  {
    id: '5',
    name: 'Aurora Silk Dress Shirt',
    price: 9999,
    category: 'Classic',
    description: '100% pure silk shirt with a subtle pearlescent finish. Effortless luxury.',
    image: 'https://picsum.photos/seed/bb5/800/1000',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '6',
    name: 'Graphite District Tee',
    price: 3999,
    category: 'Streetwear',
    description: 'Premium drop-shoulder tee with high-density BrandBear graphic print.',
    image: 'https://picsum.photos/seed/bb6/800/1000',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

export const Icons = {
  ShoppingBag: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
  )
};
