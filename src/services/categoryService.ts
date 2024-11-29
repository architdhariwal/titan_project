import axios from 'axios';
import { Category } from '../models/Category_types';
import { config } from '../utils/config';

const API_URL = config.BASE_URL;

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await axios.get(`${API_URL}/categories/${id}`);
  return response.data;
};

export const createCategory = async (categoryData: Omit<Category, 'id'>): Promise<Category> => {
  const response = await axios.post(`${API_URL}/categories`, categoryData);
  return response.data;
};

export const updateCategory = async (id: number, categoryData: Partial<Category>): Promise<Category> => {
  const response = await axios.patch(`${API_URL}/categories/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/categories/${id}`);
};
