import axios from 'axios';
import { Order } from '../models/Order_types';
import { config } from '../utils/config';

const API_URL = config.BASE_URL;

export const getOrders = async (userId: number): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/orders?userId=${userId}`);
  return response.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const response = await axios.get(`${API_URL}/orders/${id}`);
  return response.data;
};

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
  const response = await axios.post(`${API_URL}/orders`, {
    ...orderData,
    createdAt: new Date().toISOString(),
  });
  return response.data;
};

export const updateOrderStatus = async (id: number, status: Order['status']): Promise<Order> => {
  const response = await axios.patch(`${API_URL}/orders/${id}`, { status });
  return response.data;
};