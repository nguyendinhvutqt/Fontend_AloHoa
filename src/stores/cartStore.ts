import { create } from "zustand";
import { ProductItemData } from "../types/product";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface CartState {
  products: { product: ProductItemData; quantity: number }[];
  addToCart: (product: ProductItemData, quantity: number) => void;
  delItem: (productId: string) => void;
  updateItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        products: [],
        addToCart: (product, quantity) =>
          set((state) => {
            const existingProductIndex = state.products.findIndex(
              (item) => item.product.id === product.id
            );

            if (existingProductIndex !== -1) {
              const updatedProducts = [...state.products];
              updatedProducts[existingProductIndex].quantity += quantity;
              return { products: updatedProducts };
            } else {
              return {
                products: [
                  ...state.products,
                  { product: product, quantity: quantity },
                ],
              };
            }
          }),
        delItem: (productId) =>
          set((state) => {
            const updateCart = state.products.filter((product) => {
              return product.product.id !== productId;
            });
            return { products: updateCart };
          }),
        updateItem: (productId, quantity) =>
          set((state) => {
            const updateCart = state.products.map((item) => {
              if (item.product.id === productId) {
                return { ...item, quantity: quantity };
              }
              return item;
            });
            return { products: updateCart };
          }),
        clearCart: () =>
          set({
            products: [],
          }),
      }),
      {
        name: "cartStore",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useCartStore;
