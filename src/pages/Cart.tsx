import React, { useState, useEffect, useCallback } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, Gift } from 'lucide-react';
import Header from '../components/Header';
import { getCart, removeFromCart, updateCartItemQuantity } from '../services/cartService';
import { getProductById } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';

interface CartItem {
    productId: number;
    quantity: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice: number;
  discount: number;
  stock: number;
  images: string[];
  rating: number;
  reviewsCount: number;
}

 interface CartItemWithDetails extends CartItem {
  product: Product;
}


const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);

  const fetchCartItems = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const cart = await getCart(user.id);
      const itemsWithDetails = await Promise.all(
        cart.items.map(async (item) => {
          const product = await getProductById(item.productId);
          return {
            ...item,
            product,
          };
        })
      );
      setCartItems(itemsWithDetails);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      navigate('/login');
    }
  }, [user, navigate, fetchCartItems]);

  const handleRemoveItem = async (productId: number) => {
    if (!user) return;
    try {
      await removeFromCart(user.id, productId);
      await fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    if (!user) return;
    try {
      await updateCartItemQuantity(user.id, productId, newQuantity);
      await fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const calculateTotals = () => {
    const orderValue = cartItems.reduce(
      (sum, item) => sum + item.product.originalPrice * item.quantity,
      0
    );
    const discount = cartItems.reduce(
      (sum, item) => 
        sum + 
        (item.product.originalPrice - item.product.price) * item.quantity,
      0
    );
    const shipping = 0; 
    const grandTotal = orderValue - discount + shipping;

    return { orderValue, discount, shipping, grandTotal };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const { orderValue, discount, grandTotal } = calculateTotals();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Progress Steps */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-amber-500">
                <span className="font-medium">01 Cart</span>
              </div>
              <div className="h-px bg-gray-300 flex-1 mx-4"></div>
              <div className="text-gray-400">02 Delivery Information</div>
              <div className="h-px bg-gray-300 flex-1 mx-4"></div>
              <div className="text-gray-400">03 Confirmation</div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-medium">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </h1>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex gap-4 p-4 border rounded-lg">
                    <div className="w-24 h-24">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.product.title}</h3>
                          <p className="text-sm text-gray-600">Color: Black</p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border rounded">
                            <button 
                              className="p-2 hover:bg-gray-50"
                              onClick={() => handleUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              className="p-2 hover:bg-gray-50"
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium">₹{item.product.price}</span>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.product.originalPrice}
                          </span>
                          <span className="text-green-600 text-sm">
                            {item.product.discount}% off
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-4">Partner Offers</h3>
                <div className="flex gap-4">
                  <Gift className="text-amber-600" />
                  <div>
                    <p className="text-sm">Get 10% OFF* On Your Successful Order.</p>
                    <button className="text-sm text-amber-600">T&C</button>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Order Value</span>
                    <span>₹{orderValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Product Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-medium text-base pt-2 border-t">
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-6 py-3 bg-amber-500 text-white rounded hover:bg-amber-600"
                >
                  PROCEED TO CHECKOUT
                </button>

                <p className="text-center text-sm text-green-600 mt-4">
                  Your order is eligible for Free Shipping!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;

