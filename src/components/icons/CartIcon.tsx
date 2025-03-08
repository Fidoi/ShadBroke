'use client';
import { useCartStore } from '@/store';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

const CartIcon = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className='relative'>
      <ShoppingCart className='w-8 h-8' />
      {loaded && totalItemsInCart > 0 && (
        <div className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
          {totalItemsInCart}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
