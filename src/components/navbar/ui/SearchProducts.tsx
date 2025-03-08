'use client';

import { useState, useEffect, useRef } from 'react';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { ProductWithImages } from '@/interfaces';
import { DiscountBadge, Input } from '@/components';
import Image from 'next/image';
import { useDebounce } from '@/hooks/useDebounce';
import { currencyFormat } from '@/utils';

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductWithImages[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchProducts = async () => {
      if (!debouncedQuery) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(`/api/search?query=${debouncedQuery}`);
        const results = await response.json();

        setSearchResults(results);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setIsSearching(false);
      }
    };

    searchProducts();
  }, [debouncedQuery]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);
  return (
    <>
      <div className='flex items-center gap-6 justify-center'>
        <div className='relative flex flex-row items-center gap-2 rounded  p-1'>
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            className=' px-5 py-2.5 outline-0 placeholder:text-xs w-full max-w-xs sm:max-w-md'
            placeholder='Buscar'
          />
          <Search className='cursor-pointer' />

          {showDropdown && (
            <div
              ref={dropdownRef}
              className='absolute top-full left-0 right-0 bg-white shadow-lg z-50 mt-1 rounded-md max-h-80 overflow-y-auto'
            >
              {isSearching ? (
                <div className='p-4 text-center'>Buscando...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className='flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors'
                    onClick={() => {
                      setSearchQuery('');
                      setShowDropdown(false);
                    }}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      width={40}
                      height={40}
                      className='object-cover rounded'
                    />
                    <div className='flex-col'>
                      <span className='text-sm font-medium'>
                        {product.title}
                      </span>
                      {product.discount && product.discount > 0 ? (
                        <>
                          <div className='flex gap-x-3 '>
                            <span className='text-sm line-through text-gray-500 '>
                              {currencyFormat(product.price)}
                            </span>
                            <DiscountBadge
                              discount={product.discount}
                              text='% off'
                            />
                          </div>
                          <span className='text-lg font-bold text-primary'>
                            {currencyFormat(
                              product.price * (1 - product.discount / 100)
                            )}
                          </span>
                        </>
                      ) : (
                        <p>{currencyFormat(product.price)}</p>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <div className='p-4 text-center'>
                  No se encontraron resultados
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
