import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
  ]);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Implement checkout logic here
    navigate('/checkout');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <div className="bg-white shadow-md rounded p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Product</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">Quantity</th>
              <th className="text-left py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-4">{item.name}</td>
                <td className="py-4">${item.price.toFixed(2)}</td>
                <td className="py-4">{item.quantity}</td>
                <td className="py-4">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 text-right">
          <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cart;

