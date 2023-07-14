/* eslint-disable no-unused-vars */

import { create } from 'zustand'

export type Variant = {
  tags: string,
  price: number,
  image: File,
  id: string
}

interface UnsavedProductStates {
  productName: string
  productDescription: string
  unsavedVariants: Variant[]
  
  resetStates: ()=>void
  setProductName: (input: string)=>void
  setProductDescription: (input: string)=>void
  addUnsavedVariant: (variant: Variant) => void

}

export const useUnsavedProductStore = create<UnsavedProductStates>()((set) => ({
  productName: '',
  productDescription: '',
  unsavedVariants: [],
  setProductName: (input: string) => set((current)=>({...current, productName: input})),
  setProductDescription: (input: string) => set((current)=>({...current, productDescription: input})),
  resetStates: () => set((current)=>({ ...current, productName: '', productDescription: '', unsavedVariants: [] })),
  addUnsavedVariant: (variant: Variant) => set((current) => ({...current, unsavedVariants: [...current.unsavedVariants, variant] })),
}));
