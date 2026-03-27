'use client';
import supabase from '@/config/api';
import { CartContextType, ProductCardProps } from '@/interfaces';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve current user
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) console.error(error);
      else setUser(user);
    };
    fetchUser();
  }, []);

  // Fetch basket items from the cart_items table
  const fetchCart = async (userId: string) => {
    setIsLoading(true);
    try {
      // First, we retrieve the user's cart
      /**
      - .single() rejects if no row exists → gives {} as error.
      - Replaced .single() with .maybeSingle() when fetching user's cart
      - Prevents console errors if the user has no cart yet
      - Ensures cartItems defaults to an empty array for new users
     */
      const { data: cartsData, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (cartError) console.error('Fetch cart error:', cartError);
      if (!cartsData) return setCartItems([]);

      const cartId = cartsData?.id;

      // Then we bring all the items related to the cart
      const { data, error } = await supabase
        .from('cart_items')
        .select('quantity, size, products(id, title, price, image)')
        .eq('cart_id', cartId);

      if (error) {
        console.error('Fetch cart items error:', error);
      } else {
        const formatted = data?.map((item: any) => ({
          id: item.products.id,
          title: item.products.title,
          price: item.products.price,
          image: item.products.image,
          quantity: item.quantity,
          size: item.size,
        }));

        setCartItems(formatted || []);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCart(user.id);
  }, [user]);

  // ---------------------------------------------------------------------------

  // Add To Cart
  const addToCart = async (item: ProductCardProps, userId: string) => {
    setIsLoading(true);
    try {
      const quantityToAdd = item.quantity ?? 1;

      // First, we check if the user has a cart.
      let { data: cart } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (!cart) {
        // If there is no cart, we create one
        const { data: newCart, error: createError } = await supabase
          .from('carts')
          .insert({ user_id: userId })
          .select('id')
          .single();
        if (createError)
          return console.error('Create cart error:', createError);
        cart = newCart;
      }

      const cartId = cart.id;

      // Update items locally
      setCartItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.id === item.id);
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += quantityToAdd;
          return updated;
        }
        return [...prev, { ...item, quantity: quantityToAdd }];
      });

      // Add/Update in Supabase
      const { error } = await supabase.from('cart_items').upsert(
        [
          {
            cart_id: cartId,
            product_id: item.id,
            quantity: quantityToAdd,
            size: item.size,
          },
        ],
        // onConflict specifies the columns that are considered duplicate rows.
        // If we find a row with the same cart_id and product_id, Supabase will update it instead of adding a new row.
        { onConflict: 'cart_id,product_id,size' },
      );

      if (error) console.error('Supabase addToCart error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------------------------------------------------------

  // Update Quantity
  const updateQuantity = async (productId: number, quantity: number) => {
    if (!user || quantity < 1) return;
    setIsLoading(true);
    try {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );

      const { data: cartData } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();
      if (!cartData) return;

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('cart_id', cartData.id)
        .eq('product_id', productId);

      if (error) console.error('Update quantity error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------------------------------------------------------

  // Remove From Cart
  const removeFromCart = async (productId: number) => {
    if (!user) return;
    setIsLoading(true);
    try {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));

      const { data: cartData } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();
      if (!cartData) return;

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartData.id)
        .eq('product_id', productId);

      if (error) console.error('Remove from cart error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // مسح السلة كلها
  const clearCart = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      setCartItems([]);

      const { data: cartData } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();
      if (!cartData) return;

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartData.id);
      if (error) console.error('Clear cart error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        user,
        isLoading,
        cartItems,
        addToCart,
        updateQuantity,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
};
