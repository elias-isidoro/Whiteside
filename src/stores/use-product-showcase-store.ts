/* eslint-disable no-unused-vars */

import { create } from 'zustand'

interface ProductShowcaseStates {
  refetcher: (()=> void) | null,
  setRefetcher: (fn:()=>void)=>void,
  resetStates: ()=>void
}

export const useProductShowcaseStore = create<ProductShowcaseStates>()((set) => ({
  refetcher: null,
  setRefetcher: (fn:()=>void) =>
    set((current) => ({
      ...current,
      refetcher: fn,
    })),
  resetStates: () => 
    set((current) => ({ ...current, pathHistory: [], refetcher:null })),
}));
