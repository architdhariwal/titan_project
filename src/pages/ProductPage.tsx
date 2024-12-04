import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Filter from "../components/Filter/Filter";
import Card from "../components/Card/Card";
import { Product } from "../models/Product_types";
import { getProductsByCategory, getProducts } from "../services/productService";

const ITEMS_PER_PAGE = 12;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const searchParams = new URLSearchParams(location.search);
      const category = searchParams.get("category");

      if (category) {
        const data = await getProductsByCategory(category);
        setProducts(data);
        setSelectedFilter(category);
      } else {
        const data = await getProducts();
        setProducts(data);
        setSelectedFilter("");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [location.search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (filter: string) => {
    navigate(`/products?category=${filter}`);
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
    setCurrentPage(1);
  };

  const sortedProducts = React.useMemo(() => {
    let sorted = [...products];

    switch (sortOption) {
      case "popularity":
        return sorted.filter((product) => product.rating > 4.0);
      case "highToLow":
        return sorted.sort((a, b) => b.price - a.price);
      case "lowToHigh":
        return sorted.sort((a, b) => a.price - b.price);
      case "bestSellers":
        return sorted.filter(
          (product) => product.subcategory === "bestsellers"
        );
      default:
        return sorted;
    }
  }, [products, sortOption]);

  const filteredProducts = selectedFilter
    ? sortedProducts.filter((product) => product.category === selectedFilter)
    : sortedProducts;

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">
              {selectedFilter
                ? `${selectedFilter.toUpperCase()} Products`
                : "All Products"}
            </h1>
            <span className="text-gray-600">
              {filteredProducts.length} items
            </span>
          </div>

          <Filter
            onFilterChange={handleFilterChange}
            selectedFilter={selectedFilter}
            onSortChange={handleSortChange}
          />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center text-gray-600 py-8">
                  No products found in this category.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayedProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="cursor-pointer"
                      >
                        <Card
                          id={product.id}
                          images={product.images}
                          title={product.title}
                          category={product.category}
                          price={`₹${product.price}`}
                          originalPrice={`₹${product.originalPrice}`}
                          discount={product.discount}
                          rating={product.rating}
                          reviewsCount={product.reviewsCount}
                        />
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                      >
                        ←
                      </button>

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`px-4 py-2 rounded-md ${
                                currentPage === pageNum
                                  ? "bg-black text-white"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      {totalPages > 5 && <span className="px-2">...</span>}

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                      >
                        →
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
