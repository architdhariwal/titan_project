import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import Header from '../components/Header';

const ThankYou = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="mx-auto text-amber-600 mb-6" size={72} strokeWidth={1.5} />
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Yay! It's Ordered</h1>
          
          <div className="text-gray-600 space-y-3 mb-6">
            <p>You will receive an invoice for your order shortly.</p>
            <p>Your order will arrive in 7 business days.</p>
          </div>

          {user && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Remaining Balance</span>
                <span className="text-2xl font-bold text-amber-600">₹{user.balance?.toFixed(2)}</span>
              </div>
            </div>
          )}

          <button 
            onClick={handleContinueShopping}
            className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            <ShoppingCart size={20} />
            Continue Shopping
          </button>
        </div>
      </main>
    </div>
  );
};

export default ThankYou;