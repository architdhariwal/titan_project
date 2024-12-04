import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsByTitle } from "../../services/productService";
import { FiSearch, FiMic } from "react-icons/fi";
import { Product } from "../../models/Product_types";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const debounceTimeout = 300;
  let debounceTimer: NodeJS.Timeout;

  const fetchSuggestions = async (searchText: string) => {
    try {
      setIsLoading(true);
      const results: Product[] = await getProductsByTitle(searchText);
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      if (value.trim()) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
      }
    }, debounceTimeout);
  };

  const handleSuggestionClick = (id: number) => {
    navigate(`/products/${id}`);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for products"
          className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <FiMic className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {isLoading && <div className="absolute mt-2 text-gray-500">Loading...</div>}

      {query && suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-y-auto z-10">
          {suggestions.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSuggestionClick(product.id)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
