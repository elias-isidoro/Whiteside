/* eslint-disable no-unused-vars */

import isLoggedIn from '@/lib/authorization/isLoggedIn';
import { Variant } from '@prisma/client';
import { create } from 'zustand'


export type CartItem = {
  id: string,
  name: string,
  productId: string,
  categoryId: string | null,
  variant: Variant,
  quantity: number,
  description: string
}

interface CartStates {
  items: CartItem[],

  clearCart: () => void,
  addItem: (item: CartItem) => void,
  deleteItem: (id: string) => void,
  toggleItem: (item: CartItem) => '+' | '-',

  isInCart: (id: string) => boolean,
  updateQuantity: (id: string, input:number) => void,
}

export const useCartStore = create<CartStates>((set,get) => ({
  items: [],

  clearCart: () => {
    set({ items: [] });
  },

  addItem: async (item) => {
    set((state) => ({ items: [...state.items, item] }));
  },

  deleteItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  toggleItem: (cartItem) => {
    let isInCart = get().items.find((item)=>item.id === cartItem.id) ? true : false
    if(!isInCart){
      set((state) => ({ items: [...state.items, cartItem] }));
      return '+'
    }else{
      set((state) => ({
        items: state.items.filter((item) => item.id !== cartItem.id),
      }));
      return '-'
    }
  },

  isInCart: (id) => {
    let result = get().items.find((item)=>item.id === id) ? true : false
    return result
  },

  updateQuantity: (id: string, input: number) => {
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: input };
        }
        return item;
      });
      return { items: updatedItems };
    });
  },
  
}));