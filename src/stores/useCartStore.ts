import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { CartItem, Product } from '../types/product.types';

const MAX_ITEM_QUANTITY = parseInt(
  import.meta.env.VITE_MAX_ITEM_QUANTITY || '10'
);
const MAX_CART_ITEMS = parseInt(import.meta.env.VITE_MAX_CART_ITEMS || '100');

interface CartState {
  cart: CartItem[];
  validateQuantity: (quantity: number) => boolean;
  validateCartSize: () => boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  handleAddToCart: (product: Product) => void;
}

// The store is now wrapped with the `persist` middleware
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      validateQuantity: (quantity) => quantity <= MAX_ITEM_QUANTITY,

      validateCartSize: () => get().cart.length < MAX_CART_ITEMS,

      // This internal function handles the logic of adding or incrementing an item.
      _updateCart: (item: CartItem) => {
        const existingItemIndex = get().cart.findIndex(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItemIndex !== -1) {
          // Item exists, so we increment its quantity
          const newQuantity = get().cart[existingItemIndex].quantity + 1;
          if (!get().validateQuantity(newQuantity)) {
            toast.error(`Max quantity of ${MAX_ITEM_QUANTITY} reached.`);
            return;
          }
          set((state) => ({
            cart: state.cart.map((cartItem, index) =>
              index === existingItemIndex
                ? { ...cartItem, quantity: newQuantity }
                : cartItem
            ),
          }));
        } else {
          // Item does not exist, add it to the cart
          if (!get().validateCartSize()) {
            toast.error('Cart is full. Cannot add new items.');
            return;
          }
          set((state) => ({
            cart: [...state.cart, { ...item, quantity: 1 }],
          }));
        }
      },

      addToCart: (item) => {
        // The original updateCart was renamed to _updateCart to avoid confusion
        // and now addToCart directly calls it.
        const { _updateCart } = get() as any; // Temporary type assertion to access internal function
        _updateCart(item);
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((cartItem) => cartItem.id !== id),
        }));
        toast.success('Item removed from cart.');
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        if (!get().validateQuantity(quantity)) {
          toast.error(
            `You can only have up to ${MAX_ITEM_QUANTITY} of this item.`
          );
          return;
        }

        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.id === id ? { ...cartItem, quantity } : cartItem
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
        toast.success('Cart has been cleared.');
      },

      handleAddToCart: (product) => {
        const itemToAdd: Omit<CartItem, 'quantity'> = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image ?? 'https://via.placeholder.com/150',
        };

        // We call the internal update logic which handles all validations
        const { _updateCart } = get() as any; // Temporary type assertion
        _updateCart(itemToAdd as CartItem);

        // Check if the item was actually added or updated before showing success toast
        const itemInCart = get().cart.find((i) => i.id === product.id);
        if (itemInCart) {
          toast.success(`${product.name} added to cart!`);
        }
      },
    }),
    {
      name: 'cart-storage', // This is the key in localStorage
      storage: createJSONStorage(() => localStorage), // We specify localStorage as the storage medium
    }
  )
);

export default useCartStore;
