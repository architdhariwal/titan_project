import axios from 'axios';
import { Cart, CartItem } from '../models/Cart_types';
import { config } from '../utils/config';
import { getProductById } from './productService';

const API_URL = `${config.BASE_URL}/carts`;


export async function getCart(userId: number): Promise<Cart> {
  try {
    const response = await axios.get(`${API_URL}?userId=${userId}`);
    console.log("response--->",response.data[0]);
    return response.data[0] || { userId, items: [], id: null };

  } catch (error) {
    console.error(`Error fetching cart for user ${userId}:`, error);
    throw error;
  }
}

export async function addToCart(userId: number, item: CartItem): Promise<Cart> {
  try {
    // Check product availability and stock
    const product = await getProductById(item.productId);
    if (product.stock < item.quantity) {
      throw new Error('Insufficient stock');
    }

    const cart = await getCart(userId);

    // If cart doesn't exist, create new cart
    if (!cart.id) {
      const newCart = { userId, items: [item] };
      const response = await axios.post(API_URL, newCart);
      return response.data;
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.productId === item.productId
    );

    let updatedItems;
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      updatedItems = cart.items.map((cartItem, index) =>
        index === existingItemIndex
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
    } else {
      // Add new item to cart
      updatedItems = [...cart.items, item];
    }

    const response = await axios.patch(`${API_URL}/${cart.id}`, { items: updatedItems });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export async function removeFromCart(userId: number, productId: number): Promise<Cart> {
  try {
    const cart = await getCart(userId);
    if (!cart.id) throw new Error('Cart not found');

    const updatedItems = cart.items.filter(item => item.productId !== productId);
    const response = await axios.patch(`${API_URL}/${cart.id}`, { items: updatedItems });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}

export async function clearCart(userId: number): Promise<void> {
  try {
    const cart = await getCart(userId);
    if (cart.id) {
      await axios.patch(`${API_URL}/${cart.id}`, { items: [] });
    }
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}

export async function updateCartItemQuantity(userId: number, productId: number, newQuantity: number): Promise<Cart> {
  try {
    const cart = await getCart(userId);
    if (!cart.id) throw new Error('Cart not found');

    // Check product availability and stock
    const product = await getProductById(productId);
    if (product.stock < newQuantity) {
      throw new Error('Insufficient stock');
    }

    const updatedItems = cart.items.map(item => 
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );

    // Remove the item if the new quantity is 0
    const filteredItems = updatedItems.filter(item => item.quantity > 0);

    const response = await axios.patch(`${API_URL}/${cart.id}`, { items: filteredItems });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
}