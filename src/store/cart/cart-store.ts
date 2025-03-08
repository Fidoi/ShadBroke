import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  updateColor: (product: CartProduct, color: string) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        const productInCart = cart.some(
          (item) =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        const updatedCartProducts = cart.map((item) => {
          if (
            item.id == product.id &&
            item.size === product.size &&
            item.color === product.color
          ) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
      updateColor: (product: CartProduct, newColor: string) => {
        const { cart } = get();

        const productIndex = cart.findIndex(
          (item) =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );

        if (productIndex === -1) return;

        const productToUpdate = cart[productIndex];
        const newCart = [...cart];

        const existingProductIndex = newCart.findIndex(
          (item) =>
            item.id === productToUpdate.id &&
            item.size === productToUpdate.size &&
            item.color === newColor
        );

        if (existingProductIndex !== -1) {
          const existingProduct = newCart[existingProductIndex];
          newCart[existingProductIndex] = {
            ...existingProduct,
            quantity: existingProduct.quantity + productToUpdate.quantity,
          };
          newCart.splice(productIndex, 1);
        } else {
          newCart[productIndex] = {
            ...productToUpdate,
            color: newColor,
          };
        }

        set({ cart: newCart });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );
        set({ cart: updatedCartProducts });
      },
      clearCart: () => {
        set({ cart: [] });
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },
    }),
    { name: 'shopping-cart' }
  )
);
