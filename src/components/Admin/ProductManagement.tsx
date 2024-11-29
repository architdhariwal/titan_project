import React, { useState, useEffect } from 'react';
import { Product } from '../../models/Product_types';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import PaginatedTable, { Column } from './PaginatedTable';
import ProductFormDrawer from './ProductFormDrawer';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      await createProduct(productData);
      fetchProducts();
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleUpdateProduct = async (id: number, productData: Partial<Product>) => {
    try {
      await updateProduct(id, productData);
      fetchProducts();
      setIsDrawerOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const columns: Column<Product>[] = [
    { key: 'title', header: 'Title' },
    { key: 'description', header: 'Description' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    { key: 'discount', header: 'Discount' },
    { key: 'stock', header: 'Stock' },
    { key: 'rating', header: 'Rating' },
    { key: 'reviewsCount', header: 'Reviews Count' },
    {
      key: 'action',
      header: 'Action',
      render: (product: Product) => (
        <div>
          <button
            className="mr-2 text-blue-500 hover:text-blue-700"
            onClick={() => {
              setEditingProduct(product);
              setIsDrawerOpen(true);
            }}
          >
            Update
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDeleteProduct(product.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => {
          setEditingProduct(null);
          setIsDrawerOpen(true);
        }}
      >
        Add Product
      </button>
      <PaginatedTable data={products} columns={columns} itemsPerPage={5} />
      <ProductFormDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSubmit={(productData) =>
          editingProduct
            ? handleUpdateProduct(editingProduct.id, productData)
            : handleAddProduct(productData)
        }
      />
    </div>
  );
};

export default ProductManagement;

