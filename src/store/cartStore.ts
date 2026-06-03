import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size?: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id && i.size === item.size);
        if (existingItem) {
          return {
            items: state.items.map((i) => 
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      removeItem: (id, size) => set((state) => ({
        items: state.items.filter((i) => !(i.id === id && i.size === size))
      })),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'engin-apprl-cart',
      // We only persist items, not UI state like isCartOpen
      partialize: (state) => ({ items: state.items }),
    }
  )
);
