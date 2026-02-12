
export type Category = 'Classic' | 'Streetwear' | 'All';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
