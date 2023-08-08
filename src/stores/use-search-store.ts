/* eslint-disable no-unused-vars */

import { Product } from '@prisma/client';
import { create } from 'zustand'

interface SearchStates {
  searchInput: string
  products: Product[]
  setProducts: (products:Product[])=>void,
  setSearchInput: (input: string)=> void,
  resetAllStates: ()=>void,
}

export const useSearchStore = create<SearchStates>()((set) => ({
  searchInput: '',
  products: [],

  setSearchInput: (input) => set({ searchInput: input }),
  
  setProducts: (products) => set((current) => ({ ...current, products })),

  resetAllStates: () =>  set((current) => ({ ...current, searchInput: '', products: [] })),
 }));
