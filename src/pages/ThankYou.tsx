import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-xl mb-6">Your order has been successfully placed.</p>
        <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
};

export default ThankYou;