/* eslint-disable no-unused-vars */

import { create } from 'zustand'

interface CategorizerStates {
  selectedProducts: string[]
  addSelectedProducts: (input:string)=>void,
  removeSelectedProduct: (input:string)=>void,
  resetAllStates: ()=>void,
}

export const useCategorizerStore = create<CategorizerStates>()((set) => ({
  selectedProducts: [],

  addSelectedProducts: (product: string) =>
    set((current) => ({
      ...current,
      selectedProducts: [...current.selectedProducts, product],
    })),

  removeSelectedProduct: (product: string) =>
    set((current) => ({
      ...current,
      selectedProducts: current.selectedProducts.filter(
        (p) => p !== product
      ),
    })),

  resetAllStates: () => 
    set((current) => ({ ...current, selectedProducts: [] })),
 }));
