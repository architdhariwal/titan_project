import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import ProductGrid from './ProductGrid';
import ProductForm from './ProductForm';
import { Product } from '../../models/Product_types';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    await createProduct(productData);
    fetchProducts();
    setIsFormOpen(false);
  };

  const handleUpdateProduct = async (id: number, productData: Omit<Product, 'id'>) => {
    await updateProduct(id, productData);
    fetchProducts();
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => setIsFormOpen(true)}
        >
          Add Product
        </button>
      </div>
      <ProductGrid
        products={currentProducts}
        onEdit={(product) => {
          setEditingProduct(product);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteProduct}
      />
      <div className="mt-4 flex justify-center">
        <button
          className="mx-1 px-3 py-1 bg-gray-200 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
        </span>
        <button
          className="mx-1 px-3 py-1 bg-gray-200 rounded"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(products.length / productsPerPage)))}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
        >
          Next
        </button>
      </div>
      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSubmit={(productData) =>
            editingProduct
              ? handleUpdateProduct(editingProduct.id, productData)
              : handleAddProduct(productData)
          }
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductManagement;

