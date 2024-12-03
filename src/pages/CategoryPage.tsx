import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../services/productService';
import { Product } from '../models/Product_types';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (slug) {
        try {
          const data = await getProductsByCategory(slug);
          // console.log("slug---------->",slug);
          setProducts(data);
          setIsLoading(false);
        } catch (err) {
          setError('Error loading products');
          setIsLoading(false);
        }
      }
    };

    fetchProducts();
  }, [slug]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 capitalize">{slug} Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CategoryPage;