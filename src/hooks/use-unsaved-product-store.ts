/* eslint-disable no-unused-vars */

import { create } from 'zustand'

export type UnsavedProduct = {
  productName: string;
  productDescription: string;
  productCategoryId: string | null;
  productVariants: Variant[];
}

export type Variant = {
  tags: string,
  price: number,
  image: File | string,
  id: string
}

interface UnsavedProductStates {
  productName: string
  productCategoryId: string | null
  productDescription: string
  productVariants: Variant[]
  
  resetStates: ()=>void
  deleteProductVariant: (id: string) => void
  addProductVariant: (variant: Variant) => void
  
  setProductName: (input: { isFirstValue?: boolean, value: string })=>void
  setProductDescription: (input: { isFirstValue?: boolean, value: string })=>void
  setProductVariants: (input: { isFirstValue?: boolean, value: Variant[] })=>void
  setProductCategoryId: (input: { isFirstValue?: boolean, value: string | null })=>void

  updateProductVariant: (id: string, newData:{ tags: string, price: number, image: File | string }) => void
}

export const useUnsavedProductStore = create<UnsavedProductStates>()((set) => ({
  productName: '',
  productCategoryId: '',
  productDescription: '',
  productVariants: [],
  setProductName: ({value, isFirstValue=false}) => {
    set(({productName, ...rest}) => {
      if(isFirstValue && productName !== '')
        return { ...rest, productName: productName }
      return { ...rest, productName: value }
    });
  },

  setProductCategoryId: ({value, isFirstValue=false}) => {
    set(({productCategoryId, ...rest}) => {
      if(isFirstValue && productCategoryId !== '')
        return { ...rest, productCategoryId: productCategoryId }
      return { ...rest, productCategoryId: value }
    });
  },

  setProductDescription: ({value, isFirstValue=false}) => {
    set(({productDescription, ...rest}) => {
      if(isFirstValue && productDescription !== '')
        return { ...rest, productDescription: productDescription }
      return { ...rest, productDescription: value }
    });
  },

  setProductVariants: ({value, isFirstValue=false}) => {
    set(({productVariants, ...rest}) => {
      if(isFirstValue && productVariants.length !== 0)
        return { ...rest, productVariants: productVariants }
      return { ...rest, productVariants: value }
    });
  },

  addProductVariant: (variant) => set((current) => ({...current, productVariants: [...current.productVariants, variant] })),
  updateProductVariant: (id, newData) => set((current) => {
    const updatedVariants = current.productVariants.map((variant) => {
      if (variant.id === id) {
        return { ...variant, ...newData };
      }
      return variant;
    });
    return { ...current, productVariants: updatedVariants };
  }),

  deleteProductVariant: (id: string) => set((current) => {
    const updatedVariants = current.productVariants.filter((variant) => variant.id !== id);
    return { ...current, productVariants: updatedVariants };
  }),
  resetStates: () => set((current)=>({ ...current, productName: '', productDescription: '', productVariants: [], productCategoryId: '' })),
}));
