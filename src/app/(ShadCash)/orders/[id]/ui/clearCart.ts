'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store';

export const HandleClearCart = () => {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
};
