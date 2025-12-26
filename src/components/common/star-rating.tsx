'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  initialRating?: number;
  totalStars?: number;
  onRate?: (rating: number) => void;
  readOnly?: boolean;
};

export function StarRating({ initialRating = 0, totalStars = 5, onRate, readOnly = false }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (rate: number) => {
    if (readOnly) return;
    setRating(rate);
    if (onRate) {
      onRate(rate);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            className={cn(
              'h-5 w-5 transition-colors',
              starValue <= (hoverRating || rating)
                ? 'text-yellow-500 fill-yellow-400'
                : 'text-gray-300',
              !readOnly && 'cursor-pointer'
            )}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
          />
        );
      })}
    </div>
  );
}
