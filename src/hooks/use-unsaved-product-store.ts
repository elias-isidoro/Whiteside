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
  resetUnsavedStates: ()=>void

  // eslint-disable-next-line no-unused-vars
  addUnsavedVariant: (variant: Variant) => void
  // eslint-disable-next-line no-unused-vars
  setProductName: (input: string)=>void
  // eslint-disable-next-line no-unused-vars
  setProductDescription: (input: string)=>void

}

export const useUnsavedProductStore = create<UnsavedProductStates>()((set) => ({
  productName: '',
  productDescription: '',
  unsavedVariants: [],
  setProductName: (input: string) => set((current)=>({...current, productName: input})),
  setProductDescription: (input: string) => set((current)=>({...current, productDescription: input})),
  resetUnsavedStates: () => set((current)=>({ ...current, productName: '', productDescription: '', unsavedVariants: [] })),
  addUnsavedVariant: (variant: Variant) => set((current) => ({...current, unsavedVariants: [...current.unsavedVariants, variant] })),
}));
