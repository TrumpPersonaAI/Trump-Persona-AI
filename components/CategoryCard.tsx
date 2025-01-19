import React from 'react';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onSelect: (categoryId: string) => void;
}

export function CategoryCard({ category, onSelect }: CategoryCardProps) {
  return (
    <div
      onClick={() => onSelect(category.id)}
      className="relative h-40 rounded-lg overflow-hidden cursor-pointer group"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h3 className="text-white text-xl font-bold">{category.name}</h3>
      </div>
    </div>
  );
}