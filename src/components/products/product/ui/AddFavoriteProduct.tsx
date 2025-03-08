'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toggleFavoritesProducts } from '@/actions';

interface FavoriteButtonProps {
  productId: string;
  initialFavorited: boolean;
}

export function FavoriteButton({
  productId,
  initialFavorited,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);

  const handleFavoriteToggle = async () => {
    try {
      const result = await toggleFavoritesProducts(productId);
      setIsFavorited(result.favorited);
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
    }
  };

  return (
    <Heart
      onClick={handleFavoriteToggle}
      className={`cursor-pointer transition-colors ${
        isFavorited ? 'text-red-500 fill-red-400' : 'text-gray-500'
      }`}
      size={35}
    />
  );
}
