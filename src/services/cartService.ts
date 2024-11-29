import axios from 'axios';
import { Cart, CartItem } from '../models/Cart_types';
import { config } from '../utils/config';

const API_URL = config.BASE_URL;

export const getCart = async (userId: number): Promise<Cart> => {
  const response = await axios.get(`${API_URL}/carts?userId=${userId}`);
  return response.data[0];
};

export const addToCart = async (userId: number, item: CartItem): Promise<Cart> => {
  const cart = await getCart(userId);
  if (cart) {
    const updatedItems = [...cart.items, item];
    const response = await axios.patch(`${API_URL}/carts/${cart.id}`, { items: updatedItems });
    return response.data;
  } else {
    const newCart = { userId, items: [item] };
    const response = await axios.post(`${API_URL}/carts`, newCart);
    return response.data;
  }
};

export const updateCartItem = async (userId: number, item: CartItem): Promise<Cart> => {
  const cart = await getCart(userId);
  if (cart) {
    const updatedItems = cart.items.map(i => i.productId === item.productId ? item : i);
    const response = await axios.patch(`${API_URL}/carts/${cart.id}`, { items: updatedItems });
    return response.data;
  }
  throw new Error('Cart not found');
};

export const removeFromCart = async (userId: number, productId: number): Promise<Cart> => {
  const cart = await getCart(userId);
  if (cart) {
    const updatedItems = cart.items.filter(item => item.productId !== productId);
    const response = await axios.patch(`${API_URL}/carts/${cart.id}`, { items: updatedItems });
    return response.data;
  }
  throw new Error('Cart not found');
};

export const clearCart = async (userId: number): Promise<void> => {
  const cart = await getCart(userId);
  if (cart) {
    await axios.patch(`${API_URL}/carts/${cart.id}`, { items: [] });
  }
};