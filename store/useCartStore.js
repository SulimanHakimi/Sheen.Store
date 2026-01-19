import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            cartItems: [],
            wishlistItems: [],

            addToCart: (product, qty = 1) => {
                const items = get().cartItems;
                const existItem = items.find((x) => x._id === product._id);

                if (existItem) {
                    set({
                        cartItems: items.map((x) =>
                            x._id === existItem._id ? { ...existItem, qty: existItem.qty + qty } : x
                        ),
                    });
                } else {
                    set({ cartItems: [...items, { ...product, qty }] });
                }
            },

            removeFromCart: (id) => {
                set({ cartItems: get().cartItems.filter((x) => x._id !== id) });
            },

            addToWishlist: (product) => {
                const items = get().wishlistItems;
                const existItem = items.find((x) => x._id === product._id);
                if (!existItem) {
                    set({ wishlistItems: [...items, product] });
                }
            },

            removeFromWishlist: (id) => {
                set({ wishlistItems: get().wishlistItems.filter((x) => x._id !== id) });
            },

            clearCart: () => set({ cartItems: [] }),

            lastOrder: null,
            setLastOrder: (order) => set({ lastOrder: order }),

            updateQty: (id, qty) => {
                set({
                    cartItems: get().cartItems.map((x) =>
                        x._id === id ? { ...x, qty: Number(qty) } : x
                    )
                })
            },

            // Helpers
            itemsPrice: () => get().cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
            itemsCount: () => get().cartItems.reduce((acc, item) => acc + item.qty, 0),
            wishlistCount: () => get().wishlistItems.length,
            isInWishlist: (id) => get().wishlistItems.some((x) => x._id === id),
        }),
        {
            name: 'cart-storage', // unique name
        }
    )
);

export default useCartStore;
