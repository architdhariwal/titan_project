import React from 'react';
import { Product } from '../../models/Product_types';

interface ProductGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.images[0] || 'https://via.placeholder.com/300x200'}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2">₹{product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
            {product.subcategory && (
              <p className="text-sm text-gray-500 mb-1">Subcategory: {product.subcategory}</p>
            )}
            <p className="text-sm text-gray-500 mb-1">Stock: {product.stock}</p>
            <p className="text-sm text-gray-500 mb-1">
              Rating: {product.rating.toFixed(1)} ({product.reviewsCount} reviews)
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

