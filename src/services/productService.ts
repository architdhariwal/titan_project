import { Product } from "../models/Product_types";
import axios from "axios";
import { config } from "../utils/config";

const API_URL = `${config.BASE_URL}/products`;

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductById(id: number): Promise<Product> {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}

export async function getProductsByCategory(category: string, subcategory?: string): Promise<Product[]> {
  try {
    let url = `${API_URL}?category=${category}`;
    if (subcategory) {
      url += `&subcategory=${subcategory}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
}

export async function createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
  try {
    const response = await axios.post(API_URL, {
      ...productData,
      rating: 0,
      reviewsCount: 0
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteProduct(id: number): Promise<void> {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
}

export async function getProductsByTitle(title: string): Promise<Product[]> {
  try {
    const response = await axios.get(`${API_URL}?title_like=${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products with title "${title}":`, error);
    throw error;
  }
}